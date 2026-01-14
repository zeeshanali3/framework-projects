/* CRUD Objects for table: topicquestions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudTopicquestions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO topicquestions (lecture_topic_id, question_type, question, is_done, created_at_date, created_at_time, updated_at_date, updated_at_time, created_by, updated_by) VALUES ({{topicquestions_lectureTopicId}}, {{topicquestions_questionType}}, {{topicquestions_question}}, {{topicquestions_isDone}}, {{topicquestions_createdAtDate}}, {{topicquestions_createdAtTime}}, {{topicquestions_updatedAtDate}}, {{topicquestions_updatedAtTime}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE topicquestions SET lecture_topic_id = {{topicquestions_lectureTopicId}}, question_type = {{topicquestions_questionType}}, question = {{topicquestions_question}}, is_done = {{topicquestions_isDone}}, created_at_date = {{topicquestions_createdAtDate}}, created_at_time = {{topicquestions_createdAtTime}}, updated_at_date = {{topicquestions_updatedAtDate}}, updated_at_time = {{topicquestions_updatedAtTime}} WHERE topic_question_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, topicquestions.topic_question_id as topicquestions_id, topicquestions.topic_question_id as id, topicquestions.topic_question_id as topicquestions_topicQuestionId,topicquestions.lecture_topic_id as topicquestions_lectureTopicId,topicquestions.question_type as topicquestions_questionType,topicquestions.question as topicquestions_question,topicquestions.is_done as topicquestions_isDone,topicquestions.created_at_date as topicquestions_createdAtDate,topicquestions.created_at_time as topicquestions_createdAtTime,topicquestions.updated_at_date as topicquestions_updatedAtDate,topicquestions.updated_at_time as topicquestions_updatedAtTime,topicquestions.status as topicquestions_status,topicquestions.created_by as topicquestions_createdBy,topicquestions.updated_by as topicquestions_updatedBy,topicquestions.created_at as topicquestions_createdAt,topicquestions.updated_at as topicquestions_updatedAt FROM topicquestions  Where topicquestions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT topicquestions.topic_question_id as topicquestions_id, topicquestions.topic_question_id as id, topicquestions.topic_question_id as topicquestions_topicQuestionId,topicquestions.lecture_topic_id as topicquestions_lectureTopicId,topicquestions.question_type as topicquestions_questionType,topicquestions.question as topicquestions_question,topicquestions.is_done as topicquestions_isDone,topicquestions.created_at_date as topicquestions_createdAtDate,topicquestions.created_at_time as topicquestions_createdAtTime,topicquestions.updated_at_date as topicquestions_updatedAtDate,topicquestions.updated_at_time as topicquestions_updatedAtTime,topicquestions.status as topicquestions_status,topicquestions.created_by as topicquestions_createdBy,topicquestions.updated_by as topicquestions_updatedBy,topicquestions.created_at as topicquestions_createdAt,topicquestions.updated_at as topicquestions_updatedAt FROM topicquestions  WHERE topic_question_id = {{id}} OR topic_question_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE topicquestions SET status = 'inactive' WHERE topic_question_id = {{id}}"},           
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
                        permission: { Add: "add_topicquestions", View: "view_topicquestions", Update: "update_topicquestions", Delete: "delete_topicquestions", List: "list_topicquestions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Topicquestions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Topicquestions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudTopicquestions_object}