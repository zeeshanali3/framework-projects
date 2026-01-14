/* Frontend Parameters for table: device_otp */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "deviceOtp Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "deviceOtp",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "Device Otp",
                            "childFields": [
                                  
        {
          "name": "id",
          "label": "id",
          "title": "",
          "type": "textField",
          "required": false,
          "hideInCreateForm": true,
          "hideInViewForm" : true,
          "visible": true,
          "disabled": false,
          "dependancyCheck": false,
          "isPrefilled": false,
          "source": "req.query",
          "min": "",
          "max": "",
          "selectServer": false,
          "dynamicKey": "id"
        }
        
            ,
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
                "validations": [],
                "selectServer": false,
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "deviceOtp_otp",
                "alias" : "device_otp.otp",
                "options": []

            }
            ,
            {
                "name": "otpFailureCount",
                "label": "Otp Failure Count",
                "title": "",
                "type": "number",
                "required": false,
                "hideInCreateForm": false,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "selectServerUrl":"/null/dropdown?version=1.0",
                "dynamicKey": "deviceOtp_otpFailureCount",
                "alias" : "device_otp.otp_failure_count",
                "options": []

            }  
        
            ,
            {
                "name": "deviceName",
                "label": "Device Name",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "userDevices_deviceName",
                "alias" : "user_devices.device_name",
                "options": [ ""]

            }  
            
        
                ,
                {
                    "name": "userDeviceId",
                    "label": "User Device Id",
                    "title": "",
                    "type": "select",
                    "required": false,
                    "hideInCreateForm": false,
                    "hideInViewForm": true,
                    "visible": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "source": "req.body",
                    "min": "",
                    "max": "",
                    "validations": [],
                    "selectServer": true,
                    "dynamicKey": "deviceOtp_userDeviceId",
                    "selectServerUrl": "/user_devices/dropdown?version=1.0",
                    "alias" : "device_otp.user_device_id"
                }
                
          
          
                ,
                {
                  "name": "createdAt",
                  "label": "Created At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "deviceOtp_createdAt",
                  "alias" : "device_otp.created_at"
                }
                ,
                {
                  "name": "updatedAt",
                  "label": "Updated At",
                  "title": "",
                  "type": "dateTime",
                  "required": false,
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "deviceOtp_updatedAt",
                  "alias" : "device_otp.updated_at"
                }  

          
            ,
            {
                "name": "status",
                "label": "Status",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "deviceOtp_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "device_otp.status"
            }
    
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
                "colMapper": "{ 'deviceOtp_deviceOtpId' : 'device_otp_id',  'deviceOtp_userDeviceId' : 'user_device_id',  'deviceOtp_otp' : 'otp',  'deviceOtp_otpFailureCount' : 'otp_failure_count',  'deviceOtp_createdBy' : 'created_by',  'deviceOtp_updatedBy' : 'updated_by',  'deviceOtp_status' : 'status',  'deviceOtp_createdAt' : 'created_at',  'deviceOtp_updatedAt' : 'updated_at',  'deviceOtp_deviceName' : 'device_name'}"
                };