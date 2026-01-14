/* CRUD Objects for table: subcomponentmarks */
      
      const parameters = require('./CRUD_parameters');
      global.CrudSubcomponentmarks_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO subcomponentmarks (sub_component_id, enrollment_id, obtained_marks, out_of_marks, created_by, updated_by) VALUES ({{subcomponentmarks_subComponentId}}, {{subcomponentmarks_enrollmentId}}, {{subcomponentmarks_obtainedMarks}}, {{subcomponentmarks_outOfMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE subcomponentmarks SET sub_component_id = {{subcomponentmarks_subComponentId}}, enrollment_id = {{subcomponentmarks_enrollmentId}}, obtained_marks = {{subcomponentmarks_obtainedMarks}}, out_of_marks = {{subcomponentmarks_outOfMarks}} WHERE sub_component_mark_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, subcomponents.sub_component_num, subcomponents.text, subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, subcomponentmarks.sub_component_mark_id as id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_subComponentMarkId,subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId,subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId,subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks,subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks,subcomponentmarks.status as subcomponentmarks_status,subcomponentmarks.created_by as subcomponentmarks_createdBy,subcomponentmarks.updated_by as subcomponentmarks_updatedBy,subcomponentmarks.created_at as subcomponentmarks_createdAt,subcomponentmarks.updated_at as subcomponentmarks_updatedAt, enrollements.group_name as enrollements_groupName FROM subcomponentmarks LEFT JOIN enrollements ON subcomponentmarks.enrollment_id = enrollements.enrollement_id LEFT JOIN subcomponents ON subcomponents.sub_component_id = subcomponentmarks.sub_component_id Where subcomponentmarks.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT subcomponentmarks.sub_component_mark_id as subcomponentmarks_id, subcomponentmarks.sub_component_mark_id as id, subcomponentmarks.sub_component_mark_id as subcomponentmarks_subComponentMarkId,subcomponentmarks.sub_component_id as subcomponentmarks_subComponentId,subcomponentmarks.enrollment_id as subcomponentmarks_enrollmentId,subcomponentmarks.obtained_marks as subcomponentmarks_obtainedMarks,subcomponentmarks.out_of_marks as subcomponentmarks_outOfMarks,subcomponentmarks.status as subcomponentmarks_status,subcomponentmarks.created_by as subcomponentmarks_createdBy,subcomponentmarks.updated_by as subcomponentmarks_updatedBy,subcomponentmarks.created_at as subcomponentmarks_createdAt,subcomponentmarks.updated_at as subcomponentmarks_updatedAt, enrollements.group_name as enrollements_groupName FROM subcomponentmarks LEFT JOIN enrollements ON subcomponentmarks.enrollment_id = enrollements.enrollement_id WHERE sub_component_mark_id = {{id}} OR sub_component_mark_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE subcomponentmarks SET status = 'inactive' WHERE sub_component_mark_id = {{id}}"},           
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
                        // permission: { Add: "add_subcomponentmarks", View: "view_subcomponentmarks", Update: "update_subcomponentmarks", Delete: "delete_subcomponentmarks", List: "list_subcomponentmarks" },
                        permission: { Add: "add_subcomponentmarks", View: "view_subcomponentmarks", Update: "update_subcomponentmarks", Delete: "delete_subcomponentmarks", List: "list_subcomponentmarks" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Subcomponentmarks CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Subcomponentmarks.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudSubcomponentmarks_object}