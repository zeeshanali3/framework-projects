const loginWithPW = require("../../../../../HelperFunctions/PostProcessingFunctions/LoginWithPassword/lwp")

global.LoginWithPassword_object = {
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
                      "name": "username",
                      "validations": [],
                      "required": true,
                      "source": "req.body"
                    },
                    {
                        "name": "password",
                        "validations": [],
                        "required": true,
                        "source": "req.body"
                    },
                  ]
              },
              "apiInfo": 
                {
                  "query": {
                    "queryNature": "",
                    "queryPayload": "SELECT * FROM users WHERE username = {{username}} AND password = {{password}}",
                    "database" : "projectDB"
                  },
                  "utilityFunctions": {
                    "callbackFunction": null,
                    "payloadFunction": []
                  },
                  postProcessFunction: loginWithPW
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
  module.exports = {LoginWithPassword_object}