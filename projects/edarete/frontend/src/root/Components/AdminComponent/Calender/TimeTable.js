import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddTimeTable from './AddTimeTable';
import UpdateModal from "../../CustomComponents/UdateModal/UpdateModal";
import { useSelector } from "react-redux";
import moment from "moment";
const Calendar = () => {
  // State variables
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [room, setRoom] = useState("");
  const [semester, setSemester] = useState("");
  const [day, setDay] = useState("");

  // const { getcoursetimetableData } = useSelector((state) => state.GETCOURSETIMETABLEREDUCER);
  const { getroomData } = useSelector((state) => state?.GETROOMREDUCER);
  const { getimetable } = useSelector((state) => state?.GETTIMETABLEREDUCER)
  const { getcourseData } = useSelector((state) => state?.GETCOURSEREDUCER);
  const { getsemestersData } = useSelector((state) => state?.GETRSEMSTERREDUCER)
  console.log ("sfsfsfsfsf " , getimetable?.payload)
  const timetableData = getimetable?.payload || [];
  const events = getimetable
  ? getimetable?.payload?.flatMap((dataItem) => {
      const currentDay = dataItem.Day;

      const startDate = moment()
        .day(currentDay)
        .hour(dataItem.StartTime.split(":")[0])
        .minute(dataItem.StartTime.split(":")[1]);
      const endDate = moment()
        .day(currentDay)
        .hour(dataItem.EndTime.split(":")[0])
        .minute(dataItem.EndTime.split(":")[1]);


      const repeatedEvents = [];
      for (let i = 0; i < 52; i++) { 
        const repeatedStartDate = startDate.clone().add(i, "weeks");
        const repeatedEndDate = endDate.clone().add(i, "weeks");

        repeatedEvents.push({
          title: `${dataItem.CourseName} - ${dataItem.RoomName} ${currentDay} (${dataItem.StartTime} - ${dataItem.EndTime})`,
          start: repeatedStartDate.toDate(),
          end: repeatedEndDate.toDate(),
          courseName: dataItem.CourseName,
          timeslot: dataItem.TimeSlotId,
          room: dataItem.RoomName,
          semester: dataItem.SemesterId,
          day: currentDay,
          originalData: dataItem,
        });
      }

      return repeatedEvents;
    })
  : [];

  // Event handlers
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleEventClick = (info) => {
    setSelectedRowData(info.event.extendedProps.originalData);
    setCourse(info.event.extendedProps.originalData.CourseName);
    setTimeslot(info.event.extendedProps.originalData.TimeSlotId);
    setRoom(info.event.extendedProps.originalData.RoomName);
    setSemester(info.event.extendedProps.originalData.SemesterId);
    setDay(info.event.extendedProps.originalData.Day);
    setUpdateModalOpen(true);
  };

  const handleUpdate = () => {
    // Implement your update logic here
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };
  console.log("timetableData", timetableData); 
  console.log("events", events); 
  return (
    <>
      {/* Calendar Card */}
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px",
          mb: "15px",
        }}
      >
        {/* Card Header */}
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
          {/* Add Event Button */}
          <Button
            onClick={handleOpenAdd}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              color: "#fff !important",
            }}
          >
            <AddIcon
              sx={{ position: "relative", top: "-1px" }}
              className="mr-5px"
            />
            Add Event
          </Button>
        </Box>

        {/* FullCalendar Component */}
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          displayEventTime={true}
          displayEventEnd={true}
          eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
          eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
          eventClick={handleEventClick}
              
        />
      </Card>

      {/* Update Modal */}
      <UpdateModal
        open={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        title="Update Room"
        inputs={[
          { name: "CourseName", label: "Course Name", type: "autocomplete" },
          { name: "TimeSlotId", label: "time slot", type:"autocomplete"},
          { name: "RoomName", label: "Room Name", type: "autocomplete" },
          { name: "SemesterId", label: "Semester", type: "autocomplete" },
          { name: "Day", label: "Day", type: "day" },
        ]}
        initialData={{
          CourseName: course || "",
          TimeSlotId: timeslot || "",
          RoomName: room || "",
          SemesterId: semester,
          Day: day,
          Status: selectedRowData?.Status || "",
        }}
        autocompleteOptions={{
          RoomName: getroomData?.payload?.map((rname) => rname.RoomName),
          TimeSlotId: getimetable?.payload?.map((t) => t.StartTime),
          CourseName: getcourseData?.payload?.map((cname) => cname.CourseName),
          SemesterId: getsemestersData?.payload?.map((sem) => sem.SemesterNum)
        }}
      />

      {/* Add TimeTable Component */}
      <AddTimeTable open={openAdd} close={handleCloseAdd} />
    </>
  );
};

export default Calendar;
