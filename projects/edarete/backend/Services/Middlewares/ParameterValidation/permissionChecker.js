const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const { projectDB } = require("../../Integrations/Database/projectDb");
const { executeQuery } = require("../../Integrations/Database/queryExecution");
const { checkExpiration } = require("../../SysFunctions/checkExpiration");
// Function to build the SQL query based on the request path
const buildQuery = (path, email, urdd_id, permission) => {
  if (path === "/login") {
    // Query for login request validation based on email and permission
    return `
            SELECT p.permission_name
            FROM user_roles_designations_department urdd
            JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
            JOIN permissions p ON urdp.permission_id = p.permission_id
            JOIN users u ON urdp.user_id = u.user_id
            WHERE u.email = '${email}' AND p.permission_name = '${permission}'
        `;
  } else {
    return `
            SELECT p.permission_name
            FROM user_roles_designations_department urdd
            JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
            JOIN permissions p ON urdp.permission_id = p.permission_id
            WHERE urdd.user_role_designation_department_id = ${urdd_id} AND p.permission_name = '${permission}'
        `;
  }
};

async function getSubordinates(designation_id) {
  if (!designation_id) return [];
  const query =
  `
    SELECT DISTINCT urdd.user_role_designation_department_id
    FROM user_roles_designations_department urdd
      JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
      JOIN permissions p ON urdp.permission_id = p.permission_id
      JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
      JOIN designations d ON rdd.designation_id = d.designation_id
      WHERE d.senior_designation_id = '${designation_id}'
  `;
  return await executeQuery(query, []);
}

async function getDesignationId(urdd_id) {
  if (!urdd_id) return null;
  const query =
  `
    SELECT DISTINCT rdd.designation_id
    FROM user_roles_designations_department urdd
      JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
      JOIN designations d ON rdd.designation_id = d.designation_id
      WHERE d.senior_designation_id = '${urdd_id}'
  `;
  return await executeQuery(query, []);


}

// Main function to check if the user has the required permission
const permissionChecker = async (
req,
apiData,
decryptedPayload,
requestedPath) =>
{
  try {
    const permission = apiData.requestMetaData.permission;
    const { email } = decryptedPayload || {}; // Get email from the decrypted body
    const urdd_id =
    req.query["actionPerformerURDD"] ||
    decryptedPayload["actionPerformerURDD"];

    if (!email && !urdd_id) {
      throw new Error(
        `SSC: E22 => Missing Required Permission Validation Parameters (actionPerformerURDD).`
      );
    }



    // Permissions Provided In Access Token

    let providedPermissions = [];
    if (apiData.requestMetaData.providedPermissions) {
      let decodedToken = await checkExpiration(req.headers['accesstoken']);
      ({ providedPermissions } = decodedToken);
    }


    // Checking Assigned Permissions AND Provided Permissions
    const permissions = Array.isArray(permission) ? permission : [permission];
    let permissionResults;

    for (const p of permissions) {
      const query = buildQuery(requestedPath, email, urdd_id, p);
      const connection = await projectDB();
      permissionResults = await executeQuery(query, "", connection);

      if (providedPermissions.includes(p)) {
        permissionResults = [...permissionResults, p];
      }

      if (permissionResults.length === 0) {
        throw new Error(
          "SSC: E41 => Forbidden: You do not have permission to access this resource."
        );
      }
    }





    let response = {
      excluded: null,
      included: {},
      meta: { created_by: [urdd_id || 'NULL'] || [] }
    };
    let designation_id = await getDesignationId(urdd_id)[0]?.designation_id;
    let subs = await getSubordinates(designation_id);

    response.meta.created_by = subs.len > 0 ? [...response.meta.created_by, subs] : response.meta.created_by;
    logMessage(["permissionResults: ", permissionResults]);
    permissionResults.forEach((row) => {
      if (row.excluded_id != null && row.excluded_id != 0) {
        logMessage(["Assigning Excluded Id"]);
        response.excluded = row.excluded_id;
      }
      if (row.included_id != null && row.included_id != 0) {
        logMessage(["Assigning Excluded Id"]);
        const includedData = JSON.parse(row.included_id);
        Object.keys(includedData).forEach((key) => {
          response.included[key] = includedData[key];
        });
      }
    });

    const included_keys = Object.keys(response.included);
    logMessage(["INCLUDED KEYS: ", included_keys]);
    return req.method == "GET" ? response : null;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};


module.exports = permissionChecker;