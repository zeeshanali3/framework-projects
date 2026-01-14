const parameters = {
              "steps": [
                  {
                  "title": "Prereqs Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "prereqs",
                          "type": "section",
                          "title": "Prereqs CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Prereqs",
                          "childFields": [
                                {
                                  "name": "prereqs_id",
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
                                  "dynamicKey": "prereqs_id"
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
                                  "name": "planned_course_id",
                                  "label": "Planned Course Id",
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
                                  "dynamicKey": "prereqs_plannedCourseId",
                                  "alias" : "prereqs.planned_course_id",
                                  },
                                  {
                                  "name": "pre_req_course_id",
                                  "label": "Pre Req Course Id",
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
                                  "dynamicKey": "prereqs_preReqCourseId",
                                  "alias" : "prereqs.pre_req_course_id",
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
              "colMapper": "{ 'prereqs_preReqsId' : 'pre_reqs_id',  'prereqs_plannedCourseId' : 'planned_course_id',  'prereqs_preReqCourseId' : 'pre_req_course_id',  'prereqs_status' : 'status',  'prereqs_createdBy' : 'created_by',  'prereqs_updatedBy' : 'updated_by',  'prereqs_createdAt' : 'created_at',  'prereqs_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;