/* CRUD Objects for table: employeedomain */
      
      const parameters = require('./CRUD_parameters');
      global.CrudEmployeedomain_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO employeedomain (employee_id, domain_id, created_by, updated_by) VALUES ({{employeedomain_employeeId}}, {{employeedomain_domainId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE employeedomain SET employee_id = {{employeedomain_employeeId}}, domain_id = {{employeedomain_domainId}} WHERE employee_domain_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employeedomain.employee_domain_id as employeedomain_id, employeedomain.employee_domain_id as id, employeedomain.employee_domain_id as employeedomain_employeeDomainId,employeedomain.employee_id as employeedomain_employeeId,employeedomain.domain_id as employeedomain_domainId,employeedomain.status as employeedomain_status,employeedomain.created_by as employeedomain_createdBy,employeedomain.updated_by as employeedomain_updatedBy,employeedomain.created_at as employeedomain_createdAt,employeedomain.updated_at as employeedomain_updatedAt FROM employeedomain  Where employeedomain.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT employeedomain.employee_domain_id as employeedomain_id, employeedomain.employee_domain_id as id, employeedomain.employee_domain_id as employeedomain_employeeDomainId,employeedomain.employee_id as employeedomain_employeeId,employeedomain.domain_id as employeedomain_domainId,employeedomain.status as employeedomain_status,employeedomain.created_by as employeedomain_createdBy,employeedomain.updated_by as employeedomain_updatedBy,employeedomain.created_at as employeedomain_createdAt,employeedomain.updated_at as employeedomain_updatedAt FROM employeedomain  WHERE employee_domain_id = {{id}} OR employee_domain_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE employeedomain SET status = 'inactive' WHERE employee_domain_id = {{id}}"},           
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
                        permission: { Add: "add_employeedomain", View: "view_employeedomain", Update: "update_employeedomain", Delete: "delete_employeedomain", List: "list_employeedomain" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Employeedomain CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Employeedomain.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudEmployeedomain_object}