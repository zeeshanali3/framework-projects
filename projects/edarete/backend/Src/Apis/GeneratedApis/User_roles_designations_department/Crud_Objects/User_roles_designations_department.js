/* CRUD Objects for table: user_roles_designations_department */
      
      const parameters = require('./CRUD_parameters');
      global.CrudUser_roles_designations_department_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date, created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}} WHERE user_role_designation_department_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId,user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId,user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId,user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes,user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate,user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate,user_roles_designations_department.created_by as userRolesDesignationsDepartment_createdBy,user_roles_designations_department.updated_by as userRolesDesignationsDepartment_updatedBy,user_roles_designations_department.status as userRolesDesignationsDepartment_status,user_roles_designations_department.created_at as userRolesDesignationsDepartment_createdAt,user_roles_designations_department.updated_at as userRolesDesignationsDepartment_updatedAt, users.username as users_username FROM user_roles_designations_department LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id Where user_roles_designations_department.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, user_roles_designations_department.user_role_designation_department_id as id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_userRoleDesignationDepartmentId,user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId,user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId,user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes,user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate,user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate,user_roles_designations_department.created_by as userRolesDesignationsDepartment_createdBy,user_roles_designations_department.updated_by as userRolesDesignationsDepartment_updatedBy,user_roles_designations_department.status as userRolesDesignationsDepartment_status,user_roles_designations_department.created_at as userRolesDesignationsDepartment_createdAt,user_roles_designations_department.updated_at as userRolesDesignationsDepartment_updatedAt, users.username as users_username FROM user_roles_designations_department LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id WHERE user_role_designation_department_id = {{id}} OR user_role_designation_department_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE user_roles_designations_department SET status = 'inactive' WHERE user_role_designation_department_id = {{id}}"},           
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
                        permission: { Add: "add_user_roles_designations_department", View: "view_user_roles_designations_department", Update: "update_user_roles_designations_department", Delete: "delete_user_roles_designations_department", List: "list_user_roles_designations_department" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "User_roles_designations_department CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve User_roles_designations_department.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudUser_roles_designations_department_object}