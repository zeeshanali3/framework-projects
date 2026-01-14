import React from "react";
import { Box, Alert } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CandlestickChartGraph = ({ data, config, appearance }) => {
  const graph = data?.features?.graph || {};
  const chartData = graph?.data || [];
  const appearanceProps = appearance?.features?.graph || {};

  if (!config) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="error">
          Graph configuration is missing. Please provide config.
        </Alert>
      </Box>
    );
  }

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
        <Alert severity="warning">
          No data found for the candlestick chart.
        </Alert>
      </Box>
    );
  }

  const series = [
    {
      data: chartData.map((item) => ({
        x: item[graph.xAxisValue] || item.x,
        y: graph.yAxisValue?.map((key) => item[key]),
      })),
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      ...(config?.chart || {}),
    },
    title: {
      text: graph.title || config?.title || "Candlestick chart",
      align: "left",
      ...(config?.titleOptions || {}),
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM",
          day: "dd",
        },
      },
      ...(config?.xaxis || {}),
    },
    yaxis: {
      tooltip: { enabled: true },
      ...(config?.yaxis || {}),
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: appearanceProps.candleUpColor || "#26a69a",
          downward: appearanceProps.candleDownColor || "#ef5350",
        },
        ...(config?.plotOptions?.candlestick || {}),
      },
    },
    tooltip: {
      shared: true,
      ...(config?.tooltip || {}),
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const ohlc =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
        return `
          <div style="padding:5px">
            <b>Date:</b> ${
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].x
            }<br/>
            <b>Open:</b> ${ohlc[0]}<br/>
            <b>High:</b> ${ohlc[1]}<br/>
            <b>Low:</b> ${ohlc[2]}<br/>
            <b>Close:</b> ${ohlc[3]}
          </div>
        `;
      },
    },
  };

  return (
    <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </Box>
  );
};

export default CandlestickChartGraph;
