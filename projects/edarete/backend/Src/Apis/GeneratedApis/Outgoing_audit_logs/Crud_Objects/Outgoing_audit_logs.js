/* CRUD Objects for table: outgoing_audit_logs */
      
      const parameters = require('./CRUD_parameters');
      global.CrudOutgoing_audit_logs_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO outgoing_audit_logs (request_type, target_system, ai_credits_urdd_id, request_data, response_data, error_message, created_by, updated_by) VALUES ({{outgoingAuditLogs_requestType}}, {{outgoingAuditLogs_targetSystem}}, {{outgoingAuditLogs_aiCreditsUrddId}}, {{outgoingAuditLogs_requestData}}, {{outgoingAuditLogs_responseData}}, {{outgoingAuditLogs_errorMessage}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE outgoing_audit_logs SET request_type = {{outgoingAuditLogs_requestType}}, target_system = {{outgoingAuditLogs_targetSystem}}, ai_credits_urdd_id = {{outgoingAuditLogs_aiCreditsUrddId}}, request_data = {{outgoingAuditLogs_requestData}}, response_data = {{outgoingAuditLogs_responseData}}, error_message = {{outgoingAuditLogs_errorMessage}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, outgoing_audit_logs.id as outgoingAuditLogs_id, outgoing_audit_logs.id as id, outgoing_audit_logs.id as outgoingAuditLogs_id,outgoing_audit_logs.request_type as outgoingAuditLogs_requestType,outgoing_audit_logs.target_system as outgoingAuditLogs_targetSystem,outgoing_audit_logs.ai_credits_urdd_id as outgoingAuditLogs_aiCreditsUrddId,outgoing_audit_logs.request_data as outgoingAuditLogs_requestData,outgoing_audit_logs.response_data as outgoingAuditLogs_responseData,outgoing_audit_logs.error_message as outgoingAuditLogs_errorMessage,outgoing_audit_logs.created_by as outgoingAuditLogs_createdBy,outgoing_audit_logs.updated_by as outgoingAuditLogs_updatedBy,outgoing_audit_logs.status as outgoingAuditLogs_status,outgoing_audit_logs.created_at as outgoingAuditLogs_createdAt,outgoing_audit_logs.updated_at as outgoingAuditLogs_updatedAt FROM outgoing_audit_logs  Where outgoing_audit_logs.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT outgoing_audit_logs.id as outgoingAuditLogs_id, outgoing_audit_logs.id as id, outgoing_audit_logs.id as outgoingAuditLogs_id,outgoing_audit_logs.request_type as outgoingAuditLogs_requestType,outgoing_audit_logs.target_system as outgoingAuditLogs_targetSystem,outgoing_audit_logs.ai_credits_urdd_id as outgoingAuditLogs_aiCreditsUrddId,outgoing_audit_logs.request_data as outgoingAuditLogs_requestData,outgoing_audit_logs.response_data as outgoingAuditLogs_responseData,outgoing_audit_logs.error_message as outgoingAuditLogs_errorMessage,outgoing_audit_logs.created_by as outgoingAuditLogs_createdBy,outgoing_audit_logs.updated_by as outgoingAuditLogs_updatedBy,outgoing_audit_logs.status as outgoingAuditLogs_status,outgoing_audit_logs.created_at as outgoingAuditLogs_createdAt,outgoing_audit_logs.updated_at as outgoingAuditLogs_updatedAt FROM outgoing_audit_logs  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE outgoing_audit_logs SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_outgoing_audit_logs", View: "view_outgoing_audit_logs", Update: "update_outgoing_audit_logs", Delete: "delete_outgoing_audit_logs", List: "list_outgoing_audit_logs" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Outgoing_audit_logs CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Outgoing_audit_logs.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudOutgoing_audit_logs_object}