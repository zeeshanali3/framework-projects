global.Login_object = {
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
                // "encryption":false
                "encryption": {
                  "platformEncryption": true,
                //   "accessTokenEncryption": false,
                }
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
                    {
                      "name": "email",
                      "validations": ["isValidEmailFormat"],
                      "required": true,
                      "source": "req.body"
                    },
                    {
                        "name": "device_name",
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
                    "queryPayload": "",
                    "database" : "projectDB"
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
            },
            {
                "config": {
                  "features": {
                    "multistep": true,
                    "parameters": true,
                    "pagination": false,
                  },
                  "communication": {
                    // "encryption":false
                    "encryption": {
                      "platformEncryption": true,
                      "accessTokenEncryption": false,
                    }
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
                        {
                          "name": "otp",
                          "validations": [],
                          "required": false,
                          "source": "req.body"
                        },
                        {
                            "name": "email",
                            "validations": ["isValidEmailFormat"],
                            "required": true,
                            "source": "req.body"
                        },
                        {
                            "name": "device_name",
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
                        "queryPayload": null,
                        "database" : "projectDB"
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
                      "pageSize": 10,
                      "options": {
                        "pageSizeOptions": [
                          5,
                          10,
                          25,
                          50,
                          100,
                          "All"
                        ]
                      }
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
  module.exports = {Login_object}