export const parameters = {
                  "steps": [
                    
                        {
                            "title": "plannedcourses Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "plannedcourses",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Plannedcourses",
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
                                                    "name": "courseName",
                                                    "label": "Course Name",
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
                                                    "dynamicKey": "plannedcourses_courseName",
                                                    "alias" : "plannedcourses.course_name",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "creditHours",
                                                    "label": "Credit Hours",
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
                                                    "dynamicKey": "plannedcourses_creditHours",
                                                    "alias" : "plannedcourses.credit_hours",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "type",
                                                    "label": "Type",
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
                                                    "dynamicKey": "plannedcourses_type",
                                                    "alias" : "plannedcourses.type",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "requiredLectures",
                                                    "label": "Required Lectures",
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
                                                    "dynamicKey": "plannedcourses_requiredLectures",
                                                    "alias" : "plannedcourses.required_lectures",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "courseDesc",
                                                    "label": "Course Desc",
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
                                                    "dynamicKey": "plannedcourses_courseDesc",
                                                    "alias" : "plannedcourses.course_desc",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "courseObj",
                                                    "label": "Course Obj",
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
                                                    "dynamicKey": "plannedcourses_courseObj",
                                                    "alias" : "plannedcourses.course_obj",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "image",
                                                    "label": "Image",
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
                                                    "dynamicKey": "plannedcourses_image",
                                                    "alias" : "plannedcourses.image",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "plannedcourses",
                                                  "label": "Add Plannedcourses",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/plannedcourses?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Plannedcourses",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "plannedcourses", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Plannedcourses",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                                    ,
                                                    {
                                                        "name": "semesterId",
                                                        "label": "Semester Id",
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
                                                        "dynamicKey": "plannedcourses_semesterId",
                                                        "selectServerUrl": "/semesters/dropdown?version=1.0",
                                                        "alias" : "plannedcourses.semester_id"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "semesterId",
                                                        "label": "Semester Id",
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
                                                        "dynamicKey": "plannedcourses_semesterId",
                                                        "selectServerUrl": "/semesters/dropdown?version=1.0",
                                                        "alias" : "plannedcourses.semester_id"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "domainId",
                                                        "label": "Domain Id",
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
                                                        "dynamicKey": "plannedcourses_domainId",
                                                        "selectServerUrl": "/domains/dropdown?version=1.0",
                                                        "alias" : "plannedcourses.domain_id"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "domainId",
                                                        "label": "Domain Id",
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
                                                        "dynamicKey": "plannedcourses_domainId",
                                                        "selectServerUrl": "/domains/dropdown?version=1.0",
                                                        "alias" : "plannedcourses.domain_id"
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
                                                    "dynamicKey": "plannedcourses_createdAt",
                                                    "alias" : "plannedcourses.created_at"
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
                                                    "dynamicKey": "plannedcourses_updatedAt",
                                                    "alias" : "plannedcourses.updated_at"
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
                                                    "dynamicKey": "plannedcourses_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "plannedcourses.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_plannedcourses"
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
                                        "title": "Plannedcourses",
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
                                                 "selectServerUrl":"/grouped/cruds/plannedcourses?version=1.0",
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
                        },
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
                                        "title": "Plannedcourses",
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
                                                    "dynamicKey": "semesters_semesterNum",
                                                    "alias" : "semesters.semester_num",
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
                                                    "dynamicKey": "semesters_startDate",
                                                    "alias" : "semesters.start_date",
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
                                                    "dynamicKey": "semesters_endDate",
                                                    "alias" : "semesters.end_date",
                                                    "options": "[]"
  
                                                },
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
                                                    "dynamicKey": "semesters_semesterName",
                                                    "alias" : "semesters.semester_name",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "semesters",
                                                  "label": "Add Semesters",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/plannedcourses?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Semesters",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "semesters", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Semesters",
                                                  "childFields":[
                                                
                                                  
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
                                                    },
                                                     {
                                                        "name": "programsName",
                                                        "label": "ProgramsName",
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
                                                        "dynamicKey": "semesters_programsName",
                                                        "selectServerUrl": "/programs/dropdown?version=1.0",
                                                        "alias" : "semesters.programsName"
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
                                                    "dynamicKey": "semesters_createdAt",
                                                    "alias" : "semesters.created_at"
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
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "semesters.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_semesters"
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
                                        "title": "Plannedcourses",
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
                                                 "selectServerUrl":"/grouped/cruds/plannedcourses?version=1.0",
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
                                        "title": "Plannedcourses",
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
                                                 "selectServerUrl":"/grouped/cruds/plannedcourses?version=1.0",
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
                            "title": "prereqs Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "prereqs",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Plannedcourses",
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
                                                  "type": "tableOfFields",
                                                  "name": "prereqs",
                                                  "label": "Add Prereqs",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/plannedcourses?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Prereqs",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "prereqs", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Prereqs",
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
                                                        "dynamicKey": "prereqs_plannedCourseId",
                                                        "selectServerUrl": "/plannedcourses/dropdown?version=1.0",
                                                        "alias" : "prereqs.planned_course_id"
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
                                                        "dynamicKey": "prereqs_plannedcoursesName",
                                                        "selectServerUrl": "/plannedcourses/dropdown?version=1.0",
                                                        "alias" : "prereqs.plannedcoursesName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "preReqCourseId",
                                                        "label": "Pre Req Course Id",
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
                                                        "dynamicKey": "prereqs_preReqCourseId",
                                                        "selectServerUrl": "/plannedcourses/dropdown?version=1.0",
                                                        "alias" : "prereqs.pre_req_course_id"
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
                                                        "dynamicKey": "prereqs_plannedcoursesName",
                                                        "selectServerUrl": "/plannedcourses/dropdown?version=1.0",
                                                        "alias" : "prereqs.plannedcoursesName"
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
                                                    "dynamicKey": "prereqs_createdAt",
                                                    "alias" : "prereqs.created_at"
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
                                                    "dynamicKey": "prereqs_updatedAt",
                                                    "alias" : "prereqs.updated_at"
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
                                                    "dynamicKey": "prereqs_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "prereqs.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_prereqs"
                        }
                  ],
                  "colMapper": { 'plannedcourses_plannedCourseId' : 'planned_course_id',  'plannedcourses_semesterId' : 'semester_id',  'plannedcourses_semesterId' : 'semester_id',  'plannedcourses_domainId' : 'domain_id',  'plannedcourses_domainId' : 'domain_id',  'plannedcourses_courseName' : 'course_name',  'plannedcourses_creditHours' : 'credit_hours',  'plannedcourses_type' : 'type',  'plannedcourses_requiredLectures' : 'required_lectures',  'plannedcourses_courseDesc' : 'course_desc',  'plannedcourses_courseObj' : 'course_obj',  'plannedcourses_image' : 'image',  'plannedcourses_status' : 'status',  'plannedcourses_createdBy' : 'created_by',  'plannedcourses_updatedBy' : 'updated_by',  'plannedcourses_createdAt' : 'created_at',  'plannedcourses_updatedAt' : 'updated_at',  'domains_domainId' : 'domain_id',  'domains_domainName' : 'domain_name',  'domains_domainLeaderId' : 'domain_leader_id',  'domains_status' : 'status',  'domains_createdBy' : 'created_by',  'domains_updatedBy' : 'updated_by',  'domains_createdAt' : 'created_at',  'domains_updatedAt' : 'updated_at',  'semesters_semesterId' : 'semester_id',  'semesters_programId' : 'program_id',  'semesters_semesterNum' : 'semester_num',  'semesters_startDate' : 'start_date',  'semesters_endDate' : 'end_date',  'semesters_semesterName' : 'semester_name',  'semesters_status' : 'status',  'semesters_createdBy' : 'created_by',  'semesters_updatedBy' : 'updated_by',  'semesters_createdAt' : 'created_at',  'semesters_updatedAt' : 'updated_at',  'user_roles_designations_department_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'user_roles_designations_department_roleDesignationDepartmentId' : 'role_designation_department_id',  'user_roles_designations_department_userId' : 'user_id',  'user_roles_designations_department_specAttributes' : 'spec_attributes',  'user_roles_designations_department_startDate' : 'start_date',  'user_roles_designations_department_endDate' : 'end_date',  'user_roles_designations_department_createdBy' : 'created_by',  'user_roles_designations_department_updatedBy' : 'updated_by',  'user_roles_designations_department_status' : 'status',  'user_roles_designations_department_createdAt' : 'created_at',  'user_roles_designations_department_updatedAt' : 'updated_at',  'courses_courseId' : 'course_id',  'courses_courseSubDomainPrefix' : 'course_sub_domain_prefix',  'courses_plannedCourseId' : 'planned_course_id',  'courses_cloid' : 'cloid',  'courses_teacherEmployeeId' : 'teacher_employee_id',  'courses_tassistEmployeeId' : 'tassist_employee_id',  'courses_status' : 'status',  'courses_createdBy' : 'created_by',  'courses_updatedBy' : 'updated_by',  'courses_createdAt' : 'created_at',  'courses_updatedAt' : 'updated_at',  'prereqs_preReqsId' : 'pre_reqs_id',  'prereqs_plannedCourseId' : 'planned_course_id',  'prereqs_preReqCourseId' : 'pre_req_course_id',  'prereqs_status' : 'status',  'prereqs_createdBy' : 'created_by',  'prereqs_updatedBy' : 'updated_by',  'prereqs_createdAt' : 'created_at',  'prereqs_updatedAt' : 'updated_at'}
              };