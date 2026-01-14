import { io } from 'socket.io-client';
class SocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(url = 'http://localhost:3000', accessToken, quizId, participant = {}, socketType = "quiz", path='/websocket') {
    console.log('SocketManager.connect called with URL:', url,  quizId,path);
    console.log('Current socket state:', {
      socket: this.socket,
      isConnected: this.isConnected,
    });

    if (this.socket && this.isConnected) {
      console.log('Socket already connected, returning existing socket');
      return this.socket;
    }

    console.log('Creating new socket connection...');

    this.socket = io(url, {
      transports: ['websocket', 'polling'],
      path: path, // Specify custom path if needed  
      autoConnect: true,
      query: {
        participant: JSON.stringify(participant) || {},
        subComponentId: quizId || {},
        socketType: socketType
      },
      auth: {
        token: accessToken,
      },
      timeout: 5000,
      forceNew: true,
    });

    console.log('Socket created:', this.socket);
    console.log('Socket options:', this.socket.io.opts);

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('✅ Socket connected successfully! ID:', this.socket.id);
      console.log('Socket connected status:', this.socket.connected);
    });

    this.socket.on('connect_error', error => {
      console.error('❌ Socket connection error:', error);
      console.error('Error details:', {
        message: error.message,
        description: error.description,
        context: error.context,
        type: error.type,
        status: error.status,
      });
      this.isConnected = false;

      // Try alternative configurations
      console.log('🔄 Retrying with different Socket.IO path...');
    });

    this.socket.on('disconnect', reason => {
      this.isConnected = false;
      console.log('🔌 Socket disconnected. Reason:', reason);
      if (reason === 'io server disconnect') {
        console.log('Server disconnected the socket');
      } else if (reason === 'io client disconnect') {
        console.log('Client disconnected the socket');
      } else if (reason === 'ping timeout') {
        console.log('Socket disconnected due to ping timeout');
      } else if (reason === 'transport close') {
        console.log('Socket disconnected due to transport close');
      } else {
        console.log('Socket disconnected for other reason:', reason);
      }
    });

    this.socket.on('error', error => {
      console.error('❌ Socket error:', error.message || error);
      this.isConnected = false;
    });

    this.socket.on('connecting', transport => {
      console.log('🔄 Socket connecting with transport:', transport);
    });

    this.socket.on('reconnecting', attempt => {
      console.log('🔄 Socket reconnecting, attempt:', attempt);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('✅ Socket manually disconnected');
    } else {
      console.log('No socket to disconnect');
    }
  }

  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export const socketManager = new SocketManager();
