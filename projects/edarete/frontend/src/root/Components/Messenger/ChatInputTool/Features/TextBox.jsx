import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  ClickAwayListener,
  Popper,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Formatting from "./Formatting";
import Emojeface from "./Emojeface";
import Voicemessage from "./Voicemessage";

function TextBox({
  selectedColor,
  setSelectedColor,
  formatting = true,
  emoji,
  voice,
  showBold = true,
  showItalic = true,
  showUnderline = true,
  showLink = true,
  showCode = true,
  showColor = true,
  editorRef,
  onClick,
  isSubmitting,
  setHasText,
  hasText,
}) {
  // const editorRef = useRef(null);
  // const [editorContent, setEditorContent] = useState("");
  const [savedSelection, setSavedSelection] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchorRef = useRef(null);
  // console.warn("editorRef", editorRef?.current?.innerText);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width:600px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = () => {
    const text = editorRef.current?.textContent || "";
    setHasText(text.trim().length > 0);
  };
  const handleScroll = () => {
    const text = editorRef.current?.textContent || "";
    setHasText(text.trim().length > 0);
  };
  // console.warn("editorRef innerText", editorRef?.current?.innerText);
  // console.warn("editorRef textContent", editorRef?.current?.textContent);
  // console.warn("text box has contetnt", hasText);
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0));
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("mouseup", saveSelection);
      editor.addEventListener("keyup", saveSelection);
      editor.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (editor) {
        editor.removeEventListener("mouseup", saveSelection);
        editor.removeEventListener("keyup", saveSelection);
        editor.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleEmojiSelect = (emoji) => {
    if (!editorRef.current || !savedSelection) return;

    editorRef.current.focus();
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedSelection);

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const emojiNode = document.createTextNode(emoji);
    range.insertNode(emojiNode);

    range.setStartAfter(emojiNode);
    range.setEndAfter(emojiNode);
    selection.removeAllRanges();
    selection.addRange(range);

    const text = editorRef.current?.innerText || "";
    setHasText(text.trim().length > 0);
    setSavedSelection(range);
  };

  const handleVoiceRecorded = (blob, url) => {
    console.log("✅ Voice sent:", url);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setMenuOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isSubmitting) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "16px",
        flexGrow: 1,
        boxShadow: "0 0 5px rgba(0,0,0,0.05)",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        paddingRight: isMobile ? "40px" : "8px",
        paddingTop: "6px",
        paddingBottom: "6px",
      }}
    >
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onInput={handleInputChange}
        onClick={saveSelection}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onScroll={handleScroll}
        style={{
          outline: "none",
          fontFamily: "inherit",
          fontSize: "1rem",
          flexGrow: 1,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          minHeight: "40px",
          maxHeight: "200px",
          overflowY: "auto",
          color: selectedColor,
          position: "relative",
          padding: "8px",
          paddingRight: isMobile ? "40px" : "90px",
        }}
      ></div>
      {!hasText && (
        <span
          style={{
            color: isRecording ? "red" : "#075E54",
            pointerEvents: "none",
            position: "absolute",
            left: "11px",
            top: "14px",
            userSelect: "none",
          }}
        >
          {isRecording ? "Recording ............" : "Type a message..."}
        </span>
      )}

      {!isMobile && (
        <>
          <Formatting
            editorRef={editorRef}
            position={{ right: 90 }}
            onFormat={(cmd, val) => console.log("Applied Format:", cmd, val)}
            formatting={formatting}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            showBold={showBold}
            showItalic={showItalic}
            showUnderline={showUnderline}
            showLink={showLink}
            showCode={showCode}
            showColor={showColor}
          />

          <Emojeface
            onEmojiSelect={handleEmojiSelect}
            savedTextRange={savedSelection}
            setSavedTextRange={setSavedSelection}
            emoji={emoji}
          />

          <Voicemessage
            onVoiceRecorded={handleVoiceRecorded}
            onRecordingStatusChange={setIsRecording}
            voice={voice}
          />
        </>
      )}

      {/* On mobile show dots icon */}
      {isMobile && (
        <>
          <IconButton
            ref={menuAnchorRef}
            onClick={toggleMenu}
            size="small"
            sx={{ position: "absolute", right: 2, top: 8 }}
            aria-label="more options"
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>

          <Popper
            open={menuOpen}
            anchorEl={menuAnchorRef.current}
            placement="top-end"
            style={{ zIndex: 1300 }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column", // stack vertically
                  gap: 2, // more space between icons
                  borderRadius: "8px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 44,
                    height: 44,
                  }}
                >
                  <Formatting
                    editorRef={editorRef}
                    position={{ right: 10 }}
                    onFormat={(cmd, val) =>
                      console.log("Applied Format:", cmd, val)
                    }
                    formatting={formatting}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    showBold={showBold}
                    showItalic={showItalic}
                    showUnderline={showUnderline}
                    showLink={showLink}
                    showCode={showCode}
                    showColor={showColor}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 44,
                    height: 44,
                  }}
                >
                  <Emojeface
                    onEmojiSelect={handleEmojiSelect}
                    savedTextRange={savedSelection}
                    setSavedTextRange={setSavedSelection}
                    emoji={emoji}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 44,
                    height: 44,
                  }}
                >
                  <Voicemessage
                    onVoiceRecorded={handleVoiceRecorded}
                    onRecordingStatusChange={setIsRecording}
                    voice={voice}
                  />
                </Box>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </>
      )}
    </Box>
  );
}

export default TextBox;
