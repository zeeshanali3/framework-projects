import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const StackedBarChart100 = ({ data, config, appearance }) => {
  // ❌ Prevent rendering if required props are missing
  if (!data || !config || !appearance) {
    return (
      <Alert severity="error">
        Missing required props (Data, Config, or Appearance).
      </Alert>
    );
  }

  // ✅ Extract props
  const graphProps = data?.features?.graph || {};
  const appearanceProps = appearance?.features?.graph?.[0] || {};
  const title = graphProps?.title || "Stacked Bar Chart";
  const categories = graphProps?.xAxisCategories || [];

  const {
    height = 430,
    barOrientation = "horizontal",
    dataLabelPosition = "inside",
    dataLabelColor = "#000",
    fontSize = "12px",
    strokeColor = "#fff",
    seriesColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
  } = appearanceProps;

  // ❌ Handle empty series
  if (!Array.isArray(graphProps?.data) || graphProps.data.length === 0) {
    return (
      <Alert severity="warning">
        No series data provided for stacked bar chart.
      </Alert>
    );
  }

  // ✅ Detect mobile
  const isMobile = window.innerWidth < 600;
  const responsiveLabelPosition = isMobile ? "insideTop" : dataLabelPosition;
  const responsiveFontSize = isMobile ? 10 : parseInt(fontSize);

  // ✅ Prepare chart data
  const formattedData = categories.map((category, i) => {
    const row = { category };
    graphProps.data.forEach((series) => {
      row[series.name] = series.values[i] ?? 0;
    });
    return row;
  });

  const barKeys = graphProps.data.map((s) => s.name);

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "25px",
        mb: "15px",
        minHeight: `${height}px`,
      }}
    >
      <Typography
        variant="h6"
        mb={2}
        fontSize={isMobile ? "1rem" : "1.25rem"}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={formattedData}
          layout={barOrientation === "horizontal" ? "vertical" : "horizontal"}
          stackOffset="expand" // ✅ 100% stacked mode
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barCategoryGap={10}
          barGap={5}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {barOrientation === "horizontal" ? (
            <>
              <XAxis
                type="number"
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              <YAxis type="category" dataKey="category" />
            </>
          ) : (
            <>
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
            </>
          )}

          <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
          <Legend verticalAlign="bottom" height={36} />

          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={seriesColors[index % seriesColors.length]}
              stroke={strokeColor}
              barSize={isMobile ? 20 : 30}
            >
              <LabelList
                dataKey={key}
                position={responsiveLabelPosition}
                fill={dataLabelColor}
                fontSize={responsiveFontSize}
                fontWeight="bold"
                formatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StackedBarChart100;
