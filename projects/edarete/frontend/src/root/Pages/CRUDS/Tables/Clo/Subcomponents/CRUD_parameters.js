export const parameters = {
                  "steps": [
                    
                        {
                            "title": "subcomponents Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "subcomponents",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Subcomponents",
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
                                                    "name": "subComponentNum",
                                                    "label": "Sub Component Num",
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
                                                    "dynamicKey": "subcomponents_subComponentNum",
                                                    "alias" : "subcomponents.sub_component_num",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "text",
                                                    "label": "Text",
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
                                                    "dynamicKey": "subcomponents_text",
                                                    "alias" : "subcomponents.text",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "totalMarks",
                                                    "label": "Total Marks",
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
                                                    "dynamicKey": "subcomponents_totalMarks",
                                                    "alias" : "subcomponents.total_marks",
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
                                                    "dynamicKey": "subcomponents_weightage",
                                                    "alias" : "subcomponents.weightage",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "isPublic",
                                                    "label": "Is Public",
                                                    "title": "",
                                                    "type": "checkbox",
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
                                                    "dynamicKey": "subcomponents_isPublic",
                                                    "alias" : "subcomponents.is_public",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "subcomponents",
                                                  "label": "Add Subcomponents",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Subcomponents",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "subcomponents", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Subcomponents",
                                                  "childFields":[
                                                
                                                  



 
                                                ,
                                              {
                                                  "name": "date",
                                                  "label": "Date",
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
                                                  "dynamicKey": "subcomponents_date"
                                              },
                                                ,
                                              {
                                                  "name": "startTime",
                                                  "label": "Start Time",
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
                                                  "dynamicKey": "subcomponents_startTime"
                                              },
                                                ,
                                              {
                                                  "name": "endTime",
                                                  "label": "End Time",
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
                                                  "dynamicKey": "subcomponents_endTime"
                                              }
                                                ]
                                              }
                                            
                                                    ,
                                                    {
                                                        "name": "componentId",
                                                        "label": "Component Id",
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
                                                        "dynamicKey": "subcomponents_componentId",
                                                        "selectServerUrl": "/classcomponent/dropdown?version=1.0",
                                                        "alias" : "subcomponents.component_id"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "urddId",
                                                        "label": "Urdd Id",
                                                        "title": "",
                                                        "type": "select",
                                                    "required": true,
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
                                                        "dynamicKey": "subcomponents_urddId",
                                                        "selectServerUrl": "/user_roles_designations_department/dropdown?version=1.0",
                                                        "alias" : "subcomponents.urdd_id"
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
                                                    "dynamicKey": "subcomponents_createdAt",
                                                    "alias" : "subcomponents.created_at"
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
                                                    "dynamicKey": "subcomponents_updatedAt",
                                                    "alias" : "subcomponents.updated_at"
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
                                                    "dynamicKey": "subcomponents_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "subcomponents.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_subcomponents"
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
                                        "title": "Subcomponents",
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
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
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
                        },
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
                                        "title": "Subcomponents",
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
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
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
                                            
                                                    ,
                                                    {
                                                        "name": "courseId",
                                                        "label": "Course Id",
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
                                                        "dynamicKey": "classcomponent_courseId",
                                                        "selectServerUrl": "/courses/dropdown?version=1.0",
                                                        "alias" : "classcomponent.course_id"
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
                                        "title": "Subcomponents",
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
                                                    "dynamicKey": "courseleaderboardsubcomponents_subcomponentPercentage",
                                                    "alias" : "courseleaderboardsubcomponents.subcomponent_percentage",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "courseleaderboardsubcomponents",
                                                  "label": "Add Courseleaderboardsubcomponents",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Courseleaderboardsubcomponents",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "courseleaderboardsubcomponents", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Courseleaderboardsubcomponents",
                                                  "childFields":[
                                                
                                                  
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
                                                    },
                                                     {
                                                        "name": "courseleaderboardsName",
                                                        "label": "CourseleaderboardsName",
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
                                                        "dynamicKey": "courseleaderboardsubcomponents_courseleaderboardsName",
                                                        "selectServerUrl": "/courseleaderboards/dropdown?version=1.0",
                                                        "alias" : "courseleaderboardsubcomponents.courseleaderboardsName"
                                                    }
                                                    ,
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
                                                    },
                                                     {
                                                        "name": "subcomponentsName",
                                                        "label": "SubcomponentsName",
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
                                                        "dynamicKey": "courseleaderboardsubcomponents_subcomponentsName",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "courseleaderboardsubcomponents.subcomponentsName"
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
                                                    "dynamicKey": "courseleaderboardsubcomponents_createdAt",
                                                    "alias" : "courseleaderboardsubcomponents.created_at"
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
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "courseleaderboardsubcomponents.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_courseleaderboardsubcomponents"
                        },
                        {
                            "title": "lecturesattendance Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "lecturesattendance",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Subcomponents",
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
                                                    "name": "isPresent",
                                                    "label": "Is Present",
                                                    "title": "",
                                                    "type": "checkbox",
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
                                                    "dynamicKey": "lecturesattendance_isPresent",
                                                    "alias" : "lecturesattendance.is_present",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "lecturesattendance",
                                                  "label": "Add Lecturesattendance",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Lecturesattendance",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "lecturesattendance", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Lecturesattendance",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "enrollementId",
                                                        "label": "Enrollement Id",
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
                                                        "dynamicKey": "lecturesattendance_enrollementId",
                                                        "selectServerUrl": "/enrollements/dropdown?version=1.0",
                                                        "alias" : "lecturesattendance.enrollement_id"
                                                    },
                                                     {
                                                        "name": "enrollementsName",
                                                        "label": "EnrollementsName",
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
                                                        "dynamicKey": "lecturesattendance_enrollementsName",
                                                        "selectServerUrl": "/enrollements/dropdown?version=1.0",
                                                        "alias" : "lecturesattendance.enrollementsName"
                                                    }
                                                    ,
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
                                                        "dynamicKey": "lecturesattendance_subComponentId",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "lecturesattendance.sub_component_id"
                                                    },
                                                     {
                                                        "name": "subcomponentsName",
                                                        "label": "SubcomponentsName",
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
                                                        "dynamicKey": "lecturesattendance_subcomponentsName",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "lecturesattendance.subcomponentsName"
                                                    }
                                                    



 
                                                ,
                                              {
                                                  "name": "date",
                                                  "label": "Date",
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
                                                  "dynamicKey": "lecturesattendance_date"
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
                                                    "dynamicKey": "lecturesattendance_createdAt",
                                                    "alias" : "lecturesattendance.created_at"
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
                                                    "dynamicKey": "lecturesattendance_updatedAt",
                                                    "alias" : "lecturesattendance.updated_at"
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
                                                    "dynamicKey": "lecturesattendance_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "lecturesattendance.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_lecturesattendance"
                        },
                        {
                            "title": "lecturetopics Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "lecturetopics",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Subcomponents",
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
                                                    "name": "topicName",
                                                    "label": "Topic Name",
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
                                                    "dynamicKey": "lecturetopics_topicName",
                                                    "alias" : "lecturetopics.topic_name",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "description",
                                                    "label": "Description",
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
                                                    "dynamicKey": "lecturetopics_description",
                                                    "alias" : "lecturetopics.description",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "lecturetopics",
                                                  "label": "Add Lecturetopics",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Lecturetopics",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "lecturetopics", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Lecturetopics",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "subComponentId",
                                                        "label": "Sub Component Id",
                                                        "title": "",
                                                        "type": "select",
                                                    "required": true,
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
                                                        "dynamicKey": "lecturetopics_subComponentId",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "lecturetopics.sub_component_id"
                                                    },
                                                     {
                                                        "name": "subcomponentsName",
                                                        "label": "SubcomponentsName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": true,
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
                                                        "dynamicKey": "lecturetopics_subcomponentsName",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "lecturetopics.subcomponentsName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "bookId",
                                                        "label": "Book Id",
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
                                                        "dynamicKey": "lecturetopics_bookId",
                                                        "selectServerUrl": "/books/dropdown?version=1.0",
                                                        "alias" : "lecturetopics.book_id"
                                                    },
                                                     {
                                                        "name": "booksName",
                                                        "label": "BooksName",
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
                                                        "dynamicKey": "lecturetopics_booksName",
                                                        "selectServerUrl": "/books/dropdown?version=1.0",
                                                        "alias" : "lecturetopics.booksName"
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
                                                    "dynamicKey": "lecturetopics_createdAt",
                                                    "alias" : "lecturetopics.created_at"
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
                                                    "dynamicKey": "lecturetopics_updatedAt",
                                                    "alias" : "lecturetopics.updated_at"
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
                                                    "dynamicKey": "lecturetopics_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "lecturetopics.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_lecturetopics"
                        },
                        {
                            "title": "questions Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "questions",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Subcomponents",
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
                                                    "name": "questionNum",
                                                    "label": "Question Num",
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
                                                    "dynamicKey": "questions_questionNum",
                                                    "alias" : "questions.question_num",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "description",
                                                    "label": "Description",
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
                                                    "dynamicKey": "questions_description",
                                                    "alias" : "questions.description",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "questionMarks",
                                                    "label": "Question Marks",
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
                                                    "dynamicKey": "questions_questionMarks",
                                                    "alias" : "questions.question_marks",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "questions",
                                                  "label": "Add Questions",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Questions",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "questions", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Questions",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "cloid",
                                                        "label": "Cloid",
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
                                                        "dynamicKey": "questions_cloid",
                                                        "selectServerUrl": "/clo/dropdown?version=1.0",
                                                        "alias" : "questions.cloid"
                                                    },
                                                     {
                                                        "name": "cloName",
                                                        "label": "CloName",
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
                                                        "dynamicKey": "questions_cloName",
                                                        "selectServerUrl": "/clo/dropdown?version=1.0",
                                                        "alias" : "questions.cloName"
                                                    }
                                                    ,
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
                                                        "dynamicKey": "questions_subComponentId",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "questions.sub_component_id"
                                                    },
                                                     {
                                                        "name": "subcomponentsName",
                                                        "label": "SubcomponentsName",
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
                                                        "dynamicKey": "questions_subcomponentsName",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "questions.subcomponentsName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "lecturesTopicId",
                                                        "label": "Lectures Topic Id",
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
                                                        "dynamicKey": "questions_lecturesTopicId",
                                                        "selectServerUrl": "/lecturetopics/dropdown?version=1.0",
                                                        "alias" : "questions.lectures_topic_id"
                                                    },
                                                     {
                                                        "name": "lecturetopicsName",
                                                        "label": "LecturetopicsName",
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
                                                        "dynamicKey": "questions_lecturetopicsName",
                                                        "selectServerUrl": "/lecturetopics/dropdown?version=1.0",
                                                        "alias" : "questions.lecturetopicsName"
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
                                                    "dynamicKey": "questions_createdAt",
                                                    "alias" : "questions.created_at"
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
                                                    "dynamicKey": "questions_updatedAt",
                                                    "alias" : "questions.updated_at"
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
                                                    "dynamicKey": "questions_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "questions.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_questions"
                        },
                        {
                            "title": "subcomponentmarks Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "subcomponentmarks",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Subcomponents",
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
                                                    "name": "obtainedMarks",
                                                    "label": "Obtained Marks",
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
                                                    "dynamicKey": "subcomponentmarks_obtainedMarks",
                                                    "alias" : "subcomponentmarks.obtained_marks",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "outOfMarks",
                                                    "label": "Out Of Marks",
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
                                                    "dynamicKey": "subcomponentmarks_outOfMarks",
                                                    "alias" : "subcomponentmarks.out_of_marks",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "subcomponentmarks",
                                                  "label": "Add Subcomponentmarks",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/subcomponents?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Subcomponentmarks",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "subcomponentmarks", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Subcomponentmarks",
                                                  "childFields":[
                                                
                                                  
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
                                                        "dynamicKey": "subcomponentmarks_subComponentId",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "subcomponentmarks.sub_component_id"
                                                    },
                                                     {
                                                        "name": "subcomponentsName",
                                                        "label": "SubcomponentsName",
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
                                                        "dynamicKey": "subcomponentmarks_subcomponentsName",
                                                        "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                                                        "alias" : "subcomponentmarks.subcomponentsName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "enrollmentId",
                                                        "label": "Enrollment Id",
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
                                                        "dynamicKey": "subcomponentmarks_enrollmentId",
                                                        "selectServerUrl": "/enrollements/dropdown?version=1.0",
                                                        "alias" : "subcomponentmarks.enrollment_id"
                                                    },
                                                     {
                                                        "name": "enrollementsName",
                                                        "label": "EnrollementsName",
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
                                                        "dynamicKey": "subcomponentmarks_enrollementsName",
                                                        "selectServerUrl": "/enrollements/dropdown?version=1.0",
                                                        "alias" : "subcomponentmarks.enrollementsName"
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
                                                    "dynamicKey": "subcomponentmarks_createdAt",
                                                    "alias" : "subcomponentmarks.created_at"
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
                                                    "dynamicKey": "subcomponentmarks_updatedAt",
                                                    "alias" : "subcomponentmarks.updated_at"
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
                                                    "dynamicKey": "subcomponentmarks_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "subcomponentmarks.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_subcomponentmarks"
                        }
                  ],
                  "colMapper": { 'subcomponents_subComponentId' : 'sub_component_id',  'subcomponents_componentId' : 'component_id',  'subcomponents_subComponentNum' : 'sub_component_num',  'subcomponents_text' : 'text',  'subcomponents_urddId' : 'urdd_id',  'subcomponents_date' : 'date',  'subcomponents_startTime' : 'start_time',  'subcomponents_endTime' : 'end_time',  'subcomponents_totalMarks' : 'total_marks',  'subcomponents_weightage' : 'weightage',  'subcomponents_isPublic' : 'is_public',  'subcomponents_status' : 'status',  'subcomponents_createdBy' : 'created_by',  'subcomponents_updatedBy' : 'updated_by',  'subcomponents_createdAt' : 'created_at',  'subcomponents_updatedAt' : 'updated_at',  'user_roles_designations_department_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'user_roles_designations_department_roleDesignationDepartmentId' : 'role_designation_department_id',  'user_roles_designations_department_userId' : 'user_id',  'user_roles_designations_department_specAttributes' : 'spec_attributes',  'user_roles_designations_department_startDate' : 'start_date',  'user_roles_designations_department_endDate' : 'end_date',  'user_roles_designations_department_createdBy' : 'created_by',  'user_roles_designations_department_updatedBy' : 'updated_by',  'user_roles_designations_department_status' : 'status',  'user_roles_designations_department_createdAt' : 'created_at',  'user_roles_designations_department_updatedAt' : 'updated_at',  'classcomponent_componentId' : 'component_id',  'classcomponent_courseId' : 'course_id',  'classcomponent_componentType' : 'component_type',  'classcomponent_componentName' : 'component_name',  'classcomponent_weightage' : 'weightage',  'classcomponent_componentPolicy' : 'component_policy',  'classcomponent_status' : 'status',  'classcomponent_createdBy' : 'created_by',  'classcomponent_updatedBy' : 'updated_by',  'classcomponent_createdAt' : 'created_at',  'classcomponent_updatedAt' : 'updated_at',  'courseleaderboardsubcomponents_courseLeaderboardSubcomponentId' : 'course_leaderboard_subcomponent_id',  'courseleaderboardsubcomponents_courseLeaderboardId' : 'course_leaderboard_id',  'courseleaderboardsubcomponents_subComponentId' : 'sub_component_id',  'courseleaderboardsubcomponents_subcomponentPercentage' : 'subcomponent_percentage',  'courseleaderboardsubcomponents_status' : 'status',  'courseleaderboardsubcomponents_createdBy' : 'created_by',  'courseleaderboardsubcomponents_updatedBy' : 'updated_by',  'courseleaderboardsubcomponents_createdAt' : 'created_at',  'courseleaderboardsubcomponents_updatedAt' : 'updated_at',  'lecturesattendance_attendanceId' : 'attendance_id',  'lecturesattendance_enrollementId' : 'enrollement_id',  'lecturesattendance_date' : 'date',  'lecturesattendance_isPresent' : 'is_present',  'lecturesattendance_subComponentId' : 'sub_component_id',  'lecturesattendance_status' : 'status',  'lecturesattendance_createdBy' : 'created_by',  'lecturesattendance_updatedBy' : 'updated_by',  'lecturesattendance_createdAt' : 'created_at',  'lecturesattendance_updatedAt' : 'updated_at',  'lecturetopics_lecturesTopicId' : 'lectures_topic_id',  'lecturetopics_subComponentId' : 'sub_component_id',  'lecturetopics_topicName' : 'topic_name',  'lecturetopics_description' : 'description',  'lecturetopics_bookId' : 'book_id',  'lecturetopics_status' : 'status',  'lecturetopics_createdBy' : 'created_by',  'lecturetopics_updatedBy' : 'updated_by',  'lecturetopics_createdAt' : 'created_at',  'lecturetopics_updatedAt' : 'updated_at',  'questions_questionId' : 'question_id',  'questions_cloid' : 'cloid',  'questions_subComponentId' : 'sub_component_id',  'questions_questionNum' : 'question_num',  'questions_description' : 'description',  'questions_questionMarks' : 'question_marks',  'questions_lecturesTopicId' : 'lectures_topic_id',  'questions_status' : 'status',  'questions_createdBy' : 'created_by',  'questions_updatedBy' : 'updated_by',  'questions_createdAt' : 'created_at',  'questions_updatedAt' : 'updated_at',  'subcomponentmarks_subComponentMarkId' : 'sub_component_mark_id',  'subcomponentmarks_subComponentId' : 'sub_component_id',  'subcomponentmarks_enrollmentId' : 'enrollment_id',  'subcomponentmarks_obtainedMarks' : 'obtained_marks',  'subcomponentmarks_outOfMarks' : 'out_of_marks',  'subcomponentmarks_status' : 'status',  'subcomponentmarks_createdBy' : 'created_by',  'subcomponentmarks_updatedBy' : 'updated_by',  'subcomponentmarks_createdAt' : 'created_at',  'subcomponentmarks_updatedAt' : 'updated_at'}
              };