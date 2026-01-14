/* CRUD Objects for table: students */
      
      const parameters = require('./CRUD_parameters');
      global.CrudStudents_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO students (urdd_id, program_id, batch, reg_num, created_by, updated_by) VALUES ({{students_urddId}}, {{students_programId}}, {{students_batch}}, {{students_regNum}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE students SET urdd_id = {{students_urddId}}, program_id = {{students_programId}}, batch = {{students_batch}}, reg_num = {{students_regNum}} WHERE student_user_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, students.student_user_id as students_id, students.student_user_id as id, students.student_user_id as students_studentUserId,students.urdd_id as students_urddId,students.program_id as students_programId,students.batch as students_batch,students.reg_num as students_regNum,students.status as students_status,students.created_by as students_createdBy,students.updated_by as students_updatedBy,students.created_at as students_createdAt,students.updated_at as students_updatedAt, programs.program_name as programs_programName FROM students LEFT JOIN programs ON students.program_id = programs.program_id Where students.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT students.student_user_id as students_id, students.student_user_id as id, students.student_user_id as students_studentUserId,students.urdd_id as students_urddId,students.program_id as students_programId,students.batch as students_batch,students.reg_num as students_regNum,students.status as students_status,students.created_by as students_createdBy,students.updated_by as students_updatedBy,students.created_at as students_createdAt,students.updated_at as students_updatedAt, programs.program_name as programs_programName FROM students LEFT JOIN programs ON students.program_id = programs.program_id WHERE student_user_id = {{id}} OR student_user_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE students SET status = 'inactive' WHERE student_user_id = {{id}}"},           
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
                        permission: { Add: "add_students", View: "view_students", Update: "update_students", Delete: "delete_students", List: "list_students" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Students CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Students.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudStudents_object}