import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Scatter
} from "recharts";
import { Box, Alert } from "@mui/material";

const ScatterChartGraph = ({ data, config, appearance }) => {
  // Extract chart data and keys
  const chartData = data?.features?.graph?.data;
  const xKey = data?.features?.graph?.xAxisValue;
  const yKey = data?.features?.graph?.yAxisValue;
  const zKey = data?.features?.graph?.result;
  const fillColor = appearance?.features?.graph?.barColor;

  // Strict prop validation
  const allPropsExist =
    data &&
    config &&
    appearance &&
    chartData &&
    Array.isArray(chartData) &&
    chartData.length > 0 &&
    xKey &&
    yKey &&
    zKey &&
    fillColor;

  if (!allPropsExist) {
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
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey={xKey} />
          <YAxis type="number" dataKey={yKey} />
          <ZAxis type="number" dataKey={zKey} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter data={chartData} fill={fillColor} />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ScatterChartGraph;
