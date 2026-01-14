import React from "react";
import ChatCard from "../ChatCard";
import ContactHeader from "../ContactHeader";
import { Box, CircularProgress } from "@mui/material";

const ContactsWindow = ({
  users = [],
  loading = false,
  onUserClick,
  userStatus = false,
}) => {
  return (
    <Box
      sx={{
        minWidth: { xs: "370px", md: "320px" },
        // overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "83vh",
        maxHeight: "83vh",
        // overflowY: "auto",
      }}
    >
      <ContactHeader status={userStatus} />
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
            <Box onClick={() => onUserClick(user)}>
              <ChatCard key={user.id} user={user} AllData={users} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
export default ContactsWindow;
