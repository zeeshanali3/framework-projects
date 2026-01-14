const logMessage = require("../../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const {projectDB} = require("../../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const db = require("../../../../../Services/Integrations/Database/databaseAbstraction");


async function addfcmtoken(req, decryptedPayload) {   

    const payload = decryptedPayload;
    const fcm_token = decryptedPayload.fcm_token;
    const actionPerformerURDD = decryptedPayload.actionPerformerURDD;
    logMessage(["payload recieved /n fcm_token", fcm_token]);
    logMessage(["actionPerformerURDD", actionPerformerURDD]);
   
    
    const userIdQuery = `select user_id from user_roles_designations_department urdd where urdd.user_role_designation_department_id = ?`;
    const userIdQueryResult = await executeQuery(userIdQuery, [actionPerformerURDD]);
    if (userIdQueryResult.length == 0) {
        throw new Error("No User Id found for user");
    }
    
    const user_id = userIdQueryResult[0].user_id;
    const fcmTokenUpdateQuery = `Update user_devices set fcm_token = ? where user_id = ?`;
    const fcmTokenUpdateQueryResult = await executeQuery(fcmTokenUpdateQuery, [fcm_token,user_id]);
    return decryptedPayload;
      
}
global.Addfcmtoken_object = {
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
                                // "encryption": false
                                "encryption": {
                                    "platformEncryption": true,
                                      "accessToken": true,
                                }
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "ActionPerformerURDD",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.query"
                                        },
                                        {
                                            "name": "fcm_token",
                                            "validations": [],
                                            "required": true,
                                            "source": "req.body"
                                        }
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: addfcmtoken
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
                            "successMessage": "Configuration generated successfully!",
                            "errorMessage": "There was an error generating the configuration."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Addfcmtoken_object };