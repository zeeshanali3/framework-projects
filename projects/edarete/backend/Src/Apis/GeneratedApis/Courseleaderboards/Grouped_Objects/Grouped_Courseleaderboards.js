const parameters = require('./CRUD_parameters');
        global.GroupedCrudsCourseleaderboards_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courseleaderboards (course_id, leaderboard_name, number_of_positions , created_by, updated_by) VALUES ({{courseleaderboards_courseId}}, {{courseleaderboards_leaderboardName}}, {{courseleaderboards_numberOfPositions}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courseleaderboards SET course_id = {{courseleaderboards_courseId}}, leaderboard_name = {{courseleaderboards_leaderboardName}}, number_of_positions = {{courseleaderboards_numberOfPositions}} WHERE course_leaderboard_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_leaderboard_id as courseleaderboards_id,course_leaderboard_id as id, courseleaderboards.course_id as courseleaderboards_courseId, courseleaderboards.leaderboard_name as courseleaderboards_leaderboardName, courseleaderboards.number_of_positions as courseleaderboards_numberOfPositions  FROM courseleaderboards WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            courseleaderboards.course_leaderboard_id as courseleaderboards_id, courses.course_id as courses_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, subcomponents.sub_component_id as subcomponents_id,
                        courses.course_id as id,
                       courseleaderboards.leaderboard_name as  courses_courseleaderboardsName, courses.course_id as  courses_courseId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, departments.department_name as  courses_departmentsName, subcomponents.sub_component_id as  subcomponents_subComponentId,

                          courseleaderboards.course_leaderboard_id as courses_courseLeaderboardId, courses.course_id as courses_courseId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courses_courseLeaderboardSubcomponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, departments.department_id as courses_departmentId, subcomponents.sub_component_id as courses_subComponentId,
                          
                       
                         
                           courseleaderboards.course_id as courseleaderboards_courseId, courseleaderboards.leaderboard_name as courseleaderboards_leaderboardName, courseleaderboards.number_of_positions as courseleaderboards_numberOfPositions, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM courseleaderboards LEFT JOIN courses ON courses.course_id = courseleaderboards.course_id AND courses.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.course_leaderboard_id = courseleaderboards.course_leaderboard_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.employee_id = employees.employee_id OR departments.department_id = roles_designations_department.department_id) LEFT JOIN subcomponents ON subcomponents.sub_component_id = courseleaderboardsubcomponents.sub_component_id AND subcomponents.status !='inactive' WHERE (courseleaderboards.course_leaderboard_id = {{id}}  AND  courseleaderboards.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE courseleaderboards SET status = 'inactive' WHERE course_leaderboard_id = {{id}}"}    

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
                        successMessage: "courseleaderboards Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courses (course_sub_domain_prefix, planned_course_id, cloid, teacher_employee_id, tassist_employee_id , created_by, updated_by) VALUES ({{courses_courseSubDomainPrefix}}, {{courses_plannedCourseId}}, {{courses_cloid}}, {{courses_teacherEmployeeId}}, {{courses_tassistEmployeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courses SET course_sub_domain_prefix = {{courses_courseSubDomainPrefix}}, planned_course_id = {{courses_plannedCourseId}}, cloid = {{courses_cloid}}, teacher_employee_id = {{courses_teacherEmployeeId}}, tassist_employee_id = {{courses_tassistEmployeeId}} WHERE course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_id as courses_id,course_id as id, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId  FROM courses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            courseleaderboards.course_leaderboard_id as courseleaderboards_id, courses.course_id as courses_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, subcomponents.sub_component_id as subcomponents_id,
                        courses.course_id as id,
                       courseleaderboards.leaderboard_name as  courses_courseleaderboardsName, courses.course_id as  courses_courseId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, departments.department_name as  courses_departmentsName, subcomponents.sub_component_id as  subcomponents_subComponentId,

                          courseleaderboards.course_leaderboard_id as courses_courseLeaderboardId, courses.course_id as courses_courseId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courses_courseLeaderboardSubcomponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, departments.department_id as courses_departmentId, subcomponents.sub_component_id as courses_subComponentId,
                          
                       
                         
                           courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM courseleaderboards LEFT JOIN courses ON courses.course_id = courseleaderboards.course_id AND courses.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.course_leaderboard_id = courseleaderboards.course_leaderboard_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.employee_id = employees.employee_id OR departments.department_id = roles_designations_department.department_id) LEFT JOIN subcomponents ON subcomponents.sub_component_id = courseleaderboardsubcomponents.sub_component_id AND subcomponents.status !='inactive' WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courseleaderboardsubcomponents (course_leaderboard_id, sub_component_id, subcomponent_percentage , created_by, updated_by) VALUES ({{courseleaderboardsubcomponents_courseLeaderboardId}}, {{courseleaderboardsubcomponents_subComponentId}}, {{courseleaderboardsubcomponents_subcomponentPercentage}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courseleaderboardsubcomponents SET course_leaderboard_id = {{courseleaderboardsubcomponents_courseLeaderboardId}}, sub_component_id = {{courseleaderboardsubcomponents_subComponentId}}, subcomponent_percentage = {{courseleaderboardsubcomponents_subcomponentPercentage}} WHERE course_leaderboard_subcomponent_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id,course_leaderboard_subcomponent_id as id, courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage  FROM courseleaderboardsubcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            courseleaderboards.course_leaderboard_id as courseleaderboards_id, courses.course_id as courses_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, subcomponents.sub_component_id as subcomponents_id,
                        courses.course_id as id,
                       courseleaderboards.leaderboard_name as  courses_courseleaderboardsName, courses.course_id as  courses_courseId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, departments.department_name as  courses_departmentsName, subcomponents.sub_component_id as  subcomponents_subComponentId,

                          courseleaderboards.course_leaderboard_id as courses_courseLeaderboardId, courses.course_id as courses_courseId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courses_courseLeaderboardSubcomponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, departments.department_id as courses_departmentId, subcomponents.sub_component_id as courses_subComponentId,
                          
                       
                         
                           courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM courseleaderboards LEFT JOIN courses ON courses.course_id = courseleaderboards.course_id AND courses.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.course_leaderboard_id = courseleaderboards.course_leaderboard_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.employee_id = employees.employee_id OR departments.department_id = roles_designations_department.department_id) LEFT JOIN subcomponents ON subcomponents.sub_component_id = courseleaderboardsubcomponents.sub_component_id AND subcomponents.status !='inactive' WHERE (courseleaderboardsubcomponents.course_leaderboard_subcomponent_id = {{id}}  AND  courseleaderboardsubcomponents.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE courseleaderboardsubcomponents SET status = 'inactive' WHERE course_leaderboard_subcomponent_id = {{id}}"}    

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
                        successMessage: "courseleaderboardsubcomponents Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsCourseleaderboards_object}