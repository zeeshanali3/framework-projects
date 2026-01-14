const parameters = require('./CRUD_parameters');
        global.GroupedCrudsDevice_otp_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO device_otp (user_device_id, otp, otp_failure_count , created_by, updated_by) VALUES ({{deviceOtp_userDeviceId}}, {{deviceOtp_otp}}, {{deviceOtp_otpFailureCount}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE device_otp SET user_device_id = {{deviceOtp_userDeviceId}}, otp = {{deviceOtp_otp}}, otp_failure_count = {{deviceOtp_otpFailureCount}}, created_by = {{deviceOtp_createdBy}}, updated_by = {{deviceOtp_updatedBy}} WHERE device_otp_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, device_otp_id as deviceOtp_id,device_otp_id as id, device_otp.user_device_id as deviceOtp_userDeviceId, device_otp.otp as deviceOtp_otp, device_otp.otp_failure_count as deviceOtp_otpFailureCount  FROM device_otp WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            device_otp.device_otp_id as deviceOtp_id,
                        undefined.undefined as id,
                       device_otp.device_otp_id as  deviceOtp_deviceOtpId,

                          device_otp.device_otp_id as undefined_deviceOtpId,
                          
                       
                         
                          null device_otp.user_device_id as deviceOtp_userDeviceId, device_otp.otp as deviceOtp_otp, device_otp.otp_failure_count as deviceOtp_otpFailureCount, 
                        undefined FROM device_otp  WHERE (device_otp.device_otp_id = {{id}}  AND  device_otp.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE device_otp SET status = 'inactive' WHERE device_otp_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "device_otp Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsDevice_otp_object}