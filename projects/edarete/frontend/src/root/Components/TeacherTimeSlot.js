import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import timeGridPlugin from "@fullcalendar/timegrid";
import {AddpreferredtimeslotAction} from "../Common/Store/Actions/PostActions/addpreferredtimeslotAction";
import {getAccessToken} from "../Utils/loginData/loginData.jsx"
const TeacherTimeSlot = () => {
  const { timeslotData } = useSelector((state) => state?.GETTIMESLOT);
  const timeSlots = timeslotData?.payload;
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const dispatch =useDispatch();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const employeeId = loginData?.payload.EmployeeData[0]?.EmployeeId;
  const handleEventClick = (eventClickInfo) => {
    const { TimeSlotId } = eventClickInfo.event.extendedProps;

    if (selectedTimeSlots.includes(TimeSlotId)) {
      setSelectedTimeSlots((prevSelected) =>
        prevSelected.filter((id) => id !== TimeSlotId)
      );
    } else {
      setSelectedTimeSlots((prevSelected) => [
        ...prevSelected,
        TimeSlotId,
      ]);
    }
  };
 const handleaddpreferredtimeSlots=()=>{
  selectedTimeSlots.forEach((TimeSlotId)=>{
    dispatch(AddpreferredtimeslotAction(token ,
      employeeId , 
      TimeSlotId,
      (response)=>{console.log("success" ,response)},
      (error)=>{console.log("error" , error)}
    ))
  })
 
 }
  const events = timeSlots?.map((slot) => ({
    TimeSlotId: slot?.TimeSlotId,
    title: 'Available',
    start: new Date(`2024-01-22T${slot?.StartTime}`),
    end: new Date(`2024-01-22T${slot?.EndTime}`),
  }));

  return (
    <div>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
          p: '10px',
          mb: '15px',
        }}
      >
        <div className='flex justify-center'>
          <Button variant='contained' onClick={handleaddpreferredtimeSlots}>
            Save
          </Button>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={events} 
          height="600px"
          headerToolbar={{
            left: "prev,next today",
            right: "timeGridWeek,timeGridDay,listMonth",
          }}
          eventClick={handleEventClick}
        />
      </Card>
      <div>
        <h3>Selected Time Slots:</h3>
        <ul>
          {selectedTimeSlots?.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherTimeSlot;
