const parameters = {
              "steps": [
                  
                          {
                              "title": "Incoming Audit Logs Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "incoming_audit_logs",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Incoming Audit Logs",
                                          "childFields": [
                                                  {
                                                    "name": "incomingAuditLogs_id",
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
                                                    "dynamicKey": "incomingAuditLogs_id"
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
                                                          "name": "requestType",
                                                          "label": "Request Type",
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
                                                          "dynamicKey": "incomingAuditLogs_requestType"
                                                      },
                                                      {
                                                          "name": "aiCreditsUrddId",
                                                          "label": "Ai Credits Urdd Id",
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
                                                          "dynamicKey": "incomingAuditLogs_aiCreditsUrddId"
                                                      },
                                                      {
                                                          "name": "source",
                                                          "label": "Source",
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
                                                          "dynamicKey": "incomingAuditLogs_source"
                                                      },
                                                      {
                                                          "name": "requestData",
                                                          "label": "Request Data",
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
                                                          "dynamicKey": "incomingAuditLogs_requestData"
                                                      },
                                                      {
                                                          "name": "responseData",
                                                          "label": "Response Data",
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
                                                          "dynamicKey": "incomingAuditLogs_responseData"
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
                              "permission": "incoming_audit_logs_view"
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
                                          "title": "Incoming Audit Logs",
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
                                                      },
                                                      {
                                                          "name": "specificAttributes",
                                                          "label": "Specific Attributes",
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
                                                          "dynamicKey": "userRolesDesignationsDepartment_specificAttributes"
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
              "colMapper": "{ 'incomingAuditLogs_id' : 'id',  'incomingAuditLogs_requestType' : 'request_type',  'incomingAuditLogs_aiCreditsUrddId' : 'ai_credits_urdd_id',  'incomingAuditLogs_source' : 'source',  'incomingAuditLogs_requestData' : 'request_data',  'incomingAuditLogs_responseData' : 'response_data',  'incomingAuditLogs_createdBy' : 'created_by',  'incomingAuditLogs_updatedBy' : 'updated_by',  'incomingAuditLogs_status' : 'status',  'incomingAuditLogs_createdAt' : 'created_at',  'incomingAuditLogs_updatedAt' : 'updated_at',  'userRolesDesignationsDepartment_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'userRolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'userRolesDesignationsDepartment_userId' : 'user_id',  'userRolesDesignationsDepartment_specAttributes' : 'spec_attributes',  'userRolesDesignationsDepartment_startDate' : 'start_date',  'userRolesDesignationsDepartment_endDate' : 'end_date',  'userRolesDesignationsDepartment_specificAttributes' : 'specific_attributes',  'userRolesDesignationsDepartment_status' : 'status',  'userRolesDesignationsDepartment_createdBy' : 'created_by',  'userRolesDesignationsDepartment_updatedBy' : 'updated_by',  'userRolesDesignationsDepartment_createdAt' : 'created_at',  'userRolesDesignationsDepartment_updatedAt' : 'updated_at'}"
          };
          module.exports = parameters;