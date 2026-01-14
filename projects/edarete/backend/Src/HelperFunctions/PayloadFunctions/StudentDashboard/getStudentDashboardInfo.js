const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require('../../../../Services/Integrations/Database/queryExecution');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });


async function executeStudentDataQueries(req, decryptedPayload) {
    try {
        
        logMessage([decryptedPayload["objectResolverOutput"]]);
        if(!decryptedPayload.actionPerformerURDD){
            decryptedPayload.actionPerformerURDD = req.query.actionPerformerURDD
        }
        const fetchUserDataQuery = `
            SELECT u.*, a.attachment_link as user_image 
            FROM users u  
            LEFT JOIN attachments a ON u.image_attachment_id = a.attachment_id
            JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
            WHERE urdd.user_role_designation_department_id  = ${decryptedPayload.actionPerformerURDD};`
        const userResult = await executeQuery( fetchUserDataQuery, []);
        if (userResult.length ==0 ){
            throw new Error("No user found with the provided URDD ID");
        }
        let userId = userResult[0].user_id;
        let fetchStudentDataQuery = `
            SELECT s.batch AS batch_year, s.reg_num AS student_id, sem.semester_num AS current_semester, p.program_name AS program, sem.start_date AS semester_start_date, sem.end_date AS semester_end_date,  CONCAT(YEAR(sem.start_date), '-', YEAR(sem.end_date)) AS semester_year, sem.semester_name AS semester_name
            FROM students s
            JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
            JOIN studentsemesters ss ON s.student_user_id = ss.student_user_id
            JOIN semesters sem ON ss.semester_id = sem.semester_id
            JOIN programs p ON sem.program_id = p.program_id
            WHERE s.urdd_id = ${decryptedPayload.actionPerformerURDD} AND ss.status = 'active'`
        let studentDataQueryResult = await executeQuery( fetchStudentDataQuery, []);


        let userRoleName = `
        Select r.role_name from user_roles_designations_department urdd
        JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        JOIN roles r ON rdd.role_id = r.role_id
        WHERE urdd.user_role_designation_department_id = ${decryptedPayload.actionPerformerURDD} AND urdd.status = 'active'`
        let userRolenameResult = await executeQuery( userRoleName, []);
        let role_name = userRolenameResult[0].role_name;

        let availablePrograms;

        if(role_name == 'Student'){
             availablePrograms = await executeQuery(
                `SELECT DISTINCT p.program_id, p.program_name as name FROM students s
                JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
                JOIN semesters sm ON sm.semester_id = ss.semester_id 
                JOIN programs p ON p.program_id = sm.program_id
                -- JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
                WHERE s.urdd_id =  ${decryptedPayload.actionPerformerURDD}`, []);
    
        }
        else{
            availablePrograms = await executeQuery(
                `SELECT DISTINCT p.program_id AS program_id, p.program_name AS program FROM programs p WHERE p.program_year >= YEAR(CURDATE())`, []);
        }
       

        let semesters = await executeQuery(
            ` SELECT DISTINCT ss.student_semester_id ,s.reg_num AS student_id, sem.semester_num AS current_semester, p.program_name AS program, sem.start_date AS semester_start_date, sem.end_date AS semester_end_date,  CONCAT(YEAR(sem.start_date), '-', YEAR(sem.end_date)) AS semester_year, sem.semester_name AS semester_name, ss.CGPA, ss.SGPA, ss.credits_acquired
            FROM students s
            JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
            JOIN studentsemesters ss ON s.student_user_id = ss.student_user_id
            JOIN semesters sem ON ss.semester_id = sem.semester_id
            JOIN programs p ON sem.program_id = p.program_id
            WHERE s.urdd_id = ${decryptedPayload.actionPerformerURDD}`, []);

        for (let sem of semesters) {
            sem.courses = await executeQuery(
                `SELECT c.course_code, e.student_semester_id, pc.course_name, e.grade, pc.credit_hours, e.status
                FROM enrollements e
                JOIN courses c ON e.course_id = c.course_id
                JOIN plannedcourses pc ON c.planned_course_id = pc.planned_course_id
                WHERE e.student_semester_id = ?`,
                [sem.student_semester_id]
            )
        }

        let returnObject = {
            user_profile: userResult[0],
            student_details: studentDataQueryResult[0] || {},
            available_programs: availablePrograms,
            current_semester_performance: {
                semester : studentDataQueryResult[0] || {}
            },
            semester_history: semesters
        };
        return returnObject; 

    } catch (error) {

        throw error;
    }
}

module.exports = {

    executeStudentDataQueries 
};
