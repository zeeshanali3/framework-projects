/* Frontend Parameters for table: lecturetopics */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "lecturetopics Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "lecturetopics",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Lecturetopics",
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
                "name": "topicName",
                "label": "Topic Name",
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
                "dynamicKey": "lecturetopics_topicName",
                "alias" : "lecturetopics.topic_name",
                "options": []

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
                "dynamicKey": "lecturetopics_description",
                "alias" : "lecturetopics.description",
                "options": []

            }  
        
            ,
            {
                "name": "bookName",
                "label": "Book Name",
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
                "dynamicKey": "books_bookName",
                "alias" : "books.book_name",
                "options": [ ""]

            }  
            
        
                ,
                {
                    "name": "subComponentId",
                    "label": "Sub Component Id",
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
                    "dynamicKey": "lecturetopics_subComponentId",
                    "selectServerUrl": "/subcomponents/dropdown?version=1.0",
                    "alias" : "lecturetopics.sub_component_id"
                }
                
                ,
                {
                    "name": "bookId",
                    "label": "Book Id",
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
                    "dynamicKey": "lecturetopics_bookId",
                    "selectServerUrl": "/books/dropdown?version=1.0",
                    "alias" : "lecturetopics.book_id"
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
                  "dynamicKey": "lecturetopics_createdAt",
                  "alias" : "lecturetopics.created_at"
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
                  "dynamicKey": "lecturetopics_updatedAt",
                  "alias" : "lecturetopics.updated_at"
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
                "dynamicKey": "lecturetopics_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "lecturetopics.status"
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
                "colMapper": "{ 'lecturetopics_lecturesTopicId' : 'lectures_topic_id',  'lecturetopics_subComponentId' : 'sub_component_id',  'lecturetopics_topicName' : 'topic_name',  'lecturetopics_description' : 'description',  'lecturetopics_bookId' : 'book_id',  'lecturetopics_status' : 'status',  'lecturetopics_createdBy' : 'created_by',  'lecturetopics_updatedBy' : 'updated_by',  'lecturetopics_createdAt' : 'created_at',  'lecturetopics_updatedAt' : 'updated_at',  'lecturetopics_bookName' : 'book_name'}"
                };