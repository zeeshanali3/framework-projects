/* CRUD Objects for table: clo */
      
      const parameters = require('./CRUD_parameters');
      global.CrudClo_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO clo (clonum, clodomain_name, description, created_by, updated_by) VALUES ({{clo_clonum}}, {{clo_clodomainName}}, {{clo_description}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE clo SET clonum = {{clo_clonum}}, clodomain_name = {{clo_clodomainName}}, description = {{clo_description}} WHERE cloid = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, clo.cloid as clo_id, clo.cloid as id, clo.cloid as clo_cloid,clo.clonum as clo_clonum,clo.clodomain_name as clo_clodomainName,clo.description as clo_description,clo.status as clo_status,clo.created_by as clo_createdBy,clo.updated_by as clo_updatedBy,clo.created_at as clo_createdAt,clo.updated_at as clo_updatedAt FROM clo  Where clo.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT clo.cloid as clo_id, clo.cloid as id, clo.cloid as clo_cloid,clo.clonum as clo_clonum,clo.clodomain_name as clo_clodomainName,clo.description as clo_description,clo.status as clo_status,clo.created_by as clo_createdBy,clo.updated_by as clo_updatedBy,clo.created_at as clo_createdAt,clo.updated_at as clo_updatedAt FROM clo  WHERE cloid = {{id}} OR cloid IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE clo SET status = 'inactive' WHERE cloid = {{id}}"},           
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
                        permission: { Add: "add_clo", View: "view_clo", Update: "update_clo", Delete: "delete_clo", List: "list_clo" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Clo CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Clo.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudClo_object}