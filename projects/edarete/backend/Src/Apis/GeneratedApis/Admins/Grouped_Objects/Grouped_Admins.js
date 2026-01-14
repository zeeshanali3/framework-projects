const parameters = require('./CRUD_parameters');
        global.GroupedCrudsAdmins_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO admins (admin_type, user_role_id , created_by, updated_by) VALUES ({{admins_adminType}}, {{admins_userRoleId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE admins SET admin_type = {{admins_adminType}}, user_role_id = {{admins_userRoleId}}, created_by = {{admins_createdBy}}, updated_by = {{admins_updatedBy}} WHERE admin_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, admin_id as admins_id,admin_id as id, admins.admin_type as admins_adminType, admins.user_role_id as admins_userRoleId  FROM admins WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            admins.admin_id as admins_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       admins.admin_id as  admins_adminId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          admins.admin_id as userRolesDesignationsDepartment_adminId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, admins.admin_type as admins_adminType, admins.user_role_id as admins_userRoleId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM admins LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = admins.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (admins.admin_id = {{id}}  AND  admins.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE admins SET status = 'inactive' WHERE admin_id = {{id}}"}    

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
                        successMessage: "admins Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date , created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}}, created_by = {{userRolesDesignationsDepartment_createdBy}}, updated_by = {{userRolesDesignationsDepartment_updatedBy}} WHERE user_role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_department_id as userRolesDesignationsDepartment_id,user_role_designation_department_id as id, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate  FROM user_roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            admins.admin_id as admins_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       admins.admin_id as  admins_adminId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName,

                          admins.admin_id as userRolesDesignationsDepartment_adminId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM admins LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = admins.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsAdmins_object}