const parameters = {
              "steps": [
                  {
                  "title": "Courseleaderboards Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "courseleaderboards",
                          "type": "section",
                          "title": "Courseleaderboards CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Courseleaderboards",
                          "childFields": [
                                {
                                  "name": "courseleaderboards_id",
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
                                  "dynamicKey": "courseleaderboards_id"
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
                                  "dynamicKey": "courseleaderboards_courseId",
                                  "alias" : "courseleaderboards.course_id",
                                  },
                                  {
                                  "name": "leaderboard_name",
                                  "label": "Leaderboard Name",
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
                                  "dynamicKey": "courseleaderboards_leaderboardName",
                                  "alias" : "courseleaderboards.leaderboard_name",
                                  },
                                  {
                                  "name": "number_of_positions",
                                  "label": "Number Of Positions",
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
                                  "dynamicKey": "courseleaderboards_numberOfPositions",
                                  "alias" : "courseleaderboards.number_of_positions",
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
              "colMapper": "{ 'courseleaderboards_courseLeaderboardId' : 'course_leaderboard_id',  'courseleaderboards_courseId' : 'course_id',  'courseleaderboards_leaderboardName' : 'leaderboard_name',  'courseleaderboards_numberOfPositions' : 'number_of_positions',  'courseleaderboards_status' : 'status',  'courseleaderboards_createdBy' : 'created_by',  'courseleaderboards_updatedBy' : 'updated_by',  'courseleaderboards_createdAt' : 'created_at',  'courseleaderboards_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;