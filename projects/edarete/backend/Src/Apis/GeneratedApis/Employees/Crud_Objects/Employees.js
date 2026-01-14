/* CRUD Objects for table: employees */
      
      const parameters = require('./CRUD_parameters');
      global.CrudEmployees_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO employees (department_id, personal_domain_url, urdd_id, qualification, salary, start_date, end_date, created_by, updated_by) VALUES ({{employees_departmentId}}, {{employees_personalDomainUrl}}, {{employees_urddId}}, {{employees_qualification}}, {{employees_salary}}, {{employees_startDate}}, {{employees_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE employees SET department_id = {{employees_departmentId}}, personal_domain_url = {{employees_personalDomainUrl}}, urdd_id = {{employees_urddId}}, qualification = {{employees_qualification}}, salary = {{employees_salary}}, start_date = {{employees_startDate}}, end_date = {{employees_endDate}} WHERE employee_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employees.employee_id as employees_id, employees.employee_id as id, employees.employee_id as employees_employeeId,employees.department_id as employees_departmentId,employees.personal_domain_url as employees_personalDomainUrl,employees.urdd_id as employees_urddId,employees.qualification as employees_qualification,employees.salary as employees_salary,employees.start_date as employees_startDate,employees.end_date as employees_endDate,employees.status as employees_status,employees.created_by as employees_createdBy,employees.updated_by as employees_updatedBy,employees.created_at as employees_createdAt,employees.updated_at as employees_updatedAt, departments.department_name as departments_departmentName FROM employees LEFT JOIN departments ON employees.department_id = departments.department_id Where employees.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT employees.employee_id as employees_id, employees.employee_id as id, employees.employee_id as employees_employeeId,employees.department_id as employees_departmentId,employees.personal_domain_url as employees_personalDomainUrl,employees.urdd_id as employees_urddId,employees.qualification as employees_qualification,employees.salary as employees_salary,employees.start_date as employees_startDate,employees.end_date as employees_endDate,employees.status as employees_status,employees.created_by as employees_createdBy,employees.updated_by as employees_updatedBy,employees.created_at as employees_createdAt,employees.updated_at as employees_updatedAt, departments.department_name as departments_departmentName FROM employees LEFT JOIN departments ON employees.department_id = departments.department_id WHERE employee_id = {{id}} OR employee_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE employees SET status = 'inactive' WHERE employee_id = {{id}}"},           
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
                        permission: { Add: "add_employees", View: "view_employees", Update: "update_employees", Delete: "delete_employees", List: "list_employees" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Employees CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Employees.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudEmployees_object}