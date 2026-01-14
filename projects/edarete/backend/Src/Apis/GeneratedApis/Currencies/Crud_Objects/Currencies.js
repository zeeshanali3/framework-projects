/* CRUD Objects for table: currencies */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCurrencies_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO currencies (code, exchange_rate, is_active, created_by, updated_by) VALUES ({{currencies_code}}, {{currencies_exchangeRate}}, {{currencies_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE currencies SET code = {{currencies_code}}, exchange_rate = {{currencies_exchangeRate}}, is_active = {{currencies_isActive}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, currencies.id as currencies_id, currencies.id as id, currencies.id as currencies_id,currencies.code as currencies_code,currencies.exchange_rate as currencies_exchangeRate,currencies.is_active as currencies_isActive,currencies.created_by as currencies_createdBy,currencies.updated_by as currencies_updatedBy,currencies.status as currencies_status,currencies.created_at as currencies_createdAt,currencies.updated_at as currencies_updatedAt FROM currencies  Where currencies.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT currencies.id as currencies_id, currencies.id as id, currencies.id as currencies_id,currencies.code as currencies_code,currencies.exchange_rate as currencies_exchangeRate,currencies.is_active as currencies_isActive,currencies.created_by as currencies_createdBy,currencies.updated_by as currencies_updatedBy,currencies.status as currencies_status,currencies.created_at as currencies_createdAt,currencies.updated_at as currencies_updatedAt FROM currencies  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE currencies SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_currencies", View: "view_currencies", Update: "update_currencies", Delete: "delete_currencies", List: "list_currencies" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Currencies CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Currencies.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCurrencies_object}