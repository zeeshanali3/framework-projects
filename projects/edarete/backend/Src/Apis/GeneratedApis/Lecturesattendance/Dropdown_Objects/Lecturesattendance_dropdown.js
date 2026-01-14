global.LecturesattendanceDropdown_object = {
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
                          "queryPayload": "SELECT lecturesattendance.attendance_id as value, CONCAT_WS(' ', LEFT(enrollements.group_name, 10), LEFT(classcomponent.component_name, 10)) AS label FROM lecturesattendance LEFT JOIN enrollements ON lecturesattendance.enrollement_id = enrollements.enrollement_id LEFT JOIN subcomponents ON lecturesattendance.sub_component_id = subcomponents.sub_component_id LEFT JOIN classcomponent ON subcomponents.component_id = classcomponent.component_id where lecturesattendance.status!='inactive'",
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
                        permission: "dropdown_lecturesattendance",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "lecturesattendance retrieved successfully!",
                      errorMessage: "Failed to retrieve lecturesattendance.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { LecturesattendanceDropdown_object }