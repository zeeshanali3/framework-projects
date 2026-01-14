const parameters = require('./CRUD_parameters');
        global.GroupedCrudsFeedbackquestions_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO feedbackquestions (question , created_by, updated_by) VALUES ({{feedbackquestions_question}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE feedbackquestions SET question = {{feedbackquestions_question}} WHERE questions_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions_id as feedbackquestions_id,questions_id as id, feedbackquestions.question as feedbackquestions_question  FROM feedbackquestions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            feedbackquestions.questions_id as feedbackquestions_id, feedbacks.feedback_id as feedbacks_id, enrollements.enrollement_id as enrollements_id,
                        feedbacks.feedback_id as id,
                       feedbackquestions.questions_id as  feedbackquestions_questionsId, feedbacks.feedback_id as  feedbacks_feedbackId, enrollements.group_name as  feedbacks_enrollementsName,

                          feedbackquestions.questions_id as feedbacks_questionsId, feedbacks.feedback_id as feedbacks_feedbackId, enrollements.enrollement_id as feedbacks_enrollementId,
                          
                       
                         
                           feedbackquestions.question as feedbackquestions_question, 
                        feedbacks.enrollement_id as feedbacks_enrollementId, feedbacks.feedback_question_id as feedbacks_feedbackQuestionId, feedbacks.feedback_text as feedbacks_feedbackText FROM feedbackquestions LEFT JOIN feedbacks ON feedbacks.feedback_question_id = feedbackquestions.questions_id AND feedbacks.status !='inactive' LEFT JOIN enrollements ON enrollements.enrollement_id = feedbacks.enrollement_id AND enrollements.status !='inactive' WHERE (feedbackquestions.questions_id = {{id}}  AND  feedbackquestions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE feedbackquestions SET status = 'inactive' WHERE questions_id = {{id}}"}    

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
                        successMessage: "feedbackquestions Grouped CRUD Hit successfully!",
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
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE feedbacks SET enrollement_id = {{feedbacks_enrollementId}}, feedback_question_id = {{feedbacks_feedbackQuestionId}}, feedback_text = {{feedbacks_feedbackText}} WHERE feedback_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, feedback_id as feedbacks_id,feedback_id as id, feedbacks.enrollement_id as feedbacks_enrollementId, feedbacks.feedback_question_id as feedbacks_feedbackQuestionId, feedbacks.feedback_text as feedbacks_feedbackText  FROM feedbacks WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            feedbackquestions.questions_id as feedbackquestions_id, feedbacks.feedback_id as feedbacks_id, enrollements.enrollement_id as enrollements_id,
                        feedbacks.feedback_id as id,
                       feedbackquestions.questions_id as  feedbackquestions_questionsId, feedbacks.feedback_id as  feedbacks_feedbackId, enrollements.group_name as  feedbacks_enrollementsName,

                          feedbackquestions.questions_id as feedbacks_questionsId, feedbacks.feedback_id as feedbacks_feedbackId, enrollements.enrollement_id as feedbacks_enrollementId,
                          
                       
                         
                           feedbacks.enrollement_id as feedbacks_enrollementId, feedbacks.feedback_question_id as feedbacks_feedbackQuestionId, feedbacks.feedback_text as feedbacks_feedbackText, 
                        feedbacks.enrollement_id as feedbacks_enrollementId, feedbacks.feedback_question_id as feedbacks_feedbackQuestionId, feedbacks.feedback_text as feedbacks_feedbackText FROM feedbackquestions LEFT JOIN feedbacks ON feedbacks.feedback_question_id = feedbackquestions.questions_id AND feedbacks.status !='inactive' LEFT JOIN enrollements ON enrollements.enrollement_id = feedbacks.enrollement_id AND enrollements.status !='inactive' WHERE (feedbacks.feedback_id = {{id}}  AND  feedbacks.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsFeedbackquestions_object}