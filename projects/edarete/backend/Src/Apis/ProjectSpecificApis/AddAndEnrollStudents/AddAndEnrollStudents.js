// const {projectDB} = require("../../../../Services/Integrations/Database/projectDb.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution.js");
const db = require("../../../../Services/Integrations/Database/databaseAbstraction");


async function createandenrollstudent(req, decryptedPayload) {    

    // const objectResolverOutput = decryptedPayload["objectResolverOutput"]; 
    const {email , name} = req.body;

    let userId;
    const getUserQuery = `select * from users where email = ?`;
    const getUserQueryResult = await executeQuery(getUserQuery, [email]);
    if (getUserQueryResult.length == 0) {
        const insertUserQuery = `INSERT INTO users(email, first_name,created_by,updated_by) VALUES (?, ?,?,?)`;
        const insertUserQueryResult = await executeQuery(insertUserQuery, [email, name,1,1]);
        userId = insertUserQueryResult.insertId;
    }
    else{
        userId = getUserQueryResult[0].user_id;
    }
    
    const rdd_id = 4;
    let urdd_id;
    const getURDDQuery = `select * from  user_roles_designations_department  where user_id = ? AND role_designation_department_id  = ?`;
    const getURDDQueryResult = await executeQuery(getURDDQuery, [userId, rdd_id]);
    if (getURDDQueryResult.length == 0) {
        const insertURDDQuery = `INSERT INTO user_roles_designations_department(user_id, role_designation_department_id,created_by,updated_by) VALUES (?, ?,?,?)`;
        const insertURDDQueryResult = await executeQuery(insertURDDQuery, [userId, rdd_id,1,1]);
        urdd_id = insertURDDQueryResult.insertId;
    }
    else{
        urdd_id = getURDDQueryResult[0].user_role_designation_department_id;
    }     
    let studentId;
    const getStudentQuery = `select * from  students  where urdd_id = ?`;
    const getStudentQueryResult = await executeQuery(getStudentQuery, [urdd_id]);
    if (getStudentQueryResult.length == 0) {
        const insertStudentQuery = `INSERT INTO students(urdd_id, program_id,batch,reg_num,status,created_by,updated_by) VALUES (?, ?,?,?, ? , ? ,?)`;
        const insertStudentQueryResult = await executeQuery(insertStudentQuery, [userId, 1, 2025 , 99999999, 'active', 1, 1]);
        studentId = insertStudentQueryResult.insertId;
    }
    else{
        studentId = getStudentQueryResult[0].student_user_id;
    }   
    let studentSemesterId;
    const getStudentSemesterQuery = `select * from  studentsemesters  where student_user_id = ?`;
    const getStudentSemesterQueryResult = await executeQuery(getStudentSemesterQuery, [studentId]);
    if (getStudentSemesterQueryResult.length == 0) {
        const insertStudentSemesterQuery = `INSERT INTO studentsemesters(student_user_id, semester_id,CGPA,SGPA,credits_acquired,attendance_delta,created_by,updated_by) VALUES (?, ? ,? ,? , ?, ? ,?, ? , ?)`;
        const insertStudentSemesterQueryResult = await executeQuery(insertStudentSemesterQuery, [studentId, 1, 0 , 0, 0, 0, 0,1, 1]);
        studentSemesterId = insertStudentSemesterQueryResult.insertId;
    }
    else{
        studentSemesterId = getStudentSemesterQueryResult[0].student_semester_id;
    } 

    let enrollementId;
    const getEnrollementQuery = `select * from  enrollements  where student_semester_id = ? AND course_id = ?`;
    const getEnrollementQueryResult = await executeQuery(getEnrollementQuery, [studentSemesterId, 1]);
    if (getEnrollementQueryResult.length == 0) {
        const insertEnrollementQuery = `INSERT INTO enrollements(student_semester_id   ,course_id,created_by,updated_by) VALUES (? ,? ,? , ?)`;
        const insertEnrollementQueryResult = await executeQuery(insertEnrollementQuery, [studentSemesterId, 1,1 ,1]);
        enrollementId = insertEnrollementQueryResult.insertId;
    }
    else{
        enrollementId = getEnrollementQueryResult[0].enrollement_id;
    } 



}



global.Addenrollstudents_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": true,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": {
                                    "platformEncryption": true,
                                    //"accessToken": false,
                                }
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": true
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "actionPerformerURDD",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        }
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null
                                   ,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: createandenrollstudent
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Student added successfully and enrolled to the course!",
                            "errorMessage": "Failed to save / enroll student."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Addenrollstudents_object };