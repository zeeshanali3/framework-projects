import React from "react";
import { Box, Alert, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const WaterfallChartGraph = ({ data, config, appearance }) => {
  const graph = data?.features?.graph || {};
  const chartData = graph?.data || [];

  // Check if config or chart data exists
  if (!config || !Array.isArray(chartData) || chartData.length === 0 || !graph) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data or graph configuration found.
        </Alert>
      </Box>
    );
  }

  // Transform data for waterfall chart
  const transformWaterfallData = (data) => {
    let cumulative = 0;
    return data.map((item) => {
      const value = item.value;
      const assist = cumulative;

      let newValue = value;
      if (item.type !== "end" && item.type !== "start") {
        cumulative += value;
      } else if (item.type === "end") {
        newValue = cumulative;
      }

      return { ...item, assist, value: newValue };
    });
  };

  const transformedData = transformWaterfallData(chartData);

  // Chart title from config
  const chartTitle = config?.viewModes?.presentation
    ? graph?.title || "Waterfall Chart"
    : "Waterfall Chart";

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {chartTitle}
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="assist" stackId="a" fill="transparent" />
          <Bar dataKey="value" stackId="a">
            {transformedData.map((entry, index) => {
              const isEndOrStart = entry.type === "start" || entry.type === "end";
              const color = isEndOrStart
                ? appearance?.features?.graph?.totalColor || "#42a5f5"
                : entry.value >= 0
                ? appearance?.features?.graph?.increaseColor || "#66bb6a"
                : appearance?.features?.graph?.decreaseColor || "#ef5350";

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WaterfallChartGraph;
