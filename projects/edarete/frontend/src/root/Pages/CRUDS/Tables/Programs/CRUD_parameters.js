/* Frontend Parameters for table: programs */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "programs Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "programs",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Programs",
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
                "name": "departmentId",
                "label": "Department Id",
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
                "selectServerUrl":"/departments/dropdown?version=1.0",
                "dynamicKey": "programs_departmentId",
                "alias" : "programs.department_id",
                "options": []

            }
            ,
            {
                "name": "domainId",
                "label": "Domain Id",
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
                "selectServerUrl":"/domains/dropdown?version=1.0",
                "dynamicKey": "programs_domainId",
                "alias" : "programs.domain_id",
                "options": []

            }
            ,
            {
                "name": "programName",
                "label": "Program Name",
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
                "dynamicKey": "programs_programName",
                "alias" : "programs.program_name",
                "options": []

            }
            ,
            {
                "name": "programYear",
                "label": "Program Year",
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
                "dynamicKey": "programs_programYear",
                "alias" : "programs.program_year",
                "options": []

            }  
        
            ,
            {
                "name": "departmentName",
                "label": "Department Name",
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
                "dynamicKey": "departments_departmentName",
                "alias" : "departments.department_name",
                "options": [ ""]

            }
            ,
            {
                "name": "domainName",
                "label": "Domain Name",
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
                "dynamicKey": "domains_domainName",
                "alias" : "domains.domain_name",
                "options": [ ""]

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
                  "dynamicKey": "programs_createdAt",
                  "alias" : "programs.created_at"
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
                  "dynamicKey": "programs_updatedAt",
                  "alias" : "programs.updated_at"
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
                "dynamicKey": "programs_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "programs.status"
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
                "colMapper": "{ 'programs_programId' : 'program_id',  'programs_departmentId' : 'department_id',  'programs_domainId' : 'domain_id',  'programs_programName' : 'program_name',  'programs_programYear' : 'program_year',  'programs_status' : 'status',  'programs_createdBy' : 'created_by',  'programs_updatedBy' : 'updated_by',  'programs_createdAt' : 'created_at',  'programs_updatedAt' : 'updated_at',  'programs_departmentName' : 'department_name',  'programs_domainName' : 'domain_name'}"
                };