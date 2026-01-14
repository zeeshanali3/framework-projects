const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSupported_payment_methods_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO supported_payment_methods (name, provider_details, discount_id, supported_currencies, is_active , created_by, updated_by) VALUES ({{supportedPaymentMethods_name}}, {{supportedPaymentMethods_providerDetails}}, {{supportedPaymentMethods_discountId}}, {{supportedPaymentMethods_supportedCurrencies}}, {{supportedPaymentMethods_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE supported_payment_methods SET name = {{supportedPaymentMethods_name}}, provider_details = {{supportedPaymentMethods_providerDetails}}, discount_id = {{supportedPaymentMethods_discountId}}, supported_currencies = {{supportedPaymentMethods_supportedCurrencies}}, is_active = {{supportedPaymentMethods_isActive}}, created_by = {{supportedPaymentMethods_createdBy}}, updated_by = {{supportedPaymentMethods_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as supportedPaymentMethods_id,id as id, supported_payment_methods.name as supportedPaymentMethods_name, supported_payment_methods.provider_details as supportedPaymentMethods_providerDetails, supported_payment_methods.discount_id as supportedPaymentMethods_discountId, supported_payment_methods.supported_currencies as supportedPaymentMethods_supportedCurrencies, supported_payment_methods.is_active as supportedPaymentMethods_isActive  FROM supported_payment_methods WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            supported_payment_methods.id as supportedPaymentMethods_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, discounts.id as discounts_id, user_payment_methods.id as userPaymentMethods_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as  discounts_id, user_payment_methods.id as  userPaymentMethods_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          supported_payment_methods.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, supported_payment_methods.name as supportedPaymentMethods_name, supported_payment_methods.provider_details as supportedPaymentMethods_providerDetails, supported_payment_methods.discount_id as supportedPaymentMethods_discountId, supported_payment_methods.supported_currencies as supportedPaymentMethods_supportedCurrencies, supported_payment_methods.is_active as supportedPaymentMethods_isActive, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM supported_payment_methods LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = supported_payment_methods.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN discounts ON discounts.id = supported_payment_methods.discount_id AND discounts.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (supported_payment_methods.id = {{id}}  AND  supported_payment_methods.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE supported_payment_methods SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "supported_payment_methods Grouped CRUD Hit successfully!",
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
                            supported_payment_methods.id as supportedPaymentMethods_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, discounts.id as discounts_id, user_payment_methods.id as userPaymentMethods_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as  discounts_id, user_payment_methods.id as  userPaymentMethods_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          supported_payment_methods.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM supported_payment_methods LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = supported_payment_methods.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN discounts ON discounts.id = supported_payment_methods.discount_id AND discounts.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO discounts (code, description, config_parameters, discount_percentage, usage_info, is_active, expires_at , created_by, updated_by) VALUES ({{discounts_code}}, {{discounts_description}}, {{discounts_configParameters}}, {{discounts_discountPercentage}}, {{discounts_usageInfo}}, {{discounts_isActive}}, {{discounts_expiresAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE discounts SET code = {{discounts_code}}, description = {{discounts_description}}, config_parameters = {{discounts_configParameters}}, discount_percentage = {{discounts_discountPercentage}}, usage_info = {{discounts_usageInfo}}, is_active = {{discounts_isActive}}, expires_at = {{discounts_expiresAt}}, created_by = {{discounts_createdBy}}, updated_by = {{discounts_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as discounts_id,id as id, discounts.code as discounts_code, discounts.description as discounts_description, discounts.config_parameters as discounts_configParameters, discounts.discount_percentage as discounts_discountPercentage, discounts.usage_info as discounts_usageInfo, discounts.is_active as discounts_isActive, discounts.expires_at as discounts_expiresAt  FROM discounts WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            supported_payment_methods.id as supportedPaymentMethods_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, discounts.id as discounts_id, user_payment_methods.id as userPaymentMethods_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as  discounts_id, user_payment_methods.id as  userPaymentMethods_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          supported_payment_methods.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, discounts.code as discounts_code, discounts.description as discounts_description, discounts.config_parameters as discounts_configParameters, discounts.discount_percentage as discounts_discountPercentage, discounts.usage_info as discounts_usageInfo, discounts.is_active as discounts_isActive, discounts.expires_at as discounts_expiresAt, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM supported_payment_methods LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = supported_payment_methods.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN discounts ON discounts.id = supported_payment_methods.discount_id AND discounts.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (discounts.id = {{id}}  AND  discounts.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE discounts SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "discounts Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_payment_methods (urdd_id, supported_payment_method_id, payment_details, is_verified, verification_amount, verification_status, verification_transaction_id, is_default, is_active , created_by, updated_by) VALUES ({{userPaymentMethods_urddId}}, {{userPaymentMethods_supportedPaymentMethodId}}, {{userPaymentMethods_paymentDetails}}, {{userPaymentMethods_isVerified}}, {{userPaymentMethods_verificationAmount}}, {{userPaymentMethods_verificationStatus}}, {{userPaymentMethods_verificationTransactionId}}, {{userPaymentMethods_isDefault}}, {{userPaymentMethods_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_payment_methods SET urdd_id = {{userPaymentMethods_urddId}}, supported_payment_method_id = {{userPaymentMethods_supportedPaymentMethodId}}, payment_details = {{userPaymentMethods_paymentDetails}}, is_verified = {{userPaymentMethods_isVerified}}, verification_amount = {{userPaymentMethods_verificationAmount}}, verification_status = {{userPaymentMethods_verificationStatus}}, verification_transaction_id = {{userPaymentMethods_verificationTransactionId}}, is_default = {{userPaymentMethods_isDefault}}, is_active = {{userPaymentMethods_isActive}}, created_by = {{userPaymentMethods_createdBy}}, updated_by = {{userPaymentMethods_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as userPaymentMethods_id,id as id, user_payment_methods.urdd_id as userPaymentMethods_urddId, user_payment_methods.supported_payment_method_id as userPaymentMethods_supportedPaymentMethodId, user_payment_methods.payment_details as userPaymentMethods_paymentDetails, user_payment_methods.is_verified as userPaymentMethods_isVerified, user_payment_methods.verification_amount as userPaymentMethods_verificationAmount, user_payment_methods.verification_status as userPaymentMethods_verificationStatus, user_payment_methods.verification_transaction_id as userPaymentMethods_verificationTransactionId, user_payment_methods.is_default as userPaymentMethods_isDefault, user_payment_methods.is_active as userPaymentMethods_isActive  FROM user_payment_methods WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            supported_payment_methods.id as supportedPaymentMethods_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, discounts.id as discounts_id, user_payment_methods.id as userPaymentMethods_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       supported_payment_methods.name as  userRolesDesignationsDepartment_supportedPaymentMethodsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as  discounts_id, user_payment_methods.id as  userPaymentMethods_id, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          supported_payment_methods.id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, discounts.id as userRolesDesignationsDepartment_id, user_payment_methods.id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_payment_methods.urdd_id as userPaymentMethods_urddId, user_payment_methods.supported_payment_method_id as userPaymentMethods_supportedPaymentMethodId, user_payment_methods.payment_details as userPaymentMethods_paymentDetails, user_payment_methods.is_verified as userPaymentMethods_isVerified, user_payment_methods.verification_amount as userPaymentMethods_verificationAmount, user_payment_methods.verification_status as userPaymentMethods_verificationStatus, user_payment_methods.verification_transaction_id as userPaymentMethods_verificationTransactionId, user_payment_methods.is_default as userPaymentMethods_isDefault, user_payment_methods.is_active as userPaymentMethods_isActive, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes FROM supported_payment_methods LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = supported_payment_methods.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN discounts ON discounts.id = supported_payment_methods.discount_id AND discounts.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (user_payment_methods.id = {{id}}  AND  user_payment_methods.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE user_payment_methods SET status = 'inactive' WHERE id = {{id}}"}    

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
                        successMessage: "user_payment_methods Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsSupported_payment_methods_object}