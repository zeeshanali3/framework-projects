import React from "react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { Card, Typography } from "@mui/material";

const CustomAngleCircle = ({ data, config, appearance }) => {
  if (!data?.features?.graph || !config?.features?.graph || !appearance?.features?.graph) {
    return (
      <Card sx={{ p: 3, textAlign: "center", mb: "15px", borderRadius: "10px" }}>
        <Typography variant="body2" color="error">
          Graph data/config/appearance missing!
        </Typography>
      </Card>
    );
  }

  const graphProps = data.features.graph;
  const appearanceProps = appearance.features.graph?.[0] || {};

  const width = window.innerWidth;
  const isMobile = width <= 480;
  const isTablet = width > 480 && width <= 768;

  const height = isMobile ? 240 : isTablet ? 300 : appearanceProps.height || 350;
  const innerRadius = isMobile ? "30%" : isTablet ? "40%" : appearanceProps.hollowSize || "50%";
  const outerRadius = isMobile ? "65%" : isTablet ? "80%" : "100%";
  const barSize = isMobile ? 6 : isTablet ? 8 : 10;

  const startAngle = appearanceProps.startAngle ?? 90;
  const endAngle = appearanceProps.endAngle ?? 270;
  const cornerRadius = appearanceProps.cornerRadius ?? 0;
  const fillColors = appearanceProps.fillColor || ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"];
  const showLegend = appearanceProps.showLegend ?? true;
  const legendPosition = appearanceProps.legendPosition || "left";
  const fontSize = parseInt(appearanceProps.fontSize) || 12;

  const title = graphProps?.title || "Custom Angle Circle";
  const series = graphProps?.data?.[0]?.values || [];
  const labels = graphProps?.labels || [];

  if (!series.length || !labels.length) {
    return (
      <Card sx={{ p: 3, textAlign: "center", mb: "15px", borderRadius: "10px" }}>
        <Typography variant="body2" color="error">
          Graph data missing!
        </Typography>
      </Card>
    );
  }

  const chartData = labels.map((label, index) => ({
    name: label,
    value: series[index] || 0,
    fill: fillColors[index % fillColors.length],
  }));

  // Legend alignment
  const legendAlign = isMobile ? "center" : legendPosition === "left" ? "right" : legendPosition;

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: isMobile ? "15px" : "25px",
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
          startAngle={startAngle}
          endAngle={endAngle}
          data={chartData}
        >
          <RadialBar
            background
            dataKey="value"
            clockWise
            cornerRadius={cornerRadius}
          />

          {showLegend && (
            <Legend
              iconSize={10}
              layout={isMobile ? "horizontal" : "vertical"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              align={legendAlign}
              wrapperStyle={{
                fontSize: fontSize,
                marginRight: isMobile ? 0 : -40,
              }}
            />
          )}

          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomAngleCircle;
