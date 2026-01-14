global.Device_otpDropdown_object = {
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
                          "queryPayload": "SELECT device_otp.device_otp_id as value, CONCAT_WS(' ', LEFT(user_devices.device_name, 10)) AS label FROM device_otp LEFT JOIN user_devices ON device_otp.user_device_id = user_devices.user_device_id where device_otp.status!='inactive'",
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
                        permission: "dropdown_device_otp",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "device_otp retrieved successfully!",
                      errorMessage: "Failed to retrieve device_otp.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { Device_otpDropdown_object }