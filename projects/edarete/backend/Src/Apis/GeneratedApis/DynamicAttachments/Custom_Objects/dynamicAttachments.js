const apiObjectGenerator = require("../../../../HelperFunctions/ApiObjectsGenerator");
const { executeStatisticsQueries } = require("../../../../HelperFunctions/PayloadFunctions/AdminDashboard/getAllAdminDashboardInfo");

global.DynamicAttachments_object = {
    "versions": {
      "versionData": [{
        "*": {
          "steps":[
            {
            "config": {
              "features": {
                "multistep": false,
                "parameters": false,
                "pagination": false,
              },
              "communication": {
                // "encryption": {
                //   "platformEncryption": true,
                // },
                "encryption": false

              },
              "verification" : {
                  "otp" : false,
                  "accessToken" : false
              }
            },
            "data": {
              "parameters": {
                "fields": 
                  [
                    {
                        "name": "actionPerformerURDD",
                        "required": true,
                        "source": "req.body",
                        "dynamicKey": "actionPerformerURDD",
                    },
                    {
                        "name": "dynamicAttachments_tableName",
                        "required": false,
                        "source": "req.body",
                        "dynamicKey": "dynamicAttachments_tableName",
                    },
                    {
                        "name": "dynamicAttachments_primaryKey",
                        "required": false,
                        "source": "req.body",
                        "dynamicKey": "dynamicAttachments_primaryKey",
                    },
                    {
                        "name": "dynamicAttachments_attachmentId",
                        "required": false,
                        "source": "req.body",
                        "dynamicKey": "dynamicAttachments_attachmentId",
                    },
                    {
                        "name": "dynamicAttachments_dynamicAttachmentId",
                        "required": false,
                        "source": "req.body",
                        "dynamicKey": "dynamicAttachments_dynamicAttachmentId",
                    }
                  ]
              },
              "apiInfo": 
                {
                    "preProcessFunction" : [],
                    "query": {
                        "queryNature": "",
                        "queryPayload": {
                            Add: async (req, decryptedPayload) => {
                                return `
                                    INSERT INTO dynamic_attachments (
                                    table_name, 
                                    primary_key, 
                                    attachment_id,
                                    created_by,
                                    ) VALUES (
                                        {{dynamicAttachments_tableName}}, 
                                        {{dynamicAttachments_primaryKey}}, 
                                        {{dynamicAttachments_attachmentId}},
                                        {{actionPerformerURDD}}
                                    )
                                `
                            },
                            
                            Update: async (req, decryptedPayload) => {
                                return `
                                    UPDATE dynamic_attachments SET 
                                    table_name = {{dynamicAttachments_tableName}}, 
                                    primary_key = {{dynamicAttachments_primaryKey}}, 
                                    attachment_id = {{dynamicAttachments_attachmentId}},
                                    status = {{dynamicAttachments_status}},
                                    updated_by = {{actionPerformerURDD}}
                                    WHERE dynamic_attachment_id = {{dynamicAttachments_dynamicAttachmentId}}
                                `
                            },                              
                            List: async(req, decryptedPayload ) => { 
                                return `SELECT dynamic_attachment_id AS dynamicAttachments_dynamicAttachmentId, table_name AS dynamicAttachments_tableName, primary_key AS dynamicAttachments_primaryKey, attachment_id AS dynamicAttachments_attachmentId , COUNT(*) OVER () AS table_count FROM dynamic_attachments`
                            }, 
                            View: async(req, decryptedPayload ) => { 
                                return `SELECT dynamic_attachment_id AS dynamicAttachments_dynamicAttachmentId, table_name AS dynamicAttachments_tableName, primary_key AS dynamicAttachments_primaryKey, attachment_id AS dynamicAttachments_attachmentId , COUNT(*) OVER () AS table_count FROM dynamic_attachments WHERE (table_name = {{dynamicAttachments_tableName}} AND primary_key = {{dynamicAttachments_primaryKey}}) OR (attachment_id = {{dynamicAttachments_attachmentId}})`
                            },
                            Delete: async(req, decryptedPayload ) => { 
                                return `DELETE FROM dynamic_attachments WHERE (table_name = {{dynamicAttachments_tableName}} AND primary_key = {{dynamicAttachments_primaryKey}}) OR (attachment_id = {{dynamicAttachments_attachmentId}})`
                            },
                        },
                        "database" : "projectDB"
                    },
                    "utilityFunctions": {
                        "callbackFunction": null,
                        "payloadFunction": [executeStatisticsQueries],
                        "crudFunction" : "crudApiGenerator"
                    },
                    "postProcessFunction" : null
                }
              ,
              "requestMetaData": {
                "requestMethod": {"List" : "GET", "View" : "GET", "Delete" : "DELETE", "Add" : "POST", "Updated" : "PUT"},
                "permission": null,
                "pagination": {
                  "pageSize": 10
                }
              }
            },
            "response": {
              "successMessage": "Configuration generated successfully!",
              "errorMessage": "There was an error generating the configuration."
            }
            },
            ]
        },
      }]
    }
  }
  module.exports = {DynamicAttachments_object}