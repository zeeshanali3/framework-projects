export const parameters = {
                  "steps": [
                    
                        {
                            "title": "institutes Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "institutes",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Institutes",
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
                                                    "name": "instituteName",
                                                    "label": "Institute Name",
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
                                                    "dynamicKey": "institutes_instituteName",
                                                    "alias" : "institutes.institute_name",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "instituteEmailDomain",
                                                    "label": "Institute Email Domain",
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
                                                    "dynamicKey": "institutes_instituteEmailDomain",
                                                    "alias" : "institutes.institute_email_domain",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "institutes",
                                                  "label": "Add Institutes",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/institutes?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Institutes",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "institutes", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Institutes",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
                                              
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_institutes"
                        },
                        {
                            "title": "institute_domains Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "instituteDomains",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Institutes",
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
                                                  "type": "tableOfFields",
                                                  "name": "instituteDomains",
                                                  "label": "Add Institute Domains",
                                                  "hideInCreateForm": false,
                                                 "selectServerUrl":"/grouped/cruds/institutes?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Institute Domains",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "instituteDomains", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Institute Domains",
                                                  "childFields":[
                                                
                                                  
                                                    ,
                                                    {
                                                        "name": "instituteId",
                                                        "label": "Institute Id",
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
                                                        "dynamicKey": "instituteDomains_instituteId",
                                                        "selectServerUrl": "/institutes/dropdown?version=1.0",
                                                        "alias" : "institute_domains.institute_id"
                                                    },
                                                     {
                                                        "name": "institutesName",
                                                        "label": "InstitutesName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": true,
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
                                                        "dynamicKey": "instituteDomains_institutesName",
                                                        "selectServerUrl": "/institutes/dropdown?version=1.0",
                                                        "alias" : "institute_domains.institutesName"
                                                    }
                                                    ,
                                                    ,
                                                    {
                                                        "name": "domainId",
                                                        "label": "Domain Id",
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
                                                        "dynamicKey": "instituteDomains_domainId",
                                                        "selectServerUrl": "/domains/dropdown?version=1.0",
                                                        "alias" : "institute_domains.domain_id"
                                                    },
                                                     {
                                                        "name": "domainsName",
                                                        "label": "DomainsName",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": true,
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
                                                        "dynamicKey": "instituteDomains_domainsName",
                                                        "selectServerUrl": "/domains/dropdown?version=1.0",
                                                        "alias" : "institute_domains.domainsName"
                                                    }
                                                    



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
                                              
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_institute_domains"
                        }
                  ],
                  "colMapper": { 'institutes_instituteId' : 'institute_id',  'institutes_instituteName' : 'institute_name',  'institutes_instituteEmailDomain' : 'institute_email_domain',  'institute_domains_instituteDomainId' : 'institute_domain_id',  'institute_domains_instituteId' : 'institute_id',  'institute_domains_domainId' : 'domain_id'}
              };