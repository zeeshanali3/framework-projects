const parameters = {
              "steps": [
                  {
                  "title": "Employeepreferedtimeslots Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "employeepreferedtimeslots",
                          "type": "section",
                          "title": "Employeepreferedtimeslots CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Employeepreferedtimeslots",
                          "childFields": [
                                {
                                  "name": "employeepreferedtimeslots_id",
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
                                  "dynamicKey": "employeepreferedtimeslots_id"
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
                                  "name": "employee_id",
                                  "label": "Employee Id",
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
                                  "dynamicKey": "employeepreferedtimeslots_employeeId",
                                  "alias" : "employeepreferedtimeslots.employee_id",
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
                                  "dynamicKey": "employeepreferedtimeslots_timeSlotId",
                                  "alias" : "employeepreferedtimeslots.time_slot_id",
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
              "colMapper": "{ 'employeepreferedtimeslots_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'employeepreferedtimeslots_employeeId' : 'employee_id',  'employeepreferedtimeslots_timeSlotId' : 'time_slot_id',  'employeepreferedtimeslots_status' : 'status',  'employeepreferedtimeslots_createdBy' : 'created_by',  'employeepreferedtimeslots_updatedBy' : 'updated_by',  'employeepreferedtimeslots_createdAt' : 'created_at',  'employeepreferedtimeslots_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;