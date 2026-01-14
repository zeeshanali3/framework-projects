const parameters = {
              "steps": [
                  
                          {
                              "title": "Rooms Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "rooms",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Rooms",
                                          "childFields": [
                                                  {
                                                    "name": "rooms_id",
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
                                                    "dynamicKey": "rooms_id"
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
                                                          "name": "roomName",
                                                          "label": "Room Name",
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
                                                          "dynamicKey": "rooms_roomName"
                                                      },
                                                      {
                                                          "name": "roomCapacity",
                                                          "label": "Room Capacity",
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
                                                          "dynamicKey": "rooms_roomCapacity"
                                                      },
                                                      {
                                                          "name": "roomLocation",
                                                          "label": "Room Location",
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
                                                          "dynamicKey": "rooms_roomLocation"
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
                              ],
                              "permission": "rooms_view"
                          },
                          {
                              "title": "User Roles Designations Department Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "user_roles_designations_department",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Rooms",
                                          "childFields": [
                                                  {
                                                    "name": "userRolesDesignationsDepartment_id",
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
                                                    "dynamicKey": "userRolesDesignationsDepartment_id"
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
                                                          "name": "roleDesignationDepartmentId",
                                                          "label": "Role Designation Department Id",
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
                                                          "dynamicKey": "userRolesDesignationsDepartment_roleDesignationDepartmentId"
                                                      },
                                                      {
                                                          "name": "userId",
                                                          "label": "User Id",
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
                                                          "dynamicKey": "userRolesDesignationsDepartment_userId"
                                                      },
                                                      {
                                                          "name": "specAttributes",
                                                          "label": "Spec Attributes",
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
                                                          "dynamicKey": "userRolesDesignationsDepartment_specAttributes"
                                                      },
                                                      {
                                                          "name": "startDate",
                                                          "label": "Start Date",
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
                                                          "dynamicKey": "userRolesDesignationsDepartment_startDate"
                                                      },
                                                      {
                                                          "name": "endDate",
                                                          "label": "End Date",
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
                                                          "dynamicKey": "userRolesDesignationsDepartment_endDate"
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
                              ],
                              "permission": "user_roles_designations_department_view"
                          }
              ],
              "colMapper": "{ 'rooms_roomId' : 'room_id',  'rooms_roomName' : 'room_name',  'rooms_roomCapacity' : 'room_capacity',  'rooms_roomLocation' : 'room_location',  'rooms_status' : 'status',  'rooms_createdBy' : 'created_by',  'rooms_updatedBy' : 'updated_by',  'rooms_createdAt' : 'created_at',  'rooms_updatedAt' : 'updated_at',  'userRolesDesignationsDepartment_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'userRolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'userRolesDesignationsDepartment_userId' : 'user_id',  'userRolesDesignationsDepartment_specAttributes' : 'spec_attributes',  'userRolesDesignationsDepartment_startDate' : 'start_date',  'userRolesDesignationsDepartment_endDate' : 'end_date',  'userRolesDesignationsDepartment_createdBy' : 'created_by',  'userRolesDesignationsDepartment_updatedBy' : 'updated_by',  'userRolesDesignationsDepartment_status' : 'status',  'userRolesDesignationsDepartment_createdAt' : 'created_at',  'userRolesDesignationsDepartment_updatedAt' : 'updated_at'}"
          };
          module.exports = parameters;