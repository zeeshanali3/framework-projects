import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
  LabelList,
} from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const LineColumnChart = ({ data, config, appearance }) => {
  if (!data || !config || !appearance) {
    return <Alert severity="error">Missing props: data, config, or appearance.</Alert>;
  }

  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0] || {};
  const title = graphProps?.title || "Line Column Chart";
  const labels = graphProps?.labels || [];

  const {
    height = 400,
    strokeWidths = [2, 2],
    seriesColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    fontSize = 12,
    barSize = 24,
    padding = "25px",
  } = appearanceProps;

  // ✅ Check if data is valid
  if (!Array.isArray(graphProps?.data) || graphProps.data.length === 0) {
    return <Alert severity="warning">No series data provided for line-column chart.</Alert>;
  }

  // Format data for chart
  const formattedData = labels.map((label, i) => {
    const row = { label };
    graphProps.data.forEach((series) => {
      row[series.name] = series.values[i] ?? 0;
    });
    return row;
  });

  const series = graphProps.data;

  return (
    <Box sx={{ padding, mb: "15px", minHeight: `${height}px` }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: `${fontSize + 2}px`,
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
          <XAxis dataKey="label" tick={{ fontSize }} />
          <YAxis tick={{ fontSize }} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize }} />

          {series.map((s, index) => {
            const color = seriesColors[index % seriesColors.length];
            const strokeWidth = strokeWidths[index] || 2;

            return s.type === "line" ? (
              <Line
                key={s.name}
                type="monotone"
                dataKey={s.name}
                stroke={color}
                strokeWidth={strokeWidth}
                dot={{ r: 3 }}
              />
            ) : (
              <Bar key={s.name} dataKey={s.name} fill={color} barSize={barSize}>
                <LabelList
                  dataKey={s.name}
                  position="top"
                  fill="#000"
                  fontSize={fontSize}
                  fontWeight="bold"
                />
              </Bar>
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineColumnChart;
