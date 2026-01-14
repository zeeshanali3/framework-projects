const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");


async function getTeacherData(req, decryptedPayload){
    const query = `
    SELECT
        teachers_users.first_name AS TeacherName,
        assistants_users.first_name AS AssistantName,
        teachers.employee_id AS TeacherId,
        assistants.employee_id AS AssistantId,
        p.program_name AS ProgramName,
        p.program_year AS ProgramYear,
        s.semester_num AS SemesterNum,
        d.department_name AS DepartmentName,
        pc.course_name AS CourseName,
        pc.planned_course_id AS PlannedCourseId,
        pc.credit_hours AS CreditHours,
        c.status AS Status,
        c.course_id AS CourseId,
        COUNT(en.course_id) AS EnrollmentCount
    FROM
        courses c
    JOIN
        plannedcourses pc ON c.planned_course_id = pc.planned_course_id
    LEFT JOIN
        semesters s ON pc.semester_id = s.semester_id
    LEFT JOIN
        programs p ON s.program_id = p.program_id
    LEFT JOIN
        departments d ON d.department_id = p.department_id    
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
    LEFT JOIN
        enrollements en ON c.course_id = en.course_id 
        AND en.status = 'approved'
    WHERE
        c.teacher_employee_id = teachers.employee_id
        AND c.status = 'active'
        AND teachers.urdd_id = ?
    GROUP BY
    teachers_users.first_name,
    assistants_users.first_name,
    teachers.employee_id,
    assistants.employee_id,
    p.program_name,
    d.department_name,
    s.semester_num,
    pc.course_name,
    pc.planned_course_id,
    pc.credit_hours,
    c.status,
    c.course_id

    `;
 
    const results = await executeQuery(query,[decryptedPayload.user_role_designation_department_id]);
    return results
};
module.exports = getTeacherData;
    