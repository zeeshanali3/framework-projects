/* CRUD Objects for table: chat */
      
      const parameters = require('./CRUD_parameters');
      global.CrudChat_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO chat (sub_component_id, urdd_id, message, message_time, private_chat, created_by, updated_by) VALUES ({{chat_subComponentId}}, {{chat_urddId}}, {{chat_message}}, {{chat_messageTime}}, {{chat_privateChat}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE chat SET sub_component_id = {{chat_subComponentId}}, urdd_id = {{chat_urddId}}, message = {{chat_message}}, message_time = {{chat_messageTime}}, private_chat = {{chat_privateChat}} WHERE chat_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, chat.chat_id as chat_id, chat.chat_id as id, chat.chat_id as chat_chatId,chat.sub_component_id as chat_subComponentId,chat.urdd_id as chat_urddId,chat.message as chat_message,chat.message_time as chat_messageTime,chat.private_chat as chat_privateChat,chat.status as chat_status,chat.created_by as chat_createdBy,chat.updated_by as chat_updatedBy,chat.created_at as chat_createdAt,chat.updated_at as chat_updatedAt FROM chat  Where chat.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT chat.chat_id as chat_id, chat.chat_id as id, chat.chat_id as chat_chatId,chat.sub_component_id as chat_subComponentId,chat.urdd_id as chat_urddId,chat.message as chat_message,chat.message_time as chat_messageTime,chat.private_chat as chat_privateChat,chat.status as chat_status,chat.created_by as chat_createdBy,chat.updated_by as chat_updatedBy,chat.created_at as chat_createdAt,chat.updated_at as chat_updatedAt FROM chat  WHERE chat_id = {{id}} OR chat_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE chat SET status = 'inactive' WHERE chat_id = {{id}}"},           
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
                        permission: { Add: "add_chat", View: "view_chat", Update: "update_chat", Delete: "delete_chat", List: "list_chat" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Chat CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Chat.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudChat_object}