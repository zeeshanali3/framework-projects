import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Replyquote = ({ replyQuote, onCancel }) => {
  if (!replyQuote) return null;

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '8px 12px',
        borderLeft: '4px solid #1976d2',
        marginBottom: 1,
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ maxWidth: '90%' }}>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          Replying to: {replyQuote}
        </Typography>
      </Box>
      <IconButton size="small" onClick={onCancel}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Replyquote;

