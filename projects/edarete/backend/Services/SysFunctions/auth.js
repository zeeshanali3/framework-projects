const logMessage = require("./LogFunctions/consoleLog.js");
const jwt = require('jsonwebtoken');
const ifExpire = require('./expireToken');
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env') });
const path = require('path')

function verifyToken( token) {
  let decoded; 
  const verifyOptions = { ignoreExpiration: true };
  logMessage([process.env.SECRET_KEY])
  logMessage([path.resolve(process.cwd(), '.env' )])
  decoded = jwt.verify(token,process.env.SECRET_KEY, verifyOptions);
  if (!ifExpire(decoded)) {
    return decoded; // Return the entire decoded token object
  }
  else{

    return false;
  }

}
module.exports = verifyToken;
 