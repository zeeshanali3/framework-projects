const parameters = require('./CRUD_parameters');
        global.GroupedCrudsUser_roles_designations_department_object = {
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date, specific_attributes , created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{userRolesDesignationsDepartment_specificAttributes}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}}, specific_attributes = {{userRolesDesignationsDepartment_specificAttributes}}, created_by = {{userRolesDesignationsDepartment_createdBy}}, updated_by = {{userRolesDesignationsDepartment_updatedBy}} WHERE user_role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_department_id as userRolesDesignationsDepartment_id,user_role_designation_department_id as id, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes  FROM user_roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, user_roles_designations_department.specific_attributes as userRolesDesignationsDepartment_specificAttributes, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET status = 'inactive' WHERE user_role_designation_department_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "user_roles_designations_department Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO roles_designations_department (designation_id, role_id, department_id , created_by, updated_by) VALUES ({{rolesDesignationsDepartment_designationId}}, {{rolesDesignationsDepartment_roleId}}, {{rolesDesignationsDepartment_departmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET designation_id = {{rolesDesignationsDepartment_designationId}}, role_id = {{rolesDesignationsDepartment_roleId}}, department_id = {{rolesDesignationsDepartment_departmentId}}, created_by = {{rolesDesignationsDepartment_createdBy}}, updated_by = {{rolesDesignationsDepartment_updatedBy}} WHERE role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, role_designation_department_id as rolesDesignationsDepartment_id,role_designation_department_id as id, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId  FROM roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (roles_designations_department.role_designation_department_id = {{id}}  AND  roles_designations_department.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE roles_designations_department SET status = 'inactive' WHERE role_designation_department_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "roles_designations_department Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO users (email, first_name, last_name, username, password, phone_no, cnic, gender, father_name, image_attachment_id, address, date_of_birth, blood_group, religion , created_by, updated_by) VALUES ({{users_email}}, {{users_firstName}}, {{users_lastName}}, {{users_username}}, {{users_password}}, {{users_phoneNo}}, {{users_cnic}}, {{users_gender}}, {{users_fatherName}}, {{users_imageAttachmentId}}, {{users_address}}, {{users_dateOfBirth}}, {{users_bloodGroup}}, {{users_religion}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE users SET email = {{users_email}}, first_name = {{users_firstName}}, last_name = {{users_lastName}}, username = {{users_username}}, password = {{users_password}}, phone_no = {{users_phoneNo}}, cnic = {{users_cnic}}, gender = {{users_gender}}, father_name = {{users_fatherName}}, image_attachment_id = {{users_imageAttachmentId}}, address = {{users_address}}, date_of_birth = {{users_dateOfBirth}}, blood_group = {{users_bloodGroup}}, religion = {{users_religion}}, created_by = {{users_createdBy}}, updated_by = {{users_updatedBy}} WHERE user_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_id as users_id,user_id as id, users.email as users_email, users.first_name as users_firstName, users.last_name as users_lastName, users.username as users_username, users.password as users_password, users.phone_no as users_phoneNo, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion  FROM users WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, users.email as users_email, users.first_name as users_firstName, users.last_name as users_lastName, users.username as users_username, users.password as users_password, users.phone_no as users_phoneNo, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (users.user_id = {{id}}  AND  users.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE users SET status = 'inactive' WHERE user_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "users Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO application_subscriptions (urdd_id, plan_id, user_payment_method_id, discount_id, start_date, expiry_date, is_trial, trial_end_date, auto_renew , created_by, updated_by) VALUES ({{applicationSubscriptions_urddId}}, {{applicationSubscriptions_planId}}, {{applicationSubscriptions_userPaymentMethodId}}, {{applicationSubscriptions_discountId}}, {{applicationSubscriptions_startDate}}, {{applicationSubscriptions_expiryDate}}, {{applicationSubscriptions_isTrial}}, {{applicationSubscriptions_trialEndDate}}, {{applicationSubscriptions_autoRenew}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE application_subscriptions SET urdd_id = {{applicationSubscriptions_urddId}}, plan_id = {{applicationSubscriptions_planId}}, user_payment_method_id = {{applicationSubscriptions_userPaymentMethodId}}, discount_id = {{applicationSubscriptions_discountId}}, start_date = {{applicationSubscriptions_startDate}}, expiry_date = {{applicationSubscriptions_expiryDate}}, is_trial = {{applicationSubscriptions_isTrial}}, trial_end_date = {{applicationSubscriptions_trialEndDate}}, auto_renew = {{applicationSubscriptions_autoRenew}}, created_by = {{applicationSubscriptions_createdBy}}, updated_by = {{applicationSubscriptions_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as applicationSubscriptions_id,id as id, application_subscriptions.urdd_id as applicationSubscriptions_urddId, application_subscriptions.plan_id as applicationSubscriptions_planId, application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId, application_subscriptions.discount_id as applicationSubscriptions_discountId, application_subscriptions.start_date as applicationSubscriptions_startDate, application_subscriptions.expiry_date as applicationSubscriptions_expiryDate, application_subscriptions.is_trial as applicationSubscriptions_isTrial, application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate, application_subscriptions.auto_renew as applicationSubscriptions_autoRenew  FROM application_subscriptions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, application_subscriptions.urdd_id as applicationSubscriptions_urddId, application_subscriptions.plan_id as applicationSubscriptions_planId, application_subscriptions.user_payment_method_id as applicationSubscriptions_userPaymentMethodId, application_subscriptions.discount_id as applicationSubscriptions_discountId, application_subscriptions.start_date as applicationSubscriptions_startDate, application_subscriptions.expiry_date as applicationSubscriptions_expiryDate, application_subscriptions.is_trial as applicationSubscriptions_isTrial, application_subscriptions.trial_end_date as applicationSubscriptions_trialEndDate, application_subscriptions.auto_renew as applicationSubscriptions_autoRenew, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (application_subscriptions.id = {{id}}  AND  application_subscriptions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE application_subscriptions SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "application_subscriptions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO currencies (code, exchange_rate, is_active , created_by, updated_by) VALUES ({{currencies_code}}, {{currencies_exchangeRate}}, {{currencies_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE currencies SET code = {{currencies_code}}, exchange_rate = {{currencies_exchangeRate}}, is_active = {{currencies_isActive}}, created_by = {{currencies_createdBy}}, updated_by = {{currencies_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as currencies_id,id as id, currencies.code as currencies_code, currencies.exchange_rate as currencies_exchangeRate, currencies.is_active as currencies_isActive  FROM currencies WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, currencies.code as currencies_code, currencies.exchange_rate as currencies_exchangeRate, currencies.is_active as currencies_isActive, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (currencies.id = {{id}}  AND  currencies.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE currencies SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "currencies Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO departments (department_name, specific_attributes_array , created_by, updated_by) VALUES ({{departments_departmentName}}, {{departments_specificAttributesArray}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE departments SET department_name = {{departments_departmentName}}, specific_attributes_array = {{departments_specificAttributesArray}}, created_by = {{departments_createdBy}}, updated_by = {{departments_updatedBy}} WHERE department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, department_id as departments_id,department_id as id, departments.department_name as departments_departmentName, departments.specific_attributes_array as departments_specificAttributesArray  FROM departments WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, departments.department_name as departments_departmentName, departments.specific_attributes_array as departments_specificAttributesArray, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (departments.department_id = {{id}}  AND  departments.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE departments SET status = 'inactive' WHERE department_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "departments Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO designations (designation_name, senior_designation_id, specific_attributes_array , created_by, updated_by) VALUES ({{designations_designationName}}, {{designations_seniorDesignationId}}, {{designations_specificAttributesArray}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE designations SET designation_name = {{designations_designationName}}, senior_designation_id = {{designations_seniorDesignationId}}, specific_attributes_array = {{designations_specificAttributesArray}}, created_by = {{designations_createdBy}}, updated_by = {{designations_updatedBy}} WHERE designation_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, designation_id as designations_id,designation_id as id, designations.designation_name as designations_designationName, designations.senior_designation_id as designations_seniorDesignationId, designations.specific_attributes_array as designations_specificAttributesArray  FROM designations WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, designations.designation_name as designations_designationName, designations.senior_designation_id as designations_seniorDesignationId, designations.specific_attributes_array as designations_specificAttributesArray, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (designations.designation_id = {{id}}  AND  designations.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE designations SET status = 'inactive' WHERE designation_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "designations Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO device_otp (user_device_id, otp, otp_failure_count , created_by, updated_by) VALUES ({{deviceOtp_userDeviceId}}, {{deviceOtp_otp}}, {{deviceOtp_otpFailureCount}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE device_otp SET user_device_id = {{deviceOtp_userDeviceId}}, otp = {{deviceOtp_otp}}, otp_failure_count = {{deviceOtp_otpFailureCount}}, created_by = {{deviceOtp_createdBy}}, updated_by = {{deviceOtp_updatedBy}} WHERE device_otp_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, device_otp_id as deviceOtp_id,device_otp_id as id, device_otp.user_device_id as deviceOtp_userDeviceId, device_otp.otp as deviceOtp_otp, device_otp.otp_failure_count as deviceOtp_otpFailureCount  FROM device_otp WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, device_otp.user_device_id as deviceOtp_userDeviceId, device_otp.otp as deviceOtp_otp, device_otp.otp_failure_count as deviceOtp_otpFailureCount, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (device_otp.device_otp_id = {{id}}  AND  device_otp.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE device_otp SET status = 'inactive' WHERE device_otp_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "device_otp Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO discounts (code, description, config_parameters, discount_percentage, usage_info, is_active, expires_at , created_by, updated_by) VALUES ({{discounts_code}}, {{discounts_description}}, {{discounts_configParameters}}, {{discounts_discountPercentage}}, {{discounts_usageInfo}}, {{discounts_isActive}}, {{discounts_expiresAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE discounts SET code = {{discounts_code}}, description = {{discounts_description}}, config_parameters = {{discounts_configParameters}}, discount_percentage = {{discounts_discountPercentage}}, usage_info = {{discounts_usageInfo}}, is_active = {{discounts_isActive}}, expires_at = {{discounts_expiresAt}}, created_by = {{discounts_createdBy}}, updated_by = {{discounts_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as discounts_id,id as id, discounts.code as discounts_code, discounts.description as discounts_description, discounts.config_parameters as discounts_configParameters, discounts.discount_percentage as discounts_discountPercentage, discounts.usage_info as discounts_usageInfo, discounts.is_active as discounts_isActive, discounts.expires_at as discounts_expiresAt  FROM discounts WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, discounts.code as discounts_code, discounts.description as discounts_description, discounts.config_parameters as discounts_configParameters, discounts.discount_percentage as discounts_discountPercentage, discounts.usage_info as discounts_usageInfo, discounts.is_active as discounts_isActive, discounts.expires_at as discounts_expiresAt, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (discounts.id = {{id}}  AND  discounts.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE discounts SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "discounts Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO incoming_audit_logs (request_type, ai_credits_urdd_id, source, request_data, response_data , created_by, updated_by) VALUES ({{incomingAuditLogs_requestType}}, {{incomingAuditLogs_aiCreditsUrddId}}, {{incomingAuditLogs_source}}, {{incomingAuditLogs_requestData}}, {{incomingAuditLogs_responseData}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE incoming_audit_logs SET request_type = {{incomingAuditLogs_requestType}}, ai_credits_urdd_id = {{incomingAuditLogs_aiCreditsUrddId}}, source = {{incomingAuditLogs_source}}, request_data = {{incomingAuditLogs_requestData}}, response_data = {{incomingAuditLogs_responseData}}, created_by = {{incomingAuditLogs_createdBy}}, updated_by = {{incomingAuditLogs_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as incomingAuditLogs_id,id as id, incoming_audit_logs.request_type as incomingAuditLogs_requestType, incoming_audit_logs.ai_credits_urdd_id as incomingAuditLogs_aiCreditsUrddId, incoming_audit_logs.source as incomingAuditLogs_source, incoming_audit_logs.request_data as incomingAuditLogs_requestData, incoming_audit_logs.response_data as incomingAuditLogs_responseData  FROM incoming_audit_logs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, incoming_audit_logs.request_type as incomingAuditLogs_requestType, incoming_audit_logs.ai_credits_urdd_id as incomingAuditLogs_aiCreditsUrddId, incoming_audit_logs.source as incomingAuditLogs_source, incoming_audit_logs.request_data as incomingAuditLogs_requestData, incoming_audit_logs.response_data as incomingAuditLogs_responseData, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (incoming_audit_logs.id = {{id}}  AND  incoming_audit_logs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE incoming_audit_logs SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "incoming_audit_logs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO notifications (notification_title, notification_message, sent_to_user_role_designation_department_id , created_by, updated_by) VALUES ({{notifications_notificationTitle}}, {{notifications_notificationMessage}}, {{notifications_sentToUserRoleDesignationDepartmentId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE notifications SET notification_title = {{notifications_notificationTitle}}, notification_message = {{notifications_notificationMessage}}, sent_to_user_role_designation_department_id = {{notifications_sentToUserRoleDesignationDepartmentId}}, created_by = {{notifications_createdBy}}, updated_by = {{notifications_updatedBy}} WHERE notification_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, notification_id as notifications_id,notification_id as id, notifications.notification_title as notifications_notificationTitle, notifications.notification_message as notifications_notificationMessage, notifications.sent_to_user_role_designation_department_id as notifications_sentToUserRoleDesignationDepartmentId  FROM notifications WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, notifications.notification_title as notifications_notificationTitle, notifications.notification_message as notifications_notificationMessage, notifications.sent_to_user_role_designation_department_id as notifications_sentToUserRoleDesignationDepartmentId, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (notifications.notification_id = {{id}}  AND  notifications.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE notifications SET status = 'inactive' WHERE notification_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "notifications Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO outgoing_audit_logs (request_type, target_system, ai_credits_urdd_id, request_data, response_data, error_message , created_by, updated_by) VALUES ({{outgoingAuditLogs_requestType}}, {{outgoingAuditLogs_targetSystem}}, {{outgoingAuditLogs_aiCreditsUrddId}}, {{outgoingAuditLogs_requestData}}, {{outgoingAuditLogs_responseData}}, {{outgoingAuditLogs_errorMessage}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE outgoing_audit_logs SET request_type = {{outgoingAuditLogs_requestType}}, target_system = {{outgoingAuditLogs_targetSystem}}, ai_credits_urdd_id = {{outgoingAuditLogs_aiCreditsUrddId}}, request_data = {{outgoingAuditLogs_requestData}}, response_data = {{outgoingAuditLogs_responseData}}, error_message = {{outgoingAuditLogs_errorMessage}}, created_by = {{outgoingAuditLogs_createdBy}}, updated_by = {{outgoingAuditLogs_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as outgoingAuditLogs_id,id as id, outgoing_audit_logs.request_type as outgoingAuditLogs_requestType, outgoing_audit_logs.target_system as outgoingAuditLogs_targetSystem, outgoing_audit_logs.ai_credits_urdd_id as outgoingAuditLogs_aiCreditsUrddId, outgoing_audit_logs.request_data as outgoingAuditLogs_requestData, outgoing_audit_logs.response_data as outgoingAuditLogs_responseData, outgoing_audit_logs.error_message as outgoingAuditLogs_errorMessage  FROM outgoing_audit_logs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, outgoing_audit_logs.request_type as outgoingAuditLogs_requestType, outgoing_audit_logs.target_system as outgoingAuditLogs_targetSystem, outgoing_audit_logs.ai_credits_urdd_id as outgoingAuditLogs_aiCreditsUrddId, outgoing_audit_logs.request_data as outgoingAuditLogs_requestData, outgoing_audit_logs.response_data as outgoingAuditLogs_responseData, outgoing_audit_logs.error_message as outgoingAuditLogs_errorMessage, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (outgoing_audit_logs.id = {{id}}  AND  outgoing_audit_logs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE outgoing_audit_logs SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "outgoing_audit_logs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO permissions (permission_name , created_by, updated_by) VALUES ({{permissions_permissionName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE permissions SET permission_name = {{permissions_permissionName}}, created_by = {{permissions_createdBy}}, updated_by = {{permissions_updatedBy}} WHERE permission_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_id as permissions_id,permission_id as id, permissions.permission_name as permissions_permissionName  FROM permissions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, permissions.permission_name as permissions_permissionName, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (permissions.permission_id = {{id}}  AND  permissions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE permissions SET status = 'inactive' WHERE permission_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "permissions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO permission_groups (group_name , created_by, updated_by) VALUES ({{permissionGroups_groupName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE permission_groups SET group_name = {{permissionGroups_groupName}}, created_by = {{permissionGroups_createdBy}}, updated_by = {{permissionGroups_updatedBy}} WHERE permission_group_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_group_id as permissionGroups_id,permission_group_id as id, permission_groups.group_name as permissionGroups_groupName  FROM permission_groups WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, permission_groups.group_name as permissionGroups_groupName, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (permission_groups.permission_group_id = {{id}}  AND  permission_groups.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE permission_groups SET status = 'inactive' WHERE permission_group_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "permission_groups Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO permission_groups_permissions (group_id, permission_id , created_by, updated_by) VALUES ({{permissionGroupsPermissions_groupId}}, {{permissionGroupsPermissions_permissionId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE permission_groups_permissions SET group_id = {{permissionGroupsPermissions_groupId}}, permission_id = {{permissionGroupsPermissions_permissionId}}, created_by = {{permissionGroupsPermissions_createdBy}}, updated_by = {{permissionGroupsPermissions_updatedBy}} WHERE permission_group_permission_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, permission_group_permission_id as permissionGroupsPermissions_id,permission_group_permission_id as id, permission_groups_permissions.group_id as permissionGroupsPermissions_groupId, permission_groups_permissions.permission_id as permissionGroupsPermissions_permissionId  FROM permission_groups_permissions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, permission_groups_permissions.group_id as permissionGroupsPermissions_groupId, permission_groups_permissions.permission_id as permissionGroupsPermissions_permissionId, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (permission_groups_permissions.permission_group_permission_id = {{id}}  AND  permission_groups_permissions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE permission_groups_permissions SET status = 'inactive' WHERE permission_group_permission_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "permission_groups_permissions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plans (name, duration_type, ai_credits_amount, currency_id, services, price, region, is_active, is_public , created_by, updated_by) VALUES ({{plans_name}}, {{plans_durationType}}, {{plans_aiCreditsAmount}}, {{plans_currencyId}}, {{plans_services}}, {{plans_price}}, {{plans_region}}, {{plans_isActive}}, {{plans_isPublic}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plans SET name = {{plans_name}}, duration_type = {{plans_durationType}}, ai_credits_amount = {{plans_aiCreditsAmount}}, currency_id = {{plans_currencyId}}, services = {{plans_services}}, price = {{plans_price}}, region = {{plans_region}}, is_active = {{plans_isActive}}, is_public = {{plans_isPublic}}, created_by = {{plans_createdBy}}, updated_by = {{plans_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as plans_id,id as id, plans.name as plans_name, plans.duration_type as plans_durationType, plans.ai_credits_amount as plans_aiCreditsAmount, plans.currency_id as plans_currencyId, plans.services as plans_services, plans.price as plans_price, plans.region as plans_region, plans.is_active as plans_isActive, plans.is_public as plans_isPublic  FROM plans WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, plans.name as plans_name, plans.duration_type as plans_durationType, plans.ai_credits_amount as plans_aiCreditsAmount, plans.currency_id as plans_currencyId, plans.services as plans_services, plans.price as plans_price, plans.region as plans_region, plans.is_active as plans_isActive, plans.is_public as plans_isPublic, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (plans.id = {{id}}  AND  plans.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plans SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "plans Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO plan_groups (plan_id, permission_group_id , created_by, updated_by) VALUES ({{planGroups_planId}}, {{planGroups_permissionGroupId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE plan_groups SET plan_id = {{planGroups_planId}}, permission_group_id = {{planGroups_permissionGroupId}}, created_by = {{planGroups_createdBy}}, updated_by = {{planGroups_updatedBy}} WHERE plan_group_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, plan_group_id as planGroups_id,plan_group_id as id, plan_groups.plan_id as planGroups_planId, plan_groups.permission_group_id as planGroups_permissionGroupId  FROM plan_groups WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, plan_groups.plan_id as planGroups_planId, plan_groups.permission_group_id as planGroups_permissionGroupId, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (plan_groups.plan_group_id = {{id}}  AND  plan_groups.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE plan_groups SET status = 'inactive' WHERE plan_group_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "plan_groups Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO platforms (platform_name , created_by, updated_by) VALUES ({{platforms_platformName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE platforms SET platform_name = {{platforms_platformName}}, created_by = {{platforms_createdBy}}, updated_by = {{platforms_updatedBy}} WHERE platform_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, platform_id as platforms_id,platform_id as id, platforms.platform_name as platforms_platformName  FROM platforms WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, platforms.platform_name as platforms_platformName, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (platforms.platform_id = {{id}}  AND  platforms.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE platforms SET status = 'inactive' WHERE platform_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "platforms Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO platform_versions (version_id, platform_id, encryption_key , created_by, updated_by) VALUES ({{platformVersions_versionId}}, {{platformVersions_platformId}}, {{platformVersions_encryptionKey}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE platform_versions SET version_id = {{platformVersions_versionId}}, platform_id = {{platformVersions_platformId}}, encryption_key = {{platformVersions_encryptionKey}}, created_by = {{platformVersions_createdBy}}, updated_by = {{platformVersions_updatedBy}} WHERE platform_version_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, platform_version_id as platformVersions_id,platform_version_id as id, platform_versions.version_id as platformVersions_versionId, platform_versions.platform_id as platformVersions_platformId, platform_versions.encryption_key as platformVersions_encryptionKey  FROM platform_versions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, platform_versions.version_id as platformVersions_versionId, platform_versions.platform_id as platformVersions_platformId, platform_versions.encryption_key as platformVersions_encryptionKey, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (platform_versions.platform_version_id = {{id}}  AND  platform_versions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE platform_versions SET status = 'inactive' WHERE platform_version_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "platform_versions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO referrals (referrer_urdd_id, referred_urdd_id, referral_code, reward_credits, completed_at , created_by, updated_by) VALUES ({{referrals_referrerUrddId}}, {{referrals_referredUrddId}}, {{referrals_referralCode}}, {{referrals_rewardCredits}}, {{referrals_completedAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE referrals SET referrer_urdd_id = {{referrals_referrerUrddId}}, referred_urdd_id = {{referrals_referredUrddId}}, referral_code = {{referrals_referralCode}}, reward_credits = {{referrals_rewardCredits}}, completed_at = {{referrals_completedAt}}, created_by = {{referrals_createdBy}}, updated_by = {{referrals_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as referrals_id,id as id, referrals.referrer_urdd_id as referrals_referrerUrddId, referrals.referred_urdd_id as referrals_referredUrddId, referrals.referral_code as referrals_referralCode, referrals.reward_credits as referrals_rewardCredits, referrals.completed_at as referrals_completedAt  FROM referrals WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, referrals.referrer_urdd_id as referrals_referrerUrddId, referrals.referred_urdd_id as referrals_referredUrddId, referrals.referral_code as referrals_referralCode, referrals.reward_credits as referrals_rewardCredits, referrals.completed_at as referrals_completedAt, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (referrals.id = {{id}}  AND  referrals.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE referrals SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "referrals Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO roles (role_name, senior_role_id, specific_attributes_array , created_by, updated_by) VALUES ({{roles_roleName}}, {{roles_seniorRoleId}}, {{roles_specificAttributesArray}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE roles SET role_name = {{roles_roleName}}, senior_role_id = {{roles_seniorRoleId}}, specific_attributes_array = {{roles_specificAttributesArray}}, created_by = {{roles_createdBy}}, updated_by = {{roles_updatedBy}} WHERE role_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, role_id as roles_id,role_id as id, roles.role_name as roles_roleName, roles.senior_role_id as roles_seniorRoleId, roles.specific_attributes_array as roles_specificAttributesArray  FROM roles WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, roles.role_name as roles_roleName, roles.senior_role_id as roles_seniorRoleId, roles.specific_attributes_array as roles_specificAttributesArray, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (roles.role_id = {{id}}  AND  roles.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE roles SET status = 'inactive' WHERE role_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "roles Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_renewal (subscription_id, transaction_id, credits_given, credits_used, renewal_type, logged_at , created_by, updated_by) VALUES ({{subscriptionRenewal_subscriptionId}}, {{subscriptionRenewal_transactionId}}, {{subscriptionRenewal_creditsGiven}}, {{subscriptionRenewal_creditsUsed}}, {{subscriptionRenewal_renewalType}}, {{subscriptionRenewal_loggedAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subscription_renewal SET subscription_id = {{subscriptionRenewal_subscriptionId}}, transaction_id = {{subscriptionRenewal_transactionId}}, credits_given = {{subscriptionRenewal_creditsGiven}}, credits_used = {{subscriptionRenewal_creditsUsed}}, renewal_type = {{subscriptionRenewal_renewalType}}, logged_at = {{subscriptionRenewal_loggedAt}}, created_by = {{subscriptionRenewal_createdBy}}, updated_by = {{subscriptionRenewal_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as subscriptionRenewal_id,id as id, subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId, subscription_renewal.transaction_id as subscriptionRenewal_transactionId, subscription_renewal.credits_given as subscriptionRenewal_creditsGiven, subscription_renewal.credits_used as subscriptionRenewal_creditsUsed, subscription_renewal.renewal_type as subscriptionRenewal_renewalType, subscription_renewal.logged_at as subscriptionRenewal_loggedAt  FROM subscription_renewal WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, subscription_renewal.subscription_id as subscriptionRenewal_subscriptionId, subscription_renewal.transaction_id as subscriptionRenewal_transactionId, subscription_renewal.credits_given as subscriptionRenewal_creditsGiven, subscription_renewal.credits_used as subscriptionRenewal_creditsUsed, subscription_renewal.renewal_type as subscriptionRenewal_renewalType, subscription_renewal.logged_at as subscriptionRenewal_loggedAt, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (subscription_renewal.id = {{id}}  AND  subscription_renewal.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subscription_renewal SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "subscription_renewal Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO subscription_utilization_logs (subscription_renewal_id, amount, usage_type, metadata , created_by, updated_by) VALUES ({{subscriptionUtilizationLogs_subscriptionRenewalId}}, {{subscriptionUtilizationLogs_amount}}, {{subscriptionUtilizationLogs_usageType}}, {{subscriptionUtilizationLogs_metadata}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE subscription_utilization_logs SET subscription_renewal_id = {{subscriptionUtilizationLogs_subscriptionRenewalId}}, amount = {{subscriptionUtilizationLogs_amount}}, usage_type = {{subscriptionUtilizationLogs_usageType}}, metadata = {{subscriptionUtilizationLogs_metadata}}, created_by = {{subscriptionUtilizationLogs_createdBy}}, updated_by = {{subscriptionUtilizationLogs_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as subscriptionUtilizationLogs_id,id as id, subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId, subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount, subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType, subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata  FROM subscription_utilization_logs WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, subscription_utilization_logs.subscription_renewal_id as subscriptionUtilizationLogs_subscriptionRenewalId, subscription_utilization_logs.amount as subscriptionUtilizationLogs_amount, subscription_utilization_logs.usage_type as subscriptionUtilizationLogs_usageType, subscription_utilization_logs.metadata as subscriptionUtilizationLogs_metadata, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (subscription_utilization_logs.id = {{id}}  AND  subscription_utilization_logs.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE subscription_utilization_logs SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "subscription_utilization_logs Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO supported_payment_methods (name, provider_details, discount_id, supported_currencies, is_active , created_by, updated_by) VALUES ({{supportedPaymentMethods_name}}, {{supportedPaymentMethods_providerDetails}}, {{supportedPaymentMethods_discountId}}, {{supportedPaymentMethods_supportedCurrencies}}, {{supportedPaymentMethods_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE supported_payment_methods SET name = {{supportedPaymentMethods_name}}, provider_details = {{supportedPaymentMethods_providerDetails}}, discount_id = {{supportedPaymentMethods_discountId}}, supported_currencies = {{supportedPaymentMethods_supportedCurrencies}}, is_active = {{supportedPaymentMethods_isActive}}, created_by = {{supportedPaymentMethods_createdBy}}, updated_by = {{supportedPaymentMethods_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as supportedPaymentMethods_id,id as id, supported_payment_methods.name as supportedPaymentMethods_name, supported_payment_methods.provider_details as supportedPaymentMethods_providerDetails, supported_payment_methods.discount_id as supportedPaymentMethods_discountId, supported_payment_methods.supported_currencies as supportedPaymentMethods_supportedCurrencies, supported_payment_methods.is_active as supportedPaymentMethods_isActive  FROM supported_payment_methods WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, supported_payment_methods.name as supportedPaymentMethods_name, supported_payment_methods.provider_details as supportedPaymentMethods_providerDetails, supported_payment_methods.discount_id as supportedPaymentMethods_discountId, supported_payment_methods.supported_currencies as supportedPaymentMethods_supportedCurrencies, supported_payment_methods.is_active as supportedPaymentMethods_isActive, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (supported_payment_methods.id = {{id}}  AND  supported_payment_methods.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE supported_payment_methods SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "supported_payment_methods Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO transactions (urdd_id, subscription_id, user_payment_method_id, amount, currency_id, transaction_type, gateway_response, description , created_by, updated_by) VALUES ({{transactions_urddId}}, {{transactions_subscriptionId}}, {{transactions_userPaymentMethodId}}, {{transactions_amount}}, {{transactions_currencyId}}, {{transactions_transactionType}}, {{transactions_gatewayResponse}}, {{transactions_description}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE transactions SET urdd_id = {{transactions_urddId}}, subscription_id = {{transactions_subscriptionId}}, user_payment_method_id = {{transactions_userPaymentMethodId}}, amount = {{transactions_amount}}, currency_id = {{transactions_currencyId}}, transaction_type = {{transactions_transactionType}}, gateway_response = {{transactions_gatewayResponse}}, description = {{transactions_description}}, created_by = {{transactions_createdBy}}, updated_by = {{transactions_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as transactions_id,id as id, transactions.urdd_id as transactions_urddId, transactions.subscription_id as transactions_subscriptionId, transactions.user_payment_method_id as transactions_userPaymentMethodId, transactions.amount as transactions_amount, transactions.currency_id as transactions_currencyId, transactions.transaction_type as transactions_transactionType, transactions.gateway_response as transactions_gatewayResponse, transactions.description as transactions_description  FROM transactions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, transactions.urdd_id as transactions_urddId, transactions.subscription_id as transactions_subscriptionId, transactions.user_payment_method_id as transactions_userPaymentMethodId, transactions.amount as transactions_amount, transactions.currency_id as transactions_currencyId, transactions.transaction_type as transactions_transactionType, transactions.gateway_response as transactions_gatewayResponse, transactions.description as transactions_description, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (transactions.id = {{id}}  AND  transactions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE transactions SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "transactions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_device_notifications (user_device_id, notification_id , created_by, updated_by) VALUES ({{userDeviceNotifications_userDeviceId}}, {{userDeviceNotifications_notificationId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_device_notifications SET user_device_id = {{userDeviceNotifications_userDeviceId}}, notification_id = {{userDeviceNotifications_notificationId}}, created_by = {{userDeviceNotifications_createdBy}}, updated_by = {{userDeviceNotifications_updatedBy}} WHERE user_device_notification_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_device_notification_id as userDeviceNotifications_id,user_device_notification_id as id, user_device_notifications.user_device_id as userDeviceNotifications_userDeviceId, user_device_notifications.notification_id as userDeviceNotifications_notificationId  FROM user_device_notifications WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, user_device_notifications.user_device_id as userDeviceNotifications_userDeviceId, user_device_notifications.notification_id as userDeviceNotifications_notificationId, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (user_device_notifications.user_device_notification_id = {{id}}  AND  user_device_notifications.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE user_device_notifications SET status = 'inactive' WHERE user_device_notification_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "user_device_notifications Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_payment_methods (urdd_id, supported_payment_method_id, payment_details, is_verified, verification_amount, verification_status, verification_transaction_id, is_default, is_active , created_by, updated_by) VALUES ({{userPaymentMethods_urddId}}, {{userPaymentMethods_supportedPaymentMethodId}}, {{userPaymentMethods_paymentDetails}}, {{userPaymentMethods_isVerified}}, {{userPaymentMethods_verificationAmount}}, {{userPaymentMethods_verificationStatus}}, {{userPaymentMethods_verificationTransactionId}}, {{userPaymentMethods_isDefault}}, {{userPaymentMethods_isActive}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_payment_methods SET urdd_id = {{userPaymentMethods_urddId}}, supported_payment_method_id = {{userPaymentMethods_supportedPaymentMethodId}}, payment_details = {{userPaymentMethods_paymentDetails}}, is_verified = {{userPaymentMethods_isVerified}}, verification_amount = {{userPaymentMethods_verificationAmount}}, verification_status = {{userPaymentMethods_verificationStatus}}, verification_transaction_id = {{userPaymentMethods_verificationTransactionId}}, is_default = {{userPaymentMethods_isDefault}}, is_active = {{userPaymentMethods_isActive}}, created_by = {{userPaymentMethods_createdBy}}, updated_by = {{userPaymentMethods_updatedBy}} WHERE id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, id as userPaymentMethods_id,id as id, user_payment_methods.urdd_id as userPaymentMethods_urddId, user_payment_methods.supported_payment_method_id as userPaymentMethods_supportedPaymentMethodId, user_payment_methods.payment_details as userPaymentMethods_paymentDetails, user_payment_methods.is_verified as userPaymentMethods_isVerified, user_payment_methods.verification_amount as userPaymentMethods_verificationAmount, user_payment_methods.verification_status as userPaymentMethods_verificationStatus, user_payment_methods.verification_transaction_id as userPaymentMethods_verificationTransactionId, user_payment_methods.is_default as userPaymentMethods_isDefault, user_payment_methods.is_active as userPaymentMethods_isActive  FROM user_payment_methods WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, user_payment_methods.urdd_id as userPaymentMethods_urddId, user_payment_methods.supported_payment_method_id as userPaymentMethods_supportedPaymentMethodId, user_payment_methods.payment_details as userPaymentMethods_paymentDetails, user_payment_methods.is_verified as userPaymentMethods_isVerified, user_payment_methods.verification_amount as userPaymentMethods_verificationAmount, user_payment_methods.verification_status as userPaymentMethods_verificationStatus, user_payment_methods.verification_transaction_id as userPaymentMethods_verificationTransactionId, user_payment_methods.is_default as userPaymentMethods_isDefault, user_payment_methods.is_active as userPaymentMethods_isActive, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (user_payment_methods.id = {{id}}  AND  user_payment_methods.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE user_payment_methods SET status = 'inactive' WHERE id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "user_payment_methods Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
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
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO versions (version , created_by, updated_by) VALUES ({{versions_version}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE versions SET version = {{versions_version}}, created_by = {{versions_createdBy}}, updated_by = {{versions_updatedBy}} WHERE version_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, version_id as versions_id,version_id as id, versions.version as versions_version  FROM versions WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, application_subscriptions.id as applicationSubscriptions_id, currencies.id as currencies_id, departments.department_id as departments_id, designations.designation_id as designations_id, device_otp.device_otp_id as deviceOtp_id, discounts.id as discounts_id, incoming_audit_logs.id as incomingAuditLogs_id, notifications.notification_id as notifications_id, outgoing_audit_logs.id as outgoingAuditLogs_id, permissions.permission_id as permissions_id, permission_groups.permission_group_id as permissionGroups_id, permission_groups_permissions.permission_group_permission_id as permissionGroupsPermissions_id, plans.id as plans_id, plan_groups.plan_group_id as planGroups_id, platforms.platform_id as platforms_id, platform_versions.platform_version_id as platformVersions_id, referrals.id as referrals_id, roles.role_id as roles_id, subscription_renewal.id as subscriptionRenewal_id, subscription_utilization_logs.id as subscriptionUtilizationLogs_id, supported_payment_methods.id as supportedPaymentMethods_id, transactions.id as transactions_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, user_payment_methods.id as userPaymentMethods_id, versions.version_id as versions_id, user_devices.user_device_id as userDevices_id,
                        roles_designations_department.role_designation_department_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.first_name as  rolesDesignationsDepartment_usersName, application_subscriptions.id as  applicationSubscriptions_id, currencies.id as  currencies_id, departments.department_name as  rolesDesignationsDepartment_departmentsName, designations.designation_name as  rolesDesignationsDepartment_designationsName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, discounts.description as  rolesDesignationsDepartment_discountsName, incoming_audit_logs.id as  incomingAuditLogs_id, notifications.notification_title as  rolesDesignationsDepartment_notificationsName, outgoing_audit_logs.id as  outgoingAuditLogs_id, permissions.permission_name as  rolesDesignationsDepartment_permissionsName, permission_groups.group_name as  rolesDesignationsDepartment_permissionGroupsName, permission_groups_permissions.permission_group_permission_id as  permissionGroupsPermissions_permissionGroupPermissionId, plans.name as  rolesDesignationsDepartment_plansName, plan_groups.plan_group_id as  planGroups_planGroupId, platforms.platform_name as  rolesDesignationsDepartment_platformsName, platform_versions.platform_version_id as  platformVersions_platformVersionId, referrals.id as  referrals_id, roles.role_name as  rolesDesignationsDepartment_rolesName, subscription_renewal.id as  subscriptionRenewal_id, subscription_utilization_logs.id as  subscriptionUtilizationLogs_id, supported_payment_methods.name as  rolesDesignationsDepartment_supportedPaymentMethodsName, transactions.description as  rolesDesignationsDepartment_transactionsName, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, user_payment_methods.id as  userPaymentMethods_id, versions.version_id as  versions_versionId, user_devices.device_name as  rolesDesignationsDepartment_userDevicesName,

                          user_roles_designations_department.user_role_designation_department_id as rolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_roleDesignationDepartmentId, users.user_id as rolesDesignationsDepartment_userId, application_subscriptions.id as rolesDesignationsDepartment_id, currencies.id as rolesDesignationsDepartment_id, departments.department_id as rolesDesignationsDepartment_departmentId, designations.designation_id as rolesDesignationsDepartment_designationId, device_otp.device_otp_id as rolesDesignationsDepartment_deviceOtpId, discounts.id as rolesDesignationsDepartment_id, incoming_audit_logs.id as rolesDesignationsDepartment_id, notifications.notification_id as rolesDesignationsDepartment_notificationId, outgoing_audit_logs.id as rolesDesignationsDepartment_id, permissions.permission_id as rolesDesignationsDepartment_permissionId, permission_groups.permission_group_id as rolesDesignationsDepartment_permissionGroupId, permission_groups_permissions.permission_group_permission_id as rolesDesignationsDepartment_permissionGroupPermissionId, plans.id as rolesDesignationsDepartment_id, plan_groups.plan_group_id as rolesDesignationsDepartment_planGroupId, platforms.platform_id as rolesDesignationsDepartment_platformId, platform_versions.platform_version_id as rolesDesignationsDepartment_platformVersionId, referrals.id as rolesDesignationsDepartment_id, roles.role_id as rolesDesignationsDepartment_roleId, subscription_renewal.id as rolesDesignationsDepartment_id, subscription_utilization_logs.id as rolesDesignationsDepartment_id, supported_payment_methods.id as rolesDesignationsDepartment_id, transactions.id as rolesDesignationsDepartment_id, user_device_notifications.user_device_notification_id as rolesDesignationsDepartment_userDeviceNotificationId, user_payment_methods.id as rolesDesignationsDepartment_id, versions.version_id as rolesDesignationsDepartment_versionId, user_devices.user_device_id as rolesDesignationsDepartment_userDeviceId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  rolesDesignationsDepartment_rolesDesignationsDepartmentName, versions.version as versions_version, 
                        roles_designations_department.designation_id as rolesDesignationsDepartment_designationId, roles_designations_department.role_id as rolesDesignationsDepartment_roleId, roles_designations_department.department_id as rolesDesignationsDepartment_departmentId FROM user_roles_designations_department LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN application_subscriptions ON application_subscriptions.urdd_id = user_roles_designations_department.user_role_designation_department_id AND application_subscriptions.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN discounts ON discounts.id = application_subscriptions.discount_id AND discounts.status !='inactive' LEFT JOIN incoming_audit_logs ON incoming_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND incoming_audit_logs.status !='inactive' LEFT JOIN notifications ON notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id AND notifications.status !='inactive' LEFT JOIN outgoing_audit_logs ON outgoing_audit_logs.ai_credits_urdd_id = user_roles_designations_department.user_role_designation_department_id AND outgoing_audit_logs.status !='inactive' LEFT JOIN permission_groups_permissions ON (permission_groups_permissions.permission_id = permissions.permission_id OR permission_groups_permissions.group_id = permission_groups.permission_group_id) LEFT JOIN plans ON (plans.id = application_subscriptions.plan_id OR plans.currency_id = currencies.id) LEFT JOIN platform_versions ON platform_versions.platform_id = platforms.platform_id AND platform_versions.status !='inactive' LEFT JOIN referrals ON (referrals.referrer_urdd_id = user_roles_designations_department.user_role_designation_department_id OR referrals.referred_urdd_id = user_roles_designations_department.user_role_designation_department_id) LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN subscription_renewal ON subscription_renewal.subscription_id = application_subscriptions.id AND subscription_renewal.status !='inactive' LEFT JOIN subscription_utilization_logs ON subscription_utilization_logs.subscription_renewal_id = subscription_renewal.id AND subscription_utilization_logs.status !='inactive' LEFT JOIN supported_payment_methods ON supported_payment_methods.discount_id = discounts.id AND supported_payment_methods.status !='inactive' LEFT JOIN transactions ON (transactions.urdd_id = user_roles_designations_department.user_role_designation_department_id OR transactions.subscription_id = application_subscriptions.id OR transactions.currency_id = currencies.id OR transactions.id = subscription_renewal.transaction_id) LEFT JOIN user_device_notifications ON user_device_notifications.notification_id = notifications.notification_id AND user_device_notifications.status !='inactive' LEFT JOIN user_payment_methods ON (user_payment_methods.urdd_id = user_roles_designations_department.user_role_designation_department_id OR user_payment_methods.id = application_subscriptions.user_payment_method_id OR user_payment_methods.supported_payment_method_id = supported_payment_methods.id OR user_payment_methods.id = transactions.user_payment_method_id) LEFT JOIN versions ON versions.version_id = platform_versions.version_id AND versions.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) WHERE (versions.version_id = {{id}}  AND  versions.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE versions SET status = 'inactive' WHERE version_id = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "versions Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsUser_roles_designations_department_object}