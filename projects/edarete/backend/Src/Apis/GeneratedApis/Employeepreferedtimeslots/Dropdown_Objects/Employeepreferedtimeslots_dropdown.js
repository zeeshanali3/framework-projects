global.EmployeepreferedtimeslotsDropdown_object = {
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
                          "queryPayload": "SELECT employeepreferedtimeslots.employee_prefered_time_slots_id as value, '' AS label FROM employeepreferedtimeslots  where employeepreferedtimeslots.status!='inactive'",
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
                        permission: "dropdown_employeepreferedtimeslots",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "employeepreferedtimeslots retrieved successfully!",
                      errorMessage: "Failed to retrieve employeepreferedtimeslots.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { EmployeepreferedtimeslotsDropdown_object }