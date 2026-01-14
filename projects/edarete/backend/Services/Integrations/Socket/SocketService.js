const { Server } = require("socket.io");
const checkExpiration = require('../../SysFunctions/checkExpiration');

class SocketService {
  constructor(httpServer, options = {}) {
    const { cors = { origin: "*" }, middlewares = [], ...ioOptions } = options;
    this.io = new Server(httpServer, { cors, ...ioOptions });
    this.delegate = null;
    this.isStarted = false;
    // Middleware functions (array). Each item can be a function or a module path string.
    this.middlewares = Array.isArray(middlewares) ? middlewares : [];
    // Ensure we only apply middlewares once
    this._middlewaresApplied = false;
  }

    initializeDelegate(delegate) {
    this.setDelegate(delegate);
    this.start();
    return this; // For method chaining
  }

  setDelegate(delegate) {
    if (!delegate) {
      throw new Error("Delegate cannot be null or undefined");
    }
    
    if (typeof delegate.getEventHandlers !== "function") {
      throw new Error(
        "Delegate must implement getEventHandlers() method. " +
        "Protocol requires: { getEventHandlers(): Object<string, Function> }"
      );
    }
    
    this.delegate = delegate;
    this.delegate.socketService = this;
    this.delegate.io = this.getIO();
    
    // Inject socketService reference into delegate if it needs it
    if (this.delegate.setSocketService) {
      this.delegate.setSocketService(this);
    }
  }

  start() {
    if (!this.delegate) {
      throw new Error(
        "Cannot start SocketService: delegate not set. " +
        "Call setDelegate() before start()"
      );
    }

    if (this.isStarted) {
      console.warn("SocketService already started. Ignoring duplicate start() call.");
      return;
    }

    // Apply configured / default middlewares before accepting connections
    try {
      this.applyMiddlewares();
    } catch (err) {
      console.error('Failed to apply socket middlewares:', err);
    }

    this.io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
// new code
      socket.onAny((event, data) => {
    console.log("EVENT RECEIVED:", event, data);
  });

  const _emit = socket.emit;
  socket.emit = (...args) => {
    console.log("EVENT EMITTED:", args[0], args[1]);
    _emit.apply(socket, args);
  };



      try {
        const handlers = this.delegate.getEventHandlers();
        
        if (!handlers || typeof handlers !== "object") {
          console.error("getEventHandlers() must return an object");
          socket.disconnect();
          return;
        }

        // Register all event handlers from delegate
        for (const [eventName, handlerFn] of Object.entries(handlers)) {
            
          if (typeof handlerFn === "function") {
            // Wrap handler in error handling
            socket.on(eventName, (...args) => {
              try {
                handlerFn(socket, ...args);
              } catch (error) {
                console.error(`Error in event handler '${eventName}':`, error);
                this.emit(socket, "error", {
                  event: eventName,
                  message: "Handler error occurred",
                });
              }
            });
          } else {
            console.warn(
              `Event handler for '${eventName}' is not a function. Skipping.`
            );
          }
        }

        // Optional connection callback
        if (typeof this.delegate.onClientConnected === "function") {
          try {
            this.delegate.onClientConnected(socket);
          } catch (error) {
            console.error("Error in onClientConnected:", error);
          }
        }

        // Disconnection handling
        socket.on("disconnect", (reason) => {
          console.log(`Client disconnected: ${socket.id} (${reason})`);
          if (typeof this.delegate.onClientDisconnected === "function") {
            try {
              this.delegate.onClientDisconnected(socket, reason);
            } catch (error) {
              console.error("Error in onClientDisconnected:", error);
            }
          }
        });

        // Error handling
        socket.on("error", (error) => {
          console.error(`Socket error for ${socket.id}:`, error);
          if (typeof this.delegate.onClientError === "function") {
            try {
              this.delegate.onClientError(socket, error);
            } catch (err) {
              console.error("Error in onClientError:", err);
            }
          }
        });

      } catch (error) {
        console.error("Error setting up socket connection:", error);
        socket.disconnect();
      }
    });

    this.isStarted = true;
  }

  // Apply middlewares
  // first the ones passed in options, then attempt to attach
  // a default auth middleware for access token
  applyMiddlewares() {
    if (this._middlewaresApplied) return;

    // Helper to attach a middleware function
    // const attach = (mw) => {
    //   if (typeof mw === 'function') {
    //     this.io.use(mw);
    //   } else if (typeof mw === 'string') {
    //     try {
    //       const mod = require(mw);
    //       if (typeof mod === 'function') this.io.use(mod);
    //     } catch (err) {
    //       console.warn(`Failed to require middleware module '${mw}':`, err.message);
    //     }
    //   }
    // };

    // Attach user provided middlewares
    // for (const mw of this.middlewares) {
    //   try {
    //     attach(mw);
    //   } catch (err) {
    //     console.error('Error attaching middleware:', err);
    //   }
    // }

    //default middleware on handshake 
    // try {
    //   if (typeof checkExpiration === 'function') {
    //     const authMiddleware = async (socket, next) => {
    //       try {
    //         const token = socket.handshake.auth?.token || socket.handshake.headers?.accesstoken;
    //         if (!token) return next(new Error('No token provided'));
    //         const decoded = await checkExpiration(token);
    //         if (!decoded) return next(new Error('Token expired or invalid'));
    //         // expose decoded token on socket for handlers
    //         socket.decoded = decoded;
    //         next();
    //       } catch (err) {
    //         console.error('Socket auth failed:', err && err.message ? err.message : err);
    //         next(new Error('Unauthorized'));
    //       }
    //     };

    //     // Only attach if it's not already in the list (function equality is hard; attach anyway)
    //     this.io.use(authMiddleware);
    //   }
    // } catch (err) {
    //   // Missing module is OK — just skip default auth
    // }

    this._middlewaresApplied = true;
  }



  emit(socket, eventName, payload) {
    if (socket && socket.connected) {
      socket.emit(eventName, payload);
    }
  }

  // Broadcast to all connected clients
  broadcast(eventName, payload) {
    this.io.emit(eventName, payload);
  }

  // Broadcast to all except the sender
  broadcastExcept(socket, eventName, payload) {
    socket.broadcast.emit(eventName, payload);
  }

  // Emit to a specific room
  toRoom(roomId, eventName, payload) {
    this.io.to(roomId).emit(eventName, payload);
  }

  // ========== Utility Methods ==========

   // Get the Socket.IO server instance (for advanced operations)
   getIO() {
    return this.io;
  }

  
  // Get a socket by ID
  getSocket(socketId) {
    return this.io.sockets.sockets.get(socketId);
  }

  // Get all connected socket IDs
  getConnectedSockets() {
    return Array.from(this.io.sockets.sockets.keys());
  }

  // Get count of connected clients
  getConnectionCount() {
    return this.io.sockets.sockets.size;
  }

  // Stop the socket service
  stop() {
    if (this.io) {
      this.io.close();
      this.isStarted = false;
    }
  }

  // ---- REGISTRY FOR GLOBAL ACCESS ----
  static _registry = {};
  /**
   * Register a service instance by a key (e.g., 'quiz', 'chat').
   * @param {string} key
   * @param {SocketService} service
   */
  static register(key, service) {
    if (!key) throw new Error('SocketService key must be provided');
    SocketService._registry[key] = service;
  }
  /**
   * Retrieve a service instance by key.
   * @param {string} key
   * @returns {SocketService}
   */
  static getService(key) {
    return SocketService._registry[key];
  }

  // Short-hand broadcast to a room alias:
  emitToRoom(roomId, eventName, payload) {
    return this.toRoom(roomId, eventName, payload);
  }
}

// Convenience: expose a shorthand helper on the exported class so callers
// can do `const SocketService = require('./SocketService'); SocketService.getSocketService(key)`
// to get socket access and to emit in rooms etc in post / pre process / anywhere 
SocketService.getSocketService = function (key) {
  return SocketService.getService(key);
};

module.exports = SocketService;
