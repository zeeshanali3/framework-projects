const parameters = {
              "steps": [
                  {
                  "title": "Studentsubmissionattachment Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "studentsubmissionattachment",
                          "type": "section",
                          "title": "Studentsubmissionattachment CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Studentsubmissionattachment",
                          "childFields": [
                                {
                                  "name": "studentsubmissionattachment_id",
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
                                  "dynamicKey": "studentsubmissionattachment_id"
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
                                  "name": "student_submission_id",
                                  "label": "Student Submission Id",
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
                                  "dynamicKey": "studentsubmissionattachment_studentSubmissionId",
                                  "alias" : "studentsubmissionattachment.student_submission_id",
                                  },
                                  {
                                  "name": "attachement_id",
                                  "label": "Attachement Id",
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
                                  "dynamicKey": "studentsubmissionattachment_attachementId",
                                  "alias" : "studentsubmissionattachment.attachement_id",
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
              "colMapper": "{ 'studentsubmissionattachment_studentSubmissionAttachmentId' : 'student_submission_attachment_id',  'studentsubmissionattachment_studentSubmissionId' : 'student_submission_id',  'studentsubmissionattachment_attachementId' : 'attachement_id',  'studentsubmissionattachment_status' : 'status',  'studentsubmissionattachment_createdBy' : 'created_by',  'studentsubmissionattachment_updatedBy' : 'updated_by',  'studentsubmissionattachment_createdAt' : 'created_at',  'studentsubmissionattachment_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;