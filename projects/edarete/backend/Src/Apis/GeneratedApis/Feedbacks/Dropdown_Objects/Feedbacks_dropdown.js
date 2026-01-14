global.FeedbacksDropdown_object = {
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
                          "queryPayload": "SELECT feedbacks.feedback_id as value, CONCAT_WS(' ', LEFT(enrollements.group_name, 10)) AS label FROM feedbacks LEFT JOIN enrollements ON feedbacks.enrollement_id = enrollements.enrollement_id LEFT JOIN feedbackquestions ON feedbacks.feedback_question_id = feedbackquestions.questions_id where feedbacks.status!='inactive'",
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
                        permission: "dropdown_feedbacks",
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "feedbacks retrieved successfully!",
                      errorMessage: "Failed to retrieve feedbacks.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { FeedbacksDropdown_object }