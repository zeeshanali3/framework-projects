/* CRUD Objects for table: referrals */
      
      const parameters = require('./CRUD_parameters');
      global.CrudReferrals_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO referrals (referrer_urdd_id, referred_urdd_id, referral_code, reward_credits, completed_at, created_by, updated_by) VALUES ({{referrals_referrerUrddId}}, {{referrals_referredUrddId}}, {{referrals_referralCode}}, {{referrals_rewardCredits}}, {{referrals_completedAt}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE referrals SET referrer_urdd_id = {{referrals_referrerUrddId}}, referred_urdd_id = {{referrals_referredUrddId}}, referral_code = {{referrals_referralCode}}, reward_credits = {{referrals_rewardCredits}}, completed_at = {{referrals_completedAt}} WHERE id = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, referrals.id as referrals_id, referrals.id as id, referrals.id as referrals_id,referrals.referrer_urdd_id as referrals_referrerUrddId,referrals.referred_urdd_id as referrals_referredUrddId,referrals.referral_code as referrals_referralCode,referrals.reward_credits as referrals_rewardCredits,referrals.completed_at as referrals_completedAt,referrals.created_by as referrals_createdBy,referrals.updated_by as referrals_updatedBy,referrals.status as referrals_status,referrals.created_at as referrals_createdAt,referrals.updated_at as referrals_updatedAt FROM referrals  Where referrals.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT referrals.id as referrals_id, referrals.id as id, referrals.id as referrals_id,referrals.referrer_urdd_id as referrals_referrerUrddId,referrals.referred_urdd_id as referrals_referredUrddId,referrals.referral_code as referrals_referralCode,referrals.reward_credits as referrals_rewardCredits,referrals.completed_at as referrals_completedAt,referrals.created_by as referrals_createdBy,referrals.updated_by as referrals_updatedBy,referrals.status as referrals_status,referrals.created_at as referrals_createdAt,referrals.updated_at as referrals_updatedAt FROM referrals  WHERE id = {{id}} OR id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE referrals SET status = 'inactive' WHERE id = {{id}}"},           
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
                        permission: { Add: "add_referrals", View: "view_referrals", Update: "update_referrals", Delete: "delete_referrals", List: "list_referrals" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Referrals CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Referrals.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudReferrals_object}