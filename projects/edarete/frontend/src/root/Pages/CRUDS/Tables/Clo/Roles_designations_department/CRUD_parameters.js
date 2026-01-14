/* Frontend Parameters for table: roles_designations_department */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "rolesDesignationsDepartment Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "rolesDesignationsDepartment",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Roles Designations Department",
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
                "name": "designationName",
                "label": "Designation Name",
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
                "dynamicKey": "designations_designationName",
                "alias" : "designations.designation_name",
                "options": [ ""]

            }
            ,
            {
                "name": "roleName",
                "label": "Role Name",
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
                "dynamicKey": "roles_roleName",
                "alias" : "roles.role_name",
                "options": [ ""]

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
                    "name": "designationId",
                    "label": "Designation Id",
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
                    "dynamicKey": "rolesDesignationsDepartment_designationId",
                    "selectServerUrl": "/designations/dropdown?version=1.0",
                    "alias" : "roles_designations_department.designation_id"
                }
                
                ,
                {
                    "name": "roleId",
                    "label": "Role Id",
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
                    "dynamicKey": "rolesDesignationsDepartment_roleId",
                    "selectServerUrl": "/roles/dropdown?version=1.0",
                    "alias" : "roles_designations_department.role_id"
                }
                
                ,
                {
                    "name": "departmentId",
                    "label": "Department Id",
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
                    "dynamicKey": "rolesDesignationsDepartment_departmentId",
                    "selectServerUrl": "/departments/dropdown?version=1.0",
                    "alias" : "roles_designations_department.department_id"
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
                  "dynamicKey": "rolesDesignationsDepartment_createdAt",
                  "alias" : "roles_designations_department.created_at"
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
                  "dynamicKey": "rolesDesignationsDepartment_updatedAt",
                  "alias" : "roles_designations_department.updated_at"
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
                "dynamicKey": "rolesDesignationsDepartment_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "roles_designations_department.status"
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
                "colMapper": "{ 'rolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'rolesDesignationsDepartment_designationId' : 'designation_id',  'rolesDesignationsDepartment_roleId' : 'role_id',  'rolesDesignationsDepartment_departmentId' : 'department_id',  'rolesDesignationsDepartment_createdBy' : 'created_by',  'rolesDesignationsDepartment_updatedBy' : 'updated_by',  'rolesDesignationsDepartment_status' : 'status',  'rolesDesignationsDepartment_createdAt' : 'created_at',  'rolesDesignationsDepartment_updatedAt' : 'updated_at',  'rolesDesignationsDepartment_designationName' : 'designation_name',  'rolesDesignationsDepartment_roleName' : 'role_name',  'rolesDesignationsDepartment_departmentName' : 'department_name'}"
                };