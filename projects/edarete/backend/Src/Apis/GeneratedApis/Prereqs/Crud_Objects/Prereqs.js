/* CRUD Objects for table: prereqs */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPrereqs_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO prereqs (planned_course_id, pre_req_course_id, created_by, updated_by) VALUES ({{prereqs_plannedCourseId}}, {{prereqs_preReqCourseId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE prereqs SET planned_course_id = {{prereqs_plannedCourseId}}, pre_req_course_id = {{prereqs_preReqCourseId}} WHERE pre_reqs_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, prereqs.pre_reqs_id as prereqs_id, prereqs.pre_reqs_id as id, prereqs.pre_reqs_id as prereqs_preReqsId,prereqs.planned_course_id as prereqs_plannedCourseId,prereqs.pre_req_course_id as prereqs_preReqCourseId,prereqs.status as prereqs_status,prereqs.created_by as prereqs_createdBy,prereqs.updated_by as prereqs_updatedBy,prereqs.created_at as prereqs_createdAt,prereqs.updated_at as prereqs_updatedAt, plannedcourses.course_name as plannedcourses_courseName,plannedcourses.course_name as plannedcourses_courseName FROM prereqs LEFT JOIN plannedcourses ON prereqs.planned_course_id = plannedcourses.planned_course_id LEFT JOIN plannedcourses ON prereqs.pre_req_course_id = plannedcourses.planned_course_id Where prereqs.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT prereqs.pre_reqs_id as prereqs_id, prereqs.pre_reqs_id as id, prereqs.pre_reqs_id as prereqs_preReqsId,prereqs.planned_course_id as prereqs_plannedCourseId,prereqs.pre_req_course_id as prereqs_preReqCourseId,prereqs.status as prereqs_status,prereqs.created_by as prereqs_createdBy,prereqs.updated_by as prereqs_updatedBy,prereqs.created_at as prereqs_createdAt,prereqs.updated_at as prereqs_updatedAt, plannedcourses.course_name as plannedcourses_courseName,plannedcourses.course_name as plannedcourses_courseName FROM prereqs LEFT JOIN plannedcourses ON prereqs.planned_course_id = plannedcourses.planned_course_id LEFT JOIN plannedcourses ON prereqs.pre_req_course_id = plannedcourses.planned_course_id WHERE pre_reqs_id = {{id}} OR pre_reqs_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE prereqs SET status = 'inactive' WHERE pre_reqs_id = {{id}}"},           
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
                        permission: { Add: "add_prereqs", View: "view_prereqs", Update: "update_prereqs", Delete: "delete_prereqs", List: "list_prereqs" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Prereqs CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Prereqs.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPrereqs_object}