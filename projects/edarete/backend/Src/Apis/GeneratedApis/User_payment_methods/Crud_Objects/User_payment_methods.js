/* CRUD Objects for table: user_payment_methods */
      
      const parameters = require('./CRUD_parameters');
      global.CrudUser_payment_methods_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO user_payment_methods (urdd_id, supported_payment_method_id, payment_details, is_verified, verification_amount, verification_status, verification_transaction_id, is_default, is_active, created_by, updated_by) VALUES ({{userPaymentMethods_urddId}}, {{userPaymentMethods_supportedPaymentMethodId}}, {{userPaymentMethods_paymentDetails}}, {{userPaymentMethods_isVerified}}, {{userPaymentMethods_verificationAmount}}, {{userPaymentMethods_verificationStatus}}, {{userPaymentMethods_verificationTransactionId}}, {{userPaymentMethods_isDefault}}, {{userPaymentMethods_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE user_payment_methods SET urdd_id = {{userPaymentMethods_urddId}}, supported_payment_method_id = {{userPaymentMethods_supportedPaymentMethodId}}, payment_details = {{userPaymentMethods_paymentDetails}}, is_verified = {{userPaymentMethods_isVerified}}, verification_amount = {{userPaymentMethods_verificationAmount}}, verification_status = {{userPaymentMethods_verificationStatus}}, verification_transaction_id = {{userPaymentMethods_verificationTransactionId}}, is_default = {{userPaymentMethods_isDefault}}, is_active = {{userPaymentMethods_isActive}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_payment_methods.id as userPaymentMethods_id, user_payment_methods.id as id, user_payment_methods.id as userPaymentMethods_id,user_payment_methods.urdd_id as userPaymentMethods_urddId,user_payment_methods.supported_payment_method_id as userPaymentMethods_supportedPaymentMethodId,user_payment_methods.payment_details as userPaymentMethods_paymentDetails,user_payment_methods.is_verified as userPaymentMethods_isVerified,user_payment_methods.verification_amount as userPaymentMethods_verificationAmount,user_payment_methods.verification_status as userPaymentMethods_verificationStatus,user_payment_methods.verification_transaction_id as userPaymentMethods_verificationTransactionId,user_payment_methods.is_default as userPaymentMethods_isDefault,user_payment_methods.is_active as userPaymentMethods_isActive,user_payment_methods.created_by as userPaymentMethods_createdBy,user_payment_methods.updated_by as userPaymentMethods_updatedBy,user_payment_methods.status as userPaymentMethods_status,user_payment_methods.created_at as userPaymentMethods_createdAt,user_payment_methods.updated_at as userPaymentMethods_updatedAt, supported_payment_methods.name as supported_payment_methods_name FROM user_payment_methods LEFT JOIN supported_payment_methods ON user_payment_methods.supported_payment_method_id = supported_payment_methods.id Where user_payment_methods.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT user_payment_methods.id as userPaymentMethods_id, user_payment_methods.id as id, user_payment_methods.id as userPaymentMethods_id,user_payment_methods.urdd_id as userPaymentMethods_urddId,user_payment_methods.supported_payment_method_id as userPaymentMethods_supportedPaymentMethodId,user_payment_methods.payment_details as userPaymentMethods_paymentDetails,user_payment_methods.is_verified as userPaymentMethods_isVerified,user_payment_methods.verification_amount as userPaymentMethods_verificationAmount,user_payment_methods.verification_status as userPaymentMethods_verificationStatus,user_payment_methods.verification_transaction_id as userPaymentMethods_verificationTransactionId,user_payment_methods.is_default as userPaymentMethods_isDefault,user_payment_methods.is_active as userPaymentMethods_isActive,user_payment_methods.created_by as userPaymentMethods_createdBy,user_payment_methods.updated_by as userPaymentMethods_updatedBy,user_payment_methods.status as userPaymentMethods_status,user_payment_methods.created_at as userPaymentMethods_createdAt,user_payment_methods.updated_at as userPaymentMethods_updatedAt, supported_payment_methods.name as supported_payment_methods_name FROM user_payment_methods LEFT JOIN supported_payment_methods ON user_payment_methods.supported_payment_method_id = supported_payment_methods.id WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE user_payment_methods SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_user_payment_methods", View: "view_user_payment_methods", Update: "update_user_payment_methods", Delete: "delete_user_payment_methods", List: "list_user_payment_methods" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "User_payment_methods CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve User_payment_methods.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudUser_payment_methods_object}