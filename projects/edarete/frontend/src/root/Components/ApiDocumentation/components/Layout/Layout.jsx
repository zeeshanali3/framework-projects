import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Box component="main">
        <Box 
          sx={{
            display: 'flex',
            // minHeight: '100vh',
            // paddingTop: '86px',
            marginX: 'auto',
            // paddingX: '20px', // equivalent to px-5 (1.25rem ≈ 20px)
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <Box sx={{ marginX: 'auto', width: '100%' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}