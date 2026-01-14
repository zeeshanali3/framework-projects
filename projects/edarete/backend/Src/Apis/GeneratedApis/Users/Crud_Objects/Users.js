/* CRUD Objects for table: users */
      
      const parameters = require('./CRUD_parameters');
      global.CrudUsers_object = {
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
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO users (email, username, first_name, last_name, phone_no, password, cnic, gender, father_name, image_attachment_id, address, date_of_birth, blood_group, religion, last_login, created_by, updated_by) VALUES ({{users_email}}, {{users_username}}, {{users_firstName}}, {{users_lastName}}, {{users_phoneNo}}, {{users_password}}, {{users_cnic}}, {{users_gender}}, {{users_fatherName}}, {{users_imageAttachmentId}}, {{users_address}}, {{users_dateOfBirth}}, {{users_bloodGroup}}, {{users_religion}}, {{users_lastLogin}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE users SET email = {{users_email}}, username = {{users_username}}, first_name = {{users_firstName}}, last_name = {{users_lastName}}, phone_no = {{users_phoneNo}}, password = {{users_password}}, cnic = {{users_cnic}}, gender = {{users_gender}}, father_name = {{users_fatherName}}, image_attachment_id = {{users_imageAttachmentId}}, address = {{users_address}}, date_of_birth = {{users_dateOfBirth}}, blood_group = {{users_bloodGroup}}, religion = {{users_religion}}, last_login = {{users_lastLogin}} WHERE user_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, users.user_id as users_id, users.user_id as id, users.user_id as users_userId,users.email as users_email,users.username as users_username,users.first_name as users_firstName,users.last_name as users_lastName,users.phone_no as users_phoneNo,users.password as users_password,users.cnic as users_cnic,users.gender as users_gender,users.father_name as users_fatherName,users.image_attachment_id as users_imageAttachmentId,users.address as users_address,users.date_of_birth as users_dateOfBirth,users.blood_group as users_bloodGroup,users.religion as users_religion,users.last_login as users_lastLogin,users.status as users_status,users.created_by as users_createdBy,users.updated_by as users_updatedBy,users.created_at as users_createdAt,users.updated_at as users_updatedAt FROM users  Where users.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT users.user_id as users_id, users.user_id as id, users.user_id as users_userId,users.email as users_email,users.username as users_username,users.first_name as users_firstName,users.last_name as users_lastName,users.phone_no as users_phoneNo,users.password as users_password,users.cnic as users_cnic,users.gender as users_gender,users.father_name as users_fatherName,users.image_attachment_id as users_imageAttachmentId,users.address as users_address,users.date_of_birth as users_dateOfBirth,users.blood_group as users_bloodGroup,users.religion as users_religion,users.last_login as users_lastLogin,users.status as users_status,users.created_by as users_createdBy,users.updated_by as users_updatedBy,users.created_at as users_createdAt,users.updated_at as users_updatedAt FROM users  WHERE user_id = {{id}} OR user_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE users SET status = 'inactive' WHERE user_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_users", View: "view_users", Update: "update_users", Delete: "delete_users", List: "list_users" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Users CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Users.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudUsers_object}