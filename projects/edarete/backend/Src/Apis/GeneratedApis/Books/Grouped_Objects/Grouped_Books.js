const parameters = require('./CRUD_parameters');
        global.GroupedCrudsBooks_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO books (course_id, book_ibn, book_name , created_by, updated_by) VALUES ({{books_courseId}}, {{books_bookIbn}}, {{books_bookName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE books SET course_id = {{books_courseId}}, book_ibn = {{books_bookIbn}}, book_name = {{books_bookName}} WHERE book_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, book_id as books_id,book_id as id, books.course_id as books_courseId, books.book_ibn as books_bookIbn, books.book_name as books_bookName  FROM books WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            books.book_id as books_id, courses.course_id as courses_id, lecturetopics.lectures_topic_id as lecturetopics_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        courses.course_id as id,
                       books.book_id as  books_bookId, courses.course_id as  courses_courseId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, departments.department_name as  courses_departmentsName,

                          books.book_id as courses_bookId, courses.course_id as courses_courseId, lecturetopics.lectures_topic_id as courses_lecturesTopicId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, departments.department_id as courses_departmentId,
                          
                       
                         
                           books.course_id as books_courseId, books.book_ibn as books_bookIbn, books.book_name as books_bookName, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM books LEFT JOIN courses ON courses.course_id = books.course_id AND courses.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.book_id = books.book_id AND lecturetopics.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.employee_id = employees.employee_id OR departments.department_id = roles_designations_department.department_id) WHERE (books.book_id = {{id}}  AND  books.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE books SET status = 'inactive' WHERE book_id = {{id}}"}    

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
                        successMessage: "books Grouped CRUD Hit successfully!",
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
                            books.book_id as books_id, courses.course_id as courses_id, lecturetopics.lectures_topic_id as lecturetopics_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        courses.course_id as id,
                       books.book_id as  books_bookId, courses.course_id as  courses_courseId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, departments.department_name as  courses_departmentsName,

                          books.book_id as courses_bookId, courses.course_id as courses_courseId, lecturetopics.lectures_topic_id as courses_lecturesTopicId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, departments.department_id as courses_departmentId,
                          
                       
                         
                           courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM books LEFT JOIN courses ON courses.course_id = books.course_id AND courses.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.book_id = books.book_id AND lecturetopics.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.employee_id = employees.employee_id OR departments.department_id = roles_designations_department.department_id) WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturetopics (sub_component_id, topic_name, description, book_id , created_by, updated_by) VALUES ({{lecturetopics_subComponentId}}, {{lecturetopics_topicName}}, {{lecturetopics_description}}, {{lecturetopics_bookId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET sub_component_id = {{lecturetopics_subComponentId}}, topic_name = {{lecturetopics_topicName}}, description = {{lecturetopics_description}}, book_id = {{lecturetopics_bookId}} WHERE lectures_topic_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lectures_topic_id as lecturetopics_id,lectures_topic_id as id, lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId  FROM lecturetopics WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            books.book_id as books_id, courses.course_id as courses_id, lecturetopics.lectures_topic_id as lecturetopics_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id,
                        courses.course_id as id,
                       books.book_id as  books_bookId, courses.course_id as  courses_courseId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, departments.department_name as  courses_departmentsName,

                          books.book_id as courses_bookId, courses.course_id as courses_courseId, lecturetopics.lectures_topic_id as courses_lecturesTopicId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, departments.department_id as courses_departmentId,
                          
                       
                         
                           lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM books LEFT JOIN courses ON courses.course_id = books.course_id AND courses.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.book_id = books.book_id AND lecturetopics.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON (departments.employee_id = employees.employee_id OR departments.department_id = roles_designations_department.department_id) WHERE (lecturetopics.lectures_topic_id = {{id}}  AND  lecturetopics.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET status = 'inactive' WHERE lectures_topic_id = {{id}}"}    

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
                        successMessage: "lecturetopics Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsBooks_object}