// const logMessage = require("../../../../SysFunctions/LogFunctions/consoleLog.js");
// const { executeQuery } = require("../../../Database/queryExecution");
// const {
//   isHost,
//   getAndEmitQuestions,
//   submitAnswer,
//   addtoLog,
//   allParticipantsInCourse,
//   getPresentParticipants
// } = require("./quizSocketHandler");

// const {
//   participants,
//   stagingRoomParticipants,
//   quizzes,
//   blockedUsers,
//   completedQuizzes,
//   allQuizParticipants,
//   presentQuizParticipants
// } = require("./states.js"); // <-- adjust path if needed


// module.exports = (socket, io) => {


//   // === Helper: Emit updated participant lists to host ===
//   async function emitRoomStatusToHost(quizId) {
//     try {
//       const all = allQuizParticipants[quizId] || await allParticipantsInCourse(quizId);
//       const present = presentQuizParticipants[quizId] || await getPresentParticipants(quizId);
//       allQuizParticipants[quizId] = all;
//       presentQuizParticipants[quizId] = present;

//       const presentIds = new Set(present.map(p => p.urdd_id));
//       const stagingIds = new Set(stagingRoomParticipants[quizId]?.map(p => p.urdd) || []);

//       // const joinedParticipants = participants[quizId] || [];
//       const joinedParticipants = (participants[quizId] || []).filter(p => p.status === 'active'); //new
//       const absentParticipants = all.filter(p => !presentIds.has(p.urdd_id));
//       const absentStagingParticipants = all.filter(
//         p => !presentIds.has(p.urdd_id) && stagingIds.has(p.urdd_id)
//       );

//       io.to(quizId + '-host').emit("room-participants", {
//         joinedParticipants,
//         absentParticipants,
//         absentStagingParticipants
//       });

//       logMessage([`Emitted updated participant lists for quiz ${quizId}`]);
//     } catch (err) {
//       logMessage(["Failed to emit room status:", err]);
//       throw new Error("Failed to emit room status");
//     }
//   }

//     // ==========================================================
//    // 🔹 INITIAL CONNECTION LOGIC 
//   // ==========================================================
//   (async () => {
//     try {
//       let { quizId, participant } = socket.handshake.query;
//       quizId = String(quizId);

//       if (typeof participant === "string") {
//         try {
//           participant = JSON.parse(participant);
//         } catch (error) {
//           logMessage(["Failed to parse participant:", error]);
//           throw new Error("Failed to parse participant");
//         }
//       }

//       logMessage(["DATA RECEIVED ON CONNECTION :::", quizId, participant]);

//       if (!participant || !participant.urdd || !participant.role)
//         throw new Error("Invalid participant data");
//       if (!quizId) {
//         throw new Error("Quiz id not provided");
//       }

//       // Initialize quiz data
//       stagingRoomParticipants[quizId] ||= [];
//       participants[quizId] ||= [];
//       quizzes[quizId] ||= {
//         questions: [],
//         currentIndex: 0,
//         isStarted: false,
//         startTime: null,
//         hostId: null,
//       };

//       logMessage(["New client connected:", socket.id]);

//       // === RECONNECTION LOGIC ===
//       if (participants[quizId] && quizzes[quizId] && !(await isHost(quizId, participant.urdd))) {
//         const quiz = quizzes[quizId];
//         if (quiz && quiz.isStarted) {
//           const existingQuizParticipant = participants[quizId].find(
//             p => p.urdd === participant.urdd
//           );

//           if (existingQuizParticipant) {
//             if (blockedUsers.has(quizId) && blockedUsers.get(quizId).has(participant.urdd)) {
//                 socket.emit("error", {
//                   message: "You have been blocked or left the quiz.",
//                   blockedBy: "Host"
//                 });
//                socket.emit("connection-status", {
//                   connected: false,
//                   message: error.message || "Error processing connection",
//                   timestamp: Date.now()
//                 });
//               throw new Error("You have been blocked or left the quiz.");
//             }

//             //fcm token check
//              if (existingQuizParticipant.fcm_token != participant.fcm_token) {
//               logMessage([`⛔ User ${participant.urdd} has a different fcm token for quiz ${quizId}`]);
//               return socket.emit('error', {
//                 message: 'You have already joinned from another device.',
//                 blockedBy: 'Host'
//               });
//             }


//            // Check if participant has already completed this quiz
//             const participantKey = `${quizId}:${participant.urdd}`;
//             if (completedQuizzes.has(participantKey)) {
//               socket.emit("error", {
//                 message: "You have already completed this quiz and cannot rejoin.",
//                 blockedBy: "System"
//               });
//               throw new Error("Quiz already completed by this participant");
//             }
                        

//             const now = Date.now();
//             const thresholdTime = 3 * 60 * 1000; // 3 min
//             if (quiz.startTime && now - quiz.startTime > thresholdTime) {
//               socket.emit("error", {
//                 message: "Quiz has started and threshold time passed, cannot join."
//               });
//               throw new Error("Quiz has started and threshold time passed, cannot join.");
//             }

//             existingQuizParticipant.socket_id = socket.id;
//             existingQuizParticipant.status = 'active';
//             socket.join(quizId);
//             logMessage([`Quiz ${quizId} rejoined by ${participant.name}`]);
//             addtoLog("Quiz rejoined", participant.urdd, quizId);

//             const res = await getAndEmitQuestions(quizId, socket, io, true, participant);
//             if (res.success && res.questions) quizzes[quizId].questions = res.questions;
//           } else {
//             socket.emit("error", { message: "Quiz has already started, cannot join." });
//             socket.disconnect();
//             throw new Error("Quiz has already started, cannot join.");
//           }
//         }
//       }

//       // === STAGING ROOM HANDLING ===
//       const existingParticipant = stagingRoomParticipants[quizId].find(
//         p => p.urdd === participant.urdd
//       );

//       if (existingParticipant) existingParticipant.socket_id = socket.id;
//       else {
//         stagingRoomParticipants[quizId].push({
//           socket_id: socket.id,
//           urdd: participant.urdd,
//           name: participant.name,
//           role: participant.role,
//           email: participant.email
//         });
//       }

//       await emitRoomStatusToHost(quizId);
//       const roomName = `attendance-${quizId}`;
//       socket.join(roomName);

//       socket.emit("connection-status", {
//         connected: true,
//         socketId: socket.id,
//         room: roomName,
//         participant,
//         timestamp: Date.now()
//       });
  

//       //bypass for test
//       socket.join(quizId);
      
//       setTimeout(() => {
//        socket.emit("attendance-success", {success: true, data : participant });
//       }, 300);
//       setTimeout(async () => {
//       await getAndEmitQuestions(quizId, socket, io, false, participant);
//       }, 5000);
//       logMessage([`Socket ${socket.id} joined room ${roomName}`]);

//     } catch (error) {
//       logMessage([`Error handling connection for socket ${socket.id}:`, error]);
//       socket.emit("connection-status", {
//         connected: false,
//         message: error.message || "Error processing connection",
//         timestamp: Date.now()
//       });
//       if(socket && socket.connected) socket.disconnect();
//     }
//   })();

//     // ==========================================================
//    // 🔹 REMAINING QUIZ EVENTS
//   // ==========================================================
//   socket.on("join-quiz-host", async ({ quizId }) => {
//     try{
//     quizId = String(quizId);
//     socket.join(quizId + "-host");
//     participants[quizId] ||= [];
//     stagingRoomParticipants[quizId] ||= [];
//     // allQuizParticipants[quizId] ||= [];
//     // presentQuizParticipants[quizId] ||= [];
//     quizzes[quizId] ||= { questions: [], currentIndex: 0, isStarted: false };
//     await emitRoomStatusToHost(quizId);
//     }
//     catch(error){
//       logMessage(["Error in join-quiz-host", error.message]);
//       socket.emit("error", { message: "Error emitting room status to host" });
//       socket.disconnect();
//     }
//   });

//   socket.on("start-quiz", async ({ quizId, participant }) => {
//     try {
//       quizId = String(quizId);
//       const quiz = quizzes[quizId];
//       if (!(await isHost(quizId, participant.urdd))) {
//         socket.emit("error", { message: "You are not the host" });
//         return socket.disconnect();
//       }

//       quiz.isStarted = true;
//       quiz.startTime = Date.now();
//       quiz.hostId = participant.urdd;
//       // const res = await getAndEmitQuestions(quizId, socket, io, false, participant);
//       // if (res.success) await emitRoomStatusToHost(quizId);
//       await getAndEmitQuestions(quizId, socket, io, false, participant);
//       await emitRoomStatusToHost(quizId);
//     } catch (e) {
//       logMessage(["Error in start-quiz", e]);
//       socket.emit("error", { message: "Error in start-quiz" });
//       if (socket && socket.connected) socket.disconnect();
//     }
//   });

//   socket.on("submit-answer", async (submissionData) => {
//     try {
//       let { type, quizId, answer, questionId, selectedOptionText, participant, courseId, correctOption, shuffledQuestionData } = submissionData;
      
//       quizId = String(quizId);
//       const { shuffledOptions } = shuffledQuestionData.shuffledQuestion.options;
//       logMessage(["shuffled answersss:: " , shuffledOptions]);
//       // await submitAnswer(answer, questionId, selectedOptionText, participant, quizId, courseId, participant.urdd, correctOption, shuffledOptions);
//       if(type === 'mcq') {
//         await submitAnswer(questionId, selectedOptionText, participant, quizId, courseId, participant.urdd, correctOption, shuffledOptions, true);
//       }
//       else{
//         await submitAnswer(questionId, answer, participant, quizId, courseId, participant.urdd, correctOption, shuffledOptions, false);
//       }
//     } catch (err) {
//       logMessage(["Error in submit-answer", err]);
//       socket.emit("error", { message: "Error in start-quiz" });
//       if (socket && socket.connected) socket.disconnect();
//     }
//   });


//     socket.on('block-user', async ({ quizId, participant, reason, questionId }) => {

//       try{
//         quizId = String(quizId);
//         logMessage([`📝 User ${participant?.urdd} blocked from quiz ${quizId} - saved to database`]);

//         if (!blockedUsers.has(quizId)) {
//           blockedUsers.set(quizId, new Set());
//         }

//         const blockedSet = blockedUsers.get(quizId);
//         if (blockedSet.has(participant?.urdd)) {
//           logMessage([`⚠️ User ${participant?.urdd} is already blocked from quiz ${quizId}`]);
//         }
//         else{
//           blockedSet.add(participant?.urdd);
//           logMessage([`✅ User ${participant?.urdd } blocked from quiz ${quizId}`]);

//           const blockedParticipant = participants[quizId]?.find(p => p.urdd === participant?.urdd );
//           if (blockedParticipant) {           
//             // Remove from participants
//             // participants[quizId] = participants[quizId].filter(p => p.urdd !== participant?.urdd );
//             Object.assign(blockedParticipant, { //new
//               status: "inactive",
//               socket_id: null   // optional, to avoid reconnecting on same socket
//             });
//           }
//           socket.leave(quizId);
//           await emitRoomStatusToHost(quizId);
//           return socket.disconnect();
//         }
//       }
//       catch(error){
//         logMessage(["Error in blocking user from quiz: " + error.message]);
//         socket.emit("error", { message: "Error in blocking user from quiz: " + error.message});
//         if (socket && socket.connected) socket.disconnect();
//       }
//     });



//      socket.on("leave-quiz", async ({ quizId, participant }) => {
//         try{
//           quizId = String(quizId);
//           logMessage([`📝 User ${participant?.urdd} blocked from quiz ${quizId} - saved to database`]);
//           if (!blockedUsers.has(quizId)) {
//             blockedUsers.set(quizId, new Set());
//           }
//           const blockedSet = blockedUsers.get(quizId);
//           if (blockedSet.has(participant?.urdd)) {
//             logMessage([`⚠️ User ${participant?.urdd} is already blocked from quiz ${quizId}`]);
//           }
//           else{
//             blockedSet.add(participant?.urdd);
//             logMessage([`✅ User ${participant?.urdd } blocked from quiz ${quizId}`]);
  
//             const blockedParticipant = participants[quizId]?.find(p => p.urdd === participant?.urdd );
//             if (blockedParticipant) {           
//               // Remove from participants
//                // participants[quizId] = participants[quizId].filter(p => p.urdd !== participant?.urdd );
//                 Object.assign(blockedParticipant, { //new
//                   status: "inactive",
//                   socket_id: null   // optional, to avoid reconnecting on same socket
//                 });
//             }
//             socket.leave(quizId);
//             socket.disconnect();
//             await emitRoomStatusToHost(quizId);
//           }
//         }
//         catch(error){
//           logMessage(["Ërror in blocking participant from quiz", error.message]);
//           socket.emit("error", { message: "Error in blocking user from quiz: " + error.message});
//           socket.leave(quizId);  //ensures user is disconnected from quiz in any case
//           if (socket && socket.connected) socket.disconnect();
//         }

//       });



//        socket.on("mark-attendance", async ({ hostInfo, scannedData }) => {
//         try {
//         logMessage(["INSIDE MARK ATTENDANCE EVENT, DATA:  ", hostInfo , scannedData]);
//         const { urdd_id: hostUrdd , role: hostRole } = hostInfo;
//         const { rfidUid: participantNfcId , quizId, courseId , qrCode } = scannedData;
//         logMessage(["QRCODE :::: ", qrCode]);
//         if (hostRole !== "Admin" && !(await isHost(quizId, hostUrdd))) {
//           socket.emit("error", { message: "You are not the host of this quiz" });
//           return socket.disconnect();
//         }

//         if (!participantNfcId && !qrCode ) {
//           socket.emit("error", {message: "Neither NFC or qrCode provided" });
//           return socket.disconnect();
//         }

//         let enrollement_id;
//         let participantInfo;


//         if(participantNfcId){
//           const nfcCheckQuery = `SELECT * from students where nfc_token = ?   `;
//           const nfcCheckQueryResult = await executeQuery(nfcCheckQuery, [participantNfcId]);
//           if (!nfcCheckQueryResult || nfcCheckQueryResult.length === 0) {
//             socket.emit("error", {message: "NFC not found for student" });
//             return socket.disconnect();
            
//           }
//           const nfcDataResult = nfcCheckQueryResult[0];
          
//           const getEnrollmentIdQuery = `
//           SELECT e.enrollement_id, s.urdd_id FROM enrollements e
//           JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
//           JOIN students s ON ss.student_user_id = s.student_user_id
//           JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id 
//           JOIN users u ON u.user_id = urdd.user_id
//           WHERE e.course_id = ? AND s.student_user_id = ? AND e.status= 'active'
//           `;
//           const getEnrollmentIdQueryResult = await executeQuery(getEnrollmentIdQuery, [courseId, nfcDataResult.student_user_id]);
//           if (!getEnrollmentIdQueryResult || getEnrollmentIdQueryResult.length === 0) {
//             socket.emit("error", {message: "Enrollment not found for participant" });
//             return socket.disconnect();
//           }

//           enrollement_id = getEnrollmentIdQueryResult[0].enrollement_id;
//           participantInfo = getEnrollmentIdQueryResult[0];
//         }
//         else{

//           const qrCodeCheckQuery = ` SELECT * from qr_code where qr_code = ?   `;
//           const qrCodeCheckQueryResult = await executeQuery(qrCodeCheckQuery, [qrCode]);
//           if (!qrCodeCheckQueryResult || qrCodeCheckQueryResult.length === 0) {
//             socket.emit("error", {message: "Qr code not found for student" });
//             return socket.disconnect();
//           }
//           const qrCodeInfo = qrCodeCheckQueryResult[0];
          
//           const getEnrollmentIdQuery = `
//           SELECT e.enrollement_id, s.urdd_id FROM enrollements e
//           JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
//           JOIN students s ON ss.student_user_id = s.student_user_id
//           JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id 
//           JOIN users u ON u.user_id = urdd.user_id
//           WHERE e.course_id = ? AND s.urdd_id = ? AND e.status= 'active'
//           `;
//           const getEnrollmentIdQueryResult = await executeQuery(getEnrollmentIdQuery, [courseId, qrCodeInfo.urdd_id]);
//           if (!getEnrollmentIdQueryResult || getEnrollmentIdQueryResult.length === 0) {
//             socket.emit("error", {message: "Enrollment not found for participant" });
//             return socket.disconnect();
//           }

//           enrollement_id = getEnrollmentIdQueryResult[0].enrollement_id;
//           participantInfo = getEnrollmentIdQueryResult[0];

//         }
        
        

//         const attendanceQuery = `
//         INSERT INTO lecturesattendance (enrollement_id , date, is_present, sub_component_id , status , created_by ,created_at )
//         VALUES (? , ? , ? , ? , ? , ? , ?)
//         `;

//         const attendanceQueryResult = await executeQuery(attendanceQuery, [enrollement_id , new Date(), true, quizId, "active", hostUrdd, new Date()]);

//         const participantObj = stagingRoomParticipants[quizId]?.find( p => p.urdd === participantInfo.urdd_id );
//           if (participantObj) {
//             const participantSocketId = participantObj.socket_id;
//             const participantSocket = io.sockets.sockets.get(participantSocketId);
//             if (participantSocket) {
//               const oldRoom = `attendance-${quizId}`;
//               const newRoom = `${quizId}`;
          
            
//             // Leave old room
//             participantSocket.leave(oldRoom);

//             addtoLog("Quiz joined", participantInfo.urdd_id, quizId);
//             participantSocket.join(newRoom);
//             participants[quizId].push({
//               urdd: participantObj.urdd,
//               socket_id: participantObj.socket_id,
//               name: participantObj.name,
//               role: participantObj.role,
//               email: participantObj.email,
//               status: 'active'
//             });



//             // if (!presentQuizParticipants[quizId]) {
//             //   presentQuizParticipants[quizId] = [];
//             // }
//             if(presentQuizParticipants[quizId]){
//             presentQuizParticipants[quizId].push({
//               urdd_id: participantObj.urdd,
//               name: participantObj.name,
//               email: participantObj.email,
//               role: participantObj.role
//             });
//           }

//             stagingRoomParticipants[quizId] = stagingRoomParticipants[quizId].filter( p => p.urdd !== participantObj.urdd );          
//             logMessage([`Participant ${participantInfo.urdd_id} moved from ${oldRoom} to ${newRoom}`], true);

//             participantSocket.emit("attendance-success", {success: true, data : participantInfo  });
//             logMessage(["Attendance marked successfully for participant " , participantSocket.socketId]);
//             await emitRoomStatusToHost(quizId);

//           } else {
//             logMessage([`Socket not found for participant ID: ${participantSocketId}`]);
//             socket.emit('error', {
//               message: 'You have already given Quiz, No participant found for socket id',
//             });
//             socket.disconnect();
//           }
//         }
//         } catch (error) {
//           logMessage(["Error in mark-attendance:", error],true);
//           socket.emit('error', { message: 'Error marking attendance' });
//           if (socket && socket.connected) socket.disconnect();
//         }
//       });




//       socket.on("quiz-completed", async ({quizId, participant }) => {
//       try{
//       logMessage(["----------------- INSIDE QUIZ COMPLETED EVENT: " , quizId, "participant ", participant]);
//       quizId = String(quizId);
//       const existingParticipant = participants[quizId]?.find(p => p.urdd === participant.urdd);
//       if (!existingParticipant) {
//         socket.emit("error", {message:"Participant not found in quiz" });
//         return socket.disconnect();
//       }
//       // participants[quizId] = participants[quizId].filter(p => p.urdd !== participant?.urdd );
//        if (existingParticipant) {           
//                 Object.assign(existingParticipant, { //new
//                   status: "inactive",
//                   socket_id: null   // optional, to avoid reconnecting on same socket
//                 });
//             }
//       const participantKey = `${quizId}:${participant.urdd}`;
//       completedQuizzes.add(participantKey);
//       socket.leave(quizId);
//       await emitRoomStatusToHost(quizId);
//       socket.disconnect();
//       }
//       catch (error) {
//         logMessage(["Error in quiz-completed:", error]);
//         socket.emit("error", { message: "Error submitting answer"});
//         if (socket && socket.connected) socket.disconnect();
//       }
//     });



//       socket.on("end-quiz", async ({ quizId, participant }) => {
//         quizId = String(quizId);
//         const quiz = quizzes[quizId];
//         if (!quiz) return socket.emit("error", "Quiz not found");
          
//         // if (!(await isHost(quizId, participant))) {
//         //   return socket.emit("error", "You are not the host of this quiz");
//         // }

//         if (quiz.hostId !== participant.urdd) {
//           return socket.emit("error", "You are not the host of this quiz");
//         }
        
//         io.to(quizId).emit("quiz-ended", {
//           message: "Quiz ended by host",
//           endedBy: participant.urdd
//         });

//          // ✅ Clean up memory for this quiz
//         delete participants[quizId];
//         delete quizzes[quizId];
//         blockedUsers.delete(quizId);
//         [...completedQuizzes].forEach(key => {
//           if (key.startsWith(`${quizId}:`)) {
//             completedQuizzes.delete(key);
//           }
//         });
        

//         // const enqQuizQuery = `Update subcomponents set status = 'inactive' where sub_component_id = ?`;
//         // await executeQuery(enqQuizQuery, [quizId]);

//         const totalSubcomponentMarksQuery = `SELECT total_marks FROM subcomponents WHERE sub_component_id = ?; `
//         const totalSubcomponentMarksQueryResult = await executeQuery(totalSubcomponentMarksQuery, [quizId]);
//         const totalSubcomponentMarks = totalSubcomponentMarksQueryResult[0].total_marks;

//         // const totalQuizMarksQuery = `SELECT SUM(obtained_marks) FROM questionevaluations qe 
//         // JOIN enrollements e ON qe.enrollement_id = e.enrollement_id
//         // JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
//         // JOIN students s ON s.student_semester_id = ss.student_semester_id
//         // WHERE qe.sub_component_id = ? GROUP BY qe.enrollement_id; `



//         const totalQuizMarksQuery = `SELECT qe.enrollement_id, SUM(qe.obtained_marks) AS obtained_marks FROM questionevaluations qe
//         JOIN questions q ON q.question_id = qe.question_id
//         WHERE q.sub_component_id = ?
//         GROUP BY qe.enrollement_id;`
//         const totalQuizMarksQueryResult = await executeQuery(totalQuizMarksQuery, [quizId]);

//         const insertMarksQuery = `INSERT INTO subcomponentmarks (sub_component_id, enrollment_id, obtained_marks, out_of_marks) VALUES (?, ?, ?, ?)`;

//         for (const row of totalQuizMarksQueryResult) {
//           await executeQuery(insertMarksQuery, [
//             quizId,
//             row.enrollement_id,
//             row.obtained_marks,
//             totalSubcomponentMarks
//           ]);
//         }



//         //needs to be tested new
//         const room = io.sockets.adapter.rooms.get(quizId);
//         if (room) {
//           for (const socketId of room) {
//             const clientSocket = io.sockets.sockets.get(socketId);
//             if (clientSocket) {
//               clientSocket.leave(quizId); // remove from room
//               clientSocket.emit("quiz-ended", { message: "Quiz has ended by host" });
//               clientSocket.disconnect(true); // optional: fully disconnect from server
//             }
//           }
//         }
//       });


//   socket.on("disconnect", () => {
//     logMessage(["Client disconnected:", socket.id]);
//     // for (const quizId in participants) {
//     //     const participantIndex = participants[quizId]?.findIndex(p => p.socket_id === socket.id);
//     //     if (participantIndex !== -1) {
//     //         participants[quizId][participantIndex].status = 'inactive';
//     //         participants[quizId][participantIndex].disconnectedAt = new Date().toISOString();
//     //     }
//     //   emitRoomStatusToHost(quizId);
//     // }
    
//      for (const quizId in participants) {
//         if (!participants[quizId]) continue;
        
//         const participantIndex = participants[quizId].findIndex(p => p.socket_id === socket.id);
//         if (participantIndex !== -1) {
//             participants[quizId][participantIndex] = {
//                 ...participants[quizId][participantIndex],
//                 status: 'inactive',
//                 socket_id: null // Clear the socket ID to prevent reconnection with same socket
//             };
//             emitRoomStatusToHost(quizId);
//         }
//     }
    
//      for (const quizId in stagingRoomParticipants) {
//         stagingRoomParticipants[quizId] = stagingRoomParticipants[quizId].filter(
//           p => p.socket_id !== socket.id
//         );
//       }
    
//   });
// };
