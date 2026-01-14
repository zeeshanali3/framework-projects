/* CRUD Objects for table: questionssolution */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuestionssolution_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO questionssolution (question_id, attachment_id, options, created_by, updated_by) VALUES ({{questionssolution_questionId}}, {{questionssolution_attachmentId}}, {{questionssolution_options}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE questionssolution SET question_id = {{questionssolution_questionId}}, attachment_id = {{questionssolution_attachmentId}}, options = {{questionssolution_options}} WHERE questions_help_guide_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, questionssolution.questions_help_guide_id as questionssolution_id, questionssolution.questions_help_guide_id as id, questionssolution.questions_help_guide_id as questionssolution_questionsHelpGuideId,questionssolution.question_id as questionssolution_questionId,questionssolution.attachment_id as questionssolution_attachmentId,questionssolution.options as questionssolution_options,questionssolution.status as questionssolution_status,questionssolution.created_by as questionssolution_createdBy,questionssolution.updated_by as questionssolution_updatedBy,questionssolution.created_at as questionssolution_createdAt,questionssolution.updated_at as questionssolution_updatedAt, attachments.attachment_name as attachments_attachmentName FROM questionssolution LEFT JOIN attachments ON questionssolution.attachment_id = attachments.attachment_id Where questionssolution.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT questionssolution.questions_help_guide_id as questionssolution_id, questionssolution.questions_help_guide_id as id, questionssolution.questions_help_guide_id as questionssolution_questionsHelpGuideId,questionssolution.question_id as questionssolution_questionId,questionssolution.attachment_id as questionssolution_attachmentId,questionssolution.options as questionssolution_options,questionssolution.status as questionssolution_status,questionssolution.created_by as questionssolution_createdBy,questionssolution.updated_by as questionssolution_updatedBy,questionssolution.created_at as questionssolution_createdAt,questionssolution.updated_at as questionssolution_updatedAt, attachments.attachment_name as attachments_attachmentName FROM questionssolution LEFT JOIN attachments ON questionssolution.attachment_id = attachments.attachment_id WHERE questions_help_guide_id = {{id}} OR questions_help_guide_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE questionssolution SET status = 'inactive' WHERE questions_help_guide_id = {{id}}"},           
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
                        permission: { Add: "add_questionssolution", View: "view_questionssolution", Update: "update_questionssolution", Delete: "delete_questionssolution", List: "list_questionssolution" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Questionssolution CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Questionssolution.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestionssolution_object}