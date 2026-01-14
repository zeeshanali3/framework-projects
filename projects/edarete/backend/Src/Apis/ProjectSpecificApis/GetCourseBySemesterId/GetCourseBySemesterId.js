const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

global.GetSemesterbyprogramid_object = {
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
                                            "name": "semester_id",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body",
                                            "dynamicKey": "semester_id",

                                        },
                                     
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: null,
                                "query": {
                                    "queryNature": "Select",
                                    "queryPayload": `Select * from courses where semester_id = ?`,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: null
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "GET",
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
module.exports = { GetSemesterbyprogramid_object };