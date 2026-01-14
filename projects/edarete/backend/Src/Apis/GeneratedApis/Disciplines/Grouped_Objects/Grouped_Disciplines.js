const parameters = require('./CRUD_parameters');
        global.GroupedCrudsDisciplines_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO disciplines (discipline_name, discipline_prefix, regex , created_by, updated_by) VALUES ({{disciplines_disciplineName}}, {{disciplines_disciplinePrefix}}, {{disciplines_regex}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE disciplines SET discipline_name = {{disciplines_disciplineName}}, discipline_prefix = {{disciplines_disciplinePrefix}}, regex = {{disciplines_regex}} WHERE discipline_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, discipline_id as disciplines_id,discipline_id as id, disciplines.discipline_name as disciplines_disciplineName, disciplines.discipline_prefix as disciplines_disciplinePrefix, disciplines.regex as disciplines_regex  FROM disciplines WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            disciplines.discipline_id as disciplines_id,
                        undefined.undefined as id,
                       disciplines.discipline_id as  disciplines_disciplineId,

                          disciplines.discipline_id as undefined_disciplineId,
                          
                       
                         
                          null disciplines.discipline_name as disciplines_disciplineName, disciplines.discipline_prefix as disciplines_disciplinePrefix, disciplines.regex as disciplines_regex, 
                        undefined FROM disciplines  WHERE (disciplines.discipline_id = {{id}}  AND  disciplines.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE disciplines SET status = 'inactive' WHERE discipline_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "disciplines Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsDisciplines_object}