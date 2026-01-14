/* CRUD Objects for table: studentsemesters */
      
      const parameters = require('./CRUD_parameters');
      global.CrudStudentsemesters_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO studentsemesters (student_user_id, semester_id, CGPA, SGPA, credits_acquired, attendance_delta, created_by, updated_by) VALUES ({{studentsemesters_studentUserId}}, {{studentsemesters_semesterId}}, {{studentsemesters_CGPA}}, {{studentsemesters_SGPA}}, {{studentsemesters_creditsAcquired}}, {{studentsemesters_attendanceDelta}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE studentsemesters SET student_user_id = {{studentsemesters_studentUserId}}, semester_id = {{studentsemesters_semesterId}}, CGPA = {{studentsemesters_CGPA}}, SGPA = {{studentsemesters_SGPA}}, credits_acquired = {{studentsemesters_creditsAcquired}}, attendance_delta = {{studentsemesters_attendanceDelta}} WHERE student_semester_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, studentsemesters.student_semester_id as studentsemesters_id, studentsemesters.student_semester_id as id, studentsemesters.student_semester_id as studentsemesters_studentSemesterId,studentsemesters.student_user_id as studentsemesters_studentUserId,studentsemesters.semester_id as studentsemesters_semesterId,studentsemesters.CGPA as studentsemesters_CGPA,studentsemesters.SGPA as studentsemesters_SGPA,studentsemesters.credits_acquired as studentsemesters_creditsAcquired,studentsemesters.attendance_delta as studentsemesters_attendanceDelta,studentsemesters.status as studentsemesters_status,studentsemesters.created_by as studentsemesters_createdBy,studentsemesters.updated_by as studentsemesters_updatedBy,studentsemesters.created_at as studentsemesters_createdAt,studentsemesters.updated_at as studentsemesters_updatedAt FROM studentsemesters  Where studentsemesters.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT studentsemesters.student_semester_id as studentsemesters_id, studentsemesters.student_semester_id as id, studentsemesters.student_semester_id as studentsemesters_studentSemesterId,studentsemesters.student_user_id as studentsemesters_studentUserId,studentsemesters.semester_id as studentsemesters_semesterId,studentsemesters.CGPA as studentsemesters_CGPA,studentsemesters.SGPA as studentsemesters_SGPA,studentsemesters.credits_acquired as studentsemesters_creditsAcquired,studentsemesters.attendance_delta as studentsemesters_attendanceDelta,studentsemesters.status as studentsemesters_status,studentsemesters.created_by as studentsemesters_createdBy,studentsemesters.updated_by as studentsemesters_updatedBy,studentsemesters.created_at as studentsemesters_createdAt,studentsemesters.updated_at as studentsemesters_updatedAt FROM studentsemesters  WHERE student_semester_id = {{id}} OR student_semester_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE studentsemesters SET status = 'inactive' WHERE student_semester_id = {{id}}"},           
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
                        permission: { Add: "add_studentsemesters", View: "view_studentsemesters", Update: "update_studentsemesters", Delete: "delete_studentsemesters", List: "list_studentsemesters" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Studentsemesters CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Studentsemesters.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudStudentsemesters_object}