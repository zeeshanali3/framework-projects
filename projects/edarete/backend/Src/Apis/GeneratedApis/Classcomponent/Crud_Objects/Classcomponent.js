/* CRUD Objects for table: classcomponent */
      
      const parameters = require('./CRUD_parameters');
      global.CrudClasscomponent_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO classcomponent (course_id, component_type, component_name, weightage, component_policy, created_by, updated_by) VALUES ({{classcomponent_courseId}}, {{classcomponent_componentType}}, {{classcomponent_componentName}}, {{classcomponent_weightage}}, {{classcomponent_componentPolicy}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE classcomponent SET course_id = {{classcomponent_courseId}}, component_type = {{classcomponent_componentType}}, component_name = {{classcomponent_componentName}}, weightage = {{classcomponent_weightage}}, component_policy = {{classcomponent_componentPolicy}} WHERE component_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, classcomponent.component_id as classcomponent_id, classcomponent.component_id as id, classcomponent.component_id as classcomponent_componentId,classcomponent.course_id as classcomponent_courseId,classcomponent.component_type as classcomponent_componentType,classcomponent.component_name as classcomponent_componentName,classcomponent.weightage as classcomponent_weightage,classcomponent.component_policy as classcomponent_componentPolicy,classcomponent.status as classcomponent_status,classcomponent.created_by as classcomponent_createdBy,classcomponent.updated_by as classcomponent_updatedBy,classcomponent.created_at as classcomponent_createdAt,classcomponent.updated_at as classcomponent_updatedAt FROM classcomponent  Where classcomponent.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT classcomponent.component_id as classcomponent_id, classcomponent.component_id as id, classcomponent.component_id as classcomponent_componentId,classcomponent.course_id as classcomponent_courseId,classcomponent.component_type as classcomponent_componentType,classcomponent.component_name as classcomponent_componentName,classcomponent.weightage as classcomponent_weightage,classcomponent.component_policy as classcomponent_componentPolicy,classcomponent.status as classcomponent_status,classcomponent.created_by as classcomponent_createdBy,classcomponent.updated_by as classcomponent_updatedBy,classcomponent.created_at as classcomponent_createdAt,classcomponent.updated_at as classcomponent_updatedAt FROM classcomponent  WHERE component_id = {{id}} OR component_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE classcomponent SET status = 'inactive' WHERE component_id = {{id}}"},           
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
                        // permission: { Add: "add_classcomponent", View: "view_classcomponent", Update: "update_classcomponent", Delete: "delete_classcomponent", List: "list_classcomponent" },
                        // providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Classcomponent CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Classcomponent.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudClasscomponent_object}