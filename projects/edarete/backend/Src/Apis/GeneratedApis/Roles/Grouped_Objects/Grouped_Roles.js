const parameters = require('./CRUD_parameters');
        global.GroupedCrudsRoles_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO roles (role_name , created_by, updated_by) VALUES ({{roles_roleName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE roles SET role_name = {{roles_roleName}} WHERE role_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, role_id as roles_id,role_id as id, roles.role_name as roles_roleName  FROM roles WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            roles.role_id as roles_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, departments.department_id as departments_id,
                        roles_designations_department.role_designation_department_id as id,
                       roles.role_name as  rolesDesignationsDepartment_rolesName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  rolesDesignationsDepartment_designationsName, departments.department_name as  rolesDesignationsDepartment_departmentsName,

                          roles.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_id as rolesDesignationsDepartment_designationId, departments.department_id as rolesDesignationsDepartment_departmentId,
                          
                       
                         
                           roles.role_name as roles_roleName, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM roles LEFT JOIN roles_designations_department ON roles_designations_department.role_id = roles.role_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (roles.role_id = {{id}}  AND  roles.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE roles SET status = 'inactive' WHERE role_id = {{id}}"}    

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
                        successMessage: "roles Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO roles_designations_department (designation_id, designation_id, role_id, role_id, department_id, department_id , created_by, updated_by) VALUES ({{rolesDesignationsDepartment_designationId}}, {{rolesDesignationsDepartment_designationId}}, {{rolesDesignationsDepartment_roleId}}, {{rolesDesignationsDepartment_roleId}}, {{rolesDesignationsDepartment_departmentId}}, {{rolesDesignationsDepartment_departmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET designation_id = {{rolesDesignationsDepartment_designationId}}, designation_id = {{rolesDesignationsDepartment_designationId}}, role_id = {{rolesDesignationsDepartment_roleId}}, role_id = {{rolesDesignationsDepartment_roleId}}, department_id = {{rolesDesignationsDepartment_departmentId}}, department_id = {{rolesDesignationsDepartment_departmentId}}, created_by = {{rolesDesignationsDepartment_createdBy}}, updated_by = {{rolesDesignationsDepartment_updatedBy}} WHERE role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, role_designation_department_id as rolesDesignationsDepartment_id,role_designation_department_id as id, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId  FROM roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            roles.role_id as roles_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, departments.department_id as departments_id,
                        roles_designations_department.role_designation_department_id as id,
                       roles.role_name as  rolesDesignationsDepartment_rolesName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  rolesDesignationsDepartment_designationsName, departments.department_name as  rolesDesignationsDepartment_departmentsName,

                          roles.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_id as rolesDesignationsDepartment_designationId, departments.department_id as rolesDesignationsDepartment_departmentId,
                          
                       
                         
                           roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM roles LEFT JOIN roles_designations_department ON roles_designations_department.role_id = roles.role_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' WHERE (roles_designations_department.role_designation_department_id = {{id}}  AND  roles_designations_department.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET status = 'inactive' WHERE role_designation_department_id = {{id}}"}    

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
                        successMessage: "roles_designations_department Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsRoles_object}