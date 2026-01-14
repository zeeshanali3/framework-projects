
const logMessage = require("../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../Services/Integrations/Database/queryExecution.js");



  async function  getAndEmitQuestions(subComponentId, socket,io, sendtosingleuser = false, participant, subComponentType) {
      try {
        const subComponentQuery = `SELECT * from subcomponents where sub_component_id = ?`;
        const subComponentResults = await executeQuery(subComponentQuery, subComponentId);
        if (!subComponentResults || subComponentResults.length === 0) {
          socket.emit("error", "No Subcomponent available.");
          throw new Error("No Subcomponent available");
        }
    
        const subComponent = subComponentResults[0];
    
        let subComponentConfig = {};
        try {
          subComponentConfig = subComponent.config ? JSON.parse(subComponent.config) : {};
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
          if (socket && socket.connected) socket.disconnect();
          return;
        }


        if(sendtosingleuser) {
          const submittedQuestions = await getPreviousSubmittedAnswers(subComponentId, participant);
          if (submittedQuestions && submittedQuestions.length > 0) {
            const submittedIds = submittedQuestions.map(r => r.question_id);
            questions = questions.filter(q => !submittedIds.includes(q.question_id));
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
        const subComponentStartedPayload = {
          quizName: subComponent.sub_component_num,
          totalQuestions: total_questions,
          description: subComponent.text,
          subComponentId: subComponent.sub_component_id,
          questionIndex: 0,
          currentQuestion: questions[0],
          allQuestions: questions,
        };

        // Log number of sockets in the room
        const roomSockets = await io.in(subComponentId).fetchSockets();
        logMessage([`Number of connections in room ${subComponentId}:`, roomSockets.length]);
        logMessage(['Socket IDs in room:', roomSockets.map(s => s.id)]);
        
        if(sendtosingleuser) {
          socket.emit(`subComponent-started`, { 
            message: `${subComponentType} started successfully`,
            totalQuestions: total_questions,
            subComponentStartedPayload: subComponentStartedPayload,
            subComponent: subComponentType
          });
        }
        else{
          io.to(subComponentId).emit(`subComponent-started`, { 
            message: `${subComponentType} started successfully`,
            totalQuestions: total_questions,
            subComponentStartedPayload: subComponentStartedPayload,
            subComponent: subComponentType
          });
        }
        return { success: true, questions};
    
      } catch (err) {
        logMessage(["Unexpected error in getAndEmitQuestions:", err]);
        throw new Error("Unexpected error in getAndEmitQuestions");
      } 
    }

module.exports = {
    getAndEmitQuestions
}