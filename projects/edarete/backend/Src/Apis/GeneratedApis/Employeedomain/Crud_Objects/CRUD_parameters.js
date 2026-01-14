const parameters = {
              "steps": [
                  {
                  "title": "Employeedomain Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "employeedomain",
                          "type": "section",
                          "title": "Employeedomain CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Employeedomain",
                          "childFields": [
                                {
                                  "name": "employeedomain_id",
                                  "label": "id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": true,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.query",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "employeedomain_id"
                                },
                               {
                                  "name": "actionPerformerURDD",
                                  "label": "actionPerformerURDD",
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
                                  "selectServer": false,
                                  "dynamicKey": "actionPerformerURDD",
                                  "alias" : "actionPerformerURDD",
                                },
                              
                                  {
                                  "name": "employee_id",
                                  "label": "Employee Id",
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
                                  "selectServer": false,
                                  "dynamicKey": "employeedomain_employeeId",
                                  "alias" : "employeedomain.employee_id",
                                  },
                                  {
                                  "name": "domain_id",
                                  "label": "Domain Id",
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
                                  "selectServer": false,
                                  "dynamicKey": "employeedomain_domainId",
                                  "alias" : "employeedomain.domain_id",
                                  },
                                  
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
              "colMapper": "{ 'employeedomain_employeeDomainId' : 'employee_domain_id',  'employeedomain_employeeId' : 'employee_id',  'employeedomain_domainId' : 'domain_id',  'employeedomain_status' : 'status',  'employeedomain_createdBy' : 'created_by',  'employeedomain_updatedBy' : 'updated_by',  'employeedomain_createdAt' : 'created_at',  'employeedomain_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;