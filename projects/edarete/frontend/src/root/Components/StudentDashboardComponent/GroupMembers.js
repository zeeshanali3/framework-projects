import React, { useEffect, useState } from "react";
import { Box, Typography, Card, Avatar, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetGroupMembersAction } from "../../Common/Store/Actions/General/GetActions/getGroupmembers";
import { getStudentData } from "../../Utils/loginData/loginData.jsx";
import GroupIcon from '@mui/icons-material/Group';

const GroupMembers = ({ CourseId }) => {
    const dispatch = useDispatch();
    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const studentData = getStudentData(loginData);
    const [GroupName, setGroupName] = useState(studentData.find((item) => item.CourseId === CourseId).GroupName);
    const [data, setData] = useState([]);

    useEffect(() => {
        const studentData = getStudentData(loginData);

        dispatch(GetGroupMembersAction(GroupName, CourseId, (response) => {
            setData(response.payload);
            console.log("response", response);
        },
            (error) => {
                console.log("errdsadsadasor", error);
            }
        ));
    }, []);



    return (
        <>
            <Card
                sx={{
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: "10px",
                    // height: "97%",
                    p: "25px 20px 10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #EEF0F7",
                        paddingBottom: "10px",
                    }}
                    className="for-dark-bottom-border"
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: "#333",
                        }}
                    >
                        Group: {GroupName}
                    </Typography>

                    <GroupIcon sx={{ color: "#40E0D0", fontSize: 30 }} />
                </Box>

                <List sx={{ marginTop: "15px" }}>
                    {data?.map((member, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 2fr 1fr",
                                alignItems: "center",
                                padding: "8px 16px",
                                borderBottom: "1px solid #eef0f7",
                                "&:last-child": {
                                    borderBottom: "none",
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "#1976d2" }}>
                                    {member.Student_Name.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={member.Student_Name}
                                primaryTypographyProps={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "#333",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "#333",
                                    textAlign: "right", // Align RegNum to the right for neat appearance
                                }}
                            >
                                {member.RegNum}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );

};

export default GroupMembers;
