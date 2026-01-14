// utils/chatHandlers.js
export async function userClickedHandlerFn({
  user,
  URDD,
  participentIds,
  socket,
  dispatch,
  setSelectedChatId,
  setCurrentPage,
  setHasMoreMessages,
  setIsLoadingMore,
  setLoadingMessages,
  setPaginationLoading,
  getUsersMessageByChatIdPaginated,
  PAGE_SIZE,
  containerRef,
}) {
  console.warn("userClickedHandler", user);
  setLoadingMessages(true);
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
  const chatId = user?.chat_id || user?.id;
  if (!chatId) {
    console.error("No chat ID available for user:", user);
    setLoadingMessages(false);
    return;
  }
  if (!URDD) {
    console.error("URDD is not available");
    setLoadingMessages(false);
    return;
  }

  setSelectedChatId(chatId);

  // Reset pagination state for new chat
  setCurrentPage(1);
  setHasMoreMessages(true);
  setIsLoadingMore(false);

  // ✅ Wrap socket.emit in a promise with timeout
  const emitWithAck = (event, data, timeout = 5000) =>
    new Promise((resolve, reject) => {
      if (!socket?.connected) {
        return reject(new Error("Socket not connected"));
      }
      const timer = setTimeout(() => {
        reject(new Error(`${event} ack timeout`));
      }, timeout);

      socket.emit(event, data, (ack) => {
        clearTimeout(timer);
        resolve(ack);
      });
    });

  try {
    const ack = await emitWithAck("join-chat", { chatId, URDD, participentIds });
    if (!ack?.success) {
      console.error("Failed to join chat", ack);
      return;
    }

    console.warn("ack success");

    const userIdForChat = user?.id;
    if (!userIdForChat) {
      console.error("Missing target user id for chat", user);
      return;
    }

    try {
      console.warn("dispatching loading");
      dispatch(setPaginationLoading(chatId, true));

      await dispatch(
        getUsersMessageByChatIdPaginated(
          URDD,
          [userIdForChat],
          false,
          null,
          chatId,
          1,
          PAGE_SIZE,
          (res) => {
            console.warn("More messages fetched in user clicked", res);
            const hasMore = res?.payload?.has_more !== false;
            setHasMoreMessages(hasMore);
          },
          (err) => {
            console.warn("Fetch more messages failed", err);
            setHasMoreMessages(false);
          }
        )
      );
    } catch (err) {
      console.warn("Fetch page 1 failed", err);
      setHasMoreMessages(false);
    } finally {
      setLoadingMessages(false);
      dispatch(setPaginationLoading(chatId, false));
    }
  } catch (error) {
    console.error("Error in userClickedHandler:", error);
    setLoadingMessages(false);
  }
}
