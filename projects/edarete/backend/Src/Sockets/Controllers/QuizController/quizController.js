const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution.js");
const {
  isHost,
  getAndEmitQuestions,
  submitAnswer,
  addtoLog,
  allParticipantsInCourse,
  getPresentParticipants,
  gradeCodeComments
} = require("./helperFunctions.js");


class QuizController {
  participants = {};
  stagingRoomParticipants = {};
  quizzes = {};
  completedSubcomponents = {};
  allSubcomponentParticipants = {};
  presentSubcomponentParticipants = {};
  blockedParticipants = {};
  // this.io = null; // Will be set when service is available


  /**
   * Optional: Called by SocketService to inject itself
   */
  setSocketService(socketService) {
    this.socketService = socketService;
    this.io = socketService.getIO();
  }

  /**
   * Required Protocol Method: Returns mapping of event names to handlers
   * @returns {Object<string, Function>} Event handlers
   */
  getEventHandlers() {
    return {
      // backward compatibility
      "join-quiz-host": this.handleJoinQuizHost.bind(this),
      "start-subComponent": this.handleStartQuiz.bind(this),
      "submit-answer": this.handleSubmitAnswer.bind(this),
      "block-user": this.handleBlockUser.bind(this),
      "leave-subComponent": this.handleLeaveQuiz.bind(this),
      "mark-attendance": this.handleMarkAttendance.bind(this),
      "subComponent-completed": this.handleQuizCompleted.bind(this),
      "end-subComponent": this.handleEndQuiz.bind(this),
    };
  }

  /**
   * Optional Protocol Method: Called when a client connects
   * Handles the complex initial connection logic
   * @param {Socket} socket - The connected socket
   */
  async onClientConnected(socket) {
    try {

      // Get io instance if not already set
      if (!this.io) {
        this.io = this.socketService.getIO();
      }

      let { subComponentId, participant } = socket.handshake.query;
      socket.participant = JSON.parse(participant);
      socket.subComponentId = subComponentId;
      subComponentId = String(subComponentId);

      // Parse participant if it's a string
      if (typeof participant === "string") {
        try {
          participant = JSON.parse(participant);
        } catch (error) {
          logMessage(["Failed to parse participant:", error]);
          throw new Error("Failed to parse participant");
        }
      }

      logMessage(["DATA RECEIVED ON CONNECTION :::", subComponentId, participant]);

      // Validate participant data
      if (!participant || !participant.urdd || !participant.role) {
        throw new Error("Invalid participant data");
      }
      if (!subComponentId) {
        throw new Error("Quiz id not provided");
      }

      // Initialize quiz data structures
      this.stagingRoomParticipants[subComponentId] ||= [];
      this.participants[subComponentId] ||= [];
      this.blockedParticipants[subComponentId] ||= [];


      this.quizzes[subComponentId] ||= {
        questions: [],
        currentIndex: 0,
        isStarted: false,
        startTime: null,
        hostId: null,
      };

      logMessage(["New client connected:", socket.id]);

      // === RECONNECTION LOGIC ===
      if (this.participants[subComponentId] && this.quizzes[subComponentId] && !(await isHost(subComponentId, participant.urdd))) {
        const quiz = this.quizzes[subComponentId];
        if (quiz && quiz.isStarted) {
          const existingQuizParticipant = this.participants[subComponentId].find(
            p => p.urdd === participant.urdd
          );

          if (existingQuizParticipant) {
            // Check if blocked
            if (this.blockedParticipants[subComponentId]?.[participant.urdd]) {
              this.socketService.emit(socket, "error", {
                message: "You have been blocked or left the quiz.",
                blockedBy: "Host"
              });
              this.socketService.emit(socket, "connection-status", {
                connected: false,
                message: "You have been blocked or left the quiz.",
                timestamp: Date.now()
              });
              throw new Error("You have been blocked or left the quiz.");
            }

            // FCM token check
            if (existingQuizParticipant.fcm_token != participant.fcm_token) {
              logMessage([`⛔ User ${participant.urdd} has a different fcm token for quiz ${subComponentId}`]);
              this.socketService.emit(socket, "error", {
                message: "You have already joined from another device.",
                blockedBy: "Host"
              });
              return;
            }

            // Check if participant has already completed this quiz
            const completedParticipants = this.completedSubcomponents[subComponentId] || [];
            const isParticipantCompleted = completedParticipants.some(p => p.urdd === participant.urdd);

            if (isParticipantCompleted) {
              this.socketService.emit(socket, "error", {
                message: "You have already completed this quiz and cannot rejoin.",
                blockedBy: "System"
              });
              throw new Error("Quiz already completed by this participant");
            }


            // Check threshold time
            const now = Date.now();
            const thresholdTime = 3 * 60 * 1000; // 3 min
            if (quiz.startTime && now - quiz.startTime > thresholdTime) {
              this.socketService.emit(socket, "error", {
                message: "Quiz has started and threshold time passed, cannot join."
              });
              throw new Error("Quiz has started and threshold time passed, cannot join.");
            }

            // Update participant and rejoin
            existingQuizParticipant.socket_id = socket.id;
            existingQuizParticipant.status = "active";
            socket.join(subComponentId);
            logMessage([`Quiz ${subComponentId} rejoined by ${participant.name}`]);
            addtoLog("Quiz rejoined", participant.urdd, subComponentId);

            const res = await getAndEmitQuestions(subComponentId, socket, this.io, true, participant, 'quiz');
            if (res.success && res.questions) this.quizzes[subComponentId].questions = res.questions;
          } else {
            this.socketService.emit(socket, "error", {
              message: "Quiz has already started, cannot join."
            });
            socket.disconnect();
            throw new Error("Quiz has already started, cannot join.");
          }
        }
      }

      // === STAGING ROOM HANDLING ===
      const existingParticipant = this.stagingRoomParticipants[subComponentId].find(
        p => p.urdd === participant.urdd
      );

      if (existingParticipant) {
        existingParticipant.socket_id = socket.id;
      } else {
        this.stagingRoomParticipants[subComponentId].push({
          socket_id: socket.id,
          urdd: participant.urdd,
          name: participant.name,
          role: participant.role,
          email: participant.email,
          fcm_token: participant.fcm_token
        });
      }

      // ✅ NEW: Check if attendance is required for students
      if (participant.role === 'Student') {
        try {
          // Get quiz config to check attendanceRequired
          const configQuery = `SELECT config FROM subcomponents WHERE sub_component_id = ?`;
          const configResult = await executeQuery(configQuery, [subComponentId]);

          if (configResult && configResult.length > 0) {
            const parsedConfig = JSON.parse(configResult[0].config);
            const config = Array.isArray(parsedConfig) ? parsedConfig[0] : parsedConfig;
            const attendanceNotRequired = config?.attendanceNotRequired ?? false;
            const bypassStartQuiz = config?.bypassStartQuiz === true;
            // ✅ If attendance NOT required, auto-mark and move to quiz room
            if (attendanceNotRequired) {
              logMessage([`🔓 Attendance NOT required for quiz ${subComponentId}, auto-marking student ${participant.urdd}`]);

              // Get enrollment ID
              const enrollmentQuery = `
                SELECT e.enrollement_id FROM enrollements e
                JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
                JOIN students s ON ss.student_user_id = s.student_user_id
                WHERE s.urdd_id = ? AND e.status = 'active'
              `;
              const enrollmentResult = await executeQuery(enrollmentQuery, [participant.urdd]);

              if (enrollmentResult && enrollmentResult.length > 0) {
                const enrollement_id = enrollmentResult[1].enrollement_id;

                // Check if attendance already exists
                const checkAttendanceQuery = `
                  SELECT attendance_id FROM lecturesattendance 
                  WHERE enrollement_id = ? AND sub_component_id = ?
                `;
                const existingAttendance = await executeQuery(checkAttendanceQuery, [enrollement_id, subComponentId]);

                // Insert attendance record if not exists
                if (!existingAttendance || existingAttendance.length === 0) {
                  const attendanceQuery = `
                    INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id, status, created_by, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                  `;
                  await executeQuery(attendanceQuery, [
                    enrollement_id,
                    new Date(),
                    true,
                    subComponentId,
                    'active',
                    153,
                    new Date()
                  ]);
                  logMessage([`✅ Auto-marked attendance for ${participant.urdd} in quiz ${subComponentId}`]);
                }

                // Move from staging room to quiz room
                socket.join(subComponentId);
                addtoLog("Quiz joined (auto-attendance)", participant.urdd, subComponentId);

                // Add to active participants
                this.participants[subComponentId].push({
                  email: participant.email,
                  urdd: participant.urdd,
                  socket_id: socket.id,
                  name: participant.name,
                  role: participant.role,
                  status: "active"
                });

                // Add to present participants
                if (!this.presentSubcomponentParticipants[subComponentId]) {
                  this.presentSubcomponentParticipants[subComponentId] = [];
                }
                this.presentSubcomponentParticipants[subComponentId].push({
                  urdd_id: participant.urdd,
                  name: participant.name,
                  email: participant.email,
                  role: participant.role
                });

                // Remove from staging room
                this.stagingRoomParticipants[subComponentId] = this.stagingRoomParticipants[subComponentId].filter(
                  p => p.urdd !== participant.urdd
                );

                // Notify student
                setTimeout(() => {
                  this.socketService.emit(socket, "attendance-success", {
                    success: true,
                    autoMarked: true,
                    data: participant,
                    message: "Attendance automatically marked (not required for this quiz)"
                  });
                }, 1000);

                this.socketService.emit(socket, "connection-status", {
                  connected: true,
                  socketId: socket.id,
                  room: subComponentId,
                  participant,
                  attendanceAutoMarked: true,
                  timestamp: Date.now()
                });

                await this.emitRoomStatusToHost(subComponentId);
                logMessage([`✅ Student ${participant.urdd} bypassed attendance and joined quiz ${subComponentId}`]);
                if (bypassStartQuiz) {
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  await this.handleStartQuiz(socket, { quizId: subComponentId, participant });
                }
                return; // Exit early, skip manual attendance flow
              } else {
                logMessage([`⚠️ Enrollment not found for ${participant.urdd}, falling back to normal flow`]);
              }
            }



          }
        } catch (err) {
          logMessage([`⚠️ Error checking attendance requirement for ${participant.urdd}:`, err]);
          // Continue with normal flow if error occurs
        }
      }

      // ✅ EXISTING CODE: Normal attendance flow (if attendance IS required or error occurred)
      await this.emitRoomStatusToHost(subComponentId);
      const roomName = `attendance-${subComponentId}`;
      socket.join(roomName);


      this.socketService.emit(socket, "connection-status", {
        connected: true,
        socketId: socket.id,
        room: roomName,
        participant,
        timestamp: Date.now()
      });



      //bypass for test
      if (process.env.BYPASS === 'true' && socket.participant.role === 'Student') {
        socket.join(subComponentId);
        setTimeout(() => {
          socket.emit("attendance-success", { success: true, data: socket.participant });
        }, 300);

        //     setTimeout(async () => {
        //         await getAndEmitQuestions(subComponentId, socket, this.io, true, participant, 'lab');
        //     }, 5000);

      }


      logMessage([`Socket ${socket.id} joined room ${roomName}`]);

    } catch (error) {
      logMessage([`Error handling connection for socket ${socket.id}:`, error]);
      this.socketService.emit(socket, "connection-status", {
        connected: false,
        message: error.message || "Error processing connection",
        timestamp: Date.now()
      });
      if (socket && socket.connected) socket.disconnect();
    }
  }

  /**
   * Optional Protocol Method: Called when a client disconnects
   * @param {Socket} socket - The disconnected socket
   * @param {string} reason - Disconnection reason
   */
  onClientDisconnected(socket, reason) {
    logMessage(["Client disconnected:", socket.id, reason]);

    // Update participants status
    for (const quizId in this.participants) {
      if (!this.participants[quizId]) continue;

      const participantIndex = this.participants[quizId].findIndex(p => p.socket_id === socket.id);
      if (participantIndex !== -1) {
        this.participants[quizId][participantIndex] = {
          ...this.participants[quizId][participantIndex],
          status: "inactive",
          socket_id: null // Clear the socket ID to prevent reconnection with same socket
        };
        this.emitRoomStatusToHost(quizId);
      }
    }

    // Remove from staging room
    for (const quizId in this.stagingRoomParticipants) {
      this.stagingRoomParticipants[quizId] = this.stagingRoomParticipants[quizId].filter(
        p => p.socket_id !== socket.id
      );
    }
  }

  // ========== Helper Methods ==========

  /**
   * Emit updated participant lists to host
   */
  async emitRoomStatusToHost(subComponentId) {
    try {
      const all = this.allSubcomponentParticipants[subComponentId] || await allParticipantsInCourse(subComponentId);
      const present = this.presentSubcomponentParticipants[subComponentId] || await getPresentParticipants(subComponentId);
      this.allSubcomponentParticipants[subComponentId] = all;
      this.presentSubcomponentParticipants[subComponentId] = present;

      const completedSubcomponents = this.completedSubcomponents[subComponentId] || [];
      const presentIds = new Set(present.map(p => p.urdd_id));
      const stagingIds = new Set(this.stagingRoomParticipants[subComponentId]?.map(p => p.urdd) || []);

      // const joinedParticipants = (this.participants[subComponentId] || []).filter(p => p.status === "active");
      // new code 
      // const joinedParticipants = (this.participants[subComponentId] || []).filter(p => p.status === "active" &&  !completedSubcomponents.some(comp => comp.userId === p.userId));
      const joinedParticipants = (this.participants[subComponentId] || []).filter(p => p.status === "active" && !completedSubcomponents.some(comp => comp.urdd === p.urdd));
      const absentParticipants = all.filter(p => !presentIds.has(p.urdd_id));
      const absentStagingParticipants = all.filter(p => !presentIds.has(p.urdd_id) && stagingIds.has(p.urdd_id));

      this.socketService.toRoom(`host-${subComponentId}`, "room-participants", {
        joinedParticipants,
        absentParticipants,
        absentStagingParticipants,
        blockedParticipants: this.blockedParticipants[subComponentId] || {},
        completedSubcomponents, // Emit completedSubcomponents list
        subComponentStatus: this.quizzes[subComponentId]?.isStarted
      });

      logMessage([`Emitted updated participant lists for quiz ${subComponentId}`]);
    } catch (err) {
      logMessage(["Failed to emit room status:", err]);
      throw new Error("Failed to emit room status");
    }
  }

  // ========== Event Handlers ==========

  /**
   * Handle host joining quiz
   */
  async handleJoinQuizHost(socket) {
    try {
      let subComponentId = socket.subComponentId;
      socket.join(`host-${subComponentId}`);
      this.participants[subComponentId] ||= [];
      this.stagingRoomParticipants[subComponentId] ||= [];
      this.quizzes[subComponentId] ||= { questions: [], currentIndex: 0, isStarted: false };
      await this.emitRoomStatusToHost(subComponentId);
    } catch (error) {
      logMessage(["Error in join-quiz-host", error.message]);
      this.socketService.emit(socket, "error", { message: "Error emitting room status to host" });
      socket.disconnect();
    }
  }

  /**
   * Handle quiz start
   */
  async handleStartQuiz(socket, { quizId, participant }) {
    try {
      quizId = String(quizId);
      const quiz = this.quizzes[quizId];

      // Fetch quiz config to check for BypassStartQuiz
      let bypassStartQuiz = false;
      try {
        const configQuery = `SELECT config FROM subcomponents WHERE sub_component_id = ?`;
        const configResult = await executeQuery(configQuery, [quizId]);
        if (configResult && configResult.length > 0) {
          const parsedConfig = JSON.parse(configResult[0].config);
          const config = Array.isArray(parsedConfig) ? parsedConfig[0] : parsedConfig;
          bypassStartQuiz = config?.bypassStartQuiz === true;
        }
      } catch (err) {
        logMessage([`⚠️ Error fetching quiz config for BypassStartQuiz:`, err]);
        // If error, default to not bypassing
      }

      // If BypassStartQuiz is true, skip host check and start quiz
      if (!bypassStartQuiz) {
        if (!(await isHost(quizId, participant.urdd))) {
          this.socketService.emit(socket, "error", { message: "You are not the host" });
          return socket.disconnect();
        }
      }

      if (!bypassStartQuiz) {
        quiz.isStarted = true;
      }

      quiz.startTime = Date.now();
      quiz.hostId = participant.urdd;

      await getAndEmitQuestions(quizId, socket, this.io, false, participant, 'quiz');
      await this.emitRoomStatusToHost(quizId);
    } catch (e) {
      logMessage(["Error in start-quiz", e]);
      this.socketService.emit(socket, "error", { message: "Error in start-quiz" });
      if (socket && socket.connected) socket.disconnect();
    }
  }

  /**
   * Handle answer submission
   */
  async handleSubmitAnswer(socket, submissionData) {
    try {
      let { quizId, type, answer, questionId, selectedOptionText, participant, courseId, correctOption, shuffledQuestionData, testResults } = submissionData;

      quizId = String(quizId);

      const shuffledQuestion = shuffledQuestionData.shuffledQuestion;



      await submitAnswer(questionId, answer, testResults, participant, quizId, courseId, participant.urdd, correctOption, shuffledQuestion, type);


    } catch (err) {
      logMessage(["Error in submit-answer", err]);
      this.socketService.emit(socket, "error", { message: "Error in submit-answer" });
      if (socket && socket.connected) socket.disconnect();
    }
  }


  /**
   * Handle blocking a user
   */
  async handleBlockUser(socket, { quizId, participant, reason, questionId }) {
    try {
      let subComponentId = socket.subComponentId;
      let participant = socket.participant;
      let urdd = participant.urdd;

      logMessage([`📝 User ${participant?.urdd} blocked from quiz ${subComponentId} - saved to database`]);

      if (!this.blockedParticipants[subComponentId]) {
        this.blockedParticipants[subComponentId] = {};
      }

      const existingblockedParticipant = this.blockedParticipants[subComponentId].find(
        p => p.urdd === participant.urdd
      );

      if (existingblockedParticipant) {
        logMessage([`⚠️ User ${participant?.urdd} is already blocked from quiz ${subComponentId}`]);
      } else {
        this.blockedParticipants[subComponentId].push({
          socket_id: socket.id,
          urdd: participant.urdd,
          name: participant.name,
          role: participant.role,
          email: participant.email,
          fcm_token: participant.fcm_token
        });
        logMessage([`✅ User ${participant?.urdd} blocked from quiz ${subComponentId}`]);
        const blockedParticipant = this.participants[subComponentId]?.find(p => p.urdd === participant?.urdd);
        if (blockedParticipant) {
          Object.assign(blockedParticipant, {
            status: "inactive",
            socket_id: null
          });
        }
        socket.leave(subComponentId);
        await this.emitRoomStatusToHost(subComponentId);
        return socket.disconnect();
      }
    }
    catch (error) {
      logMessage(["Error in blocking user from quiz: " + error.message]);
      this.socketService.emit(socket, "error", { message: "Error in blocking user from quiz: " + error.message });
      if (socket && socket.connected) socket.disconnect();
    }
  }

  /**
   * Handle user leaving quiz
   */
  async handleLeaveQuiz(socket) {
    try {
      let subComponentId = socket.subComponentId;
      let participant = socket.participant;
      logMessage([`📝 User ${participant?.urdd} left quiz ${subComponentId}`]);

      if (!this.blockedParticipants[subComponentId]) {
        this.blockedParticipants[subComponentId] = {};
      }

      const blockedParticipants = this.blockedParticipants[subComponentId];
      if (blockedParticipants[participant?.urdd]) {
        logMessage([`⚠️ User ${participant?.urdd} is already blocked from quiz ${subComponentId}`]);
      } else {
        blockedParticipants[participant?.urdd] = true;
        logMessage([`✅ User ${participant?.urdd} left quiz ${subComponentId}`]);

        const blockedParticipant = this.participants[subComponentId]?.find(p => p.urdd === participant?.urdd);
        if (blockedParticipant) {
          Object.assign(blockedParticipant, {
            status: "inactive",
            socket_id: null
          });
        }
        socket.leave(subComponentId);
        socket.disconnect();
        await this.emitRoomStatusToHost(subComponentId);
      }
    } catch (error) {
      logMessage(["Error in blocking participant from quiz", error.message]);
      this.socketService.emit(socket, "error", { message: "Error in blocking user from quiz: " + error.message });
      socket.leave(subComponentId);
      if (socket && socket.connected) socket.disconnect();
    }
  }

  /**
   * Handle marking attendance
   */
  async handleMarkAttendance(socket, { hostInfo, scannedData }) {
    try {
      logMessage(["INSIDE MARK ATTENDANCE EVENT, DATA: ", hostInfo, scannedData]);
      const { urdd_id: hostUrdd, role: hostRole } = hostInfo;
      const { rfidUid: participantNfcId, quizId, courseId, qrCode } = scannedData;
      logMessage(["QRCODE :::: ", qrCode]);

      if (hostRole !== "Admin" && !(await isHost(quizId, hostUrdd))) {
        this.socketService.emit(socket, "error", { message: "You are not the host of this quiz" });
        return socket.disconnect();
      }

      if (!participantNfcId && !qrCode) {
        this.socketService.emit(socket, "error", { message: "Neither NFC or qrCode provided" });
        return socket.disconnect();
      }

      let enrollement_id;
      let participantInfo;

      if (participantNfcId) {
        const nfcCheckQuery = `SELECT * from students where nfc_token = ?`;
        const nfcCheckQueryResult = await executeQuery(nfcCheckQuery, [participantNfcId]);
        if (!nfcCheckQueryResult || nfcCheckQueryResult.length === 0) {
          this.socketService.emit(socket, "error", { message: "NFC not found for student" });
          return socket.disconnect();
        }
        const nfcDataResult = nfcCheckQueryResult[0];

        const getEnrollmentIdQuery = `
          SELECT e.enrollement_id, s.urdd_id FROM enrollements e
          JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
          JOIN students s ON ss.student_user_id = s.student_user_id
          JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id 
          JOIN users u ON u.user_id = urdd.user_id
          WHERE e.course_id = ? AND s.student_user_id = ? AND e.status= 'active'
        `;
        const getEnrollmentIdQueryResult = await executeQuery(getEnrollmentIdQuery, [courseId, nfcDataResult.student_user_id]);
        if (!getEnrollmentIdQueryResult || getEnrollmentIdQueryResult.length === 0) {
          this.socketService.emit(socket, "error", { message: "Enrollment not found for participant" });
          return socket.disconnect();
        }

        enrollement_id = getEnrollmentIdQueryResult[0].enrollement_id;
        participantInfo = getEnrollmentIdQueryResult[0];
      } else {
        const qrCodeCheckQuery = `SELECT * from qr_code where qr_code = ?`;
        const qrCodeCheckQueryResult = await executeQuery(qrCodeCheckQuery, [qrCode]);
        if (!qrCodeCheckQueryResult || qrCodeCheckQueryResult.length === 0) {
          this.socketService.emit(socket, "error", { message: "Qr code not found for student" });
          return socket.disconnect();
        }
        const qrCodeInfo = qrCodeCheckQueryResult[0];

        const getEnrollmentIdQuery = `
          SELECT e.enrollement_id, s.urdd_id FROM enrollements e
          JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
          JOIN students s ON ss.student_user_id = s.student_user_id
          JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id 
          JOIN users u ON u.user_id = urdd.user_id
          WHERE e.course_id = ? AND s.urdd_id = ? AND e.status= 'active'
        `;
        const getEnrollmentIdQueryResult = await executeQuery(getEnrollmentIdQuery, [courseId, qrCodeInfo.urdd_id]);
        if (!getEnrollmentIdQueryResult || getEnrollmentIdQueryResult.length === 0) {
          this.socketService.emit(socket, "error", { message: "Enrollment not found for participant" });
          return socket.disconnect();
        }

        enrollement_id = getEnrollmentIdQueryResult[0].enrollement_id;
        participantInfo = getEnrollmentIdQueryResult[0];
      }

      const attendanceQuery = `
        INSERT INTO lecturesattendance (enrollement_id , date, is_present, sub_component_id , status , created_by ,created_at )
        VALUES (? , ? , ? , ? , ? , ? , ?)
      `;
      await executeQuery(attendanceQuery, [enrollement_id, new Date(), true, quizId, "active", hostUrdd, new Date()]);

      const participantObj = this.stagingRoomParticipants[quizId]?.find(p => p.urdd === participantInfo.urdd_id);
      if (participantObj) {
        const participantSocketId = participantObj.socket_id;
        const participantSocket = this.io.sockets.sockets.get(participantSocketId);
        if (participantSocket) {
          const oldRoom = `attendance-${quizId}`;
          const newRoom = `${quizId}`;

          participantSocket.leave(oldRoom);
          addtoLog("Quiz joined", participantInfo.urdd_id, quizId);
          participantSocket.join(newRoom);

          this.participants[quizId].push({
            email: participantObj.email,
            urdd: participantObj.urdd,
            // socket_id: participantObj.socket_id,
            name: participantObj.name,
            role: participantObj.role,
            status: "active"
          });

          if (this.presentSubcomponentParticipants[quizId]) {
            this.presentSubcomponentParticipants[quizId].push({
              urdd_id: participantObj.urdd,
              name: participantObj.name,
              email: participantObj.email,
              role: participantObj.role
            });
          }

          this.stagingRoomParticipants[quizId] = this.stagingRoomParticipants[quizId].filter(p => p.urdd !== participantObj.urdd);
          logMessage([`Participant ${participantInfo.urdd_id} moved from ${oldRoom} to ${newRoom}`], true);

          this.socketService.emit(participantSocket, "attendance-success", { success: true, data: participantInfo });
          logMessage(["Attendance marked successfully for participant ", participantSocket.id]);
          await this.emitRoomStatusToHost(quizId);
        } else {
          logMessage([`Socket not found for participant ID: ${participantSocketId}`]);
          this.socketService.emit(socket, "error", {
            message: "You have already given Quiz, No participant found for socket id",
          });
          socket.disconnect();
        }
      }
    } catch (error) {
      logMessage(["Error in mark-attendance:", error], true);
      this.socketService.emit(socket, "error", { message: "Error marking attendance" });
      if (socket && socket.connected) socket.disconnect();
    }
  }

  //new code 

  async handleQuizCompleted(socket, data) {
    try {
      // Step 1: Validate input data
      const subComponentId = socket.subComponentId;
      const participant = data?.participant || socket.participant;

      if (!participant || !participant.urdd) {
        logMessage(["❌ handleQuizCompleted: invalid participant"]);
        this.socketService.emit(socket, "error", { message: "Invalid participant data" });
        return socket.disconnect();
      }

      // Step 2: Mark participant as completed
      try {
        if (!this.completedSubcomponents[subComponentId]) {
          this.completedSubcomponents[subComponentId] = [];
        }

        const alreadyAdded = this.completedSubcomponents[subComponentId]
          .some(p => p.urdd === participant.urdd);

        if (!alreadyAdded) {
          this.completedSubcomponents[subComponentId].push({
            ...participant,
            completedAt: new Date().toISOString()
          });
          logMessage([`🏁 User ${participant.urdd} marked as completed for quiz ${subComponentId}`]);
        }

        // Remove participant from active participants list
        if (this.participants[subComponentId]) {
          this.participants[subComponentId] = this.participants[subComponentId].filter(
            p => p.urdd !== participant.urdd
          );
        }
      } catch (err) {
        logMessage(["❌ Error marking participant as completed:", err.message]);
        throw new Error("Failed to mark participant as completed");
      }

      // Step 3: Fetch subcomponent config
      let subComponentConfig;
      let parentSubComponentConfig;
      try {
        const subComponentConfigQuery = `SELECT config from subcomponents s where s.sub_component_id = ?`;
        const subComponentConfigQueryResult = await executeQuery(subComponentConfigQuery, [subComponentId]);

        if (!subComponentConfigQueryResult || subComponentConfigQueryResult.length === 0) {
          throw new Error("Subcomponent config not found");
        }

        subComponentConfig = JSON.parse(subComponentConfigQueryResult[0].config);
      } catch (err) {
        logMessage(["❌ Error fetching subcomponent config:", err.message]);
        throw new Error("Failed to fetch subcomponent configuration");
      }

      if (subComponentConfig[0]?.parentSubComponentId?.value && subComponentConfig[0]?.parentSubComponentId !== null) {
        let parentSubComponentConfig = subComponentConfig[0]?.parentSubComponentId.value;
        logMessage(["Parent SubComponent Config:", parentSubComponentConfig]);

        // Step 4: Get enrollment ID
        let enrollement_id;
        try {
          const enrollementQuery = `SELECT enrollement_id 
        FROM enrollements e
        JOIN courses c ON e.course_id = c.course_id
        JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
        JOIN students s ON ss.student_user_id = s.student_user_id
        WHERE s.urdd_id = ? AND e.course_id = ? AND e.status = 'active'`;
          const enrollementQueryResult = await executeQuery(enrollementQuery, [participant.urdd, data?.courseId]);

          if (!enrollementQueryResult || enrollementQueryResult.length === 0) {
            throw new Error("Enrollment not found for participant");
          }

          enrollement_id = enrollementQueryResult[0].enrollement_id;
        } catch (err) {
          logMessage(["❌ Error fetching enrollment ID:", err.message]);
          throw new Error("Failed to fetch enrollment ID: " + err.message);
        }



        // Step 5: Get viva marks
        let marksQueryResult;
        try {
          const marksQuery = `SELECT q.question_id, q.question_marks, qe.obtained_marks FROM questionevaluations qe
      LEFT JOIN questions q ON q.question_id = qe.question_id 
      LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id
      WHERE sc.sub_component_id = ? AND qe.enrollement_id = ?`;
          marksQueryResult = await executeQuery(marksQuery, [subComponentId, enrollement_id]);
        } catch (err) {
          logMessage(["❌ Error fetching viva marks:", err.message]);
          throw new Error("Failed to fetch viva marks: " + err.message);
        }

        if (marksQueryResult.length > 0) {
          // Step 6: Calculate percentage from viva marks
          let percentage, finalResult;
          try {
            const firstRow = marksQueryResult[0];
            const questionMarks = parseFloat(firstRow.question_marks);
            const obtainedMarks = parseFloat(firstRow.obtained_marks);
            percentage = questionMarks > 0 ? (obtainedMarks / questionMarks) : 0;
            logMessage([`📊 Viva performance: ${obtainedMarks}/${questionMarks} = ${percentage * 100}%`]);
          } catch (err) {
            logMessage(["❌ Error calculating viva percentage:", err.message]);
            throw new Error("Failed to calculate viva percentage: " + err.message);
          }

          // Step 7: Insert Conducting Experiment marks
          let conductingExperimentQuestionId, conductingExperimentNumber;
          try {
            const conductingExperimentQuestionQuery = `SELECT q.question_id, q.question_marks FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '2. Conducting Experiment' AND sc.sub_component_id = ?`;
            const conductingExperimentQuestionQueryResult = await executeQuery(conductingExperimentQuestionQuery, [parentSubComponentConfig]);

            if (!conductingExperimentQuestionQueryResult || conductingExperimentQuestionQueryResult.length === 0) {
              throw new Error("Conducting Experiment question not found");
            }

            conductingExperimentQuestionId = conductingExperimentQuestionQueryResult[0].question_id;
            conductingExperimentNumber = parseFloat(conductingExperimentQuestionQueryResult[0].question_marks);
            const result = percentage * conductingExperimentNumber;
            finalResult = Math.round((result + Number.EPSILON) * 100) / 100;

            const insertConductingExperiment = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertConductingExperiment, [
              enrollement_id,
              conductingExperimentQuestionId,
              'Auto-calculated from viva performance',
              finalResult.toString(),
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Conducting Experiment: ${finalResult} marks`]);
          } catch (err) {
            logMessage(["❌ Error inserting Conducting Experiment marks:", err.message]);
            throw new Error("Failed to insert Conducting Experiment marks: " + err.message);
          }

          // Step 8: Insert Computer Use marks
          try {
            const computerUserQuestionIdQuery = `SELECT q.question_id FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '3. Computer Use' AND sc.sub_component_id = ?`;
            const computerUserQuestionIdQueryResult = await executeQuery(computerUserQuestionIdQuery, [parentSubComponentConfig]);

            if (!computerUserQuestionIdQueryResult || computerUserQuestionIdQueryResult.length === 0) {
              throw new Error("Computer Use question not found");
            }

            const computerUserQuestionId = computerUserQuestionIdQueryResult[0].question_id;

            const insertComputerUse = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertComputerUse, [
              enrollement_id,
              computerUserQuestionId,
              'Auto-calculated from viva performance',
              finalResult.toString(),
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Computer Use: ${finalResult} marks`]);
          } catch (err) {
            logMessage(["❌ Error inserting Computer Use marks:", err.message]);
            throw new Error("Failed to insert Computer Use marks: " + err.message);
          }

          // Step 9: Insert Data Collection marks
          try {
            const dataCollectionQuestionIdQuery = `SELECT q.question_id FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '6. Data Collection' AND sc.sub_component_id = ?`;
            const dataCollectionQuestionIdQueryResult = await executeQuery(dataCollectionQuestionIdQuery, [parentSubComponentConfig]);

            if (!dataCollectionQuestionIdQueryResult || dataCollectionQuestionIdQueryResult.length === 0) {
              throw new Error("Data Collection question not found");
            }

            const dataCollectionQuestionId = dataCollectionQuestionIdQueryResult[0].question_id;

            const insertDataCollection = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertDataCollection, [
              enrollement_id,
              dataCollectionQuestionId,
              'Auto-calculated from viva performance',
              finalResult.toString(),
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Data Collection: ${finalResult} marks`]);
          } catch (err) {
            logMessage(["❌ Error inserting Data Collection marks:", err.message]);
            throw new Error("Failed to insert Data Collection marks: " + err.message);
          }

          // Step 10: Calculate lab performance and difference
          let labPercentage, labPerformanceMinusTestCasePerformance, labAndVivaPerformanceDifference;
          try {
            const testCaseNumber = 5;
            const labSubmissionPercentageQuery = `SELECT qe.obtained_marks FROM questionevaluations qe 
        LEFT JOIN questions q ON q.question_id = qe.question_id 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id
        WHERE sc.sub_component_id = ? AND qe.enrollement_id = ?`;
            const labSubmissionPercentageResult = await executeQuery(labSubmissionPercentageQuery, [parentSubComponentConfig, enrollement_id]);

            if (!labSubmissionPercentageResult || labSubmissionPercentageResult.length === 0) {
              throw new Error("Lab submission not found");
            }

            labPercentage = parseFloat(labSubmissionPercentageResult[0].obtained_marks);
            labPerformanceMinusTestCasePerformance = labPercentage * testCaseNumber;
            labAndVivaPerformanceDifference = labPerformanceMinusTestCasePerformance - finalResult;
            logMessage([`📊 Lab vs Viva difference: ${labAndVivaPerformanceDifference}`]);
          } catch (err) {
            logMessage(["❌ Error calculating lab performance:", err.message]);
            throw new Error("Failed to calculate lab performance: " + err.message);
          }

          // Step 11: Calculate Realization of Experiment
          let realizationOfExperiment = 0;
          let realizationOfExperimentQuestionId;
          try {
            const realizationExperimentQuestionQuery = `SELECT q.question_id FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '1. Realization of Experiment' AND sc.sub_component_id = ?`;
            const realizationOfExperimentQuestionQueryResult = await executeQuery(realizationExperimentQuestionQuery, [parentSubComponentConfig]);

            if (!realizationOfExperimentQuestionQueryResult || realizationOfExperimentQuestionQueryResult.length === 0) {
              throw new Error("Realization of Experiment question not found");
            }

            realizationOfExperimentQuestionId = realizationOfExperimentQuestionQueryResult[0].question_id;

            if (labAndVivaPerformanceDifference > 1) {
              // Penalty scenario
              const totalNumberOfQuiz = `SELECT 
            SUM(q.question_marks) AS total_question_marks,
            SUM(qe.obtained_marks) AS total_obtained_marks
            FROM questions q
            LEFT JOIN questionevaluations qe ON qe.question_id = q.question_id
            WHERE q.sub_component_id = ? AND qe.enrollement_id = ?`;
              const totalNumberOfQuizResult = await executeQuery(totalNumberOfQuiz, [subComponentId, enrollement_id]);
              const totalQuizNumbers = totalNumberOfQuizResult[0];
              const totalQuestionMarks = parseFloat(totalQuizNumbers.total_question_marks) || 0;
              const totalObtainedMarks = parseFloat(totalQuizNumbers.total_obtained_marks) || 0;
              const vivaTotalPercentage = totalQuestionMarks === 0 ? 0 : (totalObtainedMarks / totalQuestionMarks) * 5;
              const testCaseNumber = 5;
              const vivaTotalMarks = vivaTotalPercentage / testCaseNumber;
              realizationOfExperiment = labPerformanceMinusTestCasePerformance * vivaTotalMarks;
              logMessage([`⚠️ Penalty applied: Realization = ${realizationOfExperiment}`]);
            } else {
              // Full marks scenario
              realizationOfExperiment = labPerformanceMinusTestCasePerformance;
              logMessage([`✅ Full marks: Realization = ${realizationOfExperiment}`]);
            }
          } catch (err) {
            logMessage(["❌ Error calculating Realization of Experiment:", err.message]);
            throw new Error("Failed to calculate Realization of Experiment: " + err.message);
          }

          // Step 12: Insert Realization of Experiment marks
          try {
            const insertRealization = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertRealization, [
              enrollement_id,
              realizationOfExperimentQuestionId,
              'Auto-calculated from lab and viva performance',
              realizationOfExperiment.toString(),
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Realization of Experiment: ${realizationOfExperiment} marks`]);
          } catch (err) {
            logMessage(["❌ Error inserting Realization of Experiment marks:", err.message]);
            throw new Error("Failed to insert Realization of Experiment marks: " + err.message);
          }

          // Step 13: Insert Data Analysis marks
          try {
            const dataAnalysisQuestionIdQuery = `SELECT q.question_id FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '7. Data Analysis' AND sc.sub_component_id = ?`;
            const dataAnalysisQuestionIdQueryResult = await executeQuery(dataAnalysisQuestionIdQuery, [parentSubComponentConfig]);

            if (!dataAnalysisQuestionIdQueryResult || dataAnalysisQuestionIdQueryResult.length === 0) {
              throw new Error("Data Analysis question not found");
            }

            const dataAnalysisQuestionId = dataAnalysisQuestionIdQueryResult[0].question_id;

            const insertDataAnalysis = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertDataAnalysis, [
              enrollement_id,
              dataAnalysisQuestionId,
              'Auto-calculated from realization',
              realizationOfExperiment.toString(),
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Data Analysis: ${realizationOfExperiment} marks`]);
          } catch (err) {
            logMessage(["❌ Error inserting Data Analysis marks:", err.message]);
            throw new Error("Failed to insert Data Analysis marks: " + err.message);
          }

          // Step 14: Calculate and insert code commenting marks
          try {
            const studentAnswerQuery = `SELECT student_answer FROM questionevaluations qe 
        LEFT JOIN questions q ON q.question_id = qe.question_id 
        WHERE q.sub_component_id = ? AND qe.enrollement_id = ?`;
            const studentAnswerQueryResult = await executeQuery(studentAnswerQuery, [subComponentId, enrollement_id]);

            let concatCodesString = '';
            if (studentAnswerQueryResult && studentAnswerQueryResult.length > 0) {
              const studentAnswer = JSON.parse(studentAnswerQueryResult[0].student_answer);
              for (const key in studentAnswer) {
                if (studentAnswer[key].value) {
                  concatCodesString += studentAnswer[key].value;
                }
              }
            }

            const commentResult = await gradeCodeComments(concatCodesString);
            logMessage([`📝 Code comment grade: ${commentResult}`]);

            // Get comment question ID (for Safety/Discipline)
            const commentQuestionQuery = `SELECT q.question_id FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '5. Laboratory Safety and Disciplinary Rules' AND sc.sub_component_id = ?`;
            const commentQuestionIdQueryResult = await executeQuery(commentQuestionQuery, [parentSubComponentConfig]);

            if (!commentQuestionIdQueryResult || commentQuestionIdQueryResult.length === 0) {
              throw new Error("Laboratory Safety and Disciplinary Rules question not found");
            }

            const commentQuestionId = commentQuestionIdQueryResult[0].question_id;

            const insertComments = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertComments, [
              enrollement_id,
              commentQuestionId,
              'Auto-calculated from code comments',
              commentResult.toString(),
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Laboratory Safety marks: ${commentResult} marks`]);
          } catch (err) {
            logMessage(["❌ Error calculating/inserting code comment marks:", err.message]);
            throw new Error("Failed to calculate/insert code comment marks: " + err.message);
          }

          // Step 15: Insert Teamwork marks (hardcoded full marks)
          try {
            const groupMemberQuestionQuery = `SELECT q.question_id FROM questions q 
        LEFT JOIN subcomponents sc ON sc.sub_component_id = q.sub_component_id 
        WHERE q.description = '4. Teamwork' AND sc.sub_component_id = ?`;
            const groupMemberQuestionQueryResult = await executeQuery(groupMemberQuestionQuery, [parentSubComponentConfig]);

            if (!groupMemberQuestionQueryResult || groupMemberQuestionQueryResult.length === 0) {
              throw new Error("Teamwork question not found");
            }

            const groupMemberQuestionId = groupMemberQuestionQueryResult[0].question_id;

            const insertTeamwork = `
          INSERT INTO questionevaluations 
          (enrollement_id, question_id, student_answer, obtained_marks, created_by, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            await executeQuery(insertTeamwork, [
              enrollement_id,
              groupMemberQuestionId,
              'Full marks for teamwork',
              '5',
              participant.urdd,
              'active'
            ]);
            logMessage([`✅ Inserted Teamwork: 5 marks (full marks)`]);
          } catch (err) {
            logMessage(["❌ Error inserting Teamwork marks:", err.message]);
            throw new Error("Failed to insert Teamwork marks: " + err.message);
          }

          logMessage(["✅ All 7 template questions inserted successfully for participant:", participant.urdd]);
        } else {
          logMessage(['⚠️ No viva marks data found for participant:', participant.urdd]);
        }

      }

      // Step 16: Emit updated room status to host
      try {
        await this.emitRoomStatusToHost(subComponentId);
        logMessage([`✅ Room status updated for host in quiz ${subComponentId}`]);
      } catch (err) {
        logMessage(["❌ Error emitting room status to host:", err.message]);
        // Non-critical error, continue execution
      }

      // Step 17: Remove participant from room and disconnect
      try {
        socket.leave(subComponentId);
        logMessage([`👋 Participant ${participant.urdd} disconnected from quiz ${subComponentId}`]);
        return socket.disconnect();
      } catch (err) {
        logMessage(["❌ Error disconnecting socket:", err.message]);
        // Try to disconnect anyway
        if (socket?.connected) socket.disconnect();
      }

    } catch (err) {
      logMessage(["❌ Error in handleQuizCompleted:", err.message]);
      this.socketService.emit(socket, "error", { message: err.message });

      if (socket?.connected) socket.disconnect();
    }
  }


  /**
   * Handle ending quiz
   */
  async handleEndQuiz(socket) {
    try {
      let subComponentId = socket.subComponentId;
      let participant = socket.participant;
      const quiz = this.quizzes[subComponentId];

      if (!quiz) {
        this.socketService.emit(socket, "error", "subcomponent not found");
        return;
      }

      if (quiz.hostId !== participant.urdd) {
        this.socketService.emit(socket, "error", "You are not the host of this subcomponent");
        return;
      }

      this.socketService.toRoom(subComponentId, "subComponent-ended", {
        message: "Quiz ended by host",
        endedBy: participant.urdd
      });

      // Clean up memory for this quiz
      // FIX 15, 16, 17: Added 'this.'


      // Calculate and save marks
      const totalSubcomponentMarksQuery = `SELECT total_marks FROM subcomponents WHERE sub_component_id = ?;`;
      const totalSubcomponentMarksQueryResult = await executeQuery(totalSubcomponentMarksQuery, [subComponentId]);
      const totalSubcomponentMarks = totalSubcomponentMarksQueryResult[0].total_marks;

      const totalQuizMarksQuery = `
        SELECT qe.enrollement_id, SUM(qe.obtained_marks) AS obtained_marks FROM questionevaluations qe
        JOIN questions q ON q.question_id = qe.question_id
        WHERE q.sub_component_id = ?
        GROUP BY qe.enrollement_id;
      `;
      const totalQuizMarksQueryResult = await executeQuery(totalQuizMarksQuery, [subComponentId]);

      const insertMarksQuery = `INSERT INTO subcomponentmarks (sub_component_id, enrollment_id, obtained_marks, out_of_marks) VALUES (?, ?, ?, ?)`;

      for (const row of totalQuizMarksQueryResult) {
        await executeQuery(insertMarksQuery, [
          subComponentId,
          row.enrollement_id,
          row.obtained_marks,
          totalSubcomponentMarks
        ]);
      }

      // make the subComponent Inactive
      const inactiveSubComponent = `Update subcomponents SET sub_component_status = 'complete' WHERE sub_component_id = ?`;
      const inactiveSubComponentResult = await executeQuery(inactiveSubComponent, [subComponentId]);

      // ✅ Clean up all memory for this quiz
      logMessage(["🧹 Cleaning up quiz data for subComponentId:", subComponentId]);
      logMessage(["📊 completedSubcomponents before cleanup:", this.completedSubcomponents[subComponentId]]);

      delete this.participants[subComponentId];
      delete this.stagingRoomParticipants[subComponentId];
      delete this.quizzes[subComponentId];
      delete this.completedSubcomponents[subComponentId];
      delete this.blockedParticipants[subComponentId];
      delete this.allSubcomponentParticipants[subComponentId];
      delete this.presentSubcomponentParticipants[subComponentId];



      // Disconnect all clients in the room
      const room = this.io.sockets.adapter.rooms.get(subComponentId);
      if (room) {
        for (const socketId of room) {
          const clientSocket = this.io.sockets.sockets.get(socketId);
          if (clientSocket) {
            clientSocket.leave(subComponentId);
            this.socketService.emit(clientSocket, "subComponent-ended", { success: true, message: "Quiz has ended by host" });
            clientSocket.disconnect(true);
          }
        }
      }


    } catch (error) {
      logMessage(["Error in end-quiz:", error]);
      this.socketService.emit(socket, "error", { message: "Error ending quiz" });
    }
  }
}

module.exports = QuizController;
