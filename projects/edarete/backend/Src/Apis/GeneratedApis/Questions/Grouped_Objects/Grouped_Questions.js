const parameters = require('./CRUD_parameters');
        global.GroupedCrudsQuestions_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questions (cloid, sub_component_id, question_num, description, question_marks, lectures_topic_id , created_by, updated_by) VALUES ({{questions_cloid}}, {{questions_subComponentId}}, {{questions_questionNum}}, {{questions_description}}, {{questions_questionMarks}}, {{questions_lecturesTopicId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questions SET cloid = {{questions_cloid}}, sub_component_id = {{questions_subComponentId}}, question_num = {{questions_questionNum}}, description = {{questions_description}}, question_marks = {{questions_questionMarks}}, lectures_topic_id = {{questions_lecturesTopicId}} WHERE question_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_id as questions_id,question_id as id, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId  FROM questions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions.question_id as questions_id, clo.cloid as clo_id, subcomponents.sub_component_id as subcomponents_id, lecturetopics.lectures_topic_id as lecturetopics_id, questionssolution.questions_help_guide_id as questionssolution_id,
                        clo.cloid as id,
                       questions.question_id as  questions_questionId, clo.cloid as  clo_cloid, subcomponents.sub_component_id as  subcomponents_subComponentId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId,

                          questions.question_id as clo_questionId, clo.cloid as clo_cloid, subcomponents.sub_component_id as clo_subComponentId, lecturetopics.lectures_topic_id as clo_lecturesTopicId, questionssolution.questions_help_guide_id as clo_questionsHelpGuideId,
                          
                       
                         
                          null questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, 
                        clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description FROM questions LEFT JOIN clo ON clo.cloid = questions.cloid AND clo.status !='inactive' LEFT JOIN subcomponents ON subcomponents.sub_component_id = questions.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN lecturetopics ON (lecturetopics.lectures_topic_id = questions.lectures_topic_id OR lecturetopics.sub_component_id = subcomponents.sub_component_id) LEFT JOIN questionssolution ON questionssolution.question_id = questions.question_id AND questionssolution.status !='inactive' WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO clo (clonum, clodomain_name, description , created_by, updated_by) VALUES ({{clo_clonum}}, {{clo_clodomainName}}, {{clo_description}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE clo SET clonum = {{clo_clonum}}, clodomain_name = {{clo_clodomainName}}, description = {{clo_description}} WHERE cloid = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, cloid as clo_id,cloid as id, clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description  FROM clo WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions.question_id as questions_id, clo.cloid as clo_id, subcomponents.sub_component_id as subcomponents_id, lecturetopics.lectures_topic_id as lecturetopics_id, questionssolution.questions_help_guide_id as questionssolution_id,
                        clo.cloid as id,
                       questions.question_id as  questions_questionId, clo.cloid as  clo_cloid, subcomponents.sub_component_id as  subcomponents_subComponentId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId,

                          questions.question_id as clo_questionId, clo.cloid as clo_cloid, subcomponents.sub_component_id as clo_subComponentId, lecturetopics.lectures_topic_id as clo_lecturesTopicId, questionssolution.questions_help_guide_id as clo_questionsHelpGuideId,
                          
                       
                         
                          null clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description, 
                        clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description FROM questions LEFT JOIN clo ON clo.cloid = questions.cloid AND clo.status !='inactive' LEFT JOIN subcomponents ON subcomponents.sub_component_id = questions.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN lecturetopics ON (lecturetopics.lectures_topic_id = questions.lectures_topic_id OR lecturetopics.sub_component_id = subcomponents.sub_component_id) LEFT JOIN questionssolution ON questionssolution.question_id = questions.question_id AND questionssolution.status !='inactive' WHERE (clo.cloid = {{id}}  AND  clo.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, user_role_id, date, start_time, end_time, total_marks, weightage, is_public , created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_userRoleId}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, user_role_id = {{subcomponents_userRoleId}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}} WHERE sub_component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_id as subcomponents_id,sub_component_id as id, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic  FROM subcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions.question_id as questions_id, clo.cloid as clo_id, subcomponents.sub_component_id as subcomponents_id, lecturetopics.lectures_topic_id as lecturetopics_id, questionssolution.questions_help_guide_id as questionssolution_id,
                        clo.cloid as id,
                       questions.question_id as  questions_questionId, clo.cloid as  clo_cloid, subcomponents.sub_component_id as  subcomponents_subComponentId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId,

                          questions.question_id as clo_questionId, clo.cloid as clo_cloid, subcomponents.sub_component_id as clo_subComponentId, lecturetopics.lectures_topic_id as clo_lecturesTopicId, questionssolution.questions_help_guide_id as clo_questionsHelpGuideId,
                          
                       
                         
                          null subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, 
                        clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description FROM questions LEFT JOIN clo ON clo.cloid = questions.cloid AND clo.status !='inactive' LEFT JOIN subcomponents ON subcomponents.sub_component_id = questions.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN lecturetopics ON (lecturetopics.lectures_topic_id = questions.lectures_topic_id OR lecturetopics.sub_component_id = subcomponents.sub_component_id) LEFT JOIN questionssolution ON questionssolution.question_id = questions.question_id AND questionssolution.status !='inactive' WHERE (subcomponents.sub_component_id = {{id}}  AND  subcomponents.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturetopics (sub_component_id, topic_name, description, book_id , created_by, updated_by) VALUES ({{lecturetopics_subComponentId}}, {{lecturetopics_topicName}}, {{lecturetopics_description}}, {{lecturetopics_bookId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET sub_component_id = {{lecturetopics_subComponentId}}, topic_name = {{lecturetopics_topicName}}, description = {{lecturetopics_description}}, book_id = {{lecturetopics_bookId}} WHERE lectures_topic_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lectures_topic_id as lecturetopics_id,lectures_topic_id as id, lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId  FROM lecturetopics WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions.question_id as questions_id, clo.cloid as clo_id, subcomponents.sub_component_id as subcomponents_id, lecturetopics.lectures_topic_id as lecturetopics_id, questionssolution.questions_help_guide_id as questionssolution_id,
                        clo.cloid as id,
                       questions.question_id as  questions_questionId, clo.cloid as  clo_cloid, subcomponents.sub_component_id as  subcomponents_subComponentId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId,

                          questions.question_id as clo_questionId, clo.cloid as clo_cloid, subcomponents.sub_component_id as clo_subComponentId, lecturetopics.lectures_topic_id as clo_lecturesTopicId, questionssolution.questions_help_guide_id as clo_questionsHelpGuideId,
                          
                       
                         
                          null lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId, 
                        clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description FROM questions LEFT JOIN clo ON clo.cloid = questions.cloid AND clo.status !='inactive' LEFT JOIN subcomponents ON subcomponents.sub_component_id = questions.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN lecturetopics ON (lecturetopics.lectures_topic_id = questions.lectures_topic_id OR lecturetopics.sub_component_id = subcomponents.sub_component_id) LEFT JOIN questionssolution ON questionssolution.question_id = questions.question_id AND questionssolution.status !='inactive' WHERE (lecturetopics.lectures_topic_id = {{id}}  AND  lecturetopics.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questionssolution (question_id, attachment_id , created_by, updated_by) VALUES ({{questionssolution_questionId}}, {{questionssolution_attachmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questionssolution SET question_id = {{questionssolution_questionId}}, attachment_id = {{questionssolution_attachmentId}} WHERE questions_help_guide_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions_help_guide_id as questionssolution_id,questions_help_guide_id as id, questionssolution.question_id as questionssolution_questionId, questionssolution.attachment_id as questionssolution_attachmentId  FROM questionssolution WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions.question_id as questions_id, clo.cloid as clo_id, subcomponents.sub_component_id as subcomponents_id, lecturetopics.lectures_topic_id as lecturetopics_id, questionssolution.questions_help_guide_id as questionssolution_id,
                        clo.cloid as id,
                       questions.question_id as  questions_questionId, clo.cloid as  clo_cloid, subcomponents.sub_component_id as  subcomponents_subComponentId, lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId,

                          questions.question_id as clo_questionId, clo.cloid as clo_cloid, subcomponents.sub_component_id as clo_subComponentId, lecturetopics.lectures_topic_id as clo_lecturesTopicId, questionssolution.questions_help_guide_id as clo_questionsHelpGuideId,
                          
                       
                         
                          null questionssolution.question_id as questionssolution_questionId, questionssolution.attachment_id as questionssolution_attachmentId, 
                        clo.clonum as clo_clonum, clo.clodomain_name as clo_clodomainName, clo.description as clo_description FROM questions LEFT JOIN clo ON clo.cloid = questions.cloid AND clo.status !='inactive' LEFT JOIN subcomponents ON subcomponents.sub_component_id = questions.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN lecturetopics ON (lecturetopics.lectures_topic_id = questions.lectures_topic_id OR lecturetopics.sub_component_id = subcomponents.sub_component_id) LEFT JOIN questionssolution ON questionssolution.question_id = questions.question_id AND questionssolution.status !='inactive' WHERE (questionssolution.questions_help_guide_id = {{id}}  AND  questionssolution.status != 'inactive')
                          
                          
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
        module.exports = {GroupedCrudsQuestions_object}