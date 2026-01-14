
const SocketService = require('./SocketService');
require('dotenv').config(); 

const DEFAULT_CORS_ORIGIN = process.env.SOCKET_CORS_ORIGIN || "*";
const DEFAULT_TRANSPORTS = ['websocket'];
const DEFAULT_PING_TIMEOUT = parseInt(process.env.SOCKET_PING_TIMEOUT) || 1000000;

  
function createSocketService(userOptions = {}, logicalName) {
  const commonOptions = {
    cors: {
      origin: DEFAULT_CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: false
    },
    transports: userOptions.transports || DEFAULT_TRANSPORTS,
    pingTimeout: userOptions.pingTimeout || DEFAULT_PING_TIMEOUT,
  };

  const finalOptions = {
    ...commonOptions,
    ...userOptions
  };
  const service = new SocketService(global.server, finalOptions);
  if (logicalName) SocketService.register(logicalName, service);
  return service;
}

module.exports = { createSocketService, getSocketService: SocketService.getSocketService };