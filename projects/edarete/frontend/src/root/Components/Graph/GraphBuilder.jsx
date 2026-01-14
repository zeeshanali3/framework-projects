import React, { useEffect, useState,} from "react";
import Alert from "@mui/material/Alert";
import {  Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { getServerResponse } from "../Helpers/getServerResponse";
import BarChartGraph from "./Charts/BarChart";
import PolarAreaChartGraph from "./Charts/PolarAreaChartGraph";
import RadialBarChartGraph from "./Charts/RadialBarChartGraph";
import ColorPieChartGraph from "./Charts/ColorPieChartGraph";
import LineChartGraph from "./Charts/LineChartGraph";
import PieChartGraph from "./Charts/PieChartGraph";
import RadarChartGraph from "./Charts/RadarChartGraph";
import ScatterChartGraph from "./Charts/ScatterChartGraph";
import AreaChartGraph from "./Charts/AreaChartGraph";
import FunnelChartGraph from "./Charts/FunnelChartGraph";
import ComposedChartGraph from "./Charts/ComposedChartGraph";
import TreemapChartGraph from "./Charts/TreemapChartGraph";
import BubbleChartGraph from "./Charts/BubbleChartGraph";
import BoxPlotChartGraph from "./Charts/BoxPlotChartGraph";
import CandlestickChartGraph from "./Charts/CandlestickChartGraph";
import WaterfallChartGraph from "./Charts/WaterFallChartGraph";
import DoughnutChartGraph from "./Charts/DoughnutChartGraph";
import HistogramChartGraph from "./Charts/HistogramChartGraph";
import StreamGraphChart from "./Charts/StreamGraphChart";
import LollipopChart from "./Charts/LollipopChartGraph";
import SpiralChartGraph from "./Charts/SpiralChartGraph";
import RidgelineChart from "./Charts/RidgeLineChartGraph";
import SteplineChart from "./Charts/StepLineChartGraph";
import GradientForecastChart from "./Charts/GradientForecastChartGraph";
import DashedLineChart from "./Charts/DashedLineChartGraph";
import SplineChart from "./Charts/SplineChartGraph";
import NegativeAreaChart from "./Charts/NegativeAreaChartGraph";
import BasicColumnChart from "./Charts/BasicColumnChartGraph";
import StackedColumns100Chart from "./Charts/StackedColumn100Graph";
import ColumnWithDataLabels from "./Charts/ColumnWithDataLabelsGraph";
import StackedColumnChart from "./Charts/StackedColumnChartGraph";
import GroupedBarChart from "./Charts/GroupedBarChart";
import StackedBarChart100 from "./Charts/StackedBarChart100Graph";
import StackedBarChart from "./Charts/StackedBarChartGraph";
import LineColumnChart from "./Charts/LineColumnChartGraph";
import LineAreaChart from "./Charts/LineAreaChart";
import LineColumnAreaChart from "./Charts/LineColumnAreaChartGraph";
import MultipleYAxisChart from "./Charts/MultipleYAxisChartGraph";
import MonochromePieChart from "./Charts/MonoChromePieChartGraph";
import RadarMultipleSeriesChart from "./Charts/RadarMultipleSeriesChart";
import RadarPolygonFillChart from "./Charts/RadarPolygonFillChart";
import BasicRadialBarChart from "./Charts/BasicRadialBarChartGraph";
import CustomAngleCircle from "./Charts/CustomAngleCircleChart";
import PatternedDonutChart from "./Charts/PatternedDonutChartGraph";
import VerticalLineChart from "./Charts/VerticalLineChartGraph";
import StackedAreaChart from "./Charts/StackedAreaChartGraph";
import LineBarAreaComposedChart from "./Charts/LineBarAreaComposedChartGraph";
import SameDataComposedChart from "./Charts/SameDataComposedChartGraph";
import MapChart from "./Charts/MapChartGraph";






export default function Graphs({ data, config, appearance, graphData, getIndividualChartData, getComparisonChartData, CustomTooltip }) {
  const [chartData, setChartData] = useState();
  // const [tooltipContent, setTooltipContent] = useState("");
  const [activeMarker, setActiveMarker] = React.useState(null);


  // const [myData, setMyData] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  console.log("my data....", data, config, appearance);

  useEffect(() => {
    if (!config?.features?.fetchData) {
      setChartData(data?.features?.graph?.data);

    } else {
      const { servercommunication } = data.features;
      const onSuccess = (response) => setChartData(response?.return || response);
      const onFailure = (error) => console.error("API chart Failure:", error);

      if (servercommunication?.onSuccess) servercommunication.onSuccess = onSuccess;
      if (servercommunication?.onFailure) servercommunication.onFailure = onFailure;

      const query = data?.features?.servercommunication?.queryParam;
      let queryString = query && Object.keys(query).length > 0
        ? new URLSearchParams(query).toString()
        : null;

      getServerResponse(servercommunication, "&" + queryString);
    }
  }, [
    config,
    data?.features?.servercommunication?.apiUrl,
    data?.features?.servercommunication?.queryParam,
  ]);

  const getGraphStyle = () => {
    const style = appearance?.features?.graph?.[0] || {};
    return {
      backgroundColor: style.backgroundColor || "#fff",
      color: style.color || "#333",
      width: style.width || "75%",
      height: style.height || "auto",
    };
  };

  const DisplayChart = () => {
    const graphProps = data?.features?.graph;
    const appearanceProps = appearance?.features?.graph?.[0] || {};

    if (!Array.isArray(chartData) || chartData.length === 0 || !graphProps) {
      return (
        <Box sx={{ padding: "25px", mb: "15px", minHeight: "350px" }}>
          <Alert severity="warning">No data found or graph configuration is missing.</Alert>
        </Box>
      );
    }

    const { xAxisValue = "month", yAxisValue = "value", title = "Graph" } = graphProps;

    switch (config?.viewModes?.presentation) {

      case "barChart":
        return <BarChartGraph data={data} config={config} appearance={appearance} graphData={graphData}/>;
      case "polarAreaChart":
        return (<PolarAreaChartGraph data={data} config={config} appearance={appearance} />);
      case "radialBarChart":
        return (<RadialBarChartGraph data={data} config={config} appearance={appearance} />);
      case "colorPieChart":
        return (<ColorPieChartGraph data={data} config={config} appearance={appearance} />);
      case "lineChart":
        return (<LineChartGraph data={data} config={config} appearance={appearance} graphData={graphData} getIndividualChartData={getIndividualChartData} getComparisonChartData={getComparisonChartData} />);
      case "pieChart":
        return (<PieChartGraph data={data} config={config} appearance={appearance} />);
      case "radarChart": {
        return (<RadarChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "scatterChart": {
        return (<ScatterChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "areaChart": {
        return (<AreaChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "funnelChart": {
        return (<FunnelChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "composedChart": {
        return (<ComposedChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "treemapChart": {
        return (<TreemapChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "BubbleChart": {
        return (<BubbleChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "boxPlotChart": {
        return (<BoxPlotChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "candlestickChart": {
        return (<CandlestickChartGraph data={data} config={config} appearance={appearance} />);
      }
      case "waterfallChart":
        return <WaterfallChartGraph data={data} config={config} appearance={appearance} />;
      case "doughnutChart": {
        return <DoughnutChartGraph data={data} config={config} appearance={appearance} />
      }
      case "histogramChart": {
        return <HistogramChartGraph data={data} config={config} appearance={appearance} />
      }
      case "streamgraph": {
        return <StreamGraphChart data={data} config={config} appearance={appearance} />
      }
      case "lollipopChart": {
        return <LollipopChart data={data} config={config} appearance={appearance} />;
      }
      case "spiralChart": {
        return <SpiralChartGraph data={data} config={config} appearance={appearance} />
      }
      case "ridgelineChart": {
        return <RidgelineChart data={data} config={config} appearance={appearance} />
      }
      case "steplineChart":
        return <SteplineChart data={data} config={config} appearance={appearance} />;
      case "gradientForecastChart":
        return <GradientForecastChart data={data} config={config} appearance={appearance} />;
      case "dashedLineChart":
        return (<DashedLineChart data={data} config={config} appearance={appearance} />);
      case "splineChart":
        return (<SplineChart data={data} config={config} appearance={appearance} />);
      case "negativeAreaChart": {
        return (<NegativeAreaChart data={data} config={config} appearance={appearance} />);
      }
      case "basicColumnChart": {
        return (<BasicColumnChart data={data} config={config} appearance={appearance} />);
      }
      case "stackedColumns100":
        return (<StackedColumns100Chart data={data} config={config} appearance={appearance} />);
      case "columnWithDataLabels":
        return (<ColumnWithDataLabels data={data} config={config} appearance={appearance} />);
      case "stackedColumnChart":
        return (<StackedColumnChart data={data} config={config} appearance={appearance} />);
      case "groupedBarChart": {
        return (<GroupedBarChart data={data} config={config} appearance={appearance} />);
      }
      case "stackedBarChart100": {
        return (<StackedBarChart100 data={data} config={config} appearance={appearance} />)
      }
      case "stackedBarChart":
        return (<StackedBarChart data={data} config={config} appearance={appearance} />);
      case "lineColumnChart": {
        return (<LineColumnChart data={data} config={config} appearance={appearance} />)
      }
      case "lineAreaChart": {
        return (<LineAreaChart data={data} config={config} appearance={appearance} />)
      }
      case "lineColumnAreaChart": {
        return <LineColumnAreaChart data={data} config={config} appearance={appearance} />;
      }
      case "multipleYAxisChart": {
        return <MultipleYAxisChart data={data} config={config} appearance={appearance} />
      }
      case "monochromePieChart": {
        return <MonochromePieChart data={data} config={config} appearance={appearance} />
      }
      case "radarMultipleSeries": {
        return <RadarMultipleSeriesChart data={data} config={config} appearance={appearance} />
      }
      case "radarPolygonFill": {
        return <RadarPolygonFillChart data={data} config={config} appearance={appearance} />
      }
      case "basicRadialBarChart": {
        return <BasicRadialBarChart data={data} config={config} appearance={appearance} />
      }
      case "customAngleCircle": {
        return <CustomAngleCircle data={data} config={config} appearance={appearance} />
      }
      case "patternedDonutChart": {
        return <PatternedDonutChart data={data} config={config} appearance={appearance} />
      }
      case "verticalLineChart": {
        return <VerticalLineChart data={data} config={config} appearance={appearance} />
      }
      case "stackedAreaChart": {
        return <StackedAreaChart data={data} config={config} appearance={appearance} />
      }
      case "lineBarAreaComposedChart": {
        return <LineBarAreaComposedChart data={data} config={config} appearance={appearance} />
      }
      case "sameDataComposedChart": {
        return <SameDataComposedChart data={data} config={config} appearance={appearance} />
      }
      case "mapChart": {
        return <MapChart data={data} config={config} appearance={appearance} />
      }


      default:
        return (
          <Typography sx={{ fontSize: 16, color: "red" }}>
            Invalid chart type selected.
          </Typography>
        );
    }
  };

  return (
    <div style={getGraphStyle()}>
      {console.log("My map", config, data)}
      {config?.features?.graph ? DisplayChart() : <p>Please enable the graph</p>}
    </div>
  );
}













