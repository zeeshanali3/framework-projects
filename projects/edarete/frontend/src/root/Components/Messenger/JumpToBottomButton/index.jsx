import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

const JumpToBottomButton = ({ onClick, visible, Bref }) => {
  const calculateRightPosition = () => {
    if (!Bref) return "25%";
    return Bref?.scrollWidth > 100 ? Bref?.scrollWidth * 0.5 : "25%";
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: "350px", md: calculateRightPosition() },
        bottom: "18%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.3s ease",
        zIndex: 1000,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Tooltip title="Jump to latest messages" placement="left">
        <IconButton
          onClick={onClick}
          sx={{
            backgroundColor: "#4C49ED",
            color: "white",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#3a38bc",
            },
          }}
        >
          <ArrowDownward />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default JumpToBottomButton;
