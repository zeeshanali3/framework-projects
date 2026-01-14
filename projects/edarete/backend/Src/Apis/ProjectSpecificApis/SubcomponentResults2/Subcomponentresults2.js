const { projectDB } = require("../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog");



async function getSubcomponentResultsLab(req, decryptedPayload) {
    try {
        const urdd_id = decryptedPayload["actionPerformerURDD"];
        const { componentID } = req.query;
        const { course_id } = req.query;

        const getMarksQuery = `SELECT count(*) as total_count,
    sc.sub_component_id AS id,
    sc.sub_component_num as lab_subComponentName,
    -- sc.total_marks AS lab_totalMarks,
    SUM(qe.obtained_marks) AS lab_obtainMarks,
    SUM(q.question_marks) AS lab_totalMarks,
    CONCAT(
      '{',
      IFNULL(
        GROUP_CONCAT(
         CONCAT(
    JSON_QUOTE(q.description),
    ':',
    JSON_QUOTE(IFNULL(qe.obtained_marks, '0'))
)
          ORDER BY q.question_id
          SEPARATOR ','
        ),
      ''),
      '}'
    ) AS marks_map_json
FROM subcomponents sc
LEFT JOIN classcomponent cc ON cc.component_id = sc.component_id
LEFT JOIN courses c ON c.course_id = cc.course_id
LEFT JOIN questions q ON q.sub_component_id = sc.sub_component_id
LEFT JOIN questionevaluations qe ON qe.question_id = q.question_id
LEFT JOIN enrollements e ON qe.enrollement_id = e.enrollement_id
LEFT JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
LEFT JOIN students s ON s.student_user_id = ss.student_user_id
LEFT JOIN user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
WHERE s.urdd_id = ?
  AND c.course_id = ?
  AND cc.component_id = ?
  AND sc.status = 'active'
GROUP BY sc.sub_component_id, sc.sub_component_num;`;

        // Execute the query
        const getMarksQueryResult = await executeQuery(getMarksQuery, [urdd_id, course_id, componentID]);

        // Post-process the results
        const processedResults = getMarksQueryResult.map((row) => {
            // Parse the marks_map_json field into an object
            const marksMap = JSON.parse(row.marks_map_json || '{}');

            // Add keys from marks_map_json to the outer object
            for (let [key, value] of Object.entries(marksMap)) {
                if (key == '1. Realization of Experiment') key = 'lab_funtionality'
                else if (key == '2. Conducting Experiment') key = 'lab_viva'
                else if (key == '3. Computer Use') key = 'lab_documentation'
                else if (key == '4. Teamwork') key = 'lab_teamwork'
                else if (key == '5. Laboratory Safety and Disciplinary Rules') key = 'lab_codeCommenting'
                else if (key == '6. Data Collection') key = 'lab_codeStructure'
                else if (key == '7. Data Analysis') key = 'lab_algorithm'
                row[key] = value;
            }

            // Remove the marks_map_json field if no longer needed
            delete row.marks_map_json;

            return row;
        });

        return {
            success: true,
            data: processedResults,
            total_count : 0
        };
    } catch (error) {
        // Log the error and return a failure response
        logMessage(["Error in getSubcomponentResultsBackup:", error.message]);
        return {
            success: false,
            message: "An error occurred while fetching subcomponent results.",
            error: error.message,
        };
    }
}


global.SubcomponentResults2_object = {
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
                                postProcessFunction: getSubcomponentResultsLab
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
module.exports = { SubcomponentResults2_object };