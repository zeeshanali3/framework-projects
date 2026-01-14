/* Frontend Parameters for table: question_answers_submitted */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "questionAnswersSubmitted Info",
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
                            "title": "Question Answers Submitted",
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
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "questionAnswersSubmitted_description",
                "alias" : "question_answers_submitted.description",
                "options": []

            }
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
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "questionAnswersSubmitted_marksObtained",
                "alias" : "question_answers_submitted.marks_obtained",
                "options": []

            }  
          
            
        
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
                    "dynamicKey": "questionAnswersSubmitted_questionId",
                    "selectServerUrl": "/questions/dropdown?version=1.0",
                    "alias" : "question_answers_submitted.question_id"
                }
                
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
                "colMapper": "{ 'questionAnswersSubmitted_questionAnswersSubmittedId' : 'question_answers_submitted_id',  'questionAnswersSubmitted_urdd' : 'urdd',  'questionAnswersSubmitted_questionId' : 'question_id',  'questionAnswersSubmitted_questionsSolutionOptionsId' : 'questions_solution_options_id',  'questionAnswersSubmitted_description' : 'description',  'questionAnswersSubmitted_marksObtained' : 'marks_obtained'}"
                };