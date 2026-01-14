global.SubcomponentResultsBackup_object = {
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
                                    "queryPayload": 
                                    async (req, decryptedPayload) => {
                                        const componentId = req.query.componentID;
                                        const courseId = req.query.course_id;
                                        const urdd = decryptedPayload.actionPerfomerURDD;
                                        const componentName = req.query.componentName;

                                        let selectMarks;
                                        if (componentName === 'Assignment' || componentName === 'Lab') {
                                            selectMarks = 'qe.obtained_marks AS ObtainedMarks';
                                        } else {
                                            selectMarks = 'SUM(qe.obtained_marks) AS ObtainedMarks';
                                        }

                                            const query = `
                                                SELECT
                                                    sc.sub_component_num AS subcomponentTitle,
                                                    sc.text AS subcomponentDescription,
                                                    sc.total_marks AS subcomponentTotalMarks,
                                                    ${selectMarks}
                                                FROM questionevaluations qe
                                                JOIN questions q ON q.question_id = qe.question_id
                                                JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id
                                                JOIN classcomponent cc ON cc.component_id = sc.component_id
                                                JOIN courses c ON c.course_id = cc.course_id
                                                JOIN enrollements e ON qe.enrollement_id = e.enrollement_id
                                                JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
                                                JOIN students s ON s.student_user_id = ss.student_user_id
                                                WHERE 
                                                    s.urdd_id = ${urdd}
                                                    AND c.course_id = ${courseId}
                                                    AND cc.component_id = ${componentId}
                                                ${
                                                    componentName === 'Assignment' || componentName === 'Lab'
                                                        ? '' // no grouping for per-subcomponent records
                                                        : 'GROUP BY sc.sub_component_id, sc.sub_component_name, sc.total_marks'
                                                };
                                            `;

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
                            "successMessage": "Results Reterieved!",
                            "errorMessage": "Error retreiving results."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { SubcomponentResults_object }