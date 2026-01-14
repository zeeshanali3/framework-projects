
// import React from "react";
// import { Box, Typography, Stack, Alert } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// export default function PolarAreaChartGraph({ data, config, appearance }) {
//   const graph = data?.features?.graph || {};
//   const chartData = graph?.data || [];

//   if (!Array.isArray(chartData) || chartData.length === 0) {
//     return (
//       <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
//         <Typography sx={{ fontSize: 16 }}>
//           <Stack sx={{ width: "100%" }} spacing={2}>
//             <Alert severity="error">No data found</Alert>
//           </Stack>
//         </Typography>
//       </Box>
//     );
//   }

//   const options = {
//     labels: chartData.map(
//       (item) => item[graph.xAxisValue] || "Unnamed"
//     ),
//     legend: {
//       show: true,
//       position: "bottom",
//     },
//     tooltip: {
//       enabled: true,
//       fillSeriesColor: false,
//       y: {
//         formatter: (val) => val,
//       },
//     },
//     dataLabels: {
//       enabled: true,
//     },
//     // appearance se background color add karna (agar diya ho)
//     chart: {
//       background: appearance?.features?.graph?.[0]?.backgroundColor || "#fff",
//     }
//   };

//   const series = chartData.map((item) => item[graph.result] || 0);

//   return (
//     <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
//       <ReactApexChart options={options} series={series} type="polarArea" />
//     </Box>
//   );
// }
import React from "react";
import { Box, Typography, Stack, Alert } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export default function PolarAreaChartGraph({ data, config, appearance }) {
  // Required props check
  const isValidData =
    data &&
    data.features &&
    data.features.graph &&
    Array.isArray(data.features.graph.data) &&
    data.features.graph.data.length > 0 &&
    data.features.graph.xAxisValue &&
    data.features.graph.result;

  const isValidConfig = config && config.viewModes && config.features?.graph;
  const isValidAppearance =
    appearance && appearance.features && Array.isArray(appearance.features.graph);

  // If any required prop is missing or invalid, show alert
  if (!isValidData || !isValidConfig || !isValidAppearance) {
    return (
      <Box
        sx={{
          padding: {
            xs: "16px",
            sm: "24px",
            md: "32px",
            lg: "40px",
            xl: "78px",
          },
          mb: "15px",
          minHeight: "350px",
        }}
      >
        <Typography sx={{ fontSize: 16 }}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              No data found or required props are missing
            </Alert>
          </Stack>
        </Typography>
      </Box>
    );
  }

  const graph = data.features.graph;
  const chartData = graph.data;

  const options = {
    chart: {
      type: "polarArea",
      background:
        appearance.features.graph[0]?.backgroundColor || "#fff",
    },
    labels: chartData.map((item) => item[graph.xAxisValue] || "Unnamed"),
    legend: {
      show: true,
      position: "bottom",
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      y: {
        formatter: (val) => val,
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: appearance.features.graph[0]?.colors || [
      "#FF4566",
      "#008FF5",
      "#00E390",
      "#775DD6",
      "#FEB013",
    ],
  };

  const series = chartData.map((item) => item[graph.result] || 0);

  return (
    <Box
      sx={{
        padding: {
          xs: "16px",
          sm: "24px",
          md: "32px",
          lg: "40px",
          xl: "78px",
        },
        mb: "15px",
        minHeight: "350px",
      }}
    >
      <ReactApexChart options={options} series={series} type="polarArea" />
    </Box>
  );
}
