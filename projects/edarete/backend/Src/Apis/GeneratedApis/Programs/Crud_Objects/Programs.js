/* CRUD Objects for table: programs */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPrograms_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO programs (department_id, domain_id, program_name, program_year, created_by, updated_by) VALUES ({{programs_departmentId}}, {{programs_domainId}}, {{programs_programName}}, {{programs_programYear}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE programs SET department_id = {{programs_departmentId}}, domain_id = {{programs_domainId}}, program_name = {{programs_programName}}, program_year = {{programs_programYear}} WHERE program_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, programs.program_id as programs_id, programs.program_id as id, programs.program_id as programs_programId,programs.department_id as programs_departmentId,programs.domain_id as programs_domainId,programs.program_name as programs_programName,programs.program_year as programs_programYear,programs.status as programs_status,programs.created_by as programs_createdBy,programs.updated_by as programs_updatedBy,programs.created_at as programs_createdAt,programs.updated_at as programs_updatedAt, departments.department_name as departments_departmentName,domains.domain_name as domains_domainName FROM programs LEFT JOIN departments ON programs.department_id = departments.department_id LEFT JOIN domains ON programs.domain_id = domains.domain_id Where programs.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT programs.program_id as programs_id, programs.program_id as id, programs.program_id as programs_programId,programs.department_id as programs_departmentId,programs.domain_id as programs_domainId,programs.program_name as programs_programName,programs.program_year as programs_programYear,programs.status as programs_status,programs.created_by as programs_createdBy,programs.updated_by as programs_updatedBy,programs.created_at as programs_createdAt,programs.updated_at as programs_updatedAt, departments.department_name as departments_departmentName,domains.domain_name as domains_domainName FROM programs LEFT JOIN departments ON programs.department_id = departments.department_id LEFT JOIN domains ON programs.domain_id = domains.domain_id WHERE program_id = {{id}} OR program_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE programs SET status = 'inactive' WHERE program_id = {{id}}"},           
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
                        permission: { Add: "add_programs", View: "view_programs", Update: "update_programs", Delete: "delete_programs", List: "list_programs" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Programs CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Programs.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPrograms_object}