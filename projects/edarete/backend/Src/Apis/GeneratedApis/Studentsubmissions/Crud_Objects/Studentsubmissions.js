/* CRUD Objects for table: studentsubmissions */
      
      const parameters = require('./CRUD_parameters');
      global.CrudStudentsubmissions_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO studentsubmissions (sub_component_id, enrollment_id, created_by, updated_by) VALUES ({{studentsubmissions_subComponentId}}, {{studentsubmissions_enrollmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE studentsubmissions SET sub_component_id = {{studentsubmissions_subComponentId}}, enrollment_id = {{studentsubmissions_enrollmentId}} WHERE student_submission_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, studentsubmissions.student_submission_id as studentsubmissions_id, studentsubmissions.student_submission_id as id, studentsubmissions.student_submission_id as studentsubmissions_studentSubmissionId,studentsubmissions.sub_component_id as studentsubmissions_subComponentId,studentsubmissions.enrollment_id as studentsubmissions_enrollmentId,studentsubmissions.status as studentsubmissions_status,studentsubmissions.created_by as studentsubmissions_createdBy,studentsubmissions.updated_by as studentsubmissions_updatedBy,studentsubmissions.created_at as studentsubmissions_createdAt,studentsubmissions.updated_at as studentsubmissions_updatedAt FROM studentsubmissions  Where studentsubmissions.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT studentsubmissions.student_submission_id as studentsubmissions_id, studentsubmissions.student_submission_id as id, studentsubmissions.student_submission_id as studentsubmissions_studentSubmissionId,studentsubmissions.sub_component_id as studentsubmissions_subComponentId,studentsubmissions.enrollment_id as studentsubmissions_enrollmentId,studentsubmissions.status as studentsubmissions_status,studentsubmissions.created_by as studentsubmissions_createdBy,studentsubmissions.updated_by as studentsubmissions_updatedBy,studentsubmissions.created_at as studentsubmissions_createdAt,studentsubmissions.updated_at as studentsubmissions_updatedAt FROM studentsubmissions  WHERE student_submission_id = {{id}} OR student_submission_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE studentsubmissions SET status = 'inactive' WHERE student_submission_id = {{id}}"},           
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
                        permission: { Add: "add_studentsubmissions", View: "view_studentsubmissions", Update: "update_studentsubmissions", Delete: "delete_studentsubmissions", List: "list_studentsubmissions" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Studentsubmissions CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Studentsubmissions.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudStudentsubmissions_object}