/* CRUD Objects for table: permission_groups_permissions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPermission_groups_permissions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO permission_groups_permissions (group_id, permission_id, created_by, updated_by) VALUES ({{permissionGroupsPermissions_groupId}}, {{permissionGroupsPermissions_permissionId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE permission_groups_permissions SET group_id = {{permissionGroupsPermissions_groupId}}, permission_id = {{permissionGroupsPermissions_permissionId}} WHERE permission_group_permission_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, permission_groups_permissions.permission_group_permission_id as id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_permissionGroupPermissionId,permission_groups_permissions.group_id as permissionGroupsPermissions_groupId,permission_groups_permissions.permission_id as permissionGroupsPermissions_permissionId,permission_groups_permissions.created_by as permissionGroupsPermissions_createdBy,permission_groups_permissions.updated_by as permissionGroupsPermissions_updatedBy,permission_groups_permissions.status as permissionGroupsPermissions_status,permission_groups_permissions.created_at as permissionGroupsPermissions_createdAt,permission_groups_permissions.updated_at as permissionGroupsPermissions_updatedAt, permission_groups.group_name as permissionGroups_groupName,permissions.permission_name as permissions_permissionName FROM permission_groups_permissions LEFT JOIN permission_groups ON permission_groups_permissions.group_id = permission_groups.permission_group_id LEFT JOIN permissions ON permission_groups_permissions.permission_id = permissions.permission_id Where permission_groups_permissions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, permission_groups_permissions.permission_group_permission_id as id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_permissionGroupPermissionId,permission_groups_permissions.group_id as permissionGroupsPermissions_groupId,permission_groups_permissions.permission_id as permissionGroupsPermissions_permissionId,permission_groups_permissions.created_by as permissionGroupsPermissions_createdBy,permission_groups_permissions.updated_by as permissionGroupsPermissions_updatedBy,permission_groups_permissions.status as permissionGroupsPermissions_status,permission_groups_permissions.created_at as permissionGroupsPermissions_createdAt,permission_groups_permissions.updated_at as permissionGroupsPermissions_updatedAt, permission_groups.group_name as permissionGroups_groupName,permissions.permission_name as permissions_permissionName FROM permission_groups_permissions LEFT JOIN permission_groups ON permission_groups_permissions.group_id = permission_groups.permission_group_id LEFT JOIN permissions ON permission_groups_permissions.permission_id = permissions.permission_id WHERE permission_group_permission_id = {{id}} OR permission_group_permission_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE permission_groups_permissions SET status = 'inactive' WHERE permission_group_permission_id = {{id}}"},           
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
                        permission: { Add: "add_permission_groups_permissions", View: "view_permission_groups_permissions", Update: "update_permission_groups_permissions", Delete: "delete_permission_groups_permissions", List: "list_permission_groups_permissions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Permission_groups_permissions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Permission_groups_permissions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPermission_groups_permissions_object}