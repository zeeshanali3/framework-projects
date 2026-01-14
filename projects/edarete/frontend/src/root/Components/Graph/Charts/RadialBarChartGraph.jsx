import React from "react";
import { Box, Typography, Stack, Alert } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const RadialBarChartGraph = ({ data, config, appearance }) => {
  // Check if all 3 props exist
  if (!data || !config || !appearance) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Typography>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              Required props missing: data, config, or appearance
            </Alert>
          </Stack>
        </Typography>
      </Box>
    );
  }

  const chartData = data?.features?.graph?.data;

  // Check if chart data exists
  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Typography>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">No data found</Alert>
          </Stack>
        </Typography>
      </Box>
    );
  }

  const options = {
    chart: {
      type: "radialBar",
      background: appearance?.features?.graph?.[0]?.backgroundColor || "#fff",
    },
    colors:
      appearance?.features?.graph?.[0]?.colors || [
        "#FF4566",
        "#008FF5",
        "#00E390",
        "#775DD6",
        "#FEB013",
      ],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            },
          },
        },
      },
    },
    labels: chartData.map(
      (item) => item[data?.features?.graph?.xAxisValue] || "Unnamed"
    ),
  };

  const series = chartData.map(
    (item) => item[data?.features?.graph?.result] || 0
  );

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ReactApexChart options={options} series={series} type="radialBar" />
    </Box>
  );
};

export default RadialBarChartGraph;
