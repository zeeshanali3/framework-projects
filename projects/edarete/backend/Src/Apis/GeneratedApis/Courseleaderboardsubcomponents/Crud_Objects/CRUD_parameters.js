const parameters = {
              "steps": [
                  {
                  "title": "Courseleaderboardsubcomponents Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "courseleaderboardsubcomponents",
                          "type": "section",
                          "title": "Courseleaderboardsubcomponents CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Courseleaderboardsubcomponents",
                          "childFields": [
                                {
                                  "name": "courseleaderboardsubcomponents_id",
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
                                  "dynamicKey": "courseleaderboardsubcomponents_id"
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
                                  "name": "course_leaderboard_id",
                                  "label": "Course Leaderboard Id",
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
                                  "dynamicKey": "courseleaderboardsubcomponents_courseLeaderboardId",
                                  "alias" : "courseleaderboardsubcomponents.course_leaderboard_id",
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
                                  "dynamicKey": "courseleaderboardsubcomponents_subComponentId",
                                  "alias" : "courseleaderboardsubcomponents.sub_component_id",
                                  },
                                  {
                                  "name": "subcomponent_percentage",
                                  "label": "Subcomponent Percentage",
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
                                  "dynamicKey": "courseleaderboardsubcomponents_subcomponentPercentage",
                                  "alias" : "courseleaderboardsubcomponents.subcomponent_percentage",
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
              "colMapper": "{ 'courseleaderboardsubcomponents_courseLeaderboardSubcomponentId' : 'course_leaderboard_subcomponent_id',  'courseleaderboardsubcomponents_courseLeaderboardId' : 'course_leaderboard_id',  'courseleaderboardsubcomponents_subComponentId' : 'sub_component_id',  'courseleaderboardsubcomponents_subcomponentPercentage' : 'subcomponent_percentage',  'courseleaderboardsubcomponents_status' : 'status',  'courseleaderboardsubcomponents_createdBy' : 'created_by',  'courseleaderboardsubcomponents_updatedBy' : 'updated_by',  'courseleaderboardsubcomponents_createdAt' : 'created_at',  'courseleaderboardsubcomponents_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;