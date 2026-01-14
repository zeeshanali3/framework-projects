/* CRUD Objects for table: roles_designations_department */
      
      const parameters = require('./CRUD_parameters');
      global.CrudRoles_designations_department_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                              accessToken: true
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO roles_designations_department (designation_id, role_id, department_id, created_by, updated_by) VALUES ({{rolesDesignationsDepartment_designationId}}, {{rolesDesignationsDepartment_roleId}}, {{rolesDesignationsDepartment_departmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET designation_id = {{rolesDesignationsDepartment_designationId}}, role_id = {{rolesDesignationsDepartment_roleId}}, department_id = {{rolesDesignationsDepartment_departmentId}} WHERE role_designation_department_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId,roles_designations_department.designation_id as rolesDesignationsDepartment_designationId,roles_designations_department.role_id as rolesDesignationsDepartment_roleId,roles_designations_department.department_id as rolesDesignationsDepartment_departmentId,roles_designations_department.created_by as rolesDesignationsDepartment_createdBy,roles_designations_department.updated_by as rolesDesignationsDepartment_updatedBy,roles_designations_department.status as rolesDesignationsDepartment_status,roles_designations_department.created_at as rolesDesignationsDepartment_createdAt,roles_designations_department.updated_at as rolesDesignationsDepartment_updatedAt, designations.designation_name as designations_designationName,roles.role_name as roles_roleName,departments.department_name as departments_departmentName FROM roles_designations_department LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id LEFT JOIN departments ON roles_designations_department.department_id = departments.department_id Where roles_designations_department.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId,roles_designations_department.designation_id as rolesDesignationsDepartment_designationId,roles_designations_department.role_id as rolesDesignationsDepartment_roleId,roles_designations_department.department_id as rolesDesignationsDepartment_departmentId,roles_designations_department.created_by as rolesDesignationsDepartment_createdBy,roles_designations_department.updated_by as rolesDesignationsDepartment_updatedBy,roles_designations_department.status as rolesDesignationsDepartment_status,roles_designations_department.created_at as rolesDesignationsDepartment_createdAt,roles_designations_department.updated_at as rolesDesignationsDepartment_updatedAt, designations.designation_name as designations_designationName,roles.role_name as roles_roleName,departments.department_name as departments_departmentName FROM roles_designations_department LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id LEFT JOIN departments ON roles_designations_department.department_id = departments.department_id WHERE role_designation_department_id = {{id}} OR role_designation_department_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE roles_designations_department SET status = 'inactive' WHERE role_designation_department_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_roles_designations_department", View: "view_roles_designations_department", Update: "update_roles_designations_department", Delete: "delete_roles_designations_department", List: "list_roles_designations_department" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Roles_designations_department CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Roles_designations_department.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudRoles_designations_department_object}