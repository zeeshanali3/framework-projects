import React from "react";
import { Card, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const PatternedDonutChart = ({ data, config, appearance }) => {
  // Check if any required prop or field is missing
  const graphProps = data?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0];

  if (
    !data ||
    !config ||
    !appearance ||
    !graphProps ||
    !graphProps.labels ||
    !graphProps.data?.[0]?.values ||
    !appearanceProps
  ) {
    return (
      <Card sx={{ p: "20px", borderRadius: "10px", textAlign: "center" }}>
        <Typography variant="body1" color="error">
          Graph data or appearance props are missing. Unable to render chart.
        </Typography>
      </Card>
    );
  }

  // Extract props
  const title = graphProps.title || "Patterned Donut Chart";
  const labels = graphProps.labels;
  const series = graphProps.data[0].values;

  const fontSize = appearanceProps.fontSize || "14px";
  const height = appearanceProps.height || 380;

  const innerRadius = "50%";
  const outerRadius = "100%";

  const patterns = [
    "url(#pattern-stripe)",
    "url(#pattern-dots)",
    "url(#pattern-lines)",
    "url(#pattern-grid)",
    "url(#pattern-zigzag)",
  ];

  const chartData = labels.map((label, index) => ({
    name: label,
    value: series[index] || 0,
    pattern: patterns[index % patterns.length],
  }));

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize,
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <defs>
            <pattern
              id="pattern-stripe"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
            >
              <path d="M0 0 L6 6 M-1 1 L1 -1 M5 7 L7 5" stroke="#008FFB" strokeWidth="1" />
            </pattern>
            <pattern
              id="pattern-dots"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
            >
              <circle cx="5" cy="5" r="2" fill="#00E396" />
            </pattern>
            <pattern
              id="pattern-lines"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
            >
              <path d="M0 0 L0 4" stroke="#FEB019" strokeWidth="2" />
            </pattern>
            <pattern
              id="pattern-grid"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <rect width="4" height="4" fill="#FF4560" />
            </pattern>
            <pattern
              id="pattern-zigzag"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
            >
              <path d="M0 3 L3 0 L6 3 L3 6 Z" fill="#775DD0" />
            </pattern>
          </defs>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.pattern} />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PatternedDonutChart;
