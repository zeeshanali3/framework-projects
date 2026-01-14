import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Tooltip,
  MenuItem,
  IconButton,
  Avatar,
  ListItemIcon,
  Menu,
  Box,
  Divider,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { updateCurrentRole } from "../../Common/Store/Actions/General/UpdateActions/updateCurrentRole";
import { logoutUser } from "../../Common/Store/Actions/General/UpdateActions/updateLoginState";

const Profile = ({ isDarkMode, theme }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const mainData = useSelector((state) => state.main);
  const { userSelectedRole, currentUser, currentUserDesignationsRoles } =
    mainData;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleChange = (role) => {
    dispatch(updateCurrentRole(role));
    navigate("/dashboard");
  };
  const handleConfirmLogout = () => {
    dispatch(logoutUser()); // Update Redux state
    localStorage.removeItem('persist:root');
    setOpenModal(false); // Close the modal
    navigate("/login"); // Navigate to login page
  };

  // Function to handle canceling the logout
  const handleCancelLogout = () => {
    setOpenModal(false); // Close the modal without logging out
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ 
            p: 0,
            border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.2)' : 'none'
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="ml-2"
        >
          <Avatar
            src={currentUser?.user_image || "/images/user1.png"}
            alt={currentUser?.first_name + " " + currentUser?.last_name || "User"}
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "10px",
            boxShadow: isDarkMode 
              ? "0px 10px 35px rgba(0, 0, 0, 0.25)" 
              : "0px 10px 35px rgba(50, 110, 189, 0.2)",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            backgroundColor: isDarkMode ? theme?.palette.background.paper : '#fff',
            color: isDarkMode ? theme?.palette.text.primary : 'inherit',
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: isDarkMode ? theme?.palette.background.paper : "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="for-dark-top-navList"
      >
        <MenuItem sx={{ backgroundColor: isDarkMode ? 'transparent' : 'inherit' }}>
          <Avatar src={currentUser?.user_image || "/images/user1.png"} />
          <Box>
            <Typography sx={{ 
              fontSize: "11px", 
              color: isDarkMode ? theme?.palette.primary.light : "#757FEF" 
            }}>
              {userSelectedRole?.role_name}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: isDarkMode ? theme?.palette.text.primary : "#260944",
                fontWeight: "500",
              }}
            >
              {currentUser?.first_name ||
                (currentUser?.last_name &&
                  currentUser?.first_name + " " + currentUser?.last_name) ||
                "User"}
            </Typography>
          </Box>
        </MenuItem>

        <Divider sx={{ 
          borderColor: isDarkMode ? theme?.palette.divider : 'rgba(0, 0, 0, 0.12)'
        }} />

        {/* Role Selection Section */}
        {/* <MenuItem>
          <Typography sx={{ fontSize: "13px", fontWeight: "500", color: "#260944" }}>
            Current Role: {selectedRole}
          </Typography>
        </MenuItem> */}

        {/* <MenuItem>
          <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
            Select Role
          </Typography>
        </MenuItem> */}

        {currentUserDesignationsRoles?.length > 0 && (
          <>
            {currentUserDesignationsRoles.map((role, idx) => (
              <MenuItem
                key={role.role_id ?? role.designation_id ?? role.role_name ?? idx}
                onClick={() => handleRoleChange(role)}
                sx={{ 
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <Typography sx={{ 
                  fontSize: "13px", 
                  color: isDarkMode ? theme?.palette.text.primary : "#260944" 
                }}>
                  {role?.designation_name || role?.role_name || 'Role Missing!'}
                </Typography>
              </MenuItem>
            ))}
            <Divider sx={{ 
              borderColor: isDarkMode ? theme?.palette.divider : 'rgba(0, 0, 0, 0.12)'
            }} />
          </>
        )}

        <MenuItem 
          onClick={() => setOpenModal(true)}
          sx={{ 
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ListItemIcon sx={{ 
            mr: "-8px", 
            mt: "-3px",
            color: isDarkMode ? theme?.palette.error.main : 'inherit'
          }}>
            <Logout fontSize="small" />
          </ListItemIcon>

          <Typography
            variant="body2"
            sx={{ 
              fontSize: "13px", 
              color: isDarkMode ? theme?.palette.error.main : 'inherit',
              cursor: "pointer" 
            }}
          >
            Logout
          </Typography>
        </MenuItem>

        {/* <Divider />

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/pages/profile/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Profile
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <MailOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/email/inbox/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Inbox
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/apps/chat/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Chat
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link
            href="/settings/account/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Settings
          </Link>
        </MenuItem>

        <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          <Link
            href="/pages/pricing/"
            fontSize="13px"
            color="inherit"
            underline="none"
          >
            Pricing
          </Link>
        </MenuItem>

        <Divider />
 */}
      </Menu>
      {/* Confirmation Dialog */}
      <Dialog 
        open={openModal} 
        onClose={handleCancelLogout}
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? theme?.palette.background.paper : '#fff',
            color: isDarkMode ? theme?.palette.text.primary : 'inherit',
            borderRadius: '10px'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: isDarkMode ? theme?.palette.text.primary : 'inherit',
            fontSize: '18px'
          }}
        >
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography 
            sx={{ 
              color: isDarkMode ? theme?.palette.text.secondary : 'inherit',
              fontSize: '14px'
            }}
          >
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCancelLogout}
            sx={{ 
              color: isDarkMode ? theme?.palette.text.secondary : 'inherit'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLogout} 
            color="error" 
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
