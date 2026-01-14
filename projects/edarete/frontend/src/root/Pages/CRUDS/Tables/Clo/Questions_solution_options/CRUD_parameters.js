export const parameters = {
                  "steps": [
                    
                        {
                            "title": "questions_solution_options Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "questionsSolutionOptions",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Questions Solution Options",
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
                                                    "dynamicKey": "questionsSolutionOptions_description",
                                                    "alias" : "questions_solution_options.description",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "optionNumber",
                                                    "label": "Option Number",
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
                                                    "dynamicKey": "questionsSolutionOptions_optionNumber",
                                                    "alias" : "questions_solution_options.option_number",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "correctOption",
                                                    "label": "Correct Option",
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
                                                    "dynamicKey": "questionsSolutionOptions_correctOption",
                                                    "alias" : "questions_solution_options.correct_option",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "questionsSolutionOptions",
                                                  "label": "Add Questions Solution Options",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/questions_solution_options?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Questions Solution Options",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "questionsSolutionOptions", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Questions Solution Options",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                                    ,
                                                    {
                                                        "name": "questionId",
                                                        "label": "Question Id",
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
                                                        "dynamicKey": "questionsSolutionOptions_questionId",
                                                        "selectServerUrl": "/questions/dropdown?version=1.0",
                                                        "alias" : "questions_solution_options.question_id"
                                                    }
                                                    
                                           
                                               ]}
    
                                            
                                              
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_questions_solution_options"
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
                                        "title": "Questions Solution Options",
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
                                                 "selectServerUrl":"/grouped/cruds/questions_solution_options?version=1.0",
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
                            "title": "question_answers_submitted Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "questionAnswersSubmitted",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Questions Solution Options",
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
                                                    "dynamicKey": "questionAnswersSubmitted_description",
                                                    "alias" : "question_answers_submitted.description",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "marksObtained",
                                                    "label": "Marks Obtained",
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
                                                    "dynamicKey": "questionAnswersSubmitted_marksObtained",
                                                    "alias" : "question_answers_submitted.marks_obtained",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "questionAnswersSubmitted",
                                                  "label": "Add Question Answers Submitted",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/questions_solution_options?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Question Answers Submitted",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "questionAnswersSubmitted", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Question Answers Submitted",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "urdd",
                                                        "label": "Urdd",
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
                                                        "dynamicKey": "questionAnswersSubmitted_urdd",
                                                        "selectServerUrl": "/user_roles_designations_department/dropdown?version=1.0",
                                                        "alias" : "question_answers_submitted.urdd"
                                                    },
                                                     {
                                                        "name": "userRolesDesignationsDepartmentName",
                                                        "label": "User Roles Designations DepartmentName",
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
                                                        "dynamicKey": "questionAnswersSubmitted_userRolesDesignationsDepartmentName",
                                                        "selectServerUrl": "/user_roles_designations_department/dropdown?version=1.0",
                                                        "alias" : "question_answers_submitted.user_roles_designations_departmentName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "questionId",
                                                        "label": "Question Id",
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
                                                        "dynamicKey": "questionAnswersSubmitted_questionId",
                                                        "selectServerUrl": "/questions/dropdown?version=1.0",
                                                        "alias" : "question_answers_submitted.question_id"
                                                    },
                                                     {
                                                        "name": "questionsName",
                                                        "label": "QuestionsName",
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
                                                        "dynamicKey": "questionAnswersSubmitted_questionsName",
                                                        "selectServerUrl": "/questions/dropdown?version=1.0",
                                                        "alias" : "question_answers_submitted.questionsName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "questionsSolutionOptionsId",
                                                        "label": "Questions Solution Options Id",
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
                                                        "dynamicKey": "questionAnswersSubmitted_questionsSolutionOptionsId",
                                                        "selectServerUrl": "/questions_solution_options/dropdown?version=1.0",
                                                        "alias" : "question_answers_submitted.questions_solution_options_id"
                                                    },
                                                     {
                                                        "name": "questionsSolutionOptionsName",
                                                        "label": "Questions Solution OptionsName",
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
                                                        "dynamicKey": "questionAnswersSubmitted_questionsSolutionOptionsName",
                                                        "selectServerUrl": "/questions_solution_options/dropdown?version=1.0",
                                                        "alias" : "question_answers_submitted.questions_solution_optionsName"
                                                    }
                                                    



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
                                              
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_question_answers_submitted"
                        }
                  ],
                  "colMapper": { 'questions_solution_options_questionsSolutionOptionsId' : 'questions_solution_options_id',  'questions_solution_options_questionId' : 'question_id',  'questions_solution_options_description' : 'description',  'questions_solution_options_optionNumber' : 'option_number',  'questions_solution_options_correctOption' : 'correct_option',  'questions_questionId' : 'question_id',  'questions_cloid' : 'cloid',  'questions_subComponentId' : 'sub_component_id',  'questions_questionNum' : 'question_num',  'questions_description' : 'description',  'questions_questionMarks' : 'question_marks',  'questions_lecturesTopicId' : 'lectures_topic_id',  'questions_status' : 'status',  'questions_createdBy' : 'created_by',  'questions_updatedBy' : 'updated_by',  'questions_createdAt' : 'created_at',  'questions_updatedAt' : 'updated_at',  'question_answers_submitted_questionAnswersSubmittedId' : 'question_answers_submitted_id',  'question_answers_submitted_urdd' : 'urdd',  'question_answers_submitted_questionId' : 'question_id',  'question_answers_submitted_questionsSolutionOptionsId' : 'questions_solution_options_id',  'question_answers_submitted_description' : 'description',  'question_answers_submitted_marksObtained' : 'marks_obtained'}
              };