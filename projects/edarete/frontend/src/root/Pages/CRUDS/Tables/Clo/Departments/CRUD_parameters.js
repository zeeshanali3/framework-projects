/* Frontend Parameters for table: departments */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "departments Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "departments",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Departments",
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
                "name": "departmentName",
                "label": "Department Name",
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
                "dynamicKey": "departments_departmentName",
                "alias" : "departments.department_name",
                "options": []

            }  
          
            
        
                ,
                {
                    "name": "employeeId",
                    "label": "Employee Id",
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
                    "dynamicKey": "departments_employeeId",
                    "selectServerUrl": "/employees/dropdown?version=1.0",
                    "alias" : "departments.employee_id"
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
                  "dynamicKey": "departments_createdAt",
                  "alias" : "departments.created_at"
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
                  "dynamicKey": "departments_updatedAt",
                  "alias" : "departments.updated_at"
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
                "dynamicKey": "departments_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "departments.status"
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
                "colMapper": "{ 'departments_departmentId' : 'department_id',  'departments_departmentName' : 'department_name',  'departments_employeeId' : 'employee_id',  'departments_status' : 'status',  'departments_createdBy' : 'created_by',  'departments_updatedBy' : 'updated_by',  'departments_createdAt' : 'created_at',  'departments_updatedAt' : 'updated_at'}"
                };