const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution"); 
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog");


async function insertBulkComponentMarks(req, decryptedPayload) {
    // const componentId = decryptedPayload.componentId;
    const componentId = req.query.id;
    
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
        // Updated list of component types
        const subComponentTypes = ["Quiz", "Assignment", "Lab", "Mid", "Final", "Project"];

        // --- 1. Identify subcomponents (with type) ---
        Object.keys(firstObject).forEach(key => {
            const subComponentType = subComponentTypes.find(type =>
                key.includes(type)
            );
            // Store both name (CSV column) and type for logic later
            if (subComponentType) subComponents.push({ name: key, type: subComponentType });
        });

        if (subComponents.length === 0) 
            throw new Error("No valid entry for subcomponents found (e.g., Quiz, Assignment, Lab)");
            
        const subComponentToIdMap = {};

        // --- 2. Get or Create Subcomponents (No Deletion/Inactivation) ---
        for (const subComp of subComponents) {
            let total_marks;
            
            if (subComp.type === 'Quiz') total_marks = 10;
            else if (subComp.type === 'Assignment') total_marks = 10;
            else if (subComp.type === 'Lab') total_marks = 100;
            else if (subComp.type === 'Mid') total_marks = 20;
            else if (subComp.type === 'Final') total_marks = 50;
            else total_marks = 0;

            // Check if subcomponent already exists
            const checkSubCompQuery = `
                SELECT sub_component_id, total_marks 
                FROM subcomponents 
                WHERE component_id = ? AND sub_component_num = ? AND status = 'active'
            `;
            const existingSubComp = await executeQuery(checkSubCompQuery, [componentId, subComp.name]);

            if (existingSubComp && existingSubComp.length > 0) {
                // ✅ Subcomponent exists, use existing ID
                const subCompId = existingSubComp[0].sub_component_id;
                
                // Update total_marks if changed
                if (existingSubComp[0].total_marks !== total_marks) {
                    const updateSubCompQuery = `
                        UPDATE subcomponents 
                        SET total_marks = ?, updated_at = NOW()
                        WHERE sub_component_id = ?
                    `;
                    await executeQuery(updateSubCompQuery, [total_marks, subCompId]);
                    logMessage([`📝 Updated total_marks for: ${subComp.name}`]);
                }

                subComponentToIdMap[subComp.name] = { 
                    id: subCompId, 
                    name: subComp.name,
                    total_marks: total_marks 
                };
            } else {
                // ✅ Subcomponent doesn't exist, create new one
                const insertSubCompQuery = `
                    INSERT INTO subcomponents 
                    (component_id, sub_component_num, text, total_marks, status, created_at, updated_at)
                    VALUES (?, ?, ?, ?, 'active', NOW(), NOW())
                `;
                const result = await executeQuery(insertSubCompQuery, [
                    componentId, 
                    subComp.name, 
                    subComp.name, 
                    total_marks
                ]);

                subComponentToIdMap[subComp.name] = { 
                    id: result.insertId, 
                    name: subComp.name,
                    total_marks: total_marks 
                };
                logMessage([`✅ Created new subcomponent: ${subComp.name}`]);
            }
        }

        const domain = '@itu.edu.pk';
        let insertedCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;

        // --- 3. Iterate over all students and upsert marks individually ---
        for (const obj of objectArray) {
            
            // Get Student Identifiers
            let regNo = obj['Registration No.'];
            let email = regNo + domain; // Use 'email' variable for consistency with query
            
            // Get URDD ID
            const getUrddIdQuery = `
                SELECT urdd.user_role_designation_department_id AS urdd_id
                FROM users u
                JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
                WHERE u.email = ?
            `;
            const urddResult = await executeQuery(getUrddIdQuery, [email]);
            if (!urddResult || urddResult.length === 0) {
                logMessage([`⚠️ User not found: ${email}`]);
                skippedCount++;
                continue;
            }
            const urddId = urddResult[0].urdd_id;

            // Get Course ID
            const getCourseId = `SELECT course_id FROM classcomponent WHERE component_id = ?`;
            const courseIdResult = await executeQuery(getCourseId, [componentId]);
            if (!courseIdResult || courseIdResult.length === 0) {
                logMessage([`⚠️ Course not found for component: ${componentId}`]);
                skippedCount++;
                continue;
            }
            const courseIdValue = courseIdResult[0].course_id;

            // Get Enrollment ID
            const getEnrollmentId = `
                SELECT e.enrollement_id 
                FROM user_roles_designations_department urdd
                JOIN students s ON urdd.user_role_designation_department_id = s.urdd_id
                JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
                JOIN enrollements e ON ss.student_semester_id = e.student_semester_id
                WHERE e.course_id = ? AND e.status = 'Active' 
                AND urdd.user_role_designation_department_id = ? 
                AND ss.status = 'Active'
            `;
            const enrollmentResult = await executeQuery(getEnrollmentId, [courseIdValue, urddId]);
            if (!enrollmentResult || enrollmentResult.length === 0) {
                logMessage([`⚠️ Enrollment not found for: ${email}`]);
                skippedCount++;
                continue;
            }
            const enrollmentId = enrollmentResult[0].enrollement_id;

            // --- Loop through each quiz/assignment for this student ---
            for (const key of Object.keys(obj)) {
                const subCompData = subComponentToIdMap[key];

                if (subCompData) {
                    const obtainedMarks = String(obj[key]).trim();
                    
                  

                    // ✅ Check if this student-quiz combination already exists
                    const checkExistingQuery = `
                        SELECT sub_component_mark_id, obtained_marks 
                        FROM subcomponentmarks 
                        WHERE enrollment_id = ? 
                        AND sub_component_id = ? 
                        AND status = 'active'
                    `;
                    const existingMark = await executeQuery(checkExistingQuery, [
                        enrollmentId, 
                        subCompData.id
                    ]);

                    if (existingMark && existingMark.length > 0) {
                        // ✅ UPDATE existing record
                        const updateMarksQuery = `
                            UPDATE subcomponentmarks 
                            SET out_of_marks = ?, 
                                obtained_marks = ?, 
                                updated_at = NOW()
                            WHERE sub_component_mark_id = ?
                        `;
                        await executeQuery(updateMarksQuery, [
                            subCompData.total_marks,
                            obtainedMarks,
                            existingMark[0].sub_component_mark_id
                        ]);
                        updatedCount++;
                        logMessage([`📝 Updated: ${regNo} - ${subCompData.name}: ${obtainedMarks}`]);
                    } else {
                        // ✅ INSERT new record
                        const insertMarksQuery = `
                            INSERT INTO subcomponentmarks 
                            (enrollment_id, sub_component_id, out_of_marks, obtained_marks, status, created_at, updated_at)
                            VALUES (?, ?, ?, ?, 'active', NOW(), NOW())
                        `;
                        await executeQuery(insertMarksQuery, [
                            enrollmentId,
                            subCompData.id,
                            subCompData.total_marks,
                            obtainedMarks
                        ]);
                        insertedCount++;
                        logMessage([`✅ Inserted: ${regNo} - ${subCompData.name}: ${obtainedMarks}`]);
                    }
                }
            }
        }
        
        logMessage([
            `\n📊 Bulk upsert complete:`,
            `   ✅ Inserted: ${insertedCount} records`,
            `   📝 Updated: ${updatedCount} records`,
            `   ⚠️ Skipped: ${skippedCount} students`
        ]);

    } catch (error) {
        logMessage(["❌ Error in insertBulkMarks:", error]);
        throw error;
    } 

}




global.ComponentBulkInsert_object = {
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
                                postProcessFunction: insertBulkComponentMarks
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
module.exports = { ComponentBulkInsert_object };


