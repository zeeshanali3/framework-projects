import React from 'react';
import { Box, Grid } from '@mui/material';

const ChatMode = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: '20px',
                        borderRadius: '8px',
                        minHeight: '78vh',
                        maxHeight: '78vh',
                        overflowY: 'auto'
                    }}
                >
                    Contacts
                </Box>
            </Grid>
            <Grid item xs={12} md={9}>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: '20px',
                        borderRadius: '8px',
                        minHeight: '78vh',
                        maxHeight: '78vh',
                        overflowY: 'auto'
                    }}
                >
                    Messages
                </Box>
            </Grid>
        </Grid>
    );
};

export default ChatMode;
