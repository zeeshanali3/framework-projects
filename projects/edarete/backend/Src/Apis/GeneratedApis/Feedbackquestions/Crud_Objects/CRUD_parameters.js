const parameters = {
              "steps": [
                  {
                  "title": "Feedbackquestions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "feedbackquestions",
                          "type": "section",
                          "title": "Feedbackquestions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Feedbackquestions",
                          "childFields": [
                                {
                                  "name": "feedbackquestions_id",
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
                                  "dynamicKey": "feedbackquestions_id"
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
                                  "name": "question",
                                  "label": "Question",
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
                                  "dynamicKey": "feedbackquestions_question",
                                  "alias" : "feedbackquestions.question",
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
              "colMapper": "{ 'feedbackquestions_questionsId' : 'questions_id',  'feedbackquestions_question' : 'question',  'feedbackquestions_status' : 'status',  'feedbackquestions_createdBy' : 'created_by',  'feedbackquestions_updatedBy' : 'updated_by',  'feedbackquestions_createdAt' : 'created_at',  'feedbackquestions_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;