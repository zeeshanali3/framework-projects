"use client";
import { useTruncate } from "../utils/hooks/hooks.js";
import { useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getColor, getInitial } from "../utils/fallBackAvatar";
import { useTheme } from "@mui/material/styles";
// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const ChatCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#1A3636" : "#1A2A2A",
  borderBottom: `1px solid ${
    theme.palette.mode === "light" ? "white" : theme.palette.grey[600]
  }`,
  marginTop: theme.spacing(0.5),
  padding: "10px",
  display: "flex",
  flexDirection: "row",
  minWidth: "300px",
  width: "100%",
  borderRadius: "6px",
  height: "60px",
  cursor: "pointer",
  transition: "background-color 300ms",
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#254545" : "#2A3A3A",
  },
}));
const UserInfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "4px",
  marginLeft: theme.spacing(0.5),
  padding: theme.spacing(0.5),
}));

const ChatCard = ({ user, AllData }) => {
  const theme = useTheme();
  // All hooks must be called unconditionally first
  const [message, truncateMessage] = useTruncate(17, "chars");
  const [userName, truncateUserName] = useTruncate(15, "chars");

  // Handle user status in useEffect (not during render)
  const showUserStatus = user?.status === "offline";

  // Truncate message only if content exists
  useEffect(() => {
    const content = "Hello buddy how are you" || null;
    if (content) {
      truncateMessage(content);
    }
    const name = user?.name;
    if (name) {
      truncateUserName(name);
    }
  }, [user?.name]);

  if (!user) return null;

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Last seen unknown";
    return `Last seen ${dayjs(timestamp).fromNow()}`;
  };

  return (
    <ChatCardContainer>
      {user.profilePic ? (
        <Avatar
          src={user.profilePic}
          alt="user profile"
          sx={{
            width: 40,
            height: 40,
            border: "2px solid",
            borderColor: theme.palette.mode === "light" ? "#40534C" : "#304540",
            transition: "border-color 300ms",
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: getColor(user?.name),
            border: "2px solid",
            borderColor: theme.palette.mode === "light" ? "#40534C" : "#304540",
            transition: "border-color 300ms",
            fontWeight: "bold",
            fontSize: "1.125rem",
          }}
          title={user?.name}
        >
          {getInitial(user?.name)}
        </Avatar>
      )}
      <Box
        sx={{
          display: "flex",
          color:
            theme.palette.mode === "light" ? "white" : theme.palette.grey[200],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <UserInfoGrid>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              fontSize: ".77rem",
              color:
                theme.palette.mode === "light"
                  ? "white"
                  : theme.palette.grey[200],
              transition: "color 300ms",
            }}
          >
            {userName || user.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
              color:
                theme.palette.mode === "light"
                  ? "white"
                  : theme.palette.grey[200],
              transition: "color 300ms",
            }}
          >
            {user.status}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              whiteSpace: "nowrap",
              textAlign: "left",
              color:
                theme.palette.mode === "light"
                  ? theme.palette.grey[400]
                  : theme.palette.grey[500],
              transition: "color 300ms",
            }}
          >
            {message}
          </Typography>
          {showUserStatus && (
            <Typography
              variant="caption"
              sx={{
                textAlign: "right",
                // mr: "-10px",
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.grey[400]
                    : theme.palette.grey[500],
                transition: "color 300ms",
              }}
            >
              {user.lastSeen ? formatLastSeen(user.lastSeen) : "Offline"}
            </Typography>
          )}
        </UserInfoGrid>
      </Box>
    </ChatCardContainer>
  );
};

export default ChatCard;
