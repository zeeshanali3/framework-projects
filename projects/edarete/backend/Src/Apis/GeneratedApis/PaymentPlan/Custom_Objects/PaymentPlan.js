const paymentPlanHandler = require("../../../../HelperFunctions/PreProcessingFunctions/PaymentPlan/paymentMethodRouter")
const paymentMethodRouter = require("../../../../HelperFunctions/PreProcessingFunctions/PaymentPlan/paymentMethodRouter")

global.PaymentPlan_object = {
  "versions": {
    "versionData": [{
      "*": {
        "steps": [
          {
            "platform": [
              {
                "supported": ["*"],
                "config": {
                  "features": {
                    "multistep": false,
                    "parameters": true,
                    "pagination": false,
                  },
                  "communication": {
                    /*"encryption": {
                      "platformEncryption": true,
                    }*/
                  },
                  "verification": {
                    "otp": false,
                    "accessToken": false
                  }
                }
              }
            ],
            "data": {
              "parameters": {
                "fields": [
                  {
                    "name": "urdd_id",
                    "validations": ["isValidNumber"],
                    "required": true,
                    "source": "req.body"
                  },
                  {
                    "name": "plan_id",
                    "validations": ["isValidNumber"],
                    "required": true,
                    "source": "req.body"
                  },
                  {
                    "name": "payment_method_id",
                    "validations": ["isValidNumber"],
                    "required": true,
                    "source": "req.body"
                  },
                  {
                    "name": "payment_details",
                    "validations": [],
                    "required": false,
                    "source": "req.body"
                  },
                  {
                    "name": "transaction_id",
                    "validations": [],
                    "required": false,
                    "source": "req.body"
                  }
                ]
              },
              "apiInfo": {
                "query": {
                  "queryNature": "",
                  "queryPayload": "", 
                  "database": "mainDb"
                },
                "utilityFunctions": {
                  "callbackFunction": null,
                  "payloadFunction": []
                },
                "preProcessFunction": [paymentMethodRouter],
                "postProcessFunction": paymentPlanHandler
              },
              "requestMetaData": {
                "requestMethod": "POST",
                "permission": null,
                "pagination": false
              }
            },
            "response": {
              "successMessage": "Payment processed successfully!",
              "errorMessage": "Failed to process payment."
            }
          }
        ]
      }
    }]
  }
}

module.exports = { PaymentPlan_object }
