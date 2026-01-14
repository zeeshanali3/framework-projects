
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Alert } from "@mui/material";

const PieChartGraph = ({ data, config, appearance }) => {
  // Check if all props exist
  if (!data || !config || !appearance) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Missing props. Graph cannot be rendered without data, config, and appearance.
        </Alert>
      </Box>
    );
  }

  const chartData = data?.features?.graph?.data;

  // Validate chart data and graph feature flag
  if (
    !Array.isArray(chartData) ||
    chartData.length === 0 ||
    !config?.features?.graph
  ) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found or graph configuration is missing.
        </Alert>
      </Box>
    );
  }

  const dataKey = data?.features?.graph?.result;
  const nameKey = data?.features?.graph?.xAxisValue;

  // Get default color
  const defaultColor =
    appearance?.features?.graph?.[0]?.color || "blue";

  return (
    <Box
      sx={{
        padding: "25px",
        mb: "15px",
        minHeight: "350px",
        backgroundColor: appearance?.features?.graph?.[0]?.backgroundColor || "white",
      }}
    >
      <ResponsiveContainer width={appearance?.features?.graph?.[0]?.width || "100%"} height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill={defaultColor}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.color ||
                  defaultColor
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartGraph;
