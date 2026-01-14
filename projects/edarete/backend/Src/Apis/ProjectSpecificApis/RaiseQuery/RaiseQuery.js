const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");
const {projectDB} = require('../../../../Services/Integrations/Database/projectDb');
const { getSocketService } = require('../../../../Services/Integrations/Socket/SocketRegistration');


async function raiseQuery(req, decryptedPayload) {
     try {
        let labId = decryptedPayload?.labId;
        labId = String(labId);
        const actionPerformerURDD = decryptedPayload?.actionPerformerURDD 
        const { labSocketService } = global.socketComponents;
        // Validate required fields
        if (!labId || !actionPerformerURDD) {
            throw new Error('Missing required fields: labId and participantData are required');
        }

        getSocketService('lab').emitToRoom(roomId, 'new-query', payload);

        // If you need to save the query to the database, you can do it here
        // const query = `INSERT INTO lab_queries (lab_id, participant_data, query_data) VALUES (?, ?, ?)`;
        // await executeQuery(query, [labId, JSON.stringify(participantData), JSON.stringify(queryData)]);

        return {
            success: true,
            message: 'Query raised successfully'
        };
    } catch (error) {
        console.error('Error raising query:', error);
        throw error; // This will be caught by the API framework
    }
   
}
  

global.Raisequery_object = {
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
                                postProcessFunction: raiseQuery
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "PUT",
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
module.exports = { Raisequery_object };