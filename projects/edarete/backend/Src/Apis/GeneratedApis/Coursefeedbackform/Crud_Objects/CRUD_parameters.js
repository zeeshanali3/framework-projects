const parameters = {
              "steps": [
                  {
                  "title": "Coursefeedbackform Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "coursefeedbackform",
                          "type": "section",
                          "title": "Coursefeedbackform CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Coursefeedbackform",
                          "childFields": [
                                {
                                  "name": "coursefeedbackform_id",
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
                                  "dynamicKey": "coursefeedbackform_id"
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
                                  "name": "course_id",
                                  "label": "Course Id",
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
                                  "dynamicKey": "coursefeedbackform_courseId",
                                  "alias" : "coursefeedbackform.course_id",
                                  },
                                  {
                                  "name": "feedback_form_id",
                                  "label": "Feedback Form Id",
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
                                  "dynamicKey": "coursefeedbackform_feedbackFormId",
                                  "alias" : "coursefeedbackform.feedback_form_id",
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
              "colMapper": "{ 'coursefeedbackform_courseFeedBackFormId' : 'course_feed_back_form_id',  'coursefeedbackform_courseId' : 'course_id',  'coursefeedbackform_feedbackFormId' : 'feedback_form_id',  'coursefeedbackform_status' : 'status',  'coursefeedbackform_createdBy' : 'created_by',  'coursefeedbackform_updatedBy' : 'updated_by',  'coursefeedbackform_createdAt' : 'created_at',  'coursefeedbackform_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;