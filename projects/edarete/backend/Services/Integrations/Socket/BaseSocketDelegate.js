// Socket.zip/Socket/BaseSocketDelegate.js (UPDATED)

class BaseSocketDelegate {
  /**
   * Called by SocketService to inject the service instance.
   * @param {import('./SocketService')} socketService
   */
  setSocketService(socketService) {
    this.socketService = socketService;
    this.io = typeof socketService.getIO === "function"
      ? socketService.getIO()
      : socketService;
  }

  getSocketService() {
    return this.socketService;
  }


  getIO() {
    return this.io;
  }

  
  emit(socket, eventName, payload) {
    if (!this.socketService || !socket) return;
    this.socketService.emit(socket, eventName, payload);
  }


  broadcast(eventName, payload) {
    if (!this.socketService) return;
    this.socketService.broadcast(eventName, payload);
  }

  
  broadcastExcept(socket, eventName, payload) {
    if (!this.socketService || !socket) return;
    this.socketService.broadcastExcept(socket, eventName, payload);
  }


  emitToRoom(roomId, eventName, payload) {
    if (!this.socketService) return;
    this.socketService.emitToRoom(roomId, eventName, payload);
  }


  toRoom(roomId, eventName, payload) {
    this.emitToRoom(roomId, eventName, payload);
  }

  /**
   * REQUIRED: Subclasses must implement this method to provide a map of
   * event names to UNBOUND handler functions.
   * @returns {Object<string, Function>}
   */
  getUnboundEventHandlers() {
    throw new Error("getUnboundEventHandlers() must be implemented by the subclass");
  }

  /**
   * PROTOCOL METHOD: Implemented by the base class to automatically bind
   * the handlers returned by getUnboundEventHandlers() to the instance (this).
   * @returns {Object<string, Function>} Bound event handlers
   */
  getEventHandlers() {
    const handlers = this.getUnboundEventHandlers();
    const boundHandlers = {};

    for (const eventName in handlers) {
      const handler = handlers[eventName];
      if (typeof handler === 'function') {
        boundHandlers[eventName] = handler.bind(this);
      } else {
        boundHandlers[eventName] = handler;
      }
    }
    return boundHandlers;
  }

  async onClientConnected(socket) {
    // Optional - override in subclass
  }


  async onClientDisconnected(socket, reason) {
    // Optional - override in subclass
  }


  async onClientError(socket, error) {
    // Optional - override in subclass
  }
}

module.exports = BaseSocketDelegate;