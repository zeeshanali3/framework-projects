const parameters = require('./CRUD_parameters');
        global.GroupedCrudsStudentsubmissionattachment_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO studentsubmissionattachment (student_submission_id, attachement_id , created_by, updated_by) VALUES ({{studentsubmissionattachment_studentSubmissionId}}, {{studentsubmissionattachment_attachementId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE studentsubmissionattachment SET student_submission_id = {{studentsubmissionattachment_studentSubmissionId}}, attachement_id = {{studentsubmissionattachment_attachementId}}, created_by = {{studentsubmissionattachment_createdBy}}, updated_by = {{studentsubmissionattachment_updatedBy}} WHERE student_submission_attachment_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, student_submission_attachment_id as studentsubmissionattachment_id,student_submission_attachment_id as id, studentsubmissionattachment.student_submission_id as studentsubmissionattachment_studentSubmissionId, studentsubmissionattachment.attachement_id as studentsubmissionattachment_attachementId  FROM studentsubmissionattachment WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            studentsubmissionattachment.student_submission_attachment_id as studentsubmissionattachment_id,
                        undefined.undefined as id,
                       studentsubmissionattachment.student_submission_attachment_id as  studentsubmissionattachment_studentSubmissionAttachmentId,

                          studentsubmissionattachment.student_submission_attachment_id as undefined_studentSubmissionAttachmentId,
                          
                       
                         
                          null studentsubmissionattachment.student_submission_id as studentsubmissionattachment_studentSubmissionId, studentsubmissionattachment.attachement_id as studentsubmissionattachment_attachementId, 
                        undefined FROM studentsubmissionattachment  WHERE (studentsubmissionattachment.student_submission_attachment_id = {{id}}  AND  studentsubmissionattachment.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE studentsubmissionattachment SET status = 'inactive' WHERE student_submission_attachment_id = {{id}}"}    

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
                        successMessage: "studentsubmissionattachment Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsStudentsubmissionattachment_object}