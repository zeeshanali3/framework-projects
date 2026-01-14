const parameters = {
    "steps": [
        {
        "title": "Attachments Crud",
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
        }
    ],
};
module.exports = parameters;