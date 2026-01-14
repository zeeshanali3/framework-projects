/* CRUD Objects for table: timeslots */
      
      const parameters = require('./CRUD_parameters');
      global.CrudTimeslots_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO timeslots (start_time, end_time, day, created_by, updated_by) VALUES ({{timeslots_startTime}}, {{timeslots_endTime}}, {{timeslots_day}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE timeslots SET start_time = {{timeslots_startTime}}, end_time = {{timeslots_endTime}}, day = {{timeslots_day}} WHERE time_slot_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, timeslots.time_slot_id as timeslots_id, timeslots.time_slot_id as id, timeslots.time_slot_id as timeslots_timeSlotId,timeslots.start_time as timeslots_startTime,timeslots.end_time as timeslots_endTime,timeslots.day as timeslots_day,timeslots.status as timeslots_status,timeslots.created_by as timeslots_createdBy,timeslots.updated_by as timeslots_updatedBy,timeslots.created_at as timeslots_createdAt,timeslots.updated_at as timeslots_updatedAt FROM timeslots  Where timeslots.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT timeslots.time_slot_id as timeslots_id, timeslots.time_slot_id as id, timeslots.time_slot_id as timeslots_timeSlotId,timeslots.start_time as timeslots_startTime,timeslots.end_time as timeslots_endTime,timeslots.day as timeslots_day,timeslots.status as timeslots_status,timeslots.created_by as timeslots_createdBy,timeslots.updated_by as timeslots_updatedBy,timeslots.created_at as timeslots_createdAt,timeslots.updated_at as timeslots_updatedAt FROM timeslots  WHERE time_slot_id = {{id}} OR time_slot_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE timeslots SET status = 'inactive' WHERE time_slot_id = {{id}}"},           
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
                        permission: { Add: "add_timeslots", View: "view_timeslots", Update: "update_timeslots", Delete: "delete_timeslots", List: "list_timeslots" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Timeslots CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Timeslots.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudTimeslots_object}