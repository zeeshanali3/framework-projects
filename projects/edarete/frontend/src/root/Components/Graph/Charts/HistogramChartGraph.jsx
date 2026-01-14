import React from "react";
import { Box, Alert } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const HistogramChartGraph = ({ data, config, appearance }) => {
  const graph = data?.features?.graph;
  const chartData = graph?.data;
  const xAxisKey = graph?.xAxisKey || "range";
  const yAxisKey = graph?.yAxisKey || "frequency";
  const barColors = appearance?.features?.graph?.[0]?.barColor || ["#8884d8"];

  if (!config || !Array.isArray(chartData) || chartData.length === 0 || !graph) {
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
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yAxisKey} fill={barColors[0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HistogramChartGraph;
