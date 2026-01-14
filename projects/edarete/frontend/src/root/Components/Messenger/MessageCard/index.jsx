import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { format, parseISO } from "date-fns";
import ReactionBar from "../ReactionBar";

const MessageCard = ({
  msg,
  index,
  editingMsgId,
  reactions,
  messageWithOptions,
  broadCastOptions,
  onReply,
  onEdit,
  onEmojiSelect,
  onReactionRemove,
  onBroadcastOptionClick,
  messagesById,
  URDD,
}) => {
  return (
    <Box
      key={msg?.id || index}
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
          alignSelf: msg.senderUrdd === URDD ? "flex-end" : "flex-start",
          alignItems: msg.senderUrdd === URDD ? "flex-end" : "flex-start",
          gap: 0.5,
          position: "relative",
          "&:hover .action-icons": {
            opacity: 1,
            pointerEvents: "auto",
          },
        }}
      >
        {/* Action Icons (Reaction Bar) */}
        <Box
          className="action-icons"
          sx={{
            display: "flex",
            alignItems: "center",

            gap: 0.5,
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            pointerEvents: "none",
          }}
        >
          <ReactionBar
            contentId={msg.id}
            message={msg}
            onReply={() => onReply(msg)}
            showEdit={msg.type === "user" && editingMsgId !== msg.id}
            onEdit={() => onEdit(msg)}
            onEmojiSelect={(emoji) => onEmojiSelect(emoji, msg.id)}
            URDD={URDD}
          />
        </Box>

        {/* Reply Preview */}

        {/* Message Bubble */}
        <Box
          sx={{
            backgroundColor:
              msg.type === "bot"
                ? "#F5F6FA"
                : editingMsgId === msg.id
                ? "#B2C8FF"
                : "#D3E3FD",
            color: "#000000",
            p: 1.5,
            // borderRadius: "0px 0 2px 2px",
            borderBottomRightRadius: msg.senderUrdd === URDD ? "0px" : "15px",
            borderBottomLeftRadius: msg.senderUrdd === URDD ? "15px" : "0px",
            wordWrap: "break-word",
            maxWidth: "80%", // Keep width constraint
            minWidth: "42px",
            whiteSpace: "pre-wrap",
            boxShadow: editingMsgId === msg.id ? "0 0 0 2px #4C49ED" : "none",
            transition: "all 0.2s ease",
            display: "inline-block",
          }}
        >
          {/* Reply preview */}
          {msg.replyTo?.message_body && (
            <Box
              sx={{
                minWidth: "60px", // ✅ keep width constraint
                alignSelf: msg.senderUrdd === URDD ? "flex-end" : "flex-start",
                backgroundColor: "#eef2f7",
                borderLeft: "3px solid #9aa7b2",
                borderRadius: 1,
                px: 1,
                py: 0.5,
                mb: 1,
                overflow: "hidden", // keeps layout tidy
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#607d8b", fontWeight: 600, display: "block" }}
              >
                {msg.replyTo.sender_urdd || "User"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#455a64",
                  // whiteSpace: "normal", // ✅ allows text wrapping
                  // wordBreak: "break-word",
                }}
              >
                {msg.replyTo.message_body || "Original message not available"}
              </Typography>
            </Box>
          )}

          {/* Actual message */}
          {msg.text}
        </Box>

        {/* Message Footer - Timestamp */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 0.5,
            position: "relative",
            height: "20px",
            justifyContent: msg.senderUrdd === URDD ? "flex-end" : "flex-start",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            {msg.timestamp ? format(parseISO(msg.timestamp), "hh:mm a") : ""}
          </Typography>
        </Box>

        {/* Reactions */}
        {reactions[msg.id]?.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              bottom: -4,
              right: msg.senderUrdd === URDD ? 64 : undefined,
              left: msg.senderUrdd !== URDD ? 64 : undefined,
              backgroundColor: "background.paper",
              borderRadius: "10px",
              padding: "2px 4px",
              // border: "1px solid",
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: "row",
              fontSize: "12px",
              "&:hover .emoji-button": {
                opacity: 1,
                pointerEvents: "auto",
              },
            }}
          >
            <IconButton
              className="emoji-button"
              size="small"
              sx={{
                color: "text.secondary",
                padding: "4px",
                borderRadius: "50%",

                transition: "opacity 0.2s ease-in-out",
                pointerEvents: "none",
              }}
              onClick={() => onReactionRemove(msg.id)}
            >
              {reactions[msg.id][0]}
            </IconButton>
          </Box>
        )}

        {/* Broadcast Options */}
        {msg.isBroadcast && messageWithOptions.includes(msg.id) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "flex-start",
              fontSize: "12px",
              height: "50px",
              alignContent: "flex-start",
              maxWidth: "200px",
              overflowX: "auto",
              color: "gray",
            }}
          >
            {broadCastOptions.map((option) => (
              <IconButton
                key={option.value}
                onClick={() => onBroadcastOptionClick(option.value, msg.id)}
                sx={{
                  cursor: "pointer",
                  height: "24px",
                  padding: "2px 4px",
                  fontSize: "14px",
                  minWidth: "50px",
                  textAlign: "center",
                  backgroundColor: "#908fe0",
                  borderRadius: "0.8rem",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    color: "primary.main",
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
  );
};

export default MessageCard;
