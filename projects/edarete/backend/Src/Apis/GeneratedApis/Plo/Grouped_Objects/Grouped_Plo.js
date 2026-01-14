const parameters = require('./CRUD_parameters');
        global.GroupedCrudsPlo_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plo (program_id, ploname, plonum , created_by, updated_by) VALUES ({{plo_programId}}, {{plo_ploname}}, {{plo_plonum}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plo SET program_id = {{plo_programId}}, ploname = {{plo_ploname}}, plonum = {{plo_plonum}} WHERE ploid = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, ploid as plo_id,ploid as id, plo.program_id as plo_programId, plo.ploname as plo_ploname, plo.plonum as plo_plonum  FROM plo WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plo.ploid as plo_id, programs.program_id as programs_id,
                        programs.program_id as id,
                       plo.ploid as  plo_ploid, programs.program_id as  programs_programId,

                          plo.ploid as programs_ploid, programs.program_id as programs_programId,
                          
                       
                         
                          null plo.program_id as plo_programId, plo.ploname as plo_ploname, plo.plonum as plo_plonum, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM plo LEFT JOIN programs ON programs.program_id = plo.program_id AND programs.status !='inactive' WHERE (plo.ploid = {{id}}  AND  plo.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plo SET status = 'inactive' WHERE ploid = {{id}}"}    

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
                        successMessage: "plo Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO programs (department_id, domain_id, program_name, program_year , created_by, updated_by) VALUES ({{programs_departmentId}}, {{programs_domainId}}, {{programs_programName}}, {{programs_programYear}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE programs SET department_id = {{programs_departmentId}}, domain_id = {{programs_domainId}}, program_name = {{programs_programName}}, program_year = {{programs_programYear}} WHERE program_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, program_id as programs_id,program_id as id, programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear  FROM programs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            plo.ploid as plo_id, programs.program_id as programs_id,
                        programs.program_id as id,
                       plo.ploid as  plo_ploid, programs.program_id as  programs_programId,

                          plo.ploid as programs_ploid, programs.program_id as programs_programId,
                          
                       
                         
                          null programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM plo LEFT JOIN programs ON programs.program_id = plo.program_id AND programs.status !='inactive' WHERE (programs.program_id = {{id}}  AND  programs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE programs SET status = 'inactive' WHERE program_id = {{id}}"}    

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
                        successMessage: "programs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsPlo_object}