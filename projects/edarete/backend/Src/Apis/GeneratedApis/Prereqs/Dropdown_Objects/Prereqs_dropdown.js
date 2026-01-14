global.PrereqsDropdown_object = {
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
                          "queryPayload": "SELECT prereqs.pre_reqs_id as value, CONCAT_WS(' ', LEFT(plannedcourses.course_name, 10), LEFT(plannedcourses.course_name, 10)) AS label FROM prereqs LEFT JOIN plannedcourses ON prereqs.planned_course_id = plannedcourses.planned_course_id where prereqs.status!='inactive'",
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
                        permission: "dropdown_prereqs",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "prereqs retrieved successfully!",
                      errorMessage: "Failed to retrieve prereqs.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { PrereqsDropdown_object }