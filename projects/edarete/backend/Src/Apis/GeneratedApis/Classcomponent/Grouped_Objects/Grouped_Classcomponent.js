const parameters = require('./CRUD_parameters');
        global.GroupedCrudsClasscomponent_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO classcomponent (course_id, component_type, component_name, weightage, component_policy , created_by, updated_by) VALUES ({{classcomponent_courseId}}, {{classcomponent_componentType}}, {{classcomponent_componentName}}, {{classcomponent_weightage}}, {{classcomponent_componentPolicy}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE classcomponent SET course_id = {{classcomponent_courseId}}, component_type = {{classcomponent_componentType}}, component_name = {{classcomponent_componentName}}, weightage = {{classcomponent_weightage}}, component_policy = {{classcomponent_componentPolicy}}, created_by = {{classcomponent_createdBy}}, updated_by = {{classcomponent_updatedBy}} WHERE component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, component_id as classcomponent_id,component_id as id, classcomponent.course_id as classcomponent_courseId, classcomponent.component_type as classcomponent_componentType, classcomponent.component_name as classcomponent_componentName, classcomponent.weightage as classcomponent_weightage, classcomponent.component_policy as classcomponent_componentPolicy  FROM classcomponent WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            classcomponent.component_id as classcomponent_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subcomponents.sub_component_id as subcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        courses.course_id as id,
                       classcomponent.component_id as  classcomponent_componentId, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subcomponents.sub_component_id as  subcomponents_subComponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName,

                          classcomponent.component_id as courses_componentId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, subcomponents.sub_component_id as courses_subComponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId,
                          
                       
                         
                           classcomponent.course_id as classcomponent_courseId, classcomponent.component_type as classcomponent_componentType, classcomponent.component_name as classcomponent_componentName, classcomponent.weightage as classcomponent_weightage, classcomponent.component_policy as classcomponent_componentPolicy, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM classcomponent LEFT JOIN courses ON courses.course_id = classcomponent.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN subcomponents ON subcomponents.component_id = classcomponent.component_id AND subcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (classcomponent.component_id = {{id}}  AND  classcomponent.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE classcomponent SET status = 'inactive' WHERE component_id = {{id}}"}    

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
                        successMessage: "classcomponent Grouped CRUD Hit successfully!",
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
                            classcomponent.component_id as classcomponent_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subcomponents.sub_component_id as subcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        courses.course_id as id,
                       classcomponent.component_id as  classcomponent_componentId, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subcomponents.sub_component_id as  subcomponents_subComponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName,

                          classcomponent.component_id as courses_componentId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, subcomponents.sub_component_id as courses_subComponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId,
                          
                       
                         
                           courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM classcomponent LEFT JOIN courses ON courses.course_id = classcomponent.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN subcomponents ON subcomponents.component_id = classcomponent.component_id AND subcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date , created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}}, created_by = {{userRolesDesignationsDepartment_createdBy}}, updated_by = {{userRolesDesignationsDepartment_updatedBy}} WHERE user_role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_department_id as userRolesDesignationsDepartment_id,user_role_designation_department_id as id, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate  FROM user_roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            classcomponent.component_id as classcomponent_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subcomponents.sub_component_id as subcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        courses.course_id as id,
                       classcomponent.component_id as  classcomponent_componentId, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subcomponents.sub_component_id as  subcomponents_subComponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName,

                          classcomponent.component_id as courses_componentId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, subcomponents.sub_component_id as courses_subComponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId,
                          
                       
                         
                           user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM classcomponent LEFT JOIN courses ON courses.course_id = classcomponent.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN subcomponents ON subcomponents.component_id = classcomponent.component_id AND subcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, date, start_time, end_time, total_marks, weightage, is_public, config , created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{subcomponents_config}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}}, config = {{subcomponents_config}}, created_by = {{subcomponents_createdBy}}, updated_by = {{subcomponents_updatedBy}} WHERE sub_component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_id as subcomponents_id,sub_component_id as id, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, subcomponents.config as subcomponents_config  FROM subcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            classcomponent.component_id as classcomponent_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, subcomponents.sub_component_id as subcomponents_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        courses.course_id as id,
                       classcomponent.component_id as  classcomponent_componentId, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, subcomponents.sub_component_id as  subcomponents_subComponentId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName,

                          classcomponent.component_id as courses_componentId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, subcomponents.sub_component_id as courses_subComponentId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId,
                          
                       
                         
                           subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, subcomponents.config as subcomponents_config, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM classcomponent LEFT JOIN courses ON courses.course_id = classcomponent.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN subcomponents ON subcomponents.component_id = classcomponent.component_id AND subcomponents.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (subcomponents.sub_component_id = {{id}}  AND  subcomponents.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subcomponents SET status = 'inactive' WHERE sub_component_id = {{id}}"}    

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
                        successMessage: "subcomponents Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsClasscomponent_object}