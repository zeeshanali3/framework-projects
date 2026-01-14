const parameters = require('./CRUD_parameters');
        global.GroupedCrudsAttachments_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date , created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}}, created_by = {{userRolesDesignationsDepartment_createdBy}}, updated_by = {{userRolesDesignationsDepartment_updatedBy}} WHERE user_role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_department_id as userRolesDesignationsDepartment_id,user_role_designation_department_id as id, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate  FROM user_roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, plannedcourses.planned_course_id as plannedcourses_id, questionssolution.questions_help_guide_id as questionssolution_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, questions.question_id as questions_id, attachments.attachment_id as attachments_id,
                        plannedcourses.planned_course_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  plannedcourses_usersName, designations.designation_name as  plannedcourses_designationsName, roles.role_name as  plannedcourses_rolesName, departments.department_name as  plannedcourses_departmentsName, questions.description as  plannedcourses_questionsName, attachments.attachment_name as  plannedcourses_attachmentsName,

                          user_roles_designations_department.user_role_designation_department_id as plannedcourses_userRoleDesignationDepartmentId, plannedcourses.planned_course_id as plannedcourses_plannedCourseId, questionssolution.questions_help_guide_id as plannedcourses_questionsHelpGuideId, roles_designations_department.role_designation_department_id as plannedcourses_roleDesignationDepartmentId, users.user_id as plannedcourses_userId, designations.designation_id as plannedcourses_designationId, roles.role_id as plannedcourses_roleId, departments.department_id as plannedcourses_departmentId, questions.question_id as plannedcourses_questionId, attachments.attachment_id as plannedcourses_attachmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  plannedcourses_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN questions ON questions.question_id = questionssolution.question_id AND questions.status !='inactive' LEFT JOIN attachments ON (attachments.attachment_id = plannedcourses.image OR attachments.attachment_id = questionssolution.attachment_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plannedcourses (semester_id, domain_id, course_name, credit_hours, type, required_lectures, course_description, course_objective, image , created_by, updated_by) VALUES ({{plannedcourses_semesterId}}, {{plannedcourses_domainId}}, {{plannedcourses_courseName}}, {{plannedcourses_creditHours}}, {{plannedcourses_type}}, {{plannedcourses_requiredLectures}}, {{plannedcourses_courseDescription}}, {{plannedcourses_courseObjective}}, {{plannedcourses_image}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET semester_id = {{plannedcourses_semesterId}}, domain_id = {{plannedcourses_domainId}}, course_name = {{plannedcourses_courseName}}, credit_hours = {{plannedcourses_creditHours}}, type = {{plannedcourses_type}}, required_lectures = {{plannedcourses_requiredLectures}}, course_description = {{plannedcourses_courseDescription}}, course_objective = {{plannedcourses_courseObjective}}, image = {{plannedcourses_image}}, created_by = {{plannedcourses_createdBy}}, updated_by = {{plannedcourses_updatedBy}} WHERE planned_course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, planned_course_id as plannedcourses_id,planned_course_id as id, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image  FROM plannedcourses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, plannedcourses.planned_course_id as plannedcourses_id, questionssolution.questions_help_guide_id as questionssolution_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, questions.question_id as questions_id, attachments.attachment_id as attachments_id,
                        plannedcourses.planned_course_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  plannedcourses_usersName, designations.designation_name as  plannedcourses_designationsName, roles.role_name as  plannedcourses_rolesName, departments.department_name as  plannedcourses_departmentsName, questions.description as  plannedcourses_questionsName, attachments.attachment_name as  plannedcourses_attachmentsName,

                          user_roles_designations_department.user_role_designation_department_id as plannedcourses_userRoleDesignationDepartmentId, plannedcourses.planned_course_id as plannedcourses_plannedCourseId, questionssolution.questions_help_guide_id as plannedcourses_questionsHelpGuideId, roles_designations_department.role_designation_department_id as plannedcourses_roleDesignationDepartmentId, users.user_id as plannedcourses_userId, designations.designation_id as plannedcourses_designationId, roles.role_id as plannedcourses_roleId, departments.department_id as plannedcourses_departmentId, questions.question_id as plannedcourses_questionId, attachments.attachment_id as plannedcourses_attachmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  plannedcourses_rolesDesignationsDepartmentName, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image, 
                        plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN questions ON questions.question_id = questionssolution.question_id AND questions.status !='inactive' LEFT JOIN attachments ON (attachments.attachment_id = plannedcourses.image OR attachments.attachment_id = questionssolution.attachment_id) WHERE (plannedcourses.planned_course_id = {{id}}  AND  plannedcourses.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questionssolution (question_id, attachment_id, options , created_by, updated_by) VALUES ({{questionssolution_questionId}}, {{questionssolution_attachmentId}}, {{questionssolution_options}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questionssolution SET question_id = {{questionssolution_questionId}}, attachment_id = {{questionssolution_attachmentId}}, options = {{questionssolution_options}}, created_by = {{questionssolution_createdBy}}, updated_by = {{questionssolution_updatedBy}} WHERE questions_help_guide_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions_help_guide_id as questionssolution_id,questions_help_guide_id as id, questionssolution.question_id as questionssolution_questionId, questionssolution.attachment_id as questionssolution_attachmentId, questionssolution.options as questionssolution_options  FROM questionssolution WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, plannedcourses.planned_course_id as plannedcourses_id, questionssolution.questions_help_guide_id as questionssolution_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, questions.question_id as questions_id, attachments.attachment_id as attachments_id,
                        plannedcourses.planned_course_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  plannedcourses_usersName, designations.designation_name as  plannedcourses_designationsName, roles.role_name as  plannedcourses_rolesName, departments.department_name as  plannedcourses_departmentsName, questions.description as  plannedcourses_questionsName, attachments.attachment_name as  plannedcourses_attachmentsName,

                          user_roles_designations_department.user_role_designation_department_id as plannedcourses_userRoleDesignationDepartmentId, plannedcourses.planned_course_id as plannedcourses_plannedCourseId, questionssolution.questions_help_guide_id as plannedcourses_questionsHelpGuideId, roles_designations_department.role_designation_department_id as plannedcourses_roleDesignationDepartmentId, users.user_id as plannedcourses_userId, designations.designation_id as plannedcourses_designationId, roles.role_id as plannedcourses_roleId, departments.department_id as plannedcourses_departmentId, questions.question_id as plannedcourses_questionId, attachments.attachment_id as plannedcourses_attachmentId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  plannedcourses_rolesDesignationsDepartmentName, questionssolution.question_id as questionssolution_questionId, questionssolution.attachment_id as questionssolution_attachmentId, questionssolution.options as questionssolution_options, 
                        plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_description as plannedcourses_courseDescription, plannedcourses.course_objective as plannedcourses_courseObjective, plannedcourses.image as plannedcourses_image FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN questions ON questions.question_id = questionssolution.question_id AND questions.status !='inactive' LEFT JOIN attachments ON (attachments.attachment_id = plannedcourses.image OR attachments.attachment_id = questionssolution.attachment_id) WHERE (questionssolution.questions_help_guide_id = {{id}}  AND  questionssolution.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE questionssolution SET status = 'inactive' WHERE questions_help_guide_id = {{id}}"}    

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
                        successMessage: "questionssolution Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsAttachments_object}