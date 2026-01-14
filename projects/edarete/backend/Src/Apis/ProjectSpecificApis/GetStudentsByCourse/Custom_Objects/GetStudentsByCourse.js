global.Studentsbycourse_object = {
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
                                    "accessToken": true,
                                }
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
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
                                        const courseId=req.query.courseId;
                                        let query = `
                                            select * from students s
                                            JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
                                            JOIN enrollements e ON e.student_semester_id = ss.student_semester_id
                                            JOIN courses c ON c.course_id = e.course_id
                                            WHERE c.course_id = ${courseId}
                                            AND s.status = 'active' AND ss.status = 'active' AND e.status = 'active';`
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
                            "successMessage": "Student By Courses Received!",
                            "errorMessage": "There was an error Getting Student By Courses."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Studentsbycourse_object }