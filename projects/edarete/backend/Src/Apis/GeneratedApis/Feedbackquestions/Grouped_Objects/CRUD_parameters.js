const parameters = {
              "steps": [
                  
                          {
                              "title": "Feedbackquestions Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "feedbackquestions",
                                          "type": "section",
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
                                                          "dynamicKey": "feedbackquestions_question"
                                                      }
                                          ]
                                      }
                                  ]
                              },
                              "buttons": [
                                  {
                                      "type": "submit",
                                      "label": "Submit"
                                  }
                              ],
                              "permission": "feedbackquestions_view"
                          },
                          {
                              "title": "Feedbacks Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "feedbacks",
                                          "type": "section",
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
                                                    "name": "feedbacks_id",
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
                                                    "dynamicKey": "feedbacks_id"
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
                                                          "name": "enrollementId",
                                                          "label": "Enrollement Id",
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
                                                          "dynamicKey": "feedbacks_enrollementId"
                                                      },
                                                      {
                                                          "name": "feedbackQuestionId",
                                                          "label": "Feedback Question Id",
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
                                                          "dynamicKey": "feedbacks_feedbackQuestionId"
                                                      },
                                                      {
                                                          "name": "feedbackText",
                                                          "label": "Feedback Text",
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
                                                          "dynamicKey": "feedbacks_feedbackText"
                                                      }
                                          ]
                                      }
                                  ]
                              },
                              "buttons": [
                                  {
                                      "type": "submit",
                                      "label": "Submit"
                                  }
                              ],
                              "permission": "feedbacks_view"
                          }
              ],
              "colMapper": "{ 'feedbackquestions_questionsId' : 'questions_id',  'feedbackquestions_question' : 'question',  'feedbacks_feedbackId' : 'feedback_id',  'feedbacks_enrollementId' : 'enrollement_id',  'feedbacks_feedbackQuestionId' : 'feedback_question_id',  'feedbacks_feedbackText' : 'feedback_text'}"
          };
          module.exports = parameters;