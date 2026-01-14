const parameters = {
              "steps": [
                  {
                  "title": "Coursetimetablesschedule Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "coursetimetablesschedule",
                          "type": "section",
                          "title": "Coursetimetablesschedule CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Coursetimetablesschedule",
                          "childFields": [
                                {
                                  "name": "coursetimetablesschedule_id",
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
                                  "dynamicKey": "coursetimetablesschedule_id"
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
                                  "dynamicKey": "coursetimetablesschedule_courseId",
                                  "alias" : "coursetimetablesschedule.course_id",
                                  },
                                  {
                                  "name": "employee_prefered_time_slots_id",
                                  "label": "Employee Prefered Time Slots Id",
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
                                  "dynamicKey": "coursetimetablesschedule_employeePreferedTimeSlotsId",
                                  "alias" : "coursetimetablesschedule.employee_prefered_time_slots_id",
                                  },
                                  {
                                  "name": "time_slot_id",
                                  "label": "Time Slot Id",
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
                                  "dynamicKey": "coursetimetablesschedule_timeSlotId",
                                  "alias" : "coursetimetablesschedule.time_slot_id",
                                  },
                                  {
                                  "name": "room_id",
                                  "label": "Room Id",
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
                                  "dynamicKey": "coursetimetablesschedule_roomId",
                                  "alias" : "coursetimetablesschedule.room_id",
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
              "colMapper": "{ 'coursetimetablesschedule_courseLscheduleId' : 'course_lschedule_id',  'coursetimetablesschedule_courseId' : 'course_id',  'coursetimetablesschedule_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'coursetimetablesschedule_timeSlotId' : 'time_slot_id',  'coursetimetablesschedule_roomId' : 'room_id',  'coursetimetablesschedule_status' : 'status',  'coursetimetablesschedule_createdBy' : 'created_by',  'coursetimetablesschedule_updatedBy' : 'updated_by',  'coursetimetablesschedule_createdAt' : 'created_at',  'coursetimetablesschedule_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;