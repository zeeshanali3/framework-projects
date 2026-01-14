global.Permission_groups_permissionsDropdown_object = {
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
                          "queryPayload": "SELECT permission_groups_permissions.permission_group_permission_id as value, CONCAT_WS(' ', LEFT(permission_groups.group_name, 10), LEFT(permissions.permission_name, 10)) AS label FROM permission_groups_permissions LEFT JOIN permission_groups ON permission_groups_permissions.group_id = permission_groups.permission_group_id LEFT JOIN permissions ON permission_groups_permissions.permission_id = permissions.permission_id where permission_groups_permissions.status!='inactive'",
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
                        permission: "dropdown_permission_groups_permissions",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "permission_groups_permissions retrieved successfully!",
                      errorMessage: "Failed to retrieve permission_groups_permissions.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { Permission_groups_permissionsDropdown_object }