/* CRUD Objects for table: designations */
      
      const parameters = require('./CRUD_parameters');
      global.CrudDesignations_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO designations (designation_name, senior_designation_id, created_by, updated_by) VALUES ({{designations_designationName}}, {{designations_seniorDesignationId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE designations SET designation_name = {{designations_designationName}}, senior_designation_id = {{designations_seniorDesignationId}} WHERE designation_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, designations.designation_id as designations_id, designations.designation_id as id, designations.designation_id as designations_designationId,designations.designation_name as designations_designationName,designations.senior_designation_id as designations_seniorDesignationId,designations.created_by as designations_createdBy,designations.updated_by as designations_updatedBy,designations.status as designations_status,designations.created_at as designations_createdAt,designations.updated_at as designations_updatedAt FROM designations  Where designations.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT designations.designation_id as designations_id, designations.designation_id as id, designations.designation_id as designations_designationId,designations.designation_name as designations_designationName,designations.senior_designation_id as designations_seniorDesignationId,designations.created_by as designations_createdBy,designations.updated_by as designations_updatedBy,designations.status as designations_status,designations.created_at as designations_createdAt,designations.updated_at as designations_updatedAt FROM designations  WHERE designation_id = {{id}} OR designation_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE designations SET status = 'inactive' WHERE designation_id = {{id}}"},           
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
                        permission: { Add: "add_designations", View: "view_designations", Update: "update_designations", Delete: "delete_designations", List: "list_designations" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Designations CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Designations.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudDesignations_object}