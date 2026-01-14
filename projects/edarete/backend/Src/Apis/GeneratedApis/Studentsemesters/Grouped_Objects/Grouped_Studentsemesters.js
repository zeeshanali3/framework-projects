const parameters = require('./CRUD_parameters');
        global.GroupedCrudsStudentsemesters_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO studentsemesters (student_user_id, semester_id, CGPA, SGPA, credits_acquired, attendance_delta , created_by, updated_by) VALUES ({{studentsemesters_studentUserId}}, {{studentsemesters_semesterId}}, {{studentsemesters_CGPA}}, {{studentsemesters_SGPA}}, {{studentsemesters_creditsAcquired}}, {{studentsemesters_attendanceDelta}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE studentsemesters SET student_user_id = {{studentsemesters_studentUserId}}, semester_id = {{studentsemesters_semesterId}}, CGPA = {{studentsemesters_CGPA}}, SGPA = {{studentsemesters_SGPA}}, credits_acquired = {{studentsemesters_creditsAcquired}}, attendance_delta = {{studentsemesters_attendanceDelta}}, created_by = {{studentsemesters_createdBy}}, updated_by = {{studentsemesters_updatedBy}} WHERE student_semester_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, student_semester_id as studentsemesters_id,student_semester_id as id, studentsemesters.student_user_id as studentsemesters_studentUserId, studentsemesters.semester_id as studentsemesters_semesterId, studentsemesters.CGPA as studentsemesters_CGPA, studentsemesters.SGPA as studentsemesters_SGPA, studentsemesters.credits_acquired as studentsemesters_creditsAcquired, studentsemesters.attendance_delta as studentsemesters_attendanceDelta  FROM studentsemesters WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            studentsemesters.student_semester_id as studentsemesters_id, enrollements.enrollement_id as enrollements_id,
                        enrollements.enrollement_id as id,
                       studentsemesters.student_semester_id as  studentsemesters_studentSemesterId, enrollements.enrollement_id as  enrollements_enrollementId,

                          studentsemesters.student_semester_id as enrollements_studentSemesterId, enrollements.enrollement_id as enrollements_enrollementId,
                          
                       
                         
                          null studentsemesters.student_user_id as studentsemesters_studentUserId, studentsemesters.semester_id as studentsemesters_semesterId, studentsemesters.CGPA as studentsemesters_CGPA, studentsemesters.SGPA as studentsemesters_SGPA, studentsemesters.credits_acquired as studentsemesters_creditsAcquired, studentsemesters.attendance_delta as studentsemesters_attendanceDelta, 
                        enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId FROM studentsemesters LEFT JOIN enrollements ON enrollements.student_semester_id = studentsemesters.student_semester_id AND enrollements.status !='inactive' WHERE (studentsemesters.student_semester_id = {{id}}  AND  studentsemesters.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE studentsemesters SET status = 'inactive' WHERE student_semester_id = {{id}}"}    

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
                        successMessage: "studentsemesters Grouped CRUD Hit successfully!",
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO enrollements (student_semester_id, grade, group_name, enrolled_date, course_id , created_by, updated_by) VALUES ({{enrollements_studentSemesterId}}, {{enrollements_grade}}, {{enrollements_groupName}}, {{enrollements_enrolledDate}}, {{enrollements_courseId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE enrollements SET student_semester_id = {{enrollements_studentSemesterId}}, grade = {{enrollements_grade}}, group_name = {{enrollements_groupName}}, enrolled_date = {{enrollements_enrolledDate}}, course_id = {{enrollements_courseId}}, created_by = {{enrollements_createdBy}}, updated_by = {{enrollements_updatedBy}} WHERE enrollement_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, enrollement_id as enrollements_id,enrollement_id as id, enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId  FROM enrollements WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            studentsemesters.student_semester_id as studentsemesters_id, enrollements.enrollement_id as enrollements_id,
                        enrollements.enrollement_id as id,
                       studentsemesters.student_semester_id as  studentsemesters_studentSemesterId, enrollements.enrollement_id as  enrollements_enrollementId,

                          studentsemesters.student_semester_id as enrollements_studentSemesterId, enrollements.enrollement_id as enrollements_enrollementId,
                          
                       
                         
                          null enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId, 
                        enrollements.student_semester_id as enrollements_studentSemesterId, enrollements.grade as enrollements_grade, enrollements.group_name as enrollements_groupName, enrollements.enrolled_date as enrollements_enrolledDate, enrollements.course_id as enrollements_courseId FROM studentsemesters LEFT JOIN enrollements ON enrollements.student_semester_id = studentsemesters.student_semester_id AND enrollements.status !='inactive' WHERE (enrollements.enrollement_id = {{id}}  AND  enrollements.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE enrollements SET status = 'inactive' WHERE enrollement_id = {{id}}"}    

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
                        successMessage: "enrollements Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsStudentsemesters_object}