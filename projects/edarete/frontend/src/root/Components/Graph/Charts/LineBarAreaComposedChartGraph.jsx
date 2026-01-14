import React from "react";
import {
  Card,
  Typography
} from "@mui/material";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Bar,
  Line,
  Scatter
} from "recharts";

const LineBarAreaComposedChart = ({ data, config, appearance }) => {
  if (!data?.features?.graph || !config?.features?.graph || !appearance?.features?.graph?.[0]) {
    return null;
  }

  const graphProps = data.features.graph;
  const appearanceProps = appearance.features.graph[0];

  const {
    showGrid = true,
    showTooltip = true,
    strokeColors = {},
    fillColors = {},
    fontSize = "14px",
    barSize = 20,
    padding = "25px",
    aspect,
    height
  } = appearanceProps;

  const title = graphProps.title || "Line Bar Area Composed Chart";
  const labels = graphProps.labels || [];
  const series = graphProps.data || [];
  const xAxisKey = graphProps.xAxisKey || "name";

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
        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {showGrid && <CartesianGrid stroke="#f5f5f5" />}
          <XAxis dataKey={xAxisKey} scale="band" tick={{ fontSize }} />
          <YAxis tick={{ fontSize }} />
          {showTooltip && <Tooltip />}
          <Legend wrapperStyle={{ fontSize }} />

          {series.map((s) => {
            switch (s.type) {
              case "area":
                return (
                  <Area
                    key={s.name}
                    type="monotone"
                    dataKey={s.name}
                    stroke={strokeColors[s.name] || "#000"}
                    fill={fillColors[s.name] || "#ccc"}
                  />
                );
              case "bar":
                return (
                  <Bar
                    key={s.name}
                    dataKey={s.name}
                    barSize={barSize}
                    fill={fillColors[s.name] || "#ccc"}
                  />
                );
              case "line":
                return (
                  <Line
                    key={s.name}
                    type="monotone"
                    dataKey={s.name}
                    stroke={strokeColors[s.name] || "#000"}
                  />
                );
              case "scatter":
                return (
                  <Scatter
                    key={s.name}
                    dataKey={s.name}
                    fill={strokeColors[s.name] || "red"}
                  />
                );
              default:
                return null;
            }
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineBarAreaComposedChart;
