const { signUpVerif } = require("../../../../HelperFunctions/PreProcessingFunctions/signUpVerif")
const generateToken = require("../../../../../Services/SysFunctions/jwtUtils");


global.ExtSignUp_object = {
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
                },
                "verification" : {
                    "otp" : true,
                    "accessToken" : false
                }
              },
              "data": {
                "parameters": {
                  "fields": 
                    [
                    ]
                },
                "apiInfo": 
                  {
                    "preProcessFunction": [signUpVerif],
                    "query": {
                      "queryNature": "",
                      "queryPayload": async (req, decryptedPayload) =>{
                        const signUpPayload = decryptedPayload["signUpVerif"];
                        return  `INSERT INTO users (first_name, email, signIn_Flag) VALUES ('${signUpPayload.name}', '${signUpPayload.email}', '${signUpPayload.source}')`
                      },
                      "database" : "ubs_db"
                    },
                    "utilityFunctions": {
                      "callbackFunction": null,
                      "payloadFunction": []
                    }
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
  module.exports = {ExtSignUp_object}