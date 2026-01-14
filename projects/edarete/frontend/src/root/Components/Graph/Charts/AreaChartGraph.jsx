import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area
} from "recharts";
import { Box, Alert } from "@mui/material";

const AreaChartGraph = ({ data, config, appearance }) => {
  const chartData = data?.features?.graph?.data;

  // Validate props and data
  if (
    !data ||
    !config ||
    !appearance ||
    !Array.isArray(chartData) ||
    chartData.length === 0 ||
    !data?.features?.graph
  ) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or one of the required props (data, config, appearance) is missing.
        </Alert>
      </Box>
    );
  }

  const strokeColor = appearance?.features?.graph?.barColor || "#007bff";
  const fillColor = appearance?.features?.graph?.fillColor || strokeColor;
  const gridStroke = appearance?.features?.graph?.gridStroke || "#e0e0e0";
  const chartWidth = appearance?.features?.graph?.width || "100%";
  const chartHeight = appearance?.features?.graph?.height || 300;
  const animationActive = config?.features?.graphAnimation || false;

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ResponsiveContainer width={chartWidth} height={chartHeight}>
        <AreaChart
          data={chartData}
          margin={config?.features?.margin || { top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {config?.features?.showGrid !== false && <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />}
          <XAxis dataKey={data?.features?.graph?.xAxisValue} />
          <YAxis dataKey={data?.features?.graph?.yAxisValue} />
          {config?.features?.showTooltip !== false && <Tooltip />}
          {config?.features?.showLegend !== false && <Legend />}
          <Area
            type={config?.features?.areaType || "monotone"}
            dataKey={data?.features?.graph?.result}
            stroke={strokeColor}
            fill={fillColor}
            isAnimationActive={animationActive}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AreaChartGraph;
