/* CRUD Objects for table: subscription_renewal */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSubscription_renewal_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_renewal (subscription_id, transaction_id, credits_given, credits_used, renewal_type, logged_at, created_by, updated_by) VALUES ({{subscriptionRenewal_subscriptionId}}, {{subscriptionRenewal_transactionId}}, {{subscriptionRenewal_creditsGiven}}, {{subscriptionRenewal_creditsUsed}}, {{subscriptionRenewal_renewalType}}, {{subscriptionRenewal_loggedAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE subscription_renewal SET subscription_id = {{subscriptionRenewal_subscriptionId}}, transaction_id = {{subscriptionRenewal_transactionId}}, credits_given = {{subscriptionRenewal_creditsGiven}}, credits_used = {{subscriptionRenewal_creditsUsed}}, renewal_type = {{subscriptionRenewal_renewalType}}, logged_at = {{subscriptionRenewal_loggedAt}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, subscription_renewal.id as subscriptionRenewal_id, subscription_renewal.id as id, subscription_renewal.id as subscriptionRenewal_id,subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId,subscription_renewal.transaction_id as subscriptionRenewal_transactionId,subscription_renewal.credits_given as subscriptionRenewal_creditsGiven,subscription_renewal.credits_used as subscriptionRenewal_creditsUsed,subscription_renewal.renewal_type as subscriptionRenewal_renewalType,subscription_renewal.logged_at as subscriptionRenewal_loggedAt,subscription_renewal.created_by as subscriptionRenewal_createdBy,subscription_renewal.updated_by as subscriptionRenewal_updatedBy,subscription_renewal.status as subscriptionRenewal_status,subscription_renewal.created_at as subscriptionRenewal_createdAt,subscription_renewal.updated_at as subscriptionRenewal_updatedAt FROM subscription_renewal  Where subscription_renewal.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT subscription_renewal.id as subscriptionRenewal_id, subscription_renewal.id as id, subscription_renewal.id as subscriptionRenewal_id,subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId,subscription_renewal.transaction_id as subscriptionRenewal_transactionId,subscription_renewal.credits_given as subscriptionRenewal_creditsGiven,subscription_renewal.credits_used as subscriptionRenewal_creditsUsed,subscription_renewal.renewal_type as subscriptionRenewal_renewalType,subscription_renewal.logged_at as subscriptionRenewal_loggedAt,subscription_renewal.created_by as subscriptionRenewal_createdBy,subscription_renewal.updated_by as subscriptionRenewal_updatedBy,subscription_renewal.status as subscriptionRenewal_status,subscription_renewal.created_at as subscriptionRenewal_createdAt,subscription_renewal.updated_at as subscriptionRenewal_updatedAt FROM subscription_renewal  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE subscription_renewal SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_subscription_renewal", View: "view_subscription_renewal", Update: "update_subscription_renewal", Delete: "delete_subscription_renewal", List: "list_subscription_renewal" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Subscription_renewal CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Subscription_renewal.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSubscription_renewal_object}