/* CRUD Objects for table: roles */
      
      const parameters = require('./CRUD_parameters');
      global.CrudRoles_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO roles (role_name, created_by, updated_by) VALUES ({{roles_roleName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE roles SET role_name = {{roles_roleName}} WHERE role_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, roles.role_id as roles_id, roles.role_id as id, roles.role_id as roles_roleId,roles.role_name as roles_roleName,roles.status as roles_status,roles.created_by as roles_createdBy,roles.updated_by as roles_updatedBy,roles.created_at as roles_createdAt,roles.updated_at as roles_updatedAt FROM roles  Where roles.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT roles.role_id as roles_id, roles.role_id as id, roles.role_id as roles_roleId,roles.role_name as roles_roleName,roles.status as roles_status,roles.created_by as roles_createdBy,roles.updated_by as roles_updatedBy,roles.created_at as roles_createdAt,roles.updated_at as roles_updatedAt FROM roles  WHERE role_id = {{id}} OR role_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE roles SET status = 'inactive' WHERE role_id = {{id}}"},           
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
                        permission: { Add: "add_roles", View: "view_roles", Update: "update_roles", Delete: "delete_roles", List: "list_roles" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Roles CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Roles.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudRoles_object}