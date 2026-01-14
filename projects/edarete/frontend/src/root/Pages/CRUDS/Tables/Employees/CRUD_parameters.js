export const parameters = {
                  "steps": [
                    
                        {
                            "title": "employees Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "employees",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Employees",
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
                                                    "name": "departmentId",
                                                    "label": "Department Id",
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
                                                    "dynamicKey": "employees_departmentId",
                                                    "alias" : "employees.department_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "personalDomainUrl",
                                                    "label": "Personal Domain Url",
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
                                                    "dynamicKey": "employees_personalDomainUrl",
                                                    "alias" : "employees.personal_domain_url",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "qualification",
                                                    "label": "Qualification",
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
                                                    "dynamicKey": "employees_qualification",
                                                    "alias" : "employees.qualification",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "salary",
                                                    "label": "Salary",
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
                                                    "dynamicKey": "employees_salary",
                                                    "alias" : "employees.salary",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "startDate",
                                                    "label": "Start Date",
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
                                                    "dynamicKey": "employees_startDate",
                                                    "alias" : "employees.start_date",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "endDate",
                                                    "label": "End Date",
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
                                                    "dynamicKey": "employees_endDate",
                                                    "alias" : "employees.end_date",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "employees",
                                                  "label": "Add Employees",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/employees?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Employees",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "employees", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Employees",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
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
                                                        "dynamicKey": "employees_urddId",
                                                        "selectServerUrl": "/user_roles_designations_department/dropdown?version=1.0",
                                                        "alias" : "employees.urdd_id"
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
                                                    "dynamicKey": "employees_createdAt",
                                                    "alias" : "employees.created_at"
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
                                                    "dynamicKey": "employees_updatedAt",
                                                    "alias" : "employees.updated_at"
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
                                                    "dynamicKey": "employees_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "employees.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_employees"
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
                                        "title": "Employees",
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
                                                 "selectServerUrl":"/grouped/cruds/employees?version=1.0",
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
                            "title": "courses Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "courses",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Employees",
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
                                                    "name": "courseSubDomainPrefix",
                                                    "label": "Course Sub Domain Prefix",
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
                                                    "dynamicKey": "courses_courseSubDomainPrefix",
                                                    "alias" : "courses.course_sub_domain_prefix",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "courses",
                                                  "label": "Add Courses",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/employees?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Courses",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "courses", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Courses",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "plannedCourseId",
                                                        "label": "Planned Course Id",
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
                                                        "dynamicKey": "courses_plannedCourseId",
                                                        "selectServerUrl": "/plannedcourses/dropdown?version=1.0",
                                                        "alias" : "courses.planned_course_id"
                                                    },
                                                     {
                                                        "name": "plannedcoursesName",
                                                        "label": "PlannedcoursesName",
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
                                                        "dynamicKey": "courses_plannedcoursesName",
                                                        "selectServerUrl": "/plannedcourses/dropdown?version=1.0",
                                                        "alias" : "courses.plannedcoursesName"
                                                    }
                                                    ,
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
                                                        "dynamicKey": "courses_cloid",
                                                        "selectServerUrl": "/clo/dropdown?version=1.0",
                                                        "alias" : "courses.cloid"
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
                                                        "dynamicKey": "courses_cloName",
                                                        "selectServerUrl": "/clo/dropdown?version=1.0",
                                                        "alias" : "courses.cloName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "teacherEmployeeId",
                                                        "label": "Teacher Employee Id",
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
                                                        "dynamicKey": "courses_teacherEmployeeId",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "courses.teacher_employee_id"
                                                    },
                                                     {
                                                        "name": "employeesName",
                                                        "label": "EmployeesName",
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
                                                        "dynamicKey": "courses_employeesName",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "courses.employeesName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "tassistEmployeeId",
                                                        "label": "Tassist Employee Id",
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
                                                        "dynamicKey": "courses_tassistEmployeeId",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "courses.tassist_employee_id"
                                                    },
                                                     {
                                                        "name": "employeesName",
                                                        "label": "EmployeesName",
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
                                                        "dynamicKey": "courses_employeesName",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "courses.employeesName"
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
                                                    "dynamicKey": "courses_createdAt",
                                                    "alias" : "courses.created_at"
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
                                                    "dynamicKey": "courses_updatedAt",
                                                    "alias" : "courses.updated_at"
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
                                                    "dynamicKey": "courses_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "courses.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_courses"
                        },
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
                                        "title": "Employees",
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
                                                    "dynamicKey": "departments_departmentName",
                                                    "alias" : "departments.department_name",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "departments",
                                                  "label": "Add Departments",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/employees?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Departments",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "departments", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Departments",
                                                  "childFields":[
                                                
                                                  
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
                                                    },
                                                     {
                                                        "name": "employeesName",
                                                        "label": "EmployeesName",
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
                                                        "dynamicKey": "departments_employeesName",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "departments.employeesName"
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
                                                    "dynamicKey": "departments_createdAt",
                                                    "alias" : "departments.created_at"
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
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "departments.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_departments"
                        },
                        {
                            "title": "domains Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "domains",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Employees",
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
                                                    "name": "domainName",
                                                    "label": "Domain Name",
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
                                                    "dynamicKey": "domains_domainName",
                                                    "alias" : "domains.domain_name",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "domains",
                                                  "label": "Add Domains",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/employees?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Domains",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "domains", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Domains",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "domainLeaderId",
                                                        "label": "Domain Leader Id",
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
                                                        "dynamicKey": "domains_domainLeaderId",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "domains.domain_leader_id"
                                                    },
                                                     {
                                                        "name": "employeesName",
                                                        "label": "EmployeesName",
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
                                                        "dynamicKey": "domains_employeesName",
                                                        "selectServerUrl": "/employees/dropdown?version=1.0",
                                                        "alias" : "domains.employeesName"
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
                                                    "dynamicKey": "domains_createdAt",
                                                    "alias" : "domains.created_at"
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
                                                    "dynamicKey": "domains_updatedAt",
                                                    "alias" : "domains.updated_at"
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
                                                    "dynamicKey": "domains_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "domains.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_domains"
                        }
                  ],
                  "colMapper": { 'employees_employeeId' : 'employee_id',  'employees_departmentId' : 'department_id',  'employees_personalDomainUrl' : 'personal_domain_url',  'employees_urddId' : 'urdd_id',  'employees_qualification' : 'qualification',  'employees_salary' : 'salary',  'employees_startDate' : 'start_date',  'employees_endDate' : 'end_date',  'employees_status' : 'status',  'employees_createdBy' : 'created_by',  'employees_updatedBy' : 'updated_by',  'employees_createdAt' : 'created_at',  'employees_updatedAt' : 'updated_at',  'user_roles_designations_department_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'user_roles_designations_department_roleDesignationDepartmentId' : 'role_designation_department_id',  'user_roles_designations_department_userId' : 'user_id',  'user_roles_designations_department_specAttributes' : 'spec_attributes',  'user_roles_designations_department_startDate' : 'start_date',  'user_roles_designations_department_endDate' : 'end_date',  'user_roles_designations_department_createdBy' : 'created_by',  'user_roles_designations_department_updatedBy' : 'updated_by',  'user_roles_designations_department_status' : 'status',  'user_roles_designations_department_createdAt' : 'created_at',  'user_roles_designations_department_updatedAt' : 'updated_at',  'courses_courseId' : 'course_id',  'courses_courseSubDomainPrefix' : 'course_sub_domain_prefix',  'courses_plannedCourseId' : 'planned_course_id',  'courses_cloid' : 'cloid',  'courses_teacherEmployeeId' : 'teacher_employee_id',  'courses_tassistEmployeeId' : 'tassist_employee_id',  'courses_status' : 'status',  'courses_createdBy' : 'created_by',  'courses_updatedBy' : 'updated_by',  'courses_createdAt' : 'created_at',  'courses_updatedAt' : 'updated_at',  'departments_departmentId' : 'department_id',  'departments_departmentName' : 'department_name',  'departments_employeeId' : 'employee_id',  'departments_status' : 'status',  'departments_createdBy' : 'created_by',  'departments_updatedBy' : 'updated_by',  'departments_createdAt' : 'created_at',  'departments_updatedAt' : 'updated_at',  'domains_domainId' : 'domain_id',  'domains_domainName' : 'domain_name',  'domains_domainLeaderId' : 'domain_leader_id',  'domains_status' : 'status',  'domains_createdBy' : 'created_by',  'domains_updatedBy' : 'updated_by',  'domains_createdAt' : 'created_at',  'domains_updatedAt' : 'updated_at'}
              };