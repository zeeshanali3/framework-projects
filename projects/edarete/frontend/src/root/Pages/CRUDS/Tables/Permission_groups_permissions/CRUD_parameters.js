/* Frontend Parameters for table: permission_groups_permissions */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "permissionGroupsPermissions Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "permissionGroupsPermissions",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Permission Groups Permissions",
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
                "name": "groupId",
                "label": "Group Id",
                "title": "",
                "type": "select",
                "required": false,
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
                "selectServerUrl":"/permission_groups/dropdown?version=1.0",
                "dynamicKey": "permissionGroupsPermissions_groupId",
                "alias" : "permission_groups_permissions.group_id",
                "options": []

            }
            ,
            {
                "name": "permissionId",
                "label": "Permission Id",
                "title": "",
                "type": "select",
                "required": false,
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
                "selectServerUrl":"/permissions/dropdown?version=1.0",
                "dynamicKey": "permissionGroupsPermissions_permissionId",
                "alias" : "permission_groups_permissions.permission_id",
                "options": []

            }  
        
            ,
            {
                "name": "groupName",
                "label": "Group Name",
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
                "dynamicKey": "permissionGroups_groupName",
                "alias" : "permission_groups.group_name",
                "options": [ ""]

            }
            ,
            {
                "name": "permissionName",
                "label": "Permission Name",
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
                "dynamicKey": "permissions_permissionName",
                "alias" : "permissions.permission_name",
                "options": [ ""]

            }  
            
        
          
          
                ,
                {
                  "name": "createdAt",
                  "label": "Created At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "permissionGroupsPermissions_createdAt",
                  "alias" : "permission_groups_permissions.created_at"
                }
                ,
                {
                  "name": "updatedAt",
                  "label": "Updated At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "permissionGroupsPermissions_updatedAt",
                  "alias" : "permission_groups_permissions.updated_at"
                }  

          
            ,
            {
                "name": "status",
                "label": "Status",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "permissionGroupsPermissions_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "permission_groups_permissions.status"
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
                "colMapper": "{ 'permissionGroupsPermissions_permissionGroupPermissionId' : 'permission_group_permission_id',  'permissionGroupsPermissions_groupId' : 'group_id',  'permissionGroupsPermissions_permissionId' : 'permission_id',  'permissionGroupsPermissions_createdBy' : 'created_by',  'permissionGroupsPermissions_updatedBy' : 'updated_by',  'permissionGroupsPermissions_status' : 'status',  'permissionGroupsPermissions_createdAt' : 'created_at',  'permissionGroupsPermissions_updatedAt' : 'updated_at',  'permissionGroupsPermissions_groupName' : 'group_name',  'permissionGroupsPermissions_permissionName' : 'permission_name'}"
                };