const features = [
    {
      title: 'Security',
      description: 'Dynamically handles Encryption and Decryption',
      modules: [
        {
          title: 'Two Layer Encryption',
          description: 'Encryption on platform key and/or accessTokens, as well as static key encryption.',
          cardStatus: 'Completed',
          functionalities: [
            {
              title: 'AES Encryption',
              description: 'We used AES (Advanced Encryption Standard) for encryption because it is one of the fastest and most secure encryption methods available.'
            }
          ]
        },
        {
          title: 'Database Encryption',
          description: 'Sensitive data being stored in the database will be encrypted.',
          cardStatus: 'In_Progress',
          functionalities: []
        }
      ]
    },
    {
      title: 'Logs',
      description: 'Logs everything',
      modules: [
        {
          title: 'Activity Logs',
          description: 'Tracks user activities across the platform.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'Email Logs',
          description: 'Keeps records of all emails sent via the platform.',
          cardStatus: 'Planned',
          functionalities: []
        },
        {
          title: 'Crash Logs',
          description: 'Captures details of system crashes for debugging.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'Error Logs',
          description: 'Logs any errors encountered during execution.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'Security Logs',
          description: 'Maintains logs of all security-related events, such as failed authentications.',
          cardStatus: 'Completed',
          functionalities: []
        }
      ]
    },
    {
      title: 'Documentation',
      description: 'Generates resources for developers',
      modules: [
        {
          title: 'POSTMAN Test Requests',
          description: 'Automatically generates test requests on POSTMAN when an API is created.',
          cardStatus: 'Planned',
          functionalities: []
        }
      ]
    },
    {
      title: 'Flexibility',
      description: 'Enhances development ease',
      modules: [
        {
          title: 'Automatic Routes Handling',
          description: 'Automatically handles route mapping for API endpoints.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'Validation of Parameters',
          description: 'Ensures all required parameters are validated dynamically.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'Handling of Request Methods',
          description: 'Dynamically manages request methods for APIs.',
          cardStatus: 'Completed',
          functionalities: []
        }
      ]
    },
    {
      title: 'Authentication',
      description: 'Secures APIs with authentication mechanisms',
      modules: [
        {
          title: 'AccessToken Authentication',
          description: 'Handles verification of accessTokens for secure API access.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'OTP Authentication',
          description: 'Manages OTP verification for secure access.',
          cardStatus: 'Completed',
          functionalities: []
        }
      ]
    },
    {
      title: 'Customisation',
      description: 'Allows users to customise API objects',
      modules: [
        {
          title: 'Callback Functions',
          description: 'Users can create custom functions to handle the entire request after decryption and verification.',
          cardStatus: 'Completed',
          functionalities: []
        },
        {
          title: 'Payload Functions',
          description: 'Users can create custom functions to add specific data to the response payload.',
          cardStatus: 'Completed',
          functionalities: []
        }
      ]
    }
  ];
  