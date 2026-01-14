import React from 'react';
import { IconButton } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

function CodeButton({ onClick }) {
  return (
    <IconButton onClick={onClick} size="small">
      <CodeIcon />
    </IconButton>
  );
}

export default CodeButton;
