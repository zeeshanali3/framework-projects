/* Frontend Parameters for table: semesters */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "semesters Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "semesters",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Semesters",
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
                "name": "semesterNum",
                "label": "Semester Num",
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
                "dynamicKey": "semesters_semesterNum",
                "alias" : "semesters.semester_num",
                "options": []

            }
            ,
            {
                "name": "semesterName",
                "label": "Semester Name",
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
                "dynamicKey": "semesters_semesterName",
                "alias" : "semesters.semester_name",
                "options": []

            }  
        
            ,
            {
                "name": "programName",
                "label": "Program Name",
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
                "dynamicKey": "programs_programName",
                "alias" : "programs.program_name",
                "options": [ ""]

            }  
            
        
                ,
                {
                    "name": "programId",
                    "label": "Program Id",
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
                    "dynamicKey": "semesters_programId",
                    "selectServerUrl": "/programs/dropdown?version=1.0",
                    "alias" : "semesters.program_id"
                }
                
        
          ,
          {
              "name": "startDate",
              "label": "Start Date",
              "title": "",
              "type": "datetime",
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
              "dynamicKey": "semesters_startDate"
          }
          ,
          {
              "name": "endDate",
              "label": "End Date",
              "title": "",
              "type": "datetime",
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
              "dynamicKey": "semesters_endDate"
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
                  "dynamicKey": "semesters_createdAt",
                  "alias" : "semesters.created_at"
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
                  "dynamicKey": "semesters_updatedAt",
                  "alias" : "semesters.updated_at"
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
                "dynamicKey": "semesters_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "semesters.status"
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
                "colMapper": "{ 'semesters_semesterId' : 'semester_id',  'semesters_programId' : 'program_id',  'semesters_semesterNum' : 'semester_num',  'semesters_startDate' : 'start_date',  'semesters_endDate' : 'end_date',  'semesters_semesterName' : 'semester_name',  'semesters_status' : 'status',  'semesters_createdBy' : 'created_by',  'semesters_updatedBy' : 'updated_by',  'semesters_createdAt' : 'created_at',  'semesters_updatedAt' : 'updated_at',  'semesters_programName' : 'program_name'}"
                };