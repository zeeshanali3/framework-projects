/* CRUD Objects for table: permission_groups */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPermission_groups_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
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
                              accessToken: true
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
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO permission_groups (group_name, created_by, updated_by) VALUES ({{permissionGroups_groupName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE permission_groups SET group_name = {{permissionGroups_groupName}} WHERE permission_group_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_groups.permission_group_id as permissionGroups_id, permission_groups.permission_group_id as id, permission_groups.permission_group_id as permissionGroups_permissionGroupId,permission_groups.group_name as permissionGroups_groupName,permission_groups.created_by as permissionGroups_createdBy,permission_groups.updated_by as permissionGroups_updatedBy,permission_groups.status as permissionGroups_status,permission_groups.created_at as permissionGroups_createdAt,permission_groups.updated_at as permissionGroups_updatedAt FROM permission_groups  Where permission_groups.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT permission_groups.permission_group_id as permissionGroups_id, permission_groups.permission_group_id as id, permission_groups.permission_group_id as permissionGroups_permissionGroupId,permission_groups.group_name as permissionGroups_groupName,permission_groups.created_by as permissionGroups_createdBy,permission_groups.updated_by as permissionGroups_updatedBy,permission_groups.status as permissionGroups_status,permission_groups.created_at as permissionGroups_createdAt,permission_groups.updated_at as permissionGroups_updatedAt FROM permission_groups  WHERE permission_group_id = {{id}} OR permission_group_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE permission_groups SET status = 'inactive' WHERE permission_group_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_permission_groups", View: "view_permission_groups", Update: "update_permission_groups", Delete: "delete_permission_groups", List: "list_permission_groups" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Permission_groups CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Permission_groups.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPermission_groups_object}