const logMessage = require("../../LogFunctions/consoleLog.js");
async function isValid(req, decryptedPayload) {
    let return_payload = {};
    let results = decryptedPayload["objectResolverOutput"];
    logMessage([results]);

    if (results.length > 0) {
        const validityDays = results[0].validity_duration;
        const validTillDate = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000); 

        return_payload.isValid = true;
        return_payload.validTill = validTillDate.toISOString(); 
        return_payload.results = results;
    } else {
        return_payload.isValid = false;
        return_payload.validTill = "Is Not Valid";
        return_payload.results = "VR Details Unavailable For Invalid VR Device";
    }

    return return_payload;
}

module.exports = { isValid };
