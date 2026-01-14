import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../../Socket/Socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const main = useSelector((state) => state.main);
  const { userSelectedRole } = main || {};
  const { user_role_designation_department_id: URDD } = userSelectedRole || {};

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.warn("Socket connected. ID:", socket.id);
    };

    const onDisconnect = (reason) => {
      setIsConnected(false);
      console.warn("Disconnected:", reason);

      // Auto-reconnect only for network-related issues
      if (
        ["ping timeout", "transport close", "transport error"].includes(reason)
      ) {
        setTimeout(() => socket.connect(), 1000);
      }
    };

    const onConnectError = (err) => {
      console.error("Connection error:", err.message);
    };

    // Setup listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    // Update socket auth if we have user data
    if (URDD) {
      socket.io.opts.query = { URDD };

      // Only connect if not already connected
      if (!isConnected && !socket.connected) {
        socket.connect();
      }
    }

    return () => {
      // Cleanup listeners
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, [URDD, isConnected]);

  return { socket, isConnected };
};
