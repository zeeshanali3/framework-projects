import React from 'react';
import { IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

function Link({ onClick }) {
  return (
    <IconButton onClick={onClick} size="small">
      <LinkIcon />
    </IconButton>
  );
}

export default Link;
