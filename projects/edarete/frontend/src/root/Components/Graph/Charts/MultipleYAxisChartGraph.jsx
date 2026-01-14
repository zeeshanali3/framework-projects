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

const MultipleYAxisChart = ({ data, config, appearance }) => {
  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0] || {};

  // Graph config
  const title = graphProps?.title || "";
  const labels = graphProps?.labels || [];
  const yAxisTitles = graphProps?.yAxisTitles || [];
  const seriesData = graphProps?.data || [];

  // Appearance config
  const {
    height = 350,
    strokeWidths = [],
    seriesColors = [],
  } = appearanceProps;

  // Validate
  if (!config?.features?.graph) return null;
  if (!Array.isArray(seriesData) || seriesData.length === 0) {
    return <Alert severity="warning">No series data provided</Alert>;
  }

  // Prepare data for recharts
  const formattedData = labels.map((label, i) => {
    const row = { label };
    seriesData.forEach((series) => {
      row[series.name] = series.values[i] ?? 0;
    });
    return row;
  });

  return (
    <Box sx={{ padding: "20px", mb: "15px", minHeight: `${height}px` }}>
      {title && (
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
      )}

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          {/* Dynamic Y-Axes */}
          {seriesData.map((series, index) => {
            const color = seriesColors[index % seriesColors.length] || "#000";
            const orientation = index % 2 === 0 ? "left" : "right";

            return (
              <YAxis
                key={`yaxis-${index}`}
                yAxisId={index}
                orientation={orientation}
                stroke={color}
                axisLine={{ stroke: color }}
                tick={{ fill: color, fontSize: 12 }}
                label={{
                  value: yAxisTitles[index] || series.name,
                  angle: -90,
                  position: orientation === "left" ? "insideLeft" : "insideRight",
                  style: { fill: color, fontSize: 12 },
                }}
              />
            );
          })}

          {/* Dynamic Series */}
          {seriesData.map((series, index) => {
            const color = seriesColors[index % seriesColors.length] || "#000";
            const strokeWidth = strokeWidths[index] || 2;

            return series.type === "line" ? (
              <Line
                key={series.name}
                type="monotone"
                dataKey={series.name}
                stroke={color}
                strokeWidth={strokeWidth}
                dot={{ r: 3 }}
                yAxisId={index}
              />
            ) : (
              <Bar
                key={series.name}
                dataKey={series.name}
                fill={color}
                yAxisId={index}
                barSize={30}
              >
                <LabelList
                  dataKey={series.name}
                  position="top"
                  fill="#000"
                  fontSize={12}
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

export default MultipleYAxisChart;
