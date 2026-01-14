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
  Scatter,
} from "recharts";
import { Box, Alert } from "@mui/material";

const BubbleChartGraph = ({ data, config, appearance }) => {
  // Strict prop validation
  if (
    !data ||
    !data.features?.graph ||
    !Array.isArray(data.features.graph.data) ||
    data.features.graph.data.length === 0 ||
    !config ||
    !appearance
  ) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Required props (data, config, or appearance) are missing or invalid.
        </Alert>
      </Box>
    );
  }

  const rawData = data.features.graph.data;
  const graph = data.features.graph;

  // Convert values to numbers
  const chartData = rawData.map((item) => ({
    ...item,
    [graph.xAxisValue]: Number(item[graph.xAxisValue]),
    [graph.yAxisValue]: Number(item[graph.yAxisValue]),
    [graph.result]: Number(item[graph.result]),
  }));

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey={graph.xAxisValue} name="X-Axis" type="number" />
          <YAxis dataKey={graph.yAxisValue} name="Y-Axis" type="number" />
          <ZAxis dataKey={graph.result} range={[10, 100]} name="Bubble Size" type="number" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter
            name={graph.title || "Bubble Data"}
            data={chartData}
            fill={appearance.features.graph.barColor}
            fillOpacity={0.7}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BubbleChartGraph;
