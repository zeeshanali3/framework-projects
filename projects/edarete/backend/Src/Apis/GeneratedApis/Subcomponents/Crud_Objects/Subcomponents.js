// /* CRUD Objects for table: subcomponents */
// const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
// const schedule = require("node-schedule");  


// async function initializePushNotificaiton(req, decryptedPayload) {
    
//     const objectResolverOutput = decryptedPayload["objectResolverOutput"]; 
//     console.log("check thissss:::::", objectResolverOutput);
//     let quiz_id = objectResolverOutput.insertId;
//     if(!quiz_id){
//    return {return: objectResolverOutput};
//     }
//     const quizInfoQuery = `SELECT * FROM subcomponents WHERE sub_component_id  = ?`;
//     const quizInfoResult = await executeQuery(quizInfoQuery, [quiz_id], projectDB);

//     if (quizInfoResult.length == 0) {
//       throw new Error("No quiz info found");
//     }

//     if(quizInfoResult[0].config.send_notifications != true){
//    return {return: objectResolverOutput};
//     }
//     let start_time = quizInfoResult[0].start_time;
//     let description = quizInfoResult[0].text;
//     console.log("Quiz start_time:", start_time);

//     // Convert DB datetime to JS Date
//     const quizDate = new Date(start_time);

//     // Subtract 30 minutes (30 * 60 * 1000 ms)
//     const jobTime = new Date(quizDate.getTime() - (30 * 60 * 1000));
    
//     // Schedule the job
//     schedule.scheduleJob(jobTime, async function () {
        
//     let fcmTokenQuery = `  SELECT ud.fcm_token FROM subcomponents sc 
//     JOIN classcomponent cc ON sc.component_id = cc.component_id
//     JOIN courses c ON cc.course_id = c.course_id
//     JOIN enrollements e ON c.course_id = e.course_id 
//     JOIN studentsemesters ss ON e.student_semester_id = ss.semester_id
//     JOIN students s ON s.student_user_id = ss.student_user_id
//     JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
//     JOIN users u ON u.user_id = urdd.user_id
//     JOIN user_devices ud ON ud.user_id = u.user_id
//     WHERE sc.sub_component_id = ? `;
    
    
//     try {

//       const fcmTokenResult = await executeQuery(fcmTokenQuery, [quiz_id], projectDB);

//       if (!fcmTokenResult || fcmTokenResult.length === 0) {
//         console.log("No FCM tokens found for this quiz.");
//         return {return: objectResolverOutput};
//       }

//       const tokens = fcmTokenResult.map(row => row.fcm_token).filter(Boolean);

//       if (tokens.length === 0) {
//         console.log("No valid tokens found.");
//        return {return: objectResolverOutput};  
  //  }

//       // Construct message
//       const message = {
//         notification: {
//           title: "Quiz Reminder",
//           body: `Quiz ${description} is starting in 30 minutes. Please join on time.`,
//         },
//         tokens: tokens, // multiple tokens
//       };

//       // Send to multiple tokens
//       const response = await admin.messaging().sendMulticast(message);
//       console.log("FCM Multicast Response:", response);
//       return {return: objectResolverOutput};
//     } catch (err) {
//       console.error("Error sending quiz notification:", err);
//     }
//   });


// }

      const parameters = require('./CRUD_parameters');
      global.CrudSubcomponents_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponents (component_id, sub_component_num, text, date, start_time, end_time, total_marks, weightage, is_public, config, created_by, updated_by) VALUES ({{subcomponents_componentId}}, {{subcomponents_subComponentNum}}, {{subcomponents_text}}, {{subcomponents_date}}, {{subcomponents_startTime}}, {{subcomponents_endTime}}, {{subcomponents_totalMarks}}, {{subcomponents_weightage}}, {{subcomponents_isPublic}}, {{subcomponents_config}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE subcomponents SET component_id = {{subcomponents_componentId}}, sub_component_num = {{subcomponents_subComponentNum}}, text = {{subcomponents_text}}, date = {{subcomponents_date}}, start_time = {{subcomponents_startTime}}, end_time = {{subcomponents_endTime}}, total_marks = {{subcomponents_totalMarks}}, weightage = {{subcomponents_weightage}}, is_public = {{subcomponents_isPublic}}, config = {{subcomponents_config}} WHERE sub_component_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, subcomponents.sub_component_id as subcomponents_id, subcomponents.sub_component_id as id, subcomponents.sub_component_id as subcomponents_subComponentId,subcomponents.component_id as subcomponents_componentId, subcomponents.sub_component_num as subcomponents_subComponentNum,subcomponents.text as subcomponents_text,subcomponents.date as subcomponents_date,subcomponents.start_time as subcomponents_startTime,subcomponents.end_time as subcomponents_endTime,subcomponents.total_marks as subcomponents_totalMarks,subcomponents.weightage as subcomponents_weightage,subcomponents.is_public as subcomponents_isPublic,subcomponents.status as subcomponents_status,subcomponents.config as subcomponents_config,subcomponents.created_by as subcomponents_createdBy,subcomponents.updated_by as subcomponents_updatedBy,subcomponents.created_at as subcomponents_createdAt,subcomponents.updated_at as subcomponents_updatedAt, CONCAT(classcomponent.component_name, ' - ', programs.program_name) AS classcomponent_componentName FROM subcomponents LEFT JOIN classcomponent ON subcomponents.component_id = classcomponent.component_id LEFT JOIN courses ON courses.course_id = classcomponent.course_id LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id LEFT JOIN semesters ON semesters.semester_id = plannedcourses.semester_id LEFT JOIN programs ON programs.program_id = semesters.program_id  Where subcomponents.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT subcomponents.sub_component_id as subcomponents_id, subcomponents.sub_component_id as id, subcomponents.sub_component_id as subcomponents_subComponentId,subcomponents.component_id as subcomponents_componentId,subcomponents.sub_component_num as subcomponents_subComponentNum,subcomponents.text as subcomponents_text,subcomponents.date as subcomponents_date,subcomponents.start_time as subcomponents_startTime,subcomponents.end_time as subcomponents_endTime,subcomponents.total_marks as subcomponents_totalMarks,subcomponents.weightage as subcomponents_weightage,subcomponents.is_public as subcomponents_isPublic,subcomponents.status as subcomponents_status,subcomponents.config as subcomponents_config,subcomponents.created_by as subcomponents_createdBy,subcomponents.updated_by as subcomponents_updatedBy,subcomponents.created_at as subcomponents_createdAt,subcomponents.updated_at as subcomponents_updatedAt, classcomponent.component_name as classcomponent_componentName FROM subcomponents LEFT JOIN classcomponent ON subcomponents.component_id = classcomponent.component_id WHERE sub_component_id = {{id}} OR sub_component_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE subcomponents SET status = 'inactive' WHERE sub_component_id = {{id}}"},           
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
                        // permission: { Add: "add_subcomponents", View: "view_subcomponents", Update: "update_subcomponents", Delete: "delete_subcomponents", List: "list_subcomponents" },
                        // providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Subcomponents CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Subcomponents.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSubcomponents_object}