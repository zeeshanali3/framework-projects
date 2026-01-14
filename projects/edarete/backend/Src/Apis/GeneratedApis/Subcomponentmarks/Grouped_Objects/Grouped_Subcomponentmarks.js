const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSubcomponentmarks_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponentmarks (sub_component_id, enrollment_id, obtained_marks, out_of_marks , created_by, updated_by) VALUES ({{subcomponentmarks_subComponentId}}, {{subcomponentmarks_enrollmentId}}, {{subcomponentmarks_obtainedMarks}}, {{subcomponentmarks_outOfMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponentmarks SET sub_component_id = {{subcomponentmarks_subComponentId}}, enrollment_id = {{subcomponentmarks_enrollmentId}}, obtained_marks = {{subcomponentmarks_obtainedMarks}}, out_of_marks = {{subcomponentmarks_outOfMarks}} WHERE sub_component_mark_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_mark_id as subcomponentmarks_id,sub_component_mark_id as id, subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks  FROM subcomponentmarks WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, subcomponents.sub_component_id as subcomponents_id, enrollements.enrollement_id as enrollements_id,
                        subcomponents.sub_component_id as id,
                       subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, subcomponents.sub_component_id as  subcomponents_subComponentId, enrollements.group_name as  subcomponents_enrollementsName,

                          subcomponentmarks.sub_component_mark_id as subcomponents_subComponentMarkId, subcomponents.sub_component_id as subcomponents_subComponentId, enrollements.enrollement_id as subcomponents_enrollementId,
                          
                       
                         
                           subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId, subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId, subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks, subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM subcomponentmarks LEFT JOIN subcomponents ON subcomponents.sub_component_id = subcomponentmarks.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN enrollements ON enrollements.enrollement_id = subcomponentmarks.enrollment_id AND enrollements.status !='inactive' WHERE (subcomponentmarks.sub_component_mark_id = {{id}}  AND  subcomponentmarks.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, user_role_id, date, start_time, end_time, total_marks, weightage, is_public , created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_userRoleId}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, user_role_id = {{subcomponents_userRoleId}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}} WHERE sub_component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_id as subcomponents_id,sub_component_id as id, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic  FROM subcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, subcomponents.sub_component_id as subcomponents_id, enrollements.enrollement_id as enrollements_id,
                        subcomponents.sub_component_id as id,
                       subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, subcomponents.sub_component_id as  subcomponents_subComponentId, enrollements.group_name as  subcomponents_enrollementsName,

                          subcomponentmarks.sub_component_mark_id as subcomponents_subComponentMarkId, subcomponents.sub_component_id as subcomponents_subComponentId, enrollements.enrollement_id as subcomponents_enrollementId,
                          
                       
                         
                           subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM subcomponentmarks LEFT JOIN subcomponents ON subcomponents.sub_component_id = subcomponentmarks.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN enrollements ON enrollements.enrollement_id = subcomponentmarks.enrollment_id AND enrollements.status !='inactive' WHERE (subcomponents.sub_component_id = {{id}}  AND  subcomponents.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO enrollements (student_semester_id, grade, group_name, enrolled_date, course_id , created_by, updated_by) VALUES ({{enrollements_studentSemesterId}}, {{enrollements_grade}}, {{enrollements_groupName}}, {{enrollements_enrolledDate}}, {{enrollements_courseId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE enrollements SET student_semester_id = {{enrollements_studentSemesterId}}, grade = {{enrollements_grade}}, group_name = {{enrollements_groupName}}, enrolled_date = {{enrollements_enrolledDate}}, course_id = {{enrollements_courseId}} WHERE enrollement_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, enrollement_id as enrollements_id,enrollement_id as id, enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId  FROM enrollements WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, subcomponents.sub_component_id as subcomponents_id, enrollements.enrollement_id as enrollements_id,
                        subcomponents.sub_component_id as id,
                       subcomponentmarks.sub_component_mark_id as  subcomponentmarks_subComponentMarkId, subcomponents.sub_component_id as  subcomponents_subComponentId, enrollements.group_name as  subcomponents_enrollementsName,

                          subcomponentmarks.sub_component_mark_id as subcomponents_subComponentMarkId, subcomponents.sub_component_id as subcomponents_subComponentId, enrollements.enrollement_id as subcomponents_enrollementId,
                          
                       
                         
                           enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM subcomponentmarks LEFT JOIN subcomponents ON subcomponents.sub_component_id = subcomponentmarks.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN enrollements ON enrollements.enrollement_id = subcomponentmarks.enrollment_id AND enrollements.status !='inactive' WHERE (enrollements.enrollement_id = {{id}}  AND  enrollements.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsSubcomponentmarks_object}