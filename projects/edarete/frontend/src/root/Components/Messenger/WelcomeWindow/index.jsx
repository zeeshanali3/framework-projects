import React from "react";
import { Box, Typography } from "@mui/material";

const WelcomeWindow = () => {
  return (
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
          alignItems: "center",
          justifyContent: "center",
          paddingY: "50px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#260143",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Welcome to UBS Messenger
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: "#260143",
            marginBottom: "10px",
            textAlign: "center",
            paddingX: "30px",
          }}
        >
          You can start chatting with your friends and family right now. You can
          also start a new chat with anyone you want. There is also a chatbot
          that can help you with your daily tasks. It can also help you with
          your work.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeWindow;
