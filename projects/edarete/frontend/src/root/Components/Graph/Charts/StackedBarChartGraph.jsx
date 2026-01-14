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

const StackedBarChart = ({ data, config, appearance }) => {
  if (!data || !config || !appearance) {
    return (
      <Alert severity="error">
        Missing required props (Data, Config, or Appearance).
      </Alert>
    );
  }

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

  if (!Array.isArray(graphProps?.data) || graphProps.data.length === 0) {
    return <Alert severity="warning">No series data provided for stacked bar chart.</Alert>;
  }

  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 600;
  const isTablet = screenWidth >= 600 && screenWidth < 992;

  const responsiveHeight = isMobile ? 300 : isTablet ? 360 : height;
  const responsiveFontSize = isMobile ? 10 : parseInt(fontSize);
  const barSize = isMobile ? 16 : isTablet ? 22 : 30;
  const padding = isMobile ? "15px" : "25px";

  const formattedData = categories.map((category, i) => {
    const row = { category };
    let total = 0;
    graphProps.data.forEach((series) => {
      total += series.values[i] ?? 0;
    });
    graphProps.data.forEach((series) => {
      const value = series.values[i] ?? 0;
      const percent = total ? ((value / total) * 100).toFixed(1) : 0;
      row[series.name] = +percent;
    });
    return row;
  });

  const barKeys = graphProps.data.map((s) => s.name);

  return (
    <Box sx={{ padding, mb: "15px", minHeight: `${responsiveHeight}px` }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: isMobile ? "13px" : "14px",
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={responsiveHeight}>
        <BarChart
          data={formattedData}
          layout={barOrientation === "horizontal" ? "vertical" : "horizontal"}
          stackOffset="expand"
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barCategoryGap={10}
          barGap={5}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {barOrientation === "horizontal" ? (
            <>
              <XAxis
                type="number"
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
                tick={{ fontSize: responsiveFontSize }}
              />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: responsiveFontSize }}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="category"
                tick={{ fontSize: responsiveFontSize }}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: responsiveFontSize }}
              />
            </>
          )}

          <Tooltip formatter={(value) => `${value}%`} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: responsiveFontSize }}
          />

          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={seriesColors[index % seriesColors.length]}
              stroke={strokeColor}
              barSize={barSize}
            >
              <LabelList
                dataKey={key}
                position={dataLabelPosition}
                fill={dataLabelColor}
                fontSize={responsiveFontSize}
                fontWeight="bold"
                formatter={(val) => `${val}%`}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StackedBarChart;
