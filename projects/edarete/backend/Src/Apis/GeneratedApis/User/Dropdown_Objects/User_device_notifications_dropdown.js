global.User_device_notificationsDropdown_object = {
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
                      parameters: null,
                      apiInfo: {
                      
                        preProcessFunction : [],
                        query: {
                          "queryPayload": "SELECT user_device_notifications.user_device_notification_id as value, CONCAT_WS(' ', LEFT(user_devices.device_name, 10), LEFT(notifications.notification_title, 10)) AS label FROM user_device_notifications LEFT JOIN user_devices ON user_device_notifications.user_device_id = user_devices.user_device_id LEFT JOIN notifications ON user_device_notifications.notification_id = notifications.notification_id where user_device_notifications.status!='inactive'",
                        },
                        database: "mainDb",
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: "GET",
                        permission: "dropdown_user_device_notifications",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "user_device_notifications retrieved successfully!",
                      errorMessage: "Failed to retrieve user_device_notifications.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { User_device_notificationsDropdown_object }