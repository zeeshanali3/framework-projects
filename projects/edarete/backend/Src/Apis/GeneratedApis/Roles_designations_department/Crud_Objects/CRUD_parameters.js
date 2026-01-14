const parameters = {
              "steps": [
                  {
                  "title": "Roles Designations Department Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "roles_designations_department",
                          "type": "section",
                          "title": "Roles Designations Department CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Roles_designations_department",
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
                                  "name": "designation_id",
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
                                  "dynamicKey": "rolesDesignationsDepartment_designationId",
                                  "alias" : "roles_designations_department.designation_id",
                                  },
                                  {
                                  "name": "role_id",
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
                                  "dynamicKey": "rolesDesignationsDepartment_roleId",
                                  "alias" : "roles_designations_department.role_id",
                                  },
                                  {
                                  "name": "department_id",
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
                                  "dynamicKey": "rolesDesignationsDepartment_departmentId",
                                  "alias" : "roles_designations_department.department_id",
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
              "colMapper": "{ 'roles_designations_department_roleDesignationDepartmentId' : 'role_designation_department_id',  'roles_designations_department_designationId' : 'designation_id',  'roles_designations_department_roleId' : 'role_id',  'roles_designations_department_departmentId' : 'department_id',  'roles_designations_department_createdBy' : 'created_by',  'roles_designations_department_updatedBy' : 'updated_by',  'roles_designations_department_status' : 'status',  'roles_designations_department_createdAt' : 'created_at',  'roles_designations_department_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;