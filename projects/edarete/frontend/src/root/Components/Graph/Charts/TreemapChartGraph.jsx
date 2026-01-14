import React from "react";
import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { Box, Alert } from "@mui/material";

const TreemapChartGraph = ({ data, config, appearance }) => {
  if (!data || !config || !appearance) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Missing required props: data, config, or appearance.
        </Alert>
      </Box>
    );
  }

  const chartData = data?.features?.graph?.data;
  const dataKey = config?.features?.graph?.dataKey || data?.features?.graph?.result;
  const nameKey = config?.features?.graph?.nameKey || data?.features?.graph?.xAxisValue;
  const fillColor = appearance?.features?.graph?.barColor || "#007bff";
  const strokeColor = appearance?.features?.graph?.strokeColor || "#fff";

  // Validate chart data and keys
  const isValid = Array.isArray(chartData) && chartData.length > 0 && dataKey && nameKey;

  if (!isValid) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          stroke={strokeColor}
          fill={fillColor}
          isAnimationActive={false}
        >
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
        </Treemap>
      </ResponsiveContainer>
    </Box>
  );
};

export default TreemapChartGraph;
