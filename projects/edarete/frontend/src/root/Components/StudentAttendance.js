

import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { GetStudentattendanceAction } from "../Common/Store/Actions/General/GetActions/getstudentattendanceAction.js";
import { getAccessToken, getStudentData } from "../Utils/loginData/loginData.jsx";
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

function StudentAttendanceDetail({ classItem, roleName }) {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const studentData = getStudentData(loginData);
  const { id } = useParams();
  const mapArray = studentData;
  const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
  const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;

  useEffect(() => {
    handleGetAttendance();
  }, [enrollmentId]);
  console.log("enrollmentId :", enrollmentId);
  const handleGetAttendance = () => {
    if (enrollmentId) {
      dispatch(
        GetStudentattendanceAction(
          token,
          enrollmentId,
          id,
          (response) => { console.log("success", response) },
          (error) => { console.log("error", error) }
        )
      );
    }
  };

  const { studentattendanceData } = useSelector((state) => state?.STUDENTATTENDANCE);
  const attendanceData = studentattendanceData?.payload || [];
  console.log(attendanceData)
  const calculateAttendancePercentage = () => {
    const totalEntries = attendanceData.length;
    const presentEntries = attendanceData.filter((row) => row.isPresent === 1).length;
    const percentage = (presentEntries / totalEntries) * 100 || 0;
    return percentage.toFixed(2); 
  };
  const presentEntries = attendanceData.filter((row) => row.isPresent === 1).length;
  console.log('presentEntries' ,presentEntries)
  const attendancePercentage = calculateAttendancePercentage();

  const columns = [
    // {
    //   field: "Student_Name",
    //   headerName: "Student Name",
    //   flex: 1,
    //   minWidth: 180,
    // },
    {
      field: "LectureNumber",
      headerName: "Lecture Number",
      flex: 1,
      minWidth: 180,
    },
    // {
    //   field: "RegistrationNumber",
    //   headerName: "Roll Number",
    //   flex: 1,
    //   minWidth: 180,
    // },
    {
      field: "Date",
      headerName: "Date ",
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => new Intl.DateTimeFormat('en-US').format(new Date(params.row.Date)),

    },
    {
      field: "AttendanceStatus",
      headerName: "Attendance Status",
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => params.row.isPresent === 1 ? 'Present' : 'Absent',
    },
  ];

  const CustomFooter = () => {
    const percentageStyle = attendancePercentage < 75 ? { color: 'red', fontSize: '15px' } : { fontSize: '18px' };
  
    return (
      <div style={{ textAlign: 'right', paddingRight: '16px' }}>
        <span style={percentageStyle}>Attendance Percentage: {attendancePercentage}%</span>
      </div>
    );
  };
  

  return (
    <Box
    sx={{
      margin: "30px",
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
        fontSize: "14px",
      },
      "& .name-column--cell": {},
      "& .MuiDataGrid-columnHeaders": {
        background: "#e5e7eb",
        borderBottom: "none",
        lineHeight: "20px",
        fontWeight: 400,
        fontSize: "15px",
        color: "#000",
      },
      "& .MuiDataGrid-virtualScroller": {},
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
      },
      "& .MuiCheckbox-root": {  
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        color: "black",
      },
    }}
    >
      <DataGrid
        rows={attendanceData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => `${row.EnrollementId}-${row.LectureNumber}`}
        density="compact"
        // checkboxSelection
        components={{
          Footer: CustomFooter
        }}
      />
    </Box>
  );
}

export default StudentAttendanceDetail;
