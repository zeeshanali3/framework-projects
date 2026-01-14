const parameters = {
              "steps": [
                  {
                  "title": "Studentsubmissions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "studentsubmissions",
                          "type": "section",
                          "title": "Studentsubmissions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Studentsubmissions",
                          "childFields": [
                                {
                                  "name": "studentsubmissions_id",
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
                                  "dynamicKey": "studentsubmissions_id"
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
                                  "dynamicKey": "studentsubmissions_subComponentId",
                                  "alias" : "studentsubmissions.sub_component_id",
                                  },
                                  {
                                  "name": "enrollment_id",
                                  "label": "Enrollment Id",
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
                                  "dynamicKey": "studentsubmissions_enrollmentId",
                                  "alias" : "studentsubmissions.enrollment_id",
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
              "colMapper": "{ 'studentsubmissions_studentSubmissionId' : 'student_submission_id',  'studentsubmissions_subComponentId' : 'sub_component_id',  'studentsubmissions_enrollmentId' : 'enrollment_id',  'studentsubmissions_status' : 'status',  'studentsubmissions_createdBy' : 'created_by',  'studentsubmissions_updatedBy' : 'updated_by',  'studentsubmissions_createdAt' : 'created_at',  'studentsubmissions_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;