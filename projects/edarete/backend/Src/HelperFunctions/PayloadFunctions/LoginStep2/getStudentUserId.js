const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function getStudentUserId(req, decryptedPayload) {
  const query = `
    SELECT 
      s.student_user_id as StudentUserId
    FROM
      students s
    WHERE
      s.urdd_id=?
  `;
  const results = await executeQuery(query, [decryptedPayload.user_role_designation_department_id]);
  return results
}

module.exports = getStudentUserId;
