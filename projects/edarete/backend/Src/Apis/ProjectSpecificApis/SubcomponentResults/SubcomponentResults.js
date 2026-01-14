const { projectDB } = require("../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog");



async function getSubcomponentResults(req, decryptedPayload) {

    const urdd_id = decryptedPayload["actionPerformerURDD"];
    const { componentID } = req.query;
    const { course_id } = req.query;
    
    const getMarksQuery = `
    SELECT COUNT(*) OVER() AS total_count, sm.obtained_marks AS subcomponentmarks_obtainedMarks, sm.out_of_marks AS subcomponentmarks_outOfMarks, sc.sub_component_num AS subcomponentmarks_quizTitle,  sm.sub_component_mark_id AS id From subcomponentmarks sm
    LEFT JOIN subcomponents sc ON sc.sub_component_id = sm.sub_component_id
    LEFT JOIN classcomponent cc ON cc.component_id = sc.component_id
    LEFT JOIN enrollements e ON e.enrollement_id = sm.enrollment_id
    LEFT JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
    LEFT JOIN students s ON s.student_user_id = ss.student_user_id
    WHERE 
        s.urdd_id = ?
        AND cc.component_id = ?
        AND e.course_id = ?
       AND sm.status !='inactive'
        `;

        
    const getMarksQueryResult = await executeQuery(getMarksQuery, [urdd_id, course_id, componentID]);
    return {
        return: getMarksQueryResult,
        total_count : 0
    }


}


global.SubcomponentResults_object = {
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
                                        {
                                            "name": "actionPerformerURDD",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "componentId",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.query"
                                        },
                                        {
                                            "name": "courseId",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.query"
                                        }
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [],
                                "query": '',
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: getSubcomponentResults
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
                            "successMessage": "Configuration generated successfully!",
                            "errorMessage": "There was an error generating the configuration."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { SubcomponentResults_object };