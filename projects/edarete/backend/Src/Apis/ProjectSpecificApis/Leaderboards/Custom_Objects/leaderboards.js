const logMessage = require("../../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");

async function getCourseLeaderboards(req, decryptedPayload) {
const course_id = req.query.course_id;
   logMessage(["--------CourseId recieved: ",course_id]);
                                  
    let query = `
        SELECT

            clb.course_id AS CourseId,
            clb.course_leaderboard_id AS CourseLeaderboardId,
            clb.leaderboard_name AS LeaderboardName,
            clb.status,
            clb.created_at AS createdAt,
            clb.updated_at AS updatedAt,
            clbsc.sub_component_id AS SubComponentId,
            c.component_name AS ComponentName,
            s.sub_component_num AS SubComponentNum,
            c.component_id AS ComponentID,
            clbsc.subcomponent_percentage AS SubcomponentPercentage,
            clb.number_of_positions AS NumberOfPositions

            FROM
            courseleaderboardsubcomponents clbsc
        LEFT JOIN
            courseleaderboards clb 
              ON clbsc.course_leaderboard_id = clb.course_leaderboard_id 
             AND clbsc.status = 'active'
        LEFT JOIN
            subcomponents s 
              ON clbsc.sub_component_id = s.sub_component_id 
             AND s.status = 'active'
        LEFT JOIN
            classcomponent c 
              ON s.component_id = c.component_id 
             AND c.status = 'active'
        WHERE
            clb.course_id = ${course_id} AND clb.status = 'active'
    `;

    query += ` ORDER BY clb.created_at DESC `;

    return query;
}

global.Leaderboard_object = {
    "versions": {
        "versionData": [
            {
                "*": {
                    "steps": [
                        {
                            "config": {
                                "features": {
                                    "multistep": false,
                                    "parameters": true,
                                    "pagination": false,
                                },
                                "communication": {
                                    "encryption": {
                                        "platformEncryption": true,
                                        "accessToken": true
                                      },                                },
                                "verification": {
                                    "otp": false,
                                    "accessToken": false
                                }
                            },
                            "data": {
                                "parameters": {
                                    "fields": []
                                },
                                "apiInfo": {
                                    "preProcessFunction": [],
                                    "query": {
                                        "queryNature": "single-step",
                                        "queryPayload": getCourseLeaderboards,
                                        "database": "projectDB"
                                    },
                                    "postProcessFunction": async (req, decryptedPayload) => {
                                        const data = [];
                                        let results = decryptedPayload.objectResolverOutput
                                        results?.forEach(item => {
                                            const existingEntry = data.find(entry => entry.CourseLeaderboardId === item.CourseLeaderboardId);

                                            const subComponent = {
                                                SubComponentId: item.SubComponentId,
                                                ComponentName: item.ComponentName,
                                                SubComponentNum: item.SubComponentNum,
                                                SubcomponentPercentage: item.SubcomponentPercentage,
                                                ComponentId: item.ComponentID,
                                            };

                                            if (existingEntry) {
                                                existingEntry.SubComponentData.push(subComponent);
                                            } else {
                                                data.push({
                                                    CourseId: item.CourseId,
                                                    CourseLeaderboardId: item.CourseLeaderboardId,
                                                    LeaderboardName: item.LeaderboardName,
                                                    NumberOfPositions: item.NumberOfPositions,
                                                    status: item.status,
                                                    createdAt: item.createdAt,
                                                    updatedAt: item.updatedAt,
                                                    SubComponentData: [subComponent]
                                                });
                                            }
                                        });

                                        const sanitizedData = data.map(entry => ({
                                            ...entry,
                                            SubComponentData: Array.isArray(entry.SubComponentData)
                                                ? entry.SubComponentData
                                                : Object.values(entry.SubComponentData),
                                        }));

                                        return sanitizedData;
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
                                "successMessage": "Leaderboards retrieved successfully!",
                                "errorMessage": "There was an error retrieving leaderboards."
                            }
                        }
                    ]
                },
            }
        ]
    }
};

module.exports = { Leaderboard_object };







