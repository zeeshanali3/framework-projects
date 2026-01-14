/* CRUD Objects for table: coursefeedbackform */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCoursefeedbackform_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO coursefeedbackform (course_id, feedback_form_id, created_by, updated_by) VALUES ({{coursefeedbackform_courseId}}, {{coursefeedbackform_feedbackFormId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE coursefeedbackform SET course_id = {{coursefeedbackform_courseId}}, feedback_form_id = {{coursefeedbackform_feedbackFormId}} WHERE course_feed_back_form_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, coursefeedbackform.course_feed_back_form_id as coursefeedbackform_id, coursefeedbackform.course_feed_back_form_id as id, coursefeedbackform.course_feed_back_form_id as coursefeedbackform_courseFeedBackFormId,coursefeedbackform.course_id as coursefeedbackform_courseId,coursefeedbackform.feedback_form_id as coursefeedbackform_feedbackFormId,coursefeedbackform.status as coursefeedbackform_status,coursefeedbackform.created_by as coursefeedbackform_createdBy,coursefeedbackform.updated_by as coursefeedbackform_updatedBy,coursefeedbackform.created_at as coursefeedbackform_createdAt,coursefeedbackform.updated_at as coursefeedbackform_updatedAt, feedbackform.form_name as feedbackform_formName FROM coursefeedbackform LEFT JOIN feedbackform ON coursefeedbackform.feedback_form_id = feedbackform.feedback_form_id Where coursefeedbackform.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT coursefeedbackform.course_feed_back_form_id as coursefeedbackform_id, coursefeedbackform.course_feed_back_form_id as id, coursefeedbackform.course_feed_back_form_id as coursefeedbackform_courseFeedBackFormId,coursefeedbackform.course_id as coursefeedbackform_courseId,coursefeedbackform.feedback_form_id as coursefeedbackform_feedbackFormId,coursefeedbackform.status as coursefeedbackform_status,coursefeedbackform.created_by as coursefeedbackform_createdBy,coursefeedbackform.updated_by as coursefeedbackform_updatedBy,coursefeedbackform.created_at as coursefeedbackform_createdAt,coursefeedbackform.updated_at as coursefeedbackform_updatedAt, feedbackform.form_name as feedbackform_formName FROM coursefeedbackform LEFT JOIN feedbackform ON coursefeedbackform.feedback_form_id = feedbackform.feedback_form_id WHERE course_feed_back_form_id = {{id}} OR course_feed_back_form_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE coursefeedbackform SET status = 'inactive' WHERE course_feed_back_form_id = {{id}}"},           
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
                        permission: { Add: "add_coursefeedbackform", View: "view_coursefeedbackform", Update: "update_coursefeedbackform", Delete: "delete_coursefeedbackform", List: "list_coursefeedbackform" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Coursefeedbackform CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Coursefeedbackform.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCoursefeedbackform_object}