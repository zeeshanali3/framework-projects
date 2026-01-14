const parameters = {
              "steps": [
                  {
                  "title": "Subscription Utilization Logs Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "subscription_utilization_logs",
                          "type": "section",
                          "title": "Subscription Utilization Logs CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Subscription_utilization_logs",
                          "childFields": [
                                {
                                  "name": "subscriptionUtilizationLogs_id",
                                  "label": "id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": true,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.query",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "subscriptionUtilizationLogs_id"
                                },
                               {
                                  "name": "actionPerformerURDD",
                                  "label": "actionPerformerURDD",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "actionPerformerURDD",
                                  "alias" : "actionPerformerURDD",
                                },
                              
                                  {
                                  "name": "subscription_renewal_id",
                                  "label": "Subscription Renewal Id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "subscriptionUtilizationLogs_subscriptionRenewalId",
                                  "alias" : "subscription_utilization_logs.subscription_renewal_id",
                                  },
                                  {
                                  "name": "amount",
                                  "label": "Amount",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "subscriptionUtilizationLogs_amount",
                                  "alias" : "subscription_utilization_logs.amount",
                                  },
                                  {
                                  "name": "usage_type",
                                  "label": "Usage Type",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "subscriptionUtilizationLogs_usageType",
                                  "alias" : "subscription_utilization_logs.usage_type",
                                  },
                                  {
                                  "name": "metadata",
                                  "label": "Metadata",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "subscriptionUtilizationLogs_metadata",
                                  "alias" : "subscription_utilization_logs.metadata",
                                  },
                                  
                          ]
                      }
                      ]
                  },
                  "buttons": [
                      {
                      "type": "submit",
                      "label": "Submit"
                      }
                  ]
                  }
              ],
              "colMapper": "{ 'subscription_utilization_logs_id' : 'id',  'subscription_utilization_logs_subscriptionRenewalId' : 'subscription_renewal_id',  'subscription_utilization_logs_amount' : 'amount',  'subscription_utilization_logs_usageType' : 'usage_type',  'subscription_utilization_logs_metadata' : 'metadata',  'subscription_utilization_logs_createdBy' : 'created_by',  'subscription_utilization_logs_updatedBy' : 'updated_by',  'subscription_utilization_logs_status' : 'status',  'subscription_utilization_logs_createdAt' : 'created_at',  'subscription_utilization_logs_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;