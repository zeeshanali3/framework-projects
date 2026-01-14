/* CRUD Objects for table: user_device_notifications */
      
      const parameters = require('./CRUD_parameters');
      global.CrudUser_device_notifications_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO user_device_notifications (user_device_id, notification_id, created_by, updated_by) VALUES ({{userDeviceNotifications_userDeviceId}}, {{userDeviceNotifications_notificationId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE user_device_notifications SET user_device_id = {{userDeviceNotifications_userDeviceId}}, notification_id = {{userDeviceNotifications_notificationId}} WHERE user_device_notification_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_device_notifications.user_device_notification_id as id, user_device_notifications.user_device_notification_id as userDeviceNotifications_userDeviceNotificationId,user_device_notifications.user_device_id as userDeviceNotifications_userDeviceId,user_device_notifications.notification_id as userDeviceNotifications_notificationId,user_device_notifications.created_by as userDeviceNotifications_createdBy,user_device_notifications.updated_by as userDeviceNotifications_updatedBy,user_device_notifications.status as userDeviceNotifications_status,user_device_notifications.created_at as userDeviceNotifications_createdAt,user_device_notifications.updated_at as userDeviceNotifications_updatedAt, user_devices.device_name as userDevices_deviceName FROM user_device_notifications LEFT JOIN user_devices ON user_device_notifications.user_device_id = user_devices.user_device_id Where user_device_notifications.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_device_notifications.user_device_notification_id as id, user_device_notifications.user_device_notification_id as userDeviceNotifications_userDeviceNotificationId,user_device_notifications.user_device_id as userDeviceNotifications_userDeviceId,user_device_notifications.notification_id as userDeviceNotifications_notificationId,user_device_notifications.created_by as userDeviceNotifications_createdBy,user_device_notifications.updated_by as userDeviceNotifications_updatedBy,user_device_notifications.status as userDeviceNotifications_status,user_device_notifications.created_at as userDeviceNotifications_createdAt,user_device_notifications.updated_at as userDeviceNotifications_updatedAt, user_devices.device_name as userDevices_deviceName FROM user_device_notifications LEFT JOIN user_devices ON user_device_notifications.user_device_id = user_devices.user_device_id WHERE user_device_notification_id = {{id}} OR user_device_notification_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE user_device_notifications SET status = 'inactive' WHERE user_device_notification_id = {{id}}"},           
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
                        permission: { Add: "add_user_device_notifications", View: "view_user_device_notifications", Update: "update_user_device_notifications", Delete: "delete_user_device_notifications", List: "list_user_device_notifications" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "User_device_notifications CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve User_device_notifications.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudUser_device_notifications_object}