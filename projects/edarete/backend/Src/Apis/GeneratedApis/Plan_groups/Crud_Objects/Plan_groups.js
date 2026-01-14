/* CRUD Objects for table: plan_groups */
      
      const parameters = require('./CRUD_parameters');
      global.CrudPlan_groups_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO plan_groups (plan_id, permission_group_id, created_by, updated_by) VALUES ({{planGroups_planId}}, {{planGroups_permissionGroupId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE plan_groups SET plan_id = {{planGroups_planId}}, permission_group_id = {{planGroups_permissionGroupId}} WHERE plan_group_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, plan_groups.plan_group_id as planGroups_id, plan_groups.plan_group_id as id, plan_groups.plan_group_id as planGroups_planGroupId,plan_groups.plan_id as planGroups_planId,plan_groups.permission_group_id as planGroups_permissionGroupId,plan_groups.created_by as planGroups_createdBy,plan_groups.updated_by as planGroups_updatedBy,plan_groups.status as planGroups_status,plan_groups.created_at as planGroups_createdAt,plan_groups.updated_at as planGroups_updatedAt FROM plan_groups  Where plan_groups.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT plan_groups.plan_group_id as planGroups_id, plan_groups.plan_group_id as id, plan_groups.plan_group_id as planGroups_planGroupId,plan_groups.plan_id as planGroups_planId,plan_groups.permission_group_id as planGroups_permissionGroupId,plan_groups.created_by as planGroups_createdBy,plan_groups.updated_by as planGroups_updatedBy,plan_groups.status as planGroups_status,plan_groups.created_at as planGroups_createdAt,plan_groups.updated_at as planGroups_updatedAt FROM plan_groups  WHERE plan_group_id = {{id}} OR plan_group_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE plan_groups SET status = 'inactive' WHERE plan_group_id = {{id}}"},           
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
                        permission: { Add: "add_plan_groups", View: "view_plan_groups", Update: "update_plan_groups", Delete: "delete_plan_groups", List: "list_plan_groups" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Plan_groups CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Plan_groups.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudPlan_groups_object}