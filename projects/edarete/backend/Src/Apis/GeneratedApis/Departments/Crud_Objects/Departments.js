/* CRUD Objects for table: departments */
      
      const parameters = require('./CRUD_parameters');
      global.CrudDepartments_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO departments (department_name, employee_id, created_by, updated_by) VALUES ({{departments_departmentName}}, {{departments_employeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE departments SET department_name = {{departments_departmentName}}, employee_id = {{departments_employeeId}} WHERE department_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, departments.department_id as departments_id, departments.department_id as id, departments.department_id as departments_departmentId,departments.department_name as departments_departmentName,departments.employee_id as departments_employeeId,departments.status as departments_status,departments.created_by as departments_createdBy,departments.updated_by as departments_updatedBy,departments.created_at as departments_createdAt,departments.updated_at as departments_updatedAt FROM departments  Where departments.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT departments.department_id as departments_id, departments.department_id as id, departments.department_id as departments_departmentId,departments.department_name as departments_departmentName,departments.employee_id as departments_employeeId,departments.status as departments_status,departments.created_by as departments_createdBy,departments.updated_by as departments_updatedBy,departments.created_at as departments_createdAt,departments.updated_at as departments_updatedAt FROM departments  WHERE department_id = {{id}} OR department_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE departments SET status = 'inactive' WHERE department_id = {{id}}"},           
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
                        permission: { Add: "add_departments", View: "view_departments", Update: "update_departments", Delete: "delete_departments", List: "list_departments" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Departments CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Departments.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudDepartments_object}