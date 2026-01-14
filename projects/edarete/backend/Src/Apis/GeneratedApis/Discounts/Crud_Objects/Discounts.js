/* CRUD Objects for table: discounts */
      
      const parameters = require('./CRUD_parameters');
      global.CrudDiscounts_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO discounts (code, description, config_parameters, discount_percentage, usage_info, is_active, expires_at, created_by, updated_by) VALUES ({{discounts_code}}, {{discounts_description}}, {{discounts_configParameters}}, {{discounts_discountPercentage}}, {{discounts_usageInfo}}, {{discounts_isActive}}, {{discounts_expiresAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE discounts SET code = {{discounts_code}}, description = {{discounts_description}}, config_parameters = {{discounts_configParameters}}, discount_percentage = {{discounts_discountPercentage}}, usage_info = {{discounts_usageInfo}}, is_active = {{discounts_isActive}}, expires_at = {{discounts_expiresAt}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, discounts.id as discounts_id, discounts.id as id, discounts.id as discounts_id,discounts.code as discounts_code,discounts.description as discounts_description,discounts.config_parameters as discounts_configParameters,discounts.discount_percentage as discounts_discountPercentage,discounts.usage_info as discounts_usageInfo,discounts.is_active as discounts_isActive,discounts.expires_at as discounts_expiresAt,discounts.created_by as discounts_createdBy,discounts.updated_by as discounts_updatedBy,discounts.status as discounts_status,discounts.created_at as discounts_createdAt,discounts.updated_at as discounts_updatedAt FROM discounts  Where discounts.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT discounts.id as discounts_id, discounts.id as id, discounts.id as discounts_id,discounts.code as discounts_code,discounts.description as discounts_description,discounts.config_parameters as discounts_configParameters,discounts.discount_percentage as discounts_discountPercentage,discounts.usage_info as discounts_usageInfo,discounts.is_active as discounts_isActive,discounts.expires_at as discounts_expiresAt,discounts.created_by as discounts_createdBy,discounts.updated_by as discounts_updatedBy,discounts.status as discounts_status,discounts.created_at as discounts_createdAt,discounts.updated_at as discounts_updatedAt FROM discounts  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE discounts SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_discounts", View: "view_discounts", Update: "update_discounts", Delete: "delete_discounts", List: "list_discounts" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Discounts CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Discounts.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudDiscounts_object}