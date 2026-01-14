
import React from "react";
import { Box, Alert, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Scatter,
} from "recharts";

const LollipopChart = ({ data, config, appearance }) => {
  if (!config) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Graph configuration is missing. Chart cannot be displayed.
        </Alert>
      </Box>
    );
  }

  const { graph } = data?.features || {};
  const chartData = graph?.data || [];
  const xAxisValue = graph?.xAxisValue;
  const yAxisValue = graph?.yAxisValue;
  const title = graph?.title;
  const appearanceProps = appearance?.features?.graph?.[0] || {};

  if (!Array.isArray(chartData) || chartData.length === 0 || !graph) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisValue} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey={yAxisValue}
            fill={appearanceProps.lineColor || "#8884d8"}
            barSize={4}
          />
          <Scatter
            dataKey={yAxisValue}
            fill={appearanceProps.dotColor || "#8884d8"}
            shape="circle"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LollipopChart;
