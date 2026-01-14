
const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");


async function isHost(quizId, hostUrdd) {
  try {
    const verifyHostQuery = `
      SELECT created_by 
      FROM subcomponents 
      WHERE sub_component_id = ?
      LIMIT 1
    `;

    const quizData = await executeQuery(verifyHostQuery, [quizId]);

    if (!quizData || quizData.length === 0) {
      console.warn(`No quiz found with ID ${quizId}`);
      return false;
    }

    const createdBy = quizData[0].created_by;
    return createdBy === hostUrdd;

  } catch (error) {
    logMessage(["Error in isHost:", error]);
    throw new Error("Error in isHost");
  }
}

  async function getAndEmitQuestions(subComponentId, socket,io, sendtosingleuser = false, participant, subComponentType ) {
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
    
        const questionQuery = `
          SELECT COUNT(*) OVER () AS table_count, question_id, cloid, sub_component_id,
                question_num, description, question_marks, lectures_topic_id, status,
                created_by, updated_by, created_at, updated_at, config
          FROM questions 
          WHERE sub_component_id = ? AND status = 'active'
        `;
        let questions = await executeQuery(questionQuery, subComponentId);

        if (!questions || questions.length === 0) {
          // logMessage(["No questions registered against this quiz"]);
          socket.emit("error", "No questions registered against this quiz");
          throw new Error("No questions registered against this quiz");
        }


        if(sendtosingleuser) {
          if (process.env.BYPASS != 'true') {
            const submittedQuestions = await getPreviousSubmittedAnswers(subComponentId, participant);
          if (submittedQuestions && submittedQuestions.length > 0) {
            const submittedIds = submittedQuestions.map(r => r.question_id);
            questions = questions.filter(q => !submittedIds.includes(q.question_id));
          }
          }
        }
    
        // ✅ Process questions
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
            
            // Parse question config if it exists
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
    
        // ✅ Emit quiz start
        const total_questions = questions[0].table_count || 0;
        const quizStartedPayload = {
          quizName: quiz.sub_component_num,
          totalQuestions: total_questions,
          description: quiz.text,
          quizId: quiz.sub_component_id,
          questionIndex: 0,
          currentQuestion: questions[0],
          allQuestions: questions,
        };
        logMessage(["resultsssssssssssssss::::: ", questions]);
        

        // Log number of sockets in the room
        const roomSockets = await io.in(subComponentId).fetchSockets();
        logMessage([`Number of connections in room ${subComponentId}:`, roomSockets.length]);
        logMessage(['Socket IDs in room:', roomSockets.map(s => s.id)]);
        
        if(sendtosingleuser) {
           socket.emit("subComponent-started", { 
            message: "Lab started successfully",
            totalQuestions: total_questions,
            subComponentStartedPayload: quizStartedPayload,
            subComponent: subComponentType,
          });
        }
        else{
          io.to(subComponentId).emit("subComponent-started", { 
            message: "Lab started successfully",
            totalQuestions: total_questions,
            subComponentStartedPayload: quizStartedPayload,
            subComponent: subComponentType
          });
        }
        return { success: true, questions  };
    
      } catch (err) {
        logMessage(["Unexpected error in getAndEmitQuestions:", err]);
        throw new Error("Unexpected error in getAndEmitQuestions");
      } 
    }
    


  async function submitAnswer( questionId, option, testResults, participant, quizId, course_id, hostId,correctOption, shuffledQuestion= {}, type) {
    try {
  
      // ✅ Get enrollment ID safely with parameterized query
      const getEnrollmentIdQuery = `
      SELECT enrollement_id 
      FROM enrollements e
      JOIN courses c ON e.course_id = c.course_id
      JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
      JOIN students s ON ss.student_user_id = s.student_user_id
      WHERE s.urdd_id = ? AND e.course_id = ?
      `;
      const enrollmentRows = await executeQuery(getEnrollmentIdQuery, [participant.urdd, course_id]);
      if (!enrollmentRows || enrollmentRows.length === 0) {
        throw new Error("Enrollment not found for participant");
      }
      const studentEnrollmentId = enrollmentRows[0].enrollement_id;
  
      // ✅ Get quiz config
      const getConfigAndQuestionQuery = `SELECT s.config, q.question_marks FROM subcomponents s
      LEFT JOIN questions q ON q.sub_component_id = s.sub_component_id
      WHERE s.sub_component_id = ? AND q.question_id = ?`;
      const configAndQuestionResult = await executeQuery(getConfigAndQuestionQuery, [quizId, questionId] );
  
      let correctAnswerScore = 0;
      let wrongAnswerScore = 0;
  
      if (configAndQuestionResult.length > 0) {
        try {
          const parsedConfig = JSON.parse(configAndQuestionResult[0].config);
          const config = Array.isArray(parsedConfig) ? parsedConfig[0] : parsedConfig;
          correctAnswerScore = Number(config?.markingNumber ?? 0);
          wrongAnswerScore = Number(config?.negativeMarking ?? 0);
          
          // ✅ Backup: Check if attendance is required
          const attendanceNotRequired = config?.attendanceNotRequired ?? true;
          
          if (!attendanceNotRequired) {
            // Check if attendance already exists
            const checkAttendanceQuery = `
              SELECT attendance_id FROM lecturesattendance 
              WHERE enrollement_id = ? AND sub_component_id = ?
            `;
            const existingAttendance = await executeQuery(checkAttendanceQuery, [studentEnrollmentId, quizId]);
            
            if (!existingAttendance || existingAttendance.length === 0) {
              // Mark attendance if not already marked
              const markAttendanceQuery = `
                INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id, status, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
              `;
              await executeQuery(markAttendanceQuery, [
                studentEnrollmentId,
                new Date(),
                true,
                quizId,
                'active',
                'system_auto',
                new Date()
              ]);
              logMessage([`📝 Backup: Auto-marked attendance for enrollment ${studentEnrollmentId} during answer submission`]);
            }
          }

        } catch (err) {
          logMessage(["Invalid JSON in config:", err]);
          throw new Error("Invalid json for quiz config");
        }
      }


      let score = 0;
      
      // ✅ Check if answer already exists for this student-question combination
      const checkExistingAnswerQuery = `
        SELECT question_evaluation_id 
        FROM questionevaluations 
        WHERE enrollement_id = ? AND question_id = ? AND status = 'active'
      `;
      const existingAnswer = await executeQuery(checkExistingAnswerQuery, [studentEnrollmentId, questionId]);

      if(type=='code'){
        let percentage = 0;
        if(testResults){
          let passed = testResults?.passed;
          let failed = testResults?.failed;
          percentage = ( passed / ( passed + failed ));
        }
        else {
          percentage=0;
        }
        let questionMarks = configAndQuestionResult[0]?.question_marks;
        score = percentage * questionMarks;

        if (existingAnswer && existingAnswer.length > 0) {
          // ✅ UPDATE existing answer
          const updateAnswerQuery = `
            UPDATE questionevaluations
            SET student_answer = ?, 
                obtained_marks = ?, 
                test_results = ?,
                updated_at = NOW()
            WHERE question_evaluation_id = ?
          `;
          await executeQuery(updateAnswerQuery, [
            option, 
            score, 
            JSON.stringify(testResults),
            existingAnswer[0].question_evaluation_id
          ]);
          logMessage([`📝 Updated code answer for question ${questionId}, student ${studentEnrollmentId}`]);
        } else {
          // ✅ INSERT new answer
          const submitAnswerQuery = `
            INSERT INTO questionevaluations
            (enrollement_id, question_id, student_answer, obtained_marks, created_by, status, test_results) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [studentEnrollmentId, questionId, option, score, hostId, "active", JSON.stringify(testResults)];
          await executeQuery(submitAnswerQuery, values);
          logMessage([`✅ Inserted code answer for question ${questionId}, student ${studentEnrollmentId}`]);
        }
      }
      else if(type =='textfield'){
        if (existingAnswer && existingAnswer.length > 0) {
          // ✅ UPDATE existing answer
          const updateAnswerQuery = `
            UPDATE questionevaluations
            SET student_answer = ?, 
                obtained_marks = ?,
                updated_at = NOW()
            WHERE question_evaluation_id = ?
          `;
          await executeQuery(updateAnswerQuery, [
            option, 
            score,
            existingAnswer[0].question_evaluation_id
          ]);
          logMessage([`📝 Updated textfield answer for question ${questionId}, student ${studentEnrollmentId}`]);
        } else {
          // ✅ INSERT new answer
          const submitAnswerQuery = `
            INSERT INTO questionevaluations
            (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const values = [studentEnrollmentId, questionId, option, score, hostId, "active"];
          await executeQuery(submitAnswerQuery, values);
          logMessage([`✅ Inserted textfield answer for question ${questionId}, student ${studentEnrollmentId}`]);
        }
      }
      else{
        score = correctOption ? correctAnswerScore : wrongAnswerScore;
        
        if (existingAnswer && existingAnswer.length > 0) {
          // ✅ UPDATE existing answer
          const updateAnswerQuery = `
            UPDATE questionevaluations
            SET student_answer = ?, 
                obtained_marks = ?, 
                solution_strucutre = ?,
                updated_at = NOW()
            WHERE question_evaluation_id = ?
          `;
          await executeQuery(updateAnswerQuery, [
            option, 
            score, 
            JSON.stringify(shuffledQuestion),
            existingAnswer[0].question_evaluation_id
          ]);
          logMessage([`📝 Updated MCQ answer for question ${questionId}, student ${studentEnrollmentId}`]);
        } else {
          // ✅ INSERT new answer
          const submitAnswerQuery = `
            INSERT INTO questionevaluations
            (enrollement_id, question_id, student_answer, obtained_marks, created_by, status, solution_strucutre) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [studentEnrollmentId, questionId, option, score, hostId, "active", JSON.stringify(shuffledQuestion)];
          await executeQuery(submitAnswerQuery, values);
          logMessage([`✅ Inserted MCQ answer for question ${questionId}, student ${studentEnrollmentId}`]);
        }
      }
      
     
   

    
      
      return { success: true };
  
    } catch (err) {
      logMessage(["Error in submitAnswer", err]);
      throw new Error("Error in submitAnswer");
    } 
  }
  

  async function addtoLog(message, urdd, quizId) {
    try {
      const logQuery = `
        INSERT INTO socket_activity_log (urdd_id, sub_component_id, activity_description)
        VALUES (?, ?, ?)
      `;
      await executeQuery(logQuery, [urdd, quizId, message]);
    } catch (err) {
      logMessage(["Failed to write log:", err]);
      throw new Error("Failed to write log");
    }
  }



  
  async function getPreviousSubmittedAnswers(quizId, participant) {
    try {
      const previousSubmittedAnswersQuery = `
        select qe.question_id from students s
        JOIN studentsemesters ss ON ss.student_user_id = s.student_user_id
        JOIN enrollements e ON e.student_semester_id = ss.student_semester_id
        JOIN questionevaluations qe ON qe.enrollement_id = e.enrollement_id
        JOIN questions q ON q.question_id = qe.question_id
        JOIN subcomponents sc ON q.sub_component_id = sc.sub_component_id
        WHERE s.urdd_id = ? 
        AND sc.sub_component_id = ?
      `;
      const result = await executeQuery(previousSubmittedAnswersQuery, [participant.urdd, quizId]);
      return result;
    } catch (err) {
      logMessage(["Failed to get previous submitted answers:", err]);
      throw new Error("Failed to get previous submitted answers");
    }
  }

  
  
  async function allParticipantsInCourse(quizId) {
    try {
      const totalStudentsInCourseQuery = `
      SELECT s.urdd_id, u.email, CONCAT(u.first_name, ' ', u.last_name) AS name from subcomponents
      LEFT JOIN classcomponent cc ON cc.component_id = subcomponents.component_id
      LEFT JOIN courses c ON c.course_id = cc.course_id
      LEFT JOIN enrollements e ON e.course_id = c.course_id
      LEFT JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
      LEFT JOIN students s ON s.student_user_id = ss.student_user_id
      LEFT JOIN user_roles_designations_department urdd ON urdd.user_role_designation_department_id = s.urdd_id
      LEFT JOIN users u ON u.user_id = urdd.user_id
      WHERE subcomponents.sub_component_id = ? AND e.status = 'active'
      `;
      const result = await executeQuery(totalStudentsInCourseQuery, [quizId]);
      return result;
    } catch (err) {
      logMessage(["Failed to get all participants of course:", err]);
      throw new Error("Failed to get all participants of course");
    }
  }


  async function getPresentParticipants(quizId) {
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
      const result = await executeQuery(totalStudentsPresentQuery, [quizId]);
      return result;
    } catch (err) {
      logMessage(["Failed to get present participants of course", err]);
      throw new Error("Failed to get present participants of course");
    }
  
  }




  async function gradeCodeComments(codeString) {
    if (!codeString || typeof codeString !== "string") return 0;
  
    const lines = codeString.split(/\r?\n/);
    const totalLines = lines.length;
  
    let commentedLines = 0;
    let inBlockComment = false;
  
    for (let line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines
      if (trimmed === '') continue;
  
      // ✅ Check if line contains block comment start
      if (trimmed.includes("/*")) {
        inBlockComment = true;
        commentedLines++;
        // Check if block comment also ends on same line
        if (trimmed.includes("*/")) {
          inBlockComment = false;
        }
        continue;
      }
  
      // ✅ Inside block comment
      if (inBlockComment) {
        commentedLines++;
        if (trimmed.includes("*/")) {
          inBlockComment = false;
        }
        continue;
      }
  
      // ✅ Check for single-line OR inline comments
      if (trimmed.startsWith("//") || trimmed.includes("//")) {
        commentedLines++;
        continue;
      }
    }
  
    // Guard to avoid division by zero
    if (totalLines === 0) return 0;
  
    const commentPercentage = (commentedLines / totalLines) * 100;
  
    // Grading logic
    let marksOutOf5 = 0;
  
    if (commentPercentage >= 20) {
      marksOutOf5 = 5;
    } else if (commentPercentage >= 10) {
      marksOutOf5 = 2.5;
    } else {
      marksOutOf5 = 0;
    }
  
    // ✅ Return only the number, not an object
    return marksOutOf5;
  }




module.exports = {
    isHost,
    getAndEmitQuestions,
    submitAnswer,
    addtoLog,
    allParticipantsInCourse,
    getPresentParticipants,
    gradeCodeComments,
  };