import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const StackedColumnChart = ({ data, config, appearance }) => {
  // ✅ Required props check
  if (
    !data?.features?.graph?.data ||
    !Array.isArray(data.features.graph.data) ||
    data.features.graph.data.length === 0 ||
    !config?.viewModes?.presentation ||
    !appearance?.features?.graph?.[0]
  ) {
    return (
      <Alert severity="warning">
        Missing required props (data/config/appearance) for Stacked Column Chart.
      </Alert>
    );
  }

  const graphData = data.features.graph.data;
  const { title, xAxisValue, yAxisValue } = data.features.graph;
  const { presentation } = config.viewModes;
  const style = appearance.features.graph[0];

  if (presentation !== "stackedColumnChart") {
    return (
      <Alert severity="info">
        Presentation mode is not set to <b>stackedColumnChart</b>.
      </Alert>
    );
  }

  const isMobile = window.innerWidth < 600;

  // ✅ Extract unique X values
  const uniqueXValues = graphData[0]?.values?.map((v) => v[xAxisValue]) || [];

  // ✅ Format data for stacked chart
  const formattedData = uniqueXValues.map((xVal, i) => {
    const obj = { [xAxisValue]: xVal, total: 0 };
    graphData.forEach((series) => {
      const val = series.values[i]?.[yAxisValue] ?? 0;
      obj[series.category] = val;
      obj.total += val;
    });
    return obj;
  });

  const barKeys = graphData.map((s) => s.category);

  // ✅ Extract appearance props
  const {
    height = isMobile ? 300 : 400,
    seriesColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
    legendPosition = "bottom",
    dataLabels = true,
    borderRadius = 5,
    yAxisTitle = "Value",
  } = style;

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "25px",
        mb: "15px",
        minHeight: `${height}px`,
        backgroundColor: style.backgroundColor || "#fff",
      }}
    >
      {/* Chart Title */}
      <Typography
        variant="h6"
        mb={2}
        fontSize={isMobile ? "1rem" : "1.25rem"}
        color={style.color || "#000"}
      >
        {title}
      </Typography>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
          barCategoryGap={isMobile ? 8 : 20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisValue} />
          <YAxis
            label={{
              value: yAxisTitle,
              angle: -90,
              position: "insideLeft",
              fontSize: isMobile ? 10 : 12,
            }}
          />
          <Tooltip />
          {/* ✅ Legend at bottom */}
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
          />

          {/* Bars for each category */}
          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={seriesColors[index % seriesColors.length]}
              radius={style.barShape === "rounded" ? [borderRadius, borderRadius, 0, 0] : 0}
              barSize={isMobile ? 20 : 30}
            >
              {dataLabels && (
                <LabelList
                  dataKey={key}
                  position="insideTop"
                  fill="#fff"
                  fontSize={isMobile ? 10 : 12}
                />
              )}
            </Bar>
          ))}

          {/* Transparent bar for total labels */}
          {dataLabels && (
            <Bar dataKey="total" fill="transparent">
              <LabelList
                dataKey="total"
                position="top"
                fill="#000"
                fontWeight="bold"
                fontSize={isMobile ? 10 : 12}
              />
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StackedColumnChart;
