const parameters = require('./CRUD_parameters');
        global.GroupedCrudsInstitutes_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO institutes (institute_name, institute_email_domain , created_by, updated_by) VALUES ({{institutes_instituteName}}, {{institutes_instituteEmailDomain}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE institutes SET institute_name = {{institutes_instituteName}}, institute_email_domain = {{institutes_instituteEmailDomain}} WHERE institute_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, institute_id as institutes_id,institute_id as id, institutes.institute_name as institutes_instituteName, institutes.institute_email_domain as institutes_instituteEmailDomain  FROM institutes WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            institutes.institute_id as institutes_id, institute_domains.institute_domain_id as instituteDomains_id, domains.domain_id as domains_id,
                        institute_domains.institute_domain_id as id,
                       institutes.institute_name as  instituteDomains_institutesName, institute_domains.institute_domain_id as  instituteDomains_instituteDomainId, domains.domain_name as  instituteDomains_domainsName,

                          institutes.institute_id as instituteDomains_instituteId, institute_domains.institute_domain_id as instituteDomains_instituteDomainId, domains.domain_id as instituteDomains_domainId,
                          
                       
                         
                           institutes.institute_name as institutes_instituteName, institutes.institute_email_domain as institutes_instituteEmailDomain, 
                        institute_domains.institute_id as instituteDomains_instituteId, institute_domains.domain_id as instituteDomains_domainId FROM institutes LEFT JOIN institute_domains ON institute_domains.institute_id = institutes.institute_id AND institute_domains.status !='inactive' LEFT JOIN domains ON domains.domain_id = institute_domains.domain_id AND domains.status !='inactive' WHERE (institutes.institute_id = {{id}}  AND  institutes.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE institutes SET status = 'inactive' WHERE institute_id = {{id}}"}    

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
                        successMessage: "institutes Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO institute_domains (institute_id, domain_id , created_by, updated_by) VALUES ({{instituteDomains_instituteId}}, {{instituteDomains_domainId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE institute_domains SET institute_id = {{instituteDomains_instituteId}}, domain_id = {{instituteDomains_domainId}} WHERE institute_domain_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, institute_domain_id as instituteDomains_id,institute_domain_id as id, institute_domains.institute_id as instituteDomains_instituteId, institute_domains.domain_id as instituteDomains_domainId  FROM institute_domains WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            institutes.institute_id as institutes_id, institute_domains.institute_domain_id as instituteDomains_id, domains.domain_id as domains_id,
                        institute_domains.institute_domain_id as id,
                       institutes.institute_name as  instituteDomains_institutesName, institute_domains.institute_domain_id as  instituteDomains_instituteDomainId, domains.domain_name as  instituteDomains_domainsName,

                          institutes.institute_id as instituteDomains_instituteId, institute_domains.institute_domain_id as instituteDomains_instituteDomainId, domains.domain_id as instituteDomains_domainId,
                          
                       
                         
                           institute_domains.institute_id as instituteDomains_instituteId, institute_domains.domain_id as instituteDomains_domainId, 
                        institute_domains.institute_id as instituteDomains_instituteId, institute_domains.domain_id as instituteDomains_domainId FROM institutes LEFT JOIN institute_domains ON institute_domains.institute_id = institutes.institute_id AND institute_domains.status !='inactive' LEFT JOIN domains ON domains.domain_id = institute_domains.domain_id AND domains.status !='inactive' WHERE (institute_domains.institute_domain_id = {{id}}  AND  institute_domains.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE institute_domains SET status = 'inactive' WHERE institute_domain_id = {{id}}"}    

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
                        successMessage: "institute_domains Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsInstitutes_object}