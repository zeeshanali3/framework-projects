const parameters = require('./CRUD_parameters');
        global.GroupedCrudsPermission_groups_permissions_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
                          supported: ['*'],
                          config: {
                            features: {
                              multistep: false,
                              parameters: true,
                              pagination: true,
                            },
                            communication: {
                              encryption: {
                                platformEncryption: true,
                              },
                            },
                            verification: {
                              otp: false,
                              accessToken: false,
                            }
                          }
                        }
                      ],
                      data: {
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO permission_groups_permissions (group_id, permission_id , created_by, updated_by) VALUES ({{permissionGroupsPermissions_groupId}}, {{permissionGroupsPermissions_permissionId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE permission_groups_permissions SET group_id = {{permissionGroupsPermissions_groupId}}, permission_id = {{permissionGroupsPermissions_permissionId}}, created_by = {{permissionGroupsPermissions_createdBy}}, updated_by = {{permissionGroupsPermissions_updatedBy}} WHERE permission_group_permission_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_group_permission_id as permissionGroupsPermissions_id,permission_group_permission_id as id, permission_groups_permissions.group_id as permissionGroupsPermissions_groupId, permission_groups_permissions.permission_id as permissionGroupsPermissions_permissionId  FROM permission_groups_permissions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, permissions.permission_id as permissions_id,
                        permissions.permission_id as id,
                       permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, permissions.permission_id as  permissions_permissionId,

                          permission_groups_permissions.permission_group_permission_id as permissions_permissionGroupPermissionId, permissions.permission_id as permissions_permissionId,
                          
                       
                         
                          null permission_groups_permissions.group_id as permissionGroupsPermissions_groupId, permission_groups_permissions.permission_id as permissionGroupsPermissions_permissionId, 
                        permissions.permission_name as permissions_permissionName FROM permission_groups_permissions LEFT JOIN permissions ON permissions.permission_id = permission_groups_permissions.permission_id AND permissions.status !='inactive' WHERE (permission_groups_permissions.permission_group_permission_id = {{id}}  AND  permission_groups_permissions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE permission_groups_permissions SET status = 'inactive' WHERE permission_group_permission_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "permission_groups_permissions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
                          supported: ['*'],
                          config: {
                            features: {
                              multistep: false,
                              parameters: true,
                              pagination: true,
                            },
                            communication: {
                              encryption: {
                                platformEncryption: true,
                              },
                            },
                            verification: {
                              otp: false,
                              accessToken: false,
                            }
                          }
                        }
                      ],
                      data: {
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO permissions (permission_name , created_by, updated_by) VALUES ({{permissions_permissionName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE permissions SET permission_name = {{permissions_permissionName}}, created_by = {{permissions_createdBy}}, updated_by = {{permissions_updatedBy}} WHERE permission_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_id as permissions_id,permission_id as id, permissions.permission_name as permissions_permissionName  FROM permissions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, permissions.permission_id as permissions_id,
                        permissions.permission_id as id,
                       permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, permissions.permission_id as  permissions_permissionId,

                          permission_groups_permissions.permission_group_permission_id as permissions_permissionGroupPermissionId, permissions.permission_id as permissions_permissionId,
                          
                       
                         
                          null permissions.permission_name as permissions_permissionName, 
                        permissions.permission_name as permissions_permissionName FROM permission_groups_permissions LEFT JOIN permissions ON permissions.permission_id = permission_groups_permissions.permission_id AND permissions.status !='inactive' WHERE (permissions.permission_id = {{id}}  AND  permissions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE permissions SET status = 'inactive' WHERE permission_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "permissions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsPermission_groups_permissions_object}