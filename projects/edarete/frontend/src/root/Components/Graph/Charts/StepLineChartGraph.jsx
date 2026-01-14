import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const StepLineChartGraph = ({ data, appearance, config }) => {
  // ✅ If no config, don't render anything
  if (!config) return null;

  // Destructure config
  const { viewModes, features } = config;
  if (!features?.graph) return null; // Only show if graph feature is true
  const chartType = viewModes?.presentation;
  if (chartType !== "steplineChart") return null; // Only render steplineChart

  // Destructure from data.features.graph
  const graph = data?.features?.graph;
  if (!graph) return null;

  const chartData = graph.data || [];
  const xAxisValue = graph.xAxisValue || "";
  const yAxisValue = graph.yAxisValue || "";
  const title = graph.title || "";

  // Appearance settings
  const graphAppearance = appearance?.features?.graph?.[0] || {};
  const chartHeight = graphAppearance.height || 350;
  const chartWidth = graphAppearance.width || "100%";
  const seriesColors = graphAppearance.seriesColors || ["#008FFB"];
  const bgColor = graphAppearance.backgroundColor || "#fff";
  const textColor = graphAppearance.color || "#000";

  // Prepare data
  const categories = chartData.map((item) => item[xAxisValue]);
  const seriesData = chartData.map((item) => item[yAxisValue]);
  const series = [{ name: yAxisValue, data: seriesData }];

  // Chart options
  const options = {
    chart: { id: "stepline-chart", zoom: { enabled: false }, background: bgColor },
    stroke: { curve: "stepline" },
    dataLabels: { enabled: false },
    title: { text: title, align: "left", style: { color: textColor } },
    markers: { hover: { sizeOffset: 4 } },
    xaxis: { categories, labels: { style: { colors: textColor } } },
    yaxis: { labels: { style: { colors: textColor } } },
    colors: seriesColors,
  };

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: chartHeight, width: chartWidth }}>
      <ReactApexChart options={options} series={series} type="line" height={chartHeight} />
    </Box>
  );
};

export default StepLineChartGraph;
