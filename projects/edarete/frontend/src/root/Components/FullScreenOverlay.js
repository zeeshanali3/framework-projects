import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const FullScreenOverlay = ({ isLoading, progress }) => {
    console.log("isLoading",isLoading)
  return (
    <Dialog
      open={isLoading}
      PaperProps={{
        style: {
          backgroundColor: 'transparent', // Same background color as before
          boxShadow: 'none', // Remove default shadow
          padding: '20px',
        },
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: 'transparent',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: '100%',
            height: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#76c7c0',
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          {progress}%
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenOverlay;
