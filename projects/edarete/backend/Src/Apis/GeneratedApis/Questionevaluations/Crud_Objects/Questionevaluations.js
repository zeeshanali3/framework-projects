/* CRUD Objects for table: questionevaluations */
      
      const parameters = require('./CRUD_parameters');
      global.CrudQuestionevaluations_object = {
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
                            Add: async(req, decryptedPayload) => { return "INSERT INTO questionevaluations (enrollement_id, question_id, student_answer, obtained_marks, created_by, updated_by) VALUES ({{questionevaluations_enrollementId}}, {{questionevaluations_questionId}}, {{questionevaluations_studentAnswer}}, {{questionevaluations_obtainedMarks}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE questionevaluations SET enrollement_id = {{questionevaluations_enrollementId}}, question_id = {{questionevaluations_questionId}}, student_answer = {{questionevaluations_studentAnswer}}, obtained_marks = {{questionevaluations_obtainedMarks}} WHERE question_evaluation_id = {{id}}"},
List: async(req, decryptedPayload) => { 
  return `SELECT 
    COUNT(*) OVER () AS table_count, 
    questionevaluations.question_evaluation_id as questionevaluations_id, 
    questionevaluations.question_evaluation_id as id, 
    questionevaluations.question_evaluation_id as questionevaluations_questionEvaluationId,
    questionevaluations.enrollement_id as questionevaluations_enrollementId,
    questionevaluations.question_id as questionevaluations_questionId,
    questionevaluations.student_answer as questionevaluations_studentAnswer,
    questionevaluations.obtained_marks as questionevaluations_obtainedMarks,
    questionevaluations.status as questionevaluations_status,
    questionevaluations.created_by as questionevaluations_createdBy,
    questionevaluations.updated_by as questionevaluations_updatedBy,
    questionevaluations.created_at as questionevaluations_createdAt,
    questionevaluations.updated_at as questionevaluations_updatedAt,
    questionevaluations.test_results as questionevaluations_testResults,
    u.first_name as questionevaluations_studentName,
    u.email as questionevaluations_studentEmail,
    SUBSTRING_INDEX(u.email, '@', 1) as questionevaluations_studentRollNumber
  FROM questionevaluations
  LEFT JOIN enrollements e ON questionevaluations.enrollement_id = e.enrollement_id
  LEFT JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
  LEFT JOIN students s ON ss.student_user_id = s.student_user_id
  LEFT JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
  LEFT JOIN users u ON urdd.user_id = u.user_id
  WHERE questionevaluations.status != 'inactive'`
},                          View: async(req, decryptedPayload) => { return "SELECT questionevaluations.question_evaluation_id as questionevaluations_id, questionevaluations.question_evaluation_id as id, questionevaluations.question_evaluation_id as questionevaluations_questionEvaluationId,questionevaluations.enrollement_id as questionevaluations_enrollementId,questionevaluations.question_id as questionevaluations_questionId,questionevaluations.student_answer as questionevaluations_studentAnswer,questionevaluations.obtained_marks as questionevaluations_obtainedMarks,questionevaluations.test_results as questionevaluations_testResults,questionevaluations.status as questionevaluations_status,questionevaluations.created_by as questionevaluations_createdBy,questionevaluations.updated_by as questionevaluations_updatedBy,questionevaluations.created_at as questionevaluations_createdAt,questionevaluations.updated_at as questionevaluations_updatedAt FROM questionevaluations  WHERE question_evaluation_id = {{id}} OR question_evaluation_id IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE questionevaluations SET status = 'inactive' WHERE question_evaluation_id = {{id}}"},           
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
                        permission: { Add: "add_questionevaluations", View: "view_questionevaluations", Update: "update_questionevaluations", Delete: "delete_questionevaluations", List: "list_questionevaluations" },
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "Questionevaluations CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve Questionevaluations.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {CrudQuestionevaluations_object}