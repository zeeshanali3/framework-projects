const {executeQuery} =  require("./queryExecution");
const getDateTime = require("../../SysFunctions/getDateTime");
const securityDB = require("./securityDB");
const sendResponse = require("../../SysFunctions/response");
const logMessage = require("../../SysFunctions/LogFunctions/consoleLog");

// Enhanced error categorization and user-friendly messages
const errorCategories = {
  'E10': 'Validation Error',
  'E22': 'System Error', 
  'E24': 'Security Error',
  'E31': 'Permission Error',
  'E40': 'Authentication Error',
  'E42': 'Verification Error',
  'E50': 'Resource Not Found',
  'E52': 'Method Not Allowed'
};

// User-friendly error messages with actionable guidance
const userFriendlyMessages = {
  'E10': 'Please check your input and try again',
  'E22': 'A system error occurred. Please try again later',
  'E24': 'Security verification failed. Please try again',
  'E31': 'You do not have permission to perform this action',
  'E40': 'Authentication failed. Please log in again',
  'E42': 'Verification code is incorrect. Please try again',
  'E50': 'The requested resource was not found',
  'E52': 'This operation is not allowed'
};

// Context-specific error messages
const getContextualErrorMessage = (error_source, error_description, SCC) => {
  // Handle specific error sources with meaningful messages
  if (error_source.includes('API Object Resolver')) {
    return 'The requested service is currently unavailable. Please try again later.';
  }
  
  if (error_source.includes('Access Token Validator')) {
    return 'Your session has expired. Please log in again to continue.';
  }
  
  if (error_source.includes('OTP Verification')) {
    return 'The verification code you entered is incorrect. Please check and try again.';
  }
  
  if (error_source.includes('Permission Validator')) {
    return 'You do not have the required permissions to access this feature.';
  }
  
  if (error_source.includes('File Handler')) {
    return 'Unable to process your file. Please check the file format and size, then try again.';
  }
  
  if (error_source.includes('Parameter Validation')) {
    return 'Please check your input and ensure all required fields are filled correctly.';
  }
  
  if (error_source.includes('Object Resolution')) {
    return 'Unable to process your request. Please try again or contact support if the problem persists.';
  }
  
  if (error_source.includes('Encryption')) {
    return 'Security verification failed. Please refresh the page and try again.';
  }
  
  if (error_source.includes('Req Method Resolver')) {
    return 'This operation is not supported. Please use the correct method.';
  }
  
  // Default to SCC-based message if available
  if (SCC && userFriendlyMessages[SCC]) {
    return userFriendlyMessages[SCC];
  }
  
  // Fallback to generic but helpful message
  return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
};

async function LogError(res, statusCode, error_source, error_description, SCC){
   try{
        logMessage(["Error Source: ", error_source]);
        logMessage(["Error Desc: ", error_description]);
        // const connection = await securityDB();
        // const [currentDateString,currentTimeString,currentDateTime] = getDateTime();;
        // const Status="active"
        // const query = "INSERT INTO error_log  (ErrorMessage, fileName, createdAt, updatedAt, status, scc) VALUES (?,?,?,?,?,?)";
        // const values = [error_description, error_source, currentDateTime,currentDateTime, Status, SCC];
        // const results = await executeQuery(query, values, connection);

        // Generate meaningful error message
        const meaningfulMessage = getContextualErrorMessage(error_source, error_description, SCC);
        
        sendResponse(res, statusCode, meaningfulMessage, error_description, SCC, error_source)
    }
    catch(error)
    {
        logMessage([error]);
        // Fallback to original behavior if error occurs in error handling
        sendResponse(res, statusCode, "An Error Occurred:", error_description, SCC, error_source)
    }
}
module.exports = LogError;