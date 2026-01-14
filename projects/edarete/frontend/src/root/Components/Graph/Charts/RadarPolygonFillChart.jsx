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
import { Card, Typography, Alert } from "@mui/material";

const RadarPolygonFillChart = ({ data, config, appearance }) => {
  // 🔹 Validate required props
  if (
    !data?.features?.graph ||
    !config?.viewModes?.presentation ||
    !appearance?.features?.graph
  ) {
    return <Alert severity="warning">Missing configuration for Radar Polygon Fill chart.</Alert>;
  }

  const graphProps = data.features.graph;
  const appearanceProps = appearance.features.graph[0] || {};

  const title = graphProps?.title || "Radar with Polygon Fill";
  const labels = graphProps?.labels || [];
  const series = graphProps?.data || [];

  // ❌ If essential data missing
  if (labels.length === 0 || series.length === 0) {
    return <Alert severity="warning">No data available for Radar Polygon Fill chart.</Alert>;
  }

  // 🎨 Appearance controlled values
  const {
    height = 350,
    fillOpacity = 0.3,
    strokeWidth = 2,
    color = "#FF4560",
    marker = {},
    yAxis = {},
    polygonStrokeColor = "#e9e9e9",
    padding = "20px",
    titleFontSize = "14px",
    outerRadius = "80%",
  } = appearanceProps;

  // 📊 Format radar data for Recharts
  const radarData = labels.map((label, i) => {
    const entry = { subject: label };
    series.forEach((s) => {
      entry[s.name] = s.values[i] ?? 0;
    });
    return entry;
  });

  const seriesKeys = series.map((s) => s.name);

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: padding,
        mb: "15px",
      }}
    >
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
          <PolarGrid stroke={polygonStrokeColor} />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            tickCount={yAxis?.ticks || 7}
            tickFormatter={(val, idx) =>
              yAxis?.showAlternateLabelsOnly && idx % 2 !== 0 ? "" : val
            }
          />
          <Tooltip />
          {seriesKeys.map((key) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={color}
              fill={color}
              fillOpacity={fillOpacity}
              strokeWidth={strokeWidth}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RadarPolygonFillChart;
