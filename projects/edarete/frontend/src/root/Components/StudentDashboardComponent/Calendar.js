import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import { getCalendarEvents } from "../../Common/Store/Actions/General/GetActions/getCalendarEvents";

const Calendar = ({CourseId}) => {
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state?.LOGINREDUCER?.loginData) || {};
    const calendarEvents = useSelector((state) => state?.CALENDAREVENTS?.calendarEvents) || [];
    const StudentSemesterId = loginData?.studentSemesterId?.[0]?.StudentSemesterId;
    console.log("calendarEvents:::", calendarEvents,loginData);
    useEffect(() => {
        if (StudentSemesterId) {
            dispatch(getCalendarEvents("", StudentSemesterId,
                (response) => {
                    console.log("Response:::", response);
                },
                (err) => {
                    console.log("Errorr::::", err);
                }
            ));
        }
    }, [StudentSemesterId, dispatch]);

    // Convert calendarEvents to FullCalendar event format
    const formattedEvents = (Array.isArray(calendarEvents) ? calendarEvents : []).map(event => ({
        title: `${event.ComponentName}-${event.SubcomponentNum} ${event.CourseName}`,
        start: event.Date,
        end: event.Date,
        description: event.CourseName,
        color: event.SubmissionStatus !== 'Submitted' ? '#FF0000' : '#00FF00',
        CourseId: event.CourseId
    }));

    return (
        <Card
            sx={{
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: "10px",
                p: "25px 20px",
                mb: "15px",
                "& .fc-daygrid-day-events": {
                    overflow: 'hidden' // Ensures no overflow in the container
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #EEF0F7",
                    paddingBottom: "10px",
                    mb: "20px",
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
                    Calendar
                </Typography>
            </Box>
            {/* Color Legend */}
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mb: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: "15px", // Margin right for spacing
                }}
            >
                <Box
                    sx={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        mr: "8px"
                    }}
                />
                <Typography>Unsubmitted</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: "#00FF00",
                        borderRadius: "50%",
                        mr: "8px"
                    }}
                />
                <Typography>Submitted</Typography>
            </Box>
        </Box>
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                events={CourseId?formattedEvents.filter(event => event.CourseId === CourseId):formattedEvents}
                displayEventEnd={true}
                eventContent={(eventInfo) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '15px',
                                height: '10px',
                                borderRadius: '50%', // Makes the dot a complete circle
                                backgroundColor: eventInfo.event.backgroundColor,
                                marginRight: '5px'
                            }}
                        ></div>
                        <div style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {eventInfo.event.title}
                        </div>
                    </div>
                )}
            />
        </Card>
    );
};

export default Calendar;
