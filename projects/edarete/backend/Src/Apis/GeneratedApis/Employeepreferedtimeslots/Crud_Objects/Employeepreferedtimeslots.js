/* CRUD Objects for table: employeepreferedtimeslots */
      
      const parameters = require('./CRUD_parameters');
      global.CrudEmployeepreferedtimeslots_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO employeepreferedtimeslots (employee_id, time_slot_id, created_by, updated_by) VALUES ({{employeepreferedtimeslots_employeeId}}, {{employeepreferedtimeslots_timeSlotId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE employeepreferedtimeslots SET employee_id = {{employeepreferedtimeslots_employeeId}}, time_slot_id = {{employeepreferedtimeslots_timeSlotId}} WHERE employee_prefered_time_slots_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_id, employeepreferedtimeslots.employee_prefered_time_slots_id as id, employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_employeePreferedTimeSlotsId,employeepreferedtimeslots.employee_id as employeepreferedtimeslots_employeeId,employeepreferedtimeslots.time_slot_id as employeepreferedtimeslots_timeSlotId,employeepreferedtimeslots.status as employeepreferedtimeslots_status,employeepreferedtimeslots.created_by as employeepreferedtimeslots_createdBy,employeepreferedtimeslots.updated_by as employeepreferedtimeslots_updatedBy,employeepreferedtimeslots.created_at as employeepreferedtimeslots_createdAt,employeepreferedtimeslots.updated_at as employeepreferedtimeslots_updatedAt FROM employeepreferedtimeslots  Where employeepreferedtimeslots.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_id, employeepreferedtimeslots.employee_prefered_time_slots_id as id, employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_employeePreferedTimeSlotsId,employeepreferedtimeslots.employee_id as employeepreferedtimeslots_employeeId,employeepreferedtimeslots.time_slot_id as employeepreferedtimeslots_timeSlotId,employeepreferedtimeslots.status as employeepreferedtimeslots_status,employeepreferedtimeslots.created_by as employeepreferedtimeslots_createdBy,employeepreferedtimeslots.updated_by as employeepreferedtimeslots_updatedBy,employeepreferedtimeslots.created_at as employeepreferedtimeslots_createdAt,employeepreferedtimeslots.updated_at as employeepreferedtimeslots_updatedAt FROM employeepreferedtimeslots  WHERE employee_prefered_time_slots_id = {{id}} OR employee_prefered_time_slots_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE employeepreferedtimeslots SET status = 'inactive' WHERE employee_prefered_time_slots_id = {{id}}"},           
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
                        permission: { Add: "add_employeepreferedtimeslots", View: "view_employeepreferedtimeslots", Update: "update_employeepreferedtimeslots", Delete: "delete_employeepreferedtimeslots", List: "list_employeepreferedtimeslots" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Employeepreferedtimeslots CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Employeepreferedtimeslots.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudEmployeepreferedtimeslots_object}