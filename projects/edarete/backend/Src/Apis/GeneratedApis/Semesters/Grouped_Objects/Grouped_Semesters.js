const parameters = require('./CRUD_parameters');
        global.GroupedCrudsSemesters_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO semesters (program_id, semester_num, start_date, end_date, semester_name , created_by, updated_by) VALUES ({{semesters_programId}}, {{semesters_semesterNum}}, {{semesters_startDate}}, {{semesters_endDate}}, {{semesters_semesterName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE semesters SET program_id = {{semesters_programId}}, semester_num = {{semesters_semesterNum}}, start_date = {{semesters_startDate}}, end_date = {{semesters_endDate}}, semester_name = {{semesters_semesterName}} WHERE semester_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, semester_id as semesters_id,semester_id as id, semesters.program_id as semesters_programId, semesters.semester_num as semesters_semesterNum, semesters.start_date as semesters_startDate, semesters.end_date as semesters_endDate, semesters.semester_name as semesters_semesterName  FROM semesters WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            semesters.semester_id as semesters_id, programs.program_id as programs_id, plannedcourses.planned_course_id as plannedcourses_id,
                        programs.program_id as id,
                       semesters.semester_id as  semesters_semesterId, programs.program_id as  programs_programId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId,

                          semesters.semester_id as programs_semesterId, programs.program_id as programs_programId, plannedcourses.planned_course_id as programs_plannedCourseId,
                          
                       
                         
                          null semesters.program_id as semesters_programId, semesters.semester_num as semesters_semesterNum, semesters.start_date as semesters_startDate, semesters.end_date as semesters_endDate, semesters.semester_name as semesters_semesterName, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM semesters LEFT JOIN programs ON programs.program_id = semesters.program_id AND programs.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.semester_id = semesters.semester_id OR plannedcourses.semester_id = semesters.semester_id) WHERE (semesters.semester_id = {{id}}  AND  semesters.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE semesters SET status = 'inactive' WHERE semester_id = {{id}}"}    

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
                        successMessage: "semesters Grouped CRUD Hit successfully!",
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
                            semesters.semester_id as semesters_id, programs.program_id as programs_id, plannedcourses.planned_course_id as plannedcourses_id,
                        programs.program_id as id,
                       semesters.semester_id as  semesters_semesterId, programs.program_id as  programs_programId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId,

                          semesters.semester_id as programs_semesterId, programs.program_id as programs_programId, plannedcourses.planned_course_id as programs_plannedCourseId,
                          
                       
                         
                          null programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM semesters LEFT JOIN programs ON programs.program_id = semesters.program_id AND programs.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.semester_id = semesters.semester_id OR plannedcourses.semester_id = semesters.semester_id) WHERE (programs.program_id = {{id}}  AND  programs.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plannedcourses (semester_id, semester_id, domain_id, domain_id, course_name, credit_hours, type, required_lectures, course_desc, course_obj, image , created_by, updated_by) VALUES ({{plannedcourses_semesterId}}, {{plannedcourses_semesterId}}, {{plannedcourses_domainId}}, {{plannedcourses_domainId}}, {{plannedcourses_courseName}}, {{plannedcourses_creditHours}}, {{plannedcourses_type}}, {{plannedcourses_requiredLectures}}, {{plannedcourses_courseDesc}}, {{plannedcourses_courseObj}}, {{plannedcourses_image}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET semester_id = {{plannedcourses_semesterId}}, semester_id = {{plannedcourses_semesterId}}, domain_id = {{plannedcourses_domainId}}, domain_id = {{plannedcourses_domainId}}, course_name = {{plannedcourses_courseName}}, credit_hours = {{plannedcourses_creditHours}}, type = {{plannedcourses_type}}, required_lectures = {{plannedcourses_requiredLectures}}, course_desc = {{plannedcourses_courseDesc}}, course_obj = {{plannedcourses_courseObj}}, image = {{plannedcourses_image}} WHERE planned_course_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, planned_course_id as plannedcourses_id,planned_course_id as id, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_desc as plannedcourses_courseDesc, plannedcourses.course_obj as plannedcourses_courseObj, plannedcourses.image as plannedcourses_image  FROM plannedcourses WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            semesters.semester_id as semesters_id, programs.program_id as programs_id, plannedcourses.planned_course_id as plannedcourses_id,
                        programs.program_id as id,
                       semesters.semester_id as  semesters_semesterId, programs.program_id as  programs_programId, plannedcourses.planned_course_id as  plannedcourses_plannedCourseId,

                          semesters.semester_id as programs_semesterId, programs.program_id as programs_programId, plannedcourses.planned_course_id as programs_plannedCourseId,
                          
                       
                         
                          null plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.semester_id as plannedcourses_semesterId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.domain_id as plannedcourses_domainId, plannedcourses.course_name as plannedcourses_courseName, plannedcourses.credit_hours as plannedcourses_creditHours, plannedcourses.type as plannedcourses_type, plannedcourses.required_lectures as plannedcourses_requiredLectures, plannedcourses.course_desc as plannedcourses_courseDesc, plannedcourses.course_obj as plannedcourses_courseObj, plannedcourses.image as plannedcourses_image, 
                        programs.department_id as programs_departmentId, programs.domain_id as programs_domainId, programs.program_name as programs_programName, programs.program_year as programs_programYear FROM semesters LEFT JOIN programs ON programs.program_id = semesters.program_id AND programs.status !='inactive' LEFT JOIN plannedcourses ON (plannedcourses.semester_id = semesters.semester_id OR plannedcourses.semester_id = semesters.semester_id) WHERE (plannedcourses.planned_course_id = {{id}}  AND  plannedcourses.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsSemesters_object}