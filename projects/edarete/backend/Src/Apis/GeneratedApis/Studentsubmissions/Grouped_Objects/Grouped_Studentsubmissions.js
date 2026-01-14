const parameters = require('./CRUD_parameters');
        global.GroupedCrudsStudentsubmissions_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO studentsubmissions (sub_component_id, enrollment_id , created_by, updated_by) VALUES ({{studentsubmissions_subComponentId}}, {{studentsubmissions_enrollmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE studentsubmissions SET sub_component_id = {{studentsubmissions_subComponentId}}, enrollment_id = {{studentsubmissions_enrollmentId}}, created_by = {{studentsubmissions_createdBy}}, updated_by = {{studentsubmissions_updatedBy}} WHERE student_submission_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, student_submission_id as studentsubmissions_id,student_submission_id as id, studentsubmissions.sub_component_id as studentsubmissions_subComponentId, studentsubmissions.enrollment_id as studentsubmissions_enrollmentId  FROM studentsubmissions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            studentsubmissions.student_submission_id as studentsubmissions_id,
                        undefined.undefined as id,
                       studentsubmissions.student_submission_id as  studentsubmissions_studentSubmissionId,

                          studentsubmissions.student_submission_id as undefined_studentSubmissionId,
                          
                       
                         
                          null studentsubmissions.sub_component_id as studentsubmissions_subComponentId, studentsubmissions.enrollment_id as studentsubmissions_enrollmentId, 
                        undefined FROM studentsubmissions  WHERE (studentsubmissions.student_submission_id = {{id}}  AND  studentsubmissions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE studentsubmissions SET status = 'inactive' WHERE student_submission_id = {{id}}"}    

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
                        successMessage: "studentsubmissions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsStudentsubmissions_object}