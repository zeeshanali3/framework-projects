const parameters = {
              "steps": [
                  {
                  "title": "Permission Groups Permissions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "permission_groups_permissions",
                          "type": "section",
                          "title": "Permission Groups Permissions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Permission_groups_permissions",
                          "childFields": [
                                {
                                  "name": "permissionGroupsPermissions_id",
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
                                  "dynamicKey": "permissionGroupsPermissions_id"
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
                                  "name": "permission_groups_permission_id",
                                  "label": "Permission Groups Permission Id",
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
                                  "dynamicKey": "permissionGroupsPermissions_permissionGroupsPermissionId",
                                  "alias" : "permission_groups_permissions.permission_groups_permission_id",
                                  },
                                  {
                                  "name": "group_id",
                                  "label": "Group Id",
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
                                  "dynamicKey": "permissionGroupsPermissions_groupId",
                                  "alias" : "permission_groups_permissions.group_id",
                                  },
                                  {
                                  "name": "permission_id",
                                  "label": "Permission Id",
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
                                  "dynamicKey": "permissionGroupsPermissions_permissionId",
                                  "alias" : "permission_groups_permissions.permission_id",
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
              "colMapper": "{ 'permission_groups_permissions_permissionGroupsPermissionId' : 'permission_groups_permission_id',  'permission_groups_permissions_groupId' : 'group_id',  'permission_groups_permissions_permissionId' : 'permission_id',  'permission_groups_permissions_status' : 'status',  'permission_groups_permissions_updatedBy' : 'updated_by',  'permission_groups_permissions_updatedAt' : 'updated_at',  'permission_groups_permissions_createdAt' : 'created_at',  'permission_groups_permissions_createdBy' : 'created_by'}"
              };
              module.exports = parameters;