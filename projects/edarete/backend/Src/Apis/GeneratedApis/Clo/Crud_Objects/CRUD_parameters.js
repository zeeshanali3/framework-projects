const parameters = {
              "steps": [
                  {
                  "title": "Clo Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "clo",
                          "type": "section",
                          "title": "Clo CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Clo",
                          "childFields": [
                                {
                                  "name": "clo_id",
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
                                  "dynamicKey": "clo_id"
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
                                  "name": "clonum",
                                  "label": "Clonum",
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
                                  "dynamicKey": "clo_clonum",
                                  "alias" : "clo.clonum",
                                  },
                                  {
                                  "name": "clodomain_name",
                                  "label": "Clodomain Name",
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
                                  "dynamicKey": "clo_clodomainName",
                                  "alias" : "clo.clodomain_name",
                                  },
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
                                  "selectServer": false,
                                  "dynamicKey": "clo_description",
                                  "alias" : "clo.description",
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
              "colMapper": "{ 'clo_cloid' : 'cloid',  'clo_clonum' : 'clonum',  'clo_clodomainName' : 'clodomain_name',  'clo_description' : 'description',  'clo_status' : 'status',  'clo_createdBy' : 'created_by',  'clo_updatedBy' : 'updated_by',  'clo_createdAt' : 'created_at',  'clo_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;