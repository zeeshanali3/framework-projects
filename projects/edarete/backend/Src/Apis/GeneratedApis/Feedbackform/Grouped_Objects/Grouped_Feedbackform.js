const parameters = require('./CRUD_parameters');
        global.GroupedCrudsFeedbackform_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO feedbackform (form_name, start_date, end_date , created_by, updated_by) VALUES ({{feedbackform_formName}}, {{feedbackform_startDate}}, {{feedbackform_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE feedbackform SET form_name = {{feedbackform_formName}}, start_date = {{feedbackform_startDate}}, end_date = {{feedbackform_endDate}} WHERE feed_back_form_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, feed_back_form_id as feedbackform_id,feed_back_form_id as id, feedbackform.form_name as feedbackform_formName, feedbackform.start_date as feedbackform_startDate, feedbackform.end_date as feedbackform_endDate  FROM feedbackform WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            feedbackform.feed_back_form_id as feedbackform_id,
                        undefined.undefined as id,
                       feedbackform.feed_back_form_id as  feedbackform_feedBackFormId,

                          feedbackform.feed_back_form_id as undefined_feedBackFormId,
                          
                       
                         
                          null feedbackform.form_name as feedbackform_formName, feedbackform.start_date as feedbackform_startDate, feedbackform.end_date as feedbackform_endDate, 
                        undefined FROM feedbackform  WHERE (feedbackform.feed_back_form_id = {{id}}  AND  feedbackform.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE feedbackform SET status = 'inactive' WHERE feed_back_form_id = {{id}}"}    

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
                        successMessage: "feedbackform Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsFeedbackform_object}