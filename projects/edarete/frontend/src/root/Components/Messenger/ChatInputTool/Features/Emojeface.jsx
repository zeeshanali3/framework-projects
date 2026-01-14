import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";

function Emojeface({
  emoji = true,
  onEmojiSelect,
  showEmojiPicker: externalShowEmojiPicker,
  setShowEmojiPicker: externalSetShowEmojiPicker,
  savedTextRange: externalSavedTextRange,
  setSavedTextRange: externalSetSavedTextRange,
  iconColor = "black",
  iconPosition,
  iconButtonProps = {},
  pickerSx = {},
}) {
  const [internalShowEmojiPicker, setInternalShowEmojiPicker] = useState(false);
  const [internalSavedTextRange, setInternalSavedTextRange] = useState(null);

  if (!emoji) return null;

  const showEmojiPicker = externalShowEmojiPicker ?? internalShowEmojiPicker;
  const setShowEmojiPicker =
    externalSetShowEmojiPicker ?? setInternalShowEmojiPicker;
  const savedTextRange = externalSavedTextRange ?? internalSavedTextRange;
  const setSavedTextRange =
    externalSetSavedTextRange ?? setInternalSavedTextRange;

  const finalIconPosition = iconPosition ?? { bottom: 10, right: 10 };

  const rememberCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedTextRange(selection.getRangeAt(0));
    }
  };

  const handleEmojiClick = (emojiObject) => {
    if (onEmojiSelect) {
      onEmojiSelect(emojiObject.emoji);
    }
    setShowEmojiPicker(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* ICON with customizable position */}
      <Box sx={{ zIndex: 11, ...finalIconPosition }}>
        <IconButton
          onClick={() => {
            rememberCursorPosition();
            setShowEmojiPicker((prev) => !prev);
          }}
          sx={{ color: iconColor }}
          {...iconButtonProps}
        >
          <InsertEmoticonIcon />
        </IconButton>
      </Box>

      {/* EMOJI PICKER (position customizable via pickerSx) */}
      {showEmojiPicker && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            bottom: "60px",
            right: "10px",
            maxHeight: 300,
            overflowY: "auto",
            ...pickerSx,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
    </Box>
  );
}

export default Emojeface;
