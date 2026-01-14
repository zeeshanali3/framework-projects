
async function checkDiscipline(req, decryptedPayload) {
 

}
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
                                // "encryption": false
                                "encryption": {
                                    "platformEncryption": true,
                                    "accessTokenEncryption": true,
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
                                            "name": "program_id",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body",
                                            "dynamicKey": "program_id",

                                        },
                                     
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: null,
                                "query": {
                                    "queryNature": "Select",
                                    "queryPayload": `Select * from semesters where program_id = ?`,
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