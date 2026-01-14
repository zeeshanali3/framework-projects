

global.Announcement_object = {
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
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": `
                                    SELECT DISTINCT c.component_id AS component_id, c.component_name AS component_name, c.component_type AS type, sc.sub_component_num AS title, sc.sub_component_id as quiz_id, sc.start_time, sc.end_time, sc.text AS description,  pc.course_name AS course, sc.status, sc.updated_at, co.course_id
                                    FROM subcomponents sc
                                    JOIN classcomponent c ON sc.component_id = c.component_id
                                    JOIN courses co ON c.course_id = co.course_id
                                    JOIN plannedcourses pc ON co.planned_course_id = pc.planned_course_id
                                    JOIN enrollements e ON c.course_id = e.course_id
                                    JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
                                    JOIN students s ON ss.student_user_id = s.student_user_id
                                    WHERE (s.urdd_id = {{actionPerformerURDD}} OR sc.created_by = {{actionPerformerURDD}}) AND sc.sub_component_status = 'pending' AND sc.status = 'active' AND sc.end_time >= NOW()`,
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
                            "successMessage": "Configuration generated successfully!",
                            "errorMessage": "There was an error generating the configuration."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { Announcement_object };