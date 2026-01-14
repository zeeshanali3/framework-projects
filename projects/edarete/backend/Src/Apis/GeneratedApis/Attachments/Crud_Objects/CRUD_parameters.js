const parameters = {
              "steps": [
                  {
                  "title": "Attachments Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "attachments",
                          "type": "section",
                          "title": "Attachments CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Attachments",
                          "childFields": [
                                {
                                  "name": "attachments_id",
                                  "label": "id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": true,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.query",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "attachments_id"
                                },
                               {
                                  "name": "actionPerformerURDD",
                                  "label": "actionPerformerURDD",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "actionPerformerURDD",
                                  "alias" : "actionPerformerURDD",
                                },
                              
                                  {
                                  "name": "attachment_name",
                                  "label": "Attachment Name",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "attachments_attachmentName",
                                  "alias" : "attachments.attachment_name",
                                  },
                                  {
                                  "name": "attachment_type",
                                  "label": "Attachment Type",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "attachments_attachmentType",
                                  "alias" : "attachments.attachment_type",
                                  },
                                  {
                                  "name": "attachment_size",
                                  "label": "Attachment Size",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "attachments_attachmentSize",
                                  "alias" : "attachments.attachment_size",
                                  },
                                  {
                                  "name": "attachment_link",
                                  "label": "Attachment Link",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "attachments_attachmentLink",
                                  "alias" : "attachments.attachment_link",
                                  },
                                  
                          ]
                      }
                      ]
                  },
                  "buttons": [
                      {
                      "type": "submit",
                      "label": "Submit"
                      }
                  ]
                  }
              ],
              "colMapper": "{ 'attachments_attachmentId' : 'attachment_id',  'attachments_attachmentName' : 'attachment_name',  'attachments_attachmentType' : 'attachment_type',  'attachments_attachmentSize' : 'attachment_size',  'attachments_attachmentLink' : 'attachment_link',  'attachments_createdBy' : 'created_by',  'attachments_updatedBy' : 'updated_by',  'attachments_status' : 'status',  'attachments_createdAt' : 'created_at',  'attachments_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;