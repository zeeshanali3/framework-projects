/* CRUD Objects for table: application_subscriptions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudApplication_subscriptions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO application_subscriptions (urdd_id, plan_id, user_payment_method_id, discount_id, start_date, expiry_date, is_trial, trial_end_date, auto_renew, created_by, updated_by) VALUES ({{applicationSubscriptions_urddId}}, {{applicationSubscriptions_planId}}, {{applicationSubscriptions_userPaymentMethodId}}, {{applicationSubscriptions_discountId}}, {{applicationSubscriptions_startDate}}, {{applicationSubscriptions_expiryDate}}, {{applicationSubscriptions_isTrial}}, {{applicationSubscriptions_trialEndDate}}, {{applicationSubscriptions_autoRenew}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE application_subscriptions SET urdd_id = {{applicationSubscriptions_urddId}}, plan_id = {{applicationSubscriptions_planId}}, user_payment_method_id = {{applicationSubscriptions_userPaymentMethodId}}, discount_id = {{applicationSubscriptions_discountId}}, start_date = {{applicationSubscriptions_startDate}}, expiry_date = {{applicationSubscriptions_expiryDate}}, is_trial = {{applicationSubscriptions_isTrial}}, trial_end_date = {{applicationSubscriptions_trialEndDate}}, auto_renew = {{applicationSubscriptions_autoRenew}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, application_subscriptions.id as applicationSubscriptions_id, application_subscriptions.id as id, application_subscriptions.id as applicationSubscriptions_id,application_subscriptions.urdd_id as applicationSubscriptions_urddId,application_subscriptions.plan_id as applicationSubscriptions_planId,application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId,application_subscriptions.discount_id as applicationSubscriptions_discountId,application_subscriptions.start_date as applicationSubscriptions_startDate,application_subscriptions.expiry_date as applicationSubscriptions_expiryDate,application_subscriptions.is_trial as applicationSubscriptions_isTrial,application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate,application_subscriptions.auto_renew as applicationSubscriptions_autoRenew,application_subscriptions.created_by as applicationSubscriptions_createdBy,application_subscriptions.updated_by as applicationSubscriptions_updatedBy,application_subscriptions.status as applicationSubscriptions_status,application_subscriptions.created_at as applicationSubscriptions_createdAt,application_subscriptions.updated_at as applicationSubscriptions_updatedAt, plans.name as plans_name FROM application_subscriptions LEFT JOIN plans ON application_subscriptions.plan_id = plans.id Where application_subscriptions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT application_subscriptions.id as applicationSubscriptions_id, application_subscriptions.id as id, application_subscriptions.id as applicationSubscriptions_id,application_subscriptions.urdd_id as applicationSubscriptions_urddId,application_subscriptions.plan_id as applicationSubscriptions_planId,application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId,application_subscriptions.discount_id as applicationSubscriptions_discountId,application_subscriptions.start_date as applicationSubscriptions_startDate,application_subscriptions.expiry_date as applicationSubscriptions_expiryDate,application_subscriptions.is_trial as applicationSubscriptions_isTrial,application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate,application_subscriptions.auto_renew as applicationSubscriptions_autoRenew,application_subscriptions.created_by as applicationSubscriptions_createdBy,application_subscriptions.updated_by as applicationSubscriptions_updatedBy,application_subscriptions.status as applicationSubscriptions_status,application_subscriptions.created_at as applicationSubscriptions_createdAt,application_subscriptions.updated_at as applicationSubscriptions_updatedAt, plans.name as plans_name FROM application_subscriptions LEFT JOIN plans ON application_subscriptions.plan_id = plans.id WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE application_subscriptions SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_application_subscriptions", View: "view_application_subscriptions", Update: "update_application_subscriptions", Delete: "delete_application_subscriptions", List: "list_application_subscriptions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Application_subscriptions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Application_subscriptions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudApplication_subscriptions_object}