import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./Terminals.module.css";

const Terminals = ({data}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px",
          mb: "15px",
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
          color: isDarkMode ? theme.palette.text.primary : 'inherit',
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#EEF0F7'}`,
            paddingBottom: "10px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark
            }}
          >
            User Distribution
          </Typography>
        </Box>

        <div className={styles.terminalsBox}>
          <div className={styles.monthlyEarning}>
            <h3>{data[0]?.count}</h3>
            <p>{data[0]?.label}</p>
          </div>
          
          <div className={styles.usersEarning}>
            <h3>{data[1]?.count}</h3>
            <p>{data[1]?.label}</p>
          </div>

          <div className={styles.inactiveEarning}>
            <h3>{data[2]?.count}</h3>
            <p>{data[2]?.label}</p>
          </div>

          <ul>
            <li>{data[0]?.label}</li>
            <li>{data[1]?.label}</li>
            <li>{data[2]?.label}</li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default Terminals;
