        
global.GetFileUrlS3_object = {
  versions: {
    versionData: [
      {
        "*": {
          steps: [
            {
              config: {
                features: {
                  multistep: false,
                  parameters: false,
                  pagination: false,
                },
                communication: {
                  encryption: false,
                },
                verification: {
                  otp: false,
                  accessToken: false,
                },
                file: {
                  upload: true,
                  download: false,
                  storage: "S3",
                  bucket: "ubs-framework-bucket"
                }
              },
              data: {
                parameters: null,
                apiInfo: false,
                requestMetaData: {
                  requestMethod: "GET",
                  permission: null,
                  pagination: { pageSize: 10 },
                },
              },
              response: {
                successMessage: "task_history retrieved successfully!",
                errorMessage: "Failed to retrieve task_history.",
              },
            }
          ],
        },
      },
    ],
  },
};

module.exports = {GetFileUrlS3_object}