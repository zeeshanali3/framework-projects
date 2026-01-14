import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";
import styles from "./SessionsDevice.module.css";

const SessionsDevice = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const chartOptions = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        track: {
          background: isDarkMode ? theme.palette.divider : "#EAECFD",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 4,
            color: data.color,
            fontSize: "16px",
            fontWeight: "500",
          },
        },
      },
    },
    fill: {
      colors: data.color,
    },
    theme: {
      mode: isDarkMode ? 'dark' : 'light',
    }
  };

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
            mb: "15px",
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
            {data.label}
          </Typography>
        </Box>

        <div className={isDarkMode ? styles.darkMode : ''}>
          <div className={styles.infoList}>
            <div>
              <p style={{ color: isDarkMode ? theme.palette.text.secondary : 'inherit' }}>Total Permissions</p>
              <h5 style={{ color: isDarkMode ? theme.palette.text.primary : 'inherit' }}>{data.permissions}</h5>
            </div>
            <div className={styles.rightContent}>
              <p>
                <i className="ri-bar-chart-fill" style={{ color: isDarkMode ? theme.palette.primary.main : 'inherit' }}></i>
              </p>
            </div>
          </div>

          <div className={styles.infoList}>
            <div>
              <p style={{ color: isDarkMode ? theme.palette.text.secondary : 'inherit' }}>Role Permissions</p>
              <h5 style={{ color: isDarkMode ? theme.palette.text.primary : 'inherit' }}>{data.totalPermissions}</h5>
            </div>
            <div className={styles.rightContent}>
              <p>
                <i className="ri-bar-chart-fill" style={{ color: isDarkMode ? theme.palette.primary.main : 'inherit' }}></i>
              </p>
            </div>
          </div>
        </div>

        <Chart
          options={chartOptions}
          series={[data.percentage]}
          type="radialBar"
        />
      </Card>
    </>
  );
};

export default SessionsDevice;
