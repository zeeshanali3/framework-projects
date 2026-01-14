const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../Integrations/Database/queryExecution");

async function addPrimaryKeys() {
  const tables = await executeQuery("SHOW TABLES", []);

  logMessage([tables]);
  const tableKey = Object.keys(tables[0])[0]; // dynamic key name e.g. "Tables_in_your_database"

  for (const row of tables) {
    const tableName = row[tableKey];

    // 1. Check if primary key exists
    const primaryKeyCheck = await executeQuery(
      `SHOW KEYS FROM \`${tableName}\` WHERE Key_name = 'PRIMARY'`, 
      []
    );

    if (primaryKeyCheck?.length === 0) {
      // 2. No primary key found, try to make `{tableName}_id` the primary key
      const candidateColumn = `${tableName}_id`;

      const columns = await executeQuery(
        `SHOW COLUMNS FROM \`${tableName}\` LIKE ?`, 
        [candidateColumn]
      );

      if (columns?.length > 0) {
        logMessage([`Adding PRIMARY KEY to ${tableName}.${candidateColumn}`]);

        await executeQuery(`
          ALTER TABLE \`${tableName}\` 
          MODIFY COLUMN \`${candidateColumn}\` INT NOT NULL AUTO_INCREMENT,
          ADD PRIMARY KEY (\`${candidateColumn}\`)
        `, []);
      } else {
        const secondaryColumn = `${tableName.slice(0, -1)}_id`;
        const columns2 = await executeQuery(
          `SHOW COLUMNS FROM \`${tableName}\` LIKE ?`, 
          [secondaryColumn]
        );

        if (columns2?.length > 0) {
          logMessage([`Adding PRIMARY KEY to ${tableName}.${secondaryColumn}`]);

          await executeQuery(`
            ALTER TABLE \`${tableName}\` 
            MODIFY COLUMN \`${secondaryColumn}\` INT NOT NULL AUTO_INCREMENT,
            ADD PRIMARY KEY (\`${secondaryColumn}\`)
          `, []);
        } else {
          console.warn(`⚠️ Table ${tableName} has no primary key and no suitable column found.`);
        }
      }
    } else {
      // 3. Primary key exists, ensure it's AUTO_INCREMENT
      const primaryColumn = primaryKeyCheck[0]?.Column_name;

      const columnInfo = await executeQuery(
        `SHOW COLUMNS FROM \`${tableName}\` LIKE ?`, 
        [primaryColumn]
      );

      if (!columnInfo[0]?.Extra.includes("auto_increment")) {
        logMessage([`Making ${tableName}.${primaryColumn} AUTO_INCREMENT`]);

        await executeQuery(`
          ALTER TABLE \`${tableName}\` 
          MODIFY COLUMN \`${primaryColumn}\` INT NOT NULL AUTO_INCREMENT
        `, []);
      }
    }
  }

  logMessage(["✅ Done."]);
}

module.exports = addPrimaryKeys;
