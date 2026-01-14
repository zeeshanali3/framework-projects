const parameters = require('./CRUD_parameters');
        global.GroupedCrudsUser_devices_object = {
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_roles_designations_department (role_designation_department_id, user_id, spec_attributes, start_date, end_date , created_by, updated_by) VALUES ({{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, {{userRolesDesignationsDepartment_userId}}, {{userRolesDesignationsDepartment_specAttributes}}, {{userRolesDesignationsDepartment_startDate}}, {{userRolesDesignationsDepartment_endDate}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_roles_designations_department SET role_designation_department_id = {{userRolesDesignationsDepartment_roleDesignationDepartmentId}}, user_id = {{userRolesDesignationsDepartment_userId}}, spec_attributes = {{userRolesDesignationsDepartment_specAttributes}}, start_date = {{userRolesDesignationsDepartment_startDate}}, end_date = {{userRolesDesignationsDepartment_endDate}}, created_by = {{userRolesDesignationsDepartment_createdBy}}, updated_by = {{userRolesDesignationsDepartment_updatedBy}} WHERE user_role_designation_department_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_role_designation_department_id as userRolesDesignationsDepartment_id,user_role_designation_department_id as id, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate  FROM user_roles_designations_department WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, users.user_id as users_id, device_otp.device_otp_id as deviceOtp_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_devices.user_device_id as userDevices_id, notifications.notification_id as notifications_id,
                        users.user_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, users.username as  users_usersName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  users_designationsName, roles.role_name as  users_rolesName, departments.department_name as  users_departmentsName, user_devices.device_name as  users_userDevicesName, notifications.notification_title as  users_notificationsName,

                          user_roles_designations_department.user_role_designation_department_id as users_userRoleDesignationDepartmentId, users.user_id as users_userId, device_otp.device_otp_id as users_deviceOtpId, user_device_notifications.user_device_notification_id as users_userDeviceNotificationId, roles_designations_department.role_designation_department_id as users_roleDesignationDepartmentId, designations.designation_id as users_designationId, roles.role_id as users_roleId, departments.department_id as users_departmentId, user_devices.user_device_id as users_userDeviceId, notifications.notification_id as users_notificationId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  users_rolesDesignationsDepartmentName, user_roles_designations_department.role_designation_department_id as userRolesDesignationsDepartment_roleDesignationDepartmentId, user_roles_designations_department.user_id as userRolesDesignationsDepartment_userId, user_roles_designations_department.spec_attributes as userRolesDesignationsDepartment_specAttributes, user_roles_designations_department.start_date as userRolesDesignationsDepartment_startDate, user_roles_designations_department.end_date as userRolesDesignationsDepartment_endDate, 
                        users.email as users_email, users.username as users_username, users.first_name as users_firstName, users.last_name as users_lastName, users.phone_no as users_phoneNo, users.password as users_password, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, users.last_login as users_lastLogin FROM user_roles_designations_department LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) LEFT JOIN notifications ON (notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id OR notifications.notification_id = user_device_notifications.notification_id) WHERE (user_roles_designations_department.user_role_designation_department_id = {{id}}  AND  user_roles_designations_department.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO users (email, username, first_name, last_name, phone_no, password, cnic, gender, father_name, image_attachment_id, address, date_of_birth, blood_group, religion, last_login , created_by, updated_by) VALUES ({{users_email}}, {{users_username}}, {{users_firstName}}, {{users_lastName}}, {{users_phoneNo}}, {{users_password}}, {{users_cnic}}, {{users_gender}}, {{users_fatherName}}, {{users_imageAttachmentId}}, {{users_address}}, {{users_dateOfBirth}}, {{users_bloodGroup}}, {{users_religion}}, {{users_lastLogin}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE users SET email = {{users_email}}, username = {{users_username}}, first_name = {{users_firstName}}, last_name = {{users_lastName}}, phone_no = {{users_phoneNo}}, password = {{users_password}}, cnic = {{users_cnic}}, gender = {{users_gender}}, father_name = {{users_fatherName}}, image_attachment_id = {{users_imageAttachmentId}}, address = {{users_address}}, date_of_birth = {{users_dateOfBirth}}, blood_group = {{users_bloodGroup}}, religion = {{users_religion}}, last_login = {{users_lastLogin}}, created_by = {{users_createdBy}}, updated_by = {{users_updatedBy}} WHERE user_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_id as users_id,user_id as id, users.email as users_email, users.username as users_username, users.first_name as users_firstName, users.last_name as users_lastName, users.phone_no as users_phoneNo, users.password as users_password, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, users.last_login as users_lastLogin  FROM users WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, users.user_id as users_id, device_otp.device_otp_id as deviceOtp_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_devices.user_device_id as userDevices_id, notifications.notification_id as notifications_id,
                        users.user_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, users.username as  users_usersName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  users_designationsName, roles.role_name as  users_rolesName, departments.department_name as  users_departmentsName, user_devices.device_name as  users_userDevicesName, notifications.notification_title as  users_notificationsName,

                          user_roles_designations_department.user_role_designation_department_id as users_userRoleDesignationDepartmentId, users.user_id as users_userId, device_otp.device_otp_id as users_deviceOtpId, user_device_notifications.user_device_notification_id as users_userDeviceNotificationId, roles_designations_department.role_designation_department_id as users_roleDesignationDepartmentId, designations.designation_id as users_designationId, roles.role_id as users_roleId, departments.department_id as users_departmentId, user_devices.user_device_id as users_userDeviceId, notifications.notification_id as users_notificationId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  users_rolesDesignationsDepartmentName, users.email as users_email, users.username as users_username, users.first_name as users_firstName, users.last_name as users_lastName, users.phone_no as users_phoneNo, users.password as users_password, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, users.last_login as users_lastLogin, 
                        users.email as users_email, users.username as users_username, users.first_name as users_firstName, users.last_name as users_lastName, users.phone_no as users_phoneNo, users.password as users_password, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, users.last_login as users_lastLogin FROM user_roles_designations_department LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) LEFT JOIN notifications ON (notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id OR notifications.notification_id = user_device_notifications.notification_id) WHERE (users.user_id = {{id}}  AND  users.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO device_otp (user_device_id, otp, otp_failure_count , created_by, updated_by) VALUES ({{deviceOtp_userDeviceId}}, {{deviceOtp_otp}}, {{deviceOtp_otpFailureCount}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE device_otp SET user_device_id = {{deviceOtp_userDeviceId}}, otp = {{deviceOtp_otp}}, otp_failure_count = {{deviceOtp_otpFailureCount}}, created_by = {{deviceOtp_createdBy}}, updated_by = {{deviceOtp_updatedBy}} WHERE device_otp_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, device_otp_id as deviceOtp_id,device_otp_id as id, device_otp.user_device_id as deviceOtp_userDeviceId, device_otp.otp as deviceOtp_otp, device_otp.otp_failure_count as deviceOtp_otpFailureCount  FROM device_otp WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, users.user_id as users_id, device_otp.device_otp_id as deviceOtp_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_devices.user_device_id as userDevices_id, notifications.notification_id as notifications_id,
                        users.user_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, users.username as  users_usersName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  users_designationsName, roles.role_name as  users_rolesName, departments.department_name as  users_departmentsName, user_devices.device_name as  users_userDevicesName, notifications.notification_title as  users_notificationsName,

                          user_roles_designations_department.user_role_designation_department_id as users_userRoleDesignationDepartmentId, users.user_id as users_userId, device_otp.device_otp_id as users_deviceOtpId, user_device_notifications.user_device_notification_id as users_userDeviceNotificationId, roles_designations_department.role_designation_department_id as users_roleDesignationDepartmentId, designations.designation_id as users_designationId, roles.role_id as users_roleId, departments.department_id as users_departmentId, user_devices.user_device_id as users_userDeviceId, notifications.notification_id as users_notificationId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  users_rolesDesignationsDepartmentName, device_otp.user_device_id as deviceOtp_userDeviceId, device_otp.otp as deviceOtp_otp, device_otp.otp_failure_count as deviceOtp_otpFailureCount, 
                        users.email as users_email, users.username as users_username, users.first_name as users_firstName, users.last_name as users_lastName, users.phone_no as users_phoneNo, users.password as users_password, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, users.last_login as users_lastLogin FROM user_roles_designations_department LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) LEFT JOIN notifications ON (notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id OR notifications.notification_id = user_device_notifications.notification_id) WHERE (device_otp.device_otp_id = {{id}}  AND  device_otp.status != 'inactive')
                          
                          
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO user_device_notifications (user_device_id, notification_id , created_by, updated_by) VALUES ({{userDeviceNotifications_userDeviceId}}, {{userDeviceNotifications_notificationId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE user_device_notifications SET user_device_id = {{userDeviceNotifications_userDeviceId}}, notification_id = {{userDeviceNotifications_notificationId}}, created_by = {{userDeviceNotifications_createdBy}}, updated_by = {{userDeviceNotifications_updatedBy}} WHERE user_device_notification_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, user_device_notification_id as userDeviceNotifications_id,user_device_notification_id as id, user_device_notifications.user_device_id as userDeviceNotifications_userDeviceId, user_device_notifications.notification_id as userDeviceNotifications_notificationId  FROM user_device_notifications WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, users.user_id as users_id, device_otp.device_otp_id as deviceOtp_id, user_device_notifications.user_device_notification_id as userDeviceNotifications_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, designations.designation_id as designations_id, roles.role_id as roles_id, departments.department_id as departments_id, user_devices.user_device_id as userDevices_id, notifications.notification_id as notifications_id,
                        users.user_id as id,
                       user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, users.username as  users_usersName, device_otp.device_otp_id as  deviceOtp_deviceOtpId, user_device_notifications.user_device_notification_id as  userDeviceNotifications_userDeviceNotificationId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, designations.designation_name as  users_designationsName, roles.role_name as  users_rolesName, departments.department_name as  users_departmentsName, user_devices.device_name as  users_userDevicesName, notifications.notification_title as  users_notificationsName,

                          user_roles_designations_department.user_role_designation_department_id as users_userRoleDesignationDepartmentId, users.user_id as users_userId, device_otp.device_otp_id as users_deviceOtpId, user_device_notifications.user_device_notification_id as users_userDeviceNotificationId, roles_designations_department.role_designation_department_id as users_roleDesignationDepartmentId, designations.designation_id as users_designationId, roles.role_id as users_roleId, departments.department_id as users_departmentId, user_devices.user_device_id as users_userDeviceId, notifications.notification_id as users_notificationId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  users_rolesDesignationsDepartmentName, user_device_notifications.user_device_id as userDeviceNotifications_userDeviceId, user_device_notifications.notification_id as userDeviceNotifications_notificationId, 
                        users.email as users_email, users.username as users_username, users.first_name as users_firstName, users.last_name as users_lastName, users.phone_no as users_phoneNo, users.password as users_password, users.cnic as users_cnic, users.gender as users_gender, users.father_name as users_fatherName, users.image_attachment_id as users_imageAttachmentId, users.address as users_address, users.date_of_birth as users_dateOfBirth, users.blood_group as users_bloodGroup, users.religion as users_religion, users.last_login as users_lastLogin FROM user_roles_designations_department LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN roles_designations_department ON roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id AND roles_designations_department.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' LEFT JOIN departments ON departments.department_id = roles_designations_department.department_id AND departments.status !='inactive' LEFT JOIN user_devices ON (user_devices.user_id = users.user_id OR user_devices.user_device_id = device_otp.user_device_id OR user_devices.user_device_id = user_device_notifications.user_device_id) LEFT JOIN notifications ON (notifications.sent_to_user_role_designation_department_id = user_roles_designations_department.user_role_designation_department_id OR notifications.notification_id = user_device_notifications.notification_id) WHERE (user_device_notifications.user_device_notification_id = {{id}}  AND  user_device_notifications.status != 'inactive')
                          
                          
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
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsUser_devices_object}