/* CRUD Objects for table: versions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudVersions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO versions (version, created_by, updated_by) VALUES ({{versions_version}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE versions SET version = {{versions_version}} WHERE version_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, versions.version_id as versions_id, versions.version_id as id, versions.version_id as versions_versionId,versions.version as versions_version,versions.created_by as versions_createdBy,versions.updated_by as versions_updatedBy,versions.status as versions_status,versions.created_at as versions_createdAt,versions.updated_at as versions_updatedAt FROM versions  Where versions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT versions.version_id as versions_id, versions.version_id as id, versions.version_id as versions_versionId,versions.version as versions_version,versions.created_by as versions_createdBy,versions.updated_by as versions_updatedBy,versions.status as versions_status,versions.created_at as versions_createdAt,versions.updated_at as versions_updatedAt FROM versions  WHERE version_id = {{id}} OR version_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE versions SET status = 'inactive' WHERE version_id = {{id}}"},           
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
                        permission: { Add: "add_versions", View: "view_versions", Update: "update_versions", Delete: "delete_versions", List: "list_versions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Versions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Versions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudVersions_object}