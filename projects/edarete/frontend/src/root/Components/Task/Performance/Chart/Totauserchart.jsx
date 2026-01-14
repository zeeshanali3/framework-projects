import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { GetRoleAction } from "../../../../Common/Store/Actions/GetRoleAction/GetRoleAction";

export const TotalUserChart = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState([]);
  const [chartData, setChartData] = useState({});
  const mainData = useSelector((state) => state.main);
  console.log("Role Data:", role);

  useEffect(() => {
    dispatch(
      GetRoleAction(
        mainData?.accesstoken,
        (response) => {
          console.log("Role Response Data:", response);
          const transformedRoles = response?.return.map((role) => ({
            roleName: role?.RoleName,
            roleCount: role?.RoleCount
          }));
          setRole(transformedRoles);
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }, []);

  useEffect(() => {
    // Update chartData when role changes
    setChartData({
      series: role?.map((role) => role?.roleCount),
      options: {
        labels: role?.map((role) => role?.roleName),
        stroke: {
          width: 0,
          show: true,
        },
        colors: ["#51C2F7", "#F264A7", "#828BF1", "#42C9B5"],
        legend: {
          offsetY: 0,
          show: false,
          position: "bottom",
          fontSize: "14px",
          labels: {
            colors: "#5B5B98",
          },
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "14px",
          },
          dropShadow: {
            enabled: false,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val;
            },
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 280,
              },
            },
          },
        ],
      },
    });
  }, [role]);

  // Conditionally render the chart only when role and chartData are available and valid
  const hasValidChartData =
    role && role.length > 0 &&
    chartData &&
    Array.isArray(chartData.series) &&
    chartData.series.length > 0 &&
    chartData.options;

  return hasValidChartData ? (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="pie"
      height={290}
    />
  ) : null;
};