const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");


async function getTAData(req, decryptedPayload){
    const query = `
    SELECT
        teachers_users.first_name AS TeacherName,
        assistants_users.first_name AS AssistantName,
        teachers.employee_id AS TeacherId,
        assistants.employee_id AS AssistantId,
        pc.course_name CourseName,
        pc.planned_course_id PlannedCourseId,
        pc.credit_hours CreditHours,
        c.status Status,
        c.course_id CourseId
    FROM
        courses c
    JOIN
        plannedcourses pc ON c.planned_course_id = pc.planned_course_id
    LEFT JOIN
        employees AS teachers ON c.teacher_employee_id = teachers.employee_id
    LEFT JOIN
        employees AS assistants ON c.tassist_employee_id = assistants.employee_id
    LEFT JOIN
        user_roles_designations_department AS teacher_roles 
            ON teachers.urdd_id = teacher_roles.user_role_designation_department_id
    LEFT JOIN
        users AS teachers_users ON teacher_roles.user_id = teachers_users.user_id
    LEFT JOIN
        user_roles_designations_department AS assistant_roles 
            ON assistants.urdd_id = assistant_roles.user_role_designation_department_id
    LEFT JOIN
        users AS assistants_users ON assistant_roles.user_id = assistants_users.user_id
    WHERE
        c.status = 'active' 
        AND assistants_users.user_id = ?

`;
 
    const results = await executeQuery(query,[decryptedPayload.user_role_designation_department_id]);
    return results
};
module.exports = getTAData;
     