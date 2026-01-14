/* Frontend Parameters for table: courseleaderboards */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "courseleaderboards Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "courseleaderboards",
                            "type": "section",
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
          "name": "id",
          "label": "id",
          "title": "",
          "type": "textField",
          "required": false,
          "hideInCreateForm": true,
          "hideInViewForm" : true,
          "visible": true,
          "disabled": false,
          "dependancyCheck": false,
          "isPrefilled": false,
          "source": "req.query",
          "min": "",
          "max": "",
          "selectServer": false,
          "dynamicKey": "id"
        }
        
            ,
            {
                "name": "courseId",
                "label": "Course Id",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": false,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": true,
                "selectServerUrl":"/courses/dropdown?version=1.0",
                "dynamicKey": "courseleaderboards_courseId",
                "alias" : "courseleaderboards.course_id",
                "options": []

            }
            ,
            {
                "name": "leaderboardName",
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
                "validations": [],
                "selectServer": false,
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "courseleaderboards_leaderboardName",
                "alias" : "courseleaderboards.leaderboard_name",
                "options": []

            }
            ,
            {
                "name": "numberOfPositions",
                "label": "Number Of Positions",
                "title": "",
                "type": "number",
                "required": false,
                "hideInCreateForm": false,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "courseleaderboards_numberOfPositions",
                "alias" : "courseleaderboards.number_of_positions",
                "options": []

            }  
          
            
        
          
          
                ,
                {
                  "name": "createdAt",
                  "label": "Created At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "courseleaderboards_createdAt",
                  "alias" : "courseleaderboards.created_at"
                }
                ,
                {
                  "name": "updatedAt",
                  "label": "Updated At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "courseleaderboards_updatedAt",
                  "alias" : "courseleaderboards.updated_at"
                }  

          
            ,
            {
                "name": "status",
                "label": "Status",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "courseleaderboards_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "courseleaderboards.status"
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
                    ]
                    }
                ],
                "colMapper": "{ 'courseleaderboards_courseLeaderboardId' : 'course_leaderboard_id',  'courseleaderboards_courseId' : 'course_id',  'courseleaderboards_leaderboardName' : 'leaderboard_name',  'courseleaderboards_numberOfPositions' : 'number_of_positions',  'courseleaderboards_status' : 'status',  'courseleaderboards_createdBy' : 'created_by',  'courseleaderboards_updatedBy' : 'updated_by',  'courseleaderboards_createdAt' : 'created_at',  'courseleaderboards_updatedAt' : 'updated_at'}"
                };