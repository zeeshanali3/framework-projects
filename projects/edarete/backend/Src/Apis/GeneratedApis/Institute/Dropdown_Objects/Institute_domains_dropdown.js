global.Institute_domainsDropdown_object = {
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
                          "queryPayload": "SELECT institute_domains.institute_domain_id as value, CONCAT_WS(' ', LEFT(institutes.institute_name, 10), LEFT(domains.domain_name, 10)) AS label FROM institute_domains LEFT JOIN institutes ON institute_domains.institute_id = institutes.institute_id LEFT JOIN domains ON institute_domains.domain_id = domains.domain_id where institute_domains.status!='inactive'",
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
                        permission: "dropdown_institute_domains",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "institute_domains retrieved successfully!",
                      errorMessage: "Failed to retrieve institute_domains.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { Institute_domainsDropdown_object }