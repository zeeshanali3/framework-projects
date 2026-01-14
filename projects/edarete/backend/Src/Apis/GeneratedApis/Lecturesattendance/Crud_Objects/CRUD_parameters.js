const parameters = {
              "steps": [
                  {
                  "title": "Lecturesattendance Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "lecturesattendance",
                          "type": "section",
                          "title": "Lecturesattendance CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Lecturesattendance",
                          "childFields": [
                                {
                                  "name": "lecturesattendance_id",
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
                                  "dynamicKey": "lecturesattendance_id"
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
                                  "dynamicKey": "lecturesattendance_enrollementId",
                                  "alias" : "lecturesattendance.enrollement_id",
                                  },
                                  {
                                  "name": "date",
                                  "label": "Date",
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
                                  "dynamicKey": "lecturesattendance_date",
                                  "alias" : "lecturesattendance.date",
                                  },
                                  {
                                  "name": "is_present",
                                  "label": "Is Present",
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
                                  "dynamicKey": "lecturesattendance_isPresent",
                                  "alias" : "lecturesattendance.is_present",
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
                                  "dynamicKey": "lecturesattendance_subComponentId",
                                  "alias" : "lecturesattendance.sub_component_id",
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
              "colMapper": "{ 'lecturesattendance_attendanceId' : 'attendance_id',  'lecturesattendance_enrollementId' : 'enrollement_id',  'lecturesattendance_date' : 'date',  'lecturesattendance_isPresent' : 'is_present',  'lecturesattendance_subComponentId' : 'sub_component_id',  'lecturesattendance_status' : 'status',  'lecturesattendance_createdBy' : 'created_by',  'lecturesattendance_updatedBy' : 'updated_by',  'lecturesattendance_createdAt' : 'created_at',  'lecturesattendance_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;