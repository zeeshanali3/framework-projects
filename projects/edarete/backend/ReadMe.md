# API Middleware Architecture

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [API Object Configuration](#api-object-configuration)
- [CRUD Object Structure](#crud-object-structure)
- [Middleware Components](#middleware-components)
- [Customization](#customization)
- [Ease of Use](#ease-of-use)
- [Security](#security)
- [5-Minute Setup](#5-minute-setup)
- [Usage](#usage)
- [Installation](#installation)
- [License](#license)

## Overview

The goal of this architecture is to simplify server and API development by leveraging a central configuration for each API object and dynamically resolving components in middleware. This design provides a highly configurable and reusable structure that minimizes redundant code while automating key tasks such as authentication, parameter validation, and permission handling.

### Key Objectives:
- Automate authorization checks, parameter validation, and other common API tasks.
- Minimize redundant code through modular functionality like token validation and permission checking.
- Allow developers to focus on business logic rather than boilerplate setup.

## Features

- **Authorization and Token Validation**: Easily manage API access with configurable token-based authorization.
- **Parameter Validation**: Ensure API inputs meet predefined requirements before processing.
- **Modular Handlers**: Load and execute handlers dynamically from predefined directories.
- **OTP and Email Handling**: Includes support for sending and verifying OTPs as well as email notifications.
- **Middleware-Based Architecture**: API configurations are resolved in middleware, simplifying API logic.
- **Encryption and Multi-Step Processing**: Configure APIs with encryption and multi-step workflows.
- **Custom Query Handling**: Dynamically manage query types for CRUD operations.
- **Role-Based Permission Management**: Define permissions for each API endpoint to control access.

## API Object Configuration

Each API is represented as an object with various configurable options. Below is an example configuration:

```js
{
  authorization: {
    accessToken: false,
  },
  multistep: true,
  encryption: true,
  parameters: true,
  validation: true,
  sendOTP: true,
  verifyOTP: false,
  querying: true,
  sendEmail: true,
  callBackFunction: true,
  pagination: false,
}
```

### Key Config Options:
- **authorization**: Controls access token validation.
- **multistep**: Enables multi-step processing for complex workflows. 
- **encryption**: Enables data encryption.
- **parameters**: Toggles parameter validation middleware.
- **validation**: Enables request data validation.
- **sendOTP**: Handles OTP generation and sending.
- **verifyOTP**: Manages OTP verification.
- **querying**: Enables database querying capabilities.
- **sendEmail**: Sends emails as part of the API process.
- **callBackFunction**: Executes callback functions for API customization.
- **pagination**: Enables pagination in API responses.

## CRUD Object Structure

The system supports a structured CRUD object for defining API behavior. Below is an example CRUD object for handling "[ table ]":

```js
const parameters = require('./CRUD_parameters');
global.Crud[ table ]_object = {
  versions: {
    versionData: [
      {
        "=1.0": {
          steps: [
            {
              config: {
                features: {
                  multistep: false,
                  parameters: true,
                  pagination: true,
                },
                communication: {
                  encryption: {
                    platformEncryption: true,
                  },
                },
                verification: {
                  otp: false,
                  accessToken: false,
                },
              },
              data: {
                parameters: parameters,
                apiInfo: {
                  query: {
                    queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                    queryPayload: {
                      Add: "INSERT INTO [ table ] (...) VALUES (...)",
                      Update: "UPDATE [ table ] SET ... WHERE attachment_id = {{id}}",
                      List: "SELECT ... FROM [ table ]",
                      View: "SELECT ... FROM [ table ] WHERE attachment_id = {{id}}",
                      Delete: "UPDATE [ table ] SET status = 'inactive' WHERE attachment_id = {{id}}",
                    },
                    database: "mainDb",
                  },
                },
                requestMetaData: {
                  requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                  permission: { Add: "insert_[ table ]", View: "view_[ table ]", List: "list_[ table ]", Update: "update_[ table ]", Delete: "delete_[ table ]" },
                  pagination: { pageSize: 10 },
                },
              },
              response: {
                successMessage: "[ table ] retrieved successfully!",
                errorMessage: "Failed to retrieve [ table ].",
              },
            },
          ],
        },
      },
    ],
  },
};
```

## Middleware Components

### Handlers:
1. **sendResponse**: Standardizes API responses.
2. **validateToken**: Validates access tokens.
3. **permissionChecker**: Checks user permissions.
4. **loadHandlerFromDirectory**: Dynamically loads API handlers.
5. **objectResolver**: Resolves API configurations dynamically.
6. **validateParametersMiddleware**: Ensures API request parameters are valid.

## Customization

This architecture is designed to be highly customizable:
- **Modify Configurations**: Easily enable/disable API features.
- **Extend Middleware**: Add custom middleware for specific needs.
- **Modify CRUD Queries**: Adapt database interactions to your requirements.

## Ease of Use

- **Minimal setup required** to get started.
- **Pre-configured handlers** for common tasks.
- **Automatic API resolution** based on configurations.

## Security

- **Two-Layer Encryption**: Supports platform-level and request-specific encryption.
- **Role-Based Access Control**: Defines permissions per endpoint.
- **Token-Based Authentication**: Ensures secure API interactions.

## 5-Minute Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure database connection** in `.env` file.
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Your API is now live and ready to use!**

## Usage

- Define API object configurations.
- Middleware handles:
  - Token validation
  - Permission checks
  - Parameter validation
  - Query processing
  - Response handling
- Handlers execute API logic dynamically.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## License

MIT License.

