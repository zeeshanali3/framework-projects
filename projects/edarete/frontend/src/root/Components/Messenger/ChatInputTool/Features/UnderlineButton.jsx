import React from 'react';
import { IconButton } from '@mui/material';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

function UnderlineButton({ onClick }) {
  return (
    <IconButton onClick={onClick} size="small">
      <FormatUnderlinedIcon />
    </IconButton>
  );
}

export default UnderlineButton;
