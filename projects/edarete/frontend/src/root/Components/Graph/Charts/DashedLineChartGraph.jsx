import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const DashedLineChart = ({ data, config, appearance }) => {
  if (!config?.features?.graph || !data?.features?.graph) return null;

  const graph = data?.features?.graph;
  const graphData = graph?.data || [];

  const xAxis = graph?.xAxisValue || "date";
  const yAxis = graph?.yAxisValue || "value";
  const chartTitle = graph?.title || "Dashed Line Chart";

  // Prepare categories & series
  const categories = graphData[0]?.values?.map((item) => item[xAxis]) || [];
  const series = graphData.map((item) => ({
    name: item.category,
    data: item.values.map((val) => val[yAxis]),
  }));

  const appearanceGraph = appearance?.features?.graph?.[0] || {};
  const strokeStyles = appearanceGraph.strokeStyles || {
    width: [5, 7, 5],
    dashArray: [0, 8, 5],
  };
  const seriesColors = appearanceGraph.seriesColors || [
    "#008FFB",
    "#00E396",
    "#FEB019",
  ];
  const chartHeight = appearanceGraph.height || 350;
  const chartWidth = appearanceGraph.width || "100%";
  const textColor = appearanceGraph.color || "#666";

  const configFeatures = config?.features || {};

  const options = {
    chart: {
      type: "line",
      zoom: { enabled: configFeatures.zoom ?? false },
      toolbar: { show: configFeatures.toolbar ?? false },
    },
    dataLabels: { enabled: configFeatures.dataLabels ?? false },
    stroke: {
      width: strokeStyles.width,
      curve: configFeatures.curve || "straight",
      dashArray: strokeStyles.dashArray,
    },
    colors: seriesColors,
    title: {
      text: chartTitle,
      align: configFeatures.titleAlign || "left",
      style: { fontSize: "16px", color: textColor },
    },
    legend: configFeatures.legend || {
      position: "top",
      horizontalAlign: "right",
      floating: false,
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
        );
      },
    },
    markers: configFeatures.markers || {
      size: 0,
      hover: { sizeOffset: 6 },
    },
    xaxis: {
      categories,
      labels: configFeatures.xaxis?.labels || {
        style: { fontSize: "12px" },
        formatter: (value) => value,
      },
    },
    tooltip: configFeatures.tooltip || {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, opts) {
          const seriesName = opts.w.globals.seriesNames[opts.seriesIndex];
          if (seriesName === "Session Duration") return `${val} (mins)`;
          if (seriesName === "Page Views") return `${val} per session`;
          return val;
        },
      },
    },
    grid: configFeatures.grid || { borderColor: "#f1f1f1" },
    responsive: configFeatures.responsive || [
      {
        breakpoint: 768,
        options: {
          chart: { height: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: "25px",
        mb: "15px",
        minHeight: chartHeight,
        width: chartWidth,
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={chartHeight}
        width={chartWidth}
      />
    </Box>
  );
};

export default DashedLineChart;
