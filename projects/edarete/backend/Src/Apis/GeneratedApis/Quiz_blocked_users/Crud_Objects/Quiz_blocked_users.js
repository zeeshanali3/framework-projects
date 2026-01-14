/* CRUD Objects for table: quiz_blocked_users */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuiz_blocked_users_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
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
                              accessToken: true
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
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO quiz_blocked_users (urdd_id, sub_component_id, question_id, reason, created_by, updated_by) VALUES ({{quizBlockedUsers_urddId}}, {{quizBlockedUsers_subComponentId}}, {{quizBlockedUsers_questionId}}, {{quizBlockedUsers_reason}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE quiz_blocked_users SET urdd_id = {{quizBlockedUsers_urddId}}, sub_component_id = {{quizBlockedUsers_subComponentId}}, question_id = {{quizBlockedUsers_questionId}}, reason = {{quizBlockedUsers_reason}} WHERE quiz_blocked_users_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, quiz_blocked_users.quiz_blocked_users_id as quizBlockedUsers_id, quiz_blocked_users.quiz_blocked_users_id as id, quiz_blocked_users.quiz_blocked_users_id as quizBlockedUsers_quizBlockedUsersId,quiz_blocked_users.urdd_id as quizBlockedUsers_urddId,quiz_blocked_users.sub_component_id as quizBlockedUsers_subComponentId,quiz_blocked_users.question_id as quizBlockedUsers_questionId,quiz_blocked_users.reason as quizBlockedUsers_reason FROM quiz_blocked_users  Where quiz_blocked_users.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT quiz_blocked_users.quiz_blocked_users_id as quizBlockedUsers_id, quiz_blocked_users.quiz_blocked_users_id as id, quiz_blocked_users.quiz_blocked_users_id as quizBlockedUsers_quizBlockedUsersId,quiz_blocked_users.urdd_id as quizBlockedUsers_urddId,quiz_blocked_users.sub_component_id as quizBlockedUsers_subComponentId,quiz_blocked_users.question_id as quizBlockedUsers_questionId,quiz_blocked_users.reason as quizBlockedUsers_reason FROM quiz_blocked_users  WHERE quiz_blocked_users_id = {{id}} OR quiz_blocked_users_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE quiz_blocked_users SET status = 'inactive' WHERE quiz_blocked_users_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_quiz_blocked_users", View: "view_quiz_blocked_users", Update: "update_quiz_blocked_users", Delete: "delete_quiz_blocked_users", List: "list_quiz_blocked_users" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Quiz_blocked_users CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Quiz_blocked_users.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuiz_blocked_users_object}