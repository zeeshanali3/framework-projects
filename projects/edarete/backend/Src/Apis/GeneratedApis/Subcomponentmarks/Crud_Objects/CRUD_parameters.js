const parameters = {
              "steps": [
                  {
                  "title": "Subcomponentmarks Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "subcomponentmarks",
                          "type": "section",
                          "title": "Subcomponentmarks CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Subcomponentmarks",
                          "childFields": [
                                {
                                  "name": "subcomponentmarks_id",
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
                                  "dynamicKey": "subcomponentmarks_id"
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
                                  "dynamicKey": "subcomponentmarks_subComponentId",
                                  "alias" : "subcomponentmarks.sub_component_id",
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
                                  "dynamicKey": "subcomponentmarks_enrollmentId",
                                  "alias" : "subcomponentmarks.enrollment_id",
                                  },
                                  {
                                  "name": "obtained_marks",
                                  "label": "Obtained Marks",
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
                                  "dynamicKey": "subcomponentmarks_obtainedMarks",
                                  "alias" : "subcomponentmarks.obtained_marks",
                                  },
                                  {
                                  "name": "out_of_marks",
                                  "label": "Out Of Marks",
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
                                  "dynamicKey": "subcomponentmarks_outOfMarks",
                                  "alias" : "subcomponentmarks.out_of_marks",
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
              "colMapper": "{ 'subcomponentmarks_subComponentMarkId' : 'sub_component_mark_id',  'subcomponentmarks_subComponentId' : 'sub_component_id',  'subcomponentmarks_enrollmentId' : 'enrollment_id',  'subcomponentmarks_obtainedMarks' : 'obtained_marks',  'subcomponentmarks_outOfMarks' : 'out_of_marks',  'subcomponentmarks_status' : 'status',  'subcomponentmarks_createdBy' : 'created_by',  'subcomponentmarks_updatedBy' : 'updated_by',  'subcomponentmarks_createdAt' : 'created_at',  'subcomponentmarks_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;