import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const LineAreaChart = ({ data, config, appearance }) => {
  const graphProps = data?.features?.graph;
  const configProps = config?.features;
  const appearanceProps = appearance?.features?.graph?.[0];


  if (
    !graphProps?.title ||
    !Array.isArray(graphProps?.labels) ||
    graphProps.labels.length === 0 ||
    !Array.isArray(graphProps?.data) ||
    graphProps.data.length === 0 ||
    !appearanceProps ||
    !configProps?.graph
  ) {
    return (
      <Alert severity="warning">
        Missing required props for line-area chart.
      </Alert>
    );
  }

  // === Extract Props ===
  const {
    height = 400,
    strokeWidths = [2, 2],
    seriesColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    areaOpacity = 0.3,
    curve = "monotone",
    tooltipSuffix = "",
  } = appearanceProps;

  const title = graphProps.title;
  const labels = graphProps.labels;
  const series = graphProps.data;

  // === Format Data ===
  const formattedData = labels.map((label, i) => {
    const row = { label };
    series.forEach((s) => {
      row[s.name] = s.values[i] ?? 0;
    });
    return row;
  });

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: `${height}px` }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: "14px",
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `${value}${tooltipSuffix}`} />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />

          {series.map((s, index) => {
            const color = seriesColors[index % seriesColors.length];
            const strokeWidth = strokeWidths[index] || 2;

            return s.type === "line" ? (
              <Line
                key={s.name}
                type={curve}
                dataKey={s.name}
                stroke={color}
                strokeWidth={strokeWidth}
                dot={{ r: 3 }}
              />
            ) : (
              <Area
                key={s.name}
                type={curve}
                dataKey={s.name}
                stroke={color}
                fill={color}
                fillOpacity={areaOpacity}
              >
                <LabelList
                  dataKey={s.name}
                  position="top"
                  fill="#000"
                  fontSize={12}
                  fontWeight="bold"
                />
              </Area>
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineAreaChart;
