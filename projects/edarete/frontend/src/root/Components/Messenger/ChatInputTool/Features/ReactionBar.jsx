import React from 'react';
import { Box } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

const ReactionBar = ({ contentId, message, onReply }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: -30,
        right: 20,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '2px 8px',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >


      {/* Reply Icon */}
      <ReplyIcon
        sx={{ fontSize: 18, color: '#6e747aff' }}
        onClick={() => onReply({ id: contentId, message })}
      />
    </Box>
  );
};

export default ReactionBar;
