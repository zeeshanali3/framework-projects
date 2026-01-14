import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const NegativeAreaChart = ({ data, config, appearance }) => {
  // Guard: agar config missing ho to render hi na ho
  if (!data?.features?.graph?.data?.length || !config?.features) {
    return (
      <Box sx={{ padding: "20px", color: "red" }}>
        ⚠️ Config required to render Negative Area Chart.
      </Box>
    );
  }

  const graphData = data?.features?.graph?.data || [];
  const xAxis = data?.features?.graph?.xAxisValue || "x";
  const yAxis = data?.features?.graph?.yAxisValue || "y";
  const chartTitle = data?.features?.graph?.title || "Negative Area Chart";

  const series = graphData.map((item) => ({
    name: item.category,
    data: item.values.map((val) => ({ x: val[xAxis], y: val[yAxis] })),
  }));

  const chartAppearance = appearance?.features?.graph?.[0] || {};
  const seriesColors =
    chartAppearance.seriesColors || ["#008FFB", "#FF4560"];

  const isMobile = window.innerWidth < 600;
  const isTablet = window.innerWidth >= 600 && window.innerWidth < 900;

  const options = {
    chart: {
      type: "area",
      zoom: { enabled: config.features.zoom ?? false },
      toolbar: { show: config.features.toolbar ?? false },
    },
    dataLabels: { enabled: config.features.dataLabels ?? false },
    stroke: {
      curve: chartAppearance.curve || "smooth",
    },
    title: {
      text: chartTitle,
      align: config.features.titleAlign || "left",
      style: {
        fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
        color: chartAppearance.titleColor || "#000",
      },
    },
    xaxis: {
      type: config.features.xAxisType || "datetime",
      labels: {
        style: { fontSize: isMobile ? "10px" : "12px" },
      },
      axisBorder: { show: config.features.axisBorder ?? false },
      axisTicks: { show: config.features.axisTicks ?? false },
    },
    yaxis: {
      tickAmount: chartAppearance.tickAmount || 4,
      floating: false,
      labels: {
        style: {
          fontSize: isMobile ? "10px" : "12px",
          colors: chartAppearance.yAxisColor || "#8e8da4",
        },
        offsetY: -7,
        offsetX: 0,
      },
      axisBorder: { show: config.features.axisBorder ?? false },
      axisTicks: { show: config.features.axisTicks ?? false },
    },
    fill: {
      opacity: chartAppearance.opacity || 0.5,
    },
    tooltip: {
      x: {
        format: chartAppearance.tooltipFormat || "yyyy",
      },
      fixed: { enabled: false, position: "topRight" },
    },
    colors: seriesColors,
    grid: {
      yaxis: {
        lines: { offsetX: -30 },
      },
      padding: {
        left: isMobile ? 10 : 20,
        right: isMobile ? 10 : 20,
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { height: 300 } },
      },
      {
        breakpoint: 900,
        options: { chart: { height: 350 } },
      },
    ],
  };

  const height = isMobile ? 300 : isTablet ? 370 : 400;

  return (
    <Box
      sx={{
        padding: isMobile ? "15px" : "25px",
        mb: "15px",
        minHeight: `${height}px`,
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={height}
      />
    </Box>
  );
};

export default NegativeAreaChart;
