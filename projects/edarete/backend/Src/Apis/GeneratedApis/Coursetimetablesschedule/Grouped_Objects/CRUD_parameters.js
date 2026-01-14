const parameters = {
              "steps": [
                  
                          {
                              "title": "Coursetimetablesschedule Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "coursetimetablesschedule",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Coursetimetablesschedule",
                                          "childFields": [
                                                  {
                                                    "name": "coursetimetablesschedule_id",
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
                                                    "dynamicKey": "coursetimetablesschedule_id"
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
                                                          "name": "courseId",
                                                          "label": "Course Id",
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
                                                          "dynamicKey": "coursetimetablesschedule_courseId"
                                                      },
                                                      {
                                                          "name": "employeePreferedTimeSlotsId",
                                                          "label": "Employee Prefered Time Slots Id",
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
                                                          "dynamicKey": "coursetimetablesschedule_employeePreferedTimeSlotsId"
                                                      },
                                                      {
                                                          "name": "timeSlotId",
                                                          "label": "Time Slot Id",
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
                                                          "dynamicKey": "coursetimetablesschedule_timeSlotId"
                                                      },
                                                      {
                                                          "name": "roomId",
                                                          "label": "Room Id",
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
                                                          "dynamicKey": "coursetimetablesschedule_roomId"
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
                              "permission": "coursetimetablesschedule_view"
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
                                          "title": "Coursetimetablesschedule",
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
              "colMapper": "{ 'coursetimetablesschedule_courseLscheduleId' : 'course_lschedule_id',  'coursetimetablesschedule_courseId' : 'course_id',  'coursetimetablesschedule_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'coursetimetablesschedule_timeSlotId' : 'time_slot_id',  'coursetimetablesschedule_roomId' : 'room_id',  'coursetimetablesschedule_status' : 'status',  'coursetimetablesschedule_createdBy' : 'created_by',  'coursetimetablesschedule_updatedBy' : 'updated_by',  'coursetimetablesschedule_createdAt' : 'created_at',  'coursetimetablesschedule_updatedAt' : 'updated_at',  'userRolesDesignationsDepartment_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'userRolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'userRolesDesignationsDepartment_userId' : 'user_id',  'userRolesDesignationsDepartment_specAttributes' : 'spec_attributes',  'userRolesDesignationsDepartment_startDate' : 'start_date',  'userRolesDesignationsDepartment_endDate' : 'end_date',  'userRolesDesignationsDepartment_createdBy' : 'created_by',  'userRolesDesignationsDepartment_updatedBy' : 'updated_by',  'userRolesDesignationsDepartment_status' : 'status',  'userRolesDesignationsDepartment_createdAt' : 'created_at',  'userRolesDesignationsDepartment_updatedAt' : 'updated_at'}"
          };
          module.exports = parameters;