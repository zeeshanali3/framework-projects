import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { getMaxMinAggregate } from "../../../Common/Store/Actions/General/GetActions/getMinMaxAverageAggregate";

const TasksPerformanceChart = ({ selectedCourseId, EnrollementId }) => {
  const [MaxMinAggregate,setMaxMinAggregate]=useState({})
  const dispatch=useDispatch()
  const [series, setSeries] = useState([0, 0, 0]); 
  const [metrics, setMetrics] = useState({ target: 0, max: 0, min: 0, average: 0 });
  useEffect(() => {
   
    if (selectedCourseId && EnrollementId) {
      dispatch(
        getMaxMinAggregate(  
          "",
          EnrollementId,
          selectedCourseId,
          (response) => {
            if (response) {
              const validMyOverall = Number(response.myAggregate) || 0;
              const validMaxOverall = Number(response.max) || 0;
              const validMinOverall = Number(response.min) || 0;
              const validAverageOverall = Number(response.average) || 0;
          
              setSeries([validMyOverall, validMaxOverall, validMinOverall,validAverageOverall]);
              setMetrics({
                target: validMyOverall,
                max: validMaxOverall,
                min: validMinOverall,
                average: validAverageOverall
              });}
            setMaxMinAggregate(response)
   

          },
          (err) => {
            console.log("Error:::", err);
          }
        )
      );
    }
  }, [selectedCourseId, EnrollementId, dispatch]);
  
  const options = {
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "25%",
          background: "transparent",
        },
        dataLabels: {
          name: { show: false },
          value: { show: false },
        },
      },
    },
    colors: ["#757FEF", "#9EA5F4", "#C8CCF9","#dadcf5"],
    labels: ["Your Total", "Max", "Min","Average",],
    legend: {
      show: true,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetY: 0,
      labels: { color: "#5B5B98" },
      markers: { size: 0 },
      formatter: (seriesName, opts) => `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}`,
      itemMargin: { vertical: 3 },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 280 },
          legend: { show: false },
        },
      },
    ],
    fill: { opacity: 1 },
  };

  return (
    <>{console.log("MaxMinAggregate:::",MaxMinAggregate,series,metrics)}
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={300}
      />
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          mt: "22px",
        }}
      >
        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Your Aggregate
          </Typography>
          <Typography fontWeight="500" fontSize="18px">
            {metrics.target}
          </Typography>
        </Box>

        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Maximum Aggregate
          </Typography>
          <Typography fontWeight="500" fontSize="18px">
            {metrics.max}
          </Typography>
        </Box>

        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Minimum Aggregate
          </Typography>
          <Typography fontWeight="500" fontSize="18px">
            {metrics.min}
          </Typography>
        </Box>
        <Box>
          <Typography color="#A9A9C8" mb={1} fontSize="14px">
            Average Aggregate
          </Typography>
          <Typography fontWeight="500" fontSize="18px">
            {metrics.average}
          </Typography>
        </Box>
      </Box>
    </>
  );
};


export default TasksPerformanceChart;
