/* Frontend Parameters for table: user_device_notifications */
        
            export const parameters = {
                "steps": [
                    {
                    "title": "userDeviceNotifications Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "userDeviceNotifications",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "User Device Notifications",
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
                    "dynamicKey": "userDeviceNotifications_userDeviceId",
                    "selectServerUrl": "/user_devices/dropdown?version=1.0",
                    "alias" : "user_device_notifications.user_device_id"
                }
                
                ,
                {
                    "name": "notificationId",
                    "label": "Notification Id",
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
                    "dynamicKey": "userDeviceNotifications_notificationId",
                    "selectServerUrl": "/notifications/dropdown?version=1.0",
                    "alias" : "user_device_notifications.notification_id"
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
                  "dynamicKey": "userDeviceNotifications_createdAt",
                  "alias" : "user_device_notifications.created_at"
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
                  "dynamicKey": "userDeviceNotifications_updatedAt",
                  "alias" : "user_device_notifications.updated_at"
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
                "dynamicKey": "userDeviceNotifications_status",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "user_device_notifications.status"
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
                "colMapper": "{ 'userDeviceNotifications_userDeviceNotificationId' : 'user_device_notification_id',  'userDeviceNotifications_userDeviceId' : 'user_device_id',  'userDeviceNotifications_notificationId' : 'notification_id',  'userDeviceNotifications_createdBy' : 'created_by',  'userDeviceNotifications_updatedBy' : 'updated_by',  'userDeviceNotifications_status' : 'status',  'userDeviceNotifications_createdAt' : 'created_at',  'userDeviceNotifications_updatedAt' : 'updated_at',  'userDeviceNotifications_deviceName' : 'device_name'}"
                };