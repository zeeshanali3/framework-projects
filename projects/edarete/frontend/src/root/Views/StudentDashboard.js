import React, { useEffect, useState } from "react";
import Header from "../custom/topnavBar";
import { Box, Grid } from "@mui/material";
import { routesName } from '../routes/adminConstants';
import { useDispatch, useSelector } from "react-redux";
import { gettaData } from "../Utils/loginData/loginData";
import { getTeacherData } from "../Utils/loginData/loginData";
import { getStudentData } from "../Utils/loginData/loginData";
import { sideBarDataAction } from "../Common/Store/Actions/General/GetActions/getSideBarDataAction"
import BookIcon from '@mui/icons-material/Book';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ScienceIcon from '@mui/icons-material/Science';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ComputerIcon from '@mui/icons-material/Computer';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import Features from "../Components/StudentDashboardComponent/Features"
import Attendace from "../Components/StudentDashboardComponent/AttendaceOfCourses"
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Calendar from "../Components/StudentDashboardComponent/Calendar";
import Aggregate from "../Components/StudentDashboardComponent/AggregateOfStudent/index"
import couponImg from "../../assets/images/coupon-icon.png"
import shapeImg from '../../assets/images/shape-2-icon.png';
import stackImg from '../../assets/images/stack-icon.png';
import appsImg from '../../assets/images/apps-icon.png';


const StudentDashboard = () => {

    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const taData = gettaData(loginData);
    let UserDetailsData = []
    const studentData = getStudentData(loginData);
    const roleNameSelected = loginData?.payload?.roleData[0]?.RoleName
    const dispatch = useDispatch();
    const icons = [
        <BookIcon style={{ color: '#A0522D' }} />,
        <HistoryEduIcon style={{ color: '#DAA520' }} />,
        <ScienceIcon style={{ color: '#008080' }} />,
        <MusicNoteIcon style={{ color: '#800080' }} />,
        <ComputerIcon style={{ color: '#4682B4' }} />,
        <ArtTrackIcon style={{ color: '#FF7F50' }} />,
        <SportsEsportsIcon style={{ color: '#32CD32' }} />,
        <GroupIcon style={{ color: '#B22222' }} />
    ]
    const convertTo12HourFormat = (timeString) => {
        const time = timeString?.split("T")[1]?.split(".")[0];
        const date = new Date(`1970-01-01T${time}Z`);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };
    const convertDateToDDMMYYYY = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const getDataSource = () => {
        if (taData && taData.length > 0) {
            return taData;
        } else if (studentData && studentData.length > 0) {
            return studentData;
        } else if (teacherData && teacherData.length > 0) {
            return teacherData;
        }
        return [studentData, taData, teacherData];
    };
    useEffect(() => {

        const newSidebarData = [
            {
                title: 'Dashboard',
                path: routesName.StudentDashboard,
                icon: <GridViewOutlinedIcon />
            },
            ...getDataSource().map(item => ({
                title: item.CourseName,
                path: `/classroomHome/${item.CourseName}/${item.CourseId}`,
                icon: icons[Math.floor(Math.random() * icons.length)]
            })),

        ];
        console.log("newSidebarData", newSidebarData);
        dispatch(sideBarDataAction(newSidebarData));

    }, [dispatch]);
    console.log("loginData in student dashboard", loginData);
    if (roleNameSelected != "Teacher" && roleNameSelected != "TA") {
        UserDetailsData = [
            {
                id: "1",
                bgColor: "#EEF0FA",
                number: loginData?.otpVerif?.userData[0]?.USER_NAME,
                subTitle:
                    loginData?.otpVerif?.userData[0]?.Email || loginData?.otpVerif?.rollNumber[0]?.RegNum,
                icon: couponImg
            },
            {
                id: "2",
                bgColor: "#F8EEE2",
                number: loginData?.otpVerif?.studentData?.CGPA || "Yet to be calculated",
                subTitle: "CGPA",
                icon: shapeImg
            },
            {
                id: "3",
                bgColor: "#DDF0F1",
                number: loginData?.otpVerif?.earliestDeadline[0]?.SubcomponentName ? convertDateToDDMMYYYY(loginData?.otpVerif?.earliestDeadline[0]?.EarliestUpcomingDeadline?.split("T")[0]) : "Wohoo!",
                subTitle: loginData?.otpVerif?.earliestDeadline[0]?.SubcomponentName ? "Next Deadline is of " + loginData?.otpVerif?.earliestDeadline[0]?.SubcomponentName + " In " + loginData?.otpVerif?.earliestDeadline[0]?.CourseName + " At" + " " + convertTo12HourFormat(loginData?.otpVerif?.earliestDeadline[0]?.EarliestUpcomingDeadline) :
                    "No work due soon!",
                icon: stackImg
            },
            {
                id: "4",
                bgColor: "#FBEAEA",
                number:
                    loginData?.otpVerif?.studentData?.length ||
                    loginData?.otpVerif?.teacherData?.length ||
                    loginData?.otpVerif?.taData?.length,
                subTitle:
                    loginData?.otpVerif?.studentData &&
                        loginData?.otpVerif?.studentData?.length > 0
                        ? loginData?.otpVerif?.teacherData &&
                            loginData?.otpVerif?.teacherData?.length > 0
                            ? "Assisting and Enrolled Courses"
                            : "Enrolled Courses"
                        : loginData?.otpVerif?.teacherData &&
                            loginData?.otpVerif?.teacherData?.length > 0
                            ? "Currently Teaching Courses "
                            : "N/A",
                icon: appsImg
            },
        ];
    }

    const studentSemesterId = loginData?.payload?.studentSemesterId[0]?.StudentSemesterId;

    const token = loginData?.payload?.accessToken || "";
    const teacherData = getTeacherData(loginData);
    const roleData = loginData && loginData.payload ? loginData?.payload?.RoleData : [];

    const { RoleName } = roleData || {};
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Features FeaturesData={UserDetailsData} />
            <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <Aggregate />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Attendace StudentData={studentData} />
                </Grid>
            </Grid>
            <Calendar />
        </Box>
    );
};

export default StudentDashboard;