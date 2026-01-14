

import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const SplineChart = ({ data, config, appearance }) => {
  // ✅ Check if config is missing → don't render
  if (!data?.features?.graph?.data?.length || !config?.features) {
    return <Box sx={{ padding: "20px", color: "red" }}>
      ⚠️ Graph cannot render without config.
    </Box>;
  }

  const graphData = data?.features?.graph?.data || [];
  const xAxis = data?.features?.graph?.xAxisValue || "datetime";
  const yAxis = data?.features?.graph?.yAxisValue || "value";
  const chartTitle = data?.features?.graph?.title || "Spline Chart";

  const categories = graphData[0]?.values.map((item) => item[xAxis]) || [];

  const series = graphData.map((item) => ({
    name: item.category,
    data: item.values.map((val) => val[yAxis]),
  }));

  const chartAppearance = appearance?.features?.graph?.[0] || {};

  const options = {
    chart: {
      zoom: { enabled: config.features.zoom ?? false },
      background: chartAppearance.backgroundColor || "#fff",
      toolbar: { show: config.features.toolbar ?? false },
    },
    dataLabels: { enabled: config.features.dataLabels ?? false },
    stroke: {
      curve: chartAppearance.strokeCurve || "smooth",
      width: config.features.strokeWidth || 3,
    },
    colors: chartAppearance.seriesColors || ["#008FFB", "#00E396", "#FEB019"],
    title: {
      text: chartTitle,
      align: config.features.titleAlign || "left",
      style: { fontSize: "16px", color: chartAppearance.color || "#000" },
    },
    legend: {
      show: config.features.legend ?? true,
    },
    xaxis: {
      categories,
      title: { text: xAxis },
    },
    yaxis: {
      title: { text: yAxis },
    },
    tooltip: {
      shared: config.features.tooltipShared ?? true,
      intersect: false,
    },
    grid: {
      borderColor: chartAppearance.gridColor || "#f1f1f1",
    },
  };

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={appearance?.features?.height || 350}
      />
    </Box>
  );
};

export default SplineChart;
