// components/common/ConfirmationModal.jsx
import * as React from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Modal, 
  Stack, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Grid,
  Chip,
  Paper,
  Badge
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  maxWidth: 1200,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  p: 0,
  maxHeight: '90vh',
  overflow: 'hidden',
};

export default function UserDetailModal({
  open,
  onCancel,
  onStart,
  onEnd,
  userDetails,
  joinedQuizUsers,
  presentQuizUsers,
  blockedQuizUsers,
  quizStatus,
  completedQuizUsers
}) {

  
  const handleStart = () => {
    onStart();
  };

  const handleEnd = () => {
    onEnd();
  };

  const renderUserList = (users, title, color, icon) => (
    <Paper 
      elevation={0}
      sx={{ 
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box 
        sx={{ 
          bgcolor: `${color}.50`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {icon}
        <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
          {title}
        </Typography>
        <Chip 
          label={users ? users.length : 0} 
          size="small" 
          sx={{ 
            bgcolor: 'white',
            fontWeight: 600,
            minWidth: 32,
          }}
        />
      </Box>
      
      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: 400 }}>
        {users && Array.isArray(users) && users.length > 0 ? (
          <List sx={{ p: 0 }}>
            {users.map((participant, index) => (
              <React.Fragment key={participant.socket_id || index}>
                <ListItem 
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Box sx={{ mr: 1.5 }}>
                    <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </Box>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {participant.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                        <Chip 
                          label={participant.role} 
                          size="small" 
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {participant?.email || 'N/A'}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < users.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 120,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">
              No {title.toLowerCase()}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );

  const totalStudents = (userDetails?.length || 0) + (presentQuizUsers?.length || 0) + 
                        (joinedQuizUsers?.length || 0) + (completedQuizUsers?.length || 0);

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-description"
    >
      <Box sx={style}>
        {/* Header */}
        <Box 
          sx={{ 
            p: 3,
            pb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Room Participants
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip 
                  icon={<GroupIcon sx={{ color: 'white !important' }} />}
                  label={`Total: ${totalStudents}`}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
                {quizStatus && (
                  <Chip 
                    icon={<CheckCircleIcon sx={{ color: 'white !important' }} />}
                    label="Quiz Active"
                    sx={{ 
                      bgcolor: 'rgba(76, 175, 80, 0.9)',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                )}
              </Stack>
            </Box>
            
            <Stack direction="row" spacing={2}>
              {!quizStatus ? (
                <Button 
                  variant="contained" 
                  onClick={handleStart}
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: '#667eea',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                >
                  Start Quiz
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  onClick={handleEnd}
                  size="large"
                  sx={{
                    bgcolor: '#f44336',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      bgcolor: '#d32f2f',
                    },
                  }}
                >
                  End Quiz
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, overflowY: 'auto', maxHeight: 'calc(90vh - 180px)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              {renderUserList(
                userDetails, 
                "Absent", 
                'grey',
                <PendingIcon sx={{ color: 'grey.600' }} />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {renderUserList(
                presentQuizUsers, 
                "Present",
                'blue',
                <PersonIcon sx={{ color: 'primary.main' }} />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {renderUserList(
                joinedQuizUsers, 
                "Joined",
                'orange',
                <GroupIcon sx={{ color: 'warning.main' }} />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {renderUserList(
                completedQuizUsers, 
                "Completed",
                'green',
                <CheckCircleIcon sx={{ color: 'success.main' }} />
              )}
            </Grid>
             <Grid item xs={12} sm={6} md={3}>
              {renderUserList(
                blockedQuizUsers, 
                "Blocked",
                'red',
                 <PersonIcon sx={{ color: 'error.main' }} />
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box 
          sx={{ 
            p: 2,
            px: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              onClick={onCancel}
              sx={{ 
                px: 3,
                fontWeight: 500,
              }}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
