import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Typography,
  Box, FormControlLabel, Checkbox,ToggleButton, ToggleButtonGroup
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Add, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AddlectureattendanceAction } from "../../Common/Store/Actions/General/PostActions/postlectureattendanceAction.js";
import { getAccessToken } from "../../Utils/loginData/loginData.jsx";
import { FormatDate } from "../../validation/validtionFunctions";
import { toast, ToastContainer } from "react-toastify";
import { GetStudentattendanceAction } from "../../Common/Store/Actions/General/GetActions/getstudentattendanceAction.js";
import Loader from '../../Components/Loader/Loader';


const AddLectureAttendance = ({ open, close, data, subComponentId, selectedrowData, ComponentName, CourseId }) => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const { studentattendanceData } = useSelector((state) => state?.STUDENTATTENDANCE);
  const [loading, setLoading] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState({ totalPresent: 0, totalAbsent: 0, totalStudents: 0 });
  const token = getAccessToken(loginData);
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState(null);


  const [attendanceData, setAttendanceData] = useState([]);
  useEffect(() => {
    if (subComponentId) {
      handlegetAttendance()
    };
  }, [subComponentId]);


  function handlegetAttendance() {
    setLoading(true);
    dispatch(
      GetStudentattendanceAction(
        token,
        0,
        subComponentId,
        (response) => {
          console.log("response.payloadd", response.payload);
          const mergedArray = data.map(student => {
            const attendanceRecord = response?.payload?.find(att => att.EnrollementId === student.EnrollementId);
            return {
              ...student,
              ...attendanceRecord,
              isPresent: attendanceRecord ? attendanceRecord.isPresent : null
            };

          });
          const totalPresent = mergedArray.filter(student => student.isPresent).length;
          const totalAbsent = mergedArray.filter(student => student.isPresent == 0).length;
          const totalStudents = mergedArray.length;

          setAttendanceCount({
            totalPresent,
            totalAbsent,
            totalStudents
          });
          setLoading(false)
          setAttendanceData(mergedArray);
          console.log("mergedArray:::", mergedArray)
          console.log("success", response);
        },
        (error) => {
          setLoading(false);
          console.log("error", error);
        }
      )
    );
  }


  const handleStatusChange = (enrollmentId, val) => {
    const updatedAttendanceData = attendanceData.map((data) => {
      // If enrollmentId is provided, update only the specific student
      if (enrollmentId === null || data.EnrollementId === enrollmentId) {
        return {
          ...data,
          isPresent: val === "Present" ? 1 : 0,
        };
      }
      return data;
    });
    setAttendanceData(updatedAttendanceData);

    // Update the alignment state based on the action
    if (enrollmentId === null) {
      setAlignment(val);
    }
  };

  // Function to handle the select all toggle buttons
  const handleSelectAllChange = (event, newAlignment) => {
    if (newAlignment) {
      handleStatusChange(null, newAlignment);
    }
  };


  const handleMarkAttendance = () => {
    if (attendanceData.length === 0) {
      console.log("No attendance data selected.");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    console.log("AttendanceData", attendanceData)
    const formattedAttendanceData = attendanceData.map((enrollmentId) => ({
      EnrollementId: enrollmentId,
      SubComponentId: subComponentId,
      IsPresent: enrollmentId?.isPresent,
    }));

    dispatch(AddlectureattendanceAction(token, formattedAttendanceData, currentDate,
      (response) => {
        
        toast.success(response?.message);
        close()
        // handlegetclassComponent();
      },
      (error) => {

        if (error?.message?.status != 500) {
          if (error?.message?.payload != "") {
            const payloadKeys = Object.keys(error?.message?.payload);
            if (payloadKeys.length > 0) {
              console.log("myError", error?.message);
              toast.error(error?.message?.payload[payloadKeys[0]]);
            }
          }
          else {
            toast.error(error?.message?.message);
          }
        }
        else {
          toast.error("Server Error " + error?.message?.status);
        }
      }
    )
    );
  };

  const columns = [
    { field: "RegNum", headerName: "Registration Number", minWidth: 200, flex: 1, filterable: false, menubar: false },
    { field: "StudentName", headerName: "Student Name", minWidth: 200, flex: 1, filterable: false, menubar: false },
    {
      field: "attendanceStatus",
      headerName: "Attendance",
      minWidth: 250,
      flex: 1,
      filterable: false,
      menubar: false,
      renderHeader: () => (
        <ToggleButtonGroup
          value={alignment=="None"?null:alignment}
          exclusive
          onChange={handleSelectAllChange}
          aria-label="attendance selection"
        >
          <ToggleButton value="Present" aria-label="all present" sx={{ color: "green" }}>
            All Present
          </ToggleButton>
          <ToggleButton value="Absent" aria-label="all absent" sx={{ color: "red" }}>
            All Absent
          </ToggleButton>
        </ToggleButtonGroup>
      ),
      renderCell: (params) => {
        const { EnrollementId } = params.row;
        const attendanceRecord = attendanceData.find((data) => data.EnrollementId === EnrollementId);

        return (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={(attendanceRecord ? attendanceRecord.isPresent : null) === 1}
                  onChange={() => handleStatusChange(EnrollementId, "Present")}
                  sx={{
                    color: "green",
                    fontSize: "28px",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                />
              }
              label="Present"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={(attendanceRecord ? attendanceRecord.isPresent : null) === 0}
                  onChange={() => handleStatusChange(EnrollementId, "Absent")}
                  sx={{
                    color: "red",
                    "&.Mui-checked": {
                      color: "red",
                    },
                  }}
                />
              }
              label="Absent"
            />
          </div>
        );
      },
    },
  ]
  const [sortModel,setSortModel] = useState([
    {
      field: 'RegNum',
      sort: 'asc',
    },
  ]);
  console.log("studentattendanceData", studentattendanceData.payload)
  const CustomToolbar = () => {
    const { totalPresent, totalAbsent, totalStudents } = attendanceCount;

    return (
      <>
        <GridToolbarContainer className="flex justify-between mb-2" sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <div >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {FormatDate(selectedrowData?.Date)}
            </Typography>
          </div>
          <div>
            <GridToolbarFilterButton sx={{ marginRight: 1 }} />
            <Button
              onClick={handleMarkAttendance}
              startIcon={<Add sx={{ color: "white" }} />}
              variant="contained"
              color="success"
              sx={{ marginRight: 1, color: "white" }}
            >
              Save
            </Button>
            <Button
              onClick={close}
              startIcon={<Close sx={{ color: "white" }} />}
              variant="contained"
              color="error"
            >
              Close
            </Button>
          </div>
        </GridToolbarContainer>
        <Box sx={{ padding: 2, backgroundColor: '#B5CFB7', borderRadius: 1, marginBottom:"10px"}}>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: '#4f6c92',  // Subtle blue
                  color: 'white',
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>Total</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>{totalStudents}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: "white" }}>Present</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>{totalPresent}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: '#dc3545',  // Red or light gray
                  color: 'white',
                  borderRadius: 2,
                  textAlign: 'center',
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>Absent</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>{totalAbsent}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };

  return (
    <Dialog open={open} onClose={close} fullScreen>

      <DialogContent>
        <Box
          height={'auto'}
          sx={{
            overflowX: "auto",
            margin: "10px",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              // borderBottom: "none",
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
              //  border: "none", 
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
            disableSelectionOnClick
            components={{ Toolbar: CustomToolbar }}
            density="compact"
            getRowId={(row) => row?.EnrollementId}
            autoHeight
            sortModel={sortModel}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5', // Header background color
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#333', // Header text color
              },
              '& .MuiDataGrid-cell': {
                color: '#000', // Cell text color
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#e0e0e0', // Footer background color
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f0f0f0', // Row hover background color
              },
            }}
          />
        </Box>

      </DialogContent>
      <Loader open={loading} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Dialog>

  );
};

export default AddLectureAttendance;