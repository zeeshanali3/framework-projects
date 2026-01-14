
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");


   async function getAndEmitQuestions(subComponentId, socket, io, sendtosingleuser = false, participant, subComponentType) {
    try {
      const subComponentQuery = `SELECT * from subcomponents where sub_component_id = ?`;
      const subComponentResults = await executeQuery(subComponentQuery, subComponentId);
      if (!subComponentResults || subComponentResults.length === 0) {
        socket.emit("error", "No Subcomponent available.");
        throw new Error("No Subcomponent available");
      }
  
      const quiz = subComponentResults[0];
  
      let quizConfig = {};
      try {
        quizConfig = quiz.config ? JSON.parse(quiz.config) : {};
      } catch (err) {
        logMessage(["Invalid JSON in quiz config:", err]);
        throw new Error("Invalid JSON in quiz config");
      }
  
      // ✅ Fetch all questions (without is_template since it doesn't exist in DB)
      const questionQuery = `
        SELECT COUNT(*) OVER () AS table_count, question_id, cloid, sub_component_id,
              question_num, description, question_marks, lectures_topic_id, status,
              created_by, updated_by, created_at, updated_at, config
        FROM questions 
        WHERE sub_component_id = ? AND status = 'active'
      `;
      let allQuestions = await executeQuery(questionQuery, subComponentId);
      console.log("All Questions Fetched:", allQuestions);
      
      // ✅ Check if template questions exist (based on description only)
      const templateQuestionsList = [
        '1. Realization of Experiment',
        '2. Conducting Experiment',
        '3. Computer Use',
        '4. Teamwork',
        '5. Laboratory Safety and Disciplinary Rules',
        '6. Data Collection',
        '7. Data Analysis',
      ];
      
      const hasTemplateQuestion = allQuestions && allQuestions.length > 0 
        ? allQuestions.some(q => templateQuestionsList.includes(q.description))
        : false;
  
      // ✅ Filter out template questions for frontend (based on description only)
      const questions = allQuestions && allQuestions.length > 0
        ? allQuestions.filter(q => !templateQuestionsList.includes(q.description))
        : [];
  
      // ✅ Only throw error if no questions exist at all after filtering non-templates
      if (questions.length === 0 && !hasTemplateQuestion) {
        socket.emit("error", "No questions registered against this quiz");
        throw new Error("No questions registered against this quiz");
      }
  
      let previousAnswer = null;
      if (sendtosingleuser) {
        const submittedQuestions = await getPreviousSubmittedAnswers(subComponentId, socket.participant);
        if (submittedQuestions && submittedQuestions.length > 0) {
          previousAnswer = submittedQuestions[0].student_answer;
        }
      }
  
      // ✅ Process non-template questions
      for (let q of questions) {
        try {
          const optionsQuery = `SELECT options FROM questionssolution WHERE question_id = ?`;
          const optionsResult = await executeQuery(optionsQuery, [q.question_id]);
  
          if (optionsResult?.length > 0) {
            try {
              q.options = JSON.parse(optionsResult[0].options);
            } catch (err) {
              logMessage(["Invalid JSON in options for question_id:", q.question_id, err]);
              throw new Error("Invalid JSON in options for question_id");
            }
          } else {
            q.options = [];
          }
          
          if (q.config) {
            try {
              const parsed = JSON.parse(q.config);
              if (Array.isArray(parsed)) {
                q.config = parsed;
              } else {
                q.config = Object.entries(parsed).map(([key, value]) => ({
                  [key]: value
                }));
              }
            } catch (err) {
              logMessage(["Invalid JSON in quiz config:", err.message]);
              throw new Error("Invalid JSON in quiz config");
            }
          } else {
            q.config = {};
          }
        } catch (err) {
          logMessage(["Error fetching options for question_id:", q.question_id, err]);
          throw new Error("Error fetching options for question_id");
        }
      }
  
      // ✅ Emit quiz start with filtered questions (only if non-template questions exist)
      const total_questions = questions.length; // Count only non-template questions
      
      if (questions.length > 0) {
        const labStartedPayload = {
          quizName: quiz.sub_component_num,
          totalQuestions: total_questions,
          description: quiz.text,
          subComponentId: quiz.sub_component_id,
          questionIndex: 0,
          currentQuestion: questions[0],
          allQuestions: questions, // Only non-template questions
          previousAnswer: previousAnswer,
          templateQuestion: hasTemplateQuestion // ✅ Flag indicating if template exists
        };
        
        logMessage(["Questions to send (filtered):", questions.length, "Template exists:", hasTemplateQuestion]);
        
        const roomSockets = await io.in(subComponentId).fetchSockets();
        logMessage([`Number of connections in room ${subComponentId}:`, roomSockets.length]);
        
        if (sendtosingleuser) {
          socket.emit("subComponent-started", { 
            message: "Lab started successfully",
            totalQuestions: total_questions,
            subComponentStartedPayload: labStartedPayload,
            subComponent: subComponentType,
          });
        } else {
          io.to(subComponentId).emit("subComponent-started", { 
            message: "Lab started successfully",
            totalQuestions: total_questions,
            subComponentStartedPayload: labStartedPayload,
            subComponent: subComponentType
          });
        }
      } else {
        logMessage(["No non-template questions to send, only templates exist. Template exists:", hasTemplateQuestion]);
      }
      
      return { 
        success: true, 
        questions, // Filtered questions
        templateQuestion: hasTemplateQuestion 
      };
  
    } catch (err) {
      logMessage(["Unexpected error in getAndEmitQuestions:", err]);
      throw new Error("Unexpected error in getAndEmitQuestions");
    } 
  }



  async function isHost(subComponentId, hostUrdd) {
  try {
    const verifyHostQuery = `
      SELECT created_by 
      FROM subcomponents 
      WHERE sub_component_id = ?
      LIMIT 1
    `;

    const quizData = await executeQuery(verifyHostQuery, [subComponentId]);

    if (!quizData || quizData.length === 0) {
      console.warn(`No quiz found with ID ${subComponentId}`);
      return false;
    }

    const createdBy = quizData[0].created_by;
    return createdBy === hostUrdd;

  } catch (error) {
    logMessage(["Error in isHost:", error]);
    throw new Error("Error in isHost");
  }
}



    
  async function allParticipantsInCourse(subComponentId) {
    try {
      const totalStudentsInCourseQuery = `
      SELECT s.urdd_id, u.email, CONCAT(u.first_name, ' ', u.last_name) AS name, r.role_name AS role from subcomponents
      LEFT JOIN classcomponent cc ON cc.component_id = subcomponents.component_id
      LEFT JOIN courses c ON c.course_id = cc.course_id
      LEFT JOIN enrollements e ON e.course_id = c.course_id
      LEFT JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
      LEFT JOIN students s ON s.student_user_id = ss.student_user_id
      LEFT JOIN user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
      LEFT JOIN roles_designations_department rdd ON rdd.role_designation_department_id = urdd.role_designation_department_id
      LEFT JOIN roles r ON r.role_id = rdd.role_id
      LEFT JOIN users u ON u.user_id = urdd.user_id
      WHERE subcomponents.sub_component_id = ? AND e.status = 'active'
      `;
      const result = await executeQuery(totalStudentsInCourseQuery, [subComponentId]);
      return result;
    } catch (err) {
      logMessage(["Failed to get all participants of course:", err]);
      throw new Error("Failed to get all participants of course");
    }
  }


  async function getPresentParticipants(subComponentId) {
    try {
      const totalStudentsPresentQuery = `
      SELECT DISTINCT
      s.urdd_id,
      CONCAT(u.first_name, ' ', u.last_name) AS name,
      u.email,
      r.role_name AS role
      FROM lecturesattendance la
      JOIN enrollements e ON e.enrollement_id = la.enrollement_id
      JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
      JOIN students s ON s.student_user_id = ss.student_user_id
      JOIN user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
      JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
      JOIN roles r ON r.role_id = rdd.role_id
      JOIN users u ON u.user_id = urdd.user_id
      WHERE la.sub_component_id = ?
      `;
      const result = await executeQuery(totalStudentsPresentQuery, [subComponentId]);
      return result;
    } catch (err) {
      logMessage(["Failed to get present participants of course", err]);
      throw new Error("Failed to get present participants of course");
    }
  
  }


  async function submitAnswer( socket, answer, testResults, participant, subComponentId, course_id, urdd) {
    try {

      // ✅ Get enrollment ID safely with parameterized query (excluding template questions)
      const templateQuestionsList = [
        '1. Realization of Experiment',
        '2. Conducting Experiment',
        '3. Computer Use',
        '4. Teamwork',
        '5. Laboratory Safety and Disciplinary Rules',
        '6. Data Collection',
        '7. Data Analysis',
      ];
      
      const getSubcomponentQuestions = `Select question_id, question_marks, description from questions where sub_component_id = ? AND status = 'active'`;
      const allSubcomponentQuestions = await executeQuery(getSubcomponentQuestions, [subComponentId]);
      
      // ✅ Filter out template questions
      const getSubcomponentQuestionsResult = allSubcomponentQuestions && allSubcomponentQuestions.length > 0
        ? allSubcomponentQuestions.filter(q => !templateQuestionsList.includes(q.description))
        : [];
      
      if (!getSubcomponentQuestionsResult || getSubcomponentQuestionsResult.length === 0) {
        throw new Error("No non-template questions found for this subcomponent");
      }
      // const studentEnrollmentId = enrollmentRows[0].enrollement_id;   
  
      // ✅ Get enrollment ID safely with parameterized query
      const getEnrollmentIdQuery = `
      SELECT enrollement_id 
      FROM enrollements e
      JOIN courses c ON e.course_id = c.course_id
      JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
      JOIN students s ON ss.student_user_id = s.student_user_id
      WHERE s.urdd_id = ? AND e.course_id = ?
      `;
      const enrollmentRow = await executeQuery(getEnrollmentIdQuery, [participant.urdd, course_id]);
      if (!enrollmentRow || enrollmentRow.length === 0) {
        throw new Error("Enrollment not found for participant");
      }
      const studentEnrollmentId = enrollmentRow[0].enrollement_id;
  
      // ✅ Stringify testResults ONCE at the beginning
      const stringifiedTestResults = testResults ? JSON.stringify(testResults) : null;
      
      logMessage(["Test Results:", testResults]);
      logMessage(["Stringified Test Results:", stringifiedTestResults]);
  
      // ✅ Check if answer is submitted already - include description to filter templates
      const previousAnswerCheck = `
        SELECT qe.question_evaluation_id, q.question_id, q.description 
        FROM questionevaluations qe 
        LEFT JOIN questions q ON q.question_id = qe.question_id
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id
        WHERE qe.enrollement_id = ? AND sc.sub_component_id = ?
      `;
      const previousAnswerCheckValues = [studentEnrollmentId, subComponentId];
      const previousAnswerCheckResult = await executeQuery(previousAnswerCheck, previousAnswerCheckValues);
      
      // ✅ Filter out template questions from previous answers
      const filteredPreviousAnswers = previousAnswerCheckResult && previousAnswerCheckResult.length > 0
        ? previousAnswerCheckResult.filter(ans => !templateQuestionsList.includes(ans.description))
        : [];
      
      if(filteredPreviousAnswers && filteredPreviousAnswers.length > 0){
        // ✅ UPDATE existing answers
        for(let i = 0 ; i < filteredPreviousAnswers.length ; i++){
          if(filteredPreviousAnswers[i].question_evaluation_id){
            let questionEvaluation = filteredPreviousAnswers[i].question_evaluation_id;
            
            // ✅ Calculate percentage (0-1 range) for UPDATE
            let percentage = 0;
            
            if (testResults) {
              if (testResults.compileError === true) {
                percentage = 0;
              } else {
                let passed = testResults.passed || 0;
                let failed = testResults.failed || 0;
                let total = passed + failed;
                
                if (total > 0) {
                  percentage = passed / total; // Percentage as 0-1 (e.g., 0.75 for 75%)
                }
              }
            }
            
            logMessage(["UPDATE - Percentage (0-1):", percentage]);
            
            const updateAnswersQuery = `
              UPDATE questionevaluations 
              SET student_answer = ?, 
                  obtained_marks = ?, 
                  test_results = ?,
                  updated_by = ?, 
                  updated_at = NOW() 
              WHERE enrollement_id = ? AND question_evaluation_id = ?
            `;
            const updateAnswersQueryValues = [
              answer, 
              percentage.toString(), // Save percentage (0-1) as string in varchar(255)
              stringifiedTestResults, 
              participant.urdd, 
              studentEnrollmentId, 
              questionEvaluation
            ];
            await executeQuery(updateAnswersQuery, updateAnswersQueryValues);
            
            logMessage([`Answer updated for question_evaluation_id: ${questionEvaluation}`]);
          }
        }
      }
      else{
        // ✅ INSERT new answers
        for(let i = 0 ; i < getSubcomponentQuestionsResult.length ; i ++){
          if(getSubcomponentQuestionsResult[i].question_id){
            let questionId = getSubcomponentQuestionsResult[i].question_id;
            let questionMarks = getSubcomponentQuestionsResult[i].question_marks;
            
            // ✅ Calculate percentage (0-1 range) for INSERT
            let percentage = 0;
            
            if (testResults) {
              if (testResults.compileError === true) {
                percentage = 0;
              } else {
                let passed = testResults.passed || 0;
                let failed = testResults.failed || 0;
                let total = passed + failed;
                
                if (total > 0) {
                  percentage = passed / total; // Percentage as 0-1 (e.g., 0.75 for 75%)

                  
                }
              }
            }
            
            logMessage(["INSERT - Question ID:", questionId, "Percentage (0-1):", percentage]);
            logMessage(["Test Results to save:", stringifiedTestResults]);
            
            const submitAnswerQuery = `
              INSERT INTO questionevaluations
              (enrollement_id, question_id, student_answer, obtained_marks, created_by, status, test_results) 
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
              studentEnrollmentId, 
              questionId, 
              answer, 
              percentage.toString(), // Save percentage (0-1) as string in varchar(255)
              urdd, 
              "active", 
              stringifiedTestResults
            ];
            
            await executeQuery(submitAnswerQuery, values);
            logMessage([`Answer inserted for question_id: ${questionId}`]);
          }
        }
      }
      return { success: true };
  
    } catch (err) {
      logMessage(["Error in submitAnswer", err]);
      throw new Error("Error in submitAnswer");
    } 
  }


    
  async function getPreviousSubmittedAnswers(subComponentId, participant) {
    try {
      const previousSubmittedAnswersQuery = `
        select qe.question_id, qe.student_answer from students s
        JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
        JOIN enrollements e ON e.student_semester_id = ss.student_semester_id
        JOIN questionevaluations qe ON qe.enrollement_id = e.enrollement_id
        JOIN questions q ON q.question_id = qe.question_id
        JOIN subcomponents sc ON q.sub_component_id = sc.sub_component_id
        WHERE s.urdd_id = ? 
        AND sc.sub_component_id = ?
      `;
      const result = await executeQuery(previousSubmittedAnswersQuery, [participant.urdd, subComponentId]);
      return result;
    } catch (err) {
      logMessage(["Failed to get previous submitted answers:", err]);
      throw new Error("Failed to get previous submitted answers");
    }
  }



    
module.exports = {
    isHost,
    getAndEmitQuestions,
    submitAnswer,
    getPresentParticipants,
    allParticipantsInCourse,
    getPreviousSubmittedAnswers,
  };