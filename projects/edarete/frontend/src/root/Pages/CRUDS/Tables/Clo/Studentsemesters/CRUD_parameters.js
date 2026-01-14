export const parameters = {
                  "steps": [
                    
                        {
                            "title": "studentsemesters Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "studentsemesters",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Studentsemesters",
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
                                                    "name": "studentUserId",
                                                    "label": "Student User Id",
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
                                                    "dynamicKey": "studentsemesters_studentUserId",
                                                    "alias" : "studentsemesters.student_user_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "semesterId",
                                                    "label": "Semester Id",
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
                                                    "dynamicKey": "studentsemesters_semesterId",
                                                    "alias" : "studentsemesters.semester_id",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "studentsemesters",
                                                  "label": "Add Studentsemesters",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/studentsemesters?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Studentsemesters",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "studentsemesters", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Studentsemesters",
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
                                                    "dynamicKey": "studentsemesters_createdAt",
                                                    "alias" : "studentsemesters.created_at"
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
                                                    "dynamicKey": "studentsemesters_updatedAt",
                                                    "alias" : "studentsemesters.updated_at"
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
                                                    "dynamicKey": "studentsemesters_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "studentsemesters.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_studentsemesters"
                        }
                  ],
                  "colMapper": { 'studentsemesters_studentSemesterId' : 'student_semester_id',  'studentsemesters_studentUserId' : 'student_user_id',  'studentsemesters_semesterId' : 'semester_id',  'studentsemesters_status' : 'status',  'studentsemesters_createdBy' : 'created_by',  'studentsemesters_updatedBy' : 'updated_by',  'studentsemesters_createdAt' : 'created_at',  'studentsemesters_updatedAt' : 'updated_at'}
              };