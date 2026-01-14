const logMessage = require("../SysFunctions/LogFunctions/consoleLog.js");
const { projectDB } = require("../Integrations/Database/projectDb");
const { executeQuery } = require("../Integrations/Database/queryExecution");
const read = require("readline-sync");
const { initBaseObjects } = require("./baseDb/createGroupedCruds");
const { securityDB } = require("../Integrations/Database/securityDB");
const { initSecurityObjects } = require("./securityDb/createGroupedCruds");
const path = require("path");
const fs = require("fs");
const { groupedFrontTemplates } = require("./objectTemplates/objectTemplates");
const db = require("../Integrations/Database/databaseAbstraction.js");

require("dotenv").config({ path: "../Server/.env" });




const operations = [
  "list",
  "add",
  "update",
  "delete",
  "view",
  "export",
  "filter",
  "sort",
  "search",
];
// const operations1 = ["list", "view", "export", "filter", "sort", "search"];
let BasicPermissions = [];



async function truncateDatabase() {
  await executeQuery(db.disableForeignKeyQuery(), [])
  let tables = await executeQuery(db.fetchTablesInBaseDatabaseQuery(), [])
  for (const table of tables) {
    logMessage(["Table:", table])
    await executeQuery(db.truncateTableQuery(table.TABLE_NAME))
  }
  await executeQuery(db.enableForeignKeyQuery(), [])
}


async function getOrInsertPermissionId(permissionName) {
  const checkQuery = `SELECT permission_id FROM permissions WHERE permission_name = ?`;
  const existing = await executeQuery(
    checkQuery,
    [permissionName],
    await projectDB()
  );

  if (existing.length > 0) {
    return existing[0].permission_id;
  }

  const insertQuery = db.getInsertQuery("permissions", ["permission_name"], [permissionName])
  const result = await executeQuery(insertQuery, [], await projectDB());
  return result?.insertId || result[0].permission_id;
}

async function getOrInsertURDDP(urdd, p) {
  const checkQuery = `SELECT user_role_designation_permission_id FROM user_role_designation_permissions WHERE user_role_designation_department_id = ? AND permission_id = ?`;
  const existing = await executeQuery(checkQuery, [urdd, p], await projectDB());

  if (existing.length > 0) {
    return existing[0].permission_id;
  }


  const insertQuery = db.getInsertQuery("user_role_designation_permissions", ["user_role_designation_department_id", "permission_id"], [urdd,p])
  const result = await executeQuery(insertQuery, [], await projectDB());
  return result?.insertId || result.user_role_designation_permission_id;
}

async function createAdminProfile(permissions, adminEmail = 'admin@profile.com') {
  try {
    logMessage(["Admin Permissions are", permissions]);
    const userSelectQuery = `
            SELECT * FROM users WHERE email = '${adminEmail}'
        `;
    let userId = (await executeQuery(userSelectQuery, [], await projectDB()))[0]
      ?.user_id;

    
    if (!userId) {
      const attachmentInsertQuery = db.getInsertQuery("attachments", ["attachment_name"], ["Default"])
      let insertAttachmentInsert = await executeQuery(attachmentInsertQuery, [])
      let attachment_id = insertAttachmentInsert[0]?.attachment_id || insertAttachmentInsert?.insertId
      const userInsertQuery = db.getInsertQuery("users", ["email", " first_name", " last_name", "username", " password", " phone_no", " cnic", " gender", " father_name", " image_attachment_id", " address", " date_of_birth", " blood_group", " religion"], [`${adminEmail}`, "Admin", "Profile", "Admin_Profile", "pass123", "1234567890", "12345-6789012-3", "Male", "Admin Senior", `${attachment_id}`, "Admin Address", "1990-01-01", "O+", "None"])

      let insertUserResult = await executeQuery(userInsertQuery, [], await projectDB()) 
      userId = insertUserResult?.insertId || insertUserResult[0]?.user_id;
    }

    const departmentQuery = `SELECT department_id FROM departments WHERE department_name = 'HR';`;
    const designationQuery = `SELECT designation_id FROM designations WHERE designation_name = 'CEO';`;
    const roleQuery = `SELECT role_id FROM roles WHERE role_name = 'Admin';`;

    const departmentResult = await executeQuery(
      departmentQuery,
      [],
      await projectDB()
    );
    const designationResult = await executeQuery(
      designationQuery,
      [],
      await projectDB()
    );
    const roleResult = await executeQuery(roleQuery, [], await projectDB());

    let insertDepartmentResult, insertDesignationResult, insertRoleResult;
    if (departmentResult?.length == 0) {
      const insertDepartmentQuery = db.getInsertQuery("departments", ["department_name"], ['HR']);
      insertDepartmentResult = await executeQuery(
        insertDepartmentQuery,
        [],
        await projectDB()
      );
    }
    if (designationResult?.length == 0) {
      const insertDesignationQuery = db.getInsertQuery("designations", ["designation_name"], ['CEO']);
      insertDesignationResult = await executeQuery(
        insertDesignationQuery,
        [],
        await projectDB()
      );
    }
    if (roleResult?.length == 0) {
      const insertRoleQuery = db.getInsertQuery("roles", ["role_name"], ['Admin']);
      insertRoleResult = await executeQuery(insertRoleQuery, [], await projectDB());
    }
    const departmentId =
      departmentResult[0]?.department_id || insertDepartmentResult[0]?.department_id || insertDepartmentResult?.insertId;
    const designationId =
      designationResult[0]?.designation_id || insertDesignationResult[0]?.designation_id || insertDesignationResult?.insertId;
    const roleId = roleResult[0]?.role_id || insertRoleResult[0]?.role_id || insertRoleResult?.insertId;

    const rddSelectQuery = `SELECT * FROM roles_designations_department WHERE designation_id = '${designationId}' AND role_id = '${roleId}' AND department_id = '${departmentId}'
        `;
    let rdd_Id = (await executeQuery(rddSelectQuery, [], await projectDB()))[0]
      ?.role_designation_department_id;

    if (!rdd_Id) {
      const roleDesignationDeptQuery = db.getInsertQuery("roles_designations_department", ["designation_id", "role_id", "department_id"], [`${designationId}`, `${roleId}`, `${departmentId}`])

      let insertRddIdResult =  (await executeQuery(roleDesignationDeptQuery, [], await projectDB()))
      rdd_Id = insertRddIdResult?.insertId || insertRddIdResult[0]?.role_designation_department_id;
    }

    const urddSelectQuery = `SELECT * FROM user_roles_designations_department WHERE user_id = '${userId}' AND role_designation_department_id  = '${rdd_Id}'
        `;
    let urdd_Id = (await executeQuery(urddSelectQuery, [], await projectDB()))[0]?.user_role_designation_department_id;
    if (!urdd_Id) {
      const userRoleDesignationDeptQuery = db.getInsertQuery("user_roles_designations_department", ["user_id", "role_designation_department_id", "spec_attributes"], [`${userId}`, `${rdd_Id}`, `{}`])

      let insertUrddIdResult = (
        await executeQuery(userRoleDesignationDeptQuery, [], await projectDB())
      );
      urdd_Id = insertUrddIdResult?.insertId || insertUrddIdResult[0]?.user_role_designation_department_id
    }

    for (const permission of permissions) {
      await getOrInsertURDDP(urdd_Id, permission);
    }

    const getAdminQuery = `SELECT * FROM users WHERE user_id = '${userId}'`;
    let results = await executeQuery(getAdminQuery, [], await projectDB());
    logMessage(["Admin profile created and assigned all permissions successfully."]);
    logMessage(["Admin Credentials With All Access Permissions: "]);
    console.dir(results);
    return { userId, rdd_Id, urdd_Id };
  } catch (error) {
    console.error("Error creating admin profile:", error);
  }
}

async function createITProfile(permissions, adminEmail = 'admin@profile.com') {
  try {
    logMessage([permissions]);
    logMessage(["Admin Email:  ", adminEmail])
    
    const userSelectQuery = `
            SELECT * FROM users WHERE email = '${adminEmail}'
        `;
    let userId = (await executeQuery(userSelectQuery, [], await projectDB()))[0]
      ?.user_id;

    logMessage([await executeQuery("SELECT * FROM users", [])])

    const departmentQuery = `SELECT department_id FROM departments WHERE department_name = 'IT';`;
    const designationQuery = `SELECT designation_id FROM designations WHERE designation_name = 'IT Operations';`;
    const roleQuery = `SELECT role_id FROM roles WHERE role_name = 'IT Admin';`;

    const departmentResult = await executeQuery(
      departmentQuery,
      [],
      await projectDB()
    );
    const designationResult = await executeQuery(
      designationQuery,
      [],
      await projectDB()
    );
    const roleResult = await executeQuery(roleQuery, [], await projectDB());

    logMessage([departmentResult, designationResult, roleResult]);
    let insertDepartmentResult, insertDesignationResult, insertRoleResult;
    if (departmentResult?.length == 0) {
      const insertDepartmentQuery = db.getInsertQuery("departments", ["department_name"], ['IT']);
      insertDepartmentResult = await executeQuery(
        insertDepartmentQuery,
        [],
        await projectDB()
      );
    }
    if (designationResult?.length == 0) {
      const insertDesignationQuery = db.getInsertQuery("designations", ["designation_name"], ['IT Operations']);
      insertDesignationResult = await executeQuery(
        insertDesignationQuery,
        [],
        await projectDB()
      );
    }
    if (roleResult?.length == 0) {
      const insertRoleQuery = db.getInsertQuery("roles", ["role_name"], ['IT Admin']);
      insertRoleResult = await executeQuery(insertRoleQuery, [], await projectDB());
    }
    const departmentId =
      departmentResult[0]?.department_id || insertDepartmentResult[0]?.department_id || insertDepartmentResult?.insertId;
    const designationId =
      designationResult[0]?.designation_id || insertDesignationResult[0]?.designation_id || insertDesignationResult?.insertId;
    const roleId = roleResult[0]?.role_id || insertRoleResult[0]?.role_id || insertRoleResult?.insertId;

    logMessage([insertDepartmentResult, insertDesignationResult, insertRoleResult]);

    const rddSelectQuery = `SELECT * FROM roles_designations_department WHERE designation_id = '${designationId}' AND role_id = '${roleId}' AND department_id = '${departmentId}'
        `;
    let rdd_Id = (await executeQuery(rddSelectQuery, [], await projectDB()))[0]
      ?.role_designation_department_id;

    if (!rdd_Id) {
      const roleDesignationDeptQuery = db.getInsertQuery("roles_designations_department", ["designation_id", "role_id", "department_id"], [`${designationId}`, `${roleId}`, `${departmentId}`])

      let insertRddIdResult =  (await executeQuery(roleDesignationDeptQuery, [], await projectDB()))
      rdd_Id = insertRddIdResult?.insertId || insertRddIdResult[0]?.role_designation_department_id;
    }

    const urddSelectQuery = `SELECT * FROM user_roles_designations_department WHERE user_id = '${userId}' AND role_designation_department_id  = '${rdd_Id}'
        `;
    let urdd_Id = (await executeQuery(urddSelectQuery, [], await projectDB()))[0]
      ?.user_role_designation_department_id;
    if (!urdd_Id) {
      const userRoleDesignationDeptQuery = db.getInsertQuery("user_roles_designations_department", ["user_id", "role_designation_department_id", "spec_attributes"], [`${userId}`, `${rdd_Id}`, `{}`])

      let insertUrddIdResult = (
        await executeQuery(userRoleDesignationDeptQuery, [], await projectDB())
      );
      urdd_Id = insertUrddIdResult?.insertId || insertUrddIdResult[0]?.user_role_designation_department_id
    }

    for (const permission of permissions) {
      await getOrInsertURDDP(urdd_Id, permission);
    }

    const getAdminQuery = `SELECT * FROM users WHERE user_id = '${userId}'`;
    let results = await executeQuery(getAdminQuery, [], await projectDB());
    logMessage(["Admin profile created and assigned all permissions successfully."]);
    logMessage(["Admin Credentials With All Access Permissions: "]);
    console.dir(results);
    return { userId, rdd_Id, urdd_Id };
  } catch (error) {
    console.error("Error creating admin profile:", error);
  }
}

async function insertBasePermissions() {
  const blacklist = [
    "user_role_designation_permissions",
    "user_devices",
    "dynamic_attachments",
  ];
  let permissionIds = [];
  const tablesResult = await executeQuery(
    db.fetchTablesInBaseDatabaseQuery(),
    [],
    await projectDB()
  );
  const tables = tablesResult
    .map((row) => row.table_name || row.TABLE_NAME)
    .filter((table) => !blacklist.includes(table));


  logMessage([tables])
  for (const table of tables) {
    logMessage(["Processing Permissions For ", table])
    for (const operation of operations) {
      const permissionName = `${operation}_${table}`;
      logMessage(["Adding ", permissionName])
      const id = await getOrInsertPermissionId(permissionName);
      permissionIds.push(id);
    }
  }
  logMessage(["Exiting CRUD Permissions"])

  const extraPermissions = [
    "dashboard",
    "profile",
    "account",
    "privacy_policy",
    "security",
  ];
  for (const perm of extraPermissions) {
    const id = await getOrInsertPermissionId(perm);
    permissionIds.push(id);
    BasicPermissions.push(id);
  }

  logMessage(["Exiting Insert Base Permissions"])
  return permissionIds;
}



async function insertSecurityPermissions() {
  let permissionIds = [];
  const tablesResult = await executeQuery(
    db.fetchTablesInSecurityDatabaseQuery(),
    [],
    await securityDB()
  );
  let tables = tablesResult.map((row) => row.TABLE_NAME);
  tables = [
    ...tables,
    "user_devices",
    "`crash_log",
    "email_log",
    "error_log",
    "security_log",
  ];

  for (const table of tables) {
    for (const operation of operations) {
      const permissionName = `${operation}_${table}`;
      const id = await getOrInsertPermissionId(permissionName);
      permissionIds.push(id);
    }
  }

  const extraPermissions = [
    "dashboard",
    "profile",
    "account",
    "privacy_policy",
    "security",
  ];
  for (const perm of extraPermissions) {
    const id = await getOrInsertPermissionId(perm);
    permissionIds.push(id);
  }

  logMessage(["Security Permissions inserted or fetched successfully."]);
  return permissionIds;
}
async function createSidePropsConfig(combinedGroups) {
  logMessage(["In Create Side Props Config"]);
  const sidePropsFolder = path.join(
    __dirname,
    "..",
    "Frontend",
    "src",
    "root",
    "Utils",
    "Props"
  );

  if (!fs.existsSync(sidePropsFolder)) {
    fs.mkdirSync(sidePropsFolder, { recursive: true });
  }

  let sidePropsFileContent = "";
  const propsFileName = path.join(sidePropsFolder, `sidebarConfig.js`);
  sidePropsFileContent += groupedFrontTemplates.sideBarProps(combinedGroups);
  fs.writeFileSync(propsFileName, sidePropsFileContent.trim(), "utf8");
}
async function instantiateProject() {
  try {
    const truncateDB = read.keyInYN(
      "Do you want to truncate (empty) the database(s)?"
    );
    if (truncateDB) {
      await truncateDatabase()
    }
    const adminEmail = read.questionEMail("Enter the admin profile email: ");
    logMessage(["Admin email will be:", adminEmail]);
    const usePermissions = read.keyInYN(
      "Do you want to implement permissions?"
    );
    if (!usePermissions) {
      let baseGroups,
        baseTables = await initBaseObjects(false);
      let securityGroups = await initSecurityObjects(false);

      let combinedGroups = { ...baseGroups, ...securityGroups };
      logMessage(["combined Tables are", combinedGroups]);
      await createSidePropsConfig(combinedGroups);
      return;
    }
    let basePermissions = await insertBasePermissions();
    await createAdminProfile(basePermissions, adminEmail);

    // let studentPermissions = await insertStudentPermissions();

    // const StudentDetails = await createStudentProfile(studentPermissions);

    let securityPermissions = await insertSecurityPermissions();
    await createITProfile(securityPermissions, adminEmail);

    let baseGroups, baseTables = await initBaseObjects(true);
    let securityGroups = await initSecurityObjects(true);

    let newTempBaseTables = {};
    for (let entry of baseTables) {
      newTempBaseTables[`${entry.TABLE_NAME}`] = [entry.TABLE_NAME];
    }
    let combinedGroups = { ...newTempBaseTables, ...securityGroups };
    logMessage(["combined Tables are", combinedGroups]);
    await createSidePropsConfig(combinedGroups);

    // logMessage([`Generated Side bar props for Groups`]);
    process.exit();
  } catch (error) {
    console.error("Error initializing project:", error);
  }
}

module.exports = { instantiateProject };
