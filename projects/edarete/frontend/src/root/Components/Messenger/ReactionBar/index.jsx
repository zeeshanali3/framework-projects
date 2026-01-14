import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import Edit from "@mui/icons-material/Edit";
import Emojeface from "../ChatInputTool/Features/Emojeface";

const ReactionBar = ({
  contentId,
  message,
  onReply,
  onEdit,
  showEdit = false,
  onEmojiSelect,
  URDD,
}) => (
  <Box sx={{ display: "flex", gap: 0.5, maxWidth: "100px" }}>
    {/* Reply Button */}
    <Tooltip title="Reply" placement="top" arrow>
      <IconButton
        size="small"
        sx={{
          color: "text.secondary",
          padding: "4px",
          height: "28px",
          width: "28px",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "action.hover" },
        }}
        onClick={() => onReply(message)}
      >
        <ReplyIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>

    {/* Emoji Button using Emojeface logic without its own picker */}
    <Tooltip title="React" placement="top" arrow>
      <Box>
        <Emojeface
          onEmojiSelect={(emoji) => onEmojiSelect(emoji, contentId)}
          iconButtonProps={{ size: "small" }}
          iconColor="inherit"
          pickerSx={{
            top: "32px",
            bottom: "auto",
            right: message.senderUrdd === URDD ? 0 : undefined,
            left: message.senderUrdd !== URDD ? 0 : undefined,
          }}
        />
      </Box>
    </Tooltip>

    {/* Edit Button (conditional) */}
    {showEdit && (
      <Tooltip title="Edit" placement="top" arrow>
        <IconButton
          size="small"
          sx={{
            color: "text.secondary",
            padding: "4px",
            height: "28px",
            width: "28px",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "action.hover" },
          }}
          onClick={onEdit}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);
export default ReactionBar;
