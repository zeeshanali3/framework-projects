import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Navbar() {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
      
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '96rem', // Equivalent to Tailwind's max-w-6xl
          margin: '0 auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            py: 2,
            px: 2,
            fontWeight: 600,
            color: '#3b82f6', // Tailwind blue-500
          }}
        >
          API DOCUMENTATION
        </Typography>
      </Box>
    </Box>
  );
}
