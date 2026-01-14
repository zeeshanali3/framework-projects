global.GetCloGraphData_object = {
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
                                        const course_id=req.query.course_id;
                                        let query = `
                                            SELECT 
                                                clo.cloid,
                                                clo.clonum,
                                                clo.description AS CLODescription,
                                                COUNT(q.question_id) AS TotalQuestions,
                                                COUNT(DISTINCT qe.enrollement_id) AS TotalStudentCount,
                                                SUM(q.question_marks) AS TotalMarks,
                                                SUM(qe.obtained_marks) AS TotalObtainedMarks,
                                                (SELECT COUNT(DISTINCT qe_inner.enrollement_id)
                                                FROM questionevaluations qe_inner
                                                JOIN questions q_inner ON qe_inner.question_id = q_inner.question_id AND qe_inner.status = 'Active'
                                                WHERE q_inner.cloid = clo.cloid
                                                AND (qe_inner.obtained_marks / q_inner.question_marks) * 100 > 50) AS StudentsAbove50Percent,
                                                ROUND((SUM(qe.obtained_marks) / SUM(q.question_marks)) * 100) AS OverAllPercentage,
                                                ROUND((SUM(qe.obtained_marks) / SUM(q.question_marks)) * 100, 2) AS AveragePercentage
                                            FROM 
                                                courses c
                                            LEFT JOIN 
                                                classcomponent cc ON c.course_id = cc.course_id
                                            LEFT JOIN 
                                                subcomponents sc ON cc.component_id = sc.component_id
                                            LEFT JOIN 
                                                questions q ON sc.sub_component_id = q.sub_component_id
                                            LEFT JOIN 
                                                questionevaluations qe ON q.question_id = qe.question_id AND qe.status = 'active'
                                            LEFT JOIN 
                                                clo clo ON q.cloid = clo.cloid
                                            LEFT JOIN 
                                                enrollements e ON qe.enrollement_id = e.enrollement_id AND e.status = 'active'
                                            WHERE 
                                                c.course_id = ${course_id}
                                                AND cc.component_type = 'Graded' 
                                                AND cc.status = 'active' 
                                                AND sc.status = 'active'
                                            GROUP BY 
                                                clo.cloid, clo.clonum, clo.description
                                            ORDER BY 
                                                clo.clonum ASC;
                                            `
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
module.exports = { GetCloGraphData_object }