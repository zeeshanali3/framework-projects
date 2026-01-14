global.SubcomponentsDropdown_object = {
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
                          "queryPayload": "SELECT subcomponents.sub_component_id as value, CONCAT_WS (' ', LEFT(classcomponent.component_name, 10), LEFT(subcomponents.sub_component_num, 25) ) AS label FROM subcomponents LEFT JOIN classcomponent ON subcomponents.component_id = classcomponent.component_id where subcomponents.status!='inactive'",
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
                        permission: "dropdown_subcomponents",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "subcomponents retrieved successfully!",
                      errorMessage: "Failed to retrieve subcomponents.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { SubcomponentsDropdown_object }