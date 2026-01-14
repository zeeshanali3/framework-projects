// Import the functions at the top
const addPaymentMethodPreProcess = require("../../../../HelperFunctions/PreProcessingFunctions/PaymentMethod/addPaymentMethodPreProcess");

global.PaymentMethodAdd_object = {  // ← Change this name
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
                                        "name": "supported_payment_method_id",
                                        "validations": [],
                                        "required": true,
                                        "source": "req.body"
                                    },
                                    {
                                        "name": "payment_details",
                                        "validations": [],
                                        "required": true,
                                        "source": "req.body"
                                    },
                                    {
                                        "name": "is_default",
                                        "validations": [],
                                        "required": false,
                                        "source": "req.body"
                                    }
                                ]
                            },
                            "apiInfo": {
                                "preProcessFunction": [addPaymentMethodPreProcess],
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
                            "successMessage": "Payment method details saved successfully! Please check your email for OTP verification.",
                            "errorMessage": "Failed to save payment method details. Please try again."
                        }
                    }
                ]
            }
        }]
    }
};


