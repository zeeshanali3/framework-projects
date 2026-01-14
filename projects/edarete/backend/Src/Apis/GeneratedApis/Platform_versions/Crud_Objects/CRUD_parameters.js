const parameters = {
              "steps": [
                  {
                  "title": "Platform Versions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "platform_versions",
                          "type": "section",
                          "title": "Platform Versions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Platform_versions",
                          "childFields": [
                                {
                                  "name": "platformVersions_id",
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
                                  "dynamicKey": "platformVersions_id"
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
                                  "name": "version_id",
                                  "label": "Version Id",
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
                                  "dynamicKey": "platformVersions_versionId",
                                  "alias" : "platform_versions.version_id",
                                  },
                                  {
                                  "name": "platform_id",
                                  "label": "Platform Id",
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
                                  "dynamicKey": "platformVersions_platformId",
                                  "alias" : "platform_versions.platform_id",
                                  },
                                  {
                                  "name": "encryption_key",
                                  "label": "Encryption Key",
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
                                  "dynamicKey": "platformVersions_encryptionKey",
                                  "alias" : "platform_versions.encryption_key",
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
              "colMapper": "{ 'platform_versions_platformVersionId' : 'platform_version_id',  'platform_versions_versionId' : 'version_id',  'platform_versions_platformId' : 'platform_id',  'platform_versions_encryptionKey' : 'encryption_key',  'platform_versions_createdBy' : 'created_by',  'platform_versions_updatedBy' : 'updated_by',  'platform_versions_status' : 'status',  'platform_versions_createdAt' : 'created_at',  'platform_versions_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;