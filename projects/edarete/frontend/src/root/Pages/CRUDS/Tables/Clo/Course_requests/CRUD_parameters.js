/* Frontend Parameters for table: course_requests */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "courseRequests Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "courseRequests",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Course Requests",
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
                    "name": "courseId",
                    "label": "Course Id",
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
                    "dynamicKey": "courseRequests_courseId",
                    "selectServerUrl": "/courses/dropdown?version=1.0",
                    "alias" : "course_requests.course_id"
                }
                
                ,
                {
                    "name": "studentUrddId",
                    "label": "Student Urdd Id",
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
                    "dynamicKey": "courseRequests_studentUrddId",
                    "selectServerUrl": "/user_roles_designations_department/dropdown?version=1.0",
                    "alias" : "course_requests.student_urdd_id"
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
                "colMapper": "{ 'courseRequests_courseRequestId' : 'course_request_id',  'courseRequests_courseId' : 'course_id',  'courseRequests_studentUrddId' : 'student_urdd_id'}"
                };