const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSubcomponents_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, date, start_time, end_time, total_marks, weightage, is_public, config , created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{subcomponents_config}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}}, config = {{subcomponents_config}}, created_by = {{subcomponents_createdBy}}, updated_by = {{subcomponents_updatedBy}} WHERE sub_component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_id as subcomponents_id,sub_component_id as id, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, subcomponents.config as subcomponents_config  FROM subcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, subcomponents.config as subcomponents_config, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (subcomponents.sub_component_id = {{id}}  AND  subcomponents.status != 'inactive')
                          
                          
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
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO classcomponent (course_id, component_type, component_name, weightage, component_policy , created_by, updated_by) VALUES ({{classcomponent_courseId}}, {{classcomponent_componentType}}, {{classcomponent_componentName}}, {{classcomponent_weightage}}, {{classcomponent_componentPolicy}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE classcomponent SET course_id = {{classcomponent_courseId}}, component_type = {{classcomponent_componentType}}, component_name = {{classcomponent_componentName}}, weightage = {{classcomponent_weightage}}, component_policy = {{classcomponent_componentPolicy}}, created_by = {{classcomponent_createdBy}}, updated_by = {{classcomponent_updatedBy}} WHERE component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, component_id as classcomponent_id,component_id as id, classcomponent.course_id as classcomponent_courseId, classcomponent.component_type as classcomponent_componentType, classcomponent.component_name as classcomponent_componentName, classcomponent.weightage as classcomponent_weightage, classcomponent.component_policy as classcomponent_componentPolicy  FROM classcomponent WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, classcomponent.course_id as classcomponent_courseId, classcomponent.component_type as classcomponent_componentType, classcomponent.component_name as classcomponent_componentName, classcomponent.weightage as classcomponent_weightage, classcomponent.component_policy as classcomponent_componentPolicy, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (classcomponent.component_id = {{id}}  AND  classcomponent.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO courseleaderboardsubcomponents (course_leaderboard_id, sub_component_id, subcomponent_percentage , created_by, updated_by) VALUES ({{courseleaderboardsubcomponents_courseLeaderboardId}}, {{courseleaderboardsubcomponents_subComponentId}}, {{courseleaderboardsubcomponents_subcomponentPercentage}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE courseleaderboardsubcomponents SET course_leaderboard_id = {{courseleaderboardsubcomponents_courseLeaderboardId}}, sub_component_id = {{courseleaderboardsubcomponents_subComponentId}}, subcomponent_percentage = {{courseleaderboardsubcomponents_subcomponentPercentage}}, created_by = {{courseleaderboardsubcomponents_createdBy}}, updated_by = {{courseleaderboardsubcomponents_updatedBy}} WHERE course_leaderboard_subcomponent_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id,course_leaderboard_subcomponent_id as id, courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage  FROM courseleaderboardsubcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId, courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId, courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (courseleaderboardsubcomponents.course_leaderboard_subcomponent_id = {{id}}  AND  courseleaderboardsubcomponents.status != 'inactive')
                          
                          
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
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, lecturesattendance.enrollement_id as lecturesattendance_enrollementId, lecturesattendance.date as lecturesattendance_date, lecturesattendance.is_present as lecturesattendance_isPresent, lecturesattendance.sub_component_id as lecturesattendance_subComponentId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (lecturesattendance.attendance_id = {{id}}  AND  lecturesattendance.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturetopics (sub_component_id, topic_name, description, book_id , created_by, updated_by) VALUES ({{lecturetopics_subComponentId}}, {{lecturetopics_topicName}}, {{lecturetopics_description}}, {{lecturetopics_bookId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET sub_component_id = {{lecturetopics_subComponentId}}, topic_name = {{lecturetopics_topicName}}, description = {{lecturetopics_description}}, book_id = {{lecturetopics_bookId}}, created_by = {{lecturetopics_createdBy}}, updated_by = {{lecturetopics_updatedBy}} WHERE lectures_topic_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lectures_topic_id as lecturetopics_id,lectures_topic_id as id, lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId  FROM lecturetopics WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (lecturetopics.lectures_topic_id = {{id}}  AND  lecturetopics.status != 'inactive')
                          
                          
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
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, questions.config as questions_config, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO socket_activity_log (urdd_id, sub_component_id, activity_description, created_on , created_by, updated_by) VALUES ({{socketActivityLog_urddId}}, {{socketActivityLog_subComponentId}}, {{socketActivityLog_activityDescription}}, {{socketActivityLog_createdOn}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE socket_activity_log SET urdd_id = {{socketActivityLog_urddId}}, sub_component_id = {{socketActivityLog_subComponentId}}, activity_description = {{socketActivityLog_activityDescription}}, created_on = {{socketActivityLog_createdOn}} WHERE socket_activity_log_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, socket_activity_log_id as socketActivityLog_id,socket_activity_log_id as id, socket_activity_log.urdd_id as socketActivityLog_urddId, socket_activity_log.sub_component_id as socketActivityLog_subComponentId, socket_activity_log.activity_description as socketActivityLog_activityDescription, socket_activity_log.created_on as socketActivityLog_createdOn  FROM socket_activity_log WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, socket_activity_log.urdd_id as socketActivityLog_urddId, socket_activity_log.sub_component_id as socketActivityLog_subComponentId, socket_activity_log.activity_description as socketActivityLog_activityDescription, socket_activity_log.created_on as socketActivityLog_createdOn, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (socket_activity_log.socket_activity_log_id = {{id}}  AND  socket_activity_log.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE socket_activity_log SET status = 'inactive' WHERE socket_activity_log_id = {{id}}"}    

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
                        successMessage: "socket_activity_log Grouped CRUD Hit successfully!",
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
                            subcomponents.sub_component_id as subcomponents_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, classcomponent.component_id as classcomponent_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, lecturesattendance.attendance_id as lecturesattendance_id, lecturetopics.lectures_topic_id as lecturetopics_id, questions.question_id as questions_id, socket_activity_log.socket_activity_log_id as socketActivityLog_id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, courseleaderboards.course_leaderboard_id as courseleaderboards_id, enrollements.enrollement_id as enrollements_id,
                        user_roles_designations_department.user_role_designation_department_id as id,
                       subcomponents.sub_component_id as  subcomponents_subComponentId, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_name as  userRolesDesignationsDepartment_classcomponentName, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as  courseleaderboardsubcomponents_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as  lecturesattendance_attendanceId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questions.question_id as  questions_questionId, socket_activity_log.socket_activity_log_id as  socketActivityLog_socketActivityLogId, subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  userRolesDesignationsDepartment_usersName, designations.designation_name as  userRolesDesignationsDepartment_designationsName, roles.role_name as  userRolesDesignationsDepartment_rolesName, departments.department_name as  userRolesDesignationsDepartment_departmentsName, courseleaderboards.leaderboard_name as  userRolesDesignationsDepartment_courseleaderboardsName, enrollements.group_name as  userRolesDesignationsDepartment_enrollementsName,

                          subcomponents.sub_component_id as userRolesDesignationsDepartment_subComponentId, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId, classcomponent.component_id as userRolesDesignationsDepartment_componentId, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as userRolesDesignationsDepartment_courseLeaderboardSubcomponentId, lecturesattendance.attendance_id as userRolesDesignationsDepartment_attendanceId, lecturetopics.lectures_topic_id as userRolesDesignationsDepartment_lecturesTopicId, questions.question_id as userRolesDesignationsDepartment_questionId, socket_activity_log.socket_activity_log_id as userRolesDesignationsDepartment_socketActivityLogId, subcomponentmarks.sub_component_mark_id as userRolesDesignationsDepartment_subComponentMarkId, roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as userRolesDesignationsDepartment_userId, designations.designation_id as userRolesDesignationsDepartment_designationId, roles.role_id as userRolesDesignationsDepartment_roleId, departments.department_id as userRolesDesignationsDepartment_departmentId, courseleaderboards.course_leaderboard_id as userRolesDesignationsDepartment_courseLeaderboardId, enrollements.enrollement_id as userRolesDesignationsDepartment_enrollementId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  userRolesDesignationsDepartment_rolesDesignationsDepartmentName, subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks, 
                        user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate FROM subcomponents LEFT JOIN user_roles_designations_department ON user_roles_designations_department.user_role_designation_department_id = subcomponents.created_by AND user_roles_designations_department.status !='inactive' LEFT JOIN classcomponent ON classcomponent.component_id = subcomponents.component_id AND classcomponent.status !='inactive' LEFT JOIN courseleaderboardsubcomponents ON courseleaderboardsubcomponents.sub_component_id = subcomponents.sub_component_id AND courseleaderboardsubcomponents.status !='inactive' LEFT JOIN lecturesattendance ON lecturesattendance.sub_component_id = subcomponents.sub_component_id AND lecturesattendance.status !='inactive' LEFT JOIN lecturetopics ON lecturetopics.sub_component_id = subcomponents.sub_component_id AND lecturetopics.status !='inactive' LEFT JOIN questions ON (questions.sub_component_id = subcomponents.sub_component_id OR questions.lectures_topic_id = lecturetopics.lectures_topic_id) LEFT JOIN socket_activity_log ON (socket_activity_log.sub_component_id = subcomponents.sub_component_id OR socket_activity_log.urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN subcomponentmarks ON subcomponentmarks.sub_component_id = subcomponents.sub_component_id AND subcomponentmarks.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN courseleaderboards ON courseleaderboards.course_leaderboard_id = courseleaderboardsubcomponents.course_leaderboard_id AND courseleaderboards.status !='inactive' LEFT JOIN enrollements ON (enrollements.enrollement_id = lecturesattendance.enrollement_id OR enrollements.enrollement_id = subcomponentmarks.enrollment_id) WHERE (subcomponentmarks.sub_component_mark_id = {{id}}  AND  subcomponentmarks.status != 'inactive')
                          
                          
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
        module.exports = {GroupedCrudsSubcomponents_object}