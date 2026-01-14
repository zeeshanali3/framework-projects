/* CRUD Objects for table: incoming_audit_logs */
      
      const parameters = require('./CRUD_parameters');
      global.CrudIncoming_audit_logs_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO incoming_audit_logs (request_type, ai_credits_urdd_id, source, request_data, response_data, created_by, updated_by) VALUES ({{incomingAuditLogs_requestType}}, {{incomingAuditLogs_aiCreditsUrddId}}, {{incomingAuditLogs_source}}, {{incomingAuditLogs_requestData}}, {{incomingAuditLogs_responseData}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE incoming_audit_logs SET request_type = {{incomingAuditLogs_requestType}}, ai_credits_urdd_id = {{incomingAuditLogs_aiCreditsUrddId}}, source = {{incomingAuditLogs_source}}, request_data = {{incomingAuditLogs_requestData}}, response_data = {{incomingAuditLogs_responseData}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, incoming_audit_logs.id as incomingAuditLogs_id, incoming_audit_logs.id as id, incoming_audit_logs.id as incomingAuditLogs_id,incoming_audit_logs.request_type as incomingAuditLogs_requestType,incoming_audit_logs.ai_credits_urdd_id as incomingAuditLogs_aiCreditsUrddId,incoming_audit_logs.source as incomingAuditLogs_source,incoming_audit_logs.request_data as incomingAuditLogs_requestData,incoming_audit_logs.response_data as incomingAuditLogs_responseData,incoming_audit_logs.created_by as incomingAuditLogs_createdBy,incoming_audit_logs.updated_by as incomingAuditLogs_updatedBy,incoming_audit_logs.status as incomingAuditLogs_status,incoming_audit_logs.created_at as incomingAuditLogs_createdAt,incoming_audit_logs.updated_at as incomingAuditLogs_updatedAt FROM incoming_audit_logs  Where incoming_audit_logs.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT incoming_audit_logs.id as incomingAuditLogs_id, incoming_audit_logs.id as id, incoming_audit_logs.id as incomingAuditLogs_id,incoming_audit_logs.request_type as incomingAuditLogs_requestType,incoming_audit_logs.ai_credits_urdd_id as incomingAuditLogs_aiCreditsUrddId,incoming_audit_logs.source as incomingAuditLogs_source,incoming_audit_logs.request_data as incomingAuditLogs_requestData,incoming_audit_logs.response_data as incomingAuditLogs_responseData,incoming_audit_logs.created_by as incomingAuditLogs_createdBy,incoming_audit_logs.updated_by as incomingAuditLogs_updatedBy,incoming_audit_logs.status as incomingAuditLogs_status,incoming_audit_logs.created_at as incomingAuditLogs_createdAt,incoming_audit_logs.updated_at as incomingAuditLogs_updatedAt FROM incoming_audit_logs  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE incoming_audit_logs SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_incoming_audit_logs", View: "view_incoming_audit_logs", Update: "update_incoming_audit_logs", Delete: "delete_incoming_audit_logs", List: "list_incoming_audit_logs" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Incoming_audit_logs CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Incoming_audit_logs.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudIncoming_audit_logs_object}