import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import AttachmentFeature from "./Features/Attachment";
import TextBox from "./Features/TextBox";
import ImageView from "./Features/ImageView";
import SendButton from "./Features/SendButton";
import Replyquote from "./Features/Replyquote";

const InputFeatures = ({
  attachment,
  attachmentLables,
  formatting,
  imageView,
  emoji,
  voice,
  replyQuote,
  setReplyQuote,
  showBold,
  showItalic,
  showUnderline,
  showLink,
  showCode,
  showColor,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);

  const inputSubmit = () => {
    if (!editorContent.trim()) return;

    console.log("Submitted message:", editorContent);
    if (replyQuote) {
      console.log("In reply to:", replyQuote.message);
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setEditorContent("");
      if (editorRef.current) editorRef.current.innerHTML = "";
      setSelectedFile(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        position: { xs: "fixed", md: "absolute" },
        bottom: 0,
        left: { xs: "42%", md: 0 },
        right: { xs: "auto", md: 0 },
        transform: { xs: "translateX(-50%)", md: "none" },
        width: { xs: "90%", md: "100%" },
        maxWidth: { xs: 360, md: "100%" },
        backgroundColor: "#F5F6FA",
        paddingY: "15px",
        paddingX: "30px",
        borderTop: "1px solid #F5F4F6",
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
          attachment={attachment}
          labels={attachmentLables}
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
          <Replyquote replyQuote={replyQuote} onCancel={setReplyQuote} />
          <TextBox
            editorRef={editorRef}
            setEditorContent={setEditorContent}
            selectedColor={selectedColor}
            formatting={formatting}
            setSelectedColor={setSelectedColor}
            emoji={emoji}
            voice={voice}
            showBold={showBold}
            showItalic={showItalic}
            showUnderline={showUnderline}
            showLink={showLink}
            showCode={showCode}
            showColor={showColor}
          />

          <ImageView
            selectedFile={selectedFile}
            onRemove={() => setSelectedFile(null)}
            imageView={imageView}
          />
        </Box>

        <SendButton onClick={inputSubmit} />
      </Box>
    </Box>
  );
};

export default InputFeatures;
