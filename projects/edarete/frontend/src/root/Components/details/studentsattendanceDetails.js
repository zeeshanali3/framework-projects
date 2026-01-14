

import React, { useEffect, useState } from "react";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { IconButton, Box } from "@mui/material";
import { NumbersRounded, PeopleAltRounded, LiveHelpRounded, RemoveCircle, Percent } from "@mui/icons-material";
import { GetStudentattendanceAction } from "../../Common/Store/Actions/General/GetActions/getstudentattendanceAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast ,ToastContainer } from "react-toastify";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction";

const StudentAttendance = ({ classItem, componentID,EnrollementId }) => {
  console.log("ANDAR SE CLL KIYA HAI:::",EnrollementId)
  const [attendance, setAttendance] = useState(false);
  const { token } = useSelector((state) => state.LOGINREDUCER.loginData);
  const dispatch = useDispatch();
  const { studentattendanceData } = useSelector((state) => state?.STUDENTATTENDANCE);
  console.log(studentattendanceData?.payload);
  const { id} =useParams();
  useEffect(() => {
    handlegetAttendance();
  }, [token]);

  const handlegetAttendance = () => {
    dispatch(isLoadingAction(true));
    dispatch(
      GetStudentattendanceAction(
        token,
        0,
        id,
        (response) => {
          dispatch(isLoadingAction(false));
          console.log("success", response);
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error", error);
        }
      )
    );
  };

  // Process data to ensure unique student names
  const uniqueStudentData = {};
  studentattendanceData?.payload?.map((data) => {
    if (!uniqueStudentData[data.Student_Name]) {
      uniqueStudentData[data.Student_Name] = {
        ...data,
        presentCount: data.isPresent ? 1 : 0,
        totalClasses: 1,
      };
    } else {
      uniqueStudentData[data.Student_Name].presentCount += data.isPresent ? 1 : 0;
      uniqueStudentData[data.Student_Name].totalClasses += 1;
    }
  });

  // Convert map values to array and calculate percentage
  const rows =EnrollementId? Object.values(uniqueStudentData).map((student) => ({
    ...student,
    Percentage: ((student.presentCount / student.totalClasses) * 100).toFixed(2) + "%",
  })).filter((student) => student.EnrollementId ==  EnrollementId):Object.values(uniqueStudentData).map((student) => ({
    ...student,
    Percentage: ((student.presentCount / student.totalClasses) * 100).toFixed(2) + "%",
    }));
    

  const columns = [
    {
      field: "RegistrationNumber",
      headerName: "Registration Number",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "Student_Name",
      flex: 1,
      headerName:"Student Name",
      minWidth: 200,
    },
  
    {
      field: "Percentage",
      headerName:"Percentage",
      minWidth: 150,
      flex: 1,
    },
  
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
             rows={rows} 
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{ Toolbar: GridToolbar }}
              density="compact"
              checkboxSelection
              getRowId={(row) => row?.EnrollementId}
              noRowsOverlay={<div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: 'gray' }}>No rows to display</div>}
            />
          </Box>
    </>
  );
};

export default StudentAttendance;