import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Alert } from "@mui/material";

const RadarChartGraph = ({ data, config, appearance }) => {
  const chartData = data?.features?.graph?.data;
  const xAxisValue = data?.features?.graph?.xAxisValue;
  const resultKey = data?.features?.graph?.result;

  // Only require these essential props to exist
  if (!data || !config || !appearance || !chartData || !xAxisValue || !resultKey) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Missing props or invalid graph configuration.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey={xAxisValue} />
          <PolarRadiusAxis />
          <Radar
            name={config?.viewMode?.presentation || "Radar"}
            dataKey={resultKey}
            stroke={appearance?.features?.graph?.color || "blue"}
            fill={appearance?.features?.graph?.barColor || "blue"}
            fillOpacity={0.6}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RadarChartGraph;
