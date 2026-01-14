const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution"); 
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog");



async function insertBulkMarks(req, decryptedPayload) {

const objectArrayKey = Object.keys(decryptedPayload).find(
    key =>
        Array.isArray(decryptedPayload[key]) &&
        typeof decryptedPayload[key][0] === "object"
    );

if (!objectArrayKey) throw new Error("No array of objects found in the payload");

const objectArray = decryptedPayload[objectArrayKey];
logMessage(["Processing array of objects:", objectArray]);

if (!objectArray || objectArray.length === 0)
    throw new Error("No data provided in objectArray");

try {
    const firstObject = objectArray[0];
    const subComponents = [];
    const subComponentTypes = ["Quiz", "Assignment", "Lab"];

    // Identify subcomponents dynamically from first record
    Object.keys(firstObject).forEach(key => {
        const subComponentType = subComponentTypes.find(type =>
            key.includes(type)
        );
        if (subComponentType) subComponents.push({ name: key });
    });

    if (subComponents.length === 0)
        throw new Error("No valid subcomponents found (Quiz, Assignment, or Lab)");

    const insertedSubComponents = [];

    // === Insert Subcomponents (quizzes) ===
    for (const subComp of subComponents) {
        const insertSubCompQuery = `
            INSERT INTO subcomponents 
            (component_id, sub_component_num, text, total_marks, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW())
        `;

        const result = await executeQuery(
            insertSubCompQuery,
            [1, subComp.name, subComp.name, 10],
        );

        insertedSubComponents.push({ id: result.insertId, name: subComp.name });
    }

    // === Insert Questions for each Subcomponent ===
    const insertedQuestions = [];

    for (const subComp of insertedSubComponents) {
        const insertQuestionQuery = `
            INSERT INTO questions 
            (sub_component_id, description, question_marks, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
        `;

        const result = await executeQuery(
            insertQuestionQuery,
            [subComp.id, subComp.name, 10],
        );

        insertedQuestions.push({
            id: result.insertId,
            sub_component_id: subComp.id,
            name: subComp.name,
        });
    }

    // === Build a lookup for Quiz name → Question ID ===
    const quizToQuestionIdMap = {};
    insertedQuestions.forEach(q => {
        quizToQuestionIdMap[q.name] = q.id;
    });

    const courseId = 1;
    const evaluationRows = [];


    // === Iterate over all students ===
    for (const obj of objectArray) {
        let { Name } = obj;
        let email = obj['Registration No.'];
        email = email + "@itu.edu.pk";

        // --- Get URDD ID ---
        const getUrddIdQuery = `
            SELECT urdd.user_role_designation_department_id AS urdd_id
            FROM users u
            JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
            WHERE u.email = ?
        `;
        const urddResult = await executeQuery(getUrddIdQuery, [email]);
        if (!urddResult || urddResult.length === 0) continue;
        const urddId = urddResult[0].urdd_id;

        // --- Get Enrollment ID ---
        const getEnrollmentId = `
            SELECT e.enrollement_id 
            FROM user_roles_designations_department urdd
            JOIN students s ON urdd.user_role_designation_department_id = s.urdd_id
            JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
            JOIN enrollements e ON ss.student_semester_id = e.student_semester_id
            WHERE e.course_id = ? AND e.status = 'Active' AND urdd.user_role_designation_department_id = ? AND ss.status = 'Active'
        `;
        const enrollmentResult = await executeQuery(getEnrollmentId, [courseId, urddId]);
        if (!enrollmentResult || enrollmentResult.length === 0) continue;
        const enrollmentId = enrollmentResult[0].enrollement_id;

        // --- Build evaluation data ---
        for (const key of Object.keys(obj)) {
            if (quizToQuestionIdMap[key]) {
                const questionId = quizToQuestionIdMap[key];
                const obtainedMarks = parseFloat(obj[key]) || 0;

                evaluationRows.push([
                    enrollmentId,
                    questionId,
                    obtainedMarks,
                ]);
            }
        }
    }

    // === Bulk insert all evaluations ===
    if (evaluationRows.length > 0) {
        const insertEvaluationQuery = `
            INSERT INTO questionevaluations 
            (enrollement_id, question_id, obtained_marks)
            VALUES ?
        `;
        const CHUNK_SIZE = 100; 
        
        for (let i = 0; i < evaluationRows.length; i += CHUNK_SIZE) {
        const chunk = evaluationRows.slice(i, i + CHUNK_SIZE); // take 100 rows at a time
        if (chunk.length === 0) continue;

        try {
           result = await executeQuery(insertEvaluationQuery, [chunk]);
            console.log(`✅ Inserted rows ${i} - ${i + chunk.length - 1}`);
        } catch (err) {
            console.error(`❌ Error inserting chunk starting at ${i}:`, err);
        }
        }

    }

    logMessage(["✅ Bulk insertion complete", evaluationRows.length, "evaluations inserted"]);
} catch (error) {
    logMessage(["❌ Error in insertBulkMarks:", error]);
    throw error;
} 

}


global.MarksInsert_object = {
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
                                postProcessFunction: insertBulkMarks
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
                            "successMessage": "Configuration generated successfully!",
                            "errorMessage": "There was an error generating the configuration."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { MarksInsert_object };