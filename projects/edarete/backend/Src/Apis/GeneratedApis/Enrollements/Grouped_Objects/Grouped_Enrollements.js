const parameters = require('./CRUD_parameters');
        global.GroupedCrudsEnrollements_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO enrollements (student_semester_id, grade, group_name, enrolled_date, course_id , created_by, updated_by) VALUES ({{enrollements_studentSemesterId}}, {{enrollements_grade}}, {{enrollements_groupName}}, {{enrollements_enrolledDate}}, {{enrollements_courseId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE enrollements SET student_semester_id = {{enrollements_studentSemesterId}}, grade = {{enrollements_grade}}, group_name = {{enrollements_groupName}}, enrolled_date = {{enrollements_enrolledDate}}, course_id = {{enrollements_courseId}}, created_by = {{enrollements_createdBy}}, updated_by = {{enrollements_updatedBy}} WHERE enrollement_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, enrollement_id as enrollements_id,enrollement_id as id, enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId  FROM enrollements WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            enrollements.enrollement_id as enrollements_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, feedbacks.feedback_id as feedbacks_id, lecturesattendance.attendance_id as lecturesattendance_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, feedbackquestions.questions_id as feedbackquestions_id, subcomponents.sub_component_id as subcomponents_id, classcomponent.component_id as classcomponent_id,
                        courses.course_id as id,
                       enrollements.group_name as  courses_enrollementsName, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, feedbacks.feedback_id as  feedbacks_feedbackId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, feedbackquestions.questions_id as  feedbackquestions_questionsId, subcomponents.sub_component_id as  subcomponents_subComponentId, classcomponent.component_name as  courses_classcomponentName,

                          enrollements.enrollement_id as courses_enrollementId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, feedbacks.feedback_id as courses_feedbackId, lecturesattendance.attendance_id as courses_attendanceId, subcomponentmarks.sub_component_mark_id as courses_subComponentMarkId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, feedbackquestions.questions_id as courses_questionsId, subcomponents.sub_component_id as courses_subComponentId, classcomponent.component_id as courses_componentId,
                          
                       
                         
                           enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM enrollements LEFT JOIN courses ON courses.course_id = enrollements.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN feedbacks ON feedbacks.enrollement_id = enrollements.enrollement_id AND feedbacks.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.enrollement_id = enrollements.enrollement_id AND lecturesattendance.status !='inactive' LEFT JOIN subcomponentmarks ON subcomponentmarks.enrollment_id = enrollements.enrollement_id AND subcomponentmarks.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN feedbackquestions ON feedbackquestions.questions_id = feedbacks.feedback_question_id AND feedbackquestions.status !='inactive' LEFT JOIN subcomponents ON (subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id OR subcomponents.sub_component_id = lecturesattendance.sub_component_id OR subcomponents.sub_component_id = subcomponentmarks.sub_component_id) LEFT JOIN classcomponent ON (classcomponent.course_id = courses.course_id OR classcomponent.component_id = subcomponents.component_id) WHERE (enrollements.enrollement_id = {{id}}  AND  enrollements.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE enrollements SET status = 'inactive' WHERE enrollement_id = {{id}}"}    

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
                        successMessage: "enrollements Grouped CRUD Hit successfully!",
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
                            enrollements.enrollement_id as enrollements_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, feedbacks.feedback_id as feedbacks_id, lecturesattendance.attendance_id as lecturesattendance_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, feedbackquestions.questions_id as feedbackquestions_id, subcomponents.sub_component_id as subcomponents_id, classcomponent.component_id as classcomponent_id,
                        courses.course_id as id,
                       enrollements.group_name as  courses_enrollementsName, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, feedbacks.feedback_id as  feedbacks_feedbackId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, feedbackquestions.questions_id as  feedbackquestions_questionsId, subcomponents.sub_component_id as  subcomponents_subComponentId, classcomponent.component_name as  courses_classcomponentName,

                          enrollements.enrollement_id as courses_enrollementId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, feedbacks.feedback_id as courses_feedbackId, lecturesattendance.attendance_id as courses_attendanceId, subcomponentmarks.sub_component_mark_id as courses_subComponentMarkId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, feedbackquestions.questions_id as courses_questionsId, subcomponents.sub_component_id as courses_subComponentId, classcomponent.component_id as courses_componentId,
                          
                       
                         
                           courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM enrollements LEFT JOIN courses ON courses.course_id = enrollements.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN feedbacks ON feedbacks.enrollement_id = enrollements.enrollement_id AND feedbacks.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.enrollement_id = enrollements.enrollement_id AND lecturesattendance.status !='inactive' LEFT JOIN subcomponentmarks ON subcomponentmarks.enrollment_id = enrollements.enrollement_id AND subcomponentmarks.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN feedbackquestions ON feedbackquestions.questions_id = feedbacks.feedback_question_id AND feedbackquestions.status !='inactive' LEFT JOIN subcomponents ON (subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id OR subcomponents.sub_component_id = lecturesattendance.sub_component_id OR subcomponents.sub_component_id = subcomponentmarks.sub_component_id) LEFT JOIN classcomponent ON (classcomponent.course_id = courses.course_id OR classcomponent.component_id = subcomponents.component_id) WHERE (courses.course_id = {{id}}  AND  courses.status != 'inactive')
                          
                          
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
                            enrollements.enrollement_id as enrollements_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, feedbacks.feedback_id as feedbacks_id, lecturesattendance.attendance_id as lecturesattendance_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, feedbackquestions.questions_id as feedbackquestions_id, subcomponents.sub_component_id as subcomponents_id, classcomponent.component_id as classcomponent_id,
                        courses.course_id as id,
                       enrollements.group_name as  courses_enrollementsName, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, feedbacks.feedback_id as  feedbacks_feedbackId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, feedbackquestions.questions_id as  feedbackquestions_questionsId, subcomponents.sub_component_id as  subcomponents_subComponentId, classcomponent.component_name as  courses_classcomponentName,

                          enrollements.enrollement_id as courses_enrollementId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, feedbacks.feedback_id as courses_feedbackId, lecturesattendance.attendance_id as courses_attendanceId, subcomponentmarks.sub_component_mark_id as courses_subComponentMarkId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, feedbackquestions.questions_id as courses_questionsId, subcomponents.sub_component_id as courses_subComponentId, classcomponent.component_id as courses_componentId,
                          
                       
                         
                           user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM enrollements LEFT JOIN courses ON courses.course_id = enrollements.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN feedbacks ON feedbacks.enrollement_id = enrollements.enrollement_id AND feedbacks.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.enrollement_id = enrollements.enrollement_id AND lecturesattendance.status !='inactive' LEFT JOIN subcomponentmarks ON subcomponentmarks.enrollment_id = enrollements.enrollement_id AND subcomponentmarks.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN feedbackquestions ON feedbackquestions.questions_id = feedbacks.feedback_question_id AND feedbackquestions.status !='inactive' LEFT JOIN subcomponents ON (subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id OR subcomponents.sub_component_id = lecturesattendance.sub_component_id OR subcomponents.sub_component_id = subcomponentmarks.sub_component_id) LEFT JOIN classcomponent ON (classcomponent.course_id = courses.course_id OR classcomponent.component_id = subcomponents.component_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO feedbacks (enrollement_id, feedback_question_id, feedback_text , created_by, updated_by) VALUES ({{feedbacks_enrollementId}}, {{feedbacks_feedbackQuestionId}}, {{feedbacks_feedbackText}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE feedbacks SET enrollement_id = {{feedbacks_enrollementId}}, feedback_question_id = {{feedbacks_feedbackQuestionId}}, feedback_text = {{feedbacks_feedbackText}}, created_by = {{feedbacks_createdBy}}, updated_by = {{feedbacks_updatedBy}} WHERE feedback_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, feedback_id as feedbacks_id,feedback_id as id, feedbacks.enrollement_id as feedbacks_enrollementId, feedbacks.feedback_question_id as feedbacks_feedbackQuestionId, feedbacks.feedback_text as feedbacks_feedbackText  FROM feedbacks WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            enrollements.enrollement_id as enrollements_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, feedbacks.feedback_id as feedbacks_id, lecturesattendance.attendance_id as lecturesattendance_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, feedbackquestions.questions_id as feedbackquestions_id, subcomponents.sub_component_id as subcomponents_id, classcomponent.component_id as classcomponent_id,
                        courses.course_id as id,
                       enrollements.group_name as  courses_enrollementsName, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, feedbacks.feedback_id as  feedbacks_feedbackId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, feedbackquestions.questions_id as  feedbackquestions_questionsId, subcomponents.sub_component_id as  subcomponents_subComponentId, classcomponent.component_name as  courses_classcomponentName,

                          enrollements.enrollement_id as courses_enrollementId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, feedbacks.feedback_id as courses_feedbackId, lecturesattendance.attendance_id as courses_attendanceId, subcomponentmarks.sub_component_mark_id as courses_subComponentMarkId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, feedbackquestions.questions_id as courses_questionsId, subcomponents.sub_component_id as courses_subComponentId, classcomponent.component_id as courses_componentId,
                          
                       
                         
                           feedbacks.enrollement_id as feedbacks_enrollementId, feedbacks.feedback_question_id as feedbacks_feedbackQuestionId, feedbacks.feedback_text as feedbacks_feedbackText, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM enrollements LEFT JOIN courses ON courses.course_id = enrollements.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN feedbacks ON feedbacks.enrollement_id = enrollements.enrollement_id AND feedbacks.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.enrollement_id = enrollements.enrollement_id AND lecturesattendance.status !='inactive' LEFT JOIN subcomponentmarks ON subcomponentmarks.enrollment_id = enrollements.enrollement_id AND subcomponentmarks.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN feedbackquestions ON feedbackquestions.questions_id = feedbacks.feedback_question_id AND feedbackquestions.status !='inactive' LEFT JOIN subcomponents ON (subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id OR subcomponents.sub_component_id = lecturesattendance.sub_component_id OR subcomponents.sub_component_id = subcomponentmarks.sub_component_id) LEFT JOIN classcomponent ON (classcomponent.course_id = courses.course_id OR classcomponent.component_id = subcomponents.component_id) WHERE (feedbacks.feedback_id = {{id}}  AND  feedbacks.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE feedbacks SET status = 'inactive' WHERE feedback_id = {{id}}"}    

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
                        successMessage: "feedbacks Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id , created_by, updated_by) VALUES ({{lecturesattendance_enrollementId}}, {{lecturesattendance_date}}, {{lecturesattendance_isPresent}}, {{lecturesattendance_subComponentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturesattendance SET enrollement_id = {{lecturesattendance_enrollementId}}, date = {{lecturesattendance_date}}, is_present = {{lecturesattendance_isPresent}}, sub_component_id = {{lecturesattendance_subComponentId}}, created_by = {{lecturesattendance_createdBy}}, updated_by = {{lecturesattendance_updatedBy}} WHERE attendance_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, attendance_id as lecturesattendance_id,attendance_id as id, lecturesattendance.enrollement_id as lecturesattendance_enrollementId, lecturesattendance.date as lecturesattendance_date, lecturesattendance.is_present as lecturesattendance_isPresent, lecturesattendance.sub_component_id as lecturesattendance_subComponentId  FROM lecturesattendance WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            enrollements.enrollement_id as enrollements_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, feedbacks.feedback_id as feedbacks_id, lecturesattendance.attendance_id as lecturesattendance_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, feedbackquestions.questions_id as feedbackquestions_id, subcomponents.sub_component_id as subcomponents_id, classcomponent.component_id as classcomponent_id,
                        courses.course_id as id,
                       enrollements.group_name as  courses_enrollementsName, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, feedbacks.feedback_id as  feedbacks_feedbackId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, feedbackquestions.questions_id as  feedbackquestions_questionsId, subcomponents.sub_component_id as  subcomponents_subComponentId, classcomponent.component_name as  courses_classcomponentName,

                          enrollements.enrollement_id as courses_enrollementId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, feedbacks.feedback_id as courses_feedbackId, lecturesattendance.attendance_id as courses_attendanceId, subcomponentmarks.sub_component_mark_id as courses_subComponentMarkId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, feedbackquestions.questions_id as courses_questionsId, subcomponents.sub_component_id as courses_subComponentId, classcomponent.component_id as courses_componentId,
                          
                       
                         
                           lecturesattendance.enrollement_id as lecturesattendance_enrollementId, lecturesattendance.date as lecturesattendance_date, lecturesattendance.is_present as lecturesattendance_isPresent, lecturesattendance.sub_component_id as lecturesattendance_subComponentId, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM enrollements LEFT JOIN courses ON courses.course_id = enrollements.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN feedbacks ON feedbacks.enrollement_id = enrollements.enrollement_id AND feedbacks.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.enrollement_id = enrollements.enrollement_id AND lecturesattendance.status !='inactive' LEFT JOIN subcomponentmarks ON subcomponentmarks.enrollment_id = enrollements.enrollement_id AND subcomponentmarks.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN feedbackquestions ON feedbackquestions.questions_id = feedbacks.feedback_question_id AND feedbackquestions.status !='inactive' LEFT JOIN subcomponents ON (subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id OR subcomponents.sub_component_id = lecturesattendance.sub_component_id OR subcomponents.sub_component_id = subcomponentmarks.sub_component_id) LEFT JOIN classcomponent ON (classcomponent.course_id = courses.course_id OR classcomponent.component_id = subcomponents.component_id) WHERE (lecturesattendance.attendance_id = {{id}}  AND  lecturesattendance.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE lecturesattendance SET status = 'inactive' WHERE attendance_id = {{id}}"}    

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
                        successMessage: "lecturesattendance Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponentmarks (sub_component_id, enrollment_id, obtained_marks, out_of_marks , created_by, updated_by) VALUES ({{subcomponentmarks_subComponentId}}, {{subcomponentmarks_enrollmentId}}, {{subcomponentmarks_obtainedMarks}}, {{subcomponentmarks_outOfMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponentmarks SET sub_component_id = {{subcomponentmarks_subComponentId}}, enrollment_id = {{subcomponentmarks_enrollmentId}}, obtained_marks = {{subcomponentmarks_obtainedMarks}}, out_of_marks = {{subcomponentmarks_outOfMarks}}, created_by = {{subcomponentmarks_createdBy}}, updated_by = {{subcomponentmarks_updatedBy}} WHERE sub_component_mark_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_mark_id as subcomponentmarks_id,sub_component_mark_id as id, subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks  FROM subcomponentmarks WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            enrollements.enrollement_id as enrollements_id, courses.course_id as courses_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, feedbacks.feedback_id as feedbacks_id, lecturesattendance.attendance_id as lecturesattendance_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, feedbackquestions.questions_id as feedbackquestions_id, subcomponents.sub_component_id as subcomponents_id, classcomponent.component_id as classcomponent_id,
                        courses.course_id as id,
                       enrollements.group_name as  courses_enrollementsName, courses.course_id as  courses_courseId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, feedbacks.feedback_id as  feedbacks_feedbackId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, plannedcourses.course_name as  courses_plannedcoursesName, clo.clodomain_name as  courses_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  courses_departmentsName, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  courses_usersName, designations.designation_name as  courses_designationsName, roles.role_name as  courses_rolesName, feedbackquestions.questions_id as  feedbackquestions_questionsId, subcomponents.sub_component_id as  subcomponents_subComponentId, classcomponent.component_name as  courses_classcomponentName,

                          enrollements.enrollement_id as courses_enrollementId, courses.course_id as courses_courseId, user_roles_designations_department.user_role_designation_department_id as courses_userRoleDesignationDepartmentId, feedbacks.feedback_id as courses_feedbackId, lecturesattendance.attendance_id as courses_attendanceId, subcomponentmarks.sub_component_mark_id as courses_subComponentMarkId, plannedcourses.planned_course_id as courses_plannedCourseId, clo.cloid as courses_cloid, employees.employee_id as courses_employeeId, departments.department_id as courses_departmentId, roles_designations_department.role_designation_department_id as courses_roleDesignationDepartmentId, users.user_id as courses_userId, designations.designation_id as courses_designationId, roles.role_id as courses_roleId, feedbackquestions.questions_id as courses_questionsId, subcomponents.sub_component_id as courses_subComponentId, classcomponent.component_id as courses_componentId,
                          
                       
                         
                           subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks, 
                        courses.course_sub_domain_prefix as courses_courseSubDomainPrefix, courses.planned_course_id as courses_plannedCourseId, courses.cloid as courses_cloid, courses.teacher_employee_id as courses_teacherEmployeeId, courses.tassist_employee_id as courses_tassistEmployeeId FROM enrollements LEFT JOIN courses ON courses.course_id = enrollements.course_id AND courses.status !='inactive' LEFT JOIN user_roles_designations_department ON () LEFT JOIN feedbacks ON feedbacks.enrollement_id = enrollements.enrollement_id AND feedbacks.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.enrollement_id = enrollements.enrollement_id AND lecturesattendance.status !='inactive' LEFT JOIN subcomponentmarks ON subcomponentmarks.enrollment_id = enrollements.enrollement_id AND subcomponentmarks.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON (employees.employee_id = courses.teacher_employee_id OR employees.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN roles_designations_department ON (roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id OR roles_designations_department.department_id = departments.department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN feedbackquestions ON feedbackquestions.questions_id = feedbacks.feedback_question_id AND feedbackquestions.status !='inactive' LEFT JOIN subcomponents ON (subcomponents.urdd_id = user_roles_designations_department.user_role_designation_department_id OR subcomponents.sub_component_id = lecturesattendance.sub_component_id OR subcomponents.sub_component_id = subcomponentmarks.sub_component_id) LEFT JOIN classcomponent ON (classcomponent.course_id = courses.course_id OR classcomponent.component_id = subcomponents.component_id) WHERE (subcomponentmarks.sub_component_mark_id = {{id}}  AND  subcomponentmarks.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subcomponentmarks SET status = 'inactive' WHERE sub_component_mark_id = {{id}}"}    

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
                        successMessage: "subcomponentmarks Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsEnrollements_object}