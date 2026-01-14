/* CRUD Objects for table: studentsubmissionattachment */
      
      const parameters = require('./CRUD_parameters');
      global.CrudStudentsubmissionattachment_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO studentsubmissionattachment (student_submission_id, attachement_id, created_by, updated_by) VALUES ({{studentsubmissionattachment_studentSubmissionId}}, {{studentsubmissionattachment_attachementId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE studentsubmissionattachment SET student_submission_id = {{studentsubmissionattachment_studentSubmissionId}}, attachement_id = {{studentsubmissionattachment_attachementId}} WHERE student_submission_attachment_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, studentsubmissionattachment.student_submission_attachment_id as studentsubmissionattachment_id, studentsubmissionattachment.student_submission_attachment_id as id, studentsubmissionattachment.student_submission_attachment_id as studentsubmissionattachment_studentSubmissionAttachmentId,studentsubmissionattachment.student_submission_id as studentsubmissionattachment_studentSubmissionId,studentsubmissionattachment.attachement_id as studentsubmissionattachment_attachementId,studentsubmissionattachment.status as studentsubmissionattachment_status,studentsubmissionattachment.created_by as studentsubmissionattachment_createdBy,studentsubmissionattachment.updated_by as studentsubmissionattachment_updatedBy,studentsubmissionattachment.created_at as studentsubmissionattachment_createdAt,studentsubmissionattachment.updated_at as studentsubmissionattachment_updatedAt FROM studentsubmissionattachment  Where studentsubmissionattachment.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT studentsubmissionattachment.student_submission_attachment_id as studentsubmissionattachment_id, studentsubmissionattachment.student_submission_attachment_id as id, studentsubmissionattachment.student_submission_attachment_id as studentsubmissionattachment_studentSubmissionAttachmentId,studentsubmissionattachment.student_submission_id as studentsubmissionattachment_studentSubmissionId,studentsubmissionattachment.attachement_id as studentsubmissionattachment_attachementId,studentsubmissionattachment.status as studentsubmissionattachment_status,studentsubmissionattachment.created_by as studentsubmissionattachment_createdBy,studentsubmissionattachment.updated_by as studentsubmissionattachment_updatedBy,studentsubmissionattachment.created_at as studentsubmissionattachment_createdAt,studentsubmissionattachment.updated_at as studentsubmissionattachment_updatedAt FROM studentsubmissionattachment  WHERE student_submission_attachment_id = {{id}} OR student_submission_attachment_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE studentsubmissionattachment SET status = 'inactive' WHERE student_submission_attachment_id = {{id}}"},           
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
                        permission: { Add: "add_studentsubmissionattachment", View: "view_studentsubmissionattachment", Update: "update_studentsubmissionattachment", Delete: "delete_studentsubmissionattachment", List: "list_studentsubmissionattachment" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Studentsubmissionattachment CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Studentsubmissionattachment.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudStudentsubmissionattachment_object}