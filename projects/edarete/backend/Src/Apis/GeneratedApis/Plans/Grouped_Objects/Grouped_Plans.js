const parameters = require('./CRUD_parameters');
        global.GroupedCrudsPlans_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plans (name, duration_type, ai_credits_amount, currency_id, services, price, region, is_active, is_public , created_by, updated_by) VALUES ({{plans_name}}, {{plans_durationType}}, {{plans_aiCreditsAmount}}, {{plans_currencyId}}, {{plans_services}}, {{plans_price}}, {{plans_region}}, {{plans_isActive}}, {{plans_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plans SET name = {{plans_name}}, duration_type = {{plans_durationType}}, ai_credits_amount = {{plans_aiCreditsAmount}}, currency_id = {{plans_currencyId}}, services = {{plans_services}}, price = {{plans_price}}, region = {{plans_region}}, is_active = {{plans_isActive}}, is_public = {{plans_isPublic}}, created_by = {{plans_createdBy}}, updated_by = {{plans_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as plans_id,id as id, plans.name as plans_name, plans.duration_type as plans_durationType, plans.ai_credits_amount as plans_aiCreditsAmount, plans.currency_id as plans_currencyId, plans.services as plans_services, plans.price as plans_price, plans.region as plans_region, plans.is_active as plans_isActive, plans.is_public as plans_isPublic  FROM plans WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plans.id as plans_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, currencies.id as currencies_id, application_subscriptions.id as applicationSubscriptions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plans.name as  userRolesDesignationsDepartment_plansName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as  currencies_id, application_subscriptions.id as  applicationSubscriptions_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          plans.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as userRolesDesignationsDepartment_id, application_subscriptions.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, plans.name as plans_name, plans.duration_type as plans_durationType, plans.ai_credits_amount as plans_aiCreditsAmount, plans.currency_id as plans_currencyId, plans.services as plans_services, plans.price as plans_price, plans.region as plans_region, plans.is_active as plans_isActive, plans.is_public as plans_isPublic, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM plans LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plans.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN currencies ON currencies.id = plans.currency_id AND currencies.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.plan_id = plans.id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (plans.id = {{id}}  AND  plans.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plans SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "plans Grouped CRUD Hit successfully!",
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
                            plans.id as plans_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, currencies.id as currencies_id, application_subscriptions.id as applicationSubscriptions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plans.name as  userRolesDesignationsDepartment_plansName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as  currencies_id, application_subscriptions.id as  applicationSubscriptions_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          plans.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as userRolesDesignationsDepartment_id, application_subscriptions.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM plans LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plans.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN currencies ON currencies.id = plans.currency_id AND currencies.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.plan_id = plans.id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO currencies (code, exchange_rate, is_active , created_by, updated_by) VALUES ({{currencies_code}}, {{currencies_exchangeRate}}, {{currencies_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE currencies SET code = {{currencies_code}}, exchange_rate = {{currencies_exchangeRate}}, is_active = {{currencies_isActive}}, created_by = {{currencies_createdBy}}, updated_by = {{currencies_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as currencies_id,id as id, currencies.code as currencies_code, currencies.exchange_rate as currencies_exchangeRate, currencies.is_active as currencies_isActive  FROM currencies WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plans.id as plans_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, currencies.id as currencies_id, application_subscriptions.id as applicationSubscriptions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plans.name as  userRolesDesignationsDepartment_plansName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as  currencies_id, application_subscriptions.id as  applicationSubscriptions_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          plans.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as userRolesDesignationsDepartment_id, application_subscriptions.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, currencies.code as currencies_code, currencies.exchange_rate as currencies_exchangeRate, currencies.is_active as currencies_isActive, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM plans LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plans.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN currencies ON currencies.id = plans.currency_id AND currencies.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.plan_id = plans.id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (currencies.id = {{id}}  AND  currencies.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE currencies SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "currencies Grouped CRUD Hit successfully!",
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
                            plans.id as plans_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, currencies.id as currencies_id, application_subscriptions.id as applicationSubscriptions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_payment_methods.id as userPaymentMethods_id, discounts.id as discounts_id, supported_payment_methods.id as supportedPaymentMethods_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plans.name as  userRolesDesignationsDepartment_plansName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as  currencies_id, application_subscriptions.id as  applicationSubscriptions_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, user_payment_methods.id as  userPaymentMethods_id, discounts.description as  userRolesDesignationsDepartment_discountsName, supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName,

                          plans.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, currencies.id as userRolesDesignationsDepartment_id, application_subscriptions.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, user_payment_methods.id as userRolesDesignationsDepartment_id, discounts.id as userRolesDesignationsDepartment_id, supported_payment_methods.id as userRolesDesignationsDepartment_id,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, application_subscriptions.urdd_id as applicationSubscriptions_urddId, application_subscriptions.plan_id as applicationSubscriptions_planId, application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId, application_subscriptions.discount_id as applicationSubscriptions_discountId, application_subscriptions.start_date as applicationSubscriptions_startDate, application_subscriptions.expiry_date as applicationSubscriptions_expiryDate, application_subscriptions.is_trial as applicationSubscriptions_isTrial, application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate, application_subscriptions.auto_renew as applicationSubscriptions_autoRenew, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM plans LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plans.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN currencies ON currencies.id = plans.currency_id AND currencies.status !='inactive' LEFT JOIN application_subscriptions ON (application_subscriptions.plan_id = plans.id OR application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id) LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN supported_payment_methods ON (supported_payment_methods.id = user_payment_methods.supported_payment_method_id OR supported_payment_methods.discount_id = discounts.id) WHERE (application_subscriptions.id = {{id}}  AND  application_subscriptions.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsPlans_object}