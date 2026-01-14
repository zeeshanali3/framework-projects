const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function getEmployeeData(req, decryptedPayload) {
  const query = `
  SELECT 
    e.employee_id EmployeeId
  FROM
    employees e
  WHERE
   e.urdd_id=?
    `;
  const results = await executeQuery(query,[decryptedPayload.user_role_designation_department_id]); 
  return results
}

module.exports = getEmployeeData;
