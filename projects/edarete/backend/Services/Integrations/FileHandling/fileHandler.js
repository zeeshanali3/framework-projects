const { generateUploadUrl } = require("./generateUploadUrl")
const { retrieveFile } = require("./retrieveFile")
const sendResponse = require("../../SysFunctions/response")
async function fileHandler (req, res, config){
    if (config.upload){
        
        const payload = await generateUploadUrl(req, config.bucket, config.storage)
        sendResponse(res, 200, "File Successfully Uploaded", payload)
    }
    else if (config.download){
        await retrieveFile(req, res);
    }
}

module.exports = fileHandler