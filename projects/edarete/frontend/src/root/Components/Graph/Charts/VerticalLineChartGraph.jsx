import React from "react";
import { Card, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const VerticalLineChart = ({
  data,
  config,
  appearance,
  isMobile = false,
  isTablet = false,
}) => {
  if (!data || !config || !appearance) {
    return (
      <Card sx={{ p: 3, mb: 2 }}>
        <Typography variant="body1" color="error">
          Graph cannot be displayed. Missing required props.
        </Typography>
      </Card>
    );
  }

  const graphProps = data?.features?.graph || {};
  const appearanceProps = appearance?.features?.graph?.[0] || {};

  const {
    strokeColors = ["#8884d8", "#82ca9d"],
    showLegend = true,
    showGrid = true,
  } = appearanceProps;

  const aspect = isMobile ? undefined : isTablet ? 2 : 2.0 / 0.9;
  const chartHeight = isMobile ? 300 : undefined;
  const fontSize = isMobile ? "12px" : isTablet ? "13px" : "14px";
  const padding = isMobile ? "12px" : "25px";

  const title = graphProps?.title || "Vertical Line Chart";
  const labels = graphProps?.labels || [];
  const series = graphProps?.data || [];

  if (!labels.length || !series.length) {
    return (
      <Card sx={{ p: 3, mb: 2 }}>
        <Typography variant="body1" color="error">
          Graph cannot be displayed. No data available.
        </Typography>
      </Card>
    );
  }

  const chartData = labels.map((label, idx) => {
    const row = { name: label };
    series.forEach((s) => {
      row[s.name] = s.values[idx] || 0;
    });
    return row;
  });

  return (
    <Card sx={{ boxShadow: "none", borderRadius: "10px", p: padding, mb: "15px" }}>
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
        {...(aspect ? { aspect } : { height: chartHeight })}
      >
        <LineChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis type="number" tick={{ fontSize: isMobile ? 10 : 12 }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: isMobile ? 10 : 12 }} />
          <Tooltip />
          {showLegend && <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />}
          {series.map((s, i) => (
            <Line key={s.name} dataKey={s.name} stroke={strokeColors[i % strokeColors.length]} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VerticalLineChart;
