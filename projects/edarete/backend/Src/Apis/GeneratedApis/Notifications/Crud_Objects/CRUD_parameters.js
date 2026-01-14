const parameters = {
              "steps": [
                  {
                  "title": "Notifications Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "notifications",
                          "type": "section",
                          "title": "Notifications CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Notifications",
                          "childFields": [
                                {
                                  "name": "notifications_id",
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
                                  "dynamicKey": "notifications_id"
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
                                  "name": "notification_title",
                                  "label": "Notification Title",
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
                                  "dynamicKey": "notifications_notificationTitle",
                                  "alias" : "notifications.notification_title",
                                  },
                                  {
                                  "name": "notification_message",
                                  "label": "Notification Message",
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
                                  "dynamicKey": "notifications_notificationMessage",
                                  "alias" : "notifications.notification_message",
                                  },
                                  {
                                  "name": "sent_to_user_role_designation_department_id",
                                  "label": "Sent To User Role Designation Department Id",
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
                                  "dynamicKey": "notifications_sentToUserRoleDesignationDepartmentId",
                                  "alias" : "notifications.sent_to_user_role_designation_department_id",
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
              "colMapper": "{ 'notifications_notificationId' : 'notification_id',  'notifications_notificationTitle' : 'notification_title',  'notifications_notificationMessage' : 'notification_message',  'notifications_sentToUserRoleDesignationDepartmentId' : 'sent_to_user_role_designation_department_id',  'notifications_createdBy' : 'created_by',  'notifications_updatedBy' : 'updated_by',  'notifications_status' : 'status',  'notifications_createdAt' : 'created_at',  'notifications_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;