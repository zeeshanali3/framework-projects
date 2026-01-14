/* CRUD Objects for table: subscription_utilization_logs */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSubscription_utilization_logs_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                              accessToken: true
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_utilization_logs (subscription_renewal_id, amount, usage_type, metadata, created_by, updated_by) VALUES ({{subscriptionUtilizationLogs_subscriptionRenewalId}}, {{subscriptionUtilizationLogs_amount}}, {{subscriptionUtilizationLogs_usageType}}, {{subscriptionUtilizationLogs_metadata}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE subscription_utilization_logs SET subscription_renewal_id = {{subscriptionUtilizationLogs_subscriptionRenewalId}}, amount = {{subscriptionUtilizationLogs_amount}}, usage_type = {{subscriptionUtilizationLogs_usageType}}, metadata = {{subscriptionUtilizationLogs_metadata}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, subscription_utilization_logs.id as id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id,subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId,subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount,subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType,subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata,subscription_utilization_logs.created_by as subscriptionUtilizationLogs_createdBy,subscription_utilization_logs.updated_by as subscriptionUtilizationLogs_updatedBy,subscription_utilization_logs.status as subscriptionUtilizationLogs_status,subscription_utilization_logs.created_at as subscriptionUtilizationLogs_createdAt,subscription_utilization_logs.updated_at as subscriptionUtilizationLogs_updatedAt FROM subscription_utilization_logs  Where subscription_utilization_logs.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT subscription_utilization_logs.id as subscriptionUtilizationLogs_id, subscription_utilization_logs.id as id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id,subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId,subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount,subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType,subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata,subscription_utilization_logs.created_by as subscriptionUtilizationLogs_createdBy,subscription_utilization_logs.updated_by as subscriptionUtilizationLogs_updatedBy,subscription_utilization_logs.status as subscriptionUtilizationLogs_status,subscription_utilization_logs.created_at as subscriptionUtilizationLogs_createdAt,subscription_utilization_logs.updated_at as subscriptionUtilizationLogs_updatedAt FROM subscription_utilization_logs  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE subscription_utilization_logs SET status = 'inactive' WHERE id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_subscription_utilization_logs", View: "view_subscription_utilization_logs", Update: "update_subscription_utilization_logs", Delete: "delete_subscription_utilization_logs", List: "list_subscription_utilization_logs" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Subscription_utilization_logs CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Subscription_utilization_logs.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSubscription_utilization_logs_object}