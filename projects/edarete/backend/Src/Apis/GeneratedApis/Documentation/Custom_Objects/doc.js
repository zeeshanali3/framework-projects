
const payload = require("../../../../../Services/SysScripts/ServerScripts/ApiScripts/doc")

global.Documentation_object = {
  versions: {
    versionData: [
      {
        "*": {
          steps: [
            {
              config: {
                features: {
                  multistep: true,
                  parameters: true,
                  pagination: false,
                },
                communication: {
                  // "encryption":false
                  encryption: {
                    platformEncryption: true,
                    accessToken: true
                  },
                },
                verification: {
                  otp: false,
                  accessToken: false,
                },
              },
              data: {
                parameters: {
                  fields: [],
                },
                apiInfo: {
                  preProcessFunction: [],
                  query: {
                    queryNature: "",
                    queryPayload: async (req, decryptedPayload) => {
                      return null;
                    },
                    database: "ubs_db",
                  },
                  utilityFunctions: {
                    callbackFunction: null,
                    payloadFunction: [payload],
                  },
                },
                requestMetaData: {
                  requestMethod: "GET",
                  permission: null,
                  pagination: {
                    pageSize: 10,
                  },
                },
              },
              response: {
                successMessage: "Documentation generated successfully!",
                errorMessage:
                  "There was an error generating the configuration.",
              },
            },
          ],
        },
      },
    ],
  },
};
  module.exports = {Documentation_object}