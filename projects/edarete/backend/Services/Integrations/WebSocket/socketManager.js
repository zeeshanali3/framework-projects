  // const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
  // const { Server } = require('socket.io');
  // const checkExpiration = require('../../SysFunctions/checkExpiration');

  // class SocketManager {
  //   constructor(server) {
  //     this.io = new Server(server, {
  //       path: '/websocket', 
  //       cors: {
  //         origin: "*",
  //         methods: ["GET", "POST"],
  //         credentials: false
  //       },
  //       transports: ['websocket'],
  //       pingTimeout: 1000000
  //     });

  //     // Global middleware (auth)
  //     this.io.use(async (socket, next) => {
  //       try {
  //         const token = socket.handshake.auth?.token || socket.handshake.headers["accesstoken"];
  //         console.log("Connection tried  with token: " , token);
  //         if (!token) return next(new Error("No token provided"));
  //         const decoded = await checkExpiration(token);
  //         if (!decoded) return next(new Error("Token expired or invalid"));
  //         next();
  //       } catch (err) {
  //         console.error("Socket auth failed:", err.message);
  //         next(new Error("Unauthorized"));
  //       }
  //     });

  //     // Connection event routing
  //     this.io.on('connection', (socket) => {
  //       logMessage(["socket connection tried"], true);
  //       const socketType = socket.handshake.query.socketType;
  //       logMessage([`New connection on socket ${socket.id} with type ${socketType}`], true);

  //       if (socketType === 'quiz') {
  //         require('./modules/quiz/quizSocket')(socket, this.io);
  //       } else if (socketType === 'chatbot') {
  //         require('./modules/chatbot/chatbotSocket')(socket, this.io);
  //       } else {
  //         console.warn(`Socket type not recognized (${socketType}). Disconnecting ${socket.id}`);
  //         socket.disconnect();
  //       }
  //     });
  //   }
  // }

  // module.exports = SocketManager;
