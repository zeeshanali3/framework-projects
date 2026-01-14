/* CRUD Objects for table: feedbackquestions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudFeedbackquestions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO feedbackquestions (question, created_by, updated_by) VALUES ({{feedbackquestions_question}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE feedbackquestions SET question = {{feedbackquestions_question}} WHERE questions_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, feedbackquestions.questions_id as feedbackquestions_id, feedbackquestions.questions_id as id, feedbackquestions.questions_id as feedbackquestions_questionsId,feedbackquestions.question as feedbackquestions_question,feedbackquestions.status as feedbackquestions_status,feedbackquestions.created_by as feedbackquestions_createdBy,feedbackquestions.updated_by as feedbackquestions_updatedBy,feedbackquestions.created_at as feedbackquestions_createdAt,feedbackquestions.updated_at as feedbackquestions_updatedAt FROM feedbackquestions  Where feedbackquestions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT feedbackquestions.questions_id as feedbackquestions_id, feedbackquestions.questions_id as id, feedbackquestions.questions_id as feedbackquestions_questionsId,feedbackquestions.question as feedbackquestions_question,feedbackquestions.status as feedbackquestions_status,feedbackquestions.created_by as feedbackquestions_createdBy,feedbackquestions.updated_by as feedbackquestions_updatedBy,feedbackquestions.created_at as feedbackquestions_createdAt,feedbackquestions.updated_at as feedbackquestions_updatedAt FROM feedbackquestions  WHERE questions_id = {{id}} OR questions_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE feedbackquestions SET status = 'inactive' WHERE questions_id = {{id}}"},           
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
                        permission: { Add: "add_feedbackquestions", View: "view_feedbackquestions", Update: "update_feedbackquestions", Delete: "delete_feedbackquestions", List: "list_feedbackquestions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Feedbackquestions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Feedbackquestions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudFeedbackquestions_object}