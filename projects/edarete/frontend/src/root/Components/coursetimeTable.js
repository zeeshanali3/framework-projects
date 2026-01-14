
import React, { useEffect } from "react";
import { Box, Button, Card } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useDispatch, useSelector } from "react-redux";
import { GetcoursecalenderAction } from "../Common/Store/Actions/GetActions/getcoursecalenderActon";
import moment from "moment";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../Utils/loginData/loginData.jsx";
const CourseCalendar = ({ classItem }) => {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const { coursetimetablebyIdData } = useSelector((state) => state.GETCOURSECALENDERREDUCER);
  const { id } = useParams();
  useEffect(() => {
    const callFunction = () => {
      dispatch(
        GetcoursecalenderAction(
          token,
          id,
          (wow) => {
            // console.log("Success", wow);
          },
          (ayein) => {
            // console.log("Failed", ayein);
          }
        )
      );
    };

    callFunction();

  }, [dispatch, token, classItem]);

  const events = coursetimetablebyIdData.payload
    ? coursetimetablebyIdData.payload.map((dataItem) => {
      const currentDay = dataItem.Day;

      const startDate = moment().day(currentDay).hour(dataItem.StartTime.split(':')[0]).minute(dataItem.StartTime.split(':')[1]);
      const endDate = moment().day(currentDay).hour(dataItem.EndTime.split(':')[0]).minute(dataItem.EndTime.split(':')[1]);

      return {
        // title: `${dataItem.CourseName} - ${dataItem.RoomName} ${currentDay} (${dataItem.StartTime} - ${dataItem.EndTime})`,
        // start: startDate.toDate(),
        // end: endDate.toDate(),
        // courseName: dataItem.CourseName,
        // timeslot: dataItem.TimeSlotId,
        // room: dataItem.RoomName,
        // semester: dataItem.SemesterId,
        // day: currentDay,
        // originalData: dataItem,

      };
    })
    : [];
  const dummyEvents = [
    {
      title: "Dummy Course 1",
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      courseName: "Dummy Course 1",
      timeslot: "1",
      room: "Room 101",
      semester: "Spring 2024",
      day: "Monday",
      originalData: {},
    },
    {
      title: "Dummy Course 2",
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(3, 'hours').toDate(),
      courseName: "Dummy Course 2",
      timeslot: "2",
      room: "Room 102",
      semester: "Spring 2024",
      day: "Tuesday",
      originalData: {},
    },
    {
      title: "Dummy Course 2",
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(3, 'hours').toDate(),
      courseName: "Dummy Course 2",
      timeslot: "2",
      room: "Room 102",
      semester: "Spring 2024",
      day: "Tuesday",
      originalData: {},
    },
    {
      title: "Dummy Course 2",
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(3, 'hours').toDate(),
      courseName: "Dummy Course 2",
      timeslot: "2",
      room: "Room 102",
      semester: "Spring 2024",
      day: "Tuesday",
      originalData: {},
    },
    {
      title: "Holiday  2",
      start: moment().add(7, 'day').toDate(),
      end: moment().add(5, 'day').add(5, 'hours').toDate(),
      courseName: "Dummy Course 2",
      timeslot: "2",
      room: "Room 102",
      semester: "Spring 2024",
      day: "Sunday",
      originalData: {},
    },
  ];
  const eventContent = (eventInfo) => {
    
    return (
      <div >
        <p>{eventInfo.event.title}</p>
        <p>{moment(eventInfo.event.start).format('YYYY-MM-DD HH:mm')} - {moment(eventInfo.event.end).format('YYYY-MM-DD HH:mm')}</p>
      </div>
    );
  };

  return (
    <>
      <Box className="p-2"
        flex="1 1 100%" ml="15px"
      >
        <FullCalendar
          //  defaultView="dayGridMonth" 
          displayEventEnd="true"
          events={dummyEvents}
          contentHeight="80vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            // center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          eventDisplay="block"
          eventContent={eventContent}
        />
      </Box>
    </>
  );
};

export default CourseCalendar;
