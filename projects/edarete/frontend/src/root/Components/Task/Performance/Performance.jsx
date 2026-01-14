import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { GetCourseCountAction } from "../../../Common/Store/Actions/GetCourseCount/GetCourseCountAction";

const  TasksPerformanceChart = () => {
  const dispatch = useDispatch();
  const mainData = useSelector((state) => state.main);
  const [chartData, setChartData] = useState({
    options: {}, // Initialize with empty object
    series: []
  });
  useEffect(() => {
    dispatch(
      GetCourseCountAction(
        mainData?.accesstoken,
        (response) => {
          console.log("GetCourseCountAction", response);
          setChartData({
            series: response.return && response.return.length > 0 ? [response.return[0].CourseCount] : [],
            options: {
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '25%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
              colors: ['#757FEF'],
              labels: ['Active'],
              legend: {
                show: true,
                floating: true,
                fontSize: '13px',
                position: 'left',
                offsetY: 0,
                labels: {
                  color: '#5B5B98',
                },
                markers: {
                  size: 0,
                },
                formatter: function (seriesName, opts) {
                  return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
                },
                itemMargin: {
                  vertical: 3,
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      height: 280,
                    },
                    legend: {
                      show: false,
                    },
                  },
                },
              ],
              fill: {
                opacity: 1,
              },
            },
          });
          
        },
        (error) => {
          console.log("GetCourseCountAction", error);
        }
      )
    );
  }, [])
 

  return (
    <>
      <Chart options={chartData.options} series={chartData.series} type="radialBar" height={300} />
    </>
  );
};

export default TasksPerformanceChart;