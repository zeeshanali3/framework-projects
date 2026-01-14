import React, { useEffect, useState } from "react";
import Header from "../custom/topnavBar";
import { Grid, Card, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { gettaData } from '../Utils/loginData/loginData.jsx';
import { getTeacherData } from '../Utils/loginData/loginData.jsx';
import { getStudentData } from "../Utils/loginData/loginData.jsx";
import { GetLeaderBoardAction } from "../Common/Store/Actions/General/GetActions/getLeaderBoardAction";
import Attendace from "../Components/StudentDashboardComponent/AttendaceOfCourses"
import Aggregate from "../Components/StudentDashboardComponent/AggregateOfStudent/index"
import Leaderboard from "../Components/Leaderboard";
import GroupMembers from "../Components/StudentDashboardComponent/GroupMembers";



const CourseDashboard = ({ components, componentID, id, componentName, classItem, roleName, roleID, userroleID }) => {
    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const taData = gettaData(loginData);
    let UserDetailsData = []
    const [selctedLeaderboard, setSelctedLeaderboard] = useState([])
    console.log("selctedLeaderboard", selctedLeaderboard)
    const studentData = getStudentData(loginData);
    const roleNameSelected = loginData?.payload?.roleData[0]?.RoleName
    const dispatch = useDispatch();
    const teacherData = getTeacherData(loginData);
    const roleData = loginData && loginData.payload ? loginData?.payload?.RoleData : [];
    const [getLeaderboard, setGetLeaderboard] = useState([])
    const [getLeaderboardResult, setGetLeaderboardResult] = useState([])
    const [openLeaderboard, setOpenLeaderboard] = useState(false)
    console.log("getLeaderboardResult", studentData)
    const [GroupName, setGroupName] = useState(studentData.find((item) => item?.CourseId === id)?.GroupName);
    console.log("GroupName:::::", GroupName)
    useEffect(() => {
        const fetchLeaderboardData = async () => {

            dispatch(GetLeaderBoardAction(
                id,
                (response) => {
                    console.log("response is in leader bord", response);
                    setGetLeaderboard(response || []);
                },
                (error) => {

                    console.log("error attc", error);
                }
            )
            )
        };



        if (id) { fetchLeaderboardData() }
    }, [id])
    useEffect(() => {
        console.log("getLeaderboard:", getLeaderboard); // Log the getLeaderboard state
        // Ensure getLeaderboard is an array before trying to iterate/flatten it.
        // Some API responses may return an object for a single leaderboard, or a wrapper
        // object. Guard against that to avoid "flatMap is not a function" errors.
        const leaderboards = Array.isArray(getLeaderboard)
            ? getLeaderboard
            : (getLeaderboard ? [getLeaderboard] : []);

        if (leaderboards.length > 0) {
            // Avoid using flatMap directly to be explicit and safe across environments.
            const subcomponentIds = leaderboards.reduce((acc, leaderboard) => {
                console.log("leaderboard:", leaderboard); // Log each leaderboard object
                if (Array.isArray(leaderboard?.SubComponentData)) {
                    const ids = leaderboard.SubComponentData.map((item) => item?.SubComponentId).filter(Boolean);
                    return acc.concat(ids);
                }
                return acc;
            }, []);

            console.log("subcomponentIds:", subcomponentIds); // Log the final subcomponentIds array
        }
    }, [getLeaderboard]);


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mx: { md: 2 },
        }}>
            <Grid container spacing={2} rowSpacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <Attendace StudentData={studentData} CourseId={id} />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Aggregate CourseId={id} />
                </Grid>
                {GroupName && (
                    <Grid item xs={12} md={6} lg={6}>
                        <GroupMembers CourseId={id} />
                    </Grid>
                )}
            </Grid>
            {getLeaderboard?.length > 0 && (
                <Grid
                    container
                    spacing={2}
                    rowSpacing={3}
                >
                    {getLeaderboard?.map((leaderboard, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Card
                                sx={{
                                    padding: '16px',
                                    marginBottom: '20px',
                                    backgroundImage: `
                                                    linear-gradient(135deg, 
                                                        #dadcf5, 
                                                        #C8CCF9, 
                                                        #9EA5F4, 
                                                        #757FEF
                                                    )
                                                `,
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    }
                                }}

                                onClick={() => {
                                    setSelctedLeaderboard(leaderboard)
                                    setOpenLeaderboard(true)
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        marginBottom: '12px',
                                        color: '#4e545c',
                                        fontSize: '18px',
                                    }}
                                >
                                    {leaderboard?.LeaderboardName}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Leaderboard open={openLeaderboard} handleClose={() => setOpenLeaderboard(false)} leaderboard={selctedLeaderboard} />
        </Box>
    );
};

export default CourseDashboard;