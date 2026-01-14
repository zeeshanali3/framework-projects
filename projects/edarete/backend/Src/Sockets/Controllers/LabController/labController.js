const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution.js");
const { submitAnswer, getPresentParticipants, allParticipantsInCourse, isHost, getAndEmitQuestions } = require("./helperFunctions.js");
const BaseSocketDelegate = require("../../../../Services/Integrations/Socket/BaseSocketDelegate.js");

// Helper function to log a message for the attendance feature
// Note: 'addtoLog' was used in the original code but not imported. Assuming 'logMessage' is the intended function.
const addtoLog = (...args) => logMessage(args);

class LabController extends BaseSocketDelegate {

  // 1. Use modern Class Field Declarations for initialization (cleaner and avoids repetition in constructor)
  //    These are instance properties, so they implicitly use 'this.'
  participants = {};
  stagingRoomParticipants = {};
  labs = {};
  blockedParticipants = {};
  completedSubcomponents = new Set();
  allSubcomponentParticipants = {};
  presentSubcomponentParticipants = {};
  // Map queryId -> studentSocketId for quick notifications
  _queryToSocketMap = new Map();


  // 2. Optimized constructor: only needs to call super(). 
  //    The property initializations above are automatically handled.
  constructor() {
    super();
  }


  getUnboundEventHandlers() {
    return {
      "start-subComponent": this.handleStartSubComponent,
      "submit-answer": this.handleSubmitAnswer,
      "hand-raise": this.subComponentquery,
      "query-attend": this.handleQueryAttend,
      "student-rating": this.handleResolveQueryStudent,
      "admin-rating": this.handleResolveQueryInstructor,
      "leave-subComponent": this.handleLeaveSubComponent,
      "mark-attendance": this.handleMarkAttendance,
      "subComponent-completed": this.handleSubComponentCompleted,
      "end-subComponent": this.handleEndSubComponent,
    };
  }  // --- emitRoomStatusToHost ---
  async emitRoomStatusToHost(subComponentId) {
    try {
      // Ensure all properties are accessed with 'this.'
      const all = this.allSubcomponentParticipants[subComponentId] || await allParticipantsInCourse(subComponentId);
      const present = this.presentSubcomponentParticipants[subComponentId] || await getPresentParticipants(subComponentId);
      this.allSubcomponentParticipants[subComponentId] = all;
      this.presentSubcomponentParticipants[subComponentId] = present;

      // Convert Set to array for emission, filtering by subComponentId
      const completedSubcomponents = [...this.completedSubcomponents]
        .filter(key => key.startsWith(`${subComponentId}:`))
        .map(key => key.split(':')[1]); // Extract urdd from "subComponentId:urdd"

      const presentIds = new Set(present.map(p => p.urdd_id));
      // Corrected stagingIds access (urdd is used in the staging array)
      const stagingIds = new Set(this.stagingRoomParticipants[subComponentId]?.map(p => p.urdd) || []);

      const joinedParticipants = (this.participants[subComponentId] || []).filter(p => p.status === "active");
      const absentParticipants = all.filter(p => !presentIds.has(p.urdd_id));
      // Corrected logic to filter out participants who are absent BUT still in the staging room
      const absentStagingParticipants = all.filter(
        p => !presentIds.has(p.urdd_id) && stagingIds.has(p.urdd_id)
      );

      this.socketService.toRoom(`host-${subComponentId}`, "room-participants", {
        joinedParticipants,
        absentParticipants,
        absentStagingParticipants,
        blockedParticipants: this.blockedParticipants[subComponentId] || {},
        completedSubcomponents, // Emit completedSubcomponents list
        subComponentStatus: this.labs[subComponentId]?.isStarted
      });

      logMessage([`Emitted updated participant lists for lab ${subComponentId}`]);
    } catch (err) {
      logMessage(["Failed to emit room status:", err]);
      // Do not throw if error is only logging/emitting. Let connection proceed if possible.
    }
  }


  // --- onClientConnected ---
  async onClientConnected(socket) {
    try {
      const { subComponentId, participant } = socket.handshake.query;

      if (!subComponentId || !participant) {
        throw new Error("Missing subComponentId or participant information");
      }

      // Parse participant info and attach to socket
      socket.participant = JSON.parse(participant);
      socket.subComponentId = subComponentId;

      // Initialize lab data structures (all accessed with 'this.')
      this.stagingRoomParticipants[subComponentId] ||= [];
      this.participants[subComponentId] ||= [];
      this.labs[subComponentId] ||= {
        questions: [],
        currentIndex: 0,
        isStarted: false,
        startTime: null,
        hostId: new Set(), // Changed to Set for efficient storage of multiple hosts
      };

      // Corrected: Access lab data using 'this.labs'
      const labRoom = this.labs[subComponentId];

      // Handle connection based on role
      if (socket.participant.role === 'Student') {
        await this.handleStudentConnection(socket, labRoom);
      } else if (['Admin', 'Teacher', 'TA'].includes(socket.participant.role)) {
        await this.handleInstructorConnection(socket, labRoom);
      }
      else {
        this.emit(socket, "error", 'Only students and teachers can use the socket');
      }
      // Common connection status
      this.emit(socket, "connection-status", {
        connected: true,
        socketId: socket.id,
        participant: socket.participant,
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

    } catch (error) {
      logMessage([`Error in onClientConnected:`, error.message]); // Log message property
      // Only emit connection-status=false on error
      this.emit(socket, "connection-status", {
        connected: false,
        socketId: socket.id,
        participant: socket.participant,
        timestamp: Date.now()
      });
      this.emit(socket, "error", {
        message: error.message || "Connection error"
      });
      if (socket && socket.connected) socket.disconnect();
    }
  }


  // --- handleStudentConnection ---
  async handleStudentConnection(socket, labRoom) {
    try {
      const { subComponentId } = socket;
      const { urdd, name, email, role, fcm_token } = socket.participant;
      const participantKey = `${subComponentId}:${urdd}`;

      // --- Attendance Bypass Logic ---
      let attendanceNotRequired = false;
      let bypassStartQuiz = false;
      try {
        const configQuery = `SELECT config FROM subcomponents WHERE sub_component_id = ?`;
        const configResult = await executeQuery(configQuery, [subComponentId]);
        if (configResult && configResult.length > 0) {
          const parsedConfig = JSON.parse(configResult[0].config);
          const config = Array.isArray(parsedConfig) ? parsedConfig[0] : parsedConfig;
          attendanceNotRequired = config?.attendanceNotRequired === true;
          bypassStartQuiz = config?.bypassStartQuiz === true;
        }
      } catch (err) {
        logMessage(["Error fetching config for attendance bypass:", err]);
      }

      if (attendanceNotRequired) {
        // Mark attendance in DB (if not already marked)
        const enrollmentQuery = ` SELECT e.enrollement_id FROM enrollements e
        JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
        JOIN students s ON ss.student_user_id = s.student_user_id
        WHERE s.urdd_id = ? AND e.status = 'active'`;
        const enrollmentResult = await executeQuery(enrollmentQuery, [urdd]);
        if (enrollmentResult && enrollmentResult.length > 0) {
          const enrollement_id = enrollmentResult[0].enrollement_id;
          // Check if attendance already exists
          const checkAttendanceQuery = `
SELECT attendance_id FROM lecturesattendance 
WHERE enrollement_id = ? AND sub_component_id = ?`;
          const existingAttendance = await executeQuery(checkAttendanceQuery, [enrollement_id, subComponentId]);
          if (!existingAttendance || existingAttendance.length === 0) {
            const attendanceQuery = `
INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id, status, created_by, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?)`;
            await executeQuery(attendanceQuery, [
              enrollement_id,
              new Date(),
              true,
              subComponentId,
              'active',
              urdd,
              new Date()
            ]);
            logMessage([`✅ Auto-marked attendance for ${urdd} in lab ${subComponentId}`]);
          }
        }
        // Move student to lab room and emit success
        socket.join(subComponentId);
        this.participants[subComponentId].push({
          socket_id: socket.id,
          urdd,
          name,
          role,
          email,
          fcm_token,
          status: "active"
        });
        setTimeout(() => {
          this.emit(socket, "attendance-success", {
            success: true,
            autoMarked: true,
            data: socket.participant,
            message: "Attendance automatically marked (not required for this lab)"
          });
        }, 1000); // 1000 milliseconds = 1 second delay
        logMessage([`🔓 Attendance NOT required for lab ${subComponentId}, auto-marked student ${urdd}`]);
        if (bypassStartQuiz) {
             this.participants[subComponentId].push({
            socket_id: socket.id,
            urdd: socket.participant.urdd,
            name: socket.participant.name,
            role: socket.participant.role,
            email: socket.participant.email,
            fcm_token: socket.participant.fcm_token,
            status: "active"
          });
          socket.join(subComponentId);
          logMessage([`Lab ${subComponentId} late joined by ${name}`]);

      await new Promise(resolve => setTimeout(resolve, 1000));
const res = await getAndEmitQuestions(subComponentId, socket, this.io, true, socket.participant, 'lab');
        }
        return; // Skip normal attendance flow
      }

      // Check if lab already completed (using this.completedSubcomponents which is a Set)
      const isParticipantCompleted = this.completedSubcomponents.has(participantKey);

      if (isParticipantCompleted) {
        this.socketService.emit(socket, "error", {
          message: "You have already completed this Lab and cannot rejoin.",
          blockedBy: "System"
        });
        throw new Error("Lab already completed by this participant");
      }


      // Check if lab has started
      if (labRoom.isStarted) {

        //          const now = Date.now();
        //          const thresholdTime = 15 * 60 * 1000; // 15 minutes threshold
        //          
        //          if (now - labRoom.startTime > thresholdTime) {
        //            this.emit(socket, "error", {
        //              message: "Lab has already started and threshold time has passed.",
        //              blockedBy: "Host"
        //            });
        //            throw new Error("Lab has already started and threshold time has passed.");
        //          }

        //         // Reconnect existing participant
        //         // Corrected: access participants with 'this.'
        const existingParticipant = this.participants[subComponentId].find(p => p.urdd === urdd);
        if (existingParticipant) {
          existingParticipant.socket_id = socket.id;
          existingParticipant.status = "active";
          socket.join(subComponentId);
          logMessage([`Lab ${subComponentId} rejoined by ${name}`]);
          const res = await getAndEmitQuestions(subComponentId, socket, this.io, true, existingParticipant, 'lab');
          // if (res.success && res.questions) this.labs[subComponentId].questions = res.questions;
          return;
        }
        else {

          // Common connection status
          this.emit(socket, "connection-status", {
            connected: true,
            socketId: socket.id,
            participant: socket.participant,
            timestamp: Date.now()
          });

          this.emit(socket, "attendance-success", { success: true, data: socket.participant });

          // New participant joining
          this.participants[subComponentId].push({
            socket_id: socket.id,
            urdd: socket.participant.urdd,
            name: socket.participant.name,
            role: socket.participant.role,
            email: socket.participant.email,
            fcm_token: socket.participant.fcm_token,
            status: "active"
          });
          socket.join(subComponentId);
          logMessage([`Lab ${subComponentId} late joined by ${name}`]);
          const res = await getAndEmitQuestions(subComponentId, socket, this.io, true, socket.participant, 'lab');
          
          return;
        }
      }

      // === STAGING ROOM HANDLING ===
      // Corrected: access stagingRoomParticipants with 'this.'
      const existingStagingParticipant = this.stagingRoomParticipants[subComponentId].find(
        p => p.urdd === urdd
      );

      if (existingStagingParticipant) {
        existingStagingParticipant.socket_id = socket.id;
      } else {
        this.stagingRoomParticipants[subComponentId].push({
          socket_id: socket.id,
          urdd: urdd,
          name: name,
          role: role,
          email: email,
          fcm_token: fcm_token
        });
      }

      await this.emitRoomStatusToHost(subComponentId);
      const roomName = `attendance-${subComponentId}`;
      socket.join(roomName);

   

    }
    catch (error) { // Ensure error is caught and logged
      logMessage([`Error in handleStudentConnection for ${socket?.participant?.urdd}:`, error.message]);
      this.emit(socket, "connection-status", {
        connected: false,
        socketId: socket.id,
        participant: socket.participant,
        timestamp: Date.now()
      });
      if (socket && socket.connected) socket.disconnect();
    }
  }


  // --- handleInstructorConnection ---
  async handleInstructorConnection(socket, labRoom) {
    try {
      const { subComponentId } = socket;
      const { urdd, role } = socket.participant;

      if (!(role == "Admin" || role == "TA" || role == "Teacher")) {
        this.socketService.emit(socket, "error", { message: "You have no permission to be host of this quiz" });
        return socket.disconnect();
      }

      labRoom.hostId.add(urdd); // Add host ID to the set
      socket.join(`host-${subComponentId}`);

      if (labRoom.isStarted) {
        try {
          // The original code used q.sub_component_id, which isn't defined here.
          // Used the correct subComponentId from socket.

          const listSql = `SELECT id, enrollement_id, sub_component_id, raised_at, status FROM subcomponent_queries WHERE sub_component_id = ? AND status = 'active' ORDER BY raised_at DESC`;
          const openQueries = await executeQuery(listSql, [subComponentId]);
          this.emit(socket, 'queries-recieved', { queries: openQueries || [] }); // Emit only to the connecting host
        } catch (err) {
          logMessage(['Failed to fetch queries for new host:', err.message]);
        }
      }
      
        await this.emitRoomStatusToHost(subComponentId);
      
      logMessage([`Host ${socket.participant.name} , ${urdd} connected to lab ${subComponentId}`]);
    }
    catch (error) { // Ensure error is caught and logged
      logMessage([`Error in handleInstructorConnection for ${socket?.participant?.urdd}:`, error.message]);
      this.emit(socket, "error", { message: "Error in handleInstructorConnection" });
      this.emit(socket, "connection-status", {
        connected: false,
        socketId: socket.id,
        participant: socket.participant,
        timestamp: Date.now()
      });
      if (socket && socket.connected) socket.disconnect();
    }
  }


  // --- Labquery ---
  //if a user reconnects and comes to give lab again for some reason he will have to query again if he had previously done 
  async subComponentquery(socket) {
    try {
      const { subComponentId } = socket;
      const { urdd } = socket.participant;

      const getEnrollementQuery = `
      SELECT e.enrollement_id FROM enrollements e 
      INNER JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
      INNER JOIN students s ON s.student_user_id = ss.student_user_id
      INNER JOIN courses c ON c.course_id = e.course_id
      INNER JOIN classcomponent cc ON cc.course_id = c.course_id
      INNER JOIN subcomponents sc ON sc.component_id = cc.component_id
      WHERE s.urdd_id = ? AND sc.sub_component_id = ?;`;

      let getEnrollementQueryResult = await executeQuery(getEnrollementQuery, [urdd, subComponentId]);
      if (!getEnrollementQueryResult || getEnrollementQueryResult.length === 0) {
        throw new Error(`No enrollement found for user ${urdd} and subcomponent ${subComponentId}`);
      }
      const enrollement_id = getEnrollementQueryResult[0].enrollement_id;

      // Simplified INSERT statement, only passing values that change/are required.
      const labQueryInsert = `INSERT INTO subcomponent_queries (enrollement_id, sub_component_id, raised_at, status) VALUES (?, ?, ?, 'active')`;

      const now = new Date();
      let insertQueryResult = await executeQuery(labQueryInsert, [enrollement_id, subComponentId, now]);

      const queryId = insertQueryResult && insertQueryResult.insertId ? insertQueryResult.insertId : null;

      // Store mapping queryId -> student socket id for future notifications (using this._queryToSocketMap)
      if (queryId) {
        this._queryToSocketMap.set(queryId, socket.id);
      }

      // Acknowledge the student with the created query id
      this.emit(socket, 'current-query', { success: true, queryId, subComponentId, raisedAt: now });

      // Emit updated list of open queries to hosts for this subcomponent
      try {
        const listSql = `SELECT enrollement_id, sub_component_id, raised_at, status FROM subcomponent_queries WHERE sub_component_id = ? AND status = 'active' ORDER BY raised_at DESC`;
        const openQueries = await executeQuery(listSql, [subComponentId]);
        this.toRoom(`host-${subComponentId}`, 'queries-received', { queries: openQueries || [] });


        //for testing
        setTimeout(() => {
          this.handleQueryAttend(socket, { queryId });
        }, 3000)



      } catch (err) {
        logMessage(["Failed to fetch open queries:", err.message]);
      }
    }
    catch (error) { // Ensure error is caught and logged
      logMessage([`Error in Labquery for ${socket?.participant?.urdd}:`, error.message]);
      this.emit(socket, "error", "Issue registering student query!");
      // Note: Disconnecting on a query error might be too aggressive, consider just logging/returning error.
      // if (socket && socket.connected) socket.disconnect(); 
    }

  }

  // --- handleResolveQueryInstructor ---
  async handleResolveQueryInstructor(socket, payload) {
    try {
      // Corrected logic and SQL parameters for UPDATE
      const { queryId, resolutionNotes = null, resolverRating = null } = payload || {};
      if (!queryId) return this.emit(socket, 'error', { message: 'queryId is required' });

      // Fetch the query to validate
      const qRow = await executeQuery('SELECT id, sub_component_id, enrollement_id, status FROM subcomponent_queries WHERE id = ? LIMIT 1', [queryId]);
      if (!qRow || qRow.length === 0) return this.emit(socket, 'error', { message: 'Query not found' });
      const q = qRow[0];

      // Authorization: ensure socket participant is host for that subcomponent
      const hostUrdd = socket.participant && socket.participant.urdd;
      if (!(await isHost(q.sub_component_id, hostUrdd))) {
        return this.emit(socket, 'error', { message: 'Not authorized to resolve this query' });
      }

      // Get current date for resolved_at timestamp
      const resolvedAt = new Date();

      // Update: mark as 'inactive' and fill resolution details. Added 'resolved_at'
      // Corrected parameter order for executeQuery
      const updateSql = `UPDATE subcomponent_queries SET status = 'inactive', resolved_at = ?, resolved_by = ?, resolver_rating = ?, resolution_notes = ? WHERE id = ? AND status = 'active'`;
      await executeQuery(updateSql, [resolvedAt, hostUrdd, resolverRating, resolutionNotes, queryId]);

      // Notify student if mapping exists and remove mapping
      const studentSocketId = this._queryToSocketMap.get(queryId);
      if (studentSocketId) {
        this._queryToSocketMap.delete(queryId);
        const studentSocket = this.io.sockets.sockets.get(studentSocketId);
        if (studentSocket) {
          this.emit(studentSocket, 'query-resolved', { queryId, resolutionNotes, resolver: hostUrdd, resolverRating });
        }
      }

      // Emit updated list to host room
      try {
        const listSql = `SELECT id, enrollement_id, sub_component_id, raised_at, status FROM subcomponent_queries WHERE sub_component_id = ? AND status = 'active' ORDER BY raised_at DESC`;
        const openQueries = await executeQuery(listSql, [q.sub_component_id]);
        this.toRoom(`host-${q.sub_component_id}`, 'queries-updated', { queries: openQueries || [] });
      } catch (err) {
        logMessage(['Failed to fetch open queries after resolve:', err.message]);
      }

      this.emit(socket, 'resolve-success', { queryId });
    } catch (err) {
      logMessage(['Error in handleResolveQueryInstructor:', err.message]);
      this.emit(socket, 'error', { message: 'Failed to resolve query' });
    }
  }


  async handleQueryAttend(socket, payload) {
    try {
      const { queryId } = payload || {};

      //update db status that query is attended at this time
      const attendedTimeQuery = `Update subcomponent_queries set attended_at = 'Date.now' where subcomponent_queries_id = ?`;
      const attendedTimeQueryResult = await executeQuery(attendedTimeQuery, [queryId]);


      //emit to student about query being attended
      const studentSocketId = this._queryToSocketMap.get(queryId);
      if (studentSocketId) {
        const studentSocket = this.io.sockets.sockets.get(studentSocketId);
        if (studentSocket) {
          this.emit(studentSocket, 'query-attended', { queryId });
        }
      }
    }
    catch (err) {
      logMessage(['Error in handleResolveQueryStudent:', err.message]);
      this.emit(socket, 'error', { message: 'Failed to submit student rating' });
    }
  }



  // --- handleResolveQueryStudent ---
  async handleResolveQueryStudent(socket, payload) {
    try {
      const { queryId, studentRating = null } = payload || {};
      if (!queryId) return this.emit(socket, 'error', { message: 'queryId is required' });

      // Fetch the query to validate and get subcomponent
      // Corrected column name from subcomponent_queries_id to id
      const qRow = await executeQuery('SELECT subcomponent_queries_id, sub_component_id, enrollement_id, status FROM subcomponent_queries WHERE subcomponent_queries_id = ? LIMIT 1', [queryId]);
      if (!qRow || qRow.length === 0) return this.emit(socket, 'error', { message: 'Query not found' });
      const q = qRow[0];

      // Ensure the query belongs to this student (Enrollment check)
      const { urdd } = socket.participant || {};
      const getEnrollementQuery = `SELECT e.enrollement_id FROM enrollements e 
      INNER JOIN studentsemesters ss ON ss.student_semester_id = e.student_semester_id
      INNER JOIN students s ON s.student_user_id = ss.student_user_id
      INNER JOIN courses c ON c.course_id = e.course_id
      INNER JOIN classcomponent cc ON cc.course_id = c.course_id
      INNER JOIN subcomponents sc ON sc.component_id = cc.component_id
      WHERE s.urdd_id = ? AND sc.sub_component_id = ?;`;

      const enrolRes = await executeQuery(getEnrollementQuery, [urdd, q.sub_component_id]);
      if (!enrolRes || enrolRes.length === 0) return this.emit(socket, 'error', { message: 'Enrollment not found for rating' });
      const studentEnrollementId = enrolRes[0].enrollement_id;

      if (parseInt(studentEnrollementId) !== parseInt(q.enrollement_id)) {
        return this.emit(socket, 'error', { message: 'Not authorized to rate this query' });
      }

      // Update student rating and resolved_at (if resolved_at wasn't set by instructor)
      // Corrected SQL syntax for UPDATE (remove AND, use comma for multiple fields)
      const updateSql = `UPDATE subcomponent_queries SET student_rating = ?, resolved_at = NOW() WHERE subcomponent_queries_id = ?`;
      await executeQuery(updateSql, [studentRating, queryId]);

      // Notify hosts about the rating (they will use the 'queries-recieved' event)
      try {
        const listSql = `SELECT subcomponent_queries_id, enrollement_id, sub_component_id, raised_at, status FROM subcomponent_queries WHERE sub_component_id = ? ORDER BY raised_at DESC`;
        const openQueries = await executeQuery(listSql, [q.sub_component_id]);
        this.toRoom(`host-${q.sub_component_id}`, 'queries-recieved', { queries: openQueries || [] });
      } catch (err) {
        logMessage(['Failed to fetch queries after student rating:', err.message]);
      }
      this.emit(socket, 'rating-success', { queryId });
    } catch (err) {
      logMessage(['Error in handleResolveQueryStudent:', err.message]);
      this.emit(socket, 'error', { message: 'Failed to submit student rating' });
    }
  }



  // --- handleStartLab ---
  async handleStartSubComponent(socket) {
    try {
      let { subComponentId } = socket;
      const { urdd } = socket.participant;
      subComponentId = String(subComponentId);
      // Corrected: access labs with 'this.'
      const lab = this.labs[subComponentId];

      if (!lab) {
        this.emit(socket, "error", { message: "Lab data not initialized" });
        return;
      }

      if (!(await isHost(subComponentId, urdd))) {
        this.emit(socket, "error", { message: "You are not authorized to start this lab" });
        return; // Do not disconnect the host unless necessary
      }

      // Prevent starting a lab that is already started
      if (lab.isStarted) {
        this.emit(socket, "error", { message: "Lab is already started" });
        return;
      } lab.isStarted = true;
      lab.startTime = Date.now();
      // Note: hostId is a Set, so 'add' should be used. Assuming single host ID for simplicity here.
      // If multiple hosts are allowed, ensure 'lab.hostId' is checked/updated correctly.
      lab.hostId.add(urdd);

      // ✅ Get questions and check if template questions exist
      const questionsResult = await getAndEmitQuestions(subComponentId, socket, this.io, false, socket.participant, 'lab');

      // ✅ Only insert template questions if they don't exist
      if (!questionsResult.templateQuestion) {
        const templateQuestions = [
          '1. Realization of Experiment',
          '2. Conducting Experiment',
          '3. Computer Use',
          '4. Teamwork',
          '5. Laboratory Safety and Disciplinary Rules',
          '6. Data Collection',
          '7. Data Analysis',
        ];

        for (let i = 0; i < templateQuestions.length; i++) {
          const insertQuestionQuery = `INSERT INTO questions 
            (sub_component_id, question_num, description, question_marks, status, created_by, created_at, config) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

          await executeQuery(insertQuestionQuery, [
            subComponentId,
            i + 1,
            templateQuestions[i],
            5,
            'active',
            urdd,
            new Date().toISOString().slice(0, 19).replace('T', ' '),
            '[{"duration":"0","type":{"value":"code","label":"Code"}}]'
          ]);
        }

        logMessage([`Template questions inserted for subComponentId: ${subComponentId}`]);
      } else {
        logMessage([`Template questions already exist for subComponentId: ${subComponentId}, skipping insertion`]);
      }

      await this.emitRoomStatusToHost(subComponentId);


    } catch (e) {
      logMessage(["Error in start-lab", e.message]);
      // Corrected: use this.emit instead of this.socketService.emit (BaseSocketDelegate should handle this)
      this.emit(socket, "error", { message: "Error starting lab" });
    }
  }


  // --- handleSubmitAnswer ---
  async handleSubmitAnswer(socket, submissionData) {
    try {
      // Destructure directly from payload and socket
      let { answer, courseId, testResults } = submissionData;
      const { subComponentId } = socket;
      const { urdd } = socket.participant;

      // Validation: check if lab is started (optional, but good practice)
      // const lab = this.labs[subComponentId];
      // if (!lab || !lab.isStarted) {
      //   throw new Error("Lab is not started or finished.");
      // }

      // participant parameter seems redundant since it's on socket.participant, removed it from helper call
      await submitAnswer(socket, answer, testResults, socket.participant, subComponentId, courseId, urdd);
      this.emit(socket, "answer-submitted", { success: true }); // Acknowledge student

    } catch (err) {
      logMessage(["Error in submit-answer", err.message]);
      this.emit(socket, "error", { message: "Error submitting answer" });
      // if (socket && socket.connected) socket.disconnect(); // Disconnecting on submit error might be too aggressive
    }
  }


  // --- handleMarkAttendance ---
  async handleMarkAttendance(socket, { hostInfo, scannedData }) {
    try {
      const { urdd_id: hostUrdd, role: hostRole } = hostInfo;
      const { rfidUid: participantNfcId, quizId, courseId, qrCode } = scannedData; // Renamed quizId to subComponentId internally

      // Use 'subComponentId' for clarity and consistency
      const subComponentId = quizId;

      if (hostRole !== "Admin" && !(await isHost(subComponentId, hostUrdd))) {
        this.emit(socket, "error", { message: "You are not authorized to mark attendance for this lab" });
        return; // Do not disconnect host
      }

      if (!participantNfcId && !qrCode) {
        this.emit(socket, "error", { message: "Neither NFC or qrCode provided" });
        return;
      }

      let enrollement_id;
      let participantInfo;

      // --- NFC LOGIC ---
      if (participantNfcId) {
        const nfcCheckQuery = `SELECT * from students where nfc_token = ?`;
        const nfcCheckQueryResult = await executeQuery(nfcCheckQuery, [participantNfcId]);
        if (!nfcCheckQueryResult || nfcCheckQueryResult.length === 0) {
          this.emit(socket, "error", { message: "NFC not found for student" });
          return;
        }
        const nfcDataResult = nfcCheckQueryResult[0];

        const getEnrollmentIdQuery = `SELECT e.enrollement_id, s.urdd_id, u.first_name, u.email, r.role_name FROM enrollements e
          JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
          JOIN students s ON ss.student_user_id = s.student_user_id
          JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
          JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
          JOIN roles r ON rdd.role_id = r.role_id
          JOIN users u ON u.user_id = urdd.user_id
          WHERE e.course_id = ? AND s.student_user_id = ? AND e.status = 'active'`;
        const getEnrollmentIdQueryResult = await executeQuery(getEnrollmentIdQuery, [courseId, nfcDataResult.student_user_id]);
        if (!getEnrollmentIdQueryResult || getEnrollmentIdQueryResult.length === 0) {
          this.emit(socket, "error", { message: "Enrollment not found for participant" });
          return;
        }
        enrollement_id = getEnrollmentIdQueryResult[0].enrollement_id;
        participantInfo = getEnrollmentIdQueryResult[0];
      }
      // --- QR CODE LOGIC ---
      else {
        const qrCodeCheckQuery = `SELECT * from qr_code where qr_code = ?`;
        const qrCodeCheckQueryResult = await executeQuery(qrCodeCheckQuery, [qrCode]);
        if (!qrCodeCheckQueryResult || qrCodeCheckQueryResult.length === 0) {
          this.emit(socket, "error", { message: "Qr code not found for student" });
          return;
        }
        const qrCodeInfo = qrCodeCheckQueryResult[0];

        // Get Enrollment (Joined with Users table to get name/email/role for info)
        const getEnrollmentIdQuery = `SELECT e.enrollement_id, s.urdd_id, u.first_name, u.email, r.role_name FROM enrollements e
          JOIN studentsemesters ss ON e.student_semester_id = ss.student_semester_id
          JOIN students s ON ss.student_user_id = s.student_user_id
          JOIN user_roles_designations_department urdd ON s.urdd_id = urdd.user_role_designation_department_id
          JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
          JOIN roles r ON rdd.role_id = r.role_id
          JOIN users u ON u.user_id = urdd.user_id
          WHERE e.course_id = ? AND s.urdd_id = ? AND e.status = 'active'`;

        const getEnrollmentIdQueryResult = await executeQuery(getEnrollmentIdQuery, [courseId, qrCodeInfo.urdd_id]);
        if (!getEnrollmentIdQueryResult || getEnrollmentIdQueryResult.length === 0) {
          this.emit(socket, "error", { message: "Enrollment not found for participant" });
          return;
        }

        enrollement_id = getEnrollmentIdQueryResult[0].enrollement_id;
        participantInfo = getEnrollmentIdQueryResult[0];
      }

      // Insert attendance record (using subComponentId instead of quizId for consistency)
      const attendanceQuery = `INSERT INTO lecturesattendance (enrollement_id, date, is_present, sub_component_id, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await executeQuery(attendanceQuery, [enrollement_id, new Date(), true, subComponentId, "active", hostUrdd, new Date()]);

      // --- Socket/Room Management ---
      // Corrected: Access stagingRoomParticipants with 'this.'
      const participantObj = this.stagingRoomParticipants[subComponentId]?.find(p => p.urdd === participantInfo.urdd_id);

      if (participantObj) {
        const participantSocketId = participantObj.socket_id;
        const participantSocket = this.io.sockets.sockets.get(participantSocketId);

        if (participantSocket) {
          const oldRoom = `attendance-${subComponentId}`;
          const newRoom = `${subComponentId}`;

          participantSocket.leave(oldRoom);
          addtoLog("Lab joined", participantInfo.urdd_id, subComponentId);
          participantSocket.join(newRoom);

          // Corrected: Access participants with 'this.'
          this.participants[subComponentId].push({
            urdd: participantObj.urdd,
            socket_id: participantObj.socket_id,
            name: participantObj.name,
            role: participantObj.role,
            email: participantObj.email,
            status: "active"
          });

          // Corrected: Access presentSubcomponentParticipants with 'this.'
          if (this.presentSubcomponentParticipants[subComponentId]) {
            this.presentSubcomponentParticipants[subComponentId].push({
              urdd_id: participantObj.urdd,
              name: participantObj.name,
              email: participantObj.email,
              role: participantObj.role
            });
          }

          // Corrected: Access stagingRoomParticipants with 'this.'
          this.stagingRoomParticipants[subComponentId] = this.stagingRoomParticipants[subComponentId].filter(p => p.urdd !== participantObj.urdd);
          logMessage([`Participant ${participantInfo.urdd_id} moved from ${oldRoom} to ${newRoom}`], true);

          this.emit(participantSocket, "attendance-success", { success: true, data: participantInfo });
          logMessage(["Attendance marked successfully for participant ", participantSocket.id]);
          await this.emitRoomStatusToHost(subComponentId);

       
          if (bypassStartQuiz) {
             this.participants[subComponentId].push({
            socket_id: socket.id,
            urdd: socket.participant.urdd,
            name: socket.participant.name,
            role: socket.participant.role,
            email: socket.participant.email,
            fcm_token: socket.participant.fcm_token,
            status: "active"
          });
          socket.join(subComponentId);
          logMessage([`Lab ${subComponentId} late joined by ${name}`]);

      await new Promise(resolve => setTimeout(resolve, 1000));
const res = await getAndEmitQuestions(subComponentId, socket, this.io, true, socket.participant, 'lab');
        }
        
        } else {
          logMessage([`Socket not found for participant ID: ${participantSocketId}`]);
          this.emit(socket, "error", {
            message: "Participant is not currently connected via socket for live update.",
          });
        }
      } else {
    
        // Participant marked attendance but wasn't in staging room (e.g., late connection or no initial connection)
        // this.emit(participantSocket, "attendance-success", { success: true, data: participantInfo, message: "Attendance marked, participant was not in staging room." });
      }

    } catch (error) {
      logMessage(["Error in mark-attendance:", error.message], true);
      this.emit(socket, "error", { message: "Error marking attendance" });
      // if (socket && socket.connected) socket.disconnect(); // Do not disconnect host on student error
    }
  }


  // --- handleLabCompleted ---
  async handleSubComponentCompleted(socket) {
    try {
      const { subComponentId } = socket;
      const { urdd } = socket.participant;

      // Corrected: access labs with 'this.'
      const lab = this.labs[subComponentId];
      logMessage(["----------------- INSIDE LAB COMPLETED EVENT: ", subComponentId, "participant ", socket.participant]);

      // Corrected: access participants with 'this.'
      const existingParticipant = this.participants[subComponentId]?.find(p => p.urdd === urdd);

      if (!existingParticipant) {
        this.emit(socket, "error", { message: "Participant not found in lab" });
        return; // Do not disconnect just yet
      }

      if (existingParticipant) {
        Object.assign(existingParticipant, {
          status: "inactive",
          socket_id: null
        });
      }

      const participantKey = `${subComponentId}:${urdd}`;
      // Corrected: access completedSubcomponents with 'this.'
      // this.completedSubcomponents.add(participantKey);
      socket.leave(subComponentId);
      await this.emitRoomStatusToHost(subComponentId);
      socket.disconnect();
    } catch (error) {
      logMessage(["Error in lab-completed:", error.message]);
      this.emit(socket, "error", { message: "Error completing lab" });
      if (socket && socket.connected) socket.disconnect();
    }
  }


  // --- handleEndQuiz ---
  async handleEndSubComponent(socket) {
    try {
      const { subComponentId } = socket;
      const { urdd, participant } = socket.participant;

      // Corrected: access labs with 'this.'
      const lab = this.labs[subComponentId];

      if (!lab) {
        this.emit(socket, "error", "Lab not found");
        return;
      }

      // Corrected: use Set.has for hostId
      if (!lab.hostId.has(urdd)) {
        this.emit(socket, "error", "You are not the host of this lab");
        return;
      }

      // Notify all clients in the lab room
      this.toRoom(subComponentId, "subComponent-ended", {
        message: "Lab ended by host",
        endedBy: urdd,
        success: true,
      });

      // Clean up memory for this quiz (using 'this.' to access properties)
      delete this.participants[subComponentId];
      delete this.stagingRoomParticipants[subComponentId];
      delete this.labs[subComponentId];
      // Clean up completedSubcomponents entries
      [...this.completedSubcomponents].forEach(key => {
        if (key.startsWith(`${subComponentId}:`)) {
          this.completedSubcomponents.delete(key);
        }
      });


    
      // // make the subComponent Inactive
      const inactiveSubComponent = `Update subcomponents SET sub_component_status = 'complete' WHERE sub_component_id = ?`;
      const inactiveSubComponentResult = await executeQuery(inactiveSubComponent, [subComponentId]);


      // Disconnect all clients in the room
      const room = this.io.sockets.adapter.rooms.get(subComponentId);
      if (room) {
        for (const socketId of room) {
          const clientSocket = this.io.sockets.sockets.get(socketId);
          if (clientSocket) {
            clientSocket.leave(subComponentId);
            clientSocket.disconnect(true);
          }
        }
      }
      this.emit(socket, "subComponent-ended", { subComponentId });
    } catch (error) {
      logMessage(["Error in end-lab:", error.message]);
      this.emit(socket, "error", { message: "Error ending lab" });
    }
  }


  // --- handleLeaveLab ---
  // Note: This function name suggests blocking/kicking a user from the lab
  async handleLeaveSubComponent(socket, payload) {

    try {
      let subComponentId = socket.subComponentId;
      let participant = socket.participant;
      let urdd = participant.urdd;

      logMessage([`📝 User ${participant?.urdd} blocked from quiz ${subComponentId} - saved to database`]);


      // if (!this.blockedParticipants[subComponentId]) {
      //   this.blockedParticipants[subComponentId] = [];
      // }

      const existingblockedParticipant = this.blockedParticipants[subComponentId].find(p => p.urdd === participant.urdd);

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
    } catch (error) {
      logMessage(["Error in blocking participant from lab", error.message]);
      this.emit(socket, "error", { message: "Error in blocking user from lab: " + error.message });
    }
  }




  // --- onClientDisconnected ---
  async onClientDisconnected(socket, reason) {
    try {
      // Remove any entries pointing to this socket id
      for (const [qid, sid] of this._queryToSocketMap.entries()) {
        if (sid === socket.id) this._queryToSocketMap.delete(qid);
      }

      // Additional: Clean up participant status if disconnected from the main room
      const subComponentId = socket.subComponentId;
      const urdd = socket.participant?.urdd;

      if (subComponentId && urdd) {
        const participantList = this.participants[subComponentId];
        const existingParticipant = participantList?.find(p => p.urdd === urdd);
        if (existingParticipant) {
          // Mark participant as inactive but keep in the list for history/reconnection
          existingParticipant.status = "inactive";
          existingParticipant.socket_id = null;
          logMessage([`Participant ${urdd} set to inactive in ${subComponentId}`]);
          await this.emitRoomStatusToHost(subComponentId);
        }
        // Clean up staging room if they were only staging
        if (this.stagingRoomParticipants[subComponentId]) {
          this.stagingRoomParticipants[subComponentId] = this.stagingRoomParticipants[subComponentId].filter(
            p => p.urdd !== urdd
          );
        }
      }
    } catch (err) {
      logMessage(['Error cleaning up on disconnect:', err.message]);
    }
  }




}

module.exports = LabController;