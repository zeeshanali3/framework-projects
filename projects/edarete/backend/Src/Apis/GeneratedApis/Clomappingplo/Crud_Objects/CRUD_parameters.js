const parameters = {
              "steps": [
                  {
                  "title": "Clomappingplo Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "clomappingplo",
                          "type": "section",
                          "title": "Clomappingplo CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Clomappingplo",
                          "childFields": [
                                {
                                  "name": "clomappingplo_id",
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
                                  "dynamicKey": "clomappingplo_id"
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
                                  "name": "cloid",
                                  "label": "Cloid",
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
                                  "dynamicKey": "clomappingplo_cloid",
                                  "alias" : "clomappingplo.cloid",
                                  },
                                  {
                                  "name": "clointensity_name",
                                  "label": "Clointensity Name",
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
                                  "dynamicKey": "clomappingplo_clointensityName",
                                  "alias" : "clomappingplo.clointensity_name",
                                  },
                                  {
                                  "name": "ploid",
                                  "label": "Ploid",
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
                                  "dynamicKey": "clomappingplo_ploid",
                                  "alias" : "clomappingplo.ploid",
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
              "colMapper": "{ 'clomappingplo_clomappingPloid' : 'clomapping_ploid',  'clomappingplo_cloid' : 'cloid',  'clomappingplo_clointensityName' : 'clointensity_name',  'clomappingplo_ploid' : 'ploid',  'clomappingplo_status' : 'status',  'clomappingplo_createdBy' : 'created_by',  'clomappingplo_updatedBy' : 'updated_by',  'clomappingplo_createdAt' : 'created_at',  'clomappingplo_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;