import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const RadarMultipleSeriesChart = ({ data, config, appearance }) => {
  // Validate required props
  if (
    !data?.features?.graph ||
    !config?.viewModes?.presentation ||
    !appearance?.features?.graph
  ) {
    return <Alert severity="warning">Missing configuration for radar chart.</Alert>;
  }

  const graphProps = data.features.graph;
  const appearanceProps = appearance.features.graph[0] || {};

  const title = graphProps?.title || "Radar Multiple Series";
  const labels = graphProps?.labels || [];
  const rawData = graphProps?.data || [];

  if (rawData.length === 0 || labels.length === 0) {
    return <Alert severity="warning">No data provided for radar chart.</Alert>;
  }

  const {
    height = 400,
    strokeWidth = 2,
    fillOpacity = 0.1,
    titleFontSize = "14px",
    padding = "20px",
    outerRadius = "80%",
  } = appearanceProps;

  // Format data for Recharts
  const radarData = labels.map((label, i) => {
    const entry = { subject: label };
    rawData.forEach((series) => {
      entry[series.name] = series.values[i] ?? 0;
    });
    return entry;
  });

  const seriesKeys = rawData.map((s) => s.name);

  return (
    <Box sx={{ padding, mb: "15px", minHeight: `${height}px` }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: titleFontSize,
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={height}>
        <RadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Tooltip />
          {seriesKeys.map((key, idx) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={`hsl(${(idx * 60) % 360}, 90%, 50%)`}
              fill={`hsl(${(idx * 60) % 360}, 70%, 50%)`}
              fillOpacity={fillOpacity}
              strokeWidth={strokeWidth}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RadarMultipleSeriesChart;
