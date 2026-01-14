const logMessage = require("../SysFunctions/LogFunctions/consoleLog.js");

const validateToken = require("./TokenValidation/validateToken");
const permissionChecker = require("./ParameterValidation/permissionChecker");
const validateParametersMiddleware = require("./ParameterValidation/validateParamatersMiddleware");
const otpVerif = require("../SysFunctions/otpVerif");
const queryResolver = require("./QueryResolver/queryResolver");
const handleVersionChecking = require("./VersionCheck/versionChecker");
const handleEncryption = require("./PlatformCheck/platformEncryption");
const LogError = require("../Integrations/Database/Errorlog");
const sendResponse = require("../SysFunctions/response");
const { encryptObject } = require("../SysFunctions/Encryption/aes");
const apiObjectGenerator = require("../../Src/HelperFunctions/ApiObjectsGenerator");
const fileHandler = require("../Integrations/FileHandling/fileHandler");
const { getPlatformConfig } = require("./PlatformCheck/platformHandler");
const generateToken = require("../SysFunctions/jwtUtils");
const { selectFilter } = require("../../Src/HelperFunctions/PreProcessingFunctions/selectFilter");
const { deepMerge } = require("../SysFunctions/deepObjectCopy");

async function execReqProcessFuncs(req, res, decryptedPayload, { config, data, response }) {
    try {
        const reqProcessFuncs = [selectFilter];
        for (const func of reqProcessFuncs) {
            await func(req, decryptedPayload);
        }
    } catch (error) {
        await LogError(res, 500, "Middleware Handler", error.message, "MW_ERR");
        throw new Error("execReqProcessFuncs")
        
    }
}

function getApiObject(req) {
    try {
        const requestedPath = req.path.replace("/api/", "");
        const pathParts = requestedPath.split("/");
        logMessage(["RECEIVED HIT ON:", req.path]);
       
        const objectName =
            pathParts.length >= 2
                ? pathParts
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .reduce((acc, curr, index) => {
                        if (index === 0) return acc;
                        return acc + curr;
                    }, pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)) +
                "_object"
                : "InvalidPath";

        return global[objectName];
    } catch (error) {
        logMessage(["getApiObject failed:", error]);
        LogError(res, 404, "Middleware Handler", error.message, "MW_ERR");
        throw new Error("execReqProcessFuncs")
    }
}

async function getApiObjectHandler(req, res, decryptedPayload, apiObject,payload) {
    try {
        const resolved = getApiObject(req);
        if (!resolved) {
            throw new Error("API Object not found");
        }
        Object.assign(apiObject, deepMerge(global[resolved?.templateName] || {}, resolved));
    } catch (error) {
        await LogError(res, 500, "Middleware Handler", error.message, "MW_ERR");
        throw new Error("getApiObjectHandler")
        
    }
}

async function handleVersionCheckingHandler(req, res, decryptedPayload, apiObject,payload) {
    try {
        const { platform, data, response, config } = await handleVersionChecking(req, apiObject);
        Object.assign(apiObject, { platform, data, response, config });
    } catch (error) {
        await LogError(res, 500, "handleVersionCheckingHandler", error.message, "E500");
        throw new Error("handleVersionCheckingHandler")
    }
}

async function platformConfigHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        const platform = apiObject?.platform;
        const platformConfig = platform
            ? getPlatformConfig(platform, platform, req.ip)
            : apiObject.config;

        if (!platformConfig) {
            throw new Error("Unsupported platform");
        }

        apiObject.config = platformConfig;
        decryptedPayload.config = platformConfig;
    } catch (error) {
        await LogError(res, 401, "Platform Validator", "Unsupported platform", "E51");
        throw new Error("platformConfigHandler")
    }
}

async function apiGeneratorHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        if (apiObject.data?.apiInfo?.utilityFunctions?.crudFunction === "crudApiGenerator") {
            const generated = await apiObjectGenerator(apiObject.config, apiObject.data, apiObject.response, req);
            Object.assign(apiObject, generated);
        }
    } catch (error) {
    await LogError(res, 500, "apiGeneratorHandler", error.message, "E500");
    throw new Error("apiGeneratorHandler")
    }
}

async function encryptionHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        if (apiObject.config?.communication?.encryption) {
            const { newPayload, encryptionKey, PlatformName, PlatformVersion } =
                await handleEncryption(req, apiObject);

            Object.assign(decryptedPayload, newPayload, { encryptionKey, PlatformName, PlatformVersion });
        }
    } catch (error) {
        await LogError(res, 500, "encryptionHandler", error.message, "E500");
        throw new Error("encryptionHandler")
    }
}

async function requestMethodValidator(req, res, decryptedPayload, apiObject,payload) {
    try {
        if (req.method !== apiObject.data?.requestMetaData?.requestMethod) {
            throw new Error("Incorrect Request Method");
        }
    } catch (error) {
        await LogError(res, 404, "requestMethodValidator", error.message, "E500");
        throw new Error("requestMethodValidator")
    }
}

async function accessTokenValidator(req, res, decryptedPayload, apiObject, payload) {
    try {
        if (apiObject.config?.verification?.accessToken) {
            const tokenResults = await validateToken(
                req,
                res,
                decryptedPayload,
                decryptedPayload?.PlatformName,
                decryptedPayload?.PlatformVersion
            );

            const updatedToken = await generateToken(tokenResults.decodedToken, process.env.SECRET_KEY);

            Object.assign(decryptedPayload, {
                accessToken: updatedToken,
                userId: tokenResults.userId,
                deviceId: tokenResults.deviceId,
                decodedToken: tokenResults.decodedToken,
                updatedToken,
            });

        }
    } catch (error) {
        await LogError(res, 401, "accessTokenValidator", error.message, "E500");
        throw new Error("accessTokenValidator")
    }
}

async function otpVerificationHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        if (apiObject.config?.verification?.otp) {
            const otpVerifResult = await otpVerif(req, decryptedPayload);
            decryptedPayload.otpVerif = otpVerifResult;
        }
    } catch (error) {
        await LogError(res, 500, "otpVerificationHandler", error.message, "E500");
        throw new Error("otpVerificationHandler")
    }
}

async function permissionHandler(req, res, decryptedPayload, apiObject,payload) {
    try {
        if (apiObject.data?.requestMetaData?.permission) {
            const permission_results = await permissionChecker(req, apiObject.data, decryptedPayload);
            decryptedPayload.permission_results = permission_results;
        }
    } catch (error) {
        await LogError(res, 500, "permissionHandler", error.message, "E500");
        throw new Error("permissionHandler")
    }
}

async function fileHandlerExecutor(req, res, decryptedPayload, apiObject, payload) {
    try {
        if (apiObject.config?.file) {
            await fileHandler(req, res, apiObject.config.file);
            throw new Error("File handler executed (response sent)");
        }
    } catch (error) {
        await LogError(res, 500, "fileHandlerExecutor", error.message, "E500");
        throw new Error("fileHandlerExecutor")
    }
}

async function parameterValidator(req, res, decryptedPayload, apiObject, payload) {
    try {
        if (apiObject.data?.parameters) {
            await validateParametersMiddleware(req, decryptedPayload, apiObject);
        }
    } catch (error) {
        await LogError(res, 500, "parameterValidator", error.message, "E500");
        throw new Error("parameterValidator")
    }
}


async function preProcessHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        let  {data}  = apiObject;
        if (data.apiInfo?.preProcessFunction?.length > 0) {
            for (let util of data.apiInfo.preProcessFunction)
                decryptedPayload[util.name] = await util(req, decryptedPayload)
        }
    }
    catch (error) {
        logMessage([error], true)
        await LogError(res, 500, "preProcessHandler", error.message, "E500");
        throw new Error("preProcessHandler")
    }
}   



async function queryResolverHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        const queryResolverOutput = await queryResolver(req, decryptedPayload, apiObject);
        decryptedPayload.queryResolverOutput = queryResolverOutput?.results;
        decryptedPayload.total_count = queryResolverOutput?.total_count;
    } catch (error) {
        await LogError(res, 500, "queryResolverHandler", error.message, "E500");
        throw new Error("queryResolverHandler")
    }
}





async function postProcessHandler(req, res, decryptedPayload, apiObject, payload) {
    try {
        let { data } = apiObject;
        if (data.apiInfo?.postProcessFunction) {

           const processedPayload = await data.apiInfo.postProcessFunction(req, decryptedPayload);
            Object.assign(payload, processedPayload);
        } else {
            payload.return = decryptedPayload.queryResolverOutput || {};
            // payload.total_count = decryptedPayload.queryResolverOutput?.length || 0;
            payload.total_count = decryptedPayload?.total_count || 0;
            payload.message = apiObject?.responseMessage || "Success";
        }
    }
    catch (error) {
        await LogError(res, 500, "postProcessHandler", error.message, "E500");
        throw new Error("postProcessHandler")
    }
}



async function responseSender(req, res, decryptedPayload, apiObject, payload) {
    try {

        // let payload = {
        //     return : decryptedPayload.queryResolverOutput || {},
        //     total_count : decryptedPayload.queryResolverOutput?.length || 0,
        //     message: apiObject?.responseMessage || "Success",
             
        // }
        if (decryptedPayload.updatedToken){
            payload.accessToken = decryptedPayload.updatedToken;
        }
        
         if (decryptedPayload.otpVerif){
            payload.otpVerif = decryptedPayload.otpVerif;
        }

        if (apiObject.config?.communication?.encryption) {
            const encrypted = encryptObject(payload, decryptedPayload?.encryptionKey);
            await sendResponse(res, 200, "API Hit Successfully", encrypted);
        } else {
          sendResponse(res, 200, `API Hit Successfully: ${apiObject.response?.successMessage}`, payload || {});
        }
    } catch (error) {
        await LogError(res, 500, "responseSender", error.message, "E500");
        throw error;
    }
}


const middleware_config = [
    {
        stage: "PreProcessing",
        functions: [
            getApiObjectHandler,
            handleVersionCheckingHandler,
            apiGeneratorHandler,
            platformConfigHandler,
            encryptionHandler,
            requestMethodValidator,
        ],
    },
    {
        stage: "Processing",
        functions: [
            execReqProcessFuncs,
            accessTokenValidator,
            otpVerificationHandler,
            permissionHandler,
            fileHandlerExecutor,
            parameterValidator,
            preProcessHandler,
            queryResolverHandler,
        ],
    },
    {
        stage: "PostProcessing",
        functions: [
            postProcessHandler,
            responseSender,
        ],
    },
];

module.exports = middleware_config;
