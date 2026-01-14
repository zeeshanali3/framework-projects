const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
  const fs = require('fs');
  const path = require('path');
  require('../../../env');

  const directories = [];

  function requireAllJSFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        requireAllJSFiles(fullPath);
      } else if (path.extname(file) === '.js' && file !== 'Sample_requests.js') {
        
        directories.push(fullPath);
        let object = require(fullPath);
        if (!fullPath.endsWith('CRUD_parameters.js') && Object.keys(object).length > 0){
          // logMessage([fullPath.split('\\').at(-3)])
          const key = Object.keys(object)[0]; 
          const cleanedKey = key.replace(/_object$/, ''); 
          const parts = cleanedKey.split(/(?=[A-Z])/); 

          // logMessage([cleanedKey])
          // logMessage([parts]);
          // if (!parts.includes(fullPath.split('\\').at(-3)) && (cleanedKey != fullPath.split('\\').at(-3) )){
          //   throw new Error(`File name ${fullPath} does not match the exported object name ${key}`);
          // }
        }
      }
    });
  }

  module.exports = { requireAllJSFiles };
