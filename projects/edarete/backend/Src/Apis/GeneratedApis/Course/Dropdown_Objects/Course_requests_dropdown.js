global.Course_requestsDropdown_object = {
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
                      parameters: null,
                      apiInfo: {
                      
                        preProcessFunction : [],
                        query: {
                          "queryPayload": "SELECT course_requests.course_request_id as value, CONCAT_WS(' ', LEFT(plannedcourses.course_name, 10), LEFT(clo.clodomain_name, 10), LEFT(users.username, 10), LEFT(departments.department_name, 10), LEFT(departments.department_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.username, 10), LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS label FROM course_requests LEFT JOIN courses ON course_requests.course_id = courses.course_id LEFT JOIN user_roles_designations_department ON course_requests.student_urdd_id = user_roles_designations_department.user_role_designation_department_id LEFT JOIN plannedcourses ON courses.planned_course_id = plannedcourses.planned_course_id LEFT JOIN clo ON courses.cloid = clo.cloid LEFT JOIN employees ON courses.teacher_employee_id = employees.employee_id LEFT JOIN roles_designations_department ON user_roles_designations_department.role_designation_department_id = roles_designations_department.role_designation_department_id LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id LEFT JOIN departments ON employees.department_id = departments.department_id LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id where course_requests.status!='inactive'",
                        },
                        database: "mainDb",
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: "GET",
                        permission: "dropdown_course_requests",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "course_requests retrieved successfully!",
                      errorMessage: "Failed to retrieve course_requests.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { Course_requestsDropdown_object }