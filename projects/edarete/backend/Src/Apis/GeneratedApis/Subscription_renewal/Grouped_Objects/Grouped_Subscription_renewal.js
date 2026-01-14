const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSubscription_renewal_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_renewal (subscription_id, transaction_id, credits_given, credits_used, renewal_type, logged_at , created_by, updated_by) VALUES ({{subscriptionRenewal_subscriptionId}}, {{subscriptionRenewal_transactionId}}, {{subscriptionRenewal_creditsGiven}}, {{subscriptionRenewal_creditsUsed}}, {{subscriptionRenewal_renewalType}}, {{subscriptionRenewal_loggedAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subscription_renewal SET subscription_id = {{subscriptionRenewal_subscriptionId}}, transaction_id = {{subscriptionRenewal_transactionId}}, credits_given = {{subscriptionRenewal_creditsGiven}}, credits_used = {{subscriptionRenewal_creditsUsed}}, renewal_type = {{subscriptionRenewal_renewalType}}, logged_at = {{subscriptionRenewal_loggedAt}}, created_by = {{subscriptionRenewal_createdBy}}, updated_by = {{subscriptionRenewal_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as subscriptionRenewal_id,id as id, subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId, subscription_renewal.transaction_id as subscriptionRenewal_transactionId, subscription_renewal.credits_given as subscriptionRenewal_creditsGiven, subscription_renewal.credits_used as subscriptionRenewal_creditsUsed, subscription_renewal.renewal_type as subscriptionRenewal_renewalType, subscription_renewal.logged_at as subscriptionRenewal_loggedAt  FROM subscription_renewal WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_renewal.id as subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, supported_payment_methods.id as supportedPaymentMethods_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_renewal.id as  subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          subscription_renewal.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, subscription_utilization_logs.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, supported_payment_methods.id as userRolesDesignationsDepartment_id, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plans.name, 10), LEFT(discounts.description, 10), LEFT(users.first_name, 10), LEFT(supported_payment_methods.name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.first_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_applicationSubscriptionsName, subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId, subscription_renewal.transaction_id as subscriptionRenewal_transactionId, subscription_renewal.credits_given as subscriptionRenewal_creditsGiven, subscription_renewal.credits_used as subscriptionRenewal_creditsUsed, subscription_renewal.renewal_type as subscriptionRenewal_renewalType, subscription_renewal.logged_at as subscriptionRenewal_loggedAt, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_renewal LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_renewal.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.id = subscription_renewal.subscription_id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN transactions ON (transactions.id = subscription_renewal.transaction_id OR transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (subscription_renewal.id = {{id}}  AND  subscription_renewal.status != 'inactive')
                          
                          
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
                            subscription_renewal.id as subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, supported_payment_methods.id as supportedPaymentMethods_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_renewal.id as  subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          subscription_renewal.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, subscription_utilization_logs.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, supported_payment_methods.id as userRolesDesignationsDepartment_id, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plans.name, 10), LEFT(discounts.description, 10), LEFT(users.first_name, 10), LEFT(supported_payment_methods.name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.first_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_applicationSubscriptionsName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_renewal LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_renewal.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.id = subscription_renewal.subscription_id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN transactions ON (transactions.id = subscription_renewal.transaction_id OR transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO application_subscriptions (urdd_id, plan_id, user_payment_method_id, discount_id, start_date, expiry_date, is_trial, trial_end_date, auto_renew , created_by, updated_by) VALUES ({{applicationSubscriptions_urddId}}, {{applicationSubscriptions_planId}}, {{applicationSubscriptions_userPaymentMethodId}}, {{applicationSubscriptions_discountId}}, {{applicationSubscriptions_startDate}}, {{applicationSubscriptions_expiryDate}}, {{applicationSubscriptions_isTrial}}, {{applicationSubscriptions_trialEndDate}}, {{applicationSubscriptions_autoRenew}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE application_subscriptions SET urdd_id = {{applicationSubscriptions_urddId}}, plan_id = {{applicationSubscriptions_planId}}, user_payment_method_id = {{applicationSubscriptions_userPaymentMethodId}}, discount_id = {{applicationSubscriptions_discountId}}, start_date = {{applicationSubscriptions_startDate}}, expiry_date = {{applicationSubscriptions_expiryDate}}, is_trial = {{applicationSubscriptions_isTrial}}, trial_end_date = {{applicationSubscriptions_trialEndDate}}, auto_renew = {{applicationSubscriptions_autoRenew}}, created_by = {{applicationSubscriptions_createdBy}}, updated_by = {{applicationSubscriptions_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as applicationSubscriptions_id,id as id, application_subscriptions.urdd_id as applicationSubscriptions_urddId, application_subscriptions.plan_id as applicationSubscriptions_planId, application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId, application_subscriptions.discount_id as applicationSubscriptions_discountId, application_subscriptions.start_date as applicationSubscriptions_startDate, application_subscriptions.expiry_date as applicationSubscriptions_expiryDate, application_subscriptions.is_trial as applicationSubscriptions_isTrial, application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate, application_subscriptions.auto_renew as applicationSubscriptions_autoRenew  FROM application_subscriptions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_renewal.id as subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, supported_payment_methods.id as supportedPaymentMethods_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_renewal.id as  subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          subscription_renewal.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, subscription_utilization_logs.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, supported_payment_methods.id as userRolesDesignationsDepartment_id, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plans.name, 10), LEFT(discounts.description, 10), LEFT(users.first_name, 10), LEFT(supported_payment_methods.name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.first_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_applicationSubscriptionsName, application_subscriptions.urdd_id as applicationSubscriptions_urddId, application_subscriptions.plan_id as applicationSubscriptions_planId, application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId, application_subscriptions.discount_id as applicationSubscriptions_discountId, application_subscriptions.start_date as applicationSubscriptions_startDate, application_subscriptions.expiry_date as applicationSubscriptions_expiryDate, application_subscriptions.is_trial as applicationSubscriptions_isTrial, application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate, application_subscriptions.auto_renew as applicationSubscriptions_autoRenew, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_renewal LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_renewal.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.id = subscription_renewal.subscription_id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN transactions ON (transactions.id = subscription_renewal.transaction_id OR transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (application_subscriptions.id = {{id}}  AND  application_subscriptions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE application_subscriptions SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "application_subscriptions Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO transactions (urdd_id, subscription_id, user_payment_method_id, amount, currency_id, transaction_type, gateway_response, description , created_by, updated_by) VALUES ({{transactions_urddId}}, {{transactions_subscriptionId}}, {{transactions_userPaymentMethodId}}, {{transactions_amount}}, {{transactions_currencyId}}, {{transactions_transactionType}}, {{transactions_gatewayResponse}}, {{transactions_description}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE transactions SET urdd_id = {{transactions_urddId}}, subscription_id = {{transactions_subscriptionId}}, user_payment_method_id = {{transactions_userPaymentMethodId}}, amount = {{transactions_amount}}, currency_id = {{transactions_currencyId}}, transaction_type = {{transactions_transactionType}}, gateway_response = {{transactions_gatewayResponse}}, description = {{transactions_description}}, created_by = {{transactions_createdBy}}, updated_by = {{transactions_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as transactions_id,id as id, transactions.urdd_id as transactions_urddId, transactions.subscription_id as transactions_subscriptionId, transactions.user_payment_method_id as transactions_userPaymentMethodId, transactions.amount as transactions_amount, transactions.currency_id as transactions_currencyId, transactions.transaction_type as transactions_transactionType, transactions.gateway_response as transactions_gatewayResponse, transactions.description as transactions_description  FROM transactions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_renewal.id as subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, supported_payment_methods.id as supportedPaymentMethods_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_renewal.id as  subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          subscription_renewal.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, subscription_utilization_logs.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, supported_payment_methods.id as userRolesDesignationsDepartment_id, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plans.name, 10), LEFT(discounts.description, 10), LEFT(users.first_name, 10), LEFT(supported_payment_methods.name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.first_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_applicationSubscriptionsName, transactions.urdd_id as transactions_urddId, transactions.subscription_id as transactions_subscriptionId, transactions.user_payment_method_id as transactions_userPaymentMethodId, transactions.amount as transactions_amount, transactions.currency_id as transactions_currencyId, transactions.transaction_type as transactions_transactionType, transactions.gateway_response as transactions_gatewayResponse, transactions.description as transactions_description, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_renewal LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_renewal.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.id = subscription_renewal.subscription_id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN transactions ON (transactions.id = subscription_renewal.transaction_id OR transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (transactions.id = {{id}}  AND  transactions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE transactions SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "transactions Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_utilization_logs (subscription_renewal_id, amount, usage_type, metadata , created_by, updated_by) VALUES ({{subscriptionUtilizationLogs_subscriptionRenewalId}}, {{subscriptionUtilizationLogs_amount}}, {{subscriptionUtilizationLogs_usageType}}, {{subscriptionUtilizationLogs_metadata}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subscription_utilization_logs SET subscription_renewal_id = {{subscriptionUtilizationLogs_subscriptionRenewalId}}, amount = {{subscriptionUtilizationLogs_amount}}, usage_type = {{subscriptionUtilizationLogs_usageType}}, metadata = {{subscriptionUtilizationLogs_metadata}}, created_by = {{subscriptionUtilizationLogs_createdBy}}, updated_by = {{subscriptionUtilizationLogs_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as subscriptionUtilizationLogs_id,id as id, subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId, subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount, subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType, subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata  FROM subscription_utilization_logs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subscription_renewal.id as subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, application_subscriptions.id as applicationSubscriptions_id, transactions.id as transactions_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, plans.id as plans_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, supported_payment_methods.id as supportedPaymentMethods_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subscription_renewal.id as  subscriptionRenewal_id, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as  applicationSubscriptions_id, transactions.description as  userRolesDesignationsDepartment_transactionsName, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, plans.name as  userRolesDesignationsDepartment_plansName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          subscription_renewal.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, application_subscriptions.id as userRolesDesignationsDepartment_id, transactions.id as userRolesDesignationsDepartment_id, subscription_utilization_logs.id as userRolesDesignationsDepartment_id, plans.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, supported_payment_methods.id as userRolesDesignationsDepartment_id, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plans.name, 10), LEFT(discounts.description, 10), LEFT(users.first_name, 10), LEFT(supported_payment_methods.name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.first_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_applicationSubscriptionsName, subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId, subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount, subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType, subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM subscription_renewal LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subscription_renewal.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.id = subscription_renewal.subscription_id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN transactions ON (transactions.id = subscription_renewal.transaction_id OR transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id) LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN plans ON plans.id = application_subscriptions.plan_id AND plans.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (subscription_utilization_logs.id = {{id}}  AND  subscription_utilization_logs.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsSubscription_renewal_object}