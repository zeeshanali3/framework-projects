/* CRUD Objects for table: rooms */
      
      const parameters = require('./CRUD_parameters');
      global.CrudRooms_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO rooms (room_name, room_capacity, room_location, created_by, updated_by) VALUES ({{rooms_roomName}}, {{rooms_roomCapacity}}, {{rooms_roomLocation}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE rooms SET room_name = {{rooms_roomName}}, room_capacity = {{rooms_roomCapacity}}, room_location = {{rooms_roomLocation}} WHERE room_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, rooms.room_id as rooms_id, rooms.room_id as id, rooms.room_id as rooms_roomId,rooms.room_name as rooms_roomName,rooms.room_capacity as rooms_roomCapacity,rooms.room_location as rooms_roomLocation,rooms.status as rooms_status,rooms.created_by as rooms_createdBy,rooms.updated_by as rooms_updatedBy,rooms.created_at as rooms_createdAt,rooms.updated_at as rooms_updatedAt FROM rooms  Where rooms.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT rooms.room_id as rooms_id, rooms.room_id as id, rooms.room_id as rooms_roomId,rooms.room_name as rooms_roomName,rooms.room_capacity as rooms_roomCapacity,rooms.room_location as rooms_roomLocation,rooms.status as rooms_status,rooms.created_by as rooms_createdBy,rooms.updated_by as rooms_updatedBy,rooms.created_at as rooms_createdAt,rooms.updated_at as rooms_updatedAt FROM rooms  WHERE room_id = {{id}} OR room_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE rooms SET status = 'inactive' WHERE room_id = {{id}}"},           
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
                        permission: { Add: "add_rooms", View: "view_rooms", Update: "update_rooms", Delete: "delete_rooms", List: "list_rooms" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Rooms CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Rooms.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudRooms_object}