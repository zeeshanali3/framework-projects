import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Bar,
  Line,
} from "recharts";
import { Box, Alert } from "@mui/material";

const ComposedChartGraph = ({ data, config, appearance }) => {
  // Ensure all three props exist
  if (!data || !config || !appearance) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Missing required props: data, config, or appearance.
        </Alert>
      </Box>
    );
  }

  const chartData = data?.features?.graph?.data;
  const graphConfig = data?.features?.graph;
  const graphAppearance = appearance?.features?.graph?.[0] || {};

  // Check if graph data exists
  if (!Array.isArray(chartData) || chartData.length === 0 || !graphConfig) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "25px",
        mb: "15px",
        minHeight: "350px",
        backgroundColor: graphAppearance.backgroundColor || "white",
        color: graphAppearance.color || "black",
        width: graphAppearance.width || "100%",
        height: graphAppearance.height || "auto",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey={graphConfig.xAxisValue} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={graphConfig.result}
            fill={graphAppearance.barColor || "#007bff"}
            stroke={graphAppearance.barColor || "#007bff"}
          />
          <Bar
            dataKey={graphConfig.barValue || "value"}
            barSize={20}
            fill={graphAppearance.barColor || "#413ea0"}
          />
          <Line
            type="monotone"
            dataKey={graphConfig.lineValue || "lineValue"}
            stroke={graphAppearance.lineColor || "#ff7300"}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ComposedChartGraph;
