/* CRUD Objects for table: courseleaderboardsubcomponents */
      
      const parameters = require('./CRUD_parameters');
      global.CrudCourseleaderboardsubcomponents_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO courseleaderboardsubcomponents (course_leaderboard_id, sub_component_id, subcomponent_percentage, created_by, updated_by) VALUES ({{courseleaderboardsubcomponents_courseLeaderboardId}}, {{courseleaderboardsubcomponents_subComponentId}}, {{courseleaderboardsubcomponents_subcomponentPercentage}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE courseleaderboardsubcomponents SET course_leaderboard_id = {{courseleaderboardsubcomponents_courseLeaderboardId}}, sub_component_id = {{courseleaderboardsubcomponents_subComponentId}}, subcomponent_percentage = {{courseleaderboardsubcomponents_subcomponentPercentage}} WHERE course_leaderboard_subcomponent_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId,courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId,courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId,courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage,courseleaderboardsubcomponents.status as courseleaderboardsubcomponents_status,courseleaderboardsubcomponents.created_by as courseleaderboardsubcomponents_createdBy,courseleaderboardsubcomponents.updated_by as courseleaderboardsubcomponents_updatedBy,courseleaderboardsubcomponents.created_at as courseleaderboardsubcomponents_createdAt,courseleaderboardsubcomponents.updated_at as courseleaderboardsubcomponents_updatedAt, courseleaderboards.leaderboard_name as courseleaderboards_leaderboardName FROM courseleaderboardsubcomponents LEFT JOIN courseleaderboards ON courseleaderboardsubcomponents.course_leaderboard_id = courseleaderboards.course_leaderboard_id Where courseleaderboardsubcomponents.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as id, courseleaderboardsubcomponents.course_leaderboard_subcomponent_id as courseleaderboardsubcomponents_courseLeaderboardSubcomponentId,courseleaderboardsubcomponents.course_leaderboard_id as courseleaderboardsubcomponents_courseLeaderboardId,courseleaderboardsubcomponents.sub_component_id as courseleaderboardsubcomponents_subComponentId,courseleaderboardsubcomponents.subcomponent_percentage as courseleaderboardsubcomponents_subcomponentPercentage,courseleaderboardsubcomponents.status as courseleaderboardsubcomponents_status,courseleaderboardsubcomponents.created_by as courseleaderboardsubcomponents_createdBy,courseleaderboardsubcomponents.updated_by as courseleaderboardsubcomponents_updatedBy,courseleaderboardsubcomponents.created_at as courseleaderboardsubcomponents_createdAt,courseleaderboardsubcomponents.updated_at as courseleaderboardsubcomponents_updatedAt, courseleaderboards.leaderboard_name as courseleaderboards_leaderboardName FROM courseleaderboardsubcomponents LEFT JOIN courseleaderboards ON courseleaderboardsubcomponents.course_leaderboard_id = courseleaderboards.course_leaderboard_id WHERE course_leaderboard_subcomponent_id = {{id}} OR course_leaderboard_subcomponent_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE courseleaderboardsubcomponents SET status = 'inactive' WHERE course_leaderboard_subcomponent_id = {{id}}"},           
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
                        permission: { Add: "add_courseleaderboardsubcomponents", View: "view_courseleaderboardsubcomponents", Update: "update_courseleaderboardsubcomponents", Delete: "delete_courseleaderboardsubcomponents", List: "list_courseleaderboardsubcomponents" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Courseleaderboardsubcomponents CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Courseleaderboardsubcomponents.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudCourseleaderboardsubcomponents_object}