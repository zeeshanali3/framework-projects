/* CRUD Objects for table: courses */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCourses_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO courses (course_sub_domain_prefix, planned_course_id, cloid, course_code, teacher_employee_id, tassist_employee_id, created_by, updated_by) VALUES ({{courses_courseSubDomainPrefix}}, {{courses_plannedCourseId}}, {{courses_cloid}}, {{courses_courseCode}}, {{courses_teacherEmployeeId}}, {{courses_tassistEmployeeId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE courses SET course_sub_domain_prefix = {{courses_courseSubDomainPrefix}}, planned_course_id = {{courses_plannedCourseId}}, cloid = {{courses_cloid}}, course_code = {{courses_courseCode}}, teacher_employee_id = {{courses_teacherEmployeeId}}, tassist_employee_id = {{courses_tassistEmployeeId}} WHERE course_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, courses.course_id as courses_id, courses.course_id as id, courses.course_id as courses_courseId,courses.course_sub_domain_prefix as courses_courseSubDomainPrefix,courses.planned_course_id as courses_plannedCourseId,courses.cloid as courses_cloid,courses.course_code as courses_courseCode,courses.teacher_employee_id as courses_teacherEmployeeId,courses.tassist_employee_id as courses_tassistEmployeeId,courses.status as courses_status,courses.created_by as courses_createdBy,courses.updated_by as courses_updatedBy,courses.created_at as courses_createdAt,courses.updated_at as courses_updatedAt, plannedcourses.course_name as plannedcourses_courseName FROM courses LEFT JOIN plannedcourses ON courses.planned_course_id = plannedcourses.planned_course_id Where courses.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT courses.course_id as courses_id, courses.course_id as id, courses.course_id as courses_courseId,courses.course_sub_domain_prefix as courses_courseSubDomainPrefix,courses.planned_course_id as courses_plannedCourseId,courses.cloid as courses_cloid,courses.course_code as courses_courseCode,courses.teacher_employee_id as courses_teacherEmployeeId,courses.tassist_employee_id as courses_tassistEmployeeId,courses.status as courses_status,courses.created_by as courses_createdBy,courses.updated_by as courses_updatedBy,courses.created_at as courses_createdAt,courses.updated_at as courses_updatedAt, plannedcourses.course_name as plannedcourses_courseName FROM courses LEFT JOIN plannedcourses ON courses.planned_course_id = plannedcourses.planned_course_id WHERE course_id = {{id}} OR course_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE courses SET status = 'inactive' WHERE course_id = {{id}}"},           
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
                        permission: { Add: "add_courses", View: "view_courses", Update: "update_courses", Delete: "delete_courses", List: "list_courses" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Courses CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Courses.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCourses_object}