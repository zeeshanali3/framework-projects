import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MoreHoriz } from "@mui/icons-material";
import { Tooltip, useTheme } from "@mui/material";
import DefaultIcon from "@mui/icons-material/Help"; // Default fallback icon
import { getIconComponent } from "../constants/iconsMap";
import ConfirmationModal from "./ConfirmationModal/index";
import UserDetailModal from "./ConfirmationModal/userDetailModal";
import { useSocket } from "../../Socket/index";
import { showSuccessToast ,showErrorToast} from "../../../Common/ToastUtils";
import { constants } from "../../../Common/Constants";
import ImportList from "../ImportList/index";
import { set } from "lodash";

// Default color mapping

export default function ActionButtons({
  color,
  actions,
  displayMode,
  onAction,
  isDarkMode,
  rowData,
  importParameters = [], // Add import parameters prop
}) {
  const [showActions, setShowActions] = useState(false);
  const [iconComponents, setIconComponents] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [pendingImportAction, setPendingImportAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const containerRef = useRef(null);
   const { currentUser, userSelectedRole } = useSelector((state) => state.main);
  const theme = useTheme();
    const participant = {
            name: currentUser?.first_name + " " + currentUser?.last_name  || 'Unknown User',
            urdd: userSelectedRole?.user_role_designation_department_id,
            role:userSelectedRole?.role_name
          };
 
 const all_state = useSelector((state) => state.main);
 const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
 const accessToken = all_state?.accesstoken || null;
 const { connect, disconnect, isConnected, emit, on } = useSocket( constants.socket_url,accessToken, participant); // Assume 'on' is returned for listening
 const [userDetails, setTotalUserDetails] = useState(null); // State to store user details from socket response
 const [joinedQuizUsers, setJoinedQuizUsers] = useState(null); // Track if the user has joined the quiz
 const [presentQuizUsers, setPresentQuizUsers] = useState(null); // Track if the user is present in the quiz
 const [quizStatus, setQuizStatus] = useState(null);

  // Get current user from Redux


  const handleToggleActions = () => {
    setShowActions((prev) => !prev);
  };
const colorMapping = {
  Edit: "#4A90E2", // blue
  Delete: "#d81717", // red
  View: isDarkMode ? "#fff" : "grey",
  start: "#28a745", // green for start action
  Import: "#FF9800", // orange for import action
};

  const handleAction = (action, data, index) => {
    if (action.name === "Delete") {
      setPendingAction({ action, data, index });
      setConfirmOpen(true);
    } else if (action.name === "Import" || action.type === "import") {
      console.log("=== IMPORT ACTION DEBUG ===");
      console.log("1. Full action object:", action);
      console.log("2. action.serverCommunication:", action.serverCommunication);
      console.log("3. action.importConfig:", action.importConfig);
      console.log("4. rowData:", rowData);
      console.log("5. importParameters:", importParameters);
      console.log("===========================");
      
      // Validate configuration exists
      const serverComm = action.serverCommunication || action.importConfig?.serverCommunication;
      
      if (!serverComm) {
        console.error("No valid server communication found for import action");
        showErrorToast("Import configuration is missing. Please configure the import action properly.");
        return;
      }
      
      if (!serverComm.apiUrl) {
        console.error("No API URL found in server communication");
        showErrorToast("Import API URL is not configured.");
        return;
      }
      
      console.log("Opening import modal with valid config:", serverComm);
      setPendingImportAction({ action, data, index });
      setIsImportModalOpen(true);
    } else if (action.name === "start") {
      // Handle socket connection
      console.log('Initiating start action with data:', { action, data, index, isConnected ,});
      handleStartAction(action, data, index, rowData);
    } else {
      onAction?.(action, data, index);
    }
  };

  const handleStartAction = (action, data, index, fullRowData) => {
    console.log('Starting handleStartAction with:', { action, data, isConnected, fullRowData });
 const quizId = rowData?.id || rowData?.quizId || rowData?._id;
    if (isConnected) {
      console.log('Socket already connected, disconnecting to reconnect with quizId');
      disconnect();
    }

    console.log('Connecting socket with quizId:', quizId,rowData);
      let path = '/quiz-socket';
      if(rowData.classcomponent_componentName?.toLowerCase().includes('quiz')){
        path = '/quiz-socket';
      } else if(rowData.classcomponent_componentName?.toLowerCase().includes('lab')){
        path = '/lab-socket';
      }
    const socket = connect(quizId ,path);
    console.log('Socket instance after connect():', socket);

    if (!socket) {
      console.error('Failed to get socket instance from connect()');
      showErrorToast('Failed to connect to the server. Please try again later.');
      return;
    }

    // Check if socket is already connected
    console.log('Socket connected status after connect():', socket.connected);

    // Emit immediately if already connected
    if (socket.connected) {
      console.log('Socket was already connected, opening modal');
      setIsUserDetailModalOpen(true); // Open modal without emitting yet
      emit('join-quiz-host', { quizId });
      showSuccessToast('Connected to server!');
      console.log('Modal opened after connection');
      return;
    }

    // Set up connection handler
    socket.on('connect', () => {
      console.log('Socket connected successfully! ID:', socket.id);
      console.log('Socket connected status:', socket.connected);

      setIsUserDetailModalOpen(true); // Open modal without emitting yet
      emit('join-quiz-host', { quizId });
      showSuccessToast('Connected to server!');
      console.log('Modal opened after connection');
    });

    // Handle connection errors
    socket.on('connect_error', (error) => { 
      console.error('Socket connection error:', error);
      showErrorToast('Socket connection error. Please try again later.');

    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      showErrorToast('Socket error occurred. Please try again later.');
    });
  };

  const handleConfirm = () => {
    if (pendingAction && onAction) {
      onAction(pendingAction.action, pendingAction.data, pendingAction.index);
    }
    setConfirmOpen(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setPendingAction(null);
  };
  // Close action buttons when clicking outside the container
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowActions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch the icons when the component is mounted
  useEffect(() => {
    const fetchIcons = async () => {
      const icons = {};

      if (actions.length > 0) {
        for (const action of actions) {
          const iconComponent = getIconComponent(action.name);
          icons[action.name] = iconComponent;
        }
        setIconComponents(icons);
      }
    };
    fetchIcons();
  }, [actions]);

  useEffect(() => {
    if (on) {
      on('room-participants', (data) => {
        console.log('Received room participants:', data);
        setTotalUserDetails(data?.absentParticipants); // Or use a separate state if needed
        setJoinedQuizUsers(data?.joinedParticipants)
        setPresentQuizUsers(data?.absentStagingParticipants)
        setQuizStatus(data?.subComponentStatus);
      });
    }
  }, [on]);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMenuItemClick = (action, index) => {
    handleAction(action, index);
    handleMenuClose();
  };
  
  return (
    <div ref={containerRef}>
      <Grid container justifyContent="center" alignItems="center">
        {displayMode === 'table' ? (
          <Grid
            container
            item
            xs={12}
            spacing={0}
            justifyContent="center"
            flexWrap="wrap"
          >
            {/* Show first 3 actions directly */}
            {actions.slice(0, 3).map((action, index) => {
              const IconComponent = iconComponents[action?.name] || DefaultIcon;
              const iconColor =
                colorMapping[action?.name] || action?.color || 'grey';
              return (
                <Grid item key={index}>
                  <IconButton onClick={() => handleAction(action, index)}>
                    <IconComponent style={{ color: iconColor }} />
                  </IconButton>
                </Grid>
              );
            })}

            {/* Show menu button if more than 3 actions */}
            {actions.length > 3 && (
              <Grid item>
                <IconButton onClick={handleMenuOpen}>
                  <MoreHoriz style={{ color: isDarkMode ? '#fff' : 'grey' }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {actions.slice(3).map((action, idx) => {
                    const IconComponent =
                      iconComponents[action?.name] || DefaultIcon;
                    const iconColor =
                      colorMapping[action?.name] || action?.color || 'grey';
                    const actualIndex = idx + 3; // Adjust index for sliced array
                    return (
                      <MenuItem
                        key={actualIndex}
                        onClick={() => handleMenuItemClick(action, actualIndex)}
                      >
                        <ListItemIcon>
                          <IconComponent
                            style={{ color: iconColor, fontSize: 20 }}
                          />
                        </ListItemIcon>
                        <ListItemText>{action?.name}</ListItemText>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Grid>
            )}
          </Grid>
        ) : !showActions ? (
          <Grow in={!showActions} timeout={500}>
            <IconButton aria-label="more" onClick={handleToggleActions}>
              <MoreHoriz
                sx={{
                  color: color,
                  '&:hover': {
                    bgcolor: isDarkMode ? '#4F4F5C' : '#DCDCDC',
                    borderRadius: '100%',
                  },
                }}
              />
            </IconButton>
          </Grow>
        ) : (
          <Grid
            container
            item
            xs={12}
            spacing={0}
            justifyContent="center"
            flexWrap="wrap"
          >
            {actions.map((action, index) => {
              const IconComponent = iconComponents[action?.name] || DefaultIcon;
              console.log(
                `Expanded view - Rendering ${action.name} with icon:`,
                IconComponent !== DefaultIcon ? 'Custom' : 'Default',
              );
              return (
                <Grid item key={index}>
                  <Grow
                    in={showActions}
                    timeout={1000}
                    style={{ transformOrigin: 'center center' }}
                  >
                    <Tooltip title={action?.name} placement="top">
                      <IconButton
                        aria-label={action?.name}
                        size="small"
                        onClick={() => handleAction(action, index)}
                        sx={{
                          background: '#ffffff',
                          ml: '2px',
                          mr: '2px',
                        }}
                      >
                        <IconComponent
                          style={{
                            color:
                              action?.color ||
                              colorMapping[action?.name] ||
                              'black',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Grow>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>

      <ConfirmationModal
        open={confirmOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this item?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <UserDetailModal
        open={isUserDetailModalOpen}
        onConfirm={() => {
          setIsUserDetailModalOpen(false);
          showSuccessToast('Quiz started successfully!');
        }}
        onCancel={() => {
          disconnect();
          setIsUserDetailModalOpen(false);
        }}
        onStart={() => {
          // Emit start-quiz on button click
          if (!isConnected) {
            console.log(
              'Socket already connected, disconnecting to reconnect with quizId',
            );
            connect(rowData?.id || rowData?.quizId || rowData?._id);
          }
          const participant = {
            name:
              currentUser?.first_name + ' ' + currentUser?.last_name ||
              'Unknown User',
            urdd: userSelectedRole?.user_role_designation_department_id,
            role: userSelectedRole?.role_name,
          };
          const rowDataToUse = rowData;
          const quizId =
            rowDataToUse?.id || rowDataToUse?.quizId || rowDataToUse?._id;
          if (isConnected) {
            emit('start-subComponent', { quizId, participant });
            // setQuizStatus(true);
          }
          console.log('Emitted start-subComponent on button click:', {
            quizId,
            participant,
          });
        }}
        onEnd={() => {
          // Emit start-quiz on button click
          const participant = {
            name:
              currentUser?.first_name + ' ' + currentUser?.last_name ||
              'Unknown User',
            urdd: userSelectedRole?.user_role_designation_department_id,
            role: userSelectedRole?.role_name,
          };
          const rowDataToUse = rowData;
          const quizId =
            rowDataToUse?.id || rowDataToUse?.quizId || rowDataToUse?._id;
          emit('end-subComponent', { quizId, participant });
          setQuizStatus(false);
          console.log('Emitted end-subComponent on button click:', {
            quizId,
            participant,
          });
        }}
        userDetails={userDetails}
        quizStatus={quizStatus}
        joinedQuizUsers={joinedQuizUsers}
        presentQuizUsers={presentQuizUsers}
      />

      {/* Import Modal - only render when valid config exists */}
      {isImportModalOpen && pendingImportAction && (
        <ImportList
          open={isImportModalOpen}
          onClose={() => {
            setIsImportModalOpen(false);
            setPendingImportAction(null);
          }}
          parameters={importParameters}
          params={`?id=${rowData?.id || ''}`}
          addSagaCommunication={
            pendingImportAction.action?.serverCommunication ||
            pendingImportAction.action?.importConfig?.serverCommunication ||
            null
          }
          rowData={rowData}
          onSuccess={message => {
            showSuccessToast(message);
            setIsImportModalOpen(false);
            setPendingImportAction(null);
            if (pendingImportAction?.action?.onSuccess) {
              pendingImportAction.action.onSuccess();
            }
          }}
          onFailure={error => {
            showErrorToast(error.message || 'Import failed');
          }}
        />
      )}
    </div>
  ); 
}