const LogError = require("../Integrations/Database/Errorlog");
const middleware_config = require("./config");
const logMessage = require("../SysFunctions/LogFunctions/consoleLog");

const cleanupMemory = (objects) => {
  objects.forEach((obj) => {
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === "object") {
          obj[key] = null;
        }
      });
    }
  });
};



const middlewareHandler = async (req, res, next) => {
  let decryptedPayload = {};
  let queryResolverOutput;
  let payload = {};
  let apiObject = {};
  try {
    logMessage(["=============================="]);
    logMessage(["Middleware Execution Started"]);
    logMessage(["=============================="]);

    for (const stage of middleware_config) {
      logMessage([`Stage: ${stage.stage}`]);

      for (const func of stage.functions) {
        try { 
          logMessage([`------------------------------`]);
          logMessage([`Executing: ${func.name}`]);
          await func(req, res, decryptedPayload, apiObject, payload);
          logMessage([`Finished: ${func.name}`]);
          logMessage([`------------------------------`]);
        } catch (stageError) {
          logMessage([stageError]);
          logMessage([`------------------------------`]);
          throw stageError;
        }
      }
    }

    logMessage(["All Middleware Stages Completed"]);
    logMessage(["=============================="]);

    next?.();
  } catch (error) {
    logMessage([`------------------------------`]);
    logMessage(["Middleware Handler Failed:", error.message]);
    logMessage([`------------------------------`]);
    return;
  } finally {
    try {
      if (decryptedPayload && typeof decryptedPayload === "object") {
        decryptedPayload.queryResolverOutput = null;
        decryptedPayload.request_body = null;
      }

      if (queryResolverOutput && typeof queryResolverOutput === "object") {
        queryResolverOutput.results = null;
        queryResolverOutput = null;
      }

      cleanupMemory([payload, decryptedPayload, apiObject]);

      if (global.gc && process.env.NODE_ENV === "development") {
        global.gc();
      }

      logMessage(["Memory Cleanup Completed"], false, "blue");
      logMessage([`------------------------------`]);
    } catch (cleanupError) {
      logMessage(["Cleanup Error:", cleanupError.message]);
      logMessage([`------------------------------`]);
    }
  }
};

module.exports = { middlewareHandler };