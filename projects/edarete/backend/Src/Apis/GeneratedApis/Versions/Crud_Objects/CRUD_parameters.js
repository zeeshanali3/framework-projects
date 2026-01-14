const parameters = {
              "steps": [
                  {
                  "title": "Versions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "versions",
                          "type": "section",
                          "title": "Versions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Versions",
                          "childFields": [
                                {
                                  "name": "versions_id",
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
                                  "dynamicKey": "versions_id"
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
                                  "name": "version",
                                  "label": "Version",
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
                                  "dynamicKey": "versions_version",
                                  "alias" : "versions.version",
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
              "colMapper": "{ 'versions_versionId' : 'version_id',  'versions_version' : 'version',  'versions_createdBy' : 'created_by',  'versions_updatedBy' : 'updated_by',  'versions_status' : 'status',  'versions_createdAt' : 'created_at',  'versions_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;