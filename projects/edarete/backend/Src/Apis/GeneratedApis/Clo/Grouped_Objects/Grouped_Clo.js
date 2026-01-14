const parameters = require('./CRUD_parameters');
        global.GroupedCrudsClo_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO clo (clonum, clodomain_name, description , created_by, updated_by) VALUES ({{clo_clonum}}, {{clo_clodomainName}}, {{clo_description}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE clo SET clonum = {{clo_clonum}}, clodomain_name = {{clo_clodomainName}}, description = {{clo_description}}, created_by = {{clo_createdBy}}, updated_by = {{clo_updatedBy}} WHERE cloid = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, cloid as clo_id,cloid as id, clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description  FROM clo WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            clo.cloid as clo_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, clomappingplo.clomapping_ploid as clomappingplo_id, courses.course_id as courses_id, questions.question_id as questions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, plannedcourses.planned_course_id as plannedcourses_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       clo.clodomain_name as  userRolesDesignationsDepartment_cloName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as  clomappingplo_clomappingPloid, courses.course_id as  courses_courseId, questions.question_id as  questions_questionId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, employees.employee_id as  employees_employeeId,

                          clo.cloid as userRolesDesignationsDepartment_cloid, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as userRolesDesignationsDepartment_clomappingPloid, courses.course_id as userRolesDesignationsDepartment_courseId, questions.question_id as userRolesDesignationsDepartment_questionId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM clo LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = clo.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN clomappingplo ON clomappingplo.cloid = clo.cloid AND clomappingplo.status !='inactive' LEFT JOIN courses ON courses.cloid = clo.cloid AND courses.status !='inactive' LEFT JOIN questions ON questions.cloid = clo.cloid AND questions.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (clo.cloid = {{id}}  AND  clo.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE clo SET status = 'inactive' WHERE cloid = {{id}}"}    

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
                        successMessage: "clo Grouped CRUD Hit successfully!",
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
                            clo.cloid as clo_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, clomappingplo.clomapping_ploid as clomappingplo_id, courses.course_id as courses_id, questions.question_id as questions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, plannedcourses.planned_course_id as plannedcourses_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       clo.clodomain_name as  userRolesDesignationsDepartment_cloName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as  clomappingplo_clomappingPloid, courses.course_id as  courses_courseId, questions.question_id as  questions_questionId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, employees.employee_id as  employees_employeeId,

                          clo.cloid as userRolesDesignationsDepartment_cloid, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as userRolesDesignationsDepartment_clomappingPloid, courses.course_id as userRolesDesignationsDepartment_courseId, questions.question_id as userRolesDesignationsDepartment_questionId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM clo LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = clo.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN clomappingplo ON clomappingplo.cloid = clo.cloid AND clomappingplo.status !='inactive' LEFT JOIN courses ON courses.cloid = clo.cloid AND courses.status !='inactive' LEFT JOIN questions ON questions.cloid = clo.cloid AND questions.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO clomappingplo (cloid, clointensity_name, ploid , created_by, updated_by) VALUES ({{clomappingplo_cloid}}, {{clomappingplo_clointensityName}}, {{clomappingplo_ploid}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE clomappingplo SET cloid = {{clomappingplo_cloid}}, clointensity_name = {{clomappingplo_clointensityName}}, ploid = {{clomappingplo_ploid}}, created_by = {{clomappingplo_createdBy}}, updated_by = {{clomappingplo_updatedBy}} WHERE clomapping_ploid = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, clomapping_ploid as clomappingplo_id,clomapping_ploid as id, clomappingplo.cloid as clomappingplo_cloid, clomappingplo.clointensity_name as clomappingplo_clointensityName, clomappingplo.ploid as clomappingplo_ploid  FROM clomappingplo WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            clo.cloid as clo_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, clomappingplo.clomapping_ploid as clomappingplo_id, courses.course_id as courses_id, questions.question_id as questions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, plannedcourses.planned_course_id as plannedcourses_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       clo.clodomain_name as  userRolesDesignationsDepartment_cloName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as  clomappingplo_clomappingPloid, courses.course_id as  courses_courseId, questions.question_id as  questions_questionId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, employees.employee_id as  employees_employeeId,

                          clo.cloid as userRolesDesignationsDepartment_cloid, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as userRolesDesignationsDepartment_clomappingPloid, courses.course_id as userRolesDesignationsDepartment_courseId, questions.question_id as userRolesDesignationsDepartment_questionId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, clomappingplo.cloid as clomappingplo_cloid, clomappingplo.clointensity_name as clomappingplo_clointensityName, clomappingplo.ploid as clomappingplo_ploid, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM clo LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = clo.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN clomappingplo ON clomappingplo.cloid = clo.cloid AND clomappingplo.status !='inactive' LEFT JOIN courses ON courses.cloid = clo.cloid AND courses.status !='inactive' LEFT JOIN questions ON questions.cloid = clo.cloid AND questions.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (clomappingplo.clomapping_ploid = {{id}}  AND  clomappingplo.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE clomappingplo SET status = 'inactive' WHERE clomapping_ploid = {{id}}"}    

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
                        successMessage: "clomappingplo Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courses (course_sub_domain_prefix, planned_course_id, cloid, course_code, teacher_employee_id, tassist_employee_id , created_by, updated_by) VALUES ({{courses_courseSubDomainPrefix}}, {{courses_plannedCourseId}}, {{courses_cloid}}, {{courses_courseCode}}, {{courses_teacherEmployeeId}}, {{courses_tassistEmployeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courses SET course_sub_domain_prefix = {{courses_courseSubDomainPrefix}}, planned_course_id = {{courses_plannedCourseId}}, cloid = {{courses_cloid}}, course_code = {{courses_courseCode}}, teacher_employee_id = {{courses_teacherEmployeeId}}, tassist_employee_id = {{courses_tassistEmployeeId}}, created_by = {{courses_createdBy}}, updated_by = {{courses_updatedBy}} WHERE course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_id as courses_id,course_id as id, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId  FROM courses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            clo.cloid as clo_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, clomappingplo.clomapping_ploid as clomappingplo_id, courses.course_id as courses_id, questions.question_id as questions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, plannedcourses.planned_course_id as plannedcourses_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       clo.clodomain_name as  userRolesDesignationsDepartment_cloName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as  clomappingplo_clomappingPloid, courses.course_id as  courses_courseId, questions.question_id as  questions_questionId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, employees.employee_id as  employees_employeeId,

                          clo.cloid as userRolesDesignationsDepartment_cloid, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as userRolesDesignationsDepartment_clomappingPloid, courses.course_id as userRolesDesignationsDepartment_courseId, questions.question_id as userRolesDesignationsDepartment_questionId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM clo LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = clo.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN clomappingplo ON clomappingplo.cloid = clo.cloid AND clomappingplo.status !='inactive' LEFT JOIN courses ON courses.cloid = clo.cloid AND courses.status !='inactive' LEFT JOIN questions ON questions.cloid = clo.cloid AND questions.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE courses SET status = 'inactive' WHERE course_id = {{id}}"}    

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
                        successMessage: "courses Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questions (cloid, sub_component_id, question_num, description, question_marks, lectures_topic_id, config , created_by, updated_by) VALUES ({{questions_cloid}}, {{questions_subComponentId}}, {{questions_questionNum}}, {{questions_description}}, {{questions_questionMarks}}, {{questions_lecturesTopicId}}, {{questions_config}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questions SET cloid = {{questions_cloid}}, sub_component_id = {{questions_subComponentId}}, question_num = {{questions_questionNum}}, description = {{questions_description}}, question_marks = {{questions_questionMarks}}, lectures_topic_id = {{questions_lecturesTopicId}}, config = {{questions_config}}, created_by = {{questions_createdBy}}, updated_by = {{questions_updatedBy}} WHERE question_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_id as questions_id,question_id as id, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, questions.config as questions_config  FROM questions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            clo.cloid as clo_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, clomappingplo.clomapping_ploid as clomappingplo_id, courses.course_id as courses_id, questions.question_id as questions_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, plannedcourses.planned_course_id as plannedcourses_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       clo.clodomain_name as  userRolesDesignationsDepartment_cloName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as  clomappingplo_clomappingPloid, courses.course_id as  courses_courseId, questions.question_id as  questions_questionId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, employees.employee_id as  employees_employeeId,

                          clo.cloid as userRolesDesignationsDepartment_cloid, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, clomappingplo.clomapping_ploid as userRolesDesignationsDepartment_clomappingPloid, courses.course_id as userRolesDesignationsDepartment_courseId, questions.question_id as userRolesDesignationsDepartment_questionId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, questions.config as questions_config, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM clo LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = clo.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN clomappingplo ON clomappingplo.cloid = clo.cloid AND clomappingplo.status !='inactive' LEFT JOIN courses ON courses.cloid = clo.cloid AND courses.status !='inactive' LEFT JOIN questions ON questions.cloid = clo.cloid AND questions.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE questions SET status = 'inactive' WHERE question_id = {{id}}"}    

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
                        successMessage: "questions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsClo_object}