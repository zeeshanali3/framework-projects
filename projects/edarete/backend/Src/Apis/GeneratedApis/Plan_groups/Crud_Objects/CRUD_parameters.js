const parameters = {
              "steps": [
                  {
                  "title": "Plan Groups Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "plan_groups",
                          "type": "section",
                          "title": "Plan Groups CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Plan_groups",
                          "childFields": [
                                {
                                  "name": "planGroups_id",
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
                                  "dynamicKey": "planGroups_id"
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
                                  "name": "plan_id",
                                  "label": "Plan Id",
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
                                  "dynamicKey": "planGroups_planId",
                                  "alias" : "plan_groups.plan_id",
                                  },
                                  {
                                  "name": "permission_group_id",
                                  "label": "Permission Group Id",
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
                                  "dynamicKey": "planGroups_permissionGroupId",
                                  "alias" : "plan_groups.permission_group_id",
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
              "colMapper": "{ 'plan_groups_planGroupId' : 'plan_group_id',  'plan_groups_planId' : 'plan_id',  'plan_groups_permissionGroupId' : 'permission_group_id',  'plan_groups_createdBy' : 'created_by',  'plan_groups_updatedBy' : 'updated_by',  'plan_groups_status' : 'status',  'plan_groups_createdAt' : 'created_at',  'plan_groups_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;