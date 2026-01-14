/* Frontend Parameters for table: feedbacks */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "feedbacks Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "feedbacks",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Feedbacks",
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
                "name": "enrollementId",
                "label": "Enrollement Id",
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
                "selectServerUrl":"/enrollements/dropdown?version=1.0",
                "dynamicKey": "feedbacks_enrollementId",
                "alias" : "feedbacks.enrollement_id",
                "options": []

            }
            ,
            {
                "name": "feedbackQuestionId",
                "label": "Feedback Question Id",
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
                "selectServerUrl":"/feedbackquestions/dropdown?version=1.0",
                "dynamicKey": "feedbacks_feedbackQuestionId",
                "alias" : "feedbacks.feedback_question_id",
                "options": []

            }
            ,
            {
                "name": "feedbackText",
                "label": "Feedback Text",
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
                "dynamicKey": "feedbacks_feedbackText",
                "alias" : "feedbacks.feedback_text",
                "options": []

            }  
        
            ,
            {
                "name": "groupName",
                "label": "Group Name",
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
                "dynamicKey": "enrollements_groupName",
                "alias" : "enrollements.group_name",
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
                  "dynamicKey": "feedbacks_createdAt",
                  "alias" : "feedbacks.created_at"
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
                  "dynamicKey": "feedbacks_updatedAt",
                  "alias" : "feedbacks.updated_at"
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
                "dynamicKey": "feedbacks_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "feedbacks.status"
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
                "colMapper": "{ 'feedbacks_feedbackId' : 'feedback_id',  'feedbacks_enrollementId' : 'enrollement_id',  'feedbacks_feedbackQuestionId' : 'feedback_question_id',  'feedbacks_feedbackText' : 'feedback_text',  'feedbacks_status' : 'status',  'feedbacks_createdBy' : 'created_by',  'feedbacks_updatedBy' : 'updated_by',  'feedbacks_createdAt' : 'created_at',  'feedbacks_updatedAt' : 'updated_at',  'feedbacks_groupName' : 'group_name'}"
                };