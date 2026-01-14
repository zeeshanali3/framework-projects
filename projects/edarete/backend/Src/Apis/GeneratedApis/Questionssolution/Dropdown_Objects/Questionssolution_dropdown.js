global.QuestionssolutionDropdown_object = {
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
                      parameters: null,
                      apiInfo: {
                      
                        preProcessFunction : [],
                        query: {
                          "queryPayload": "SELECT questionssolution.questions_help_guide_id as value, CONCAT_WS(' ', LEFT(questions.description, 10), LEFT(attachments.attachment_name, 10)) AS label FROM questionssolution LEFT JOIN questions ON questionssolution.question_id = questions.question_id LEFT JOIN attachments ON questionssolution.attachment_id = attachments.attachment_id where questionssolution.status!='inactive'",
                        },
                        database: "mainDb",
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: "GET",
                        permission: "dropdown_questionssolution",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "questionssolution retrieved successfully!",
                      errorMessage: "Failed to retrieve questionssolution.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { QuestionssolutionDropdown_object }