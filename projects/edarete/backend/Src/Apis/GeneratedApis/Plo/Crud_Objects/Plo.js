/* CRUD Objects for table: plo */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPlo_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO plo (program_id, ploname, plonum, created_by, updated_by) VALUES ({{plo_programId}}, {{plo_ploname}}, {{plo_plonum}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE plo SET program_id = {{plo_programId}}, ploname = {{plo_ploname}}, plonum = {{plo_plonum}} WHERE ploid = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, plo.ploid as plo_id, plo.ploid as id, plo.ploid as plo_ploid,plo.program_id as plo_programId,plo.ploname as plo_ploname,plo.plonum as plo_plonum,plo.status as plo_status,plo.created_by as plo_createdBy,plo.updated_by as plo_updatedBy,plo.created_at as plo_createdAt,plo.updated_at as plo_updatedAt, programs.program_name as programs_programName FROM plo LEFT JOIN programs ON plo.program_id = programs.program_id Where plo.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT plo.ploid as plo_id, plo.ploid as id, plo.ploid as plo_ploid,plo.program_id as plo_programId,plo.ploname as plo_ploname,plo.plonum as plo_plonum,plo.status as plo_status,plo.created_by as plo_createdBy,plo.updated_by as plo_updatedBy,plo.created_at as plo_createdAt,plo.updated_at as plo_updatedAt, programs.program_name as programs_programName FROM plo LEFT JOIN programs ON plo.program_id = programs.program_id WHERE ploid = {{id}} OR ploid IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE plo SET status = 'inactive' WHERE ploid = {{id}}"},           
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
                        permission: { Add: "add_plo", View: "view_plo", Update: "update_plo", Delete: "delete_plo", List: "list_plo" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Plo CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Plo.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPlo_object}