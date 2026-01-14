const parameters = require('./CRUD_parameters');
        global.GroupedCrudsPermission_groups_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO permission_groups (group_name , created_by, updated_by) VALUES ({{permissionGroups_groupName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE permission_groups SET group_name = {{permissionGroups_groupName}}, created_by = {{permissionGroups_createdBy}}, updated_by = {{permissionGroups_updatedBy}} WHERE permission_group_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_group_id as permissionGroups_id,permission_group_id as id, permission_groups.group_name as permissionGroups_groupName  FROM permission_groups WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            permission_groups.permission_group_id as permissionGroups_id,
                        undefined.undefined as id,
                       permission_groups.permission_group_id as  permissionGroups_permissionGroupId,

                          permission_groups.permission_group_id as undefined_permissionGroupId,
                          
                       
                         
                          null permission_groups.group_name as permissionGroups_groupName, 
                        undefined FROM permission_groups  WHERE (permission_groups.permission_group_id = {{id}}  AND  permission_groups.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE permission_groups SET status = 'inactive' WHERE permission_group_id = {{id}}"}    

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
                        successMessage: "permission_groups Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsPermission_groups_object}