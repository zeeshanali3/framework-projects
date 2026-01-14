/* CRUD Objects for table: user_devices */
      
      const parameters = require('./CRUD_parameters');
      global.CrudUser_devices_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO user_devices (user_id, device_token, device_name, platform_version_id, os_version, created_by, updated_by) VALUES ({{userDevices_userId}}, {{userDevices_deviceToken}}, {{userDevices_deviceName}}, {{userDevices_platformVersionId}}, {{userDevices_osVersion}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE user_devices SET user_id = {{userDevices_userId}}, device_token = {{userDevices_deviceToken}}, device_name = {{userDevices_deviceName}}, platform_version_id = {{userDevices_platformVersionId}}, os_version = {{userDevices_osVersion}} WHERE user_device_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_devices.user_device_id as userDevices_id, user_devices.user_device_id as id, user_devices.user_device_id as userDevices_userDeviceId,user_devices.user_id as userDevices_userId,user_devices.device_token as userDevices_deviceToken,user_devices.device_name as userDevices_deviceName,user_devices.platform_version_id as userDevices_platformVersionId,user_devices.os_version as userDevices_osVersion,user_devices.created_by as userDevices_createdBy,user_devices.updated_by as userDevices_updatedBy,user_devices.status as userDevices_status,user_devices.created_at as userDevices_createdAt,user_devices.updated_at as userDevices_updatedAt, users.username as users_username FROM user_devices LEFT JOIN users ON user_devices.user_id = users.user_id Where user_devices.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT user_devices.user_device_id as userDevices_id, user_devices.user_device_id as id, user_devices.user_device_id as userDevices_userDeviceId,user_devices.user_id as userDevices_userId,user_devices.device_token as userDevices_deviceToken,user_devices.device_name as userDevices_deviceName,user_devices.platform_version_id as userDevices_platformVersionId,user_devices.os_version as userDevices_osVersion,user_devices.created_by as userDevices_createdBy,user_devices.updated_by as userDevices_updatedBy,user_devices.status as userDevices_status,user_devices.created_at as userDevices_createdAt,user_devices.updated_at as userDevices_updatedAt, users.username as users_username FROM user_devices LEFT JOIN users ON user_devices.user_id = users.user_id WHERE user_device_id = {{id}} OR user_device_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE user_devices SET status = 'inactive' WHERE user_device_id = {{id}}"},           
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
                        permission: { Add: "add_user_devices", View: "view_user_devices", Update: "update_user_devices", Delete: "delete_user_devices", List: "list_user_devices" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "User_devices CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve User_devices.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudUser_devices_object}