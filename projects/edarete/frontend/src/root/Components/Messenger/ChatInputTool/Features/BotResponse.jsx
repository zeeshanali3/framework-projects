import React, { useState, useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import { parseISO, format, isToday, isYesterday, compareAsc } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import ReplyIcon from "@mui/icons-material/Reply";
import { getServerResponse } from "../../../Helpers/getServerResponse";
import Emojeface from "./Emojeface";

const lables = ["Upload pdf file", "Upload word file"];

// Utility functions
const formatDisplayDate = (isoDate) => {
  if (!isoDate) return "";
  const parsed = parseISO(isoDate);
  if (isToday(parsed)) return "Today";
  if (isYesterday(parsed)) return "Yesterday";
  return format(parsed, "MMMM d, yyyy");
};

const formatDisplayDateTime = (isoTime) => {
  return format(parseISO(isoTime), "MMM d, hh:mm a");
};

const BotResponse = ({ dailyBotData, dailyBotConfig, setReplyQuote }) => {
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [pastResponses, setPastResponses] = useState([]);
  const currentQuestions = dailyBotData.data.currentQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputResponse, setInputResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [emojiPickerOpenId, setEmojiPickerOpenId] = useState(null);
  const [reactions, setReactions] = useState({});
  // const [replyQuote, setReplyQuote] = useState(null);

  const react = dailyBotConfig.modules.react;
  const reply = dailyBotConfig.modules.reply;

  // Fetch Past Responses
  useEffect(() => {
    if (dailyBotConfig.fetchData) {
      const serverCommunication = dailyBotData.serverCommunication;
      const onSuccess = (res) => {
        const sortedResponses = [...res]
          .sort((a, b) =>
            compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
          )
          .map((entry) => ({
            ...entry,
            entries: [...(entry.entries || [])].sort((a, b) =>
              compareAsc(
                parseISO(a.promptTimeStamp),
                parseISO(b.promptTimeStamp)
              )
            ),
          }));
        setPastResponses(sortedResponses);
        setLoading(false);
      };
      const onFailure = (err) => {
        console.error("Error", err);
        setLoading(false);
      };
      serverCommunication.onSuccess = onSuccess;
      serverCommunication.onFailure = onFailure;
      getServerResponse(serverCommunication);
    } else {
      const getPastResponses = async () => {
        try {
          const res = await fetch("http://localhost:3003/responses");
          if (!res.ok) throw new Error("Failed to fetch data");
          const data = await res.json();
          const sortedResponses = [...data]
            .sort((a, b) =>
              compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
            )
            .map((entry) => ({
              ...entry,
              entries: [...(entry.entries || [])].sort((a, b) =>
                compareAsc(
                  parseISO(a.promptTimeStamp),
                  parseISO(b.promptTimeStamp)
                )
              ),
            }));
          setPastResponses(sortedResponses);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching responses", err);
          setLoading(false);
        }
      };
      getPastResponses();
    }
  }, []);

  // Add current question to answers
  useEffect(() => {
    if (currentQuestionIndex >= currentQuestions.length) return;
    const question = currentQuestions[currentQuestionIndex];
    if (!answers.some((item) => item.contentId === question.contentId)) {
      setAnswers((prev) => [
        ...prev,
        { ...question, promptTimeStamp: new Date().toISOString() },
      ]);
    }
  }, [currentQuestionIndex]);

  // Scroll to bottom
  useEffect(() => {
    if (!loading && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [loading, answers]);

  // Handlers
  const inputChange = (event) => setInputResponse(event.target.value);

  const inputSubmit = async () => {
    if (currentQuestionIndex >= currentQuestions.length) return;

    const updatedAnswers = answers.map((item, index) =>
      index === currentQuestionIndex
        ? {
            ...item,
            content: inputResponse,
            contentTimeStamp: new Date().toISOString(),
          }
        : item
    );

    const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;

    if (isLastQuestion) {
      setIsSubmitting(true);
      const payload = {
        createdAt: new Date().toISOString(),
        entries: updatedAnswers,
      };
      try {
        const res = await fetch("http://localhost:3003/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to submit response");
        setIsSubmitted(true);
      } catch (err) {
        console.error("Submission error:", err);
        return;
      }
    }

    setAnswers(updatedAnswers);
    setCurrentQuestionIndex((prev) => prev + 1);
    setInputResponse("");
    setIsSubmitting(false);
  };

  const handleEmojiClick = (emojiObject, contentId) => {
    setReactions((prev) => ({ ...prev, [contentId]: [emojiObject.emoji] }));
    setEmojiPickerOpenId(null);
  };

  const ReactionBar = ({ contentId, message, onReply }) => (
    <Box
      sx={{
        position: "absolute",
        top: -30,
        right: 20,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "20px",
        padding: "2px 8px",
        display: "flex",
        gap: 1,
        alignItems: "center",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      {react && (
        <Box onClick={() => setEmojiPickerOpenId(contentId)}>
          <Emojeface />
        </Box>
      )}
      {reply && (
        <ReplyIcon
          sx={{ fontSize: 18, color: "#6e747aff" }}
          onClick={() => onReply(message)}
        />
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        minHeight: "78vh",
        maxHeight: "78vh",
        overflow: "hidden",
        position: { xs: "fixed", md: "relative" },
        width: { xs: "80%", md: "100%" },
        display: "flex",
        flexDirection: "column",
        border: "1px solid #F5F4F6",
        boxSizing: "border-box",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          padding: "20px",
          marginBottom: "85px",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "72vh",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <>
            {/* Past Responses */}
            {pastResponses?.length > 0 &&
              pastResponses.map((item) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#6e747aff",
                      fontSize: "15px",
                    }}
                  >
                    {formatDisplayDate(item.createdAt)}
                  </Box>
                  {item.entries.map((entry) => {
                    const promptId = `past-${item.createdAt}-${entry.contentId}`;
                    const responseId = `past-${item.createdAt}-${entry.contentId}-res`;
                    return (
                      <Box
                        key={entry.contentId}
                        sx={{
                          padding: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        {/* Prompt */}
                        <Box
                          onMouseEnter={() => setHoveredId(promptId)}
                          onMouseLeave={() => setHoveredId(null)}
                          sx={{
                            position: "relative",
                            alignSelf: "flex-start",
                            maxWidth: "540px",
                          }}
                        >
                          {hoveredId === promptId && (
                            <ReactionBar
                              contentId={promptId}
                              message={entry.prompt}
                              onReply={setReplyQuote}
                            />
                          )}
                          {emojiPickerOpenId === promptId && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: "0",
                                left: "80%",
                                zIndex: 999,
                              }}
                            >
                              <EmojiPicker
                                width={280}
                                height={300}
                                onEmojiClick={(e) =>
                                  handleEmojiClick(e, promptId)
                                }
                              />
                            </Box>
                          )}
                          <Box
                            sx={{ fontSize: "12px", color: "gray", mb: 0.5 }}
                          >
                            {formatDisplayDateTime(entry.promptTimeStamp)}
                          </Box>
                          <Box
                            sx={{
                              backgroundColor: "#F5F6FA",
                              padding: 1.5,
                              borderRadius: 3,
                            }}
                          >
                            {entry.prompt}
                          </Box>
                          {reactions[promptId]?.length > 0 &&
                            reactions[promptId].map((emoji, i) => (
                              <span key={i}>{emoji}</span>
                            ))}
                        </Box>
                        {/* Response */}
                        <Box
                          onMouseEnter={() => setHoveredId(responseId)}
                          onMouseLeave={() => setHoveredId(null)}
                          sx={{
                            position: "relative",
                            alignSelf: "flex-end",
                            maxWidth: "540px",
                          }}
                        >
                          {hoveredId === responseId && (
                            <ReactionBar
                              contentId={responseId}
                              message={entry.content}
                              onReply={setReplyQuote}
                            />
                          )}
                          {emojiPickerOpenId === responseId && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: "-100%",
                                right: 0,
                                zIndex: 999,
                              }}
                            >
                              <EmojiPicker
                                width={280}
                                onEmojiClick={(e) =>
                                  handleEmojiClick(e, responseId)
                                }
                              />
                            </Box>
                          )}
                          <Box
                            sx={{ fontSize: "12px", color: "gray", mb: 0.5 }}
                          >
                            {formatDisplayDateTime(entry.contentTimeStamp)}
                          </Box>
                          <Box
                            sx={{
                              backgroundColor: "#D3E3FD",
                              padding: 1.5,
                              borderRadius: 3,
                            }}
                          >
                            {entry.content}
                          </Box>
                          {reactions[responseId]?.length > 0 &&
                            reactions[responseId].map((emoji, i) => (
                              <span key={i}>{emoji}</span>
                            ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              ))}

            {/* Today's Responses */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "#6e747aff",
                fontSize: "15px",
              }}
            >
              Today
            </Box>
            {answers?.length > 0 &&
              answers.map((item) => {
                const promptId = `today-${item.contentId}`;
                const responseId = `today-${item.contentId}-res`;
                return (
                  <Box
                    key={item.contentId}
                    sx={{
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      onMouseEnter={() => setHoveredId(promptId)}
                      onMouseLeave={() => setHoveredId(null)}
                      sx={{
                        position: "relative",
                        alignSelf: "flex-start",
                        maxWidth: "540px",
                      }}
                    >
                      {hoveredId === promptId && (
                        <ReactionBar
                          contentId={promptId}
                          message={item.prompt}
                          onReply={setReplyQuote}
                        />
                      )}
                      {emojiPickerOpenId === promptId && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "-100%",
                            right: 0,
                            zIndex: 999,
                          }}
                        >
                          <EmojiPicker
                            width={280}
                            onEmojiClick={(e) => handleEmojiClick(e, promptId)}
                          />
                        </Box>
                      )}
                      <Box sx={{ fontSize: "12px", color: "gray", mt: 0.5 }}>
                        {formatDisplayDateTime(item.promptTimeStamp)}
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "#F5F6FA",
                          padding: 1.5,
                          borderRadius: 3,
                        }}
                      >
                        {item.prompt}
                      </Box>
                      {reactions[promptId]?.length > 0 &&
                        reactions[promptId].map((emoji, i) => (
                          <span key={i}>{emoji}</span>
                        ))}
                    </Box>
                    {item.contentTimeStamp && item.content && (
                      <Box
                        onMouseEnter={() => setHoveredId(responseId)}
                        onMouseLeave={() => setHoveredId(null)}
                        sx={{
                          position: "relative",
                          alignSelf: "flex-end",
                          maxWidth: "540px",
                        }}
                      >
                        {hoveredId === responseId && (
                          <ReactionBar
                            contentId={responseId}
                            message={item.content}
                            onReply={setReplyQuote}
                          />
                        )}
                        {emojiPickerOpenId === responseId && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "-100%",
                              right: 0,
                              zIndex: 999,
                            }}
                          >
                            <EmojiPicker
                              width={280}
                              onEmojiClick={(e) =>
                                handleEmojiClick(e, responseId)
                              }
                            />
                          </Box>
                        )}
                        <Box
                          sx={{
                            backgroundColor: "#D3E3FD",
                            padding: 1.5,
                            borderRadius: 3,
                          }}
                        >
                          {item.content}
                        </Box>
                        <Box sx={{ fontSize: "12px", color: "gray", mt: 0.5 }}>
                          {formatDisplayDateTime(item.contentTimeStamp)}
                        </Box>
                        {reactions[responseId]?.length > 0 &&
                          reactions[responseId].map((emoji, i) => (
                            <span key={i}>{emoji}</span>
                          ))}
                      </Box>
                    )}
                  </Box>
                );
              })}
          </>
        )}
      </Box>

      {/* <InputTool
                attachment={true}
                attachmentLables={lables}
                formatting={true}
                imageView={true}
                iconButtonProps={true}
                emoji={true}
                voice={true}
                replyQuote={replyQuote}
                setReplyQuote={() => setReplyQuote(null)}
                showBold={true}
                showItalic={true}
                showUnderline={true}
                showLink={true}
                showCode={true}
                showColor={true}
            /> */}
    </Box>
  );
};

export default BotResponse;
