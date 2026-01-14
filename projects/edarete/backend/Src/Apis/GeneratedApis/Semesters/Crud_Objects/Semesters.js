/* CRUD Objects for table: semesters */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSemesters_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO semesters (program_id, semester_num, start_date, end_date, semester_name, created_by, updated_by) VALUES ({{semesters_programId}}, {{semesters_semesterNum}}, {{semesters_startDate}}, {{semesters_endDate}}, {{semesters_semesterName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE semesters SET program_id = {{semesters_programId}}, semester_num = {{semesters_semesterNum}}, start_date = {{semesters_startDate}}, end_date = {{semesters_endDate}}, semester_name = {{semesters_semesterName}} WHERE semester_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, semesters.semester_id as semesters_id, semesters.semester_id as id, semesters.semester_id as semesters_semesterId,semesters.program_id as semesters_programId,semesters.semester_num as semesters_semesterNum,semesters.start_date as semesters_startDate,semesters.end_date as semesters_endDate,semesters.semester_name as semesters_semesterName,semesters.status as semesters_status,semesters.created_by as semesters_createdBy,semesters.updated_by as semesters_updatedBy,semesters.created_at as semesters_createdAt,semesters.updated_at as semesters_updatedAt, programs.program_name as programs_programName FROM semesters LEFT JOIN programs ON semesters.program_id = programs.program_id Where semesters.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT semesters.semester_id as semesters_id, semesters.semester_id as id, semesters.semester_id as semesters_semesterId,semesters.program_id as semesters_programId,semesters.semester_num as semesters_semesterNum,semesters.start_date as semesters_startDate,semesters.end_date as semesters_endDate,semesters.semester_name as semesters_semesterName,semesters.status as semesters_status,semesters.created_by as semesters_createdBy,semesters.updated_by as semesters_updatedBy,semesters.created_at as semesters_createdAt,semesters.updated_at as semesters_updatedAt, programs.program_name as programs_programName FROM semesters LEFT JOIN programs ON semesters.program_id = programs.program_id WHERE semester_id = {{id}} OR semester_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE semesters SET status = 'inactive' WHERE semester_id = {{id}}"},           
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
                        permission: { Add: "add_semesters", View: "view_semesters", Update: "update_semesters", Delete: "delete_semesters", List: "list_semesters" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Semesters CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Semesters.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSemesters_object}