// Import the function
const verifyPaymentMethodOTP = require("../../../../HelperFunctions/PreProcessingFunctions/PaymentMethod/verifyPaymentMethodOTP");

global.VerifyPaymentMethod_object = {  // ← This name is correct for /api/VerifyPaymentMethod
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": false,  // ← Single step API
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                /*"encryption": {
                                    "platformEncryption": false,
                                }*/
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "urdd_id",
                                        "validations": [],
                                        "required": true,
                                        "source": "req.body"
                                    },
                                    {
                                        "name": "payment_method_id",
                                        "validations": [],
                                        "required": true,
                                        "source": "req.body"
                                    },
                                    {
                                        "name": "otp",
                                        "validations": [],
                                        "required": true,
                                        "source": "req.body"
                                    }
                                ]
                            },
                            "apiInfo": {
                                "preProcessFunction": [verifyPaymentMethodOTP],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": "",
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                }
                            },
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Payment method verified successfully! Your payment method is now active.",
                            "errorMessage": "Failed to verify payment method. Please check your OTP and try again."
                        }
                    }
                ]
            }
        }]
    }
};
