const parameters = require('./CRUD_parameters');
        global.GroupedCrudsQuiz_blocked_users_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO quiz_blocked_users (urdd_id, sub_component_id, question_id, reason , created_by, updated_by) VALUES ({{quizBlockedUsers_urddId}}, {{quizBlockedUsers_subComponentId}}, {{quizBlockedUsers_questionId}}, {{quizBlockedUsers_reason}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE quiz_blocked_users SET urdd_id = {{quizBlockedUsers_urddId}}, sub_component_id = {{quizBlockedUsers_subComponentId}}, question_id = {{quizBlockedUsers_questionId}}, reason = {{quizBlockedUsers_reason}} WHERE quiz_blocked_users_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, quiz_blocked_users_id as quizBlockedUsers_id,quiz_blocked_users_id as id, quiz_blocked_users.urdd_id as quizBlockedUsers_urddId, quiz_blocked_users.sub_component_id as quizBlockedUsers_subComponentId, quiz_blocked_users.question_id as quizBlockedUsers_questionId, quiz_blocked_users.reason as quizBlockedUsers_reason  FROM quiz_blocked_users WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            quiz_blocked_users.quiz_blocked_users_id as quizBlockedUsers_id,
                        undefined.undefined as id,
                       quiz_blocked_users.quiz_blocked_users_id as  quizBlockedUsers_quizBlockedUsersId,

                          quiz_blocked_users.quiz_blocked_users_id as undefined_quizBlockedUsersId,
                          
                       
                         
                          null quiz_blocked_users.urdd_id as quizBlockedUsers_urddId, quiz_blocked_users.sub_component_id as quizBlockedUsers_subComponentId, quiz_blocked_users.question_id as quizBlockedUsers_questionId, quiz_blocked_users.reason as quizBlockedUsers_reason, 
                        undefined FROM quiz_blocked_users  WHERE (quiz_blocked_users.quiz_blocked_users_id = {{id}}  AND  quiz_blocked_users.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE quiz_blocked_users SET status = 'inactive' WHERE quiz_blocked_users_id = {{id}}"}    

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
                        successMessage: "quiz_blocked_users Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsQuiz_blocked_users_object}