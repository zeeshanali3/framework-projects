/* CRUD Objects for table: admins */
      
      const parameters = require('./CRUD_parameters');
      global.CrudAdmins_object = { 
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO admins (admin_type, urdd_id, created_by, updated_by) VALUES ({{admins_adminType}}, {{admins_urddId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE admins SET admin_type = {{admins_adminType}}, urdd_id = {{admins_urddId}} WHERE admin_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, admins.admin_id as admins_id, admins.admin_id as id, admins.admin_id as admins_adminId,admins.admin_type as admins_adminType,admins.urdd_id as admins_urddId,admins.status as admins_status,admins.created_by as admins_createdBy,admins.updated_by as admins_updatedBy,admins.created_at as admins_createdAt,admins.updated_at as admins_updatedAt FROM admins  Where admins.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT admins.admin_id as admins_id, admins.admin_id as id, admins.admin_id as admins_adminId,admins.admin_type as admins_adminType,admins.urdd_id as admins_urddId,admins.status as admins_status,admins.created_by as admins_createdBy,admins.updated_by as admins_updatedBy,admins.created_at as admins_createdAt,admins.updated_at as admins_updatedAt FROM admins  WHERE admin_id = {{id}} OR admin_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE admins SET status = 'inactive' WHERE admin_id = {{id}}"},           
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
                        permission: { Add: "add_admins", View: "view_admins", Update: "update_admins", Delete: "delete_admins", List: "list_admins" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Admins CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Admins.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudAdmins_object}