"use client";
import {
  Box,
  IconButton,
  Badge,
  useTheme,
  styled,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  CameraAlt as CameraIcon,
  Chat as ChatIcon,
  PersonAdd as PersonAddIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  FiberManualRecord as StatusIcon,
} from "@mui/icons-material";

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: theme.palette.mode === "light" ? "#1A3636" : "#1A2A2A",
  width: "100%",
  height: "50px",
  borderRadius: "0.3rem 0.3rem 0 0",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: theme.spacing(0.5),
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#F93827",
    color: "white",
    fontSize: "0.6rem",
    height: "14px",
    minWidth: "14px",
    padding: "0 2px",
  },
}));

const DotBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#F93827",
    height: "8px",
    minWidth: "8px",
    padding: 0,
  },
}));

const ContactHeader = ({ status }) => {
  const theme = useTheme();

  return (
    <StyledHeader>
      {/* Profile image */}
      {/* <Avatar
        src="/images/profile.jpg"
        alt="Profile Picture"
        sx={{
          width: 40,
          height: 40,
          border: "2px solid",
          borderColor: "#40534C",
        }}
      /> */}
      {/* Icons with badges */}
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.mode === "light" ? "#fff" : "#fff",
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        Status
      </Typography>
      <IconButton sx={{ color: status ? "#559115" : "#F93827" }}>
        <StatusIcon fontSize="medium" />
      </IconButton>
      <NotificationBadge badgeContent="25+" overlap="circular">
        <IconButton sx={{ color: "white" }}>
          <ChatIcon fontSize="medium" />
        </IconButton>
      </NotificationBadge>
      {/* <IconButton sx={{ color: "white" }}>
        <SearchIcon fontSize="small" />
      </IconButton> */}
      <IconButton sx={{ color: "white" }}>
        <CameraIcon fontSize="medium" />
      </IconButton>
      <NotificationBadge badgeContent="25+" overlap="circular">
        <IconButton sx={{ color: "white" }}>
          <PersonAddIcon fontSize="medium" />
        </IconButton>
      </NotificationBadge>
      <DotBadge variant="dot" overlap="circular">
        <IconButton sx={{ color: "white" }}>
          <NotificationsIcon fontSize="medium" />
        </IconButton>
      </DotBadge>
      <DotBadge variant="dot" overlap="circular">
        <IconButton sx={{ color: "white" }}>
          <MoreVertIcon fontSize="medium" />
        </IconButton>
      </DotBadge>
    </StyledHeader>
  );
};

export default ContactHeader;
