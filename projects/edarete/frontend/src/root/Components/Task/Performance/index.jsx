import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
// import TasksPerformanceChart from "./Performance";

const TasksPerformance = () => {
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
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
            }}
          >
            Course's Status
          </Typography>
        </Box>
        
        {/* TasksPerformanceChart */}
        {/* <TasksPerformanceChart /> */}
      </Card>
    </>
  );
};

export default TasksPerformance;
