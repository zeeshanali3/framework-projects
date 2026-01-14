/* CRUD Objects for table: lecturetopics */
      
      const parameters = require('./CRUD_parameters');
      global.CrudLecturetopics_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO lecturetopics (sub_component_id, topic_name, description, book_id, created_by, updated_by) VALUES ({{lecturetopics_subComponentId}}, {{lecturetopics_topicName}}, {{lecturetopics_description}}, {{lecturetopics_bookId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET sub_component_id = {{lecturetopics_subComponentId}}, topic_name = {{lecturetopics_topicName}}, description = {{lecturetopics_description}}, book_id = {{lecturetopics_bookId}} WHERE lectures_topic_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lecturetopics.lectures_topic_id as lecturetopics_id, lecturetopics.lectures_topic_id as id, lecturetopics.lectures_topic_id as lecturetopics_lecturesTopicId,lecturetopics.sub_component_id as lecturetopics_subComponentId,lecturetopics.topic_name as lecturetopics_topicName,lecturetopics.description as lecturetopics_description,lecturetopics.book_id as lecturetopics_bookId,lecturetopics.status as lecturetopics_status,lecturetopics.created_by as lecturetopics_createdBy,lecturetopics.updated_by as lecturetopics_updatedBy,lecturetopics.created_at as lecturetopics_createdAt,lecturetopics.updated_at as lecturetopics_updatedAt, books.book_name as books_bookName FROM lecturetopics LEFT JOIN books ON lecturetopics.book_id = books.book_id Where lecturetopics.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT lecturetopics.lectures_topic_id as lecturetopics_id, lecturetopics.lectures_topic_id as id, lecturetopics.lectures_topic_id as lecturetopics_lecturesTopicId,lecturetopics.sub_component_id as lecturetopics_subComponentId,lecturetopics.topic_name as lecturetopics_topicName,lecturetopics.description as lecturetopics_description,lecturetopics.book_id as lecturetopics_bookId,lecturetopics.status as lecturetopics_status,lecturetopics.created_by as lecturetopics_createdBy,lecturetopics.updated_by as lecturetopics_updatedBy,lecturetopics.created_at as lecturetopics_createdAt,lecturetopics.updated_at as lecturetopics_updatedAt, books.book_name as books_bookName FROM lecturetopics LEFT JOIN books ON lecturetopics.book_id = books.book_id WHERE lectures_topic_id = {{id}} OR lectures_topic_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE lecturetopics SET status = 'inactive' WHERE lectures_topic_id = {{id}}"},           
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
                        permission: { Add: "add_lecturetopics", View: "view_lecturetopics", Update: "update_lecturetopics", Delete: "delete_lecturetopics", List: "list_lecturetopics" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Lecturetopics CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Lecturetopics.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudLecturetopics_object}