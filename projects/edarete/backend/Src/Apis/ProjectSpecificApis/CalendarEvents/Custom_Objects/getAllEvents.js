global.CalendarEvents_object = {
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
                                    "queryNature": "",
                                    "queryPayload": async (req, decryptedPayload) => {
                                            const student_semester_id = req.query.student_semester_id;
                                            
                                        let query = `
                                              SELECT
                                                sc.end_time,
                                                sc.date,
                                                e.enrollement_id,
                                                c.status AS CourseStatus,
                                                cc.component_name AS ComponentName,
                                                sc.sub_component_num AS SubComponentNumber,
                                                pc.course_name AS CourseName,
                                                c.course_id AS CourseId,
                                                COALESCE(ss.status, 'Not Submitted') AS SubmissionStatus
                                            FROM
                                                enrollements e
                                            LEFT JOIN
                                                courses c ON e.course_id = c.course_id
                                            LEFT JOIN
                                                plannedcourses pc ON pc.planned_course_id = c.planned_course_id
                                            LEFT JOIN
                                                classcomponent cc ON c.course_id = cc.course_id AND cc.component_type="Graded"
                                            LEFT JOIN
                                                subcomponents sc ON cc.component_id = sc.component_id AND sc.status = 'active'
                                            LEFT JOIN
                                                studentsubmissions ss ON ss.enrollment_id = e.enrollement_id AND ss.sub_component_id = sc.sub_component_id
                                            WHERE
                                                e.student_semester_id = ${student_semester_id}
                                                AND e.Status = 'active'
                                                AND ss.sub_component_id IS NULL`
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
module.exports = { CalendarEvents_object }