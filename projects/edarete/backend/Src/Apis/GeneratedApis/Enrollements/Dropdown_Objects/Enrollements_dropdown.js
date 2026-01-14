global.EnrollementsDropdown_object = {
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
                          "queryPayload": `SELECT LEFT(CONCAT(u.first_name, ' ', u.last_name), 50) as label, 
                          e.enrollement_id as value 
                          FROM enrollements e
                          LEFT JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
                          LEFT JOIN students s ON s.student_user_id = ss.student_user_id
                          LEFT JOIN user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
                          LEFT JOIN users u ON u.user_id = urdd.user_id
                          WHERE e.status != 'inactive'`,
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
                        permission: "dropdown_enrollements",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "enrollements retrieved successfully!",
                      errorMessage: "Failed to retrieve enrollements.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { EnrollementsDropdown_object }