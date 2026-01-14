const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const executeQueryWithPagination = require("../../Integrations/Database/executeQueryWithPagination.js");
const { executeQuery } = require("../../Integrations/Database/queryExecution.js");
const getPaginationParams = require("../../SysFunctions/getPaginationParams.js");
const getDateTime = require("../../SysFunctions/getDateTime.js");
const { projectDB } = require("../../Integrations/Database/projectDb.js");
const { securityDB } = require("../../Integrations/Database/securityDB.js")
const dbConnections = {
  securitydb: securityDB,
  projectdb: projectDB,
};
function extractTableAliases(query) {
  const tableAliasMap = {};
  const tableRegex =
    /\b(?:FROM|JOIN)\s+([^\s]+)(?:\s+AS\s+([^\s]+)|\s+([^\s]+))?/gi;
  let match;

  while ((match = tableRegex.exec(query)) !== null) {
    logMessage(["MATCH : ", match])
    const tableName = match[1];
    const alias = (match[2] != 'JOIN' && match[2] != 'ON') ? match[2] || tableName : tableName;
    tableAliasMap[tableName] =
      alias?.toLowerCase() !== "where" ? alias : tableName;
  }
  return tableAliasMap;
}

const objectResolver = async (
  req,
  decryptedPayload,
  apiObject,
  permissionObject
) => {
  const databaseName = getConnectionDbName(
    apiObject.data.apiInfo.query.database
  );
  logMessage(["   DATABASE NAME IN ARRAY OF OBJECTS: ", databaseName], true);
  let connection = await dbConnections[databaseName]();
  try {
    const { page, limit } = getPaginationParams(req);
    const [CreatedAtDate, CreatedAtTime] = getDateTime();
    const [UpdatedAtDate, UpdatedAtTime] = [CreatedAtDate, CreatedAtTime];
    const createdAt = CreatedAtDate + CreatedAtTime;
    const updatedAt = createdAt;

    let { queryPayload } = apiObject.data.apiInfo.query;

    if (typeof queryPayload === "function") {
      queryPayload = await queryPayload(req, decryptedPayload);
    }
    if (!queryPayload) {
      return;
    }
    // logMessage(["Object Resolver || Query Payload: ", queryPayload, typeof queryPayload])

    let paramValues = {};
    let results;
    let completeQuery = queryPayload;
    let fields = apiObject?.data?.parameters?.fields;
    let total_count = 0;


    if (fields != undefined) {
      if (Array.isArray(fields[0])) {
        fields = fields[0];
      }

      for (const field of fields) {
        let source = field.source;
        const name = field.name;
        if (
          source === "req.body" ||
          source === "req.headers" ||
          source == undefined
        ) {
          paramValues[name] = decryptedPayload[name] || paramValues[name];
        } else if (source === "req.query") {
          paramValues[name] = req.query[name] || paramValues[name];
        }
      }
      logMessage(["   OBJECT RESOLVER || PARAM VALUES: ", paramValues], true);
      if (permissionObject) {
        // logMessage([//   "OBJECT RESOLVER || permission object:  ",
        //   permissionObject
        //]);
        const hasWhereClause = /\bWHERE\b/i.test(completeQuery);
        if (!hasWhereClause) {
          completeQuery += " WHERE ( 1=1";
        }

        Object.keys(permissionObject.included).forEach((key) => {
          const values = permissionObject.included[key];
          completeQuery += ` AND ${key} IN (${values?.join(",")})`;
        });

        Object.keys(permissionObject.excluded || {}).forEach((key) => {
          const values = permissionObject.excluded[key];
          completeQuery += ` AND ${key} NOT IN (${values?.join(",")})`;
        });

        if (permissionObject.meta) {
          const values = permissionObject.meta.created_by
          const tableAliases = extractTableAliases(completeQuery);

          let conditions = [];

          Object.values(tableAliases).forEach((alias) => {
            conditions.push(`${alias}.created_by IN (${values})`);
          });

          if (conditions.length > 0) {
            completeQuery += ` AND (${conditions.join(" OR ")})`;
          }
          // logMessage(["OBJECT RESOLVER || conditions: ", conditions]);
        }

      }


      const arrayKey = Object.keys(decryptedPayload).find((key) =>
        Array.isArray(decryptedPayload[key])
      );

      logMessage(["   OBJECT RESOLVER || ARRAY KEY: ", arrayKey], true);
      if (
        decryptedPayload[arrayKey] &&
        typeof decryptedPayload[arrayKey][0] != "object" &&
        decryptedPayload[arrayKey].length > 0
      ) {
        // *Condition 1: Key is an array of values*
        const arrayValues = decryptedPayload[arrayKey];
        results = [];
        if (arrayValues.length == 0)
          throw new Error("Empty Array Of Data Provided");
        for (const value of arrayValues) {
          // Replace the array key with the current value
          paramValues[arrayKey] = value;
          let query = replaceNestedPlaceholders(completeQuery, paramValues);
          // Escape JSON strings in the query to preserve \n characters
          const databaseName = getConnectionDbName(
            apiObject.data.apiInfo.query.database
          );

          if (apiObject.config.features.pagination) {
            const paginatedResult = await executeQueryWithPagination(
              req,

              query,
              "",
              connection,
              page,
              limit,
              apiObject.data.columnMapper
            );
            results.push(paginatedResult);
          } else {
            const queryResult = await executeQuery(
              query,
              "",
              connection,
              false
            );
            results.push(queryResult);
          }
          await connection.release()
          //logMessage(["   Connection status: ", connection?.threadId], true);
        }
      } else {
        // *Condition 2: Key is an array of objects*
        const objectArrayKey = Object.keys(decryptedPayload).find(
          (key) =>
            Array.isArray(decryptedPayload[key]) &&
            typeof decryptedPayload[key][0] === "object"
        );
        if (objectArrayKey) {
          const objectArray = decryptedPayload[objectArrayKey];
          logMessage(["   CHECKING ARRAY OF OBJECTS",
            decryptedPayload[objectArrayKey]], true);
          results = [];

          for (const obj of objectArray) {
            // Treat obj as the decryptedPayload for this iteration

            let currentParamValues = {};
            for (const field of fields) {
              const name = field.name;
              if (obj[name] !== undefined || decryptedPayload[name]) {
                currentParamValues[name] =
                  obj[name] || decryptedPayload[name] || req.query[name] || null;
              } else if (field.source === "req.query") {
                currentParamValues[name] =
                  obj[name] || decryptedPayload[name] || req.query[name] || null;
              }
            }

            const query = replaceNestedPlaceholders(
              completeQuery,
              currentParamValues
            );


            if (apiObject.config.features.pagination) {
              const paginatedResult = await executeQueryWithPagination(
                req,

                query,
                "",
                connection,
                page,
                limit,
                apiObject.data.columnMapper
              );
              results.push(paginatedResult);
            } else {
              const queryResult = await executeQuery(

                query,
                "",
                connection,
                false
              );
              results.push(queryResult);
            }
            await connection.release()
            //logMessage(["   Connection status: ", connection?.threadId], true);
          }
        } else {
          // If no array key, proceed with the normal flow
          completeQuery = replaceNestedPlaceholders(completeQuery, paramValues);
          completeQuery = completeQuery
            .replace(/{{CreatedAtDate}}/g, `${CreatedAtDate}`)
            .replace(/{{CreatedAtTime}}/g, `${CreatedAtTime}`)
            .replace(/{{UpdatedAtDate}}/g, `${UpdatedAtDate}`)
            .replace(/{{UpdatedAtTime}}/g, `${UpdatedAtTime}`)
            .replace(/{{createdAt}}/g, `${createdAt}`)
            .replace(/{{updatedAt}}/g, `${updatedAt}`);

          // Escape JSON strings in the final query to preserve \n characters

        logMessage(["   DATQABASE IN OBJECT",
            apiObject.data.apiInfo.query.database], true);
          completeQuery = completeQuery.replace(/\\n/g, '\\\\n');  // convert \n → \\n
          if (apiObject.config.features.pagination) {
            results = await executeQueryWithPagination(
              req,
              completeQuery,
              "",
              connection,
              page,
              limit,
              apiObject.data.columnMapper
            );
          } else {
            results = await executeQuery(
              completeQuery,
              "",
              connection,
              false
            );
          }
        }
      }
    }
    else {
      logMessage(["   EXECUTING QUERY WITHOUT FIELDS"])
      const databaseName = getConnectionDbName(
        apiObject.data.apiInfo.query.database
      );
      logMessage(["   DATABASE NAME IN NO FIELDS: ", databaseName], true);
      const connection = await dbConnections[databaseName]();
      if (apiObject.config.features.pagination) {
        const paginatedResult = await executeQueryWithPagination(
          req,
          queryPayload,
          "",
          connection,
          page,
          limit,
          apiObject.data.columnMapper
        );
        logMessage(["   PAGINATED RESULT: ", paginatedResult.length], true);
        results = paginatedResult;
      } else {
        logMessage(["   EXECUTING QUERY WITHOUT FIELDS"], true);
        const queryResult = await executeQuery(
          queryPayload,
          "",
          connection,
          false
        );
        results = queryResult;
      }
      connection.release()
      logMessage(["   Connection status: ", connection?.threadId], true);
    }

    const response = {
      results,
      total_count,
    };
    logMessage(["   OBJECT RESOLVER || RESPONSE: ", response.length], true);
    logMessage(["--------------------------------------------------------------------------------------------"], true);
    return response;
  } catch (error) {
    logMessage([error], true)
    throw new
      Error(error.message);
  }
  finally {
    // put this where you would release
    try {
      if (!connection) {
        console.log('NO CONNECTION to release');
      } else {
        console.log('Connection object keys:', Object.keys(connection));
        console.log('threadId?', connection.threadId);
        console.log('has release?', typeof connection.release === 'function');
        console.log('has end?', typeof connection.end === 'function');

        // If it's a plain pool connection:
        if (typeof connection.release === 'function') {
          // ensure transaction finished
          if (connection._transactionActive) {
            console.warn('Transaction flag detected — commit/rollback first');
          }
          connection.release();
          console.log('released (connection.release())', connection.threadId);
        } else if (typeof connection.end === 'function') {
          // direct connection (not pooled)
          await connection.end();
          console.log('ended (connection.end())');
        } else {
          console.warn('Unknown connection shape — set connection = null to avoid reuse');
          connection = null;
        }

        // avoid accidental reuse
        try { connection = null; } catch (e) { }
      }
    } catch (err) {
      console.error('release threw', err && err.message, err);
    }

  }
};
const replaceNestedPlaceholders = (query, params) => {
  return query.replace(/{{(.*?)}}/g, (match, key) => {
    const keys = key.split("."); // Split by dot for nested properties
    let value = params;
    // Navigate through the object based on the keys
    for (const k of keys) {
      if (
        typeof value[k] === "string" &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value[k])
      ) {
        // Split the string to format it into SQL DATETIME
        const [date, time] = value[k].split("T");
        const formattedTime = time.split(".")[0]; // Remove milliseconds
        value[k] = `${date} ${formattedTime}`;
      }

      if (value[k] !== undefined) {
        value = value[k];
      } else {
        return "NULL"; // Replace unresolved placeholders with NULL
      }
    }

    // Format the value, wrapping strings in quotes
    if (typeof value === "string") {
      return `'${value}'`; // Wrap string values in quotes
    } else if (value instanceof Date) {
      // Convert to SQL DATETIME format
      return `'${value.toISOString().split("T")[0]} ${value.toISOString().split("T")[1].split(".")[0]
        }'`;
    }
    return value; // Return other types (like numbers) as they are
  });
};
function getConnectionDbName(databaseName) {
  switch (databaseName) {
    case "securitydb":
      return "securitydb";
    case "mainDb":
      return "projectdb";
    default:
      return "projectdb";
  }
}

module.exports = objectResolver;