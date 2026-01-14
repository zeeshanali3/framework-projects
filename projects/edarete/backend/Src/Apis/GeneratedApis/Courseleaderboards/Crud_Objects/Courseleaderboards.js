/* CRUD Objects for table: courseleaderboards */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCourseleaderboards_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {                      
                        platformIP : ['*'],
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                              accessToken: true
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO courseleaderboards (course_id, leaderboard_name, number_of_positions, created_by, updated_by) VALUES ({{courseleaderboards_courseId}}, {{courseleaderboards_leaderboardName}}, {{courseleaderboards_numberOfPositions}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE courseleaderboards SET course_id = {{courseleaderboards_courseId}}, leaderboard_name = {{courseleaderboards_leaderboardName}}, number_of_positions = {{courseleaderboards_numberOfPositions}} WHERE course_leaderboard_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, courseleaderboards.course_leaderboard_id as courseleaderboards_id, courseleaderboards.course_leaderboard_id as id, courseleaderboards.course_leaderboard_id as courseleaderboards_courseLeaderboardId,courseleaderboards.course_id as courseleaderboards_courseId,courseleaderboards.leaderboard_name as courseleaderboards_leaderboardName,courseleaderboards.number_of_positions as courseleaderboards_numberOfPositions,courseleaderboards.status as courseleaderboards_status,courseleaderboards.created_by as courseleaderboards_createdBy,courseleaderboards.updated_by as courseleaderboards_updatedBy,courseleaderboards.created_at as courseleaderboards_createdAt,courseleaderboards.updated_at as courseleaderboards_updatedAt FROM courseleaderboards  Where courseleaderboards.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT courseleaderboards.course_leaderboard_id as courseleaderboards_id, courseleaderboards.course_leaderboard_id as id, courseleaderboards.course_leaderboard_id as courseleaderboards_courseLeaderboardId,courseleaderboards.course_id as courseleaderboards_courseId,courseleaderboards.leaderboard_name as courseleaderboards_leaderboardName,courseleaderboards.number_of_positions as courseleaderboards_numberOfPositions,courseleaderboards.status as courseleaderboards_status,courseleaderboards.created_by as courseleaderboards_createdBy,courseleaderboards.updated_by as courseleaderboards_updatedBy,courseleaderboards.created_at as courseleaderboards_createdAt,courseleaderboards.updated_at as courseleaderboards_updatedAt FROM courseleaderboards  WHERE course_leaderboard_id = {{id}} OR course_leaderboard_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE courseleaderboards SET status = 'inactive' WHERE course_leaderboard_id = {{id}}"},           
                            database: "mainDb"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: { Add: "add_courseleaderboards", View: "view_courseleaderboards", Update: "update_courseleaderboards", Delete: "delete_courseleaderboards", List: "list_courseleaderboards" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Courseleaderboards CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Courseleaderboards.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCourseleaderboards_object}