const { executeUserDashboardQueries } = require("../../../../HelperFunctions/PayloadFunctions/UserAdminDashboard/getUserAdminDashboardInfo");


global.UserAdminDashboard_object = {
    "versions": {
      "versionData": [{
        "*": {
          "steps":[
            {
            "config": {
              "features": {
                "multistep": false,
                "parameters": true,
                "pagination": false,
              },
              "communication": {
                /*"encryption": {
                  "platformEncryption": true,
                },*/
                // "encryption": false

              },
              "verification" : {
                  "otp" : false,
                  "accessToken" : false
              }
            },
            "data": {
              "parameters": {
                "fields": [
                  {
                    "name": "urdd_id",
                    "validations": [],
                    "required": true,
                    "source": "req.query"
                  }
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
                    "payloadFunction": [executeUserDashboardQueries],
                    "crudFunction" : "crudApiGenerator"
                  }
                }
              ,
              "requestMetaData": {
                "requestMethod": {"List" : "GET", "View" : "GET"},
                "permission": null,
                "pagination": {
                  "pageSize": 10
                }
              }
            },
            "response": {
              "successMessage": "User dashboard data retrieved successfully!",
              "errorMessage": "There was an error retrieving dashboard data."
            }
            },
            ]
        },
      }]
    }
  }

module.exports = {UserAdminDashboard_object}
