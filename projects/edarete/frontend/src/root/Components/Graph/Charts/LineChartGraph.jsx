import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Alert } from "@mui/material";

const LineChartGraph = ({ data, config, appearance, graphData,getIndividualChartData,getComparisonChartData }) => {
  const genericMode = config?.features?.graphConfig?.series?.length > 0;

  // Data selection logic
  const chartData = genericMode
    ? data?.features?.graph?.data || []
    : graphData?.mode === "Individual" && graphData?.students.length === 1
      ? getIndividualChartData()
      : graphData?.mode === "Comparison" && graphData?.students.length > 0
        ? getComparisonChartData()
        : [];

  const resolvedXAxisKey =
    config?.features?.graphConfig?.xaxis?.key || "month";

  const lineSeries = config?.features?.graphConfig?.series || [];

  const renderLines = () => {
    if (genericMode && lineSeries.length > 0) {
      return lineSeries.map((line, index) => (
        <Line
          key={line.key}
          type="monotone"
          dataKey={line.key}
          stroke={
            line.color ||
            graphData?.colors?.[index % graphData?.colors?.length] ||
            "#3b82f6"
          }
          strokeWidth={line.strokeWidth || 2}
          dot={{ r: 3 }}
        />
      ));
    }

    if (graphData?.mode === "Individual" && graphData?.students.length === 1) {
      return (
        <Line
          type="monotone"
          dataKey="score"
          stroke="#3b82f6"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      );
    }

    if (graphData?.mode === "Comparison" && graphData?.students.length > 0) {
      return graphData.students.map((student, index) => (
        <Line
          key={student}
          type="monotone"
          dataKey={student}
          stroke={
            graphData?.colors?.[index % graphData?.colors?.length] || "#8884d8"
          }
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      ));
    }

    return null;
  };

  if (!Array.isArray(chartData) || chartData.length === 0) {
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
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={resolvedXAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartGraph;
