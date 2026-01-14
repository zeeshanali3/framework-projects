/* CRUD Objects for table: institutes */
      
      const parameters = require('./CRUD_parameters');
      global.CrudInstitutes_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO institutes (institute_name, institute_email_domain, created_by, updated_by) VALUES ({{institutes_instituteName}}, {{institutes_instituteEmailDomain}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE institutes SET institute_name = {{institutes_instituteName}}, institute_email_domain = {{institutes_instituteEmailDomain}} WHERE institute_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, institutes.institute_id as institutes_id, institutes.institute_id as id, institutes.institute_id as institutes_instituteId,institutes.institute_name as institutes_instituteName,institutes.institute_email_domain as institutes_instituteEmailDomain FROM institutes  Where institutes.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT institutes.institute_id as institutes_id, institutes.institute_id as id, institutes.institute_id as institutes_instituteId,institutes.institute_name as institutes_instituteName,institutes.institute_email_domain as institutes_instituteEmailDomain FROM institutes  WHERE institute_id = {{id}} OR institute_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE institutes SET status = 'inactive' WHERE institute_id = {{id}}"},           
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
                        permission: { Add: "add_institutes", View: "view_institutes", Update: "update_institutes", Delete: "delete_institutes", List: "list_institutes" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Institutes CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Institutes.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudInstitutes_object}