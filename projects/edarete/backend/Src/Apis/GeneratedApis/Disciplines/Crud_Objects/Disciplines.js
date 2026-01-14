/* CRUD Objects for table: disciplines */
      
      const parameters = require('./CRUD_parameters');
      global.CrudDisciplines_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO disciplines (discipline_name, discipline_prefix, regex, created_by, updated_by) VALUES ({{disciplines_disciplineName}}, {{disciplines_disciplinePrefix}}, {{disciplines_regex}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE disciplines SET discipline_name = {{disciplines_disciplineName}}, discipline_prefix = {{disciplines_disciplinePrefix}}, regex = {{disciplines_regex}} WHERE discipline_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, disciplines.discipline_id as disciplines_id, disciplines.discipline_id as id, disciplines.discipline_id as disciplines_disciplineId,disciplines.discipline_name as disciplines_disciplineName,disciplines.discipline_prefix as disciplines_disciplinePrefix,disciplines.regex as disciplines_regex FROM disciplines  Where disciplines.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT disciplines.discipline_id as disciplines_id, disciplines.discipline_id as id, disciplines.discipline_id as disciplines_disciplineId,disciplines.discipline_name as disciplines_disciplineName,disciplines.discipline_prefix as disciplines_disciplinePrefix,disciplines.regex as disciplines_regex FROM disciplines  WHERE discipline_id = {{id}} OR discipline_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE disciplines SET status = 'inactive' WHERE discipline_id = {{id}}"},           
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
                        permission: { Add: "add_disciplines", View: "view_disciplines", Update: "update_disciplines", Delete: "delete_disciplines", List: "list_disciplines" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Disciplines CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Disciplines.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudDisciplines_object}