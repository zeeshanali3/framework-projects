/* CRUD Objects for table: clomappingplo */
      
      const parameters = require('./CRUD_parameters');
      global.CrudClomappingplo_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO clomappingplo (cloid, clointensity_name, ploid, created_by, updated_by) VALUES ({{clomappingplo_cloid}}, {{clomappingplo_clointensityName}}, {{clomappingplo_ploid}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE clomappingplo SET cloid = {{clomappingplo_cloid}}, clointensity_name = {{clomappingplo_clointensityName}}, ploid = {{clomappingplo_ploid}} WHERE clomapping_ploid = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, clomappingplo.clomapping_ploid as clomappingplo_id, clomappingplo.clomapping_ploid as id, clomappingplo.clomapping_ploid as clomappingplo_clomappingPloid,clomappingplo.cloid as clomappingplo_cloid,clomappingplo.clointensity_name as clomappingplo_clointensityName,clomappingplo.ploid as clomappingplo_ploid,clomappingplo.status as clomappingplo_status,clomappingplo.created_by as clomappingplo_createdBy,clomappingplo.updated_by as clomappingplo_updatedBy,clomappingplo.created_at as clomappingplo_createdAt,clomappingplo.updated_at as clomappingplo_updatedAt FROM clomappingplo  Where clomappingplo.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT clomappingplo.clomapping_ploid as clomappingplo_id, clomappingplo.clomapping_ploid as id, clomappingplo.clomapping_ploid as clomappingplo_clomappingPloid,clomappingplo.cloid as clomappingplo_cloid,clomappingplo.clointensity_name as clomappingplo_clointensityName,clomappingplo.ploid as clomappingplo_ploid,clomappingplo.status as clomappingplo_status,clomappingplo.created_by as clomappingplo_createdBy,clomappingplo.updated_by as clomappingplo_updatedBy,clomappingplo.created_at as clomappingplo_createdAt,clomappingplo.updated_at as clomappingplo_updatedAt FROM clomappingplo  WHERE clomapping_ploid = {{id}} OR clomapping_ploid IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE clomappingplo SET status = 'inactive' WHERE clomapping_ploid = {{id}}"},           
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
                        permission: { Add: "add_clomappingplo", View: "view_clomappingplo", Update: "update_clomappingplo", Delete: "delete_clomappingplo", List: "list_clomappingplo" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Clomappingplo CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Clomappingplo.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudClomappingplo_object}