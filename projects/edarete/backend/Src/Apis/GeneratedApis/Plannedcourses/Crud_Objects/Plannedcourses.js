/* CRUD Objects for table: plannedcourses */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPlannedcourses_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO plannedcourses (semester_id, domain_id, course_name, credit_hours, type, required_lectures, course_description, course_objective, image, created_by, updated_by) VALUES ({{plannedcourses_semesterId}}, {{plannedcourses_domainId}}, {{plannedcourses_courseName}}, {{plannedcourses_creditHours}}, {{plannedcourses_type}}, {{plannedcourses_requiredLectures}}, {{plannedcourses_courseDescription}}, {{plannedcourses_courseObjective}}, {{plannedcourses_image}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE plannedcourses SET semester_id = {{plannedcourses_semesterId}}, domain_id = {{plannedcourses_domainId}}, course_name = {{plannedcourses_courseName}}, credit_hours = {{plannedcourses_creditHours}}, type = {{plannedcourses_type}}, required_lectures = {{plannedcourses_requiredLectures}}, course_description = {{plannedcourses_courseDescription}}, course_objective = {{plannedcourses_courseObjective}}, image = {{plannedcourses_image}} WHERE planned_course_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, plannedcourses.planned_course_id as plannedcourses_id, plannedcourses.planned_course_id as id, plannedcourses.planned_course_id as plannedcourses_plannedCourseId,plannedcourses.semester_id as plannedcourses_semesterId,plannedcourses.domain_id as plannedcourses_domainId,plannedcourses.course_name as plannedcourses_courseName,plannedcourses.credit_hours as plannedcourses_creditHours,plannedcourses.type as plannedcourses_type,plannedcourses.required_lectures as plannedcourses_requiredLectures,plannedcourses.course_description as plannedcourses_courseDescription,plannedcourses.course_objective as plannedcourses_courseObjective,plannedcourses.image as plannedcourses_image,plannedcourses.status as plannedcourses_status,plannedcourses.created_by as plannedcourses_createdBy,plannedcourses.updated_by as plannedcourses_updatedBy,plannedcourses.created_at as plannedcourses_createdAt,plannedcourses.updated_at as plannedcourses_updatedAt, semesters.semester_name as semesters_semesterName,domains.domain_name as domains_domainName FROM plannedcourses LEFT JOIN semesters ON plannedcourses.semester_id = semesters.semester_id LEFT JOIN domains ON plannedcourses.domain_id = domains.domain_id Where plannedcourses.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT plannedcourses.planned_course_id as plannedcourses_id, plannedcourses.planned_course_id as id, plannedcourses.planned_course_id as plannedcourses_plannedCourseId,plannedcourses.semester_id as plannedcourses_semesterId,plannedcourses.domain_id as plannedcourses_domainId,plannedcourses.course_name as plannedcourses_courseName,plannedcourses.credit_hours as plannedcourses_creditHours,plannedcourses.type as plannedcourses_type,plannedcourses.required_lectures as plannedcourses_requiredLectures,plannedcourses.course_description as plannedcourses_courseDescription,plannedcourses.course_objective as plannedcourses_courseObjective,plannedcourses.image as plannedcourses_image,plannedcourses.status as plannedcourses_status,plannedcourses.created_by as plannedcourses_createdBy,plannedcourses.updated_by as plannedcourses_updatedBy,plannedcourses.created_at as plannedcourses_createdAt,plannedcourses.updated_at as plannedcourses_updatedAt, semesters.semester_name as semesters_semesterName,domains.domain_name as domains_domainName FROM plannedcourses LEFT JOIN semesters ON plannedcourses.semester_id = semesters.semester_id LEFT JOIN domains ON plannedcourses.domain_id = domains.domain_id WHERE planned_course_id = {{id}} OR planned_course_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE plannedcourses SET status = 'inactive' WHERE planned_course_id = {{id}}"},           
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
                        permission: { Add: "add_plannedcourses", View: "view_plannedcourses", Update: "update_plannedcourses", Delete: "delete_plannedcourses", List: "list_plannedcourses" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Plannedcourses CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Plannedcourses.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPlannedcourses_object}