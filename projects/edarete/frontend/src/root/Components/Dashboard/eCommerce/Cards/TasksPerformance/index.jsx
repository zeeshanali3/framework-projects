import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TasksPerformanceChart from "./TasksPerformanceChart";

const TasksPerformance = ({Title, SubTitle1, SubTitle2, SubTitle3, isDarkMode, theme}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
          backgroundColor: isDarkMode ? theme?.palette.background.paper : 'inherit',
          color: isDarkMode ? theme?.palette.text.primary : 'inherit',
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${isDarkMode ? theme?.palette.divider : '#EEF0F7'}`,
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: isDarkMode ? theme?.palette.primary.light : theme?.palette.primary.dark,
            }}
          >
            {Title}
          </Typography>

          <Box>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                color: isDarkMode ? theme?.palette.text.secondary : 'inherit',
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                backgroundColor: isDarkMode ? theme?.palette.background.paper : 'inherit',
                color: isDarkMode ? theme?.palette.text.primary : 'inherit',
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: isDarkMode ? theme?.palette.background.paper : "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem sx={{ fontSize: "14px" }}>Last day</MenuItem>
            <MenuItem sx={{ fontSize: "14px" }}>Last months</MenuItem>
            <MenuItem sx={{ fontSize: "14px" }}>Last Year</MenuItem>
          </Menu>
        </Box>
        
        {/* TasksPerformanceChart */}
        <TasksPerformanceChart 
          subTitle1={SubTitle1} 
          subTitle2={SubTitle2} 
          subTitle3={SubTitle3}
          isDarkMode={isDarkMode}
          theme={theme}
        />
      </Card>
    </>
  );
};

export default TasksPerformance;
