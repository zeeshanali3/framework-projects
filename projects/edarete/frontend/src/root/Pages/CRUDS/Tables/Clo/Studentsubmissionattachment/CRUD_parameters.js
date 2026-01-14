export const parameters = {
                  "steps": [
                    
                        {
                            "title": "studentsubmissionattachment Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "studentsubmissionattachment",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Studentsubmissionattachment",
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
                                                    "name": "studentSubmissionId",
                                                    "label": "Student Submission Id",
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
                                                    "dynamicKey": "studentsubmissionattachment_studentSubmissionId",
                                                    "alias" : "studentsubmissionattachment.student_submission_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "attachementId",
                                                    "label": "Attachement Id",
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
                                                    "dynamicKey": "studentsubmissionattachment_attachementId",
                                                    "alias" : "studentsubmissionattachment.attachement_id",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "studentsubmissionattachment",
                                                  "label": "Add Studentsubmissionattachment",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/studentsubmissionattachment?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Studentsubmissionattachment",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "studentsubmissionattachment", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Studentsubmissionattachment",
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
                                                    "dynamicKey": "studentsubmissionattachment_createdAt",
                                                    "alias" : "studentsubmissionattachment.created_at"
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
                                                    "dynamicKey": "studentsubmissionattachment_updatedAt",
                                                    "alias" : "studentsubmissionattachment.updated_at"
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
                                                    "dynamicKey": "studentsubmissionattachment_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "studentsubmissionattachment.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_studentsubmissionattachment"
                        }
                  ],
                  "colMapper": { 'studentsubmissionattachment_studentSubmissionAttachmentId' : 'student_submission_attachment_id',  'studentsubmissionattachment_studentSubmissionId' : 'student_submission_id',  'studentsubmissionattachment_attachementId' : 'attachement_id',  'studentsubmissionattachment_status' : 'status',  'studentsubmissionattachment_createdBy' : 'created_by',  'studentsubmissionattachment_updatedBy' : 'updated_by',  'studentsubmissionattachment_createdAt' : 'created_at',  'studentsubmissionattachment_updatedAt' : 'updated_at'}
              };