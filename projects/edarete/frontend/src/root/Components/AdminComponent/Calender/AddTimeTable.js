// AddTimeTable.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddItemComponent from "../../../Reuseable/Add";
import { AddTimeTableAction } from "../../../Common/Store/Actions/AddTimeTableAction/AddTimeTableAction";
import { FilterAction } from "../../../Common/Store/Actions/Filter/Filter";

const daysOfWeek = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
];

export default function AddTimeTable({ open, close }) {
    const dispatch = useDispatch();
    const mainData = useSelector((state) => state.main);
    const token = mainData?.accesstoken || "";

    const [course, setCourse] = useState("");
    const [timeslot, setTimeslot] = useState("");
    const [room, setRoom] = useState("");
    const [semester, setSemester] = useState("");
    const [day, setDay] = useState('');
    const { getcourseData } = useSelector((state) => state.GETCOURSEREDUCER);
    const { getimetable } = useSelector((state) => state.GETTIMETABLEREDUCER);
    const { getroomData } = useSelector((state) => state.GETROOMREDUCER);
    const { getsemestersData } = useSelector((state) => state.GETRSEMSTERREDUCER);
    const [errorline, seterrorline] = useState("");

    const handleFilter = (table, column, value) => {
        dispatch(
            FilterAction(
                token,
                table,
                column,
                value,
                (filteredData) => {
                    console.log(`Filtered ${column} data:`, filteredData);
                },
                (error) => {
                    console.error(`Filter ${column} error:`, error);
                }
            )
        );
    };

    const textFields = [
        {
            title: "Course",
            label: "Course",
            value: course,
            onChange: (e) => setCourse(e.target.value),
            dropdownOptions: getcourseData.payload,
            getOptionLabel: (option) => option.CourseName,
            getOptionValue: (option) => option.CourseId,
            onSelect: (selectedOption) => {
                setCourse(selectedOption?.CourseId || "");
                handleFilter("plannedcourses", "CourseName", selectedOption.CourseName);
            },
        },
        {
            title: "Time",
            label: "Time",
            value: timeslot,
            onChange: (e) => setTimeslot(e.target.value),
            dropdownOptions: getimetable.payload,
            getOptionLabel: (option) => option.StartTime,
            getOptionValue: (option) => option.TimeSlotId,
            onSelect: (selectedOption) => {
                setTimeslot(selectedOption?.TimeSlotId || "");
                handleFilter("timeslots", "TimeSlotId", selectedOption.StartTime);
            },
        },
        {
            token: token,
            tableName: "rooms",
            column: "RoomName",
            title: "Room",
            label: "Room",
            value: room,
            // onChange: (e) => setRoom(e.target.value),
            dropdownOptions: getroomData.payload,
            getOptionLabel: (option) => option.RoomName,
            getOptionValue: (option) => option.RoomId,
            onSelect: (selectedOption) => setRoom(selectedOption?.RoomId || ""),
            onChange: (selectedOption) => {
                if (selectedOption) {
                    setRoom(selectedOption?.RoomId || "");
                } else {
                    setRoom("");
                }
            },
        },
        {
            title: "Semester",
            label: "Semester",
            value: semester,
            onChange: (e) => setSemester(e.target.value),
            dropdownOptions: getsemestersData.payload,
            getOptionLabel: (option) => option.SemesterId,
            getOptionValue: (option) => option.SemesterId,
            onSelect: (selectedOption) => {
                setSemester(selectedOption?.SemesterId || "");
                handleFilter("semesters", "SemesterId", selectedOption.CourseName);
            },
        },
        {
            title: "Day",
            label: "Day",
            value: day,
            onChange: (e) => setDay(e.target.value),
            dropdownOptions: daysOfWeek,
            getOptionLabel: (option) => option.label,
            getOptionValue: (option) => option.value,
            onSelect: (selectedOption) => setDay(selectedOption?.value || ""),
        },
    ];

    const handleAddTimeTable = () => {
        if (!course || !timeslot || !room || !semester || !day) {
            seterrorline("Please fill in all the required fields.");
            return;
        }

        dispatch(
            AddTimeTableAction(
                token,
                course,
                timeslot,
                room,
                semester,
                day,
                (response) => {
                    console.log("Timetable added successfully:", response);
                    seterrorline("");
                    close();
                },
                (error) => {
                    console.error("Error adding timetable:", error);
                    seterrorline("An error occurred while adding the timetable. Please try again.");
                }
            )
        );
    };

    return (
        <AddItemComponent
            open={open}
            close={close}
            token={token}
            title="ADD Department Modal"
            textFields={textFields}
            handleAddItem={handleAddTimeTable}
            btnLabel="Create Time Table"
        />
    );
}
