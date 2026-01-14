import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const GroupedBarChart = ({ data, config, appearance }) => {
  if (
    !data?.features?.graph?.title ||
    !Array.isArray(data?.features?.graph?.xAxisCategories) ||
    !Array.isArray(data?.features?.graph?.data) ||
    data.features.graph.data.length === 0 ||
    !config?.viewModes?.presentation ||
    !appearance?.features?.graph?.[0]
  ) {
    return (
      <Alert severity="error">
        Missing required props for Grouped Bar Chart.
      </Alert>
    );
  }

  const graphProps = data.features.graph;
  const appearanceProps = appearance.features.graph[0];

  const title = graphProps.title;
  const categories = graphProps.xAxisCategories;

  const {
    height = 430,
    barOrientation = "horizontal",
    dataLabelPosition = "inside",
    dataLabelColor = "#000",
    fontSize = "14px",
    strokeColor = "#fff",
    seriesColors = ["#8884d8", "#82ca9d"],
  } = appearanceProps;

  const isMobile = window.innerWidth < 600;
  const responsiveLabelPosition = isMobile ? "insideTop" : dataLabelPosition;
  const responsiveFontSize = isMobile ? 10 : parseInt(fontSize);
  const responsiveBarSize = isMobile ? 20 : 30;

  // ✅ Format data
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
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barCategoryGap={isMobile ? 5 : 10}
          barGap={isMobile ? 2 : 5}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {barOrientation === "horizontal" ? (
            <>
              <XAxis type="number" />
              <YAxis type="category" dataKey="category" />
            </>
          ) : (
            <>
              <XAxis dataKey="category" />
              <YAxis />
            </>
          )}

          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={seriesColors[index % seriesColors.length]}
              radius={[5, 5, 0, 0]}
              stroke={strokeColor}
              barSize={responsiveBarSize}
            >
              <LabelList
                dataKey={key}
                position={responsiveLabelPosition}
                fill={dataLabelColor}
                fontSize={responsiveFontSize}
                fontWeight="bold"
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GroupedBarChart;
