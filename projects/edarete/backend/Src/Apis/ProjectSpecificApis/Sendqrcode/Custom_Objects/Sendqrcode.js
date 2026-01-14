const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const db = require("../../../../../Services/Integrations/Database/databaseAbstraction.js");
// const sendEmail = require('../../../../Constants/sendEmailOTP.js');
const nodemailer = require('nodemailer');
const logMessage = require('../../../../../Services/SysFunctions/LogFunctions/consoleLog')
const crypto = require("crypto");



async function sendQRCode(req, decryptedPayload) {    

    try{
    const objectResolverOutput = decryptedPayload["objectResolverOutput"]; 
    const actionPerformerURDD = decryptedPayload?.actionPerformerURDD ||  objectResolverOutput?.actionPerformerURDD; 
    const quizId = decryptedPayload?.quizId || objectResolverOutput?.quizId ; 
    
    // const {actionPerformerURDD, quizId}  = req.body;

    let qrCode;
    let isUnique = false;
    // Keep generating until a unique QR code is found
    while (!isUnique) {
        qrCode = crypto.randomBytes(16).toString("hex");

        const checkQrCodeQuery = `
            SELECT qr_code 
            FROM qr_code 
            WHERE qr_code = ? 
            LIMIT 1
        `;
        const existingQr = await executeQuery(checkQrCodeQuery, [qrCode]);

        if (existingQr.length === 0) {
            isUnique = true; // found a unique code
        }
    }

    const insertQrCodeQuery = `
        INSERT INTO qr_code (qr_code, urdd_id, sub_component_id )
        VALUES (?, ?, ?)
    `;
    await executeQuery(insertQrCodeQuery, [qrCode, actionPerformerURDD, quizId]);

    // Attach the generated QR code to the response object
    decryptedPayload.qrCode = qrCode;

    return decryptedPayload;

}
catch(err){
    logMessage(["Error generating qr code: " + err.message]);
}

}


global.GetQrcode_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": true,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                // "encryption": false,
                                "encryption": {
                                    "platformEncryption": true,
                                    "accessToken": true,
                                }
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": true
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "actionPerformerURDD",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "quiz_id",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                       
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null
                                   ,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: sendQRCode
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Student added successfully and enrolled to the course!",
                            "errorMessage": "Failed to save / enroll student."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { GetQrcode_object };