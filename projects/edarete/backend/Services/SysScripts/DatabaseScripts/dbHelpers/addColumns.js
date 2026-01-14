const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
const {projectDB} = require("../../../Integrations/Database/projectDb");
const { executeQuery } = require("../../../Integrations/Database/queryExecution");

(async () => {
  const connection = await projectDB();
  const tables = await executeQuery("SHOW TABLES", [], connection);
  logMessage([tables]);

  const tableKey = Object.keys(tables[0])[0];

  for (const row of tables) {
    const tableName = row[tableKey];

    const dropConstraintsQuery = `
      ALTER TABLE \`${tableName}\`
      DROP FOREIGN KEY \`fk_${tableName}_created_by\`,
      DROP FOREIGN KEY \`fk_${tableName}_updated_by\`,
      DROP INDEX \`fk_${tableName}_created_by\`,
      DROP INDEX \`fk_${tableName}_updated_by\`
    `;

    try {
      await executeQuery(dropConstraintsQuery, [], connection);
    } catch (err) {
      logMessage([`Constraint drop error on table ${tableName}:`, err.message]);
    }

    const dropColumnsQuery = `
      ALTER TABLE \`${tableName}\`
      DROP COLUMN \`status\`,
      DROP COLUMN \`updated_by\`,
      DROP COLUMN \`created_by\`,
      DROP COLUMN \`created_at\`,
      DROP COLUMN \`updated_at\`
    `;

    try {
      await executeQuery(dropColumnsQuery, [], connection);
    } catch (err) {
      logMessage([`Column drop error on table ${tableName}:`, err.message]);
    }

    const addColumnsQuery = `
      ALTER TABLE \`${tableName}\`
      ADD COLUMN \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      ADD COLUMN \`created_by\` INT,
      ADD COLUMN \`updated_by\` INT,
      ADD COLUMN \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      ADD CONSTRAINT \`fk_${tableName}_created_by\` FOREIGN KEY (\`created_by\`) REFERENCES \`user_roles_designations_department\`(\`user_role_designation_department_id\`),
      ADD CONSTRAINT \`fk_${tableName}_updated_by\` FOREIGN KEY (\`updated_by\`) REFERENCES \`user_roles_designations_department\`(\`user_role_designation_department_id\`)
    `;

    try {
      await executeQuery(addColumnsQuery, [], connection);
    } catch (err) {
      logMessage([`Add column/constraint error on table ${tableName}:`,
        err.message]);
    }
  }

  logMessage(["✅ Done."]);
})();
