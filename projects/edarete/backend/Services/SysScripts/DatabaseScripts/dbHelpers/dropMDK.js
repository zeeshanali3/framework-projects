const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
const {projectDB} = require("../../../Integrations/Database/projectDb");
const { executeQuery } = require("../../../Integrations/Database/queryExecution");
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
async function dropMDK () {
  const connection = await projectDB();
  try {
    const tables = await executeQuery("SHOW TABLES", [], connection);
    const tableKey = Object.keys(tables[0])[0];

    const columnExists = async (table, column) => {
      const result = await executeQuery(
        `
        SELECT COUNT(*) AS count
        FROM information_schema.COLUMNS
        WHERE TABLE_NAME = ? AND COLUMN_NAME = ? AND TABLE_SCHEMA = ?`,
        [table, column, process.env.DB_DATABASE],
        connection, 0
      );
      return result[0].count > 0;
    };

    for (const row of tables) {
      const tableName = row[tableKey];

      const columnsToDrop = [
        "status",
        "Updated_by",
        "created_by",
        "created_at",
        "updated_at",
      ];

      for (const column of columnsToDrop) {
        if (await columnExists(tableName, column)) {
          try {
            await executeQuery(
              `ALTER TABLE \`${tableName}\` DROP COLUMN \`${column}\`;`,
              [],
              connection, 0
            );
            logMessage([`✅ Dropped column: ${column} on ${tableName}`]);
          } catch (err) {
            console.error(
              `❌ Error dropping column ${column} on ${tableName}:`,
              err.message
            );
          }
        } else {
          logMessage([`ℹ️ Skipped column: ${column} (does not exist) on ${tableName}`]);
        }
      }
    }

    logMessage(["✅ Done."]);
  } catch (err) {
    console.error("❌ Script failed:", err);
  } 
}

module.exports = dropMDK