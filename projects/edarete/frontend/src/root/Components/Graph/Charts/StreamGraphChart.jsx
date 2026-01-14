import React from "react";
import { Box, Alert } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const StreamGraphChart = ({ data, config, appearance }) => {
  const graphConfig = data?.features?.graph;
  const chartData = graphConfig?.data;
  const xKey = graphConfig?.xAxisValue || "time";

  // Show warning if config or data is missing
  if (!config || !Array.isArray(chartData) || chartData.length === 0 || !graphConfig) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  // Determine y-axis keys (exclude x-axis)
  const yKeys = Object.keys(chartData[0]).filter((key) => key !== xKey);

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          {yKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
              fill={`hsl(${(index * 60) % 360}, 70%, 70%)`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StreamGraphChart;
