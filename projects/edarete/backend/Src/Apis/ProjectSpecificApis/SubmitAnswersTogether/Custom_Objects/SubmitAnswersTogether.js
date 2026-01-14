const otpVerif = require("../../../../../Services/SysFunctions/otpVerif");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const {projectDB} = require('../../../../../Services/Integrations/Database/projectDb');

async function insertAnswers(req, decryptedPayload) {
    const { answer_data } = decryptedPayload;
  
    if (!Array.isArray(answer_data)) {
      throw new Error("answer_data must be an array of objects");
    }
    try {
      for (const entry of answer_data) {
        const { question_id, selectedOptionText, urdd ,course_id } = entry;
      // ✅ Get enrollment ID safely with parameterized query
      const getEnrollmentIdQuery = `
      SELECT enrollement_id 
      FROM enrollements e
      JOIN courses c ON e.course_id = c.course_id
      JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
      JOIN students s ON ss.student_user_id = s.student_user_id
      WHERE s.urdd_id = ? AND e.course_id = ?

    `;
    const enrollmentRows = await executeQuery(getEnrollmentIdQuery, [urdd, course_id]);
    if (!enrollmentRows || enrollmentRows.length === 0) {   
        throw new Error("Enrollment not found for participant");
      }
      const studentEnrollmentId = enrollmentRows[0].enrollement_id;
      const submitAnswerQuery = `
      INSERT INTO questionevaluations
      (enrollement_id, question_id, student_answer, obtained_marks, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [studentEnrollmentId, question_id, selectedOptionText, null, "active"];
    await executeQuery(submitAnswerQuery, values);

    } 
    return { success: true };
  }
  catch (err) {
    console.error("❌ Error inserting entries:", err);
    throw err;
  } 
}
  

global.Submitquizanswers_object = {
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
                                // "accessToken": false,
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
                                        {
                                            "name": "answer_data",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [insertAnswers],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: null
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
                            "successMessage": "Signup successfull!",
                            "errorMessage": "There was an error signing up user."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Submitquizanswers_object };