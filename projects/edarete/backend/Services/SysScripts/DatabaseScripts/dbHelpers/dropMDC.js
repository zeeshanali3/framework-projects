const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
const {projectDB} = require("../../../Integrations/Database/projectDb");
const { executeQuery } = require("../../../Integrations/Database/queryExecution");
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function dropMDC () {
  const connection = await projectDB();
  const tables = await executeQuery("SHOW TABLES", [], connection, 0);
  const tableKey = Object.keys(tables[0])[0];

  const constraintExists = async (table, constraint) => {
    const result = await executeQuery(
      `
      SELECT COUNT(*) AS count
      FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND TABLE_SCHEMA = ?`,
      [table, constraint, process.env.DB_DATABASE],
      connection, 0
    );
    return result[0].count > 0;
  };

  const indexExists = async (table, index) => {
    const result = await executeQuery(
      `SHOW INDEX FROM \`${table}\` WHERE Key_name = ?`,
      [index],
      connection, 0
    );
    return result.length > 0;
  };

  for (const row of tables) {
    const tableName = row[tableKey];

    const foreignKeys = [
      `fk_${tableName}_created_by`,
      `fk_${tableName}_updated_by`,
    ];

    const indexes = [
      `fk_${tableName}_created_by`,
      `fk_${tableName}_updated_by`,
    ];

    for (const fk of foreignKeys) {
      if (await constraintExists(tableName, fk)) {
        try {
          await executeQuery(
            `ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${fk}\`;`,
            [],
            connection, 0
          );
          logMessage([`✅ Dropped FK: ${fk} on ${tableName}`]);
        } catch (err) {
          console.error(
            `❌ Error dropping FK ${fk} on ${tableName}:`
          );
        }
      }
    }

    for (const index of indexes) {
      if (await indexExists(tableName, index)) {
        try {
          await executeQuery(
            `ALTER TABLE \`${tableName}\` DROP INDEX \`${index}\`;`,
            [],
            connection, 0
          );
          logMessage([`✅ Dropped INDEX: ${index} on ${tableName}`]);
        } catch (err) {
          console.error(
            `❌ Error dropping INDEX ${index} on ${tableName}:`
          );
        }
      }
    }
  }
  await connection.release()
  logMessage(["✅ Done."]);
}

module.exports = dropMDC
