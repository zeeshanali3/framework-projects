const parameters = require('./CRUD_parameters');
        global.GroupedCrudsStudents_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO students (urdd_id, program_id, batch, reg_num , created_by, updated_by) VALUES ({{students_urddId}}, {{students_programId}}, {{students_batch}}, {{students_regNum}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE students SET urdd_id = {{students_urddId}}, program_id = {{students_programId}}, batch = {{students_batch}}, reg_num = {{students_regNum}} WHERE student_user_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, student_user_id as students_id,student_user_id as id, students.urdd_id as students_urddId, students.program_id as students_programId, students.batch as students_batch, students.reg_num as students_regNum  FROM students WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            students.student_user_id as students_id, programs.program_id as programs_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        programs.program_id as id,
                       students.student_user_id as  students_studentUserId, programs.program_name as  programs_programsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  programs_usersName, designations.designation_name as  programs_designationsName, roles.role_name as  programs_rolesName, departments.department_name as  programs_departmentsName,

                          students.student_user_id as programs_studentUserId, programs.program_id as programs_programId, user_roles_designations_department.user_role_designation_department_id as programs_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as programs_roleDesignationDepartmentId, users.user_id as programs_userId, designations.designation_id as programs_designationId, roles.role_id as programs_roleId, departments.department_id as programs_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  programs_userRolesDesignationsDepartmentName, students.urdd_id as students_urddId, students.program_id as students_programId, students.batch as students_batch, students.reg_num as students_regNum, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM students LEFT JOIN programs ON programs.program_id = students.program_id AND programs.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.department_id = programs.department_id OR departments.department_id = roles_designations_department.department_id) WHERE (students.student_user_id = {{id}}  AND  students.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE students SET status = 'inactive' WHERE student_user_id = {{id}}"}    

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
                        successMessage: "students Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO programs (department_id, domain_id, program_name, program_year , created_by, updated_by) VALUES ({{programs_departmentId}}, {{programs_domainId}}, {{programs_programName}}, {{programs_programYear}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE programs SET department_id = {{programs_departmentId}}, domain_id = {{programs_domainId}}, program_name = {{programs_programName}}, program_year = {{programs_programYear}} WHERE program_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, program_id as programs_id,program_id as id, programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear  FROM programs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            students.student_user_id as students_id, programs.program_id as programs_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        programs.program_id as id,
                       students.student_user_id as  students_studentUserId, programs.program_name as  programs_programsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  programs_usersName, designations.designation_name as  programs_designationsName, roles.role_name as  programs_rolesName, departments.department_name as  programs_departmentsName,

                          students.student_user_id as programs_studentUserId, programs.program_id as programs_programId, user_roles_designations_department.user_role_designation_department_id as programs_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as programs_roleDesignationDepartmentId, users.user_id as programs_userId, designations.designation_id as programs_designationId, roles.role_id as programs_roleId, departments.department_id as programs_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  programs_userRolesDesignationsDepartmentName, programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM students LEFT JOIN programs ON programs.program_id = students.program_id AND programs.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.department_id = programs.department_id OR departments.department_id = roles_designations_department.department_id) WHERE (programs.program_id = {{id}}  AND  programs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE programs SET status = 'inactive' WHERE program_id = {{id}}"}    

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
                        successMessage: "programs Grouped CRUD Hit successfully!",
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
                            students.student_user_id as students_id, programs.program_id as programs_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        programs.program_id as id,
                       students.student_user_id as  students_studentUserId, programs.program_name as  programs_programsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  programs_usersName, designations.designation_name as  programs_designationsName, roles.role_name as  programs_rolesName, departments.department_name as  programs_departmentsName,

                          students.student_user_id as programs_studentUserId, programs.program_id as programs_programId, user_roles_designations_department.user_role_designation_department_id as programs_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as programs_roleDesignationDepartmentId, users.user_id as programs_userId, designations.designation_id as programs_designationId, roles.role_id as programs_roleId, departments.department_id as programs_departmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  programs_userRolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM students LEFT JOIN programs ON programs.program_id = students.program_id AND programs.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.department_id = programs.department_id OR departments.department_id = roles_designations_department.department_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
        module.exports = {GroupedCrudsStudents_object}