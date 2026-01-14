import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  CircularProgress,
  useTheme,
  Typography,
} from "@mui/material";
import MessageCard from "./MessageCard";
import { useSocket } from "./utils/hooks/useSocket";
import { getEnrichedQuestion } from "./utils/enrichedQuestion";
import ChatHeader from "./ChatHeader/index";
import JumpToBottomButton from "./JumpToBottomButton";
import debouncedScrollHandler from "./utils/debounceHandler";

//hamza
// import ChatMode from './ChatInputTool/Features/ChatMode';
import AttachmentFeature from "./ChatInputTool/Features/Attachment";
import SendButton from "./ChatInputTool/Features/SendButton";
import ImageView from "./ChatInputTool/Features/ImageView";
import Replyquote from "./ChatInputTool/Features/Replyquote";
import TextBox from "./ChatInputTool/Features/TextBox";

import { useDispatch, useSelector } from "react-redux";
import {
  getUsersMessageByChatIdPaginated,
  setPaginationLoading,
} from "../../Common/Store/Actions/General/GetActions/getUSersChat";
import { getUsersChats } from "../../Common/Store/Actions/General/GetActions/getUserChats";
import { updateMessage } from "../../Common/Store/Actions/General/UpdateActions/updateUsersMessage";
import { sendNewMessage } from "../../Common/Store/Actions/General/AddActions/addUsersMessage";
import ContactsWindow from "./ContactsWindow";
//
import WelcomeWindow from "./WelcomeWindow";
import { userClickedHandlerFn } from "./utils/userClickedHandler";
// const formatDisplayDateTime = (isoTime) => {
//   if (!isoTime) return "";
//   return format(parseISO(isoTime), "MMM d, hh:mm a");
// };

// socket.init();
const Messenger = () => {
  const { socket, isConnected } = useSocket();
  const [inputResponse, setInputResponse] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  // const [messages, setMessages] = useState({});
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [offDays, setOffDays] = useState([]);
  const [rawResponses, setRawResponses] = useState([]);
  const [weekendDays, setWeekendDays] = useState([]);
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [messageWithOptions, setMessageWithOptions] = useState([]);
  const [hasText, setHasText] = useState(false);
  const containerRef = useRef(null);
  const handlerRef = useRef();
  const dayRefs = useRef({});
  const dispatch = useDispatch();
  const appTheme = useTheme();
  const isDarkMode = appTheme.palette.mode === "dark";
  const contacts = useSelector((state) => state.main.contacts);
  const usersChat = useSelector((state) => state.main.usersChat);
  const userSelectedRole = useSelector((state) => state.main.userSelectedRole);
  const { user_role_designation_department_id: URDD } = userSelectedRole || {};
  // console.warn("URDD", main, usersChat);

  const [showJumpToBottom, setShowJumpToBottom] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(true);
  //
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [openChatSideBar, setOpenChatSideBar] = useState(true);
  const chatId = "1"; // fallback chat id
  const userId = "1"; // fallback user id
  const rawResponsesRef = useRef([]);
  const activeChatId = selectedChatId || chatId;
  const chatData = usersChat && activeChatId ? usersChat[activeChatId] : null;
  const { messages = [], messagesByDay = {} } = chatData || {};
  // Build index to resolve reply previews
  const allMessagesList =
    messages && messages.length
      ? messages
      : Object.values(messagesByDay || {}).flat();
  const messagesById = Object.fromEntries(
    (allMessagesList || []).map((m) => [m?.id, m])
  );
  // Fetch contacts on mount if not present
  useEffect(() => {
    // if (!contacts || contacts.length === 0) {
    dispatch(
      getUsersChats(
        (res) => {
          console.warn("res", res);
        },
        (err) => console.error("Failed to fetch contacts", err)
      )
    );
    // }
  }, [dispatch, URDD]);
  // Set default selected chat from contacts when loaded
  // useEffect(() => {
  //   if (!selectedChatId && contacts && contacts.length > 0) {
  //     const first = contacts[0];
  //     setSelectedChatId(first?.chat_id || first?.id || "1");
  //   }
  // }, [contacts, selectedChatId]);
  //hamza
  // const { features: { chat: chatData, dailyBot: dailyBotData } } = data;
  // const { viewModes, features: { chat: chatConfig, dailyBot: dailyBotConfig } } = config;
  // const mode = viewModes.mode || '';
  // const title = viewModes.title || '';
  const [emojiHoveredId, setEmojiHoveredId] = useState(null);
  const [shareHoveredId, setShareHoveredId] = useState(null);
  const [replyQuote, setReplyQuote] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [hoveredId, setHoveredId] = useState(null);
  //emoji
  const [reactions, setReactions] = useState({});

  // Pagination state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // const [emojiPickerOpenId, setEmojiPickerOpenId] = useState(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const onEmojiSelect = (emoji, contentId) => {
    setReactions((prev) => ({ ...prev, [contentId]: [emoji] }));
  };
  // const groupedMessages = messagesByDay;
  const handleEditMessage = useCallback((msg) => {
    if (!msg?.id) {
      console.warn("Invalid message ID for editing:", msg);
      return;
    }
    console.warn("edit click", hasText);
    // Set editing state
    setEditingMsgId(msg.id);
    setInputResponse(msg.text);
    // Clear existing text
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    // Focus and cursor handling
    setTimeout(() => {
      if (!editorRef.current) return;

      // Set content
      editorRef.current.textContent = msg.text;
      setHasText(!!msg.text);
      editorRef.current.focus();

      // Move cursor to end
      const range = document.createRange();
      const selection = window.getSelection();

      range.selectNodeContents(editorRef.current);
      range.collapse(false);

      selection?.removeAllRanges();
      selection?.addRange(range);
    }, 0);
  }, []);
  //
  const lables = ["Upload pdf file", "Upload word file"];
  const broadCastOptions = [
    {
      label: "Ready",
      value: "Ready",
    },
    {
      label: "CheckIn",
      value: "CheckIn",
    },
    {
      label: "Standup",
      value: "Standup",
    },
  ];
  // console.warn("inputResponse", inputResponse);
  // useSocket(); // Handles all socket connection logic
  // useEffect(() => {
  //   if (activeChatId && !usersChat[activeChatId]) {
  //     dispatch(
  //       getUsersMessageByChatId(
  //         activeChatId,
  //         userId,
  //         (res) => {
  //           setRawResponses(res?.payload?.pastResponses);
  //         },
  //         (err) => setLoading(false)
  //       )
  //     );
  //   }
  // }, [activeChatId, userId, usersChat, dispatch]);

  useEffect(() => {
    rawResponsesRef.current = rawResponses || [];
  }, [rawResponses]);

  // resets the options after day end.
  useEffect(() => {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const timeUntilEndOfDay = endOfDay - now;

    const timer = setTimeout(() => {
      setMessageWithOptions([]);
    }, timeUntilEndOfDay);

    return () => clearTimeout(timer);
  }, []); // run only once
  useEffect(() => {
    handlerRef.current = (msg) => {
      console.warn("Socket message received:", msg);
      function ensureMessageId(msg) {
        // Check for existing valid ID
        if (
          typeof msg?.id === "number" ||
          (typeof msg?.id === "string" && msg.id > 0)
        ) {
          return msg.id;
        }

        // Generate new UUID if needed
        // return uuidv4();
        return Date.now();
      }
      const processMessage = (msg) => {
        const isBroadcast = msg?.message_type?.toLowerCase() === "broadcast";
        const messageId = ensureMessageId(msg);

        if (isBroadcast) {
          setMessageWithOptions((prev) => [...prev, messageId]);
        }
        return {
          type: msg.user_type,
          text:
            msg.user_type === "bot"
              ? getEnrichedQuestion(msg.message_body, rawResponsesRef.current)
              : msg.message_body ?? msg.text ?? "",
          id: messageId,
          timestamp: msg.timestamp,
          replyTo: msg.reply_to
            ? {
                id: msg.reply_to.message_id,
                sender_urdd: msg.reply_to.sender_urdd,
                message_body: msg.reply_to.message_body,
                timestamp: msg.reply_to.created_at,
              }
            : null,
          messageType: msg.message_type?.toLowerCase() || "formal",
          isBroadcast,
          chatId: msg.chat_id || activeChatId,
          senderUrdd: msg.sender_urdd,
        };
      };

      const newMsg = processMessage(msg);
      console.warn("Socket new new message received:", newMsg);
      dispatch(
        sendNewMessage(
          selectedChatId,
          newMsg,
          (res) => {
            console.warn("Successfully  message sent:", res);
          },
          (err) => {
            console.error("Failed to update message:", err);
          }
        )
      );
    };
  }, [activeChatId]);
  const listener = (...args) => handlerRef.current?.(...args);

  useEffect(() => {
    socket.on("message", listener);
    console.warn("Socket listener attached.",listener);

    return () => {
      socket.off("message", listener);
      console.warn("Socket listener detached.");
    };
  }, []);
  // console.warn("URDD", URDD);
  // const inputChange = (e) => setInputResponse(e.target.value);
  const inputSubmit = async (overrideValue) => {
    setIsSubmitting(true);
    // console.warn("inputSubmit", overrideValue);
    const raw =
      overrideValue ?? editorRef.current?.textContent ?? inputResponse;
    const trimmed = String(raw).trim();
    if (!trimmed) return;
    if (replyQuote?.text) {
      console.warn("Reply Quote", replyQuote);
    }
    if (editingMsgId) {
      await dispatch(
        updateMessage(
          selectedChatId,
          editingMsgId,
          trimmed,
          (res) => {
            // Success callback
            console.warn("Successfully  message updated:", res);
            setEditingMsgId(null);
            setInputResponse("");
            if (editorRef.current) editorRef.current.innerHTML = "";
            setHasText(false);
          },
          (err) => {
            // Error callback
            setEditingMsgId(null);
            setInputResponse("");
            if (editorRef.current) editorRef.current.innerHTML = "";
            setHasText(false);
            console.error("Failed to update message:", err);
          }
        )
      );
      setIsSubmitting(false);
      return;
    }
    console.warn("Sending message to socket:", trimmed);
    socket.emit("message", {
      message: trimmed,
      actionPerformerURDD: URDD,
      replyTo: replyQuote || null,
      chatId: selectedChatId,
    });
    setInputResponse("");
    if (editorRef.current) editorRef.current.innerHTML = "";
    setHasText(false);

    // clear reply after sending
    if (replyQuote?.id) {
      setReplyQuote(null);
    }

    setIsSubmitting(false);
  };

  const loadMoreMessages = useCallback(async () => {
    if (!selectedChatId || !URDD || isLoadingMore || !hasMoreMessages) return;

    const container = containerRef.current;
    const prevScrollHeight = container.scrollHeight;

    const nextPage = currentPage + 1;
    setIsLoadingMore(true);
    dispatch(setPaginationLoading(selectedChatId, true));

    try {
      const user = contacts?.find(
        (c) => (c?.chat_id || c?.id) === selectedChatId
      );

      await dispatch(
        getUsersMessageByChatIdPaginated(
          URDD,
          [user?.id],
          false,
          null,
          selectedChatId,
          nextPage,
          PAGE_SIZE,
          (res) => {
            console.warn("More messages fetched", res);
            setCurrentPage(nextPage);

            // Check if we have more messages
            const hasMore = res?.has_more;
            setHasMoreMessages(hasMore);
          },
          (err) => {
            console.warn("Fetch more messages failed", err);
          }
        )
      );

      // setCurrentPage(nextPage);
      // setHasMoreMessages(result?.has_more !== false);

      // Restore scroll so it doesn’t flick
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop =
          newScrollHeight - prevScrollHeight + container.scrollTop;
      }, 100);
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoadingMore(false);
      dispatch(setPaginationLoading(selectedChatId, false));
    }
  }, [
    selectedChatId,
    URDD,
    currentPage,
    isLoadingMore,
    hasMoreMessages,
    contacts,
    dispatch,
  ]);

  const handleBroadCast = async (value, msgId) => {
    try {
      console.log("Sending Broadcast message to socket:", value);

      // Hide options immediately
      setMessageWithOptions((prev) => prev.filter((id) => id !== msgId));

      // Send directly without messing with input state first
      await inputSubmit(value);
    } catch (error) {
      console.error("Broadcast action failed:", error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      // Only auto-scroll if we're already near the bottom
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop <= clientHeight + 100;

      if (isNearBottom) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  }, [messages]);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;

      debouncedScrollHandler(
        containerRef,
        dayRefs,
        lastScrollPosition,
        setShowJumpToBottom,
        setLastScrollPosition,
        setCurrentLabel,
        setIsNearBottom
      );

      if (container && selectedChatId && hasMoreMessages && !isLoadingMore) {
        // Trigger when user is close to the TOP

        if (container.scrollTop <= 100) {
          loadMoreMessages();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // init
    }

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [
    lastScrollPosition,
    selectedChatId,
    hasMoreMessages,
    isLoadingMore,
    loadMoreMessages,
  ]); // Add dependencies
  //auto-scroll if near bottom
  useEffect(() => {
    if (isNearBottom && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  const userClickedHandler = useCallback(
    (user) =>
      userClickedHandlerFn({
        user,
        URDD,
        participentIds: [user?.id],
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
      }),
    [dispatch, socket, URDD, contacts]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        overflowX: "auto",
        overflowY: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: {
            xs: selectedChatId && !openChatSideBar ? "none" : "block",
            md: "block",
          },
          flex: { md: "0 0 30%", xs: "100%" },
        }}
      >
        <ContactsWindow
          users={contacts && contacts.length ? contacts : users}
          loading={loading}
          onUserClick={(user) => {
            userClickedHandler(user);
            setOpenChatSideBar(false);
          }}
          userStatus={isConnected}
        />
      </Box>
      <Box
        sx={{
          display: { xs: openChatSideBar ? "none" : "flex", md: "flex" },
          flex: 1,
          flexDirection: "column",
          minWidth: { md: "62%", xs: "100%" },
        }}
      >
        {/* On desktop: show welcome if no chat selected */}
        {!selectedChatId ? (
          <WelcomeWindow />
        ) : (
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              minHeight: "83vh",
              maxHeight: "83vh",
              overflowX: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #F5F4F6",
            }}
          >
            <Box
              ref={containerRef}
              sx={{
                flex: 1,
                // paddingY: "20px",
                // marginBottom: "80px",
                overflowY: "auto",
              }}
            >
              <>
                <ChatHeader
                  receiver={(contacts || []).find(
                    (c) => (c?.chat_id || c?.id) === activeChatId
                  )}
                  // handleGoBack={() => setOpenChatSideBar(!openChatSideBar);

                  // }
                  handleGoBack={() => {
                    setOpenChatSideBar(true); // 👈 mobile: back to contacts
                    setSelectedChatId(null);
                  }}
                />
                {loadingMessages ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "30%",
                      minHeight: "100%",
                    }}
                  >
                    <CircularProgress color="inherit" />
                  </Box>
                ) : (
                  <>
                    {usersChat && usersChat[activeChatId]?.pagination?.isLoading && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          py: 2,
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <CircularProgress size={24} color="primary" />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, color: "text.secondary" }}
                        >
                          Loading more messages...
                        </Typography>
                      </Box>
                    )}
                    {Object.entries(messagesByDay).map(([groupLabel, msgs]) => (
                      <div
                        key={groupLabel}
                        ref={(el) => (dayRefs.current[groupLabel] = el)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "#6e747aff",
                            fontSize: "15px",
                            position: "sticky",
                            borderBottom: "1px solid #ddd",
                            zIndex: 10,
                            top: "55px",
                            mt: 2,
                          }}
                        >
                          {groupLabel}
                        </Box>
                        {msgs.map((msg, index) => (
                          <MessageCard
                            key={msg?.id || index}
                            msg={msg}
                            index={index}
                            editingMsgId={editingMsgId}
                            reactions={reactions}
                            messageWithOptions={messageWithOptions}
                            broadCastOptions={broadCastOptions}
                            onReply={setReplyQuote}
                            onEdit={handleEditMessage}
                            onEmojiSelect={onEmojiSelect}
                            onReactionRemove={(msgId) =>
                              setReactions((prev) => ({ ...prev, [msgId]: [] }))
                            }
                            onBroadcastOptionClick={handleBroadCast}
                            messagesById={messagesById}
                            URDD={URDD}
                          />
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </>
            </Box>
            <JumpToBottomButton
              visible={showJumpToBottom}
              Bref={containerRef.current}
              // Add check for empty messages
              onClick={() => {
                if (containerRef.current) {
                  const hasContent =
                    containerRef.current.scrollHeight >
                    containerRef.current.clientHeight;
                  if (hasContent) {
                    containerRef.current.scrollTo({
                      top: containerRef.current.scrollHeight,
                      behavior: "smooth",
                    });
                  }
                }
              }}
              sx={{
                position: "absolute",
                // left: "50%",
                // transform: "translateX(-50%)",
              }}
            />
            {/* field area */}
            <Box
              sx={{
                position: { xs: "fixed", md: "relative" },
                bottom: 0,
                left: { xs: "42%", md: 0 },
                right: { xs: "auto", md: 0 },
                transform: { xs: "translateX(-50%)", md: "none" },
                width: { xs: "90%", md: "100%" },
                maxWidth: { xs: 360, md: "100%" },
                backgroundColor: "#075E54",
                paddingY: "15px",
                paddingX: "30px",
                borderTop: "1px solid rgb(211, 187, 235)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                boxSizing: "border-box",
                zIndex: 1000,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  position: "relative",
                }}
              >
                <AttachmentFeature
                  attachment={true}
                  labels={lables}
                  setSelectedFile={setSelectedFile}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: "10px",
                    position: "relative",
                    px: 1,
                    py: 1,
                  }}
                >
                  {console.log("My reply", replyQuote)}
                  <Replyquote
                    replyQuote={replyQuote?.text}
                    onCancel={() => setReplyQuote({})}
                  />
                  <TextBox
                    editorRef={editorRef}
                    isSubmitting={isSubmitting}
                    onClick={inputSubmit}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    emoji={true}
                    voice={true}
                    formatting={true}
                    //formatting
                    showBold={true}
                    showItalic={true}
                    showUnderline={true}
                    showLink={true}
                    showCode={true}
                    showColor={true}
                    setHasText={setHasText}
                    hasText={hasText}
                  />

                  <ImageView
                    selectedFile={selectedFile}
                    onRemove={() => setSelectedFile(null)}
                    imageView={true}
                  />
                </Box>

                <SendButton
                  editorRef={editorRef}
                  onClick={inputSubmit}
                  editingMsgId={editingMsgId}
                  setEditingMsgId={setEditingMsgId}
                  setInputResponse={setInputResponse}
                  setHasText={setHasText}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Messenger;
