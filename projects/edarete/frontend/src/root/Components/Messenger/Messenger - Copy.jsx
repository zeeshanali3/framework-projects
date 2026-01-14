import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  useTheme,
  Tooltip,
} from "@mui/material";
import { parseISO, format } from "date-fns";
import { Send } from "@mui/icons-material";
import { socket } from "../Socket/index";
import { useSocket } from "./utils/hooks/useSocket";
import { useSelector } from "react-redux";
import {
  groupMessagesByDay,
  addMessageToGrouped,
} from "./utils/formatTime";
import { getEnrichedQuestion } from "./utils/enrichedQuestion";
import ChatCard from "./ChatCard/index";
import ContactHeader from "./ContactHeader/index";
import ChatHeader from "./ChatHeader/index";
import { Edit, Check } from "@mui/icons-material";
import JumpToBottomButton from "./JumpToBottomButton";
import debouncedScrollHandler from "./utils/debounceHandler";
import axios from "axios";
// const formatDisplayDateTime = (isoTime) => {
//   if (!isoTime) return "";
//   return format(parseISO(isoTime), "MMM d, hh:mm a");
// };

// socket.init();
const Messenger = () => {
  const [inputResponse, setInputResponse] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  const [messages, setMessages] = useState({});
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offDays, setOffDays] = useState([]);
  const [rawResponses, setRawResponses] = useState([]);
  const [weekendDays, setWeekendDays] = useState([]);
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [messageWithOptions, setMessageWithOptions] = useState([]);
  const containerRef = useRef(null);
  const handlerRef = useRef();
  const dayRefs = useRef({});
  const appTheme = useTheme();
  const isDarkMode = appTheme.palette.mode === "dark";
  const currentUser = useSelector((state) => state);
  const { userSelectedRole } = currentUser.main;
  const URDD = userSelectedRole?.user_role_designation_department_id;
  //
  const [showJumpToBottom, setShowJumpToBottom] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(true);
  //
  const [replyQuote, setReplyQuote] = useState(null);
  const rawResponsesRef = useRef([]);
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
  useSocket(); // Handles all socket connection logic
  useEffect(() => {
    const fetchPastResponses = async () => {
      try {
        // setLoading(true);
        console.warn("Fetching past responses...");
        const res = await fetch(
          `http://192.168.1.220:3000/api/crud/chat/session?chats_chat_id=${"1"}&id=${"1"}`
          // "http://localhost:3003/pastResponses"
        );
        const data = await res.json();
        console.warn("data", data);
        setRawResponses(data?.payload?.pastResponses);
        const allMessages = [];
        data.payload.pastResponses.forEach((entry) => {
          entry.entries.forEach((message) => {
            allMessages.push({
              type: message.userType === "bot" ? "bot" : "user",
              text: message.content,
              timestamp: message.timeStamp,
              id: message.id,
              parentId: message.parentId,
              replyTo: message.replyTo,
              messageType: message.message_type?.toLowerCase() || "formal",
            });
          });
        });
        // data.forEach((entry) => {
        //   entry.entries.forEach((pair) => {
        //     if (pair.questionTimestamp) {
        //       allMessages.push({
        //         type: "bot",
        //         text: `${pair.question}`,
        //         timestamp: pair.questionTimestamp,
        //       });
        //     }

        //     if (pair.answerTimestamp) {
        //       allMessages.push({
        //         type: "user",
        //         text: pair.answer,
        //         timestamp: pair.answerTimestamp,
        //         id: pair.id,
        //         parentId: pair.parentId,
        //       });
        //     }
        //   });
        // });

        // ✅ Use the helper function here
        const grouped = groupMessagesByDay(allMessages);
        console.warn("grouped", grouped);
        // console.warn("allMessages", allMessages);
        setMessages(grouped); // Now `messages` is grouped by day
      } catch (error) {
        console.warn("Failed to load past responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastResponses();
  }, []);

  useEffect(() => {
    rawResponsesRef.current = rawResponses || [];
  }, [rawResponses]);
  // console.warn("raw", rawResponses);
  useEffect(() => {
    const fetchOffData = async () => {
      try {
        const resOffDays = await fetch("http://localhost:3003/offDays");
        const resWeekendDays = await fetch("http://localhost:3003/weekendDays");

        const [offDaysData, weekendDaysData] = await Promise.all([
          resOffDays.json(),
          resWeekendDays.json(),
        ]);

        setOffDays(offDaysData);
        setWeekendDays(weekendDaysData);
      } catch (err) {
        console.error("Error fetching offDays/weekendDays", err);
      }
    };

    fetchOffData();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3003/users");
        const data = await res.json();
        setUsers(data);
        console.warn("users", data);
      } catch (err) {
        console.error("Error fetching offDays/weekendDays", err);
      }
    };

    fetchUsers();
  }, []);
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
        // if (msg?.message_type === "Broadcast") {
        //   setMessageWithOptions(msg.id);
        // }
        return {
          type: msg.user_type,
          text:
            msg.user_type === "bot"
              ? getEnrichedQuestion(
                  msg.message_body,
                  rawResponsesRef.current,
                  offDays,
                  weekendDays
                )
              : msg.message_body,
          id: ensureMessageId(msg),
          parentId: msg.parent_id,
          timestamp: msg.timestamp,
          messageType: msg.message_type?.toLowerCase() || "formal",
          isBroadcast,
        };
      };
      const newMsg = processMessage(msg);
      console.warn("Socket new new message received:", newMsg);
      // console.warn("Socket message received:", newMsg);
      setMessages((prev) => addMessageToGrouped(prev, newMsg));
    };
  }, []);
  const listener = (...args) => handlerRef.current?.(...args);
  // const listener = useCallback((msg) => {
  //   const newMsg = {
  //     type: msg.user_type,
  //     text: msg.message_body,
  //     id: msg.id,
  //     parentId: msg.parent_id,
  //     timestamp: msg.timestamp,
  //   };
  //   console.warn("Socket message received:", newMsg);
  // });
  useEffect(() => {
    socket.on("message", listener);
    console.warn("Socket listener attached.",listener);

    return () => {
      socket.off("message", listener);
      console.warn("Socket listener detached.");
    };
  }, []);
  // console.warn("URDD", URDD);
  const inputChange = (e) => setInputResponse(e.target.value);
  const inputSubmit = async (overrideValue) => {
    const trimmed = String(overrideValue ?? inputResponse).trim();
    if (!trimmed) return;

    if (editingMsgId) {
      // Editing flow
      setMessages((prev) => {
        const updated = { ...prev };
        for (const day in updated) {
          updated[day] = updated[day].map((m) =>
            m.id === editingMsgId ? { ...m, text: trimmed } : m
          );
        }
        return updated;
      });
      setEditingMsgId(null);
      setInputResponse("");
      await axios.put(`http://192.168.1.220:3000/api/crud/chat/messages?id=1`, {
        ChatMessages_id: editingMsgId,
        chatMessages_message_body: trimmed,
      });
      return;
    }

    console.warn("Sending message to socket:", trimmed);
    socket.emit("message", { message: trimmed, actionPerformerURDD: URDD });
    setInputResponse("");
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 300);
  };

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

  // const inputSubmit = async () => {
  //   const trimmed = inputResponse.trim();
  //   if (!trimmed) return;
  //   if (editingMsgId) {
  //     // if (!editingMsgId) return;
  //     // ✅ Update existing message
  //     console.warn("Saving edit for msgId:", editingMsgId);
  //     setMessages((prev) => {
  //       const updated = { ...prev };
  //       for (const day in updated) {
  //         updated[day] = updated[day].map((m) =>
  //           m.id === editingMsgId ? { ...m, text: trimmed } : m
  //         );
  //       }
  //       console.warn("Updated messages:", updated);
  //       return updated;
  //     });
  //     setEditingMsgId(null);
  //     setInputResponse("");
  //     axios.put(`http://192.168.1.220:3000/api/crud/chat/messages?id=${"1"}`, {
  //       ChatMessages_id: editingMsgId,
  //       chatMessages_message_body: trimmed,
  //       // chats_chat_id: chatId,
  //       // pastResponses: updated,
  //     });
  //     return;
  //   }
  //   console.warn("Sending message to socket:", trimmed);
  //   socket.emit("message", { message: trimmed, actionPerformerURDD: URDD });
  //   setInputResponse("");
  //   setIsSubmitting(true);
  //   setTimeout(() => setIsSubmitting(false), 300); // simulate delay
  // };

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
      debouncedScrollHandler(
        containerRef,
        dayRefs,
        lastScrollPosition,
        setShowJumpToBottom,
        setLastScrollPosition,
        setCurrentLabel,
        setIsNearBottom
      );
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // init
    }

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]); // Add dependency
  //auto-scroll if near bottom
  useEffect(() => {
    if (isNearBottom && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  //   const handleBroadCast = async (value, msgId) => {
  //     try {
  //       console.log("Sending Broadcast message to socket:", value);

  //       setInputResponse(""); // Clear input first
  //       setMessageWithOptions((prev) => prev.filter((id) => id !== msgId)); // Hide options immediately

  //       // Submit the response
  //       setInputResponse(value);
  //       await inputSubmit(); // If async

  //       // Emit socket message
  //       // socket.emit("message", {
  //       //   message: value,
  //       //   actionPerformerURDD: URDD,
  //       // });
  // setInputResponse("");
  //       setIsSubmitting(true);
  //       setTimeout(() => setIsSubmitting(false), 300);
  //     } catch (error) {
  //       console.error("Broadcast action failed:", error);
  //       setIsSubmitting(false);
  //       // Optionally show error to user
  //     }
  //   };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        overflowX: "auto",
        overflowY: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          minWidth: { xs: "370px", md: "35%" },
          // overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          minHeight: "83vh",
          maxHeight: "83vh",
          // overflowY: "auto",
        }}
      >
        <ContactHeader />
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
            minHeight: "76vh",
            maxHeight: "76vh",
            overflowY: "auto",
          }}
        >
          Contacts
          {loading ? (
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
            users.map((user) => (
              <ChatCard key={user.id} user={user} AllData={users} />
            ))
          )}
        </Box>
      </Box>
      <Box
        sx={{
          minWidth: { xs: "450px", md: "62%" },
          // overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
              marginBottom: "80px",
              overflowY: "auto",
            }}
          >
            {loading ? (
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
                <ChatHeader receiver={users[0]} />
                {Object.entries(messages).map(([groupLabel, msgs]) => (
                  <div
                    key={groupLabel}
                    ref={(el) => (dayRefs.current[groupLabel] = el)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        // backgroundColor: "#D3E3FD",
                        // backdropFilter: "blur(20px)",
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
                      <Box
                        key={index}
                        sx={{
                          padding: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems:
                              msg.type === "bot" ? "flex-start" : "flex-end",
                            gap: 0.5,
                            position: "relative",
                            "&:hover .edit-icon": { opacity: 1 },
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor:
                                msg.type === "bot"
                                  ? "#F5F6FA"
                                  : editingMsgId === msg.id
                                  ? "#B2C8FF"
                                  : "#D3E3FD",
                              // color: msg.type === "bot" ? "#4C49ED" : "#260143",
                              color: "#000000",
                              padding: 1.5,
                              borderRadius: 2,
                              wordWrap: "break-word",
                              maxWidth: "80%",
                              minWidth: "6%",
                              // textAlign: "center",
                              whiteSpace: "pre-wrap",
                              boxShadow:
                                editingMsgId === msg.id
                                  ? "0 0 0 2px #4C49ED" // subtle border glow
                                  : "none",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {msg?.text}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "12px",
                              color: "gray",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {msg.timestamp
                              ? format(parseISO(msg.timestamp), "hh:mm a")
                              : ""}

                            <>
                              {msg.type === "user" &&
                                editingMsgId !== msg.id && (
                                  <Tooltip title="Edit" placement="left">
                                    <IconButton
                                      className="edit-icon"
                                      size="small"
                                      sx={{
                                        position: "absolute",
                                        // top: "2px",
                                        right:
                                          msg.type === "user" ? "65px" : "65px",
                                        opacity: 0,
                                        transition: "opacity 0.2s",
                                      }}
                                      onClick={() => {
                                        if (!msg.id) {
                                          console.warn(
                                            "Invalid message ID for editing:",
                                            msg
                                          );
                                          return;
                                        }
                                        setEditingMsgId(msg.id);
                                        setInputResponse(msg.text);
                                      }}
                                    >
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                            </>
                          </Box>
                          {msg.isBroadcast &&
                            messageWithOptions.includes(msg.id) && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  justifyContent: "flex-start",
                                  fontSize: "12px",
                                  // paddingX: "2px",
                                  height: "50px",
                                  alignContent: "flex-start",
                                  maxWidth: "200px",
                                  overflowX: "auto",
                                  color: "gray",
                                }}
                              >
                                {broadCastOptions.map((option) => (
                                  <IconButton
                                    // variant="body2"
                                    color="text.secondary"
                                    key={option.value}
                                    onClick={() =>
                                      handleBroadCast(option.value, msg.id)
                                    }
                                    sx={{
                                      cursor: "pointer",
                                      height: "24px",
                                      padding: "2px 4px",
                                      fontSize: "14px",
                                      // fontW
                                      minWidth: "50px",
                                      textAlign: "center",
                                      backgroundColor: "#908fe0",
                                      borderRadius: "0.8rem",
                                      "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                                        color: "primary.main", // or any other hover color
                                      },
                                    }}
                                  >
                                    {option.label}
                                  </IconButton>
                                ))}
                              </Box>
                            )}
                        </Box>
                      </Box>
                    ))}
                  </div>
                ))}
              </>
            )}
          </Box>
          <JumpToBottomButton
            visible={showJumpToBottom}
            ref={containerRef.current}
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
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#F5F6FA",
              // paddingY: "15px",
              // paddingX: "30px",
              borderTop: "1px solid #F5F4F6",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                fullWidth
                multiline
                minRows={1}
                maxRows={4}
                placeholder={
                  editingMsgId ? "Edit your message" : "Type a message"
                }
                variant="outlined"
                value={inputResponse}
                onChange={inputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isSubmitting) {
                    e.preventDefault();
                    inputSubmit();
                  }
                }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    "& fieldset": {
                      borderRadius: "20px",
                    },
                  },
                }}
              />

              {editingMsgId && (
                <IconButton
                  sx={{
                    backgroundColor: "#ccc",
                    color: "#333",
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    "&:hover": { backgroundColor: "#aaa" },
                  }}
                  onClick={() => {
                    setEditingMsgId(null);
                    setInputResponse("");
                  }}
                >
                  ✕
                </IconButton>
              )}

              <IconButton
                sx={{
                  backgroundColor: "#4C49ED",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  "&:hover": { backgroundColor: "rgba(89, 98, 189, 1)" },
                }}
                onClick={inputSubmit}
                disabled={isSubmitting}
              >
                {editingMsgId ? <Check /> : <Send />}
              </IconButton>
            </Box>
            {/* <InputFeatures
              attachment={true}
              // attachmentLables={attachmentLables}
              formatting={true}
              imageView={true}
              emoji={true}
              voice={true}
              replyQuote={replyQuote}
              setReplyQuote={setReplyQuote}
              showBold={true}
              showItalic={true}
              showUnderline={true}
              showLink={true}
              showCode={true}
              showColor={true}
            /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Messenger;
