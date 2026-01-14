const {projectDB} = require('../../Integrations/Database/projectDb');
const { executeQuery } = require('../../Integrations/Database/queryExecution');
const { decryptObject, encryptObject } = require('../../SysFunctions/Encryption/aes');
const logMessage = require('../../SysFunctions/LogFunctions/consoleLog');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


const platformKeyCache = new Map();


// Encryption function
const handleEncryption = async (req,  object) => {
  let encryptionKey = '', encryptedRequest;
  let reqData = null;
  let decryptedPayload = "";
  let encryptionDetails = null;
  let PlatformName, PlatformVersion;
  const { config} = object;

  try {
    if (req.headers['encryptedrequest']){
      encryptedRequest = req.headers['encryptedrequest']
      logMessage("Extracting ER from headers")
    }
    else if (Object.keys(req.body).length > 0){
      encryptedRequest = req.body.encryptedRequest;
      logMessage("Extracting ER from body::::", req.headers)

    }
    else{
      const errorObject = {
        frameworkStatusCode: 'E14', // Missing Encrypted Payload or Encryption Details
        httpStatusCode: 400, // Bad Request
        description: "SSC: E14 => No req body provided",
      };
      throw new Error(errorObject.description);
    }
      ({ reqData, encryptionDetails } = decryptObject(encryptedRequest, process.env.SECRET_KEY));
      logMessage(["reqData: ", reqData]);
      logMessage(["encryptionDetails: ", encryptionDetails])
      if ((!reqData && req.method != "GET") || !encryptionDetails) {
        const errorObject = {
          frameworkStatusCode: 'E10', // Missing Encrypted Payload or Encryption Details
          httpStatusCode: 400, // Bad Request
          description: "SSC: E10 => Missing Encrypted Payload or Encryption Details",
        };
        throw new Error(errorObject.description);
      }

      // Handle OTP-based encryption
      if (config.communication.encryption.accessToken) {
        const accessToken = req.headers['accesstoken']; // Access the header value
        encryptionKey += accessToken
      }
      
      // Handle platform encryption
      if (config.communication.encryption.platformEncryption) {
        ({ PlatformName, PlatformVersion } = encryptionDetails)
        if (!PlatformName || !PlatformVersion) {
          const errorObject = {
            frameworkStatusCode: 'E10', // Missing PlatformName or PlatformVersion for Encryption
            httpStatusCode: 400, // Bad Request
            description: "SSC: E10 => PlatformName or PlatformVersion Not Present For Encryption",
          };
          throw new Error(errorObject.description);

        }
        // const projectDbConnection = await projectDB();
        const platformQuery = `
          SELECT pv.encryption_key
          FROM platforms p
          JOIN platform_versions pv ON p.platform_id = pv.platform_id
          JOIN versions v ON pv.version_id = v.version_id
          WHERE p.platform_name = ? AND v.version = ?
        `;


      const platformKey = await getPlatformEncryptionKey(PlatformName, PlatformVersion);
        
      if (platformKey) {
        encryptionKey += platformKey;
      } else {
        const errorObject = {
          frameworkStatusCode: 'E10', // Invalid Platform Name or Version
          httpStatusCode: 400, // Bad Request
          description: "SSC: E10 => Invalid Platform Name or Version, Source: Platform Encryption",
        };
        throw new Error(errorObject.description);
      }

      }
      if (reqData) {
        newPayload = decryptObject(reqData, encryptionKey);
      }
      return {
        newPayload,
        encryptionKey,
        PlatformName,
        PlatformVersion
      };
  } catch (error) {
    console.error(error);
    const errorObject = {
      frameworkStatusCode: 'E40', // Encryption Error
      httpStatusCode: 500, // Internal Server Error
      description: `SSC: E40 => Decryption Error: ${error.message}`,
    };
    throw new Error(errorObject.description);
  }
};




async function getPlatformEncryptionKey(PlatformName, PlatformVersion) {
  const cacheKey = `${PlatformName}_${PlatformVersion}`;
  if (platformKeyCache.has(cacheKey)) {
    return platformKeyCache.get(cacheKey);
  }

  const projectDbConnection = await projectDB();
  const platformQuery = `
    SELECT pv.encryption_key
    FROM platforms p
    JOIN platform_versions pv ON p.platform_id = pv.platform_id
    JOIN versions v ON pv.version_id = v.version_id
    WHERE p.platform_name = ? AND v.version = ?
  `;
  const platformResults = await executeQuery(platformQuery, [PlatformName, PlatformVersion], projectDbConnection);

  if (platformResults.length > 0) {
    const key = platformResults[0].encryption_key;
    platformKeyCache.set(cacheKey, key);
    return key;
  }

  return null; // return null instead of throwing
}




module.exports = handleEncryption;
