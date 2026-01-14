/* CRUD Objects for table: institute_domains */
      
      const parameters = require('./CRUD_parameters');
      global.CrudInstitute_domains_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO institute_domains (institute_id, domain_id, created_by, updated_by) VALUES ({{instituteDomains_instituteId}}, {{instituteDomains_domainId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE institute_domains SET institute_id = {{instituteDomains_instituteId}}, domain_id = {{instituteDomains_domainId}} WHERE institute_domain_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, institute_domains.institute_domain_id as instituteDomains_id, institute_domains.institute_domain_id as id, institute_domains.institute_domain_id as instituteDomains_instituteDomainId,institute_domains.institute_id as instituteDomains_instituteId,institute_domains.domain_id as instituteDomains_domainId, institutes.institute_name as institutes_instituteName,domains.domain_name as domains_domainName FROM institute_domains LEFT JOIN institutes ON institute_domains.institute_id = institutes.institute_id LEFT JOIN domains ON institute_domains.domain_id = domains.domain_id Where institute_domains.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT institute_domains.institute_domain_id as instituteDomains_id, institute_domains.institute_domain_id as id, institute_domains.institute_domain_id as instituteDomains_instituteDomainId,institute_domains.institute_id as instituteDomains_instituteId,institute_domains.domain_id as instituteDomains_domainId, institutes.institute_name as institutes_instituteName,domains.domain_name as domains_domainName FROM institute_domains LEFT JOIN institutes ON institute_domains.institute_id = institutes.institute_id LEFT JOIN domains ON institute_domains.domain_id = domains.domain_id WHERE institute_domain_id = {{id}} OR institute_domain_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE institute_domains SET status = 'inactive' WHERE institute_domain_id = {{id}}"},           
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
                        permission: { Add: "add_institute_domains", View: "view_institute_domains", Update: "update_institute_domains", Delete: "delete_institute_domains", List: "list_institute_domains" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Institute_domains CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Institute_domains.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudInstitute_domains_object}