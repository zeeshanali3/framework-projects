import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonochromePieChart = ({ data, config, appearance }) => {
  const graphProps = data?.features?.graph;
  const configProps = config?.features?.graph;
  const appearanceProps = appearance?.features?.graph?.[0];

  if (
    !graphProps?.title ||
    !Array.isArray(graphProps?.labels) ||
    graphProps.labels.length === 0 ||
    !Array.isArray(graphProps?.data) ||
    graphProps.data.length === 0 ||
    !configProps ||
    !appearanceProps
  ) {
    return (
      <Alert severity="warning">
        Missing required props for Monochrome Pie Chart.
      </Alert>
    );
  }

  const { title, labels, data: seriesData } = graphProps;
  const series = seriesData[0];
  const values = series?.values || [];

  const {
    height,
    fillOpacity,
    strokeWidth,
    legendPosition,
    themeMonochrome,
    responsiveBreakpoints = [],
  } = appearanceProps;

  // 🔹 Format data for recharts
  const formattedData = labels.map((label, i) => ({
    name: label,
    value: values[i] ?? 0,
  }));

  // 🔹 Responsive adjustments (based on provided breakpoints)
  const responsiveHeight =
    responsiveBreakpoints.find((bp) => window.innerWidth <= bp.breakpoint)
      ?.width || height;

  return (
    <Box sx={{ padding: "20px", mb: "15px", minHeight: `${responsiveHeight}px` }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: "14px",
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height={responsiveHeight}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={120}
            strokeWidth={strokeWidth}
            label
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={themeMonochrome?.enabled ? "#008FFB" : "#ccc"} // monochrome mode
                fillOpacity={fillOpacity}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign={legendPosition} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonochromePieChart;
