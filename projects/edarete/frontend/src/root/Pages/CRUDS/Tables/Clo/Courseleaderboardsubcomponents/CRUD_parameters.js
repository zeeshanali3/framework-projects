/* Frontend Parameters for table: courseleaderboardsubcomponents */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "courseleaderboardsubcomponents Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "courseleaderboardsubcomponents",
                            "type": "section",
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
                "name": "subcomponentPercentage",
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
                "validations": [],
                "selectServer": false,
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "courseleaderboardsubcomponents_subcomponentPercentage",
                "alias" : "courseleaderboardsubcomponents.subcomponent_percentage",
                "options": []

            }  
        
            ,
            {
                "name": "leaderboardName",
                "label": "Leaderboard Name",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "courseleaderboards_leaderboardName",
                "alias" : "courseleaderboards.leaderboard_name",
                "options": [ ""]

            }  
            
        
                ,
                {
                    "name": "courseLeaderboardId",
                    "label": "Course Leaderboard Id",
                    "title": "",
                    "type": "select",
                    "required": false,
                    "hideInCreateForm": false,
                    "hideInViewForm": true,
                    "visible": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "source": "req.body",
                    "min": "",
                    "max": "",
                    "validations": [],
                    "selectServer": true,
                    "dynamicKey": "courseleaderboardsubcomponents_courseLeaderboardId",
                    "selectServerUrl": "/courseleaderboards/dropdown?version=1.0",
                    "alias" : "courseleaderboardsubcomponents.course_leaderboard_id"
                }
                
                ,
                {
                    "name": "subComponentId",
                    "label": "Sub Component Id",
                    "title": "",
                    "type": "select",
                    "required": false,
                    "hideInCreateForm": false,
                    "hideInViewForm": true,
                    "visible": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "source": "req.body",
                    "min": "",
                    "max": "",
                    "validations": [],
                    "selectServer": true,
                    "dynamicKey": "courseleaderboardsubcomponents_subComponentId",
                    "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                    "alias" : "courseleaderboardsubcomponents.sub_component_id"
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
                  "dynamicKey": "courseleaderboardsubcomponents_createdAt",
                  "alias" : "courseleaderboardsubcomponents.created_at"
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
                  "dynamicKey": "courseleaderboardsubcomponents_updatedAt",
                  "alias" : "courseleaderboardsubcomponents.updated_at"
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
                "dynamicKey": "courseleaderboardsubcomponents_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "courseleaderboardsubcomponents.status"
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
                "colMapper": "{ 'courseleaderboardsubcomponents_courseLeaderboardSubcomponentId' : 'course_leaderboard_subcomponent_id',  'courseleaderboardsubcomponents_courseLeaderboardId' : 'course_leaderboard_id',  'courseleaderboardsubcomponents_subComponentId' : 'sub_component_id',  'courseleaderboardsubcomponents_subcomponentPercentage' : 'subcomponent_percentage',  'courseleaderboardsubcomponents_status' : 'status',  'courseleaderboardsubcomponents_createdBy' : 'created_by',  'courseleaderboardsubcomponents_updatedBy' : 'updated_by',  'courseleaderboardsubcomponents_createdAt' : 'created_at',  'courseleaderboardsubcomponents_updatedAt' : 'updated_at',  'courseleaderboardsubcomponents_leaderboardName' : 'leaderboard_name'}"
                };