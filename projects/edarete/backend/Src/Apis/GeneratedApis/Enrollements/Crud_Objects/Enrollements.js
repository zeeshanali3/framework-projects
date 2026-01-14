/* CRUD Objects for table: enrollements */
      
      const parameters = require('./CRUD_parameters');
      global.CrudEnrollements_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO enrollements (student_semester_id, grade, group_name, enrolled_date, course_id, created_by, updated_by) VALUES ({{enrollements_studentSemesterId}}, {{enrollements_grade}}, {{enrollements_groupName}}, {{enrollements_enrolledDate}}, {{enrollements_courseId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE enrollements SET student_semester_id = {{enrollements_studentSemesterId}}, grade = {{enrollements_grade}}, group_name = {{enrollements_groupName}}, enrolled_date = {{enrollements_enrolledDate}}, course_id = {{enrollements_courseId}} WHERE enrollement_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, enrollements.enrollement_id as enrollements_id, enrollements.enrollement_id as id, enrollements.enrollement_id as enrollements_enrollementId,enrollements.student_semester_id as enrollements_studentSemesterId,enrollements.grade as enrollements_grade,enrollements.group_name as enrollements_groupName,enrollements.enrolled_date as enrollements_enrolledDate,enrollements.course_id as enrollements_courseId,enrollements.status as enrollements_status,enrollements.created_by as enrollements_createdBy,enrollements.updated_by as enrollements_updatedBy,enrollements.created_at as enrollements_createdAt,enrollements.updated_at as enrollements_updatedAt FROM enrollements  Where enrollements.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT enrollements.enrollement_id as enrollements_id, enrollements.enrollement_id as id, enrollements.enrollement_id as enrollements_enrollementId,enrollements.student_semester_id as enrollements_studentSemesterId,enrollements.grade as enrollements_grade,enrollements.group_name as enrollements_groupName,enrollements.enrolled_date as enrollements_enrolledDate,enrollements.course_id as enrollements_courseId,enrollements.status as enrollements_status,enrollements.created_by as enrollements_createdBy,enrollements.updated_by as enrollements_updatedBy,enrollements.created_at as enrollements_createdAt,enrollements.updated_at as enrollements_updatedAt FROM enrollements  WHERE enrollement_id = {{id}} OR enrollement_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE enrollements SET status = 'inactive' WHERE enrollement_id = {{id}}"},           
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
                        permission: { Add: "add_enrollements", View: "view_enrollements", Update: "update_enrollements", Delete: "delete_enrollements", List: "list_enrollements" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Enrollements CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Enrollements.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudEnrollements_object}