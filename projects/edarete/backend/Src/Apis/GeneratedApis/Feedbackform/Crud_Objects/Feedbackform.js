/* CRUD Objects for table: feedbackform */
      
      const parameters = require('./CRUD_parameters');
      global.CrudFeedbackform_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO feedbackform (form_name, start_date, end_date, created_by, updated_by) VALUES ({{feedbackform_formName}}, {{feedbackform_startDate}}, {{feedbackform_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE feedbackform SET form_name = {{feedbackform_formName}}, start_date = {{feedbackform_startDate}}, end_date = {{feedbackform_endDate}} WHERE feedback_form_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, feedbackform.feedback_form_id as feedbackform_id, feedbackform.feedback_form_id as id, feedbackform.feedback_form_id as feedbackform_feedbackFormId,feedbackform.feedback_form_id as feedbackform_feedbackFormId,feedbackform.form_name as feedbackform_formName,feedbackform.start_date as feedbackform_startDate,feedbackform.end_date as feedbackform_endDate,feedbackform.status as feedbackform_status,feedbackform.created_by as feedbackform_createdBy,feedbackform.updated_by as feedbackform_updatedBy,feedbackform.created_at as feedbackform_createdAt,feedbackform.updated_at as feedbackform_updatedAt FROM feedbackform  Where feedbackform.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT feedbackform.feedback_form_id as feedbackform_id, feedbackform.feedback_form_id as id, feedbackform.feedback_form_id as feedbackform_feedbackFormId,feedbackform.feedback_form_id as feedbackform_feedbackFormId,feedbackform.form_name as feedbackform_formName,feedbackform.start_date as feedbackform_startDate,feedbackform.end_date as feedbackform_endDate,feedbackform.status as feedbackform_status,feedbackform.created_by as feedbackform_createdBy,feedbackform.updated_by as feedbackform_updatedBy,feedbackform.created_at as feedbackform_createdAt,feedbackform.updated_at as feedbackform_updatedAt FROM feedbackform  WHERE feedback_form_id = {{id}} OR feedback_form_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE feedbackform SET status = 'inactive' WHERE feedback_form_id = {{id}}"},           
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
                        permission: { Add: "add_feedbackform", View: "view_feedbackform", Update: "update_feedbackform", Delete: "delete_feedbackform", List: "list_feedbackform" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Feedbackform CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Feedbackform.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudFeedbackform_object}