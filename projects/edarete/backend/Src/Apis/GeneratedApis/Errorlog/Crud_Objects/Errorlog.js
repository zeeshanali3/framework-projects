/* CRUD Objects for table: errorlog */
      
      const parameters = require('./CRUD_parameters');
      global.CrudErrorlog_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO errorlog (error_message, file_name, created_by, updated_by) VALUES ({{errorlog_errorMessage}}, {{errorlog_fileName}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE errorlog SET error_message = {{errorlog_errorMessage}}, file_name = {{errorlog_fileName}} WHERE error_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, errorlog.error_id as errorlog_id, errorlog.error_id as id, errorlog.error_id as errorlog_errorId,errorlog.error_message as errorlog_errorMessage,errorlog.file_name as errorlog_fileName,errorlog.status as errorlog_status,errorlog.created_by as errorlog_createdBy,errorlog.updated_by as errorlog_updatedBy,errorlog.created_at as errorlog_createdAt,errorlog.updated_at as errorlog_updatedAt FROM errorlog  Where errorlog.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT errorlog.error_id as errorlog_id, errorlog.error_id as id, errorlog.error_id as errorlog_errorId,errorlog.error_message as errorlog_errorMessage,errorlog.file_name as errorlog_fileName,errorlog.status as errorlog_status,errorlog.created_by as errorlog_createdBy,errorlog.updated_by as errorlog_updatedBy,errorlog.created_at as errorlog_createdAt,errorlog.updated_at as errorlog_updatedAt FROM errorlog  WHERE error_id = {{id}} OR error_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE errorlog SET status = 'inactive' WHERE error_id = {{id}}"},           
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
                        permission: { Add: "add_errorlog", View: "view_errorlog", Update: "update_errorlog", Delete: "delete_errorlog", List: "list_errorlog" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Errorlog CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Errorlog.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudErrorlog_object}