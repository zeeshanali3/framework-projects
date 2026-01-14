import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts"
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useDispatch, useSelector } from "react-redux";
import { GetStudentattendanceAction } from "../../Common/Store/Actions/General/GetActions/getstudentattendanceAction"

const SessionsByCountries = ({ StudentData, CourseId }) => {
    const dispatch = useDispatch()

    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const [AttendanceByCourse, setAttendanceByCourse] = useState([]);
    useEffect(() => {
        if (CourseId && Array.isArray(StudentData)) {
            const item = StudentData.find(item => item.CourseId == CourseId)
            dispatch(GetStudentattendanceAction("", item.EnrollementId, CourseId,
                (response) => {
                    console.log('response is::::::::::::', response);
                    const presentCount = response?.return.filter(item => item.isPresent === 1).length || 0;
                    const totalCount = response?.return.length || 1;
                    const percentage = ((presentCount / totalCount) * 100).toFixed(2);
                    console.log("percentage is:", percentage, presentCount, totalCount);
                    setAttendanceByCourse(prevState => {
                        const validPercentage = isNaN(percentage) ? 0 : percentage;
                        const updatedState = prevState.map(course =>
                            course.CourseName === item.CourseName
                                ? { ...course, percentage: validPercentage }
                                : course
                        );
                        if (!prevState.some(course => course.CourseName === item.CourseName)) {
                            updatedState.push({ CourseName: item.CourseName, percentage: validPercentage });
                        }
                        return updatedState;
                    });

                },
                (err) => {
                    console.log("Error:::", err);
                },
                1
            ))
        }
        console.log("StudentData:::", StudentData)
        if (Array.isArray(StudentData) && !CourseId) {
            StudentData.forEach(item => {
                dispatch(GetStudentattendanceAction("", item.EnrollementId, item.CourseId,
                    response => {
                        console.log("response is::::::::::::", response.return);
                        const presentCount = response?.return?.filter(item => item.isPresent === 1).length || 0;
                        const totalCount = response?.return?.length || 1;
                        const percentage = (presentCount / totalCount) * 100;

                        console.log("percentage is", percentage, presentCount, totalCount);
                        setAttendanceByCourse(prevState => {
                            const validPercentage = isNaN(percentage) ? 0 : percentage;
                            const updatedState = prevState.map(course =>
                                course.CourseName === item.CourseName
                                    ? { ...course, percentage: validPercentage }
                                    : course
                            );
                            if (!prevState.some(course => course.CourseName === item.CourseName)) {
                                updatedState.push({ CourseName: item.CourseName, percentage: validPercentage });
                            }
                            return updatedState;
                        });

                    },
                    error => {
                        console.log("Error:::Goori", error);
                    },
                ));
            });
        }
    }, [StudentData, dispatch]);


    const series = [
        {
            data: AttendanceByCourse?.map(item => item.percentage) || [],

            colors: AttendanceByCourse?.map(item => {
                if (item.percentage > 75) {
                    return '#28a745';
                } else if (item.percentage >= 65 && item.percentage <= 75) {
                    return '#ffa500';
                } else {
                    return '#dc3545';
                }
            }) || [],
        },
    ];

    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#757FEF"],
        xaxis: {
            categories: AttendanceByCourse?.map(item => item.CourseName) || [],
            min: 0,
            max: 100,
            labels: {
                style: {
                    colors: "#5B5B98",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#5B5B98",
                    fontSize: "11px",
                },
            },
            axisBorder: {
                show: false,
                colors: "#f6f6f7",
            },
        },
        fill: {
            opacity: 1,
        },
        grid: {
            show: true,
            borderColor: "#f6f6f7",
        },
    };


    return (
        <>
            <Card
                sx={{
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: "10px",
                    p: "25px 20px 10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #EEF0F7",
                        paddingBottom: "17px",
                    }}
                    className="for-dark-bottom-border"
                >
                    <Typography
                        as="h3"
                        sx={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        {CourseId ? "Attendance %" : "Attendance % By Courses"}
                    </Typography>
                </Box>
                {!CourseId && (<Chart options={options} series={series} type="bar" height={401} style={{ marginLeft: "-15px", }} />)}
                {
                    CourseId && (
                        <Box
                            sx={{
                                paddingTop: { sm: 2, md: 4 },
                                paddingBottom: { sm: 2, md: 10 },
                            }}
                        >
                            <Gauge
                                height={300}
                                value={AttendanceByCourse[0]?.percentage || 0}
                                startAngle={-110}
                                endAngle={110}
                                sx={{
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 40,
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {

                                        fill: AttendanceByCourse[0]?.percentage > 75 ? '#52b202' : AttendanceByCourse[0]?.percentage > 65 ? 'orange' : 'red',
                                    },

                                }}
                                text={
                                    ({ value, valueMax }) => `${value} / ${valueMax}`
                                }
                            />
                        </Box>
                    )
                }
            </Card>
        </>
    );
};

export default SessionsByCountries;
