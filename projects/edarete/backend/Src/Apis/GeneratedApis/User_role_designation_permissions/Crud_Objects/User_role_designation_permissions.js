/* CRUD Objects for table: user_role_designation_permissions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudUser_role_designation_permissions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO user_role_designation_permissions (user_role_designation_department_id, permission_id, excluded_id, included_id, created_by, updated_by) VALUES ({{userRoleDesignationPermissions_userRoleDesignationDepartmentId}}, {{userRoleDesignationPermissions_permissionId}}, {{userRoleDesignationPermissions_excludedId}}, {{userRoleDesignationPermissions_includedId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE user_role_designation_permissions SET user_role_designation_department_id = {{userRoleDesignationPermissions_userRoleDesignationDepartmentId}}, permission_id = {{userRoleDesignationPermissions_permissionId}}, excluded_id = {{userRoleDesignationPermissions_excludedId}}, included_id = {{userRoleDesignationPermissions_includedId}} WHERE user_role_designation_permission_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_permissions.user_role_designation_permission_id as userRoleDesignationPermissions_id, user_role_designation_permissions.user_role_designation_permission_id as id, user_role_designation_permissions.user_role_designation_permission_id as userRoleDesignationPermissions_userRoleDesignationPermissionId,user_role_designation_permissions.user_role_designation_department_id as userRoleDesignationPermissions_userRoleDesignationDepartmentId,user_role_designation_permissions.permission_id as userRoleDesignationPermissions_permissionId,user_role_designation_permissions.excluded_id as userRoleDesignationPermissions_excludedId,user_role_designation_permissions.included_id as userRoleDesignationPermissions_includedId,user_role_designation_permissions.status as userRoleDesignationPermissions_status,user_role_designation_permissions.created_by as userRoleDesignationPermissions_createdBy,user_role_designation_permissions.updated_by as userRoleDesignationPermissions_updatedBy,user_role_designation_permissions.created_at as userRoleDesignationPermissions_createdAt,user_role_designation_permissions.updated_at as userRoleDesignationPermissions_updatedAt, permissions.permission_name as permissions_permissionName FROM user_role_designation_permissions LEFT JOIN permissions ON user_role_designation_permissions.permission_id = permissions.permission_id Where user_role_designation_permissions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT user_role_designation_permissions.user_role_designation_permission_id as userRoleDesignationPermissions_id, user_role_designation_permissions.user_role_designation_permission_id as id, user_role_designation_permissions.user_role_designation_permission_id as userRoleDesignationPermissions_userRoleDesignationPermissionId,user_role_designation_permissions.user_role_designation_department_id as userRoleDesignationPermissions_userRoleDesignationDepartmentId,user_role_designation_permissions.permission_id as userRoleDesignationPermissions_permissionId,user_role_designation_permissions.excluded_id as userRoleDesignationPermissions_excludedId,user_role_designation_permissions.included_id as userRoleDesignationPermissions_includedId,user_role_designation_permissions.status as userRoleDesignationPermissions_status,user_role_designation_permissions.created_by as userRoleDesignationPermissions_createdBy,user_role_designation_permissions.updated_by as userRoleDesignationPermissions_updatedBy,user_role_designation_permissions.created_at as userRoleDesignationPermissions_createdAt,user_role_designation_permissions.updated_at as userRoleDesignationPermissions_updatedAt, permissions.permission_name as permissions_permissionName FROM user_role_designation_permissions LEFT JOIN permissions ON user_role_designation_permissions.permission_id = permissions.permission_id WHERE user_role_designation_permission_id = {{id}} OR user_role_designation_permission_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE user_role_designation_permissions SET status = 'inactive' WHERE user_role_designation_permission_id = {{id}}"},           
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
                        permission: { Add: "add_user_role_designation_permissions", View: "view_user_role_designation_permissions", Update: "update_user_role_designation_permissions", Delete: "delete_user_role_designation_permissions", List: "list_user_role_designation_permissions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "User_role_designation_permissions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve User_role_designation_permissions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudUser_role_designation_permissions_object}