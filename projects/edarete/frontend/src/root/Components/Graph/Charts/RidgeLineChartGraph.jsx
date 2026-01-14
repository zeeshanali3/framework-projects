
import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const RidgelineChart = ({ data, config, appearance }) => {
  // If config is missing
  if (!config) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Graph configuration is missing. Chart cannot be displayed.
        </Alert>
      </Box>
    );
  }

  // If appearance is missing
  if (!appearance) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Appearance configuration is missing. Chart cannot be displayed.
        </Alert>
      </Box>
    );
  }

  // If data or graph is missing
  if (!data?.features?.graph) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  const { graph } = data.features;
  const chartData = graph.data;
  const xAxisValue = graph.xAxisValue;
  const yAxisValue = graph.yAxisValue;
  const title = graph.title || "Ridgeline Chart";

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">No data found for the chart.</Alert>
      </Box>
    );
  }

  // Group data by category (yAxisValue)
  const groupedData = chartData.reduce((acc, item) => {
    const category = item[yAxisValue];
    const xVal = item[xAxisValue];
    if (!acc[category]) acc[category] = [];
    acc[category].push({ x: xVal, y: 1 });
    return acc;
  }, {});

  Object.keys(groupedData).forEach((key) => {
    groupedData[key].sort((a, b) => a.x - b.x);
  });

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: config.height || "350px" }}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      {Object.entries(groupedData).map(([category, values]) => (
        <Box key={category} sx={{ height: config.rowHeight || "70px", mb: 1 }}>
          <Typography variant="caption" sx={{ ml: 1 }}>
            {category}
          </Typography>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={values}>
              <XAxis dataKey="x" hide={config.hideXAxis} />
              <YAxis hide={config.hideYAxis} />
              {config.tooltip !== false && <Tooltip />}
              <Area
                type={config.areaType || "monotone"}
                dataKey="y"
                stroke={appearance.lineColor}
                fill={appearance.fillColor}
                fillOpacity={appearance.fillOpacity}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      ))}
    </Box>
  );
};

export default RidgelineChart;
