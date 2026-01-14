const {projectDB} = require("../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution.js");
const db = require("../../../../Services/Integrations/Database/databaseAbstraction");



global.Addnfiid_object = {
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
                                "encryption": false
                                // "encryption": {
                                //     "platformEncryption": true,
                                //     //   "accessTokenEncryption": false,
                                // }
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
                                            "name": "student_user_id",
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
                                    "queryNature": "Update",
                                    "queryPayload": `Update students set nfc_id = ? where student_user_id = ?`,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: null,
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "PUT",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "FCM Token added successfully!",
                            "errorMessage": "Failed to add FCM Token"
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Addnfiid_object };