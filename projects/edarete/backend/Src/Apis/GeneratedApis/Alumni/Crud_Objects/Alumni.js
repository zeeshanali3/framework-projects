/* CRUD Objects for table: alumni */

      const parameters = require('./CRUD_parameters');
      global.CrudAlumni_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO alumni (urdd_id, graduating_year, employement_detail, created_by, updated_by) VALUES ({{alumni_urddId}}, {{alumni_graduatingYear}}, {{alumni_employementDetail}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE alumni SET urdd_id = {{alumni_urddId}}, graduating_year = {{alumni_graduatingYear}}, employement_detail = {{alumni_employementDetail}} WHERE alumni_id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, alumni.alumni_id as alumni_id, alumni.alumni_id as id, alumni.alumni_id as alumni_alumniId,alumni.urdd_id as alumni_urddId,alumni.graduating_year as alumni_graduatingYear,alumni.employement_detail as alumni_employementDetail,alumni.status as alumni_status,alumni.created_by as alumni_createdBy,alumni.updated_by as alumni_updatedBy,alumni.created_at as alumni_createdAt,alumni.updated_at as alumni_updatedAt FROM alumni  Where alumni.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT alumni.alumni_id as alumni_id, alumni.alumni_id as id, alumni.alumni_id as alumni_alumniId,alumni.urdd_id as alumni_urddId,alumni.graduating_year as alumni_graduatingYear,alumni.employement_detail as alumni_employementDetail,alumni.status as alumni_status,alumni.created_by as alumni_createdBy,alumni.updated_by as alumni_updatedBy,alumni.created_at as alumni_createdAt,alumni.updated_at as alumni_updatedAt FROM alumni  WHERE alumni_id = {{id}} OR alumni_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE alumni SET status = 'inactive' WHERE alumni_id = {{id}}"},           
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
                        permission: { Add: "add_alumni", View: "view_alumni", Update: "update_alumni", Delete: "delete_alumni", List: "list_alumni" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Alumni CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Alumni.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudAlumni_object}