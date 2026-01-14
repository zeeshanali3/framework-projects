const parameters = {
              "steps": [
                  {
                  "title": "Questionssolutions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "questionssolutions",
                          "type": "section",
                          "title": "Questionssolutions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Questionssolutions",
                          "childFields": [
                                {
                                  "name": "questionssolutions_id",
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
                                  "dynamicKey": "questionssolutions_id"
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
                              ,
                                  
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
              "colMapper": "{ 'questionssolutions_questionsHelpGuideId' : 'questions_help_guide_id',  'questionssolutions_status' : 'status',  'questionssolutions_createdBy' : 'created_by',  'questionssolutions_updatedBy' : 'updated_by',  'questionssolutions_createdAt' : 'created_at',  'questionssolutions_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;