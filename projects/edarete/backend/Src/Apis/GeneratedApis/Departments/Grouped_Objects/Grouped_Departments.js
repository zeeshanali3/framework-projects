const parameters = require('./CRUD_parameters');
        global.GroupedCrudsDepartments_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO departments (department_name, employee_id , created_by, updated_by) VALUES ({{departments_departmentName}}, {{departments_employeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE departments SET department_name = {{departments_departmentName}}, employee_id = {{departments_employeeId}} WHERE department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, department_id as departments_id,department_id as id, departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId  FROM departments WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            departments.department_id as departments_id, employees.employee_id as employees_id, programs.program_id as programs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        employees.employee_id as id,
                       departments.department_name as  employees_departmentsName, employees.employee_id as  employees_employeeId, programs.program_id as  programs_programId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  employees_designationsName, roles.role_name as  employees_rolesName,

                          departments.department_id as employees_departmentId, employees.employee_id as employees_employeeId, programs.program_id as employees_programId, roles_designations_department.role_designation_department_id as employees_roleDesignationDepartmentId, designations.designation_id as employees_designationId, roles.role_id as employees_roleId,
                          
                       
                         
                           departments.department_name as departments_departmentName, departments.employee_id as departments_employeeId, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM departments LEFT JOIN employees ON employees.employee_id = departments.employee_id AND employees.status !='inactive' LEFT JOIN programs ON programs.department_id = departments.department_id AND programs.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.department_id = departments.department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (departments.department_id = {{id}}  AND  departments.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE departments SET status = 'inactive' WHERE department_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "departments Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO employees (department_id, personal_domain_url, urdd_id, qualification, salary, start_date, end_date , created_by, updated_by) VALUES ({{employees_departmentId}}, {{employees_personalDomainUrl}}, {{employees_urddId}}, {{employees_qualification}}, {{employees_salary}}, {{employees_startDate}}, {{employees_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE employees SET department_id = {{employees_departmentId}}, personal_domain_url = {{employees_personalDomainUrl}}, urdd_id = {{employees_urddId}}, qualification = {{employees_qualification}}, salary = {{employees_salary}}, start_date = {{employees_startDate}}, end_date = {{employees_endDate}} WHERE employee_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employee_id as employees_id,employee_id as id, employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate  FROM employees WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            departments.department_id as departments_id, employees.employee_id as employees_id, programs.program_id as programs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        employees.employee_id as id,
                       departments.department_name as  employees_departmentsName, employees.employee_id as  employees_employeeId, programs.program_id as  programs_programId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  employees_designationsName, roles.role_name as  employees_rolesName,

                          departments.department_id as employees_departmentId, employees.employee_id as employees_employeeId, programs.program_id as employees_programId, roles_designations_department.role_designation_department_id as employees_roleDesignationDepartmentId, designations.designation_id as employees_designationId, roles.role_id as employees_roleId,
                          
                       
                         
                           employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM departments LEFT JOIN employees ON employees.employee_id = departments.employee_id AND employees.status !='inactive' LEFT JOIN programs ON programs.department_id = departments.department_id AND programs.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.department_id = departments.department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (employees.employee_id = {{id}}  AND  employees.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE employees SET status = 'inactive' WHERE employee_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "employees Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO programs (department_id, domain_id, program_name, program_year , created_by, updated_by) VALUES ({{programs_departmentId}}, {{programs_domainId}}, {{programs_programName}}, {{programs_programYear}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE programs SET department_id = {{programs_departmentId}}, domain_id = {{programs_domainId}}, program_name = {{programs_programName}}, program_year = {{programs_programYear}} WHERE program_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, program_id as programs_id,program_id as id, programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear  FROM programs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            departments.department_id as departments_id, employees.employee_id as employees_id, programs.program_id as programs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        employees.employee_id as id,
                       departments.department_name as  employees_departmentsName, employees.employee_id as  employees_employeeId, programs.program_id as  programs_programId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  employees_designationsName, roles.role_name as  employees_rolesName,

                          departments.department_id as employees_departmentId, employees.employee_id as employees_employeeId, programs.program_id as employees_programId, roles_designations_department.role_designation_department_id as employees_roleDesignationDepartmentId, designations.designation_id as employees_designationId, roles.role_id as employees_roleId,
                          
                       
                         
                           programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM departments LEFT JOIN employees ON employees.employee_id = departments.employee_id AND employees.status !='inactive' LEFT JOIN programs ON programs.department_id = departments.department_id AND programs.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.department_id = departments.department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (programs.program_id = {{id}}  AND  programs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE programs SET status = 'inactive' WHERE program_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "programs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
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
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO roles_designations_department (designation_id, designation_id, role_id, role_id, department_id, department_id , created_by, updated_by) VALUES ({{rolesDesignationsDepartment_designationId}}, {{rolesDesignationsDepartment_designationId}}, {{rolesDesignationsDepartment_roleId}}, {{rolesDesignationsDepartment_roleId}}, {{rolesDesignationsDepartment_departmentId}}, {{rolesDesignationsDepartment_departmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET designation_id = {{rolesDesignationsDepartment_designationId}}, designation_id = {{rolesDesignationsDepartment_designationId}}, role_id = {{rolesDesignationsDepartment_roleId}}, role_id = {{rolesDesignationsDepartment_roleId}}, department_id = {{rolesDesignationsDepartment_departmentId}}, department_id = {{rolesDesignationsDepartment_departmentId}}, created_by = {{rolesDesignationsDepartment_createdBy}}, updated_by = {{rolesDesignationsDepartment_updatedBy}} WHERE role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, role_designation_department_id as rolesDesignationsDepartment_id,role_designation_department_id as id, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId  FROM roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            departments.department_id as departments_id, employees.employee_id as employees_id, programs.program_id as programs_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        employees.employee_id as id,
                       departments.department_name as  employees_departmentsName, employees.employee_id as  employees_employeeId, programs.program_id as  programs_programId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  employees_designationsName, roles.role_name as  employees_rolesName,

                          departments.department_id as employees_departmentId, employees.employee_id as employees_employeeId, programs.program_id as employees_programId, roles_designations_department.role_designation_department_id as employees_roleDesignationDepartmentId, designations.designation_id as employees_designationId, roles.role_id as employees_roleId,
                          
                       
                         
                           roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM departments LEFT JOIN employees ON employees.employee_id = departments.employee_id AND employees.status !='inactive' LEFT JOIN programs ON programs.department_id = departments.department_id AND programs.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.department_id = departments.department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (roles_designations_department.role_designation_department_id = {{id}}  AND  roles_designations_department.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET status = 'inactive' WHERE role_designation_department_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "roles_designations_department Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsDepartments_object}