const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../Integrations/Database/queryExecution");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function addMDK() {
  try {
    const tables = await executeQuery("SHOW TABLES", []);
    const tableKey = Object.keys(tables[0])[0];

    const columnExists = async (table, column) => {
      const result = await executeQuery(
        `
        SELECT COUNT(*) AS count
        FROM information_schema.COLUMNS
        WHERE TABLE_NAME = ? AND COLUMN_NAME = ? AND TABLE_SCHEMA = ?`,
        [table, column, process.env.DB_DATABASE]
      );
      return result[0].count > 0;
    };

    const constraintExists = async (table, constraint) => {
      const result = await executeQuery(
        `
        SELECT COUNT(*) AS count
        FROM information_schema.TABLE_CONSTRAINTS
        WHERE TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND TABLE_SCHEMA = ?`,
        [table, constraint, process.env.DB_DATABASE]
      );
      return result[0].count > 0;
    };

    for (const row of tables) {
      const tableName = row[tableKey];

      const columnDefs = [
        {
          name: "status",
          query: `ALTER TABLE \`${tableName}\` ADD COLUMN \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';`,
        },
        { name: "created_by", query: `ALTER TABLE \`${tableName}\` ADD COLUMN \`created_by\` INT;` },
        { name: "updated_by", query: `ALTER TABLE \`${tableName}\` ADD COLUMN \`updated_by\` INT;` },
        { name: "created_at", query: `ALTER TABLE \`${tableName}\` ADD COLUMN \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP;` },
        { name: "updated_at", query: `ALTER TABLE \`${tableName}\` ADD COLUMN \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;` },
      ];

      const constraintDefs = [
        {
          name: `fk_${tableName}_created_by`,
          query: `ALTER TABLE \`${tableName}\` ADD CONSTRAINT \`fk_${tableName}_created_by\` FOREIGN KEY (\`created_by\`) REFERENCES \`user_roles_designations_department\`(\`user_role_designation_department_id\`);`,
        },
        {
          name: `fk_${tableName}_updated_by`,
          query: `ALTER TABLE \`${tableName}\` ADD CONSTRAINT \`fk_${tableName}_updated_by\` FOREIGN KEY (\`updated_by\`) REFERENCES \`user_roles_designations_department\`(\`user_role_designation_department_id\`);`,
        },
      ];

      for (const col of columnDefs) {
        if (!(await columnExists(tableName, col.name))) {
          try {
            await executeQuery(col.query, []);
            logMessage([`✅ Added column ${col.name} to ${tableName}`]);
          } catch (err) {
            console.error(`❌ Error adding column ${col.name} to ${tableName}:`, err.message);
          }
        } else {
          logMessage([`ℹ️ Column ${col.name} already exists in ${tableName}`]);
        }
      }

      for (const con of constraintDefs) {
        if (!(await constraintExists(tableName, con.name))) {
          try {
            await executeQuery(con.query, []);
            logMessage([`✅ Added constraint ${con.name} to ${tableName}`]);
          } catch (err) {
            console.error(`❌ Error adding constraint ${con.name} to ${tableName}:`, err.message);
          }
        } else {
          logMessage([`ℹ️ Constraint ${con.name} already exists in ${tableName}`]);
        }
      }
    }

    logMessage(["✅ Done."]);
  } catch (err) {
    console.error("❌ Script failed:", err);
  } finally {

  }
}

// 🔹 Export instead of auto-run
module.exports = addMDK;
