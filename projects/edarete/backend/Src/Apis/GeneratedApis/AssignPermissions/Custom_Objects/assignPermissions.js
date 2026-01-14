const { assignPermissionsToUser } = require('../../../../HelperFunctions/PayloadFunctions/AssignPermissions/assignPermissionsToUser');

global.AssignPermissions_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": false,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": {
                                    "platformEncryption": true,
                                    "accessToken":true,
                                },
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "user_id",
                                        "type": "number",
                                        "required": true,
                                        "description": "ID of the user to assign permissions to"
                                    },
                                    {
                                        "name": "permissions",
                                        "type": "object",
                                        "required": true,
                                        "description": "Object containing role names and their permissions"
                                    },
                                    {
                                        "name": "actionPerformerURDD",
                                        "type": "number",
                                        "required": true,
                                        "description": "User role designation department ID of the person performing the action"
                                    }
                                ]
                            },
                            "apiInfo": {
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": "",
                                    "database": "mainDb"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": [assignPermissionsToUser],
                                    "crudFunction": "crudApiGenerator"
                                }
                            },
                            "requestMetaData": {
                                "requestMethod": { "Add": "POST" },
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Permissions assigned successfully!",
                            "errorMessage": "Failed to assign permissions."
                        }
                    }
                ]
            }
        }]
    }
};

module.exports = { AssignPermissions_object }; 