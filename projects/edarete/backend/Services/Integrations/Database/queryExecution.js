const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const db = require('./databaseAbstraction');
const { projectDB } = require('./projectDb');

async function executeQuery(query, values, connection, releaseAfter = true) {

  let conn = connection;
  if (!query) {logMessage(["Empty/Null Query Provided"]); return [];}
  try {
    if (!conn) {
      conn = await projectDB();
      releaseAfter = true;
    }
    const convertedSyntax = db.convertQuery(query);
    const { query: convertedQuery, values: convertedValues } = db.convertQueryForPostgres(convertedSyntax, values);
    const result = await db.executeQuery(conn, convertedQuery, convertedValues);
    return result;
  } finally {
    if (releaseAfter && conn) {
      db.releaseConnection(conn);
    }
  }
}

module.exports = { executeQuery };