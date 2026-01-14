const parameters = require('./CRUD_parameters');
        global.GroupedCrudsLecturetopics_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO lecturetopics (sub_component_id, topic_name, description, book_id , created_by, updated_by) VALUES ({{lecturetopics_subComponentId}}, {{lecturetopics_topicName}}, {{lecturetopics_description}}, {{lecturetopics_bookId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET sub_component_id = {{lecturetopics_subComponentId}}, topic_name = {{lecturetopics_topicName}}, description = {{lecturetopics_description}}, book_id = {{lecturetopics_bookId}} WHERE lectures_topic_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lectures_topic_id as lecturetopics_id,lectures_topic_id as id, lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId  FROM lecturetopics WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            lecturetopics.lectures_topic_id as lecturetopics_id, subcomponents.sub_component_id as subcomponents_id, books.book_id as books_id, questions.question_id as questions_id,
                        subcomponents.sub_component_id as id,
                       lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, subcomponents.sub_component_id as  subcomponents_subComponentId, books.book_id as  books_bookId, questions.question_id as  questions_questionId,

                          lecturetopics.lectures_topic_id as subcomponents_lecturesTopicId, subcomponents.sub_component_id as subcomponents_subComponentId, books.book_id as subcomponents_bookId, questions.question_id as subcomponents_questionId,
                          
                       
                         
                          null lecturetopics.sub_component_id as lecturetopics_subComponentId, lecturetopics.topic_name as lecturetopics_topicName, lecturetopics.description as lecturetopics_description, lecturetopics.book_id as lecturetopics_bookId, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM lecturetopics LEFT JOIN subcomponents ON subcomponents.sub_component_id = lecturetopics.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN books ON books.book_id = lecturetopics.book_id AND books.status !='inactive' LEFT JOIN questions ON (questions.lectures_topic_id = lecturetopics.lectures_topic_id OR questions.sub_component_id = subcomponents.sub_component_id) WHERE (lecturetopics.lectures_topic_id = {{id}}  AND  lecturetopics.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE lecturetopics SET status = 'inactive' WHERE lectures_topic_id = {{id}}"}    

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
                        successMessage: "lecturetopics Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, user_role_id, date, start_time, end_time, total_marks, weightage, is_public , created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_userRoleId}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, user_role_id = {{subcomponents_userRoleId}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}} WHERE sub_component_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, sub_component_id as subcomponents_id,sub_component_id as id, subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic  FROM subcomponents WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            lecturetopics.lectures_topic_id as lecturetopics_id, subcomponents.sub_component_id as subcomponents_id, books.book_id as books_id, questions.question_id as questions_id,
                        subcomponents.sub_component_id as id,
                       lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, subcomponents.sub_component_id as  subcomponents_subComponentId, books.book_id as  books_bookId, questions.question_id as  questions_questionId,

                          lecturetopics.lectures_topic_id as subcomponents_lecturesTopicId, subcomponents.sub_component_id as subcomponents_subComponentId, books.book_id as subcomponents_bookId, questions.question_id as subcomponents_questionId,
                          
                       
                         
                          null subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM lecturetopics LEFT JOIN subcomponents ON subcomponents.sub_component_id = lecturetopics.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN books ON books.book_id = lecturetopics.book_id AND books.status !='inactive' LEFT JOIN questions ON (questions.lectures_topic_id = lecturetopics.lectures_topic_id OR questions.sub_component_id = subcomponents.sub_component_id) WHERE (subcomponents.sub_component_id = {{id}}  AND  subcomponents.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subcomponents SET status = 'inactive' WHERE sub_component_id = {{id}}"}    

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
                        successMessage: "subcomponents Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO books (course_id, book_ibn, book_name , created_by, updated_by) VALUES ({{books_courseId}}, {{books_bookIbn}}, {{books_bookName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE books SET course_id = {{books_courseId}}, book_ibn = {{books_bookIbn}}, book_name = {{books_bookName}} WHERE book_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, book_id as books_id,book_id as id, books.course_id as books_courseId, books.book_ibn as books_bookIbn, books.book_name as books_bookName  FROM books WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            lecturetopics.lectures_topic_id as lecturetopics_id, subcomponents.sub_component_id as subcomponents_id, books.book_id as books_id, questions.question_id as questions_id,
                        subcomponents.sub_component_id as id,
                       lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, subcomponents.sub_component_id as  subcomponents_subComponentId, books.book_id as  books_bookId, questions.question_id as  questions_questionId,

                          lecturetopics.lectures_topic_id as subcomponents_lecturesTopicId, subcomponents.sub_component_id as subcomponents_subComponentId, books.book_id as subcomponents_bookId, questions.question_id as subcomponents_questionId,
                          
                       
                         
                          null books.course_id as books_courseId, books.book_ibn as books_bookIbn, books.book_name as books_bookName, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM lecturetopics LEFT JOIN subcomponents ON subcomponents.sub_component_id = lecturetopics.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN books ON books.book_id = lecturetopics.book_id AND books.status !='inactive' LEFT JOIN questions ON (questions.lectures_topic_id = lecturetopics.lectures_topic_id OR questions.sub_component_id = subcomponents.sub_component_id) WHERE (books.book_id = {{id}}  AND  books.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE books SET status = 'inactive' WHERE book_id = {{id}}"}    

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
                        successMessage: "books Grouped CRUD Hit successfully!",
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
                            lecturetopics.lectures_topic_id as lecturetopics_id, subcomponents.sub_component_id as subcomponents_id, books.book_id as books_id, questions.question_id as questions_id,
                        subcomponents.sub_component_id as id,
                       lecturetopics.lectures_topic_id as  lecturetopics_lecturesTopicId, subcomponents.sub_component_id as  subcomponents_subComponentId, books.book_id as  books_bookId, questions.question_id as  questions_questionId,

                          lecturetopics.lectures_topic_id as subcomponents_lecturesTopicId, subcomponents.sub_component_id as subcomponents_subComponentId, books.book_id as subcomponents_bookId, questions.question_id as subcomponents_questionId,
                          
                       
                         
                          null questions.cloid as questions_cloid, questions.sub_component_id as questions_subComponentId, questions.question_num as questions_questionNum, questions.description as questions_description, questions.question_marks as questions_questionMarks, questions.lectures_topic_id as questions_lecturesTopicId, 
                        subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum, subcomponents.text as subcomponents_text, subcomponents.user_role_id as subcomponents_userRoleId, subcomponents.date as subcomponents_date, subcomponents.start_time as subcomponents_startTime, subcomponents.end_time as subcomponents_endTime, subcomponents.total_marks as subcomponents_totalMarks, subcomponents.weightage as subcomponents_weightage, subcomponents.is_public as subcomponents_isPublic FROM lecturetopics LEFT JOIN subcomponents ON subcomponents.sub_component_id = lecturetopics.sub_component_id AND subcomponents.status !='inactive' LEFT JOIN books ON books.book_id = lecturetopics.book_id AND books.status !='inactive' LEFT JOIN questions ON (questions.lectures_topic_id = lecturetopics.lectures_topic_id OR questions.sub_component_id = subcomponents.sub_component_id) WHERE (questions.question_id = {{id}}  AND  questions.status != 'inactive')
                          
                          
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
        module.exports = {GroupedCrudsLecturetopics_object}