import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, Typography } from "@mui/material";

const BasicRadialBarChart = ({ data, config, appearance }) => {
  // agar koi bhi missing ho → graph show nahi karega
  if (!data?.features?.graph || !config?.features?.graph || !appearance?.features?.graph) {
    return null;
  }

  const graphProps = data.features.graph;
  const appearanceProps = appearance.features.graph?.[0] || {};

  const title = graphProps.title;
  const labels = graphProps.labels;
  const series = graphProps.data?.[0]?.values;
  const label = labels?.[0];
  const value = series?.[0];

  // agar required props missing hain → graph show nahi karega
  if (!title || !labels || !series) {
    return null;
  }

  // responsive internally
  const width = window.innerWidth;
  const isMobile = width <= 480;
  const isTablet = width > 480 && width <= 768;

  const height = isMobile ? 220 : isTablet ? 280 : appearanceProps.height;
  const innerRadius = isMobile ? "50%" : isTablet ? "60%" : appearanceProps.innerRadius;
  const outerRadius = isMobile ? "80%" : isTablet ? "90%" : appearanceProps.outerRadius;
  const barSize = isMobile ? 8 : isTablet ? 12 : appearanceProps.barSize;
  const centerValueFontSize = isMobile ? 16 : isTablet ? 18 : 20;
  const centerLabelFontSize = isMobile ? 11 : 13;
  const padding = isMobile ? "15px" : "25px";

  const fillColor = appearanceProps.fillColor;
  const cornerRadius = appearanceProps.cornerRadius || 10;

  const chartData = [
    {
      name: label,
      value: value,
      fill: fillColor,
    },
  ];

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
          fontWeight: 500,
          fontSize: isMobile ? "13px" : "14px",
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          barSize={barSize}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={cornerRadius}
          />

          <Tooltip />

          {/* Custom center value */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={centerValueFontSize}
            fontWeight="bold"
          >
            {`${value}%`}
          </text>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={centerLabelFontSize}
            fill="#999"
          >
            {label}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BasicRadialBarChart;
