const parameters = require('./CRUD_parameters');
        global.GroupedCrudsEmployees_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO employees (department_id, personal_domain_url, urdd_id, qualification, salary, start_date, end_date , created_by, updated_by) VALUES ({{employees_departmentId}}, {{employees_personalDomainUrl}}, {{employees_urddId}}, {{employees_qualification}}, {{employees_salary}}, {{employees_startDate}}, {{employees_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE employees SET department_id = {{employees_departmentId}}, personal_domain_url = {{employees_personalDomainUrl}}, urdd_id = {{employees_urddId}}, qualification = {{employees_qualification}}, salary = {{employees_salary}}, start_date = {{employees_startDate}}, end_date = {{employees_endDate}}, created_by = {{employees_createdBy}}, updated_by = {{employees_updatedBy}} WHERE employee_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employee_id as employees_id,employee_id as id, employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate  FROM employees WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, courses.course_id as courses_id, departments.department_id as departments_id, domains.domain_id as domains_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as  courses_courseId, departments.department_name as  userRolesDesignationsDepartment_departmentsName, domains.domain_id as  domains_domainId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName,

                          employees.employee_id as userRolesDesignationsDepartment_employeeId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as userRolesDesignationsDepartment_courseId, departments.department_id as userRolesDesignationsDepartment_departmentId, domains.domain_id as userRolesDesignationsDepartment_domainId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, clo.cloid as userRolesDesignationsDepartment_cloid,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM employees LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN courses ON (courses.teacher_employee_id = employees.employee_id OR courses.tassist_employee_id = employees.employee_id) LEFT JOIN departments ON departments.employee_id = employees.employee_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_leader_id = employees.employee_id AND domains.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.planned_course_id = courses.planned_course_id OR plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' WHERE (employees.employee_id = {{id}}  AND  employees.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE employees SET status = 'inactive' WHERE employee_id = {{id}}"}    

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
                        successMessage: "employees Grouped CRUD Hit successfully!",
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
                            employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, courses.course_id as courses_id, departments.department_id as departments_id, domains.domain_id as domains_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as  courses_courseId, departments.department_name as  userRolesDesignationsDepartment_departmentsName, domains.domain_id as  domains_domainId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName,

                          employees.employee_id as userRolesDesignationsDepartment_employeeId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as userRolesDesignationsDepartment_courseId, departments.department_id as userRolesDesignationsDepartment_departmentId, domains.domain_id as userRolesDesignationsDepartment_domainId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, clo.cloid as userRolesDesignationsDepartment_cloid,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM employees LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN courses ON (courses.teacher_employee_id = employees.employee_id OR courses.tassist_employee_id = employees.employee_id) LEFT JOIN departments ON departments.employee_id = employees.employee_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_leader_id = employees.employee_id AND domains.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.planned_course_id = courses.planned_course_id OR plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courses (course_sub_domain_prefix, planned_course_id, cloid, teacher_employee_id, tassist_employee_id , created_by, updated_by) VALUES ({{courses_courseSubDomainPrefix}}, {{courses_plannedCourseId}}, {{courses_cloid}}, {{courses_teacherEmployeeId}}, {{courses_tassistEmployeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courses SET course_sub_domain_prefix = {{courses_courseSubDomainPrefix}}, planned_course_id = {{courses_plannedCourseId}}, cloid = {{courses_cloid}}, teacher_employee_id = {{courses_teacherEmployeeId}}, tassist_employee_id = {{courses_tassistEmployeeId}}, created_by = {{courses_createdBy}}, updated_by = {{courses_updatedBy}} WHERE course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_id as courses_id,course_id as id, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId  FROM courses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, courses.course_id as courses_id, departments.department_id as departments_id, domains.domain_id as domains_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as  courses_courseId, departments.department_name as  userRolesDesignationsDepartment_departmentsName, domains.domain_id as  domains_domainId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName,

                          employees.employee_id as userRolesDesignationsDepartment_employeeId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as userRolesDesignationsDepartment_courseId, departments.department_id as userRolesDesignationsDepartment_departmentId, domains.domain_id as userRolesDesignationsDepartment_domainId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, clo.cloid as userRolesDesignationsDepartment_cloid,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM employees LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN courses ON (courses.teacher_employee_id = employees.employee_id OR courses.tassist_employee_id = employees.employee_id) LEFT JOIN departments ON departments.employee_id = employees.employee_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_leader_id = employees.employee_id AND domains.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.planned_course_id = courses.planned_course_id OR plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO departments (department_name, employee_id , created_by, updated_by) VALUES ({{departments_departmentName}}, {{departments_employeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE departments SET department_name = {{departments_departmentName}}, employee_id = {{departments_employeeId}}, created_by = {{departments_createdBy}}, updated_by = {{departments_updatedBy}} WHERE department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, department_id as departments_id,department_id as id, departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId  FROM departments WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, courses.course_id as courses_id, departments.department_id as departments_id, domains.domain_id as domains_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as  courses_courseId, departments.department_name as  userRolesDesignationsDepartment_departmentsName, domains.domain_id as  domains_domainId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName,

                          employees.employee_id as userRolesDesignationsDepartment_employeeId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as userRolesDesignationsDepartment_courseId, departments.department_id as userRolesDesignationsDepartment_departmentId, domains.domain_id as userRolesDesignationsDepartment_domainId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, clo.cloid as userRolesDesignationsDepartment_cloid,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM employees LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN courses ON (courses.teacher_employee_id = employees.employee_id OR courses.tassist_employee_id = employees.employee_id) LEFT JOIN departments ON departments.employee_id = employees.employee_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_leader_id = employees.employee_id AND domains.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.planned_course_id = courses.planned_course_id OR plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' WHERE (departments.department_id = {{id}}  AND  departments.status != 'inactive')
                          
                          
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
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE domains SET domain_name = {{domains_domainName}}, domain_leader_id = {{domains_domainLeaderId}}, created_by = {{domains_createdBy}}, updated_by = {{domains_updatedBy}} WHERE domain_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, domain_id as domains_id,domain_id as id, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId  FROM domains WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employees.employee_id as employees_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, courses.course_id as courses_id, departments.department_id as departments_id, domains.domain_id as domains_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       employees.employee_id as  employees_employeeId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as  courses_courseId, departments.department_name as  userRolesDesignationsDepartment_departmentsName, domains.domain_id as  domains_domainId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName,

                          employees.employee_id as userRolesDesignationsDepartment_employeeId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, courses.course_id as userRolesDesignationsDepartment_courseId, departments.department_id as userRolesDesignationsDepartment_departmentId, domains.domain_id as userRolesDesignationsDepartment_domainId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, clo.cloid as userRolesDesignationsDepartment_cloid,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM employees LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = employees.urdd_id AND user_roles_designations_department.status !='inactive' LEFT JOIN courses ON (courses.teacher_employee_id = employees.employee_id OR courses.tassist_employee_id = employees.employee_id) LEFT JOIN departments ON departments.employee_id = employees.employee_id AND departments.status !='inactive' LEFT JOIN domains ON domains.domain_leader_id = employees.employee_id AND domains.status !='inactive' LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.planned_course_id = courses.planned_course_id OR plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' WHERE (domains.domain_id = {{id}}  AND  domains.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsEmployees_object}