/* CRUD Objects for table: domains */
      
      const parameters = require('./CRUD_parameters');
      global.CrudDomains_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO domains (domain_name, domain_leader_id, created_by, updated_by) VALUES ({{domains_domainName}}, {{domains_domainLeaderId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE domains SET domain_name = {{domains_domainName}}, domain_leader_id = {{domains_domainLeaderId}} WHERE domain_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, domains.domain_id as domains_id, domains.domain_id as id, domains.domain_id as domains_domainId,domains.domain_name as domains_domainName,domains.domain_leader_id as domains_domainLeaderId,domains.status as domains_status,domains.created_by as domains_createdBy,domains.updated_by as domains_updatedBy,domains.created_at as domains_createdAt,domains.updated_at as domains_updatedAt FROM domains  Where domains.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT domains.domain_id as domains_id, domains.domain_id as id, domains.domain_id as domains_domainId,domains.domain_name as domains_domainName,domains.domain_leader_id as domains_domainLeaderId,domains.status as domains_status,domains.created_by as domains_createdBy,domains.updated_by as domains_updatedBy,domains.created_at as domains_createdAt,domains.updated_at as domains_updatedAt FROM domains  WHERE domain_id = {{id}} OR domain_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE domains SET status = 'inactive' WHERE domain_id = {{id}}"},           
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
                        permission: { Add: "add_domains", View: "view_domains", Update: "update_domains", Delete: "delete_domains", List: "list_domains" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Domains CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Domains.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudDomains_object}