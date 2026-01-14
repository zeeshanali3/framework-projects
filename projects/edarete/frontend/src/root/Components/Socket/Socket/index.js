// src/socket/socketInterface.js
import { io } from "socket.io-client";

// Create socket instance without authentication initially
export const socket = io('https://api.edarete.com', {
  path: '/chatbot/socket.io',
  autoConnect: false, // Don't auto-connect until we have credentials
  transports: ['websocket', 'polling'],
});
