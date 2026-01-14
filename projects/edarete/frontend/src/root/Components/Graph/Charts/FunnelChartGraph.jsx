import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip
} from "recharts";
import { Box, Alert } from "@mui/material";

const FunnelChartGraph = ({ data, config, appearance }) => {
  const chartData = data?.features?.graph?.data;

  // Ensure all three props exist and data is valid
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

  const barColor = appearance?.features?.graph?.barColor || "#007bff";
  const bgColor = appearance?.features?.graph?.backgroundColor || "white";
  const chartWidth = appearance?.features?.graph?.width || "100%";
  const chartHeight = appearance?.features?.graph?.height || 300;

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px", backgroundColor: bgColor }}>
      <ResponsiveContainer width={chartWidth} height={chartHeight}>
        <FunnelChart>
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          <Funnel
            dataKey={data?.features?.graph?.result}
            nameKey={data?.features?.graph?.xAxisValue}
            data={chartData}
            fill={barColor}
            isAnimationActive={config?.features?.graphAnimation || false}
          >
            <LabelList
              position="right"
              dataKey={data?.features?.graph?.xAxisValue}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FunnelChartGraph;
