global.Application_subscriptionsDropdown_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
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
                          "queryPayload": "SELECT application_subscriptions.id as value, CONCAT_WS(' ', LEFT(plans.name, 10), LEFT(discounts.description, 10), LEFT(users.first_name, 10), LEFT(supported_payment_methods.name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(users.first_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS label FROM application_subscriptions LEFT JOIN user_roles_designations_department ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id LEFT JOIN plans ON application_subscriptions.plan_id = plans.id LEFT JOIN user_payment_methods ON application_subscriptions.user_payment_method_id = user_payment_methods.id LEFT JOIN discounts ON application_subscriptions.discount_id = discounts.id LEFT JOIN roles_designations_department ON user_roles_designations_department.role_designation_department_id = roles_designations_department.role_designation_department_id LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id LEFT JOIN user_roles_designations_department ON user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id LEFT JOIN supported_payment_methods ON user_payment_methods.supported_payment_method_id = supported_payment_methods.id LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id LEFT JOIN departments ON roles_designations_department.department_id = departments.department_id LEFT JOIN roles_designations_department ON user_roles_designations_department.role_designation_department_id = roles_designations_department.role_designation_department_id LEFT JOIN users ON user_roles_designations_department.user_id = users.user_id LEFT JOIN designations ON roles_designations_department.designation_id = designations.designation_id LEFT JOIN roles ON roles_designations_department.role_id = roles.role_id LEFT JOIN departments ON roles_designations_department.department_id = departments.department_id where application_subscriptions.status!='inactive'",
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
                        permission: null,
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "application_subscriptions retrieved successfully!",
                      errorMessage: "Failed to retrieve application_subscriptions.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { Application_subscriptionsDropdown_object }