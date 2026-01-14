export const parameters = {
                  "steps": [
                    
                        {
                            "title": "classcomponent Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "classcomponent",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Classcomponent",
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
                                            },
                                            
                                                ,
                                                {
                                                    "name": "courseId",
                                                    "label": "Course Id",
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
                                                    "dynamicKey": "classcomponent_courseId",
                                                    "alias" : "classcomponent.course_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "componentType",
                                                    "label": "Component Type",
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
                                                    "dynamicKey": "classcomponent_componentType",
                                                    "alias" : "classcomponent.component_type",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "componentName",
                                                    "label": "Component Name",
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
                                                    "dynamicKey": "classcomponent_componentName",
                                                    "alias" : "classcomponent.component_name",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "weightage",
                                                    "label": "Weightage",
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
                                                    "dynamicKey": "classcomponent_weightage",
                                                    "alias" : "classcomponent.weightage",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "componentPolicy",
                                                    "label": "Component Policy",
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
                                                    "dynamicKey": "classcomponent_componentPolicy",
                                                    "alias" : "classcomponent.component_policy",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "classcomponent",
                                                  "label": "Add Classcomponent",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/classcomponent?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Classcomponent",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "classcomponent", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Classcomponent",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
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
                                                    "dynamicKey": "classcomponent_createdAt",
                                                    "alias" : "classcomponent.created_at"
                                                },
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
                                                    "dynamicKey": "classcomponent_updatedAt",
                                                    "alias" : "classcomponent.updated_at"
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
                                                    "dynamicKey": "classcomponent_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "classcomponent.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_classcomponent"
                        },
                        {
                            "title": "user_roles_designations_department Info",
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
                                        "title": "Classcomponent",
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
                                            },
                                            
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
                                                    "dynamicKey": "userRolesDesignationsDepartment_specAttributes",
                                                    "alias" : "user_roles_designations_department.spec_attributes",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "userRolesDesignationsDepartment",
                                                  "label": "Add User Roles Designations Department",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/classcomponent?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select User Roles Designations Department",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "userRolesDesignationsDepartment", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "User Roles Designations Department",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "roleDesignationDepartmentId",
                                                        "label": "Role Designation Department Id",
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
                                                        "dynamicKey": "userRolesDesignationsDepartment_roleDesignationDepartmentId",
                                                        "selectServerUrl": "/roles_designations_department/dropdown?version=1.0",
                                                        "alias" : "user_roles_designations_department.role_designation_department_id"
                                                    },
                                                     {
                                                        "name": "rolesDesignationsDepartmentName",
                                                        "label": "Roles Designations DepartmentName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": false,
                                                        "hideInCreateForm": true,
                                                        "hideInViewForm": true,
                                                        "visible": true,
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": true,
                                                        "dynamicKey": "userRolesDesignationsDepartment_rolesDesignationsDepartmentName",
                                                        "selectServerUrl": "/roles_designations_department/dropdown?version=1.0",
                                                        "alias" : "user_roles_designations_department.roles_designations_departmentName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "userId",
                                                        "label": "User Id",
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
                                                        "dynamicKey": "userRolesDesignationsDepartment_userId",
                                                        "selectServerUrl": "/users/dropdown?version=1.0",
                                                        "alias" : "user_roles_designations_department.user_id"
                                                    },
                                                     {
                                                        "name": "usersName",
                                                        "label": "UsersName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": false,
                                                        "hideInCreateForm": true,
                                                        "hideInViewForm": true,
                                                        "visible": true,
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": true,
                                                        "dynamicKey": "userRolesDesignationsDepartment_usersName",
                                                        "selectServerUrl": "/users/dropdown?version=1.0",
                                                        "alias" : "user_roles_designations_department.usersName"
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
                                              },
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
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
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
                                                },
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
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "user_roles_designations_department.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_user_roles_designations_department"
                        }
                  ],
                  "colMapper": { 'classcomponent_componentId' : 'component_id',  'classcomponent_courseId' : 'course_id',  'classcomponent_componentType' : 'component_type',  'classcomponent_componentName' : 'component_name',  'classcomponent_weightage' : 'weightage',  'classcomponent_componentPolicy' : 'component_policy',  'classcomponent_status' : 'status',  'classcomponent_createdBy' : 'created_by',  'classcomponent_updatedBy' : 'updated_by',  'classcomponent_createdAt' : 'created_at',  'classcomponent_updatedAt' : 'updated_at',  'user_roles_designations_department_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'user_roles_designations_department_roleDesignationDepartmentId' : 'role_designation_department_id',  'user_roles_designations_department_userId' : 'user_id',  'user_roles_designations_department_specAttributes' : 'spec_attributes',  'user_roles_designations_department_startDate' : 'start_date',  'user_roles_designations_department_endDate' : 'end_date',  'user_roles_designations_department_createdBy' : 'created_by',  'user_roles_designations_department_updatedBy' : 'updated_by',  'user_roles_designations_department_status' : 'status',  'user_roles_designations_department_createdAt' : 'created_at',  'user_roles_designations_department_updatedAt' : 'updated_at'}
              };