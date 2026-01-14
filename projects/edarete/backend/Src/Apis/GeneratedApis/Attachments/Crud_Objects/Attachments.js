/* CRUD Objects for table: attachments */
      
      const parameters = require('./CRUD_parameters');
      global.CrudAttachments_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO attachments (attachment_name, attachment_type, attachment_size, attachment_link, created_by, updated_by) VALUES ({{attachments_attachmentName}}, {{attachments_attachmentType}}, {{attachments_attachmentSize}}, {{attachments_attachmentLink}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE attachments SET attachment_name = {{attachments_attachmentName}}, attachment_type = {{attachments_attachmentType}}, attachment_size = {{attachments_attachmentSize}}, attachment_link = {{attachments_attachmentLink}} WHERE attachment_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, attachments.attachment_id as attachments_id, attachments.attachment_id as id, attachments.attachment_id as attachments_attachmentId,attachments.attachment_name as attachments_attachmentName,attachments.attachment_type as attachments_attachmentType,attachments.attachment_size as attachments_attachmentSize,attachments.attachment_link as attachments_attachmentLink,attachments.created_by as attachments_createdBy,attachments.updated_by as attachments_updatedBy,attachments.status as attachments_status,attachments.created_at as attachments_createdAt,attachments.updated_at as attachments_updatedAt FROM attachments  Where attachments.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT attachments.attachment_id as attachments_id, attachments.attachment_id as id, attachments.attachment_id as attachments_attachmentId,attachments.attachment_name as attachments_attachmentName,attachments.attachment_type as attachments_attachmentType,attachments.attachment_size as attachments_attachmentSize,attachments.attachment_link as attachments_attachmentLink,attachments.created_by as attachments_createdBy,attachments.updated_by as attachments_updatedBy,attachments.status as attachments_status,attachments.created_at as attachments_createdAt,attachments.updated_at as attachments_updatedAt FROM attachments  WHERE attachment_id = {{id}} OR attachment_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE attachments SET status = 'inactive' WHERE attachment_id = {{id}}"},           
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
                        permission: { Add: "add_attachments", View: "view_attachments", Update: "update_attachments", Delete: "delete_attachments", List: "list_attachments" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Attachments CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Attachments.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudAttachments_object}