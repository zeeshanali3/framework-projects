// ItalicButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

const ItalicButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size="small">
      <FormatItalicIcon />
    </IconButton>
  );
};

export default ItalicButton;
