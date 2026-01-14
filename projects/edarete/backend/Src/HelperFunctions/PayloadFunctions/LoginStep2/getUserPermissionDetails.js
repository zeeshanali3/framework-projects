// getUserPermissionDetails.js
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");


async function getUserPermissionDetails(req, decryptedPayload) {
  const query = `
    SELECT 
        p.permission_name AS PermissionName
    FROM 
        user_roles_designations_department ur
    JOIN 
        user_role_designation_permissions urdp 
        ON ur.user_role_designation_department_id = urdp.user_role_designation_department_id
    JOIN 
        permissions p
        ON urdp.permission_id = p.permission_id
    WHERE 
        ur.user_id = ?
  `;
  const values = [decryptedPayload.user_id];
  const result = await executeQuery(query, values);
  const permissionTypes = result.map(row => row.permission_name);

  return { permissionTypes };
}

module.exports = getUserPermissionDetails;
