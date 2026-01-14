const parameters = {
              "steps": [
                  
                          {
                              "title": "Designations Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "designations",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Designations",
                                          "childFields": [
                                                  {
                                                    "name": "designations_id",
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
                                                    "dynamicKey": "designations_id"
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
                                                          "name": "designationName",
                                                          "label": "Designation Name",
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
                                                          "dynamicKey": "designations_designationName"
                                                      },
                                                      {
                                                          "name": "seniorDesignationId",
                                                          "label": "Senior Designation Id",
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
                                                          "dynamicKey": "designations_seniorDesignationId"
                                                      },
                                                      {
                                                          "name": "specificAttributesArray",
                                                          "label": "Specific Attributes Array",
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
                                                          "dynamicKey": "designations_specificAttributesArray"
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
                              "permission": "designations_view"
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
                                          "title": "Designations",
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
                          },
                          {
                              "title": "Roles Designations Department Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "roles_designations_department",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "Designations",
                                          "childFields": [
                                                  {
                                                    "name": "rolesDesignationsDepartment_id",
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
                                                    "dynamicKey": "rolesDesignationsDepartment_id"
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
                                                          "name": "designationId",
                                                          "label": "Designation Id",
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
                                                          "dynamicKey": "rolesDesignationsDepartment_designationId"
                                                      },
                                                      {
                                                          "name": "roleId",
                                                          "label": "Role Id",
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
                                                          "dynamicKey": "rolesDesignationsDepartment_roleId"
                                                      },
                                                      {
                                                          "name": "departmentId",
                                                          "label": "Department Id",
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
                                                          "dynamicKey": "rolesDesignationsDepartment_departmentId"
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
                              "permission": "roles_designations_department_view"
                          }
              ],
              "colMapper": "{ 'designations_designationId' : 'designation_id',  'designations_designationName' : 'designation_name',  'designations_seniorDesignationId' : 'senior_designation_id',  'designations_specificAttributesArray' : 'specific_attributes_array',  'designations_createdBy' : 'created_by',  'designations_updatedBy' : 'updated_by',  'designations_status' : 'status',  'designations_createdAt' : 'created_at',  'designations_updatedAt' : 'updated_at',  'userRolesDesignationsDepartment_userRoleDesignationDepartmentId' : 'user_role_designation_department_id',  'userRolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'userRolesDesignationsDepartment_userId' : 'user_id',  'userRolesDesignationsDepartment_specAttributes' : 'spec_attributes',  'userRolesDesignationsDepartment_startDate' : 'start_date',  'userRolesDesignationsDepartment_endDate' : 'end_date',  'userRolesDesignationsDepartment_specificAttributes' : 'specific_attributes',  'userRolesDesignationsDepartment_status' : 'status',  'userRolesDesignationsDepartment_createdBy' : 'created_by',  'userRolesDesignationsDepartment_updatedBy' : 'updated_by',  'userRolesDesignationsDepartment_createdAt' : 'created_at',  'userRolesDesignationsDepartment_updatedAt' : 'updated_at',  'rolesDesignationsDepartment_roleDesignationDepartmentId' : 'role_designation_department_id',  'rolesDesignationsDepartment_designationId' : 'designation_id',  'rolesDesignationsDepartment_roleId' : 'role_id',  'rolesDesignationsDepartment_departmentId' : 'department_id',  'rolesDesignationsDepartment_createdBy' : 'created_by',  'rolesDesignationsDepartment_updatedBy' : 'updated_by',  'rolesDesignationsDepartment_status' : 'status',  'rolesDesignationsDepartment_createdAt' : 'created_at',  'rolesDesignationsDepartment_updatedAt' : 'updated_at'}"
          };
          module.exports = parameters;