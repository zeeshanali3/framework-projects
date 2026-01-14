/* CRUD Objects for table: lecturesattendance */
      
      const parameters = require('./CRUD_parameters');
      global.CrudLecturesattendance_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id, created_by, updated_by) VALUES ({{lecturesattendance_enrollementId}}, {{lecturesattendance_date}}, {{lecturesattendance_isPresent}}, {{lecturesattendance_subComponentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE lecturesattendance SET enrollement_id = {{lecturesattendance_enrollementId}}, date = {{lecturesattendance_date}}, is_present = {{lecturesattendance_isPresent}}, sub_component_id = {{lecturesattendance_subComponentId}} WHERE attendance_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, lecturesattendance.attendance_id as lecturesattendance_id, lecturesattendance.attendance_id as id, lecturesattendance.attendance_id as lecturesattendance_attendanceId,lecturesattendance.enrollement_id as lecturesattendance_enrollementId,lecturesattendance.date as lecturesattendance_date,lecturesattendance.is_present as lecturesattendance_isPresent,lecturesattendance.sub_component_id as lecturesattendance_subComponentId,lecturesattendance.status as lecturesattendance_status,lecturesattendance.created_by as lecturesattendance_createdBy,lecturesattendance.updated_by as lecturesattendance_updatedBy,lecturesattendance.created_at as lecturesattendance_createdAt,lecturesattendance.updated_at as lecturesattendance_updatedAt, enrollements.group_name as enrollements_groupName FROM lecturesattendance LEFT JOIN enrollements ON lecturesattendance.enrollement_id = enrollements.enrollement_id Where lecturesattendance.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT lecturesattendance.attendance_id as lecturesattendance_id, lecturesattendance.attendance_id as id, lecturesattendance.attendance_id as lecturesattendance_attendanceId,lecturesattendance.enrollement_id as lecturesattendance_enrollementId,lecturesattendance.date as lecturesattendance_date,lecturesattendance.is_present as lecturesattendance_isPresent,lecturesattendance.sub_component_id as lecturesattendance_subComponentId,lecturesattendance.status as lecturesattendance_status,lecturesattendance.created_by as lecturesattendance_createdBy,lecturesattendance.updated_by as lecturesattendance_updatedBy,lecturesattendance.created_at as lecturesattendance_createdAt,lecturesattendance.updated_at as lecturesattendance_updatedAt, enrollements.group_name as enrollements_groupName FROM lecturesattendance LEFT JOIN enrollements ON lecturesattendance.enrollement_id = enrollements.enrollement_id WHERE attendance_id = {{id}} OR attendance_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE lecturesattendance SET status = 'inactive' WHERE attendance_id = {{id}}"},           
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
                        permission: { Add: "add_lecturesattendance", View: "view_lecturesattendance", Update: "update_lecturesattendance", Delete: "delete_lecturesattendance", List: "list_lecturesattendance" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Lecturesattendance CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Lecturesattendance.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudLecturesattendance_object}