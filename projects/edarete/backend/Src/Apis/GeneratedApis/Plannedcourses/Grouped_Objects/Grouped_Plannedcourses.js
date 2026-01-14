const parameters = require('./CRUD_parameters');
        global.GroupedCrudsPlannedcourses_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plannedcourses (semester_id, domain_id, course_name, credit_hours, type, required_lectures, course_description, course_objective, image , created_by, updated_by) VALUES ({{plannedcourses_semesterId}}, {{plannedcourses_domainId}}, {{plannedcourses_courseName}}, {{plannedcourses_creditHours}}, {{plannedcourses_type}}, {{plannedcourses_requiredLectures}}, {{plannedcourses_courseDescription}}, {{plannedcourses_courseObjective}}, {{plannedcourses_image}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET semester_id = {{plannedcourses_semesterId}}, domain_id = {{plannedcourses_domainId}}, course_name = {{plannedcourses_courseName}}, credit_hours = {{plannedcourses_creditHours}}, type = {{plannedcourses_type}}, required_lectures = {{plannedcourses_requiredLectures}}, course_description = {{plannedcourses_courseDescription}}, course_objective = {{plannedcourses_courseObjective}}, image = {{plannedcourses_image}}, created_by = {{plannedcourses_createdBy}}, updated_by = {{plannedcourses_updatedBy}} WHERE planned_course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, planned_course_id as plannedcourses_id,planned_course_id as id, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image  FROM plannedcourses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plannedcourses.planned_course_id as plannedcourses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, semesters.semester_id as semesters_id, domains.domain_id as domains_id, courses.course_id as courses_id, prereqs.pre_reqs_id as prereqs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, clo.cloid as clo_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as  semesters_semesterId, domains.domain_id as  domains_domainId, courses.course_id as  courses_courseId, prereqs.pre_reqs_id as  prereqs_preReqsId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName, employees.employee_id as  employees_employeeId,

                          plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as userRolesDesignationsDepartment_semesterId, domains.domain_id as userRolesDesignationsDepartment_domainId, courses.course_id as userRolesDesignationsDepartment_courseId, prereqs.pre_reqs_id as userRolesDesignationsDepartment_preReqsId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, clo.cloid as userRolesDesignationsDepartment_cloid, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM plannedcourses LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plannedcourses.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id AND semesters.status !='inactive' LEFT JOIN domains ON domains.domain_id = plannedcourses.domain_id AND domains.status !='inactive' LEFT JOIN courses ON courses.planned_course_id = plannedcourses.planned_course_id AND courses.status !='inactive' LEFT JOIN prereqs ON (prereqs.planned_course_id = plannedcourses.planned_course_id OR prereqs.pre_req_course_id = plannedcourses.planned_course_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = domains.domain_leader_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (plannedcourses.planned_course_id = {{id}}  AND  plannedcourses.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET status = 'inactive' WHERE planned_course_id = {{id}}"}    

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
                        successMessage: "plannedcourses Grouped CRUD Hit successfully!",
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
                            plannedcourses.planned_course_id as plannedcourses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, semesters.semester_id as semesters_id, domains.domain_id as domains_id, courses.course_id as courses_id, prereqs.pre_reqs_id as prereqs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, clo.cloid as clo_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as  semesters_semesterId, domains.domain_id as  domains_domainId, courses.course_id as  courses_courseId, prereqs.pre_reqs_id as  prereqs_preReqsId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName, employees.employee_id as  employees_employeeId,

                          plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as userRolesDesignationsDepartment_semesterId, domains.domain_id as userRolesDesignationsDepartment_domainId, courses.course_id as userRolesDesignationsDepartment_courseId, prereqs.pre_reqs_id as userRolesDesignationsDepartment_preReqsId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, clo.cloid as userRolesDesignationsDepartment_cloid, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM plannedcourses LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plannedcourses.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id AND semesters.status !='inactive' LEFT JOIN domains ON domains.domain_id = plannedcourses.domain_id AND domains.status !='inactive' LEFT JOIN courses ON courses.planned_course_id = plannedcourses.planned_course_id AND courses.status !='inactive' LEFT JOIN prereqs ON (prereqs.planned_course_id = plannedcourses.planned_course_id OR prereqs.pre_req_course_id = plannedcourses.planned_course_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = domains.domain_leader_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO semesters (program_id, semester_num, start_date, end_date, semester_name , created_by, updated_by) VALUES ({{semesters_programId}}, {{semesters_semesterNum}}, {{semesters_startDate}}, {{semesters_endDate}}, {{semesters_semesterName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE semesters SET program_id = {{semesters_programId}}, semester_num = {{semesters_semesterNum}}, start_date = {{semesters_startDate}}, end_date = {{semesters_endDate}}, semester_name = {{semesters_semesterName}}, created_by = {{semesters_createdBy}}, updated_by = {{semesters_updatedBy}} WHERE semester_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, semester_id as semesters_id,semester_id as id, semesters.program_id as semesters_programId, semesters.semester_num as semesters_semesterNum, semesters.start_date as semesters_startDate, semesters.end_date as semesters_endDate, semesters.semester_name as semesters_semesterName  FROM semesters WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plannedcourses.planned_course_id as plannedcourses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, semesters.semester_id as semesters_id, domains.domain_id as domains_id, courses.course_id as courses_id, prereqs.pre_reqs_id as prereqs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, clo.cloid as clo_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as  semesters_semesterId, domains.domain_id as  domains_domainId, courses.course_id as  courses_courseId, prereqs.pre_reqs_id as  prereqs_preReqsId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName, employees.employee_id as  employees_employeeId,

                          plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as userRolesDesignationsDepartment_semesterId, domains.domain_id as userRolesDesignationsDepartment_domainId, courses.course_id as userRolesDesignationsDepartment_courseId, prereqs.pre_reqs_id as userRolesDesignationsDepartment_preReqsId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, clo.cloid as userRolesDesignationsDepartment_cloid, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, semesters.program_id as semesters_programId, semesters.semester_num as semesters_semesterNum, semesters.start_date as semesters_startDate, semesters.end_date as semesters_endDate, semesters.semester_name as semesters_semesterName, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM plannedcourses LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plannedcourses.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id AND semesters.status !='inactive' LEFT JOIN domains ON domains.domain_id = plannedcourses.domain_id AND domains.status !='inactive' LEFT JOIN courses ON courses.planned_course_id = plannedcourses.planned_course_id AND courses.status !='inactive' LEFT JOIN prereqs ON (prereqs.planned_course_id = plannedcourses.planned_course_id OR prereqs.pre_req_course_id = plannedcourses.planned_course_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = domains.domain_leader_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (semesters.semester_id = {{id}}  AND  semesters.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO domains (domain_name, domain_leader_id , created_by, updated_by) VALUES ({{domains_domainName}}, {{domains_domainLeaderId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE domains SET domain_name = {{domains_domainName}}, domain_leader_id = {{domains_domainLeaderId}}, created_by = {{domains_createdBy}}, updated_by = {{domains_updatedBy}} WHERE domain_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, domain_id as domains_id,domain_id as id, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId  FROM domains WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plannedcourses.planned_course_id as plannedcourses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, semesters.semester_id as semesters_id, domains.domain_id as domains_id, courses.course_id as courses_id, prereqs.pre_reqs_id as prereqs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, clo.cloid as clo_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as  semesters_semesterId, domains.domain_id as  domains_domainId, courses.course_id as  courses_courseId, prereqs.pre_reqs_id as  prereqs_preReqsId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName, employees.employee_id as  employees_employeeId,

                          plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as userRolesDesignationsDepartment_semesterId, domains.domain_id as userRolesDesignationsDepartment_domainId, courses.course_id as userRolesDesignationsDepartment_courseId, prereqs.pre_reqs_id as userRolesDesignationsDepartment_preReqsId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, clo.cloid as userRolesDesignationsDepartment_cloid, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM plannedcourses LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plannedcourses.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id AND semesters.status !='inactive' LEFT JOIN domains ON domains.domain_id = plannedcourses.domain_id AND domains.status !='inactive' LEFT JOIN courses ON courses.planned_course_id = plannedcourses.planned_course_id AND courses.status !='inactive' LEFT JOIN prereqs ON (prereqs.planned_course_id = plannedcourses.planned_course_id OR prereqs.pre_req_course_id = plannedcourses.planned_course_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = domains.domain_leader_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (domains.domain_id = {{id}}  AND  domains.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courses (course_sub_domain_prefix, planned_course_id, cloid, course_code, teacher_employee_id, tassist_employee_id , created_by, updated_by) VALUES ({{courses_courseSubDomainPrefix}}, {{courses_plannedCourseId}}, {{courses_cloid}}, {{courses_courseCode}}, {{courses_teacherEmployeeId}}, {{courses_tassistEmployeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courses SET course_sub_domain_prefix = {{courses_courseSubDomainPrefix}}, planned_course_id = {{courses_plannedCourseId}}, cloid = {{courses_cloid}}, course_code = {{courses_courseCode}}, teacher_employee_id = {{courses_teacherEmployeeId}}, tassist_employee_id = {{courses_tassistEmployeeId}}, created_by = {{courses_createdBy}}, updated_by = {{courses_updatedBy}} WHERE course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_id as courses_id,course_id as id, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId  FROM courses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plannedcourses.planned_course_id as plannedcourses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, semesters.semester_id as semesters_id, domains.domain_id as domains_id, courses.course_id as courses_id, prereqs.pre_reqs_id as prereqs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, clo.cloid as clo_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as  semesters_semesterId, domains.domain_id as  domains_domainId, courses.course_id as  courses_courseId, prereqs.pre_reqs_id as  prereqs_preReqsId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName, employees.employee_id as  employees_employeeId,

                          plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as userRolesDesignationsDepartment_semesterId, domains.domain_id as userRolesDesignationsDepartment_domainId, courses.course_id as userRolesDesignationsDepartment_courseId, prereqs.pre_reqs_id as userRolesDesignationsDepartment_preReqsId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, clo.cloid as userRolesDesignationsDepartment_cloid, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.course_code as courses_courseCode, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM plannedcourses LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plannedcourses.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id AND semesters.status !='inactive' LEFT JOIN domains ON domains.domain_id = plannedcourses.domain_id AND domains.status !='inactive' LEFT JOIN courses ON courses.planned_course_id = plannedcourses.planned_course_id AND courses.status !='inactive' LEFT JOIN prereqs ON (prereqs.planned_course_id = plannedcourses.planned_course_id OR prereqs.pre_req_course_id = plannedcourses.planned_course_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = domains.domain_leader_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO prereqs (planned_course_id, pre_req_course_id , created_by, updated_by) VALUES ({{prereqs_plannedCourseId}}, {{prereqs_preReqCourseId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE prereqs SET planned_course_id = {{prereqs_plannedCourseId}}, pre_req_course_id = {{prereqs_preReqCourseId}}, created_by = {{prereqs_createdBy}}, updated_by = {{prereqs_updatedBy}} WHERE pre_reqs_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, pre_reqs_id as prereqs_id,pre_reqs_id as id, prereqs.planned_course_id as prereqs_plannedCourseId, prereqs.pre_req_course_id as prereqs_preReqCourseId  FROM prereqs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plannedcourses.planned_course_id as plannedcourses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, semesters.semester_id as semesters_id, domains.domain_id as domains_id, courses.course_id as courses_id, prereqs.pre_reqs_id as prereqs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, clo.cloid as clo_id, employees.employee_id as employees_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       plannedcourses.course_name as  userRolesDesignationsDepartment_plannedcoursesName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as  semesters_semesterId, domains.domain_id as  domains_domainId, courses.course_id as  courses_courseId, prereqs.pre_reqs_id as  prereqs_preReqsId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, clo.clodomain_name as  userRolesDesignationsDepartment_cloName, employees.employee_id as  employees_employeeId,

                          plannedcourses.planned_course_id as userRolesDesignationsDepartment_plannedCourseId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, semesters.semester_id as userRolesDesignationsDepartment_semesterId, domains.domain_id as userRolesDesignationsDepartment_domainId, courses.course_id as userRolesDesignationsDepartment_courseId, prereqs.pre_reqs_id as userRolesDesignationsDepartment_preReqsId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, clo.cloid as userRolesDesignationsDepartment_cloid, employees.employee_id as userRolesDesignationsDepartment_employeeId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, prereqs.planned_course_id as prereqs_plannedCourseId, prereqs.pre_req_course_id as prereqs_preReqCourseId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM plannedcourses LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = plannedcourses.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id AND semesters.status !='inactive' LEFT JOIN domains ON domains.domain_id = plannedcourses.domain_id AND domains.status !='inactive' LEFT JOIN courses ON courses.planned_course_id = plannedcourses.planned_course_id AND courses.status !='inactive' LEFT JOIN prereqs ON (prereqs.planned_course_id = plannedcourses.planned_course_id OR prereqs.pre_req_course_id = plannedcourses.planned_course_id) LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.urdd_id = user_roles_designations_department.user_role_designation_department_id OR employees.employee_id = domains.domain_leader_id OR employees.employee_id = courses.teacher_employee_id OR employees.employee_id = departments.employee_id OR employees.department_id = departments.department_id) WHERE (prereqs.pre_reqs_id = {{id}}  AND  prereqs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE prereqs SET status = 'inactive' WHERE pre_reqs_id = {{id}}"}    

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
                        successMessage: "prereqs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsPlannedcourses_object}