import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, } from "recharts";
import { Box, Typography, Alert } from "@mui/material";

const StackedColumns100 = ({ data, config, appearance }) => {
  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0];
  const configProps = config?.viewModes;

  // 🔹 Strict validation: agar koi bhi prop missing hai → chart render mat karo
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
        Missing or invalid props for stacked column chart.
      </Alert>
    );
  }

  const title = graphProps.title;
  const xAxisKey = graphProps.xAxisValue;
  const yAxisKey = graphProps.yAxisValue;

  const isMobile = window.innerWidth < 600;
  const isTablet = window.innerWidth < 900;

  // 🔹 Format data
  const uniqueXValues =
    graphProps.data[0]?.values?.map((v) => v[xAxisKey]) || [];

  const formattedData = uniqueXValues.map((xVal, i) => {
    const obj = { [xAxisKey]: xVal };
    let total = 0;

    graphProps.data.forEach((series) => {
      const val = series.values[i]?.[yAxisKey] ?? 0;
      obj[series.category] = val;
      total += val;
    });

    graphProps.data.forEach((series) => {
      const raw = obj[series.category];
      obj[`${series.category}_label`] =
        total > 0 ? `${((raw / total) * 100).toFixed(1)}%` : "0%";
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
    legendPosition = isMobile ? "bottom" : "right",
    barShape = "rounded",
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
          margin={{
            top: 20,
            right: isMobile ? 10 : 30,
            left: isMobile ? 10 : 20,
            bottom: isMobile ? 40 : 10,
          }}
          barCategoryGap={isMobile ? 10 : 25}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={0}
            angle={isMobile ? -30 : 0}
            textAnchor={isMobile ? "end" : "middle"}
          />
          <YAxis
            tick={{ fontSize: isMobile ? 10 : 12 }}
            label={{
              value: graphProps.yAxisTitle || "Value",
              angle: -90,
              position: "insideLeft",
              fontSize: isMobile ? 10 : 12,
            }}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
          />
          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={seriesColors[index % seriesColors.length]}
              radius={barShape === "rounded" ? [4, 4, 0, 0] : 0}
              barSize={isMobile ? 20 : 30}
            >
              {dataLabels && (
                <LabelList
                  dataKey={`${key}_label`}
                  position="center"
                  style={{
                    fill: "white",
                    fontSize: isMobile ? 10 : 12,
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

export default StackedColumns100;
