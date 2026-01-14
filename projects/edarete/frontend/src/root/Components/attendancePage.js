


import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs, Box, Typography, InputAdornment, TextField, useMediaQuery, IconButton, Grid } from "@mui/material";
import AddSubComponent from "./modals/addsubcomponentModal";
import { useDispatch, useSelector } from "react-redux";
import { GetsubcomponentAction } from "../Common/Store/Actions/General/GetActions/getsubcomponentAction.js";
import LectureComponent from "./lectureandattendancePage";
import StudentAttendance from "./details/studentsattendanceDetails";
import LectureWiseAttendance from "./details/LectureWiseAttendance";
import { Btnsx } from "../Animation/Btnsx";
import { getStudentData, getAccessToken } from "../Utils/loginData/loginData.jsx";
import { useParams } from "react-router-dom";
import StudentAttendanceDetail from "./StudentAttendance";
import { Add, RemoveRedEye,EventNote, ArrowRightAlt as ArrowRightAltIcon } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction.js";
const AttendancePage = ({ classItem, componentID, ComponentName, userroleID, isPublic }) => {
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up("md"));

  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const isPublicDefault = isPublic || false;

  const token = getAccessToken(loginData);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const studenData = getStudentData(loginData);
  const mapArray = studenData;
  const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
  const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;
  // const initialComponent = enrollmentId ? "lecture" : "lecture";

  const [selectedComponent, setSelectedComponent] = useState("lecture");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetClassComponent = () => {
    dispatch(isLoadingAction(true));
    dispatch(
      GetsubcomponentAction(
        token,
        componentID,
        isPublic,
        (response) => {
          dispatch(isLoadingAction(false));
          console.log("success attac", response);
        },
        (error) => {
          console.log("error attc", error);
        }
      )
    );
  };

  const { getsubclasscomponentData } = useSelector(
    (state) => state?.GETSUBCOMPONENTREDUCER
  );
  const subData = getsubclasscomponentData?.payload || [];

  useEffect(() => {
    handleGetClassComponent();
  }, []);

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f1f5f9",
          width: "100%",
          height: "auto",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          className="font-medium title-font mb-4 text-gray-900 pb-2"
        >
          {selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1).toLowerCase()} Page

        </Typography>
        <Typography
          variant="body1"
          className="leading-relaxed text-base mb-4 pb-2"
        >
         
        </Typography>

        
      </Box>
      
      <Grid container sx={{ minHeight: '73vh', height: 'auto', overflow: 'auto' }}>
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          sx={{ border: "0.0625rem solid rgb(218, 220, 224)", padding: "20px" }}
        >
          { (
            <>
              <Box sx={{display:'block' }}>
                <Button
                  startIcon={<ArrowForwardIcon />}
                  onClick={() => setSelectedComponent('lecture')}
                >
                  Lectures
                </Button>
              </Box>
              <Box sx={{ display:'block' ,overflow:"hidden" }}>
                <Button
                  startIcon={<RemoveRedEye />}
                  onClick={() => setSelectedComponent('attendance')}
                >
                  Attendance Percentage
                </Button>
              </Box>
              <Box sx={{ display:'block' ,overflow:"hidden" }}>
                <Button
                  startIcon={<EventNote />}
                  onClick={() => setSelectedComponent('LectureAttendance')}
                >
                  Lecutre Wise Attendance
                </Button>
              </Box>
            </>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={10}
          sx={{ border: "0.0625rem solid rgb(218, 220, 224)" }}
        >
            {enrollmentId === null && selectedComponent=="lecture"&& (
             <Box  sx={{ display:'flex',justifyContent:'center'  }} m={1} p={2}>
                <Button
                  startIcon={<Add />}
                  onClick={handleOpenAdd}
                  sx={Btnsx}
                  variant="contained"
                >
                  Create {ComponentName}
                </Button>
              </Box>
              )}
          {selectedComponent === 'lecture' && (
            <LectureComponent classItem={classItem} componentID={componentID} ComponentName={ComponentName} />
          )}
          {selectedComponent === 'attendance' && (
            <StudentAttendance subData={subData} classItem={classItem} componentID={componentID} EnrollementId={enrollmentId} />
          )}
          {selectedComponent === 'LectureAttendance' && (
            <LectureWiseAttendance subData={subData} classItem={classItem} componentID={componentID} EnrollementId={enrollmentId} />
          )}
          {selectedComponent === 'content' && (
            <LectureComponent classItem={classItem} componentID={componentID} />
          )}
          {
            selectedComponent === 'studentattendance' && (
              <StudentAttendanceDetail />
            )
          }
        </Grid>
      </Grid>

      <AddSubComponent
        componentID={componentID}
        classItem={classItem}
        handleClose={handleCloseAdd}
        open={openAdd}
        componentName={ComponentName}
        showCloseIcon={false}
        userroleID={userroleID}
      />
    </>
  );
};

export default AttendancePage;
