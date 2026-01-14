import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Badge,
  useTheme,
  styled,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import { getColor, getInitial } from "../utils/fallBackAvatar";
import { useTruncate } from "../utils/hooks/hooks.js";
import { useEffect } from "react";
const StyledHeader = styled(Box)(({ theme }) => ({
  backgroundColor: "#075e54",
  color: "white",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "background-color 300ms",
  position: "sticky",
  width: "100%",
  height: "50px",
  top: 0,
  zIndex: 20,
  borderRadius: "8px 8px 0 0",
  boxShadow: theme.shadows[3],
}));

const StatusBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: (props) => (props.online ? "#4CAF50" : "#9E9E9E"),
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: `2px solid ${theme.palette.background.paper}`,
    bottom: 2,
    right: 2,
  },
}));

const ChatHeader = ({ receiver, isTyping, handleGoBack }) => {
  const [userName, truncateUserName] = useTruncate(40, "chars");
  const theme = useTheme();
  useEffect(() => {
    truncateUserName(receiver?.name);
  }, [receiver?.name]);

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return "Last seen unknown";
    return `Last seen ${dayjs(timestamp).fromNow()}`;
  };

  return (
    <StyledHeader>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={handleGoBack}
          sx={{
            mr: 1,
            color: "white",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? "#046952" : "#034d40",
            },
          }}
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StatusBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            online={receiver?.status === "online"}
          >
            {receiver?.profilePic ? (
              <Avatar
                src={receiver.profilePic}
                alt="Profile"
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid",
                  borderColor:
                    theme.palette.mode === "light"
                      ? "white"
                      : theme.palette.grey[700],
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: getColor(receiver?.name),
                  border: "2px solid",
                  borderColor:
                    theme.palette.mode === "light"
                      ? "white"
                      : theme.palette.grey[700],
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                }}
                title={receiver?.name}
              >
                {getInitial(receiver?.name) || "U"}
              </Avatar>
            )}
          </StatusBadge>

          <Box sx={{ ml: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {userName || "User"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.mode === "light" ? "#a7ffeb" : "#b2dfdb",
                display: "block",
              }}
            >
              {receiver?.status === "online"
                ? "Online"
                : formatLastSeen(receiver?.lastSeen)}
            </Typography>
            {/* {isTyping && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: theme.palette.mode === 'light' ? '#a7ffeb' : '#b2dfdb',
                  fontStyle: 'italic',
                  display: 'block'
                }}
              >
                typing...
              </Typography>
            )} */}
          </Box>
        </Box>
      </Box>
    </StyledHeader>
  );
};

export default ChatHeader;
