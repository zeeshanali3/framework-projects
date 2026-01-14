// StackedAreaChart.jsx
import React from "react";
import { Card, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StackedAreaChart = ({ data, config, appearance }) => {
  // Check if all required props exist
  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0];

  if (!graphProps || !config?.viewModes?.presentation || !appearanceProps) {
    return (
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "20px",
          mb: "15px",
        }}
      >
        <Typography variant="body1" color="error">
          Missing required graph props. 
        </Typography>
      </Card>
    );
  }

  const {
    title = "Stacked Area Chart",
    labels = [],
    xAxisKey = "name",
    data: series = [],
  } = graphProps;

  const {
    strokeColors = ["#8884d8", "#82ca9d", "#ffc658"],
    fillColors = ["#8884d8", "#82ca9d", "#ffc658"],
    showGrid = true,
    showTooltip = true,
    fontSize = "14px",
    padding = "20px",
    aspect,
    height = 400,
  } = appearanceProps;

  // Prepare chart data
  const chartData = labels.map((label, index) => {
    const entry = { [xAxisKey]: label };
    series.forEach((s) => {
      entry[s.name] = s.values[index] ?? 0;
    });
    return entry;
  });

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: padding,
        mb: "15px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize,
          fontWeight: 500,
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer
        width="100%"
        {...(aspect ? { aspect } : { height })}
      >
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey={xAxisKey} tick={{ fontSize }} />
          <YAxis tick={{ fontSize }} />
          {showTooltip && <Tooltip />}
          <Legend wrapperStyle={{ fontSize }} />
          {series.map((s, i) => (
            <Area
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stackId="1"
              stroke={strokeColors[i % strokeColors.length]}
              fill={fillColors[i % fillColors.length]}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StackedAreaChart;
