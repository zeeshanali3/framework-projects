/* CRUD Objects for table: transactions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudTransactions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO transactions (urdd_id, subscription_id, user_payment_method_id, amount, currency_id, transaction_type, gateway_response, description, created_by, updated_by) VALUES ({{transactions_urddId}}, {{transactions_subscriptionId}}, {{transactions_userPaymentMethodId}}, {{transactions_amount}}, {{transactions_currencyId}}, {{transactions_transactionType}}, {{transactions_gatewayResponse}}, {{transactions_description}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE transactions SET urdd_id = {{transactions_urddId}}, subscription_id = {{transactions_subscriptionId}}, user_payment_method_id = {{transactions_userPaymentMethodId}}, amount = {{transactions_amount}}, currency_id = {{transactions_currencyId}}, transaction_type = {{transactions_transactionType}}, gateway_response = {{transactions_gatewayResponse}}, description = {{transactions_description}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, transactions.id as transactions_id, transactions.id as id, transactions.id as transactions_id,transactions.urdd_id as transactions_urddId,transactions.subscription_id as transactions_subscriptionId,transactions.user_payment_method_id as transactions_userPaymentMethodId,transactions.amount as transactions_amount,transactions.currency_id as transactions_currencyId,transactions.transaction_type as transactions_transactionType,transactions.gateway_response as transactions_gatewayResponse,transactions.description as transactions_description,transactions.created_by as transactions_createdBy,transactions.updated_by as transactions_updatedBy,transactions.status as transactions_status,transactions.created_at as transactions_createdAt,transactions.updated_at as transactions_updatedAt FROM transactions  Where transactions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT transactions.id as transactions_id, transactions.id as id, transactions.id as transactions_id,transactions.urdd_id as transactions_urddId,transactions.subscription_id as transactions_subscriptionId,transactions.user_payment_method_id as transactions_userPaymentMethodId,transactions.amount as transactions_amount,transactions.currency_id as transactions_currencyId,transactions.transaction_type as transactions_transactionType,transactions.gateway_response as transactions_gatewayResponse,transactions.description as transactions_description,transactions.created_by as transactions_createdBy,transactions.updated_by as transactions_updatedBy,transactions.status as transactions_status,transactions.created_at as transactions_createdAt,transactions.updated_at as transactions_updatedAt FROM transactions  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE transactions SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_transactions", View: "view_transactions", Update: "update_transactions", Delete: "delete_transactions", List: "list_transactions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Transactions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Transactions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudTransactions_object}