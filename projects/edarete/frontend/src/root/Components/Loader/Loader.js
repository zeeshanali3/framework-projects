
// src/Loader.js
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ open }) => {
  if (!open) return null;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      position="fixed"
      width="100%"
      top="0"
      left="0"
      bgcolor="rgba(255, 255, 255, 0.8)" // Optional: adds a semi-transparent background
      zIndex="1000" // Adjust as needed
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
