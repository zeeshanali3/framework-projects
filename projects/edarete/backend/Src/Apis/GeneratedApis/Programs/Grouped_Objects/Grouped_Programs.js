const parameters = require('./CRUD_parameters');
        global.GroupedCrudsPrograms_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO programs (department_id, domain_id, program_name, program_year , created_by, updated_by) VALUES ({{programs_departmentId}}, {{programs_domainId}}, {{programs_programName}}, {{programs_programYear}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE programs SET department_id = {{programs_departmentId}}, domain_id = {{programs_domainId}}, program_name = {{programs_programName}}, program_year = {{programs_programYear}} WHERE program_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, program_id as programs_id,program_id as id, programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear  FROM programs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            programs.program_id as programs_id, departments.department_id as departments_id, domains.domain_id as domains_id, plo.ploid as plo_id, semesters.semester_id as semesters_id, students.student_user_id as students_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        departments.department_id as id,
                       programs.program_name as  departments_programsName, departments.department_name as  departments_departmentsName, domains.domain_id as  domains_domainId, plo.ploid as  plo_ploid, semesters.semester_id as  semesters_semesterId, students.student_user_id as  students_studentUserId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  departments_usersName, designations.designation_name as  departments_designationsName, roles.role_name as  departments_rolesName,

                          programs.program_id as departments_programId, departments.department_id as departments_departmentId, domains.domain_id as departments_domainId, plo.ploid as departments_ploid, semesters.semester_id as departments_semesterId, students.student_user_id as departments_studentUserId, user_roles_designations_department.user_role_designation_department_id as departments_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as departments_roleDesignationDepartmentId, users.user_id as departments_userId, designations.designation_id as departments_designationId, roles.role_id as departments_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  departments_userRolesDesignationsDepartmentName, programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear, 
                        departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId FROM programs LEFT JOIN departments ON departments.department_id = programs.department_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_id = programs.domain_id AND domains.status !='inactive' LEFT JOIN plo ON plo.program_id = programs.program_id AND plo.status !='inactive' LEFT JOIN semesters ON semesters.program_id = programs.program_id AND semesters.status !='inactive' LEFT JOIN students ON students.program_id = programs.program_id AND students.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (programs.program_id = {{id}}  AND  programs.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO departments (department_name, employee_id , created_by, updated_by) VALUES ({{departments_departmentName}}, {{departments_employeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE departments SET department_name = {{departments_departmentName}}, employee_id = {{departments_employeeId}} WHERE department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, department_id as departments_id,department_id as id, departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId  FROM departments WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            programs.program_id as programs_id, departments.department_id as departments_id, domains.domain_id as domains_id, plo.ploid as plo_id, semesters.semester_id as semesters_id, students.student_user_id as students_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        departments.department_id as id,
                       programs.program_name as  departments_programsName, departments.department_name as  departments_departmentsName, domains.domain_id as  domains_domainId, plo.ploid as  plo_ploid, semesters.semester_id as  semesters_semesterId, students.student_user_id as  students_studentUserId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  departments_usersName, designations.designation_name as  departments_designationsName, roles.role_name as  departments_rolesName,

                          programs.program_id as departments_programId, departments.department_id as departments_departmentId, domains.domain_id as departments_domainId, plo.ploid as departments_ploid, semesters.semester_id as departments_semesterId, students.student_user_id as departments_studentUserId, user_roles_designations_department.user_role_designation_department_id as departments_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as departments_roleDesignationDepartmentId, users.user_id as departments_userId, designations.designation_id as departments_designationId, roles.role_id as departments_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  departments_userRolesDesignationsDepartmentName, departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId, 
                        departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId FROM programs LEFT JOIN departments ON departments.department_id = programs.department_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_id = programs.domain_id AND domains.status !='inactive' LEFT JOIN plo ON plo.program_id = programs.program_id AND plo.status !='inactive' LEFT JOIN semesters ON semesters.program_id = programs.program_id AND semesters.status !='inactive' LEFT JOIN students ON students.program_id = programs.program_id AND students.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (departments.department_id = {{id}}  AND  departments.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE departments SET status = 'inactive' WHERE department_id = {{id}}"}    

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
                        successMessage: "departments Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO domains (domain_name, domain_leader_id , created_by, updated_by) VALUES ({{domains_domainName}}, {{domains_domainLeaderId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE domains SET domain_name = {{domains_domainName}}, domain_leader_id = {{domains_domainLeaderId}} WHERE domain_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, domain_id as domains_id,domain_id as id, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId  FROM domains WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            programs.program_id as programs_id, departments.department_id as departments_id, domains.domain_id as domains_id, plo.ploid as plo_id, semesters.semester_id as semesters_id, students.student_user_id as students_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        departments.department_id as id,
                       programs.program_name as  departments_programsName, departments.department_name as  departments_departmentsName, domains.domain_id as  domains_domainId, plo.ploid as  plo_ploid, semesters.semester_id as  semesters_semesterId, students.student_user_id as  students_studentUserId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  departments_usersName, designations.designation_name as  departments_designationsName, roles.role_name as  departments_rolesName,

                          programs.program_id as departments_programId, departments.department_id as departments_departmentId, domains.domain_id as departments_domainId, plo.ploid as departments_ploid, semesters.semester_id as departments_semesterId, students.student_user_id as departments_studentUserId, user_roles_designations_department.user_role_designation_department_id as departments_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as departments_roleDesignationDepartmentId, users.user_id as departments_userId, designations.designation_id as departments_designationId, roles.role_id as departments_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  departments_userRolesDesignationsDepartmentName, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId, 
                        departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId FROM programs LEFT JOIN departments ON departments.department_id = programs.department_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_id = programs.domain_id AND domains.status !='inactive' LEFT JOIN plo ON plo.program_id = programs.program_id AND plo.status !='inactive' LEFT JOIN semesters ON semesters.program_id = programs.program_id AND semesters.status !='inactive' LEFT JOIN students ON students.program_id = programs.program_id AND students.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (domains.domain_id = {{id}}  AND  domains.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE domains SET status = 'inactive' WHERE domain_id = {{id}}"}    

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
                        successMessage: "domains Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plo (program_id, ploname, plonum , created_by, updated_by) VALUES ({{plo_programId}}, {{plo_ploname}}, {{plo_plonum}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plo SET program_id = {{plo_programId}}, ploname = {{plo_ploname}}, plonum = {{plo_plonum}} WHERE ploid = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, ploid as plo_id,ploid as id, plo.program_id as plo_programId, plo.ploname as plo_ploname, plo.plonum as plo_plonum  FROM plo WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            programs.program_id as programs_id, departments.department_id as departments_id, domains.domain_id as domains_id, plo.ploid as plo_id, semesters.semester_id as semesters_id, students.student_user_id as students_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        departments.department_id as id,
                       programs.program_name as  departments_programsName, departments.department_name as  departments_departmentsName, domains.domain_id as  domains_domainId, plo.ploid as  plo_ploid, semesters.semester_id as  semesters_semesterId, students.student_user_id as  students_studentUserId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  departments_usersName, designations.designation_name as  departments_designationsName, roles.role_name as  departments_rolesName,

                          programs.program_id as departments_programId, departments.department_id as departments_departmentId, domains.domain_id as departments_domainId, plo.ploid as departments_ploid, semesters.semester_id as departments_semesterId, students.student_user_id as departments_studentUserId, user_roles_designations_department.user_role_designation_department_id as departments_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as departments_roleDesignationDepartmentId, users.user_id as departments_userId, designations.designation_id as departments_designationId, roles.role_id as departments_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  departments_userRolesDesignationsDepartmentName, plo.program_id as plo_programId, plo.ploname as plo_ploname, plo.plonum as plo_plonum, 
                        departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId FROM programs LEFT JOIN departments ON departments.department_id = programs.department_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_id = programs.domain_id AND domains.status !='inactive' LEFT JOIN plo ON plo.program_id = programs.program_id AND plo.status !='inactive' LEFT JOIN semesters ON semesters.program_id = programs.program_id AND semesters.status !='inactive' LEFT JOIN students ON students.program_id = programs.program_id AND students.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (plo.ploid = {{id}}  AND  plo.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plo SET status = 'inactive' WHERE ploid = {{id}}"}    

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
                        successMessage: "plo Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO semesters (program_id, semester_num, start_date, end_date, semester_name , created_by, updated_by) VALUES ({{semesters_programId}}, {{semesters_semesterNum}}, {{semesters_startDate}}, {{semesters_endDate}}, {{semesters_semesterName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE semesters SET program_id = {{semesters_programId}}, semester_num = {{semesters_semesterNum}}, start_date = {{semesters_startDate}}, end_date = {{semesters_endDate}}, semester_name = {{semesters_semesterName}} WHERE semester_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, semester_id as semesters_id,semester_id as id, semesters.program_id as semesters_programId, semesters.semester_num as semesters_semesterNum, semesters.start_date as semesters_startDate, semesters.end_date as semesters_endDate, semesters.semester_name as semesters_semesterName  FROM semesters WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            programs.program_id as programs_id, departments.department_id as departments_id, domains.domain_id as domains_id, plo.ploid as plo_id, semesters.semester_id as semesters_id, students.student_user_id as students_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        departments.department_id as id,
                       programs.program_name as  departments_programsName, departments.department_name as  departments_departmentsName, domains.domain_id as  domains_domainId, plo.ploid as  plo_ploid, semesters.semester_id as  semesters_semesterId, students.student_user_id as  students_studentUserId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  departments_usersName, designations.designation_name as  departments_designationsName, roles.role_name as  departments_rolesName,

                          programs.program_id as departments_programId, departments.department_id as departments_departmentId, domains.domain_id as departments_domainId, plo.ploid as departments_ploid, semesters.semester_id as departments_semesterId, students.student_user_id as departments_studentUserId, user_roles_designations_department.user_role_designation_department_id as departments_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as departments_roleDesignationDepartmentId, users.user_id as departments_userId, designations.designation_id as departments_designationId, roles.role_id as departments_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  departments_userRolesDesignationsDepartmentName, semesters.program_id as semesters_programId, semesters.semester_num as semesters_semesterNum, semesters.start_date as semesters_startDate, semesters.end_date as semesters_endDate, semesters.semester_name as semesters_semesterName, 
                        departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId FROM programs LEFT JOIN departments ON departments.department_id = programs.department_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_id = programs.domain_id AND domains.status !='inactive' LEFT JOIN plo ON plo.program_id = programs.program_id AND plo.status !='inactive' LEFT JOIN semesters ON semesters.program_id = programs.program_id AND semesters.status !='inactive' LEFT JOIN students ON students.program_id = programs.program_id AND students.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (semesters.semester_id = {{id}}  AND  semesters.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE semesters SET status = 'inactive' WHERE semester_id = {{id}}"}    

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
                        successMessage: "semesters Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO students (urdd_id, program_id, batch, reg_num , created_by, updated_by) VALUES ({{students_urddId}}, {{students_programId}}, {{students_batch}}, {{students_regNum}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE students SET urdd_id = {{students_urddId}}, program_id = {{students_programId}}, batch = {{students_batch}}, reg_num = {{students_regNum}} WHERE student_user_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, student_user_id as students_id,student_user_id as id, students.urdd_id as students_urddId, students.program_id as students_programId, students.batch as students_batch, students.reg_num as students_regNum  FROM students WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            programs.program_id as programs_id, departments.department_id as departments_id, domains.domain_id as domains_id, plo.ploid as plo_id, semesters.semester_id as semesters_id, students.student_user_id as students_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        departments.department_id as id,
                       programs.program_name as  departments_programsName, departments.department_name as  departments_departmentsName, domains.domain_id as  domains_domainId, plo.ploid as  plo_ploid, semesters.semester_id as  semesters_semesterId, students.student_user_id as  students_studentUserId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  departments_usersName, designations.designation_name as  departments_designationsName, roles.role_name as  departments_rolesName,

                          programs.program_id as departments_programId, departments.department_id as departments_departmentId, domains.domain_id as departments_domainId, plo.ploid as departments_ploid, semesters.semester_id as departments_semesterId, students.student_user_id as departments_studentUserId, user_roles_designations_department.user_role_designation_department_id as departments_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as departments_roleDesignationDepartmentId, users.user_id as departments_userId, designations.designation_id as departments_designationId, roles.role_id as departments_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  departments_userRolesDesignationsDepartmentName, students.urdd_id as students_urddId, students.program_id as students_programId, students.batch as students_batch, students.reg_num as students_regNum, 
                        departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId FROM programs LEFT JOIN departments ON departments.department_id = programs.department_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_id = programs.domain_id AND domains.status !='inactive' LEFT JOIN plo ON plo.program_id = programs.program_id AND plo.status !='inactive' LEFT JOIN semesters ON semesters.program_id = programs.program_id AND semesters.status !='inactive' LEFT JOIN students ON students.program_id = programs.program_id AND students.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = students.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (students.student_user_id = {{id}}  AND  students.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsPrograms_object}