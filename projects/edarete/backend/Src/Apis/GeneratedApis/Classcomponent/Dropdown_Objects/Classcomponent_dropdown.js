global.ClasscomponentDropdown_object = {
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
                          "queryPayload": `SELECT LEFT(CONCAT(pc.course_name, ' ', cc.component_name), 50) as label, cc.component_id as value FROM classcomponent cc
                          LEFT JOIN courses c ON c.course_id = cc.course_id
                          LEFT JOIN plannedcourses pc ON pc.planned_course_id = c.planned_course_id
                          where cc.status!='inactive'`,
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
                        permission: "dropdown_classcomponent",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "classcomponent retrieved successfully!",
                      errorMessage: "Failed to retrieve classcomponent.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { ClasscomponentDropdown_object }