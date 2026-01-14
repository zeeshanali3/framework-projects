// import React from 'react';
// import { IconButton } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// function SendButton({ onClick, disabled = false }) {
//   return (
//     <IconButton
//       sx={{
//         backgroundColor: '#4C49ED',
//         color: '#FFFFFF',
//         borderRadius: '50%',
//         height: 40,
//         width: 40,
//         '&:hover': {
//           backgroundColor: 'rgba(89, 98, 189, 1)',
//         },
//       }}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       <SendIcon />
//     </IconButton>
//   );
// }

// export default SendButton;
import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";
import Check from "@mui/icons-material/Check";

const SendButton = React.memo(
  ({
    onClick,
    disabled = false,
    editingMsgId,
    setEditingMsgId,
    setInputResponse,
    editorRef,
    setHasText,
  }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              editorRef.current.innerHTML = "";
              setHasText(false);
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
            height: 40,
            width: 40,
            mr: { xs: -4, sm: 0 },
            "&:hover": {
              backgroundColor: "rgba(89, 98, 189, 1)",
            },
          }}
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onClick(); // Call without event parameter
          }}
          disabled={disabled}
        >
          {editingMsgId ? <Check /> : <SendIcon />}
        </IconButton>
      </Box>
    );
  }
);

export default SendButton;
