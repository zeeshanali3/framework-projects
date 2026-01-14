const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function GetUserRoleData(req, decryptedPayload) {
    const query = `
    SELECT
        ur.user_id as UserId,
        rdd.role_id as RoleId,
        ur.user_role_designation_department_id as UserRoleId
    FROM
        user_roles_designations_department ur
    JOIN
    	roles_designations_department rdd
        ON ur.role_designation_department_id = rdd.role_designation_department_id
    WHERE
        ur.Status = 'active' AND ur.user_id = ?`;
    const values = [decryptedPayload.user_id];
    const results = await executeQuery(query, values);
    return results;
};

module.exports = GetUserRoleData;
