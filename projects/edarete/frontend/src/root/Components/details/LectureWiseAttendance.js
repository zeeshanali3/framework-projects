import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { GetStudentattendanceAction } from "../../Common/Store/Actions/General/GetActions/getstudentattendanceAction.js";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import { getStudentData } from "../../Utils/loginData/loginData.jsx";
import { ro } from "date-fns/locale";

const LectureWiseAttendance = ({ classItem, componentID, EnrollmentId,CourseId }) => {
 
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const [attendance, setAttendance] = useState(false);
  const { token } = useSelector((state) => state.LOGINREDUCER.loginData);
  const dispatch = useDispatch();
  const { studentattendanceData } = useSelector((state) => state?.STUDENTATTENDANCE);
  const studenData = getStudentData(loginData);
 console.log('CourseId::::::', studentattendanceData);
  const mapArray = studenData;
  const matchingEnrollment =
    mapArray && mapArray?.find((enrollment) => enrollment.CourseId == CourseId.CourseId);
  const enrollmentId = matchingEnrollment
    ? matchingEnrollment.EnrollementId
    : null;
  useEffect(() => {
    handlegetAttendance();
  }, [token]);
  const handlegetAttendance = () => {
    dispatch(isLoadingAction(true));
    dispatch(
      GetStudentattendanceAction(
        token,
        enrollmentId,
        CourseId.CourseId,
        response => {
          console.log("success:::::::", response);
          dispatch(isLoadingAction(false));
        },
        error => {
          dispatch(isLoadingAction(false));
        },
      ),
    );
  };
  const uniqueStudentData = {};
  const lectureNumbers = new Set();
  
  studentattendanceData?.return?.forEach((data) => {
    console.log('data::::::', data);
    if (!uniqueStudentData[data.enrollementId]) {
      uniqueStudentData[data.enrollementId] = {
        ...data,
        id:data.lectureNumber,
        lectures: {},
        presentCount: data.isPresent ? 1 : 0,
        totalClasses: 1,
      };
    } else {
      uniqueStudentData[data.enrollementId].presentCount += data.isPresent
        ? 1
        : 0;
      uniqueStudentData[data.enrollementId].totalClasses += 1;
    }
    uniqueStudentData[data.enrollementId].lectures[data.lectureNumber] =
      data.isPresent ? 'Present' : 'Absent';
    lectureNumbers.add(data.lectureNumber);
  });


console.log('uniqueStudentData::::::', uniqueStudentData);
  // Convert map values to array and calculate percentage
  const rows = enrollmentId ? Object.values(uniqueStudentData).map((student) => {
    const row = {
      ...student,
      Percentage: ((student.presentCount / student.totalClasses) * 100).toFixed(2) + "%",
    };
    Array.from(lectureNumbers).forEach((lectureNumber) => {
      row[`Lecture_${lectureNumber}`] = student.lectures[lectureNumber] || "Absent";
    });
    return row;
  }).filter((student) => student.enrollementId == enrollmentId) : Object.values(uniqueStudentData).map((student) => {
    const row = {
      ...student,
      Percentage: ((student.presentCount / student.totalClasses) * 100).toFixed(2) + "%",
    };
    Array.from(lectureNumbers).forEach((lectureNumber) => {
      row[`Lecture_${lectureNumber}`] = student.lectures[lectureNumber] || "Absent";
    });
    return row;
  });

  // Define dynamic columns for lectures
  const lectureColumns = Array.from(lectureNumbers).map((lectureNumber) => ({
    field: `Lecture_${lectureNumber}`,
    headerName: `Lecture ${lectureNumber}`,
    minWidth: 150,
    flex: 1,
  }));
  const columns = [
    {
      field: "registrationNumber",
      headerName: "Registration Number",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "studentFirstName",
      flex: 1,
      headerName: "Student Name",
      minWidth: 200,
    },
    {
      field: "Percentage",
      headerName: "Percentage",
      minWidth: 150,
      flex: 1,
    },
    ...lectureColumns,
  ];

  return (
    <>
      <Box
        height={'auto'}
        sx={{
          overflowX: "auto",
          margin: "30px",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
          },
          "& .MuiDataGrid-columnHeaders": {
            background: "#e5e7eb",
            borderBottom: "none",
            lineHeight: "20px",
            fontWeight: 400,
            fontSize: "15px",
            color: "#000",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
          density="compact"
          // checkboxSelection
          getRowId={(row) => row?.enrollementId}
          noRowsOverlay={<div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: 'gray' }}>No rows to display</div>}
        />
      </Box>
    </>
  );
};

export default LectureWiseAttendance;
