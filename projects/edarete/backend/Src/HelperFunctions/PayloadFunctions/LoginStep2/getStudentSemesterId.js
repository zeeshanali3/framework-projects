const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function getStudentSemesterId(req, decryptedPayload) {
  const query = `
    SELECT 
      ss.student_semester_id AS StudentSemesterId
    FROM
      studentsemesters ss
    WHERE
      ss.student_user_id=?
    `;
  const results = await executeQuery(query, [decryptedPayload.user_id]);
  return results
}

module.exports = getStudentSemesterId;
