export const parameters = {
                  "steps": [
                    
                        {
                            "title": "coursefeedbackform Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "coursefeedbackform",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Coursefeedbackform",
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
                                                    "required": true,
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
                                                    "dynamicKey": "coursefeedbackform_courseId",
                                                    "alias" : "coursefeedbackform.course_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "feedbackFormId",
                                                    "label": "Feedback Form Id",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "coursefeedbackform_feedbackFormId",
                                                    "alias" : "coursefeedbackform.feedback_form_id",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "coursefeedbackform",
                                                  "label": "Add Coursefeedbackform",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/coursefeedbackform?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Coursefeedbackform",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "coursefeedbackform", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Coursefeedbackform",
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
                                                    "dynamicKey": "coursefeedbackform_createdAt",
                                                    "alias" : "coursefeedbackform.created_at"
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
                                                    "dynamicKey": "coursefeedbackform_updatedAt",
                                                    "alias" : "coursefeedbackform.updated_at"
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
                                                    "dynamicKey": "coursefeedbackform_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "coursefeedbackform.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_coursefeedbackform"
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
                                        "title": "Coursefeedbackform",
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
                                                 "selectServerUrl":"/grouped/cruds/coursefeedbackform?version=1.0",
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
                  "colMapper": { 'coursefeedbackform_courseFeedBackFormId' : 'course_feed_back_form_id',  'coursefeedbackform_courseId' : 'course_id',  'coursefeedbackform_feedbackFormId' : 'feedback_form_id',  'coursefeedbackform_status' : 'status',  'coursefeedbackform_createdBy' : 'created_by',  'coursefeedbackform_updatedBy' : 'updated_by',  'coursefeedbackform_createdAt' : 'created_at',  'coursefeedbackform_updatedAt' : 'updated_at',  'user_roles_designations_department_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'user_roles_designations_department_roleDesignationDepartmentId' : 'role_designation_department_id',  'user_roles_designations_department_userId' : 'user_id',  'user_roles_designations_department_specAttributes' : 'spec_attributes',  'user_roles_designations_department_startDate' : 'start_date',  'user_roles_designations_department_endDate' : 'end_date',  'user_roles_designations_department_createdBy' : 'created_by',  'user_roles_designations_department_updatedBy' : 'updated_by',  'user_roles_designations_department_status' : 'status',  'user_roles_designations_department_createdAt' : 'created_at',  'user_roles_designations_department_updatedAt' : 'updated_at'}
              };