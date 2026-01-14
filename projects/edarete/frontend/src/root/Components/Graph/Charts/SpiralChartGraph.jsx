import React from "react";
import { Box, Alert, Typography } from "@mui/material";

const SpiralChartGraph = ({ data, config, appearance }) => {
  // Render warning if config is missing
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
  const title = graph?.title;

  if (!Array.isArray(chartData) || chartData.length === 0 || !graph) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  const spiralPoints = chartData.map((item, index) => {
    const angle = index * 0.5;
    const radius = 20 + item.value; // Assuming `item.value` exists
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y, label: item[xAxisValue], value: item.value };
  });

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <svg width="100%" height="350" viewBox="-200 -200 400 400">
        <polyline
          fill="none"
          stroke={appearance?.features?.graph?.[0]?.lineColor || "#00BFFF"}
          strokeWidth="2"
          points={spiralPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        />
        {spiralPoints.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={6}
              fill={appearance?.features?.graph?.[0]?.dotColor || "#1E90FF"}
              stroke="white"
              strokeWidth={1}
            />
            <text x={point.x + 8} y={point.y} fontSize="10" fill="black">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </Box>
  );
};

export default SpiralChartGraph;
