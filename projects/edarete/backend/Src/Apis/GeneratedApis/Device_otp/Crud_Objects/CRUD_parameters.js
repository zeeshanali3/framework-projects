const parameters = {
              "steps": [
                  {
                  "title": "Device Otp Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "device_otp",
                          "type": "section",
                          "title": "Device Otp CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Device_otp",
                          "childFields": [
                                {
                                  "name": "deviceOtp_id",
                                  "label": "id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": true,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.query",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "deviceOtp_id"
                                },
                               {
                                  "name": "actionPerformerURDD",
                                  "label": "actionPerformerURDD",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "actionPerformerURDD",
                                  "alias" : "actionPerformerURDD",
                                },
                              
                                  {
                                  "name": "user_device_id",
                                  "label": "User Device Id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "deviceOtp_userDeviceId",
                                  "alias" : "device_otp.user_device_id",
                                  },
                                  {
                                  "name": "otp",
                                  "label": "Otp",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "deviceOtp_otp",
                                  "alias" : "device_otp.otp",
                                  },
                                  {
                                  "name": "otp_failure_count",
                                  "label": "Otp Failure Count",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "deviceOtp_otpFailureCount",
                                  "alias" : "device_otp.otp_failure_count",
                                  },
                                  
                          ]
                      }
                      ]
                  },
                  "buttons": [
                      {
                      "type": "submit",
                      "label": "Submit"
                      }
                  ]
                  }
              ],
              "colMapper": "{ 'device_otp_deviceOtpId' : 'device_otp_id',  'device_otp_userDeviceId' : 'user_device_id',  'device_otp_otp' : 'otp',  'device_otp_otpFailureCount' : 'otp_failure_count',  'device_otp_createdBy' : 'created_by',  'device_otp_updatedBy' : 'updated_by',  'device_otp_status' : 'status',  'device_otp_createdAt' : 'created_at',  'device_otp_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;