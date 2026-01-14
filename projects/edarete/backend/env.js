const logMessage = require("./Services/SysFunctions/LogFunctions/consoleLog.js");
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (process.env.NODE_ENV !== 'production') {
  logMessage(['Environment variables loaded from .env']);
}