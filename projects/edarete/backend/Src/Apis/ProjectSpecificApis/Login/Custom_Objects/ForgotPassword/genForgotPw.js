const { forgotPw, verifyOtp } = require("../../../../../HelperFunctions/PostProcessingFunctions/ForgotPassword/forgotPw")
const loginWithPW = require("../../../../../HelperFunctions/PostProcessingFunctions/LoginWithPassword/lwp")

global.ForgotPassword_object = {
    "versions": {
      "versionData": [{
        "*": {
          "steps":[
            {
            "config": {
              "features": {
                "multistep": true,
                "parameters": true,
                "pagination": false,
              },
              "communication": {
                "encryption":false
                // "encryption": {
                //   "platformEncryption": true,
                // }
              },
              "verification" : {
                  "otp" : false,
                  "accessToken" : false
              }
              
            },
            "data": {
              "parameters": {
                "fields": 
                  [
                    {
                      "name": "email",
                      "validations": [],
                      "required": true,
                      "source": "req.body"
                    }
                  ]
              },
              "apiInfo": 
                {
                  "query": {
                    "queryNature": "",
                    "queryPayload": "SELECT * FROM users WHERE email = {{email}}",
                    "database" : "projectDB"
                  },
                  "utilityFunctions": {
                    "callbackFunction": null,
                    "payloadFunction": []
                  },
                  postProcessFunction: forgotPw
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
              "successMessage": "OTP sent to email successfully!",
              "errorMessage": "There was an error emailing the OTP."
            }
            },
            {
              "config": {
                "features": {
                  "multistep": true,
                  "parameters": true,
                  "pagination": false,
                },
                "communication": {
                  "encryption":false
                  // "encryption": {
                  //   "platformEncryption": true,
                  // }
                },
                "verification" : {
                    "otp" : false,
                    "accessToken" : false
                }
              },
              "data": {
                "parameters": {
                  "fields": 
                    [
                      {
                        "name": "email",
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
                "apiInfo": 
                  {
                    "query": {
                      "queryNature": "",
                      "queryPayload": `SELECT *
                                      FROM users
                                      WHERE email = {{email}} AND forget_pw_otp = {{otp}}`,
                      "database" : "projectDB"
                    },
                    "utilityFunctions": {
                      "callbackFunction": null,
                      "payloadFunction": []
                    },
                    postProcessFunction: verifyOtp
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
                "successMessage": "OTP verified successfully!",
                "errorMessage": "There was an error verifynig the OTP."
              }
              }
            ]
        },
      }]
    }
  }
  module.exports = {ForgotPassword_object}