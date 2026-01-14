import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });
import Chart from "react-apexcharts";

const TasksPerformanceChart = ({ subTitle1, subTitle2, subTitle3, isDarkMode, theme }) => {
  const [chartData] = useState({
    series: [84, 77, 61],
    options: {
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "25%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ["#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD"],
      labels: [subTitle1, subTitle2, subTitle3],
      legend: {
        show: true,
        floating: true,
        fontSize: "13px",
        position: "left",
        offsetY: 0,
        labels: {
          color: isDarkMode ? theme?.palette.text.secondary : "#5B5B98",
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 280,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      fill: {
        opacity: 1,
      },
      theme: {
        mode: isDarkMode ? 'dark' : 'light',
      }
    },
  });

  return (
    <>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={300}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          mt: "22px",
        }}
      >
        <Box>
          <Typography 
            mb={1} 
            fontSize="14px"
            sx={{ color: isDarkMode ? theme?.palette.text.secondary : "#A9A9C8" }}
          >
            {subTitle1}
          </Typography>
          <Typography 
            fontWeight="500" 
            fontSize="18px" 
            as="h4"
            sx={{ color: isDarkMode ? theme?.palette.text.primary : 'inherit' }}
          >
            <ArrowDownwardIcon
              color="error"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            30
          </Typography>
        </Box>

        <Box>
          <Typography 
            mb={1} 
            fontSize="14px"
            sx={{ color: isDarkMode ? theme?.palette.text.secondary : "#A9A9C8" }}
          >
            {subTitle2}
          </Typography>
          <Typography 
            fontWeight="500" 
            fontSize="18px" 
            as="h4"
            sx={{ color: isDarkMode ? theme?.palette.text.primary : 'inherit' }}
          >
            <ArrowUpwardIcon
              color="success"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            40
          </Typography>
        </Box>

        <Box>
          <Typography 
            mb={1} 
            fontSize="14px"
            sx={{ color: isDarkMode ? theme?.palette.text.secondary : "#A9A9C8" }}
          >
            {subTitle3}
          </Typography>
          <Typography 
            fontWeight="500" 
            fontSize="18px" 
            as="h4"
            sx={{ color: isDarkMode ? theme?.palette.text.primary : 'inherit' }}
          >
            <ArrowUpwardIcon
              color="success"
              style={{ position: "relative", top: "3px" }}
            />{" "}
            67
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TasksPerformanceChart;
