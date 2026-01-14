const parameters = {
              "steps": [
                  {
                  "title": "Students Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "students",
                          "type": "section",
                          "title": "Students CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Students",
                          "childFields": [
                                {
                                  "name": "students_id",
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
                                  "dynamicKey": "students_id"
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
                                  "name": "urdd_id",
                                  "label": "Urdd Id",
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
                                  "dynamicKey": "students_urddId",
                                  "alias" : "students.urdd_id",
                                  },
                                  {
                                  "name": "program_id",
                                  "label": "Program Id",
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
                                  "dynamicKey": "students_programId",
                                  "alias" : "students.program_id",
                                  },
                                  {
                                  "name": "batch",
                                  "label": "Batch",
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
                                  "dynamicKey": "students_batch",
                                  "alias" : "students.batch",
                                  },
                                  {
                                  "name": "reg_num",
                                  "label": "Reg Num",
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
                                  "dynamicKey": "students_regNum",
                                  "alias" : "students.reg_num",
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
              "colMapper": "{ 'students_studentUserId' : 'student_user_id',  'students_urddId' : 'urdd_id',  'students_programId' : 'program_id',  'students_batch' : 'batch',  'students_regNum' : 'reg_num',  'students_status' : 'status',  'students_createdBy' : 'created_by',  'students_updatedBy' : 'updated_by',  'students_createdAt' : 'created_at',  'students_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;