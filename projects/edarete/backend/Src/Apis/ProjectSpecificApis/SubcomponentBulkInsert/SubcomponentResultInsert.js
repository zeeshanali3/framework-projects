const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution"); 
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog");


async function insertBulkSubcomponentMarks(req, decryptedPayload) {
    const subComponentId = req.query.id;
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
        const questions = [];
        // Updated list of component types
        const questionTypes = ["Realization of Experiment", "Conducting Experiment", "Computer Use", "Teamwork", "Laboratory Safety and Disciplinary Rules", "Data Collection", "Data Analysis", "Quiz"];

        // const questionNumebers = ["Realization of Experiment -> 5", "Conducting Experiment -> 5", "Computer Use -> 5", "Teamwork -> 5", "Laboratory Safety and Discipline Rules -> 5", "Data Collection -> 5", "Data Analysis -> 5", "Quiz -> 10"];

        // --- 1. Identify questions (with type) ---
        Object.keys(firstObject).forEach(key => {
            const questionType = questionTypes.find(type =>
                key.includes(type)
            );
            // Store both name (CSV column) and type for logic later
            if (questionType) questions.push({ name: key, type: questionType });
        });

        if (questions.length === 0) 
            throw new Error("No valid entry for questions found (e.g., Realization of Experiment, Computer Use)");
            
        const insertedquestions = [];
        const questionToIdMap = {}; // Map for easy lookup: 'Question 1' -> {id, total_marks}
        
        
        const prefixesToDelete = questions.map(sc => sc.type)
                                              .filter((value, index, self) => self.indexOf(value) === index);

        // --- Remove previous records
        for (const type of prefixesToDelete) {

            const questionIdsQuery = `select question_id from questions where sub_component_id = ?`;
            const questionIdsQueryResult = await executeQuery(questionIdsQuery, [subComponentId]);
            const questionsIds = questionIdsQueryResult.map(row => row.question_id);

            if(questionsIds.length === 0) continue;

             const updatePreviousSubcomponentsQuery = `
              Update questions
              SET status = 'inactive'
              WHERE sub_component_id = ? 
            `;
            // Deletes all previous records of this type for the specific component.
            await executeQuery(updatePreviousSubcomponentsQuery, [subComponentId]);

            const updatePreviousSubcomponentsMarksQuery = `
            UPDATE questionevaluations
            SET status = 'inactive'
            WHERE question_id IN (?)
            `;
            // Execute the query for each component_id with its corresponding sub_component_ids
            await executeQuery(
            updatePreviousSubcomponentsMarksQuery,
            [questionsIds]
            );
        }
        
        
        // --- 3. Insert New Questions and Build Lookup Map ---
        for (const question of questions) {
    
            
            const insertQuestionQuery = `
                INSERT INTO questions 
                (sub_component_id, description,question_marks, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
            `;
            
            // We only pass 4 parameters (the 4 question marks). NOW() is handled by the SQL server.
            const result = await executeQuery(
                insertQuestionQuery,
                [subComponentId, question.name, '5'],
            );

            const newQuestion = { 
                id: result.insertId, 
            };
            insertedquestions.push(newQuestion);
            
            // Build the map for fast lookup
            questionToIdMap[question.name] = newQuestion; 
        }


        const domain = '@itu.edu.pk';
        const marksInsertionRows = []; // Array to collect all marks for bulk insert


        // --- 4. Iterate over all students and collect mark data ---
        for (const obj of objectArray) {
            
            // Get Student Identifiers
            let regNo = obj['Registration No.'];
            let email = regNo + domain; // Use 'email' variable for consistency with query
            
            // --- Get URDD ID (Unchanged) ---
            const getUrddIdQuery = `
                SELECT urdd.user_role_designation_department_id AS urdd_id
                FROM users u
                JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
                WHERE u.email = ?
            `;
            const urddResult = await executeQuery(getUrddIdQuery, [email]);
            if (!urddResult || urddResult.length === 0) continue;
            const urddId = urddResult[0].urdd_id;

            const getCourseId = `Select course_id from classcomponent cc 
            LEFT JOIN subcomponents sc on cc.component_id = sc.component_id where sc.sub_component_id = ?`;
            const courseIdResult = await executeQuery(getCourseId, [subComponentId]);
            if (!courseIdResult || courseIdResult.length === 0) continue;
            const courseIdValue = courseIdResult[0].course_id;            
            const getEnrollmentId = `
                SELECT e.enrollement_id 
                FROM user_roles_designations_department urdd
                JOIN students s ON urdd.user_role_designation_department_id = s.urdd_id
                JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
                JOIN enrollements e ON ss.student_semester_id = e.student_semester_id
                WHERE e.course_id = ? AND e.status = 'Active' AND urdd.user_role_designation_department_id = ? AND ss.status = 'Active'
            `;
            const enrollmentResult = await executeQuery(getEnrollmentId, [courseIdValue, urddId]);
            if (!enrollmentResult || enrollmentResult.length === 0) continue;
            const enrollmentId = enrollmentResult[0].enrollement_id;

            // --- Loop through student marks and prepare row data ---
            for (const key of Object.keys(obj)) {
               const questionData = questionToIdMap[key];

                if (questionData) {
                    const obtainedMarks = String(obj[key]) || 0;
                    
                    marksInsertionRows.push([
                        enrollmentId,
                        questionData.id,
                        obtainedMarks,
                    ]);
                }
            }
        }
        
        
        // --- 5. Bulk insert all subcomponent marks ---
        if (marksInsertionRows.length > 0) {
            const insertEvaluationsQuery = `
                INSERT INTO questionevaluations 
                (enrollement_id, question_id, obtained_marks)
                VALUES ?
            `;
            
            // Perform the chunked bulk insertion for performance
            const CHUNK_SIZE = 100; 
            for (let i = 0; i < marksInsertionRows.length; i += CHUNK_SIZE) {
                const chunk = marksInsertionRows.slice(i, i + CHUNK_SIZE);
                if (chunk.length === 0) continue;

                try {
                   await executeQuery(insertEvaluationsQuery, [chunk]);
                   logMessage([`✅ Inserted marks chunk starting at row ${i}`]);
                } catch (err) {
                    // Log the error but continue to the next chunk
                    console.error(`❌ Error inserting marks chunk starting at ${i}:`, err);
                }
            }
        }
        
        logMessage([`✅ Bulk insertion of marks complete. Total records: ${marksInsertionRows.length}`]);

    } catch (error) {
        logMessage(["❌ Error in insertBulkMarks:", error]);
        throw error;
    } 

}




global.SubcomponentBulkInsert_object = {
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
                                preProcessFunction: [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: insertBulkSubcomponentMarks
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
module.exports = { SubcomponentBulkInsert_object };