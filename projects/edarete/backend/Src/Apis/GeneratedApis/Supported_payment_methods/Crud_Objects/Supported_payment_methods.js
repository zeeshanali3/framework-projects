/* CRUD Objects for table: supported_payment_methods */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSupported_payment_methods_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO supported_payment_methods (name, provider_details, discount_id, supported_currencies, is_active, created_by, updated_by) VALUES ({{supportedPaymentMethods_name}}, {{supportedPaymentMethods_providerDetails}}, {{supportedPaymentMethods_discountId}}, {{supportedPaymentMethods_supportedCurrencies}}, {{supportedPaymentMethods_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE supported_payment_methods SET name = {{supportedPaymentMethods_name}}, provider_details = {{supportedPaymentMethods_providerDetails}}, discount_id = {{supportedPaymentMethods_discountId}}, supported_currencies = {{supportedPaymentMethods_supportedCurrencies}}, is_active = {{supportedPaymentMethods_isActive}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, supported_payment_methods.id as supportedPaymentMethods_id, supported_payment_methods.id as id, supported_payment_methods.id as supportedPaymentMethods_id,supported_payment_methods.name as supportedPaymentMethods_name,supported_payment_methods.provider_details as supportedPaymentMethods_providerDetails,supported_payment_methods.discount_id as supportedPaymentMethods_discountId,supported_payment_methods.supported_currencies as supportedPaymentMethods_supportedCurrencies,supported_payment_methods.is_active as supportedPaymentMethods_isActive,supported_payment_methods.created_by as supportedPaymentMethods_createdBy,supported_payment_methods.updated_by as supportedPaymentMethods_updatedBy,supported_payment_methods.status as supportedPaymentMethods_status,supported_payment_methods.created_at as supportedPaymentMethods_createdAt,supported_payment_methods.updated_at as supportedPaymentMethods_updatedAt FROM supported_payment_methods  Where supported_payment_methods.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT supported_payment_methods.id as supportedPaymentMethods_id, supported_payment_methods.id as id, supported_payment_methods.id as supportedPaymentMethods_id,supported_payment_methods.name as supportedPaymentMethods_name,supported_payment_methods.provider_details as supportedPaymentMethods_providerDetails,supported_payment_methods.discount_id as supportedPaymentMethods_discountId,supported_payment_methods.supported_currencies as supportedPaymentMethods_supportedCurrencies,supported_payment_methods.is_active as supportedPaymentMethods_isActive,supported_payment_methods.created_by as supportedPaymentMethods_createdBy,supported_payment_methods.updated_by as supportedPaymentMethods_updatedBy,supported_payment_methods.status as supportedPaymentMethods_status,supported_payment_methods.created_at as supportedPaymentMethods_createdAt,supported_payment_methods.updated_at as supportedPaymentMethods_updatedAt FROM supported_payment_methods  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE supported_payment_methods SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_supported_payment_methods", View: "view_supported_payment_methods", Update: "update_supported_payment_methods", Delete: "delete_supported_payment_methods", List: "list_supported_payment_methods" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Supported_payment_methods CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Supported_payment_methods.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSupported_payment_methods_object}