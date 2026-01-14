/* CRUD Objects for table: course_requests */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCourse_requests_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO course_requests (course_id, student_urdd_id, created_by, updated_by) VALUES ({{courseRequests_courseId}}, {{courseRequests_studentUrddId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE course_requests SET course_id = {{courseRequests_courseId}}, student_urdd_id = {{courseRequests_studentUrddId}} WHERE course_request_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_requests.course_request_id as courseRequests_id, course_requests.course_request_id as id, course_requests.course_request_id as courseRequests_courseRequestId,course_requests.course_id as courseRequests_courseId,course_requests.student_urdd_id as courseRequests_studentUrddId FROM course_requests  Where course_requests.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT course_requests.course_request_id as courseRequests_id, course_requests.course_request_id as id, course_requests.course_request_id as courseRequests_courseRequestId,course_requests.course_id as courseRequests_courseId,course_requests.student_urdd_id as courseRequests_studentUrddId FROM course_requests  WHERE course_request_id = {{id}} OR course_request_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE course_requests SET status = 'inactive' WHERE course_request_id = {{id}}"},           
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
                        permission: { Add: "add_course_requests", View: "view_course_requests", Update: "update_course_requests", Delete: "delete_course_requests", List: "list_course_requests" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Course_requests CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Course_requests.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCourse_requests_object}