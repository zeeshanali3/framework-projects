/* CRUD Objects for table: questionssolutions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuestionssolutions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO questionssolutions (, created_by, updated_by) VALUES (, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE questionssolutions SET  WHERE questions_help_guide_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questionssolutions.questions_help_guide_id as questionssolutions_id, questionssolutions.questions_help_guide_id as id, questionssolutions.questions_help_guide_id as questionssolutions_questionsHelpGuideId,questionssolutions.status as questionssolutions_status,questionssolutions.created_by as questionssolutions_createdBy,questionssolutions.updated_by as questionssolutions_updatedBy,questionssolutions.created_at as questionssolutions_createdAt,questionssolutions.updated_at as questionssolutions_updatedAt FROM questionssolutions  Where questionssolutions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT questionssolutions.questions_help_guide_id as questionssolutions_id, questionssolutions.questions_help_guide_id as id, questionssolutions.questions_help_guide_id as questionssolutions_questionsHelpGuideId,questionssolutions.status as questionssolutions_status,questionssolutions.created_by as questionssolutions_createdBy,questionssolutions.updated_by as questionssolutions_updatedBy,questionssolutions.created_at as questionssolutions_createdAt,questionssolutions.updated_at as questionssolutions_updatedAt FROM questionssolutions  WHERE questions_help_guide_id = {{id}} OR questions_help_guide_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE questionssolutions SET status = 'inactive' WHERE questions_help_guide_id = {{id}}"},           
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
                        permission: { Add: "add_questionssolutions", View: "view_questionssolutions", Update: "update_questionssolutions", Delete: "delete_questionssolutions", List: "list_questionssolutions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Questionssolutions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Questionssolutions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestionssolutions_object}