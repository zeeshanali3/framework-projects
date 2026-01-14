const generatePayload = require("../../../../../Services/SysFunctions/generatePayload");
const generateToken = require("../../../../../Services/SysFunctions/jwtUtils");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");

async function genToken(req, decryptedPayload) {
    for (const p of providedPermissions){
        let results = await executeQuery(`SELECT * FROM user_role_designation_permissions urddp JOIN permissions p ON urddp.permission_id = p.permission_id WHERE p.permission_name = '${p}' AND urdd.user_role_designation_department_id = ${decryptedPayload.actionPerformerURDD}`)
        if (results.length == 0) throw new Error("You Do Not Have Permission To Request An Access Token With These Provided Permissions")
    }
    const payload = generatePayload(decryptedPayload.userId, decryptedPayload.deviceId, null, decryptedPayload.providedPermissions)
    const token = await generateToken(payload, process.env.SECRET_KEY)
    return token
}
global.GenAccessToken_object = {
    versions: {
        versionData: [
            {
                "*": {
                    steps: [
                        {
                            config: {
                                features: {
                                    multistep: false,
                                    parameters: false,
                                    pagination: false,
                                },
                                communication: {
                                    encryption: false,
                                },
                                verification: {
                                    otp: false,
                                    accessToken: false,
                                },

                            },
                            data: {
                                parameters: [
                                    {
                                        "name": "userId",
                                        "source": "req.body",
                                    },
                                    {
                                        "name": "deviceId",
                                        "source": "req.body",
                                    },
                                    {
                                        "name": "providedPermissions",
                                        "source": "req.body",
                                    },
                                    {
                                        "name" : "actionPerformerURDD",
                                        "source" : "req.body"
                                    }
                                ],
                                apiInfo: {
                                    query: {
                                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                                        preProcessFunction: [],
                                        queryPayload: null
                                    },
                                    utilityFunctions: {
                                        callbackFunction: null,
                                        payloadFunction: [],
                                    },
                                    postProcessFunction: genToken,
                                },
                                requestMetaData: {
                                    requestMethod: "GET",
                                    permission: null,
                                    providedPermissions: false,
                                    pagination: { pageSize: 10 },
                                },

                            },
                            response: {
                                successMessage: "task_history retrieved successfully!",
                                errorMessage: "Failed to retrieve task_history.",
                            },
                        }
                    ],
                },
            },
        ],
    },
};

module.exports = { GenAccessToken_object }