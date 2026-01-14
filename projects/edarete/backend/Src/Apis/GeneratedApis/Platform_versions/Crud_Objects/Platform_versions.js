/* CRUD Objects for table: platform_versions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPlatform_versions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO platform_versions (version_id, platform_id, encryption_key, created_by, updated_by) VALUES ({{platformVersions_versionId}}, {{platformVersions_platformId}}, {{platformVersions_encryptionKey}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE platform_versions SET version_id = {{platformVersions_versionId}}, platform_id = {{platformVersions_platformId}}, encryption_key = {{platformVersions_encryptionKey}} WHERE platform_version_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, platform_versions.platform_version_id as platformVersions_id, platform_versions.platform_version_id as id, platform_versions.platform_version_id as platformVersions_platformVersionId,platform_versions.version_id as platformVersions_versionId,platform_versions.platform_id as platformVersions_platformId,platform_versions.encryption_key as platformVersions_encryptionKey,platform_versions.created_by as platformVersions_createdBy,platform_versions.updated_by as platformVersions_updatedBy,platform_versions.status as platformVersions_status,platform_versions.created_at as platformVersions_createdAt,platform_versions.updated_at as platformVersions_updatedAt, platforms.platform_name as platforms_platformName FROM platform_versions LEFT JOIN platforms ON platform_versions.platform_id = platforms.platform_id Where platform_versions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT platform_versions.platform_version_id as platformVersions_id, platform_versions.platform_version_id as id, platform_versions.platform_version_id as platformVersions_platformVersionId,platform_versions.version_id as platformVersions_versionId,platform_versions.platform_id as platformVersions_platformId,platform_versions.encryption_key as platformVersions_encryptionKey,platform_versions.created_by as platformVersions_createdBy,platform_versions.updated_by as platformVersions_updatedBy,platform_versions.status as platformVersions_status,platform_versions.created_at as platformVersions_createdAt,platform_versions.updated_at as platformVersions_updatedAt, platforms.platform_name as platforms_platformName FROM platform_versions LEFT JOIN platforms ON platform_versions.platform_id = platforms.platform_id WHERE platform_version_id = {{id}} OR platform_version_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE platform_versions SET status = 'inactive' WHERE platform_version_id = {{id}}"},           
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
                        permission: { Add: "add_platform_versions", View: "view_platform_versions", Update: "update_platform_versions", Delete: "delete_platform_versions", List: "list_platform_versions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Platform_versions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Platform_versions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPlatform_versions_object}