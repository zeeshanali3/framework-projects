const parameters = {
              "steps": [
                  {
                  "title": "User Device Notifications Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "user_device_notifications",
                          "type": "section",
                          "title": "User Device Notifications CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "User_device_notifications",
                          "childFields": [
                                {
                                  "name": "userDeviceNotifications_id",
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
                                  "dynamicKey": "userDeviceNotifications_id"
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
                                  "dynamicKey": "userDeviceNotifications_userDeviceId",
                                  "alias" : "user_device_notifications.user_device_id",
                                  },
                                  {
                                  "name": "notification_id",
                                  "label": "Notification Id",
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
                                  "dynamicKey": "userDeviceNotifications_notificationId",
                                  "alias" : "user_device_notifications.notification_id",
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
              "colMapper": "{ 'user_device_notifications_userDeviceNotificationId' : 'user_device_notification_id',  'user_device_notifications_userDeviceId' : 'user_device_id',  'user_device_notifications_notificationId' : 'notification_id',  'user_device_notifications_createdBy' : 'created_by',  'user_device_notifications_updatedBy' : 'updated_by',  'user_device_notifications_status' : 'status',  'user_device_notifications_createdAt' : 'created_at',  'user_device_notifications_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;