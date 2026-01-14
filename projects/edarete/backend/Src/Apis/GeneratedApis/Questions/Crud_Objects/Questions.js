/* CRUD Objects for table: questions */
      
      const parameters = require('./CRUD_parameters');


//     async function insertAnswers(req, decryptedPayload) {
//     try{
//     let { questions_boilerplateAnswer } = decryptedPayload;
//       if (questions_boilerplateAnswer){
//         decryptedPayload.questions_boilerplateAnswer = JSON.stringify(questions_boilerplateAnswer);
//         console.log("✅ Boilerplate Answer inserted as JSON:", decryptedPayload.questions_boilerplateAnswer);
//       }
    
//     return { success: true };
//     } 
//     catch (err) {
//       console.error("❌ Error inserting entries:", err);
//       throw err;
//   } 
// }




      global.CrudQuestions_object = {
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
                      preProcessFunction: [],
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO questions (cloid, sub_component_id, question_num, description, question_marks, lectures_topic_id, config, created_by, updated_by) VALUES ({{questions_cloid}}, {{questions_subComponentId}}, {{questions_questionNum}}, {{questions_description}}, {{questions_questionMarks}}, {{questions_lecturesTopicId}}, {{questions_config}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE questions SET cloid = {{questions_cloid}}, sub_component_id = {{questions_subComponentId}}, question_num = {{questions_questionNum}}, description = {{questions_description}}, question_marks = {{questions_questionMarks}}, lectures_topic_id = {{questions_lecturesTopicId}}, config = {{questions_config}} WHERE question_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questions.question_id as questions_id, questions.question_id as id, questions.question_id as questions_questionId,questions.cloid as questions_cloid,questions.sub_component_id as questions_subComponentId,questions.question_num as questions_questionNum,questions.description as questions_description,questions.question_marks as questions_questionMarks,questions.lectures_topic_id as questions_lecturesTopicId,questions.status as questions_status,questions.config as questions_config,questions.created_by as questions_createdBy,questions.updated_by as questions_updatedBy,questions.created_at as questions_createdAt,questions.updated_at as questions_updatedAt, lecturetopics.topic_name as lecturetopics_topicName FROM questions LEFT JOIN lecturetopics ON questions.lectures_topic_id = lecturetopics.lectures_topic_id Where questions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT questions.question_id as questions_id, questions.question_id as id, questions.question_id as questions_questionId,questions.cloid as questions_cloid,questions.sub_component_id as questions_subComponentId,questions.question_num as questions_questionNum,questions.description as questions_description,questions.question_marks as questions_questionMarks,questions.lectures_topic_id as questions_lecturesTopicId,questions.status as questions_status,questions.config as questions_config,questions.created_by as questions_createdBy,questions.updated_by as questions_updatedBy,questions.created_at as questions_createdAt,questions.updated_at as questions_updatedAt, lecturetopics.topic_name as lecturetopics_topicName FROM questions LEFT JOIN lecturetopics ON questions.lectures_topic_id = lecturetopics.lectures_topic_id WHERE question_id = {{id}} OR question_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE questions SET status = 'inactive' WHERE question_id = {{id}}"},           
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
                        permission: { Add: "add_questions", View: "view_questions", Update: "update_questions", Delete: "delete_questions", List: "list_questions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Questions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Questions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestions_object}