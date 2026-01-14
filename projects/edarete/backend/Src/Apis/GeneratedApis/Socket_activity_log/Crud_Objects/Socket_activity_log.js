/* CRUD Objects for table: socket_activity_log */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSocket_activity_log_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO socket_activity_log (urdd_id, sub_component_id, activity_description, created_on, created_by, updated_by) VALUES ({{socketActivityLog_urddId}}, {{socketActivityLog_subComponentId}}, {{socketActivityLog_activityDescription}}, {{socketActivityLog_createdOn}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE socket_activity_log SET urdd_id = {{socketActivityLog_urddId}}, sub_component_id = {{socketActivityLog_subComponentId}}, activity_description = {{socketActivityLog_activityDescription}}, created_on = {{socketActivityLog_createdOn}} WHERE socket_activity_log_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, socket_activity_log.socket_activity_log_id as socketActivityLog_id, socket_activity_log.socket_activity_log_id as id, socket_activity_log.socket_activity_log_id as socketActivityLog_socketActivityLogId,socket_activity_log.urdd_id as socketActivityLog_urddId,socket_activity_log.sub_component_id as socketActivityLog_subComponentId,socket_activity_log.activity_description as socketActivityLog_activityDescription,socket_activity_log.created_on as socketActivityLog_createdOn FROM socket_activity_log  Where socket_activity_log.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT socket_activity_log.socket_activity_log_id as socketActivityLog_id, socket_activity_log.socket_activity_log_id as id, socket_activity_log.socket_activity_log_id as socketActivityLog_socketActivityLogId,socket_activity_log.urdd_id as socketActivityLog_urddId,socket_activity_log.sub_component_id as socketActivityLog_subComponentId,socket_activity_log.activity_description as socketActivityLog_activityDescription,socket_activity_log.created_on as socketActivityLog_createdOn FROM socket_activity_log  WHERE socket_activity_log_id = {{id}} OR socket_activity_log_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE socket_activity_log SET status = 'inactive' WHERE socket_activity_log_id = {{id}}"},           
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
                        permission: { Add: "add_socket_activity_log", View: "view_socket_activity_log", Update: "update_socket_activity_log", Delete: "delete_socket_activity_log", List: "list_socket_activity_log" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Socket_activity_log CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Socket_activity_log.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSocket_activity_log_object}