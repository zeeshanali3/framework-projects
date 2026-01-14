/* Frontend Parameters for table: feedbackform */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "feedbackform Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "feedbackform",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Feedbackform",
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
                "name": "formName",
                "label": "Form Name",
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
                "dynamicKey": "feedbackform_formName",
                "alias" : "feedbackform.form_name",
                "options": []

            }  
          
            
        
        
          ,
          {
              "name": "startDate",
              "label": "Start Date",
              "title": "",
              "type": "datetime",
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
              "dynamicKey": "feedbackform_startDate"
          }
          ,
          {
              "name": "endDate",
              "label": "End Date",
              "title": "",
              "type": "datetime",
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
              "dynamicKey": "feedbackform_endDate"
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
                  "dynamicKey": "feedbackform_createdAt",
                  "alias" : "feedbackform.created_at"
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
                  "dynamicKey": "feedbackform_updatedAt",
                  "alias" : "feedbackform.updated_at"
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
                "dynamicKey": "feedbackform_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "feedbackform.status"
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
                "colMapper": "{ 'feedbackform_feedBackFormId' : 'feed_back_form_id',  'feedbackform_feedBackFormId' : 'feed_back_form_id',  'feedbackform_formName' : 'form_name',  'feedbackform_startDate' : 'start_date',  'feedbackform_endDate' : 'end_date',  'feedbackform_status' : 'status',  'feedbackform_createdBy' : 'created_by',  'feedbackform_updatedBy' : 'updated_by',  'feedbackform_createdAt' : 'created_at',  'feedbackform_updatedAt' : 'updated_at'}"
                };