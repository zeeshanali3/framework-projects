global.Groupmembers_object = {
    "versions": {
        "versionData": [
            {
                "*": {
                    "steps": [
                        {
                            "config": {
                                "features": {
                                    "multistep": false,
                                    "parameters": true,
                                    "pagination": false,
                                },
                                "communication": {
                                    "encryption": false
                                },
                                "verification": {
                                    "otp": false,
                                    "accessToken": false
                                }
                            },
                            "data": {
                                "parameters": {
                                    "fields": []
                                },
                                "apiInfo": {
                                    "preProcessFunction": [],
                                    "query": {
                                        "queryPayload": async(req, decryptedPayload) => {
                                            const { GroupName,CourseId, ActionPerformerURDD } = decryptedPayload; 
                                            return `
                                                  SELECT 
                                                    u.first_name AS Student_Name,
                                                    en.status,
                                                    s.reg_num
                                                FROM
                                                    enrollements en
                                                LEFT JOIN
                                                    studentsemesters ss ON ss.student_semester_id = en.student_semester_id
                                                LEFT JOIN 
                                                    students s ON s.student_user_id = ss.student_user_id
                                                LEFT JOIN
                                                    user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
                                                LEFT JOIN
                                                    users u ON urdd.user_id = u.user_id
                                                WHERE en.status = "active" AND en.group_name = '${GroupName}' AND en.course_id = '${CourseId}'
                                                AND urdd.user_role_designation_department_id= '${ActionPerformerURDD}';
                                            `   
                                        },
                                        "database": "projectDB"
                                    },
                                    "postProcessFunction":null,
                                },
                                "requestMetaData": {
                                    "requestMethod": "POST",
                                    "permission": null,
                                    "pagination": {
                                        "pageSize": 10
                                    }
                                }
                            },
                            "response": {
                                "successMessage": "Leaderboards retrieved successfully!",
                                "errorMessage": "There was an error retrieving leaderboards."
                            }
                        }
                    ]
                },
            }
        ]
    }
};

module.exports = { Groupmembers_object };
