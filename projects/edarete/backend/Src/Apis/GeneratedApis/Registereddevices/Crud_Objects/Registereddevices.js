/* CRUD Objects for table: registereddevices */
      
      const parameters = require('./CRUD_parameters');
      global.CrudRegistereddevices_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO registereddevices (device_name, device_token, device_type, access_token, token_expiry, device_os, make, created_by, updated_by) VALUES ({{registereddevices_deviceName}}, {{registereddevices_deviceToken}}, {{registereddevices_deviceType}}, {{registereddevices_accessToken}}, {{registereddevices_tokenExpiry}}, {{registereddevices_deviceOs}}, {{registereddevices_make}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE registereddevices SET device_name = {{registereddevices_deviceName}}, device_token = {{registereddevices_deviceToken}}, device_type = {{registereddevices_deviceType}}, access_token = {{registereddevices_accessToken}}, token_expiry = {{registereddevices_tokenExpiry}}, device_os = {{registereddevices_deviceOs}}, make = {{registereddevices_make}} WHERE device_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, registereddevices.device_id as registereddevices_id, registereddevices.device_id as id, registereddevices.device_id as registereddevices_deviceId,registereddevices.device_name as registereddevices_deviceName,registereddevices.device_token as registereddevices_deviceToken,registereddevices.device_type as registereddevices_deviceType,registereddevices.access_token as registereddevices_accessToken,registereddevices.token_expiry as registereddevices_tokenExpiry,registereddevices.device_os as registereddevices_deviceOs,registereddevices.make as registereddevices_make,registereddevices.status as registereddevices_status,registereddevices.created_by as registereddevices_createdBy,registereddevices.updated_by as registereddevices_updatedBy,registereddevices.created_at as registereddevices_createdAt,registereddevices.updated_at as registereddevices_updatedAt FROM registereddevices  Where registereddevices.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT registereddevices.device_id as registereddevices_id, registereddevices.device_id as id, registereddevices.device_id as registereddevices_deviceId,registereddevices.device_name as registereddevices_deviceName,registereddevices.device_token as registereddevices_deviceToken,registereddevices.device_type as registereddevices_deviceType,registereddevices.access_token as registereddevices_accessToken,registereddevices.token_expiry as registereddevices_tokenExpiry,registereddevices.device_os as registereddevices_deviceOs,registereddevices.make as registereddevices_make,registereddevices.status as registereddevices_status,registereddevices.created_by as registereddevices_createdBy,registereddevices.updated_by as registereddevices_updatedBy,registereddevices.created_at as registereddevices_createdAt,registereddevices.updated_at as registereddevices_updatedAt FROM registereddevices  WHERE device_id = {{id}} OR device_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE registereddevices SET status = 'inactive' WHERE device_id = {{id}}"},           
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
                        permission: { Add: "add_registereddevices", View: "view_registereddevices", Update: "update_registereddevices", Delete: "delete_registereddevices", List: "list_registereddevices" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Registereddevices CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Registereddevices.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudRegistereddevices_object}