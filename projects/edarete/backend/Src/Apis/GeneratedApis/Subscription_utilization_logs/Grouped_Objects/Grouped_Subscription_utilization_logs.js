const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSubscription_utilization_logs_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_utilization_logs (subscription_renewal_id, amount, usage_type, metadata , created_by, updated_by) VALUES ({{subscriptionUtilizationLogs_subscriptionRenewalId}}, {{subscriptionUtilizationLogs_amount}}, {{subscriptionUtilizationLogs_usageType}}, {{subscriptionUtilizationLogs_metadata}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subscription_utilization_logs SET subscription_renewal_id = {{subscriptionUtilizationLogs_subscriptionRenewalId}}, amount = {{subscriptionUtilizationLogs_amount}}, usage_type = {{subscriptionUtilizationLogs_usageType}}, metadata = {{subscriptionUtilizationLogs_metadata}}, created_by = {{subscriptionUtilizationLogs_createdBy}}, updated_by = {{subscriptionUtilizationLogs_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as subscriptionUtilizationLogs_id,id as id, subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId, subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount, subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType, subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata  FROM subscription_utilization_logs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_utilization_logs.id as subscriptionUtilizationLogs_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subscription_renewal.id as subscriptionRenewal_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subscription_renewal.id as  subscriptionRenewal_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          subscription_utilization_logs.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subscription_renewal.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId, subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount, subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType, subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_utilization_logs LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_utilization_logs.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.id = subscription_utilization_logs.subscription_renewal_id AND subscription_renewal.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR application_subscriptions.id = subscription_renewal.subscription_id) LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.id = subscription_renewal.transaction_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (subscription_utilization_logs.id = {{id}}  AND  subscription_utilization_logs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subscription_utilization_logs SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "subscription_utilization_logs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date, specific_attributes , created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{userRolesDesignationsDepartment_specificAttributes}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}}, specific_attributes = {{userRolesDesignationsDepartment_specificAttributes}}, created_by = {{userRolesDesignationsDepartment_createdBy}}, updated_by = {{userRolesDesignationsDepartment_updatedBy}} WHERE user_role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_department_id as userRolesDesignationsDepartment_id,user_role_designation_department_id as id, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes  FROM user_roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_utilization_logs.id as subscriptionUtilizationLogs_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subscription_renewal.id as subscriptionRenewal_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subscription_renewal.id as  subscriptionRenewal_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          subscription_utilization_logs.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subscription_renewal.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_utilization_logs LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_utilization_logs.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.id = subscription_utilization_logs.subscription_renewal_id AND subscription_renewal.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR application_subscriptions.id = subscription_renewal.subscription_id) LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.id = subscription_renewal.transaction_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET status = 'inactive' WHERE user_role_designation_department_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "user_roles_designations_department Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_renewal (subscription_id, transaction_id, credits_given, credits_used, renewal_type, logged_at , created_by, updated_by) VALUES ({{subscriptionRenewal_subscriptionId}}, {{subscriptionRenewal_transactionId}}, {{subscriptionRenewal_creditsGiven}}, {{subscriptionRenewal_creditsUsed}}, {{subscriptionRenewal_renewalType}}, {{subscriptionRenewal_loggedAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subscription_renewal SET subscription_id = {{subscriptionRenewal_subscriptionId}}, transaction_id = {{subscriptionRenewal_transactionId}}, credits_given = {{subscriptionRenewal_creditsGiven}}, credits_used = {{subscriptionRenewal_creditsUsed}}, renewal_type = {{subscriptionRenewal_renewalType}}, logged_at = {{subscriptionRenewal_loggedAt}}, created_by = {{subscriptionRenewal_createdBy}}, updated_by = {{subscriptionRenewal_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as subscriptionRenewal_id,id as id, subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId, subscription_renewal.transaction_id as subscriptionRenewal_transactionId, subscription_renewal.credits_given as subscriptionRenewal_creditsGiven, subscription_renewal.credits_used as subscriptionRenewal_creditsUsed, subscription_renewal.renewal_type as subscriptionRenewal_renewalType, subscription_renewal.logged_at as subscriptionRenewal_loggedAt  FROM subscription_renewal WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_utilization_logs.id as subscriptionUtilizationLogs_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subscription_renewal.id as subscriptionRenewal_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subscription_renewal.id as  subscriptionRenewal_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          subscription_utilization_logs.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subscription_renewal.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId, subscription_renewal.transaction_id as subscriptionRenewal_transactionId, subscription_renewal.credits_given as subscriptionRenewal_creditsGiven, subscription_renewal.credits_used as subscriptionRenewal_creditsUsed, subscription_renewal.renewal_type as subscriptionRenewal_renewalType, subscription_renewal.logged_at as subscriptionRenewal_loggedAt, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_utilization_logs LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_utilization_logs.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.id = subscription_utilization_logs.subscription_renewal_id AND subscription_renewal.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR application_subscriptions.id = subscription_renewal.subscription_id) LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.id = subscription_renewal.transaction_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (subscription_renewal.id = {{id}}  AND  subscription_renewal.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subscription_renewal SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "subscription_renewal Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsSubscription_utilization_logs_object}