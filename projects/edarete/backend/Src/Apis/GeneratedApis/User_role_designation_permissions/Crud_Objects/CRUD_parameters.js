const parameters = {
              "steps": [
                  {
                  "title": "User Role Designation Permissions Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "user_role_designation_permissions",
                          "type": "section",
                          "title": "User Role Designation Permissions CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "User_role_designation_permissions",
                          "childFields": [
                                {
                                  "name": "userRoleDesignationPermissions_id",
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
                                  "dynamicKey": "userRoleDesignationPermissions_id"
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
                                  "name": "user_role_designation_department_id",
                                  "label": "User Role Designation Department Id",
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
                                  "dynamicKey": "userRoleDesignationPermissions_userRoleDesignationDepartmentId",
                                  "alias" : "user_role_designation_permissions.user_role_designation_department_id",
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
                                  "dynamicKey": "userRoleDesignationPermissions_permissionId",
                                  "alias" : "user_role_designation_permissions.permission_id",
                                  },
                                  {
                                  "name": "excluded_id",
                                  "label": "Excluded Id",
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
                                  "dynamicKey": "userRoleDesignationPermissions_excludedId",
                                  "alias" : "user_role_designation_permissions.excluded_id",
                                  },
                                  {
                                  "name": "included_id",
                                  "label": "Included Id",
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
                                  "dynamicKey": "userRoleDesignationPermissions_includedId",
                                  "alias" : "user_role_designation_permissions.included_id",
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
              "colMapper": "{ 'user_role_designation_permissions_userRoleDesignationPermissionId' : 'user_role_designation_permission_id',  'user_role_designation_permissions_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'user_role_designation_permissions_permissionId' : 'permission_id',  'user_role_designation_permissions_excludedId' : 'excluded_id',  'user_role_designation_permissions_includedId' : 'included_id',  'user_role_designation_permissions_status' : 'status',  'user_role_designation_permissions_createdBy' : 'created_by',  'user_role_designation_permissions_updatedBy' : 'updated_by',  'user_role_designation_permissions_createdAt' : 'created_at',  'user_role_designation_permissions_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;