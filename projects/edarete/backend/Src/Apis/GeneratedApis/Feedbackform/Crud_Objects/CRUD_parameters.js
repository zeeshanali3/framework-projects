const parameters = {
              "steps": [
                  {
                  "title": "Feedbackform Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "feedbackform",
                          "type": "section",
                          "title": "Feedbackform CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Feedbackform",
                          "childFields": [
                                {
                                  "name": "feedbackform_id",
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
                                  "dynamicKey": "feedbackform_id"
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
                                  "name": "form_name",
                                  "label": "Form Name",
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
                                  "dynamicKey": "feedbackform_formName",
                                  "alias" : "feedbackform.form_name",
                                  },
                                  {
                                  "name": "start_date",
                                  "label": "Start Date",
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
                                  "dynamicKey": "feedbackform_startDate",
                                  "alias" : "feedbackform.start_date",
                                  },
                                  {
                                  "name": "end_date",
                                  "label": "End Date",
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
                                  "dynamicKey": "feedbackform_endDate",
                                  "alias" : "feedbackform.end_date",
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
              "colMapper": "{ 'feedbackform_feedbackFormId' : 'feedback_form_id',  'feedbackform_feedbackFormId' : 'feedback_form_id',  'feedbackform_formName' : 'form_name',  'feedbackform_startDate' : 'start_date',  'feedbackform_endDate' : 'end_date',  'feedbackform_status' : 'status',  'feedbackform_createdBy' : 'created_by',  'feedbackform_updatedBy' : 'updated_by',  'feedbackform_createdAt' : 'created_at',  'feedbackform_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;