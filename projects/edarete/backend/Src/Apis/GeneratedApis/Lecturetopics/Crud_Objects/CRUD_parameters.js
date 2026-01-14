const parameters = {
              "steps": [
                  {
                  "title": "Lecturetopics Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "lecturetopics",
                          "type": "section",
                          "title": "Lecturetopics CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Lecturetopics",
                          "childFields": [
                                {
                                  "name": "lecturetopics_id",
                                  "label": "id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": true,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.query",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "lecturetopics_id"
                                },
                               {
                                  "name": "actionPerformerURDD",
                                  "label": "actionPerformerURDD",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "actionPerformerURDD",
                                  "alias" : "actionPerformerURDD",
                                },
                              
                                  {
                                  "name": "sub_component_id",
                                  "label": "Sub Component Id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "lecturetopics_subComponentId",
                                  "alias" : "lecturetopics.sub_component_id",
                                  },
                                  {
                                  "name": "topic_name",
                                  "label": "Topic Name",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "lecturetopics_topicName",
                                  "alias" : "lecturetopics.topic_name",
                                  },
                                  {
                                  "name": "description",
                                  "label": "Description",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "lecturetopics_description",
                                  "alias" : "lecturetopics.description",
                                  },
                                  {
                                  "name": "book_id",
                                  "label": "Book Id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "lecturetopics_bookId",
                                  "alias" : "lecturetopics.book_id",
                                  },
                                  
                          ]
                      }
                      ]
                  },
                  "buttons": [
                      {
                      "type": "submit",
                      "label": "Submit"
                      }
                  ]
                  }
              ],
              "colMapper": "{ 'lecturetopics_lecturesTopicId' : 'lectures_topic_id',  'lecturetopics_subComponentId' : 'sub_component_id',  'lecturetopics_topicName' : 'topic_name',  'lecturetopics_description' : 'description',  'lecturetopics_bookId' : 'book_id',  'lecturetopics_status' : 'status',  'lecturetopics_createdBy' : 'created_by',  'lecturetopics_updatedBy' : 'updated_by',  'lecturetopics_createdAt' : 'created_at',  'lecturetopics_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;