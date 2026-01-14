const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
  
const {projectDB} = require("../../../Integrations/Database/projectDb");
const { executeQuery } = require("../../../Integrations/Database/queryExecution");

async function enforceUniqueNameKeys() {
  const db = await projectDB(); // get single connection/pool once
  try {
    const tables = await executeQuery("SHOW TABLES", [], db, 0);
    const tableKey = Object.keys(tables[0])[0]; // e.g. "Tables_in_your_database"

    for (const row of tables) {
      const tableName = row[tableKey];

      const nameKeyCheck = await executeQuery(
        `SHOW KEYS FROM \`${tableName}\` WHERE Column_name LIKE '%\\_name'`,
        [],
        db, 0
      );

      for (const keyInfo of nameKeyCheck) {
        const keyName = keyInfo.Key_name;
        const columnName = keyInfo.Column_name;

        // Skip if already unique
        if (keyInfo.Non_unique === 0) {
          logMessage([`✔️  ${tableName}.${keyName} is already unique.`]);
          continue;
        }

        // Drop and re-add as unique
        logMessage([`🔧 Updating ${tableName}.${keyName} to UNIQUE...`]);
        await executeQuery(
          `ALTER TABLE \`${tableName}\` DROP INDEX \`${keyName}\`, ADD UNIQUE KEY \`${keyName}\` (\`${columnName}\`)`,
          [],
          db, 0
        );
        logMessage([`✅ Updated ${tableName}.${keyName} to UNIQUE.`]);
      }
    }

    logMessage(["✅ All applicable keys updated to UNIQUE."]);
  } finally {
    await db.release();
  }
}

module.exports = enforceUniqueNameKeys;

// Allow standalone execution
if (require.main === module) {
  enforceUniqueNameKeys()
    .then(() => logMessage(["🎉 Done"]))
    .catch(err => console.error("❌ Error:", err));
}
