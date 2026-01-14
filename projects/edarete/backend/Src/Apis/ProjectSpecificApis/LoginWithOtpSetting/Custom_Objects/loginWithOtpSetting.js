global.LoginWithOtpSetting_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": false,
                                "parameters": false,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": false
                              },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields": []
                            },
                            "apiInfo": {
                                "preProcessFunction": [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": "SELECT * FROM users",
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                "postProcessFunction": (req, res, data) => {
                                    return { loginWithOtp: true };
                                }
                            },
                            "requestMetaData": {
                                "requestMethod": "GET",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Login with OTP setting retrieved successfully!",
                            "errorMessage": "There was an error retrieving login with OTP setting."
                        }
                    }
                ]
            },
        }]
    }
}

module.exports = { LoginWithOtpSetting_object };
