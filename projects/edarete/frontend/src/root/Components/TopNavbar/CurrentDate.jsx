import React, { useState, useEffect } from 'react';
import styles from "./CurrentDate.module.css";
import { Box } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function CurrentDate({ isDarkMode, theme }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const date = new Date();
    setCurrentDate(formatter.format(date));
  }, []);

  return (
    <>
      <Box 
        className={styles.currentDate}
        sx={{
          display: {xs:"none", sm:'flex'},
          alignItems: 'center',
          padding: '6px 10px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
          color: isDarkMode ? theme?.palette.text.secondary : '#333333',
          border: '1px solid',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        }}
      >
        <CalendarTodayIcon 
          sx={{ 
            fontSize: '18px', 
            marginRight: '5px',
            color: isDarkMode ? theme?.palette.primary.light : theme?.palette.primary.main
          }} 
        />
        {currentDate}
      </Box>
    </>
  );
}

export default CurrentDate;
