/* CRUD Objects for table: notifications */
      
      const parameters = require('./CRUD_parameters');
      global.CrudNotifications_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO notifications (notification_title, notification_message, sent_to_user_role_designation_department_id, created_by, updated_by) VALUES ({{notifications_notificationTitle}}, {{notifications_notificationMessage}}, {{notifications_sentToUserRoleDesignationDepartmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE notifications SET notification_title = {{notifications_notificationTitle}}, notification_message = {{notifications_notificationMessage}}, sent_to_user_role_designation_department_id = {{notifications_sentToUserRoleDesignationDepartmentId}} WHERE notification_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, notifications.notification_id as notifications_id, notifications.notification_id as id, notifications.notification_id as notifications_notificationId,notifications.notification_title as notifications_notificationTitle,notifications.notification_message as notifications_notificationMessage,notifications.sent_to_user_role_designation_department_id as notifications_sentToUserRoleDesignationDepartmentId,notifications.created_by as notifications_createdBy,notifications.updated_by as notifications_updatedBy,notifications.status as notifications_status,notifications.created_at as notifications_createdAt,notifications.updated_at as notifications_updatedAt FROM notifications  Where notifications.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT notifications.notification_id as notifications_id, notifications.notification_id as id, notifications.notification_id as notifications_notificationId,notifications.notification_title as notifications_notificationTitle,notifications.notification_message as notifications_notificationMessage,notifications.sent_to_user_role_designation_department_id as notifications_sentToUserRoleDesignationDepartmentId,notifications.created_by as notifications_createdBy,notifications.updated_by as notifications_updatedBy,notifications.status as notifications_status,notifications.created_at as notifications_createdAt,notifications.updated_at as notifications_updatedAt FROM notifications  WHERE notification_id = {{id}} OR notification_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE notifications SET status = 'inactive' WHERE notification_id = {{id}}"},           
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
                        permission: { Add: "add_notifications", View: "view_notifications", Update: "update_notifications", Delete: "delete_notifications", List: "list_notifications" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Notifications CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Notifications.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudNotifications_object}