const parameters = require('./CRUD_parameters');
        global.GroupedCrudsQuestions_solution_options_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO questions_solution_options (question_id, description, option_number, correct_option , created_by, updated_by) VALUES ({{questionsSolutionOptions_questionId}}, {{questionsSolutionOptions_description}}, {{questionsSolutionOptions_optionNumber}}, {{questionsSolutionOptions_correctOption}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questions_solution_options SET question_id = {{questionsSolutionOptions_questionId}}, description = {{questionsSolutionOptions_description}}, option_number = {{questionsSolutionOptions_optionNumber}}, correct_option = {{questionsSolutionOptions_correctOption}} WHERE questions_solution_options_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions_solution_options_id as questionsSolutionOptions_id,questions_solution_options_id as id, questions_solution_options.question_id as questionsSolutionOptions_questionId, questions_solution_options.description as questionsSolutionOptions_description, questions_solution_options.option_number as questionsSolutionOptions_optionNumber, questions_solution_options.correct_option as questionsSolutionOptions_correctOption  FROM questions_solution_options WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions_solution_options.questions_solution_options_id as questionsSolutionOptions_id, questions.question_id as questions_id, question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_id,
                        questions.question_id as id,
                       questions_solution_options.questions_solution_options_id as  questionsSolutionOptions_questionsSolutionOptionsId, questions.question_id as  questions_questionId, question_answers_submitted.question_answers_submitted_id as  questionAnswersSubmitted_questionAnswersSubmittedId,

                          questions_solution_options.questions_solution_options_id as questions_questionsSolutionOptionsId, questions.question_id as questions_questionId, question_answers_submitted.question_answers_submitted_id as questions_questionAnswersSubmittedId,
                          
                       
                         
                          null questions_solution_options.question_id as questionsSolutionOptions_questionId, questions_solution_options.description as questionsSolutionOptions_description, questions_solution_options.option_number as questionsSolutionOptions_optionNumber, questions_solution_options.correct_option as questionsSolutionOptions_correctOption, 
                        questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId FROM questions_solution_options LEFT JOIN questions ON questions.question_id = questions_solution_options.question_id AND questions.status !='inactive' LEFT JOIN question_answers_submitted ON (question_answers_submitted.questions_solution_options_id = questions_solution_options.questions_solution_options_id OR question_answers_submitted.question_id = questions.question_id) WHERE (questions_solution_options.questions_solution_options_id = {{id}}  AND  questions_solution_options.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE questions_solution_options SET status = 'inactive' WHERE questions_solution_options_id = {{id}}"}    

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
                        successMessage: "questions_solution_options Grouped CRUD Hit successfully!",
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
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE questions SET cloid = {{questions_cloid}}, sub_component_id = {{questions_subComponentId}}, question_num = {{questions_questionNum}}, description = {{questions_description}}, question_marks = {{questions_questionMarks}}, lectures_topic_id = {{questions_lecturesTopicId}}, created_by = {{questions_createdBy}}, updated_by = {{questions_updatedBy}} WHERE question_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_id as questions_id,question_id as id, questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId  FROM questions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions_solution_options.questions_solution_options_id as questionsSolutionOptions_id, questions.question_id as questions_id, question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_id,
                        questions.question_id as id,
                       questions_solution_options.questions_solution_options_id as  questionsSolutionOptions_questionsSolutionOptionsId, questions.question_id as  questions_questionId, question_answers_submitted.question_answers_submitted_id as  questionAnswersSubmitted_questionAnswersSubmittedId,

                          questions_solution_options.questions_solution_options_id as questions_questionsSolutionOptionsId, questions.question_id as questions_questionId, question_answers_submitted.question_answers_submitted_id as questions_questionAnswersSubmittedId,
                          
                       
                         
                          null questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, 
                        questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId FROM questions_solution_options LEFT JOIN questions ON questions.question_id = questions_solution_options.question_id AND questions.status !='inactive' LEFT JOIN question_answers_submitted ON (question_answers_submitted.questions_solution_options_id = questions_solution_options.questions_solution_options_id OR question_answers_submitted.question_id = questions.question_id) WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO question_answers_submitted (urdd, question_id, questions_solution_options_id, description, marks_obtained , created_by, updated_by) VALUES ({{questionAnswersSubmitted_urdd}}, {{questionAnswersSubmitted_questionId}}, {{questionAnswersSubmitted_questionsSolutionOptionsId}}, {{questionAnswersSubmitted_description}}, {{questionAnswersSubmitted_marksObtained}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE question_answers_submitted SET urdd = {{questionAnswersSubmitted_urdd}}, question_id = {{questionAnswersSubmitted_questionId}}, questions_solution_options_id = {{questionAnswersSubmitted_questionsSolutionOptionsId}}, description = {{questionAnswersSubmitted_description}}, marks_obtained = {{questionAnswersSubmitted_marksObtained}} WHERE question_answers_submitted_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, question_answers_submitted_id as questionAnswersSubmitted_id,question_answers_submitted_id as id, question_answers_submitted.urdd as questionAnswersSubmitted_urdd, question_answers_submitted.question_id as questionAnswersSubmitted_questionId, question_answers_submitted.questions_solution_options_id as questionAnswersSubmitted_questionsSolutionOptionsId, question_answers_submitted.description as questionAnswersSubmitted_description, question_answers_submitted.marks_obtained as questionAnswersSubmitted_marksObtained  FROM question_answers_submitted WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            questions_solution_options.questions_solution_options_id as questionsSolutionOptions_id, questions.question_id as questions_id, question_answers_submitted.question_answers_submitted_id as questionAnswersSubmitted_id,
                        questions.question_id as id,
                       questions_solution_options.questions_solution_options_id as  questionsSolutionOptions_questionsSolutionOptionsId, questions.question_id as  questions_questionId, question_answers_submitted.question_answers_submitted_id as  questionAnswersSubmitted_questionAnswersSubmittedId,

                          questions_solution_options.questions_solution_options_id as questions_questionsSolutionOptionsId, questions.question_id as questions_questionId, question_answers_submitted.question_answers_submitted_id as questions_questionAnswersSubmittedId,
                          
                       
                         
                          null question_answers_submitted.urdd as questionAnswersSubmitted_urdd, question_answers_submitted.question_id as questionAnswersSubmitted_questionId, question_answers_submitted.questions_solution_options_id as questionAnswersSubmitted_questionsSolutionOptionsId, question_answers_submitted.description as questionAnswersSubmitted_description, question_answers_submitted.marks_obtained as questionAnswersSubmitted_marksObtained, 
                        questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId FROM questions_solution_options LEFT JOIN questions ON questions.question_id = questions_solution_options.question_id AND questions.status !='inactive' LEFT JOIN question_answers_submitted ON (question_answers_submitted.questions_solution_options_id = questions_solution_options.questions_solution_options_id OR question_answers_submitted.question_id = questions.question_id) WHERE (question_answers_submitted.question_answers_submitted_id = {{id}}  AND  question_answers_submitted.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE question_answers_submitted SET status = 'inactive' WHERE question_answers_submitted_id = {{id}}"}    

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
                        successMessage: "question_answers_submitted Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsQuestions_solution_options_object}