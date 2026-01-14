import React from "react";
import { Box, Stack, Alert } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ColorPieChartGraph = ({ data, config, appearance }) => {
  // Check if all required props exist
  const hasAllProps = data && config && appearance;
  const chartData = data?.features?.graph?.data;

  if (!hasAllProps || !Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning">
            {hasAllProps
              ? "No data found for the graph."
              : "Graph cannot be displayed. Missing required prop(s)."}
          </Alert>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={data.features.graph.result}
            nameKey={data.features.graph.xAxisValue}
            cx="50%"
            cy="50%"
            outerRadius="95%"
            innerRadius="65%"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  appearance?.features?.graph?.[0]?.colors?.[index] ||
                  ["#FF4560", "#008FFB", "#00E396", "#FEB019", "#775DD0"][
                    index % 5
                  ]
                }
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#f4f4f4",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
            }}
            itemStyle={{
              color: "#333",
              fontWeight: "bold",
            }}
          />
          <Legend
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              marginTop: "20px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ColorPieChartGraph;
