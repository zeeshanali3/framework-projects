const parameters = {
              "steps": [
                  {
                  "title": "Questionssolution Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "questionssolution",
                          "type": "section",
                          "title": "Questionssolution CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Questionssolution",
                          "childFields": [
                                {
                                  "name": "questionssolution_id",
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
                                  "dynamicKey": "questionssolution_id"
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
                                  "name": "question_id",
                                  "label": "Question Id",
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
                                  "dynamicKey": "questionssolution_questionId",
                                  "alias" : "questionssolution.question_id",
                                  },
                                  {
                                  "name": "attachment_id",
                                  "label": "Attachment Id",
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
                                  "dynamicKey": "questionssolution_attachmentId",
                                  "alias" : "questionssolution.attachment_id",
                                  },
                                  {
                                  "name": "options",
                                  "label": "Options",
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
                                  "dynamicKey": "questionssolution_options",
                                  "alias" : "questionssolution.options",
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
              "colMapper": "{ 'questionssolution_questionsHelpGuideId' : 'questions_help_guide_id',  'questionssolution_questionId' : 'question_id',  'questionssolution_attachmentId' : 'attachment_id',  'questionssolution_options' : 'options',  'questionssolution_status' : 'status',  'questionssolution_createdBy' : 'created_by',  'questionssolution_updatedBy' : 'updated_by',  'questionssolution_createdAt' : 'created_at',  'questionssolution_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;