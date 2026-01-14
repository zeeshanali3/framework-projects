/* CRUD Objects for table: platforms */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPlatforms_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO platforms (platform_name, created_by, updated_by) VALUES ({{platforms_platformName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE platforms SET platform_name = {{platforms_platformName}} WHERE platform_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, platforms.platform_id as platforms_id, platforms.platform_id as id, platforms.platform_id as platforms_platformId,platforms.platform_name as platforms_platformName,platforms.created_by as platforms_createdBy,platforms.updated_by as platforms_updatedBy,platforms.status as platforms_status,platforms.created_at as platforms_createdAt,platforms.updated_at as platforms_updatedAt FROM platforms  Where platforms.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT platforms.platform_id as platforms_id, platforms.platform_id as id, platforms.platform_id as platforms_platformId,platforms.platform_name as platforms_platformName,platforms.created_by as platforms_createdBy,platforms.updated_by as platforms_updatedBy,platforms.status as platforms_status,platforms.created_at as platforms_createdAt,platforms.updated_at as platforms_updatedAt FROM platforms  WHERE platform_id = {{id}} OR platform_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE platforms SET status = 'inactive' WHERE platform_id = {{id}}"},           
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
                        permission: { Add: "add_platforms", View: "view_platforms", Update: "update_platforms", Delete: "delete_platforms", List: "list_platforms" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Platforms CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Platforms.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPlatforms_object}