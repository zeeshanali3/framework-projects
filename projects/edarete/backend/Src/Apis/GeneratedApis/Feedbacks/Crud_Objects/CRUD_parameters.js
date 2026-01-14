const parameters = {
              "steps": [
                  {
                  "title": "Feedbacks Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "feedbacks",
                          "type": "section",
                          "title": "Feedbacks CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Feedbacks",
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
                                  "name": "enrollement_id",
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
                                  "dynamicKey": "feedbacks_enrollementId",
                                  "alias" : "feedbacks.enrollement_id",
                                  },
                                  {
                                  "name": "feedback_question_id",
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
                                  "dynamicKey": "feedbacks_feedbackQuestionId",
                                  "alias" : "feedbacks.feedback_question_id",
                                  },
                                  {
                                  "name": "feedback_text",
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
                                  "dynamicKey": "feedbacks_feedbackText",
                                  "alias" : "feedbacks.feedback_text",
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
              "colMapper": "{ 'feedbacks_feedbackId' : 'feedback_id',  'feedbacks_enrollementId' : 'enrollement_id',  'feedbacks_feedbackQuestionId' : 'feedback_question_id',  'feedbacks_feedbackText' : 'feedback_text',  'feedbacks_status' : 'status',  'feedbacks_createdBy' : 'created_by',  'feedbacks_updatedBy' : 'updated_by',  'feedbacks_createdAt' : 'created_at',  'feedbacks_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;