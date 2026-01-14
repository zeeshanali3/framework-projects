
global.Crud_Template = {
    versions: {
        versionData: [
            {
                "*": {
                    steps: [
                        {
                            platform:
                                [
                                    {
                                        platformIP: ['*'],
                                        supported: ['*'],
                                        config: {
                                            features: {
                                                multistep: false,
                                                parameters: true,
                                                pagination: true,
                                            },
                                            communication: {
                                                encryption: false,
                                            },
                                            verification: {
                                                otp: false,
                                                accessToken: false,
                                            }
                                        }
                                    }
                                ],
                            data: {
                                parameters: [],
                                apiInfo: {

                                    query: {
                                        preProcessFunction: [],
                                        queryPayload: {
                                            Add: async (req, decryptedPayload) => { return null },
                                            Update: async (req, decryptedPayload) => { return null },
                                            List: async (req, decryptedPayload) => { return null },
                                            View: async (req, decryptedPayload) => { return null },
                                            Delete: async (req, decryptedPayload) => { return null },
                                            database: "mainDb"
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
                                    permission: null,
                                    providedPermissions: false,
                                    pagination: { pageSize: 10 },
                                },
                            },
                            response: {
                                successMessage: "API Hit Successfully",
                                errorMessage: "Unable To Process Your Request",
                            },
                        },
                    ],
                },
            },
        ],
    },
};