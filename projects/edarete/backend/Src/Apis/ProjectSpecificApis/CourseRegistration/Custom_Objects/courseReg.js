const otpVerif = require("../../../../../Services/SysFunctions/otpVerif");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const { signUpVerif } = require("../../../../HelperFunctions/PreProcessingFunctions/signUpVerif")
async function checkDiscipline(req, decryptedPayload) {
    let user_data = await executeQuery("SELECT * FROM users u JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id JOIN studentsemesters ss WHERE urdd.user_role_designation_department_id = ss.urdd_id WHERE ss.student_user_id=?", [decryptedPayload.student_user_id]);
    if (global.isValidDiscipline(user_data[0])) {
        await executeQuery("INSERT INTO enrollments (student_semester_id, course_id, enrolled_date) VALUES (?, ?, ?)", [decryptedPayload.student_semester_id, decryptedPayload.course_id, new Date()]);
    }
    else{
        await executeQuery("INSERT INTO course_requests (student_urdd_id, course_id) VALUES (?, ?)", [decryptedPayload.student_semester_id, decryptedPayload.course_id]);
    }


}
global.CourseRegistration_object = {
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
                                      "accessToken ": true,
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
                                            "name": "course_id",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "student_semester_id",
                                            "validations": [],
                                            "required": true,
                                            "source": "req.body"
                                        }
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [checkDiscipline],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: otpVerif
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
module.exports = { CourseRegistration_object };