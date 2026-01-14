
const genJSONAttributes = (req, decryptedPayload) => {
    const parseSafe = (str) => {
        try {
            return JSON.parse(str.replace(/(\w+):/g, '"$1":')); // Convert JS-style to valid JSON
        } catch (err) {
            console.warn("Failed to parse attributes:", err);
            return [];
        }
    };

    const r_attributes = parseSafe(decryptedPayload["objectResolverOutput"][0].r_attributes || '[]');
    const d_attributes = parseSafe(decryptedPayload["objectResolverOutput"][0].d_attributes || '[]');
    const de_attributes = parseSafe(decryptedPayload["objectResolverOutput"][0].de_attributes || '[]');

    const combinedAttributes = [...r_attributes, ...d_attributes, ...de_attributes];

    // Remove duplicates based on 'label'
    const uniqueAttributes = combinedAttributes.filter(
        (attr, index, self) => index === self.findIndex(a => a.label === attr.label)
    );

    console.log("Unique Attributes:", uniqueAttributes);

    return { specific_attributes_array: uniqueAttributes };
};

global.SpecAttributesUrdd_object = {
  versions: {
    versionData: [
      {
        "*": {
          steps: [
            {
              platform :[
                {
                  supported: ["*"],
                  config: {
                    features: {
                      multistep: false,
                      parameters: true,
                      pagination: false,
                    },
                    communication: {
                      // encryption: {
                      //   platformEncryption: true,
                      // },
                      encryption: false
                    },
                    verification: {
                      otp: false,
                      accessToken: false,
                    },
                  },
                }
              ],
              data: {
                parameters: {
                  fields: [
                    {
                        name: "actionPerformerURDD",
                        validations: [],
                        required: true,
                        source: "req.body",
                    }
                  ],
                },
                apiInfo: {
                  preProcessFunction: [],
                  query: {
                    queryNature: "",
                    queryPayload: async (req, decryptedPayload) => {
                        console.log("Decrypted Payload in specAttributes.js:", decryptedPayload);
                        return `SELECT
                            r.specific_attributes_array as r_attributes, d.specific_attributes_array as d_attributes, de.specific_attributes_array as de_attributes
                            FROM user_roles_designations_department urdd
                            JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
                            JOIN roles r ON rdd.role_id = r.role_id
                            JOIN designations d ON rdd.designation_id = d.designation_id
                            JOIN departments de ON rdd.department_id = de.department_id
                            WHERE urdd.user_role_designation_department_id = {{actionPerformerURDD}}`;
                    },
                    database: "ai_credits",
                  },
                  postProcessFunction: genJSONAttributes,
                  utilityFunctions: {
                    callbackFunction: null,
                    payloadFunction: [],
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
  module.exports = {SpecAttributesUrdd_object}