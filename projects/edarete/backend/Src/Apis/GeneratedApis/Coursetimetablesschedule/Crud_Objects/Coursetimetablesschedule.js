/* CRUD Objects for table: coursetimetablesschedule */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCoursetimetablesschedule_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO coursetimetablesschedule (course_id, employee_prefered_time_slots_id, time_slot_id, room_id, created_by, updated_by) VALUES ({{coursetimetablesschedule_courseId}}, {{coursetimetablesschedule_employeePreferedTimeSlotsId}}, {{coursetimetablesschedule_timeSlotId}}, {{coursetimetablesschedule_roomId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE coursetimetablesschedule SET course_id = {{coursetimetablesschedule_courseId}}, employee_prefered_time_slots_id = {{coursetimetablesschedule_employeePreferedTimeSlotsId}}, time_slot_id = {{coursetimetablesschedule_timeSlotId}}, room_id = {{coursetimetablesschedule_roomId}} WHERE course_lschedule_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_id, coursetimetablesschedule.course_lschedule_id as id, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_courseLscheduleId,coursetimetablesschedule.course_id as coursetimetablesschedule_courseId,coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId,coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId,coursetimetablesschedule.room_id as coursetimetablesschedule_roomId,coursetimetablesschedule.status as coursetimetablesschedule_status,coursetimetablesschedule.created_by as coursetimetablesschedule_createdBy,coursetimetablesschedule.updated_by as coursetimetablesschedule_updatedBy,coursetimetablesschedule.created_at as coursetimetablesschedule_createdAt,coursetimetablesschedule.updated_at as coursetimetablesschedule_updatedAt FROM coursetimetablesschedule  Where coursetimetablesschedule.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_id, coursetimetablesschedule.course_lschedule_id as id, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_courseLscheduleId,coursetimetablesschedule.course_id as coursetimetablesschedule_courseId,coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId,coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId,coursetimetablesschedule.room_id as coursetimetablesschedule_roomId,coursetimetablesschedule.status as coursetimetablesschedule_status,coursetimetablesschedule.created_by as coursetimetablesschedule_createdBy,coursetimetablesschedule.updated_by as coursetimetablesschedule_updatedBy,coursetimetablesschedule.created_at as coursetimetablesschedule_createdAt,coursetimetablesschedule.updated_at as coursetimetablesschedule_updatedAt FROM coursetimetablesschedule  WHERE course_lschedule_id = {{id}} OR course_lschedule_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE coursetimetablesschedule SET status = 'inactive' WHERE course_lschedule_id = {{id}}"},           
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
                        permission: { Add: "add_coursetimetablesschedule", View: "view_coursetimetablesschedule", Update: "update_coursetimetablesschedule", Delete: "delete_coursetimetablesschedule", List: "list_coursetimetablesschedule" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Coursetimetablesschedule CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Coursetimetablesschedule.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCoursetimetablesschedule_object}