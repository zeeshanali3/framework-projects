/* CRUD Objects for table: plans */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPlans_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO plans (name, duration_type, ai_credits_amount, currency_id, services, price, region, is_active, is_public, created_by, updated_by) VALUES ({{plans_name}}, {{plans_durationType}}, {{plans_aiCreditsAmount}}, {{plans_currencyId}}, {{plans_services}}, {{plans_price}}, {{plans_region}}, {{plans_isActive}}, {{plans_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE plans SET name = {{plans_name}}, duration_type = {{plans_durationType}}, ai_credits_amount = {{plans_aiCreditsAmount}}, currency_id = {{plans_currencyId}}, services = {{plans_services}}, price = {{plans_price}}, region = {{plans_region}}, is_active = {{plans_isActive}}, is_public = {{plans_isPublic}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, plans.id as plans_id, plans.id as id, plans.id as plans_id,plans.name as plans_name,plans.duration_type as plans_durationType,plans.ai_credits_amount as plans_aiCreditsAmount,plans.currency_id as plans_currencyId,plans.services as plans_services,plans.price as plans_price,plans.region as plans_region,plans.is_active as plans_isActive,plans.is_public as plans_isPublic,plans.created_by as plans_createdBy,plans.updated_by as plans_updatedBy,plans.status as plans_status,plans.created_at as plans_createdAt,plans.updated_at as plans_updatedAt FROM plans  Where plans.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT plans.id as plans_id, plans.id as id, plans.id as plans_id,plans.name as plans_name,plans.duration_type as plans_durationType,plans.ai_credits_amount as plans_aiCreditsAmount,plans.currency_id as plans_currencyId,plans.services as plans_services,plans.price as plans_price,plans.region as plans_region,plans.is_active as plans_isActive,plans.is_public as plans_isPublic,plans.created_by as plans_createdBy,plans.updated_by as plans_updatedBy,plans.status as plans_status,plans.created_at as plans_createdAt,plans.updated_at as plans_updatedAt FROM plans  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE plans SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_plans", View: "view_plans", Update: "update_plans", Delete: "delete_plans", List: "list_plans" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Plans CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Plans.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPlans_object}