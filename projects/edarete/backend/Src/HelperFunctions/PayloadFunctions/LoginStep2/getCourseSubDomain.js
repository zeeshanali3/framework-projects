const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

require('dotenv').config();
async function getCourseSubDomain(req, decryptedPayload) {
    try {
        let currentUrl = req.headers.origin || decryptedPayload.currentUrl;
        if (currentUrl) {
            if (!currentUrl.includes(process.env.REACT_BASE_URL)) {
                const query =
                    `
                SELECT 
                    c.course_id AS CourseId,
                    pc.course_name AS CourseName ,
                    c.course_sub_domain_prefix AS CourseSubDomainPrefix,
                    e.employee_id AS EmployeeId,
                    e.personal_domain_url AS PersonalDomailUrl
                FROM
                    courses c 
                LEFT JOIN 
                    plannedcourses pc ON c.planned_course_id = pc.planned_course_id 
                LEFT JOIN 
                    employees e ON c.teacher_employee_id = e.employee_id 
                LEFT JOIN
                    user_roles_designations_department urdd ON urdd.user_role_designation_department_id = e.urdd_id
                LEFT JOIN 
                    users u ON urdd.user_id = u.user_id 
                WHERE 
                    c.course_sub_domain_prefix LIKE CONCAT('%', e.personal_domain_url, '%');
        `
                const results = await executeQuery(query, [decryptedPayload.user_role_designation_department_id]);
                const extractHostname = (currentUrl) => {
                    const urlObj = new URL(currentUrl);
                    return urlObj.hostname;
                };


                const currentHostname = extractHostname(currentUrl);
                logMessage(["currentHostname:::", currentHostname])
                const matchingCourses = results.filter(course =>
                    course.course_sub_domain_prefix.includes(currentHostname)
                );

                logMessage(["matchingCourses::", matchingCourses])
                return matchingCourses
            }
        }
        return
    } catch (error) {
        logMessage(["Error:", error])
    }
}

module.exports = getCourseSubDomain;
