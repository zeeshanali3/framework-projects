const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const checkExpiration = require('../../SysFunctions/checkExpiration');
const {projectDB} = require('../../Integrations/Database/projectDb'); // Assuming you have a projectDB connection module
const { executeQuery } = require('../../Integrations/Database/queryExecution');

const validateToken = async (req, res, decryptedPayload, platform, platformVersion) => {
    try {
        const decodedToken = await checkExpiration(req.headers['accesstoken']);
        logMessage(['Decoded token1:', req.headers['accesstoken']]);
        if (!decodedToken) {
            throw new Error("Invalid Token");
        }

        logMessage(['Decoded token:', decodedToken]);
        // Extract necessary information from the decoded token and request
        const { userId, deviceId } = decodedToken;  // Get userId and deviceId from the decoded token

        // Assuming the following information comes from request headers or body
        const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';
        const apiUrl = req.originalUrl;
        const httpMethod = req.method;
        const requestPayload = JSON.stringify(decryptedPayload);  // Assuming request payload is in the body
        const userAgent = req.get('User-Agent');
        const responseCode = res.statusCode;
        const responseTimeMs = res.get('X-Response-Time') || 0;  // Assuming you have a middleware calculating response time
        const status = 'active';

        // Insert activity record into the useractivity table
        // const connection = await projectDB();

        // const insertQuery = `
        // INSERT INTO useractivity (
        //     user_id, ip_address, device_id, api_url, http_method, request_payload, 
        //     response_code, response_time_ms, user_agent, platform, platform_version, 
        //     createdAt, updatedAt, status
        // ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
        // `;
        
        // await executeQuery(insertQuery, [
        // userId, ipAddress, deviceId, apiUrl, httpMethod, requestPayload, 
        // responseCode, responseTimeMs, userAgent, platform, platformVersion, 
        // status
        // ], connection);

        return {"userId" : userId, "deviceId" : deviceId, "decodedToken": decodedToken};

    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = validateToken;
