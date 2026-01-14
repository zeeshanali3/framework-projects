const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function getRollNumber(req, decryptedPayload) {
  const query = `
    SELECT 
      s.reg_num as RegNum
    FROM
      students s
    WHERE
      s.urdd_id=?
    `;
  const results = await executeQuery(query,[decryptedPayload.user_role_designation_department_id]); 
  return results
}

module.exports = getRollNumber;
