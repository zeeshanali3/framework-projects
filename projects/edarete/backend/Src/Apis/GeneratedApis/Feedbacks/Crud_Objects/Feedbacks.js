/* CRUD Objects for table: feedbacks */
      
      const parameters = require('./CRUD_parameters');
      global.CrudFeedbacks_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO feedbacks (enrollement_id, feedback_question_id, feedback_text, created_by, updated_by) VALUES ({{feedbacks_enrollementId}}, {{feedbacks_feedbackQuestionId}}, {{feedbacks_feedbackText}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE feedbacks SET enrollement_id = {{feedbacks_enrollementId}}, feedback_question_id = {{feedbacks_feedbackQuestionId}}, feedback_text = {{feedbacks_feedbackText}} WHERE feedback_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, feedbacks.feedback_id as feedbacks_id, feedbacks.feedback_id as id, feedbacks.feedback_id as feedbacks_feedbackId,feedbacks.enrollement_id as feedbacks_enrollementId,feedbacks.feedback_question_id as feedbacks_feedbackQuestionId,feedbacks.feedback_text as feedbacks_feedbackText,feedbacks.status as feedbacks_status,feedbacks.created_by as feedbacks_createdBy,feedbacks.updated_by as feedbacks_updatedBy,feedbacks.created_at as feedbacks_createdAt,feedbacks.updated_at as feedbacks_updatedAt, enrollements.group_name as enrollements_groupName FROM feedbacks LEFT JOIN enrollements ON feedbacks.enrollement_id = enrollements.enrollement_id Where feedbacks.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT feedbacks.feedback_id as feedbacks_id, feedbacks.feedback_id as id, feedbacks.feedback_id as feedbacks_feedbackId,feedbacks.enrollement_id as feedbacks_enrollementId,feedbacks.feedback_question_id as feedbacks_feedbackQuestionId,feedbacks.feedback_text as feedbacks_feedbackText,feedbacks.status as feedbacks_status,feedbacks.created_by as feedbacks_createdBy,feedbacks.updated_by as feedbacks_updatedBy,feedbacks.created_at as feedbacks_createdAt,feedbacks.updated_at as feedbacks_updatedAt, enrollements.group_name as enrollements_groupName FROM feedbacks LEFT JOIN enrollements ON feedbacks.enrollement_id = enrollements.enrollement_id WHERE feedback_id = {{id}} OR feedback_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE feedbacks SET status = 'inactive' WHERE feedback_id = {{id}}"},           
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
                        permission: { Add: "add_feedbacks", View: "view_feedbacks", Update: "update_feedbacks", Delete: "delete_feedbacks", List: "list_feedbacks" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Feedbacks CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Feedbacks.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudFeedbacks_object}