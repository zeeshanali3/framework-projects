import { useState, useEffect, useCallback } from 'react';
import { socketManager } from './socketManager';
import { constants } from '../../Common/Constants';

export const useSocket = (
  serverUrl = constants.base_url,
  accessToken,
  participant
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  // connect(quizId, namespaceOrPath?) -> forwards namespace/path to socketManager
  const connect = useCallback(
    (quizId, namespaceOrPath) => {
      const socketInstance = socketManager.connect(
        serverUrl,
        accessToken,
        quizId,
        participant,
        undefined, // socketType (keep default inside socketManager) or pass a value if needed
        namespaceOrPath // this will be forwarded as `path` param in socketManager.connect
      );
      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        setIsConnected(true);
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
      });

      return socketInstance;
    },
    [serverUrl, accessToken, participant],
  );

  const disconnect = useCallback(() => {
    socketManager.disconnect();
    setIsConnected(false);
    setSocket(null);
  }, []);

  const emit = useCallback((event, data) => {
    socketManager.emit(event, data);
  }, []);

  const on = useCallback(
    (event, callback) => {
      if (socket) {
        socket.on(event, callback);
      }
    },
    [socket],
  );

  const off = useCallback(
    (event, callback) => {
      if (socket) {
        socket.off(event, callback);
      }
    },
    [socket],
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    socket,
    isConnected,
    connect,
    disconnect,
    emit,
    on,
    off,
  };
};
