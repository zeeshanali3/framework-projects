const otpVerif = require("../../../../../Services/SysFunctions/otpVerif");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const {projectDB} = require('../../../../../Services/Integrations/Database/projectDb');

async function validateToken(req, decryptedPayload) {
    const { accessToken } = decryptedPayload;
  
   
}
  

global.Validatetoken_object = {
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
                                            "name": "answer_data",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [validateToken],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
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
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Signup successfull!",
                            "errorMessage": "There was an error signing up user."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Validatetoken_object };