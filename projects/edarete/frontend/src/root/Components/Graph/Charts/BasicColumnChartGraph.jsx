import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BasicColumnChart = ({ data, config, appearance }) => {
  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0];

  // ❌ Agar config ya graphProps na mile to chart render hi na ho
  if (!config || !graphProps || !appearanceProps) {
    return (
      <Alert severity="warning">
        Missing required props (config, data, or appearance) for Column Chart.
      </Alert>
    );
  }

  const { title, xAxisValue, yAxisValue } = graphProps;

  if (!Array.isArray(graphProps?.data) || graphProps.data.length === 0) {
    return <Alert severity="warning">No series data provided for column chart.</Alert>;
  }

  const isMobile = window.innerWidth < 600;
  const isTablet = window.innerWidth < 900;

  // Unique X-axis values
  const uniqueXValues = graphProps.data[0]?.values?.map((v) => v[xAxisValue]) || [];

  // Format data for recharts
  const formattedData = uniqueXValues.map((xVal, i) => {
    const obj = { [xAxisValue]: xVal };
    graphProps.data.forEach((series) => {
      obj[series.category] = series.values[i]?.[yAxisValue] ?? 0;
    });
    return obj;
  });

  const barKeys = graphProps.data.map((s) => s.category);
  const {
    seriesColors,
    height,
    yAxisTitle,
  } = appearanceProps;

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
          margin={{
            top: 20,
            right: isMobile ? 10 : 30,
            left: isMobile ? 10 : 20,
            bottom: isMobile ? 40 : 10,
          }}
          barCategoryGap={isMobile ? 10 : 20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisValue}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={0}
            angle={isMobile ? -30 : 0}
            textAnchor={isMobile ? "end" : "middle"}
          />
          <YAxis
            label={{
              value: yAxisTitle,
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
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BasicColumnChart;
