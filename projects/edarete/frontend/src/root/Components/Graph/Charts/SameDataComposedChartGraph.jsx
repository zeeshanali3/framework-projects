import React from "react";
import { Card, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";

const SameDataComposedChart = ({ data, config, appearance }) => {
  // If any prop is missing, show fallback message
  if (!data || !config || !appearance) {
    return (
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: 500 }}>
          Missing Data, Config, or Appearance. Chart cannot be displayed.
        </Typography>
      </Card>
    );
  }

  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0] || {};

  const {
    height = 400,
    barSize = 20,
    fontSize = "14px",
    strokeColors = {},
    fillColors = {},
    aspect = 2.0 / 0.9,
    showGrid = true,
    showTooltip = true,
  } = appearanceProps;

  const title = graphProps?.title || "Same Data Composed Chart";
  const labels = graphProps?.labels || [];
  const series = graphProps?.data || [];
  const xAxisKey = graphProps?.xAxisKey || "name";

  const chartData = labels.map((label, i) => {
    const entry = { [xAxisKey]: label };
    series.forEach((s) => {
      entry[s.name] = s.values[i] || 0;
    });
    return entry;
  });

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
        height,
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

      <ResponsiveContainer width="100%" aspect={aspect}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {showGrid && <CartesianGrid stroke="#f5f5f5" />}
          <XAxis dataKey={xAxisKey} scale="band" />
          <YAxis />
          {showTooltip && <Tooltip />}
          <Legend />

          {series.map((s, idx) => {
            const key = `${s.name}_${s.type}_${idx}`;
            switch (s.type) {
              case "bar":
                return <Bar key={key} dataKey={s.name} barSize={barSize} fill={fillColors[s.name] || "#ccc"} />;
              case "line":
                return <Line key={key} type="monotone" dataKey={s.name} stroke={strokeColors[s.name] || "#000"} />;
              default:
                return null;
            }
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SameDataComposedChart;
