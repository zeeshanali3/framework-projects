/* Frontend Parameters for table: user_roles_designations_department */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "userRolesDesignationsDepartment Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "userRolesDesignationsDepartment",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "User Roles Designations Department",
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
                "name": "roleDesignationDepartmentId",
                "label": "Role Designation Department Id",
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
                "selectServerUrl":"/roles_designations_department/dropdown?version=1.0",
                "dynamicKey": "userRolesDesignationsDepartment_roleDesignationDepartmentId",
                "alias" : "user_roles_designations_department.role_designation_department_id",
                "options": []

            }
            ,
            {
                "name": "userId",
                "label": "User Id",
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
                "selectServerUrl":"/users/dropdown?version=1.0",
                "dynamicKey": "userRolesDesignationsDepartment_userId",
                "alias" : "user_roles_designations_department.user_id",
                "options": []

            }
            ,
            {
                "name": "specAttributes",
                "label": "Spec Attributes",
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
                "dynamicKey": "userRolesDesignationsDepartment_specAttributes",
                "alias" : "user_roles_designations_department.spec_attributes",
                "options": []

            }  
        
            ,
            {
                "name": "username",
                "label": "Username",
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
                "dynamicKey": "users_username",
                "alias" : "users.username",
                "options": [ ""]

            }  
            
        
        
          ,
          {
              "name": "startDate",
              "label": "Start Date",
              "title": "",
              "type": "dateTime",
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
              "dynamicKey": "userRolesDesignationsDepartment_startDate"
          }
          ,
          {
              "name": "endDate",
              "label": "End Date",
              "title": "",
              "type": "dateTime",
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
              "dynamicKey": "userRolesDesignationsDepartment_endDate"
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
                  "dynamicKey": "userRolesDesignationsDepartment_createdAt",
                  "alias" : "user_roles_designations_department.created_at"
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
                  "dynamicKey": "userRolesDesignationsDepartment_updatedAt",
                  "alias" : "user_roles_designations_department.updated_at"
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
                "dynamicKey": "userRolesDesignationsDepartment_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "user_roles_designations_department.status"
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
                "colMapper": "{ 'userRolesDesignationsDepartment_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'userRolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'userRolesDesignationsDepartment_userId' : 'user_id',  'userRolesDesignationsDepartment_specAttributes' : 'spec_attributes',  'userRolesDesignationsDepartment_startDate' : 'start_date',  'userRolesDesignationsDepartment_endDate' : 'end_date',  'userRolesDesignationsDepartment_createdBy' : 'created_by',  'userRolesDesignationsDepartment_updatedBy' : 'updated_by',  'userRolesDesignationsDepartment_status' : 'status',  'userRolesDesignationsDepartment_createdAt' : 'created_at',  'userRolesDesignationsDepartment_updatedAt' : 'updated_at',  'userRolesDesignationsDepartment_username' : 'username'}"
                };