import React from "react";
import { Box, Alert } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const BoxPlotChartGraph = ({ data, config, appearance }) => {
  // Strict prop validation
  if (
    !data ||
    !data.features?.graph ||
    !Array.isArray(data.features.graph.data) ||
    data.features.graph.data.length === 0 ||
    !config ||
    !appearance
  ) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          Required props (data, config, or appearance) are missing or invalid.
        </Alert>
      </Box>
    );
  }

  const chartData = data.features.graph.data;
  const graph = data.features.graph;

  // Prepare series data for BoxPlot
  const boxPlotSeries = chartData.map((item) => {
    const sorted = [...item.values].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length / 4)];
    const median = sorted[Math.floor(sorted.length / 2)];
    const q3 = sorted[Math.floor((3 * sorted.length) / 4)];
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    return {
      x: item.name,
      y: [min, q1, median, q3, max],
    };
  });

  // ApexCharts options
  const boxPlotOption = {
    chart: {
      type: "boxPlot",
      toolbar: { show: config.toolbar ?? false },
    },
    title: {
      text: graph.title || config.title || "Box Plot Chart",
      align: config.titleAlign || "center",
      style: {
        color: appearance.features.graph.titleColor,
        fontSize: appearance.features.graph.titleFontSize,
      },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: appearance.features.graph.xAxisColor,
        },
      },
    },
    yaxis: {
      title: {
        text: graph.yAxisValue || config.yAxisTitle || "Values",
        style: {
          color: appearance.features.graph.yAxisColor,
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: appearance.features.graph.upperColor,
          lower: appearance.features.graph.lowerColor,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ReactApexChart
        options={boxPlotOption}
        series={[{ name: "BoxPlot", data: boxPlotSeries }]}
        type="boxPlot"
        height={350}
      />
    </Box>
  );
};

export default BoxPlotChartGraph;
