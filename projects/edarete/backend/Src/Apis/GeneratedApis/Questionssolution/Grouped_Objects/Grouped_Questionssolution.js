const parameters = require('./CRUD_parameters');
        global.GroupedCrudsQuestionssolution_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questionssolution (question_id, attachment_id , created_by, updated_by) VALUES ({{questionssolution_questionId}}, {{questionssolution_attachmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questionssolution SET question_id = {{questionssolution_questionId}}, attachment_id = {{questionssolution_attachmentId}} WHERE questions_help_guide_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions_help_guide_id as questionssolution_id,questions_help_guide_id as id, questionssolution.question_id as questionssolution_questionId, questionssolution.attachment_id as questionssolution_attachmentId  FROM questionssolution WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questionssolution.questions_help_guide_id as questionssolution_id, questions.question_id as questions_id,
                        questions.question_id as id,
                       questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId, questions.question_id as  questions_questionId,

                          questionssolution.questions_help_guide_id as questions_questionsHelpGuideId, questions.question_id as questions_questionId,
                          
                       
                         
                          null questionssolution.question_id as questionssolution_questionId, questionssolution.attachment_id as questionssolution_attachmentId, 
                        questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId FROM questionssolution LEFT JOIN questions ON questions.question_id = questionssolution.question_id AND questions.status !='inactive' WHERE (questionssolution.questions_help_guide_id = {{id}}  AND  questionssolution.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questions (cloid, sub_component_id, question_num, description, question_marks, lectures_topic_id , created_by, updated_by) VALUES ({{questions_cloid}}, {{questions_subComponentId}}, {{questions_questionNum}}, {{questions_description}}, {{questions_questionMarks}}, {{questions_lecturesTopicId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questions SET cloid = {{questions_cloid}}, sub_component_id = {{questions_subComponentId}}, question_num = {{questions_questionNum}}, description = {{questions_description}}, question_marks = {{questions_questionMarks}}, lectures_topic_id = {{questions_lecturesTopicId}} WHERE question_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_id as questions_id,question_id as id, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId  FROM questions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questionssolution.questions_help_guide_id as questionssolution_id, questions.question_id as questions_id,
                        questions.question_id as id,
                       questionssolution.questions_help_guide_id as  questionssolution_questionsHelpGuideId, questions.question_id as  questions_questionId,

                          questionssolution.questions_help_guide_id as questions_questionsHelpGuideId, questions.question_id as questions_questionId,
                          
                       
                         
                          null questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, 
                        questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId FROM questionssolution LEFT JOIN questions ON questions.question_id = questionssolution.question_id AND questions.status !='inactive' WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsQuestionssolution_object}