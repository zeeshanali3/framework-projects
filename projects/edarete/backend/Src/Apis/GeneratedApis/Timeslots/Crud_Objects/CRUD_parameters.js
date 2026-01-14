const parameters = {
              "steps": [
                  {
                  "title": "Timeslots Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "timeslots",
                          "type": "section",
                          "title": "Timeslots CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Timeslots",
                          "childFields": [
                                {
                                  "name": "timeslots_id",
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
                                  "dynamicKey": "timeslots_id"
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
                                  "name": "start_time",
                                  "label": "Start Time",
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
                                  "dynamicKey": "timeslots_startTime",
                                  "alias" : "timeslots.start_time",
                                  },
                                  {
                                  "name": "end_time",
                                  "label": "End Time",
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
                                  "dynamicKey": "timeslots_endTime",
                                  "alias" : "timeslots.end_time",
                                  },
                                  {
                                  "name": "day",
                                  "label": "Day",
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
                                  "dynamicKey": "timeslots_day",
                                  "alias" : "timeslots.day",
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
              "colMapper": "{ 'timeslots_timeSlotId' : 'time_slot_id',  'timeslots_startTime' : 'start_time',  'timeslots_endTime' : 'end_time',  'timeslots_day' : 'day',  'timeslots_status' : 'status',  'timeslots_createdBy' : 'created_by',  'timeslots_updatedBy' : 'updated_by',  'timeslots_createdAt' : 'created_at',  'timeslots_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;