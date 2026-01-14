const parameters = require('./CRUD_parameters');
        global.GroupedCrudsDomains_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO domains (domain_name, domain_leader_id , created_by, updated_by) VALUES ({{domains_domainName}}, {{domains_domainLeaderId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE domains SET domain_name = {{domains_domainName}}, domain_leader_id = {{domains_domainLeaderId}} WHERE domain_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, domain_id as domains_id,domain_id as id, domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId  FROM domains WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            domains.domain_id as domains_id, employees.employee_id as employees_id, plannedcourses.planned_course_id as plannedcourses_id, programs.program_id as programs_id,
                        employees.employee_id as id,
                       domains.domain_id as  domains_domainId, employees.employee_id as  employees_employeeId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, programs.program_id as  programs_programId,

                          domains.domain_id as employees_domainId, employees.employee_id as employees_employeeId, plannedcourses.planned_course_id as employees_plannedCourseId, programs.program_id as employees_programId,
                          
                       
                         
                          null domains.domain_name as domains_domainName, domains.domain_leader_id as domains_domainLeaderId, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM domains LEFT JOIN employees ON employees.employee_id = domains.domain_leader_id AND employees.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN programs ON programs.domain_id = domains.domain_id AND programs.status !='inactive' WHERE (domains.domain_id = {{id}}  AND  domains.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE domains SET status = 'inactive' WHERE domain_id = {{id}}"}    

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
                        successMessage: "domains Grouped CRUD Hit successfully!",
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
                            domains.domain_id as domains_id, employees.employee_id as employees_id, plannedcourses.planned_course_id as plannedcourses_id, programs.program_id as programs_id,
                        employees.employee_id as id,
                       domains.domain_id as  domains_domainId, employees.employee_id as  employees_employeeId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, programs.program_id as  programs_programId,

                          domains.domain_id as employees_domainId, employees.employee_id as employees_employeeId, plannedcourses.planned_course_id as employees_plannedCourseId, programs.program_id as employees_programId,
                          
                       
                         
                          null employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM domains LEFT JOIN employees ON employees.employee_id = domains.domain_leader_id AND employees.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN programs ON programs.domain_id = domains.domain_id AND programs.status !='inactive' WHERE (employees.employee_id = {{id}}  AND  employees.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plannedcourses (semester_id, semester_id, domain_id, domain_id, course_name, credit_hours, type, required_lectures, course_desc, course_obj, image , created_by, updated_by) VALUES ({{plannedcourses_semesterId}}, {{plannedcourses_semesterId}}, {{plannedcourses_domainId}}, {{plannedcourses_domainId}}, {{plannedcourses_courseName}}, {{plannedcourses_creditHours}}, {{plannedcourses_type}}, {{plannedcourses_requiredLectures}}, {{plannedcourses_courseDesc}}, {{plannedcourses_courseObj}}, {{plannedcourses_image}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET semester_id = {{plannedcourses_semesterId}}, semester_id = {{plannedcourses_semesterId}}, domain_id = {{plannedcourses_domainId}}, domain_id = {{plannedcourses_domainId}}, course_name = {{plannedcourses_courseName}}, credit_hours = {{plannedcourses_creditHours}}, type = {{plannedcourses_type}}, required_lectures = {{plannedcourses_requiredLectures}}, course_desc = {{plannedcourses_courseDesc}}, course_obj = {{plannedcourses_courseObj}}, image = {{plannedcourses_image}} WHERE planned_course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, planned_course_id as plannedcourses_id,planned_course_id as id, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_desc as plannedcourses_courseDesc, plannedcourses.course_obj as plannedcourses_courseObj, plannedcourses.image as plannedcourses_image  FROM plannedcourses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            domains.domain_id as domains_id, employees.employee_id as employees_id, plannedcourses.planned_course_id as plannedcourses_id, programs.program_id as programs_id,
                        employees.employee_id as id,
                       domains.domain_id as  domains_domainId, employees.employee_id as  employees_employeeId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, programs.program_id as  programs_programId,

                          domains.domain_id as employees_domainId, employees.employee_id as employees_employeeId, plannedcourses.planned_course_id as employees_plannedCourseId, programs.program_id as employees_programId,
                          
                       
                         
                          null plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_desc as plannedcourses_courseDesc, plannedcourses.course_obj as plannedcourses_courseObj, plannedcourses.image as plannedcourses_image, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM domains LEFT JOIN employees ON employees.employee_id = domains.domain_leader_id AND employees.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN programs ON programs.domain_id = domains.domain_id AND programs.status !='inactive' WHERE (plannedcourses.planned_course_id = {{id}}  AND  plannedcourses.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET status = 'inactive' WHERE planned_course_id = {{id}}"}    

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
                        successMessage: "plannedcourses Grouped CRUD Hit successfully!",
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
                            domains.domain_id as domains_id, employees.employee_id as employees_id, plannedcourses.planned_course_id as plannedcourses_id, programs.program_id as programs_id,
                        employees.employee_id as id,
                       domains.domain_id as  domains_domainId, employees.employee_id as  employees_employeeId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId, programs.program_id as  programs_programId,

                          domains.domain_id as employees_domainId, employees.employee_id as employees_employeeId, plannedcourses.planned_course_id as employees_plannedCourseId, programs.program_id as employees_programId,
                          
                       
                         
                          null programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear, 
                        employees.department_id as employees_departmentId, employees.personal_domain_url as employees_personalDomainUrl, employees.urdd_id as employees_urddId, employees.qualification as employees_qualification, employees.salary as employees_salary, employees.start_date as employees_startDate, employees.end_date as employees_endDate FROM domains LEFT JOIN employees ON employees.employee_id = domains.domain_leader_id AND employees.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.domain_id = domains.domain_id OR plannedcourses.domain_id = domains.domain_id) LEFT JOIN programs ON programs.domain_id = domains.domain_id AND programs.status !='inactive' WHERE (programs.program_id = {{id}}  AND  programs.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsDomains_object}