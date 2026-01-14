import React, { useState, useEffect } from 'react';
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });
import Chart from "react-apexcharts"
import { useTheme } from '@mui/material';

const RatingsChart = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const [chartData, setChartData] = useState({
    series: data?.series || [],
    labels: data?.labels || [],
  });
  
  // Chart options with theme support
  const chartOptions = {
    chart: {
      width: 300,
      background: 'transparent',
    },
    colors: ["#757FEF", "#00B69B", "#2DB6F5", "#EE368C", "#FFBC2B"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      show: false,
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      },
      labels: {
        colors: isDarkMode ? theme.palette.text.primary : undefined
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    theme: {
      mode: isDarkMode ? 'dark' : 'light'
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light'
    }
  };

  // Update chart data when props change
  useEffect(() => {
    if (data) {
      setChartData({
        series: data.series || [],
        labels: data.labels || [],
      });
    }
  }, [data]);

  return (
    <>
      {chartData.series && chartData.series.length > 0 && (
        <Chart
          options={{ ...chartOptions, labels: chartData.labels }} 
          series={chartData.series}
          height={150}
          type="donut"
        />
      )}
    </>
  );
};

export default RatingsChart;
