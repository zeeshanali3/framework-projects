import React from "react";
import { Box, Alert, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const DoughnutChartGraph = ({ data, config, appearance }) => {
  const graph = data?.features?.graph;
  const chartData = graph?.data;
  const chartTitle = graph?.title || "Doughnut Chart";

  if (!config || !Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Box sx={{ padding: "15px", mb: "10px", minHeight: "160px" }}>
        <Alert severity="warning">
          No data or graph configuration found.
        </Alert>
      </Box>
    );
  }

  const donutLabels = chartData.map(
    (item, idx) => item.label?.toString() || `Label ${idx + 1}`
  );
  const donutValues = chartData.map((item) => {
    const val = item.value;
    return typeof val === "number" ? val : parseFloat(val) || 0;
  });
  const donutColors = chartData.map(
    (item, idx) => item.color || getFallbackColor(idx)
  );

  function getFallbackColor(index) {
    const defaultColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
    return defaultColors[index % defaultColors.length];
  }

  const donutChartOptions = {
    chart: { type: "donut" },
    labels: donutLabels,
    colors: donutColors,
    legend: { show: false },
    tooltip: {
      custom: function ({ series, seriesIndex, w }) {
        const label = w?.config?.labels?.[seriesIndex] || "";
        const value = series?.[seriesIndex] ?? 0;
        return `<div style="padding: 5px; font-size: 11px;"><strong>${label}</strong>: ${value}</div>`;
      },
    },
    plotOptions: { pie: { donut: { size: "45%" } } },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { width: 150 } },
      },
    ],
  };

  const height = 160;

  return (
    <Box sx={{ padding: "10px", mb: "10px", mt: "5px", minHeight: `${height}px` }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontSize: "13px" }}>
        {chartTitle}
      </Typography>
      <ReactApexChart
        options={donutChartOptions}
        series={donutValues}
        type="donut"
        height={height}
      />
    </Box>
  );
};

export default DoughnutChartGraph;
