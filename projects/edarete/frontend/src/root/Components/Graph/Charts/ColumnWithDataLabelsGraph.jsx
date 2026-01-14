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

const ColumnWithDataLabels = ({ data, config, appearance }) => {
  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0];
  const configProps = config?.viewModes;

  // 🔹 Strict validation
  if (
    !graphProps?.title ||
    !graphProps?.xAxisValue ||
    !graphProps?.yAxisValue ||
    !Array.isArray(graphProps?.data) ||
    graphProps.data.length === 0 ||
    !appearanceProps?.seriesColors ||
    !appearanceProps?.height ||
    !configProps?.presentation
  ) {
    return (
      <Alert severity="warning">
        Missing or invalid props for column with data labels chart.
      </Alert>
    );
  }

  const title = graphProps.title;
  const xAxisKey = graphProps.xAxisValue;
  const yAxisKey = graphProps.yAxisValue;

  const isMobile = window.innerWidth < 600;

  // 🔹 Format data
  const uniqueXValues =
    graphProps.data[0]?.values?.map((v) => v[xAxisKey]) || [];

  const formattedData = uniqueXValues.map((xVal, i) => {
    const obj = { [xAxisKey]: xVal };
    graphProps.data.forEach((series) => {
      const val = series.values[i]?.[yAxisKey] ?? 0;
      obj[series.category] = val;
      obj[`${series.category}_label`] = `${val}%`;
    });
    return obj;
  });

  const barKeys = graphProps.data.map((s) => s.category);

  // 🔹 Appearance-driven props
  const {
    seriesColors,
    height,
    backgroundColor = "#fff",
    color = "#000",
    dataLabels = true,
    yAxisTitle,
  } = appearanceProps;

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "25px",
        mb: "15px",
        minHeight: `${height}px`,
        backgroundColor,
        color,
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
          margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
          barCategoryGap={isMobile ? 10 : 20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={0}
          />
          <YAxis
            label={{
              value: yAxisTitle || "Percentage",
              angle: -90,
              position: "insideLeft",
              fontSize: isMobile ? 10 : 12,
            }}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={seriesColors[index % seriesColors.length]}
              radius={[5, 5, 0, 0]}
              barSize={isMobile ? 20 : 30}
            >
              {dataLabels && (
                <LabelList
                  dataKey={`${key}_label`}
                  position="top"
                  style={{
                    fontSize: isMobile ? 10 : 12,
                    fill: "#000",
                    fontWeight: 600,
                  }}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ColumnWithDataLabels;
