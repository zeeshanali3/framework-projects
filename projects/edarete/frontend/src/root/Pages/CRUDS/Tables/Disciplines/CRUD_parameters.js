export const parameters = {
                  "steps": [
                    
                        {
                            "title": "disciplines Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "disciplines",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Disciplines",
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
                                                    "name": "disciplineName",
                                                    "label": "Discipline Name",
                                                    "title": "",
                                                    "type": "textField",
                                                    "required": true,
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
                                                    "dynamicKey": "disciplines_disciplineName",
                                                    "alias" : "disciplines.discipline_name",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "disciplinePrefix",
                                                    "label": "Discipline Prefix",
                                                    "title": "",
                                                    "type": "textField",
                                                    "required": true,
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
                                                    "dynamicKey": "disciplines_disciplinePrefix",
                                                    "alias" : "disciplines.discipline_prefix",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "disciplines",
                                                  "label": "Add Disciplines",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/disciplines?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Disciplines",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "disciplines", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Disciplines",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
                                              
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_disciplines"
                        }
                  ],
                  "colMapper": { 'disciplines_disciplineId' : 'discipline_id',  'disciplines_disciplineName' : 'discipline_name',  'disciplines_disciplinePrefix' : 'discipline_prefix'}
              };