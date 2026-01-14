/* CRUD Objects for table: permissions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPermissions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO permissions (permission_name, permission_name, created_by, updated_by) VALUES ({{permissions_permissionName}}, {{permissions_permissionName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE permissions SET permission_name = {{permissions_permissionName}}, permission_name = {{permissions_permissionName}} WHERE permission_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permissions.permission_id as permissions_id, permissions.permission_id as id, permissions.permission_id as permissions_permissionId,permissions.permission_name as permissions_permissionName,permissions.permission_name as permissions_permissionName,permissions.created_by as permissions_createdBy,permissions.updated_by as permissions_updatedBy,permissions.status as permissions_status,permissions.created_at as permissions_createdAt,permissions.updated_at as permissions_updatedAt FROM permissions  Where permissions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT permissions.permission_id as permissions_id, permissions.permission_id as id, permissions.permission_id as permissions_permissionId,permissions.permission_name as permissions_permissionName,permissions.permission_name as permissions_permissionName,permissions.created_by as permissions_createdBy,permissions.updated_by as permissions_updatedBy,permissions.status as permissions_status,permissions.created_at as permissions_createdAt,permissions.updated_at as permissions_updatedAt FROM permissions  WHERE permission_id = {{id}} OR permission_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE permissions SET status = 'inactive' WHERE permission_id = {{id}}"},           
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
                        permission: { Add: "add_permissions", View: "view_permissions", Update: "update_permissions", Delete: "delete_permissions", List: "list_permissions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Permissions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Permissions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPermissions_object}