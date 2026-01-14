global.StudentAttendance_object = {
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
                                // "encryption": false
                                "encryption": {
                                    "platformEncryption": true,
                                    "accessToken": true,
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

                                    ]
                            },
                            "apiInfo":
                            {
                                "query": {
                                    "queryNature": "SELECT",
                                    "queryPayload": async (req, decryptedPayload) => {
                                            const enrollementId = req.query.enrollementId;
                                            const subComponentId = req.query.subComponentId;
                                            const courseId=req.query.courseId;
                                         
                                        let query = `
                                            SELECT 
                                                sc.sub_component_num AS lectureNumber,
                                                la.enrollement_id AS enrollementId,
                                                la.date AS lectureDate,
                                                la.is_present AS isPresent,
                                                la.sub_component_id AS subComponentId,
                                                sc.sub_component_num AS subComponentNum,
                                                s.reg_num AS registrationNumber,
                                                u.first_name AS studentFirstName
                                            FROM
                                                lecturesattendance la
                                            LEFT JOIN
                                                enrollements e ON e.enrollement_id = la.enrollement_id
                                            LEFT JOIN 
                                                subcomponents sc ON sc.sub_component_id = la.sub_component_id
                                            LEFT JOIN 
                                                classcomponent cc ON sc.component_id = cc.component_id
                                            LEFT JOIN
                                                studentsemesters ss ON ss.student_semester_id = e.student_semester_id    
                                            LEFT JOIN
                                                students s ON s.student_user_id = ss.student_user_id
                                            LEFT JOIN
                                                user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
                                            LEFT JOIN 
                                                users u ON u.user_id = urdd.user_id
                                            WHERE
                                                la.status = "active"`
                                        query += courseId? ` AND cc.course_id= ${courseId}` : ` AND sc.sub_component_id=${subComponentId}`;
                                        if (enrollementId) {
                                            query += ` AND la.enrollement_id=${enrollementId}`;
                                        }
                                        return query;
                                    },
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "GET",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Student Attendance Retrieved Successfully!",
                            "errorMessage": "There was an error signing up user."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { StudentAttendance_object }