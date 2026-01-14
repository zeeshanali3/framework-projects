const parameters = {
              "steps": [
                  
                          {
                              "title": "Studentsubmissionattachment Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "studentsubmissionattachment",
                                          "type": "section",
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
                                                          "name": "studentSubmissionId",
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
                                                          "dynamicKey": "studentsubmissionattachment_studentSubmissionId"
                                                      },
                                                      {
                                                          "name": "attachementId",
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
                                                          "dynamicKey": "studentsubmissionattachment_attachementId"
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
                              "permission": "studentsubmissionattachment_view"
                          }
              ],
              "colMapper": "{ 'studentsubmissionattachment_studentSubmissionAttachmentId' : 'student_submission_attachment_id',  'studentsubmissionattachment_studentSubmissionId' : 'student_submission_id',  'studentsubmissionattachment_attachementId' : 'attachement_id',  'studentsubmissionattachment_status' : 'status',  'studentsubmissionattachment_createdBy' : 'created_by',  'studentsubmissionattachment_updatedBy' : 'updated_by',  'studentsubmissionattachment_createdAt' : 'created_at',  'studentsubmissionattachment_updatedAt' : 'updated_at'}"
          };
          module.exports = parameters;