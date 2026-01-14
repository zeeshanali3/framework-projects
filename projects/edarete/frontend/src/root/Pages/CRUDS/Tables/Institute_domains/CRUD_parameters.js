/* Frontend Parameters for table: institute_domains */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "instituteDomains Info",
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
                            "title": "Institute Domains",
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
                "name": "instituteId",
                "label": "Institute Id",
                "title": "",
                "type": "select",
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
                "selectServer": true,
                "selectServerUrl":"/institutes/dropdown?version=1.0",
                "dynamicKey": "instituteDomains_instituteId",
                "alias" : "institute_domains.institute_id",
                "options": []

            }
            ,
            {
                "name": "domainId",
                "label": "Domain Id",
                "title": "",
                "type": "select",
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
                "selectServer": true,
                "selectServerUrl":"/domains/dropdown?version=1.0",
                "dynamicKey": "instituteDomains_domainId",
                "alias" : "institute_domains.domain_id",
                "options": []

            }  
        
            ,
            {
                "name": "instituteName",
                "label": "Institute Name",
                "title": "",
                "type": "textField",
                "required": true,
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
                "dynamicKey": "institutes_instituteName",
                "alias" : "institutes.institute_name",
                "options": [ ""]

            }
            ,
            {
                "name": "domainName",
                "label": "Domain Name",
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
                "dynamicKey": "domains_domainName",
                "alias" : "domains.domain_name",
                "options": [ ""]

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
                "colMapper": "{ 'instituteDomains_instituteDomainId' : 'institute_domain_id',  'instituteDomains_instituteId' : 'institute_id',  'instituteDomains_domainId' : 'domain_id',  'instituteDomains_instituteName' : 'institute_name',  'instituteDomains_domainName' : 'domain_name'}"
                };