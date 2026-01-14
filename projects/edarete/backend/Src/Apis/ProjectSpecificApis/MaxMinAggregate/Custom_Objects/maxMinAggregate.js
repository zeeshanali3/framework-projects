const MaxMinAverageAggregate = require("../../../../HelperFunctions/PayloadFunctions/MaxMinAggregate/maxMinAggregate");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");


async function weightages(req, decryptedPayload) {
    const course_id = req.query.course_id;
    const component_id = req.query.component_id;

    let query = `
        SELECT 
            cc.weightage,
            cc.component_name,
            cc.component_type
        FROM 
            classcomponent cc
        LEFT JOIN
            courses c ON c.course_id = cc.course_id
        WHERE
            c.course_id = ? 
            AND cc.component_type = 'graded'
    `;
    let params = [course_id];
    if (component_id && component_id != 0) {
        query += ` AND cc.component_id = ?`;
        params.push(component_id);
    }

    let results = await executeQuery(query, params)
    return results;
}

async function results(req, decryptedPayload) {
    const course_id = req.query.course_id;
    const component_id = req.query.component_id;

    let query = `
            select
            E.enrollement_id,
            S.student_semester_id,
            U.first_name,
            U.last_name,
            SC.sub_component_num,
            SC.component_id,
            SC.sub_component_id,
            CC.component_type,
            CC.component_name,
            COALESCE(SCM.obtained_marks, 0) AS obtained_marks,
            SC.total_marks
        FROM 
            subcomponents SC
        LEFT JOIN 
            classcomponent CC ON SC.component_id = CC.component_id
        LEFT JOIN 
            courses C ON CC.course_id = C.course_id
        LEFT JOIN 
            enrollements E ON E.course_id = C.course_id
        LEFT JOIN 
            studentsemesters S ON E.student_semester_id = S.student_semester_id
        LEFT JOIN 
            students ST ON S.student_user_id = ST.student_user_id
        LEFT JOIN 
            user_roles_designations_department UR ON ST.urdd_id = UR.user_role_designation_department_id
        LEFT JOIN 
            users U ON UR.user_id = U.user_id
        LEFT JOIN 
            subcomponentmarks SCM 
            ON SCM.sub_component_id = SC.sub_component_id 
            AND SCM.enrollment_id = E.enrollement_id
        WHERE 
            SC.status = 'active' 
            AND CC.component_type = 'graded' 
            AND E.course_id = ?
            AND E.status = 'active'
    `;
    let params = [course_id];
    if (component_id && component_id != 0) {
        query += ` AND CC.component_id = ?`;
        params.push(component_id);
    }
    let results = await executeQuery(query, params)
    return results;
}
global.GetMaxMinAggregate_object = {
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
                                    "accessToken": true
                                  },                    
                                },
                            "verification": {
                                "otp": false,
                                "accessToken": true
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields": []
                            },
                            "apiInfo": {
                                "preProcessFunction": [
                                    weightages,
                                    results
                                ],
                                "query": {
                                    "queryNature": "multi-step",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },

                                "postProcessFunction": async (req, decryptedPayload, results) => {
                                    const enrollement_id = req.query.enrollement_id;
                                    marksResults = decryptedPayload.results;
                                    const weightages = decryptedPayload.weightages;

                                    return await MaxMinAverageAggregate(marksResults, weightages, enrollement_id);
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                            },
                            "requestMetaData": {
                                "requestMethod": "GET",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Max Min aggregate Retrieved Successfully!",
                            "errorMessage": "There was an error retrieving max min aggregate."
                        }
                    }
                ]
            },
        }]
    }
};

module.exports = { GetMaxMinAggregate_object };
