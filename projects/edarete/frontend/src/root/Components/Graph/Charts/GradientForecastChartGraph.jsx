import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const GradientForecastChart = ({ data, appearance, config }) => {
  if (!config?.features?.graph || !data?.features?.graph) return null;

  const graph = data.features.graph;
  const chartData = graph.data || [];
  const xAxisValue = graph.xAxisValue || "";
  const yAxisValue = graph.yAxisValue || "";
  const title = graph.title || "";

  const chartHeight = appearance?.features?.graph?.[0]?.height || 350;
  const chartWidth = appearance?.features?.graph?.[0]?.width || "100%";
  const seriesColors = appearance?.features?.graph?.[0]?.seriesColors || ["#008FFB"];
  const gradientToColors = appearance?.features?.graph?.[0]?.gradientToColors || ["#FDD835"];
  const bgColor = appearance?.features?.graph?.[0]?.backgroundColor || "#fff";
  const textColor = appearance?.features?.graph?.[0]?.color || "#666";
  const yAxisMin = appearance?.features?.graph?.[0]?.yAxisMin ?? -10;
  const yAxisMax = appearance?.features?.graph?.[0]?.yAxisMax ?? 40;

  const categories = chartData.map((item) => item[xAxisValue]);
  const seriesData = chartData.map((item) => item[yAxisValue]);
  const series = [{ name: yAxisValue, data: seriesData }];

  const options = {
    chart: { id: "gradient-forecast-chart", background: bgColor, zoom: { enabled: false } },
    forecastDataPoints: { count: 7 },
    stroke: { width: 5, curve: "smooth", colors: seriesColors },
    xaxis: {
      type: "datetime",
      categories,
      tickAmount: 10,
      labels: {
        style: { colors: textColor },
        formatter: (value) => {
          const date = new Date(value);
          return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
        },
      },
    },
    yaxis: {
      min: yAxisMin,
      max: yAxisMax,
      labels: { style: { colors: textColor } },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors,
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    title: {
      text: title,
      align: "left",
      style: { fontSize: "16px", color: textColor },
    },
  };

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: chartHeight, width: chartWidth }}>
      <ReactApexChart options={options} series={series} type="line" height={chartHeight} />
    </Box>
  );
};

export default GradientForecastChart;
