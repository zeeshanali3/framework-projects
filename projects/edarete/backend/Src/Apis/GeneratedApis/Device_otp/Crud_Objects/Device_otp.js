/* CRUD Objects for table: device_otp */
      
      const parameters = require('./CRUD_parameters');
      global.CrudDevice_otp_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO device_otp (user_device_id, otp, otp_failure_count, created_by, updated_by) VALUES ({{deviceOtp_userDeviceId}}, {{deviceOtp_otp}}, {{deviceOtp_otpFailureCount}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE device_otp SET user_device_id = {{deviceOtp_userDeviceId}}, otp = {{deviceOtp_otp}}, otp_failure_count = {{deviceOtp_otpFailureCount}} WHERE device_otp_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, device_otp.device_otp_id as deviceOtp_id, device_otp.device_otp_id as id, device_otp.device_otp_id as deviceOtp_deviceOtpId,device_otp.user_device_id as deviceOtp_userDeviceId,device_otp.otp as deviceOtp_otp,device_otp.otp_failure_count as deviceOtp_otpFailureCount,device_otp.created_by as deviceOtp_createdBy,device_otp.updated_by as deviceOtp_updatedBy,device_otp.status as deviceOtp_status,device_otp.created_at as deviceOtp_createdAt,device_otp.updated_at as deviceOtp_updatedAt, user_devices.device_name as userDevices_deviceName FROM device_otp LEFT JOIN user_devices ON device_otp.user_device_id = user_devices.user_device_id Where device_otp.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT device_otp.device_otp_id as deviceOtp_id, device_otp.device_otp_id as id, device_otp.device_otp_id as deviceOtp_deviceOtpId,device_otp.user_device_id as deviceOtp_userDeviceId,device_otp.otp as deviceOtp_otp,device_otp.otp_failure_count as deviceOtp_otpFailureCount,device_otp.created_by as deviceOtp_createdBy,device_otp.updated_by as deviceOtp_updatedBy,device_otp.status as deviceOtp_status,device_otp.created_at as deviceOtp_createdAt,device_otp.updated_at as deviceOtp_updatedAt, user_devices.device_name as userDevices_deviceName FROM device_otp LEFT JOIN user_devices ON device_otp.user_device_id = user_devices.user_device_id WHERE device_otp_id = {{id}} OR device_otp_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE device_otp SET status = 'inactive' WHERE device_otp_id = {{id}}"},           
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
                        permission: { Add: "add_device_otp", View: "view_device_otp", Update: "update_device_otp", Delete: "delete_device_otp", List: "list_device_otp" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Device_otp CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Device_otp.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudDevice_otp_object}