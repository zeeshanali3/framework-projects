global.Platform_versionsDropdown_object = {
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
                          "queryPayload": "SELECT platform_versions.platform_version_id as value, CONCAT_WS(' ', LEFT(platforms.platform_name, 10)) AS label FROM platform_versions LEFT JOIN versions ON platform_versions.version_id = versions.version_id LEFT JOIN platforms ON platform_versions.platform_id = platforms.platform_id where platform_versions.status!='inactive'",
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
                        permission: "dropdown_platform_versions",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "platform_versions retrieved successfully!",
                      errorMessage: "Failed to retrieve platform_versions.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { Platform_versionsDropdown_object }