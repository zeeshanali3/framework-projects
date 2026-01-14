/* Frontend Parameters for table: courses */
        
            export const parameters = {
                "steps": [
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
                            "title": "Courses",
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
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "courses_courseSubDomainPrefix",
                "alias" : "courses.course_sub_domain_prefix",
                "options": []

            }
            ,
            {
                "name": "plannedCourseId",
                "label": "Planned Course Id",
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
                "selectServerUrl":"/plannedcourses/dropdown?version=1.0",
                "dynamicKey": "courses_plannedCourseId",
                "alias" : "courses.planned_course_id",
                "options": []

            }
            ,
            {
                "name": "cloid",
                "label": "Cloid",
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
                "selectServerUrl":"/clo/dropdown?version=1.0",
                "dynamicKey": "courses_cloid",
                "alias" : "courses.cloid",
                "options": []

            }
            ,
            {
                "name": "teacherEmployeeId",
                "label": "Teacher Employee Id",
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
                "selectServerUrl":"/employees/dropdown?version=1.0",
                "dynamicKey": "courses_teacherEmployeeId",
                "alias" : "courses.teacher_employee_id",
                "options": []

            }
            ,
            {
                "name": "tassistEmployeeId",
                "label": "Tassist Employee Id",
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
                "selectServerUrl":"/employees/dropdown?version=1.0",
                "dynamicKey": "courses_tassistEmployeeId",
                "alias" : "courses.tassist_employee_id",
                "options": []

            }  
        
            ,
            {
                "name": "courseName",
                "label": "Course Name",
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
                "dynamicKey": "plannedcourses_courseName",
                "alias" : "plannedcourses.course_name",
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
                  "dynamicKey": "courses_createdAt",
                  "alias" : "courses.created_at"
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
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "courses.status"
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
                "colMapper": "{ 'courses_courseId' : 'course_id',  'courses_courseSubDomainPrefix' : 'course_sub_domain_prefix',  'courses_plannedCourseId' : 'planned_course_id',  'courses_cloid' : 'cloid',  'courses_teacherEmployeeId' : 'teacher_employee_id',  'courses_tassistEmployeeId' : 'tassist_employee_id',  'courses_status' : 'status',  'courses_createdBy' : 'created_by',  'courses_updatedBy' : 'updated_by',  'courses_createdAt' : 'created_at',  'courses_updatedAt' : 'updated_at',  'courses_courseName' : 'course_name'}"
                };