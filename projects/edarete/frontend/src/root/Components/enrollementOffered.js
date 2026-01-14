import React, { useEffect, useState } from "react";
import {
  TableRow,
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  TableContainer,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AddstudentenrollementsAction } from "../Common/Store/Actions/General/PostActions/addstudentenrollementAction";
import { GetstudentenrollmentforcourseAction } from "../Common/Store/Actions/General/GetActions/getstudentenrollementforcourseAction";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from '@mui/icons-material/Check';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tableHeader={
  borderBottom: "1px solid #F7FAFF",
   fontSize: "15px",
   fontWeight:'bold'
}
const tableCell={
  borderBottom: "1px solid #F7FAFF",
   fontSize: "14px",
}
export default function CreatedCourses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6);
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = loginData?.token;
  const student_semester_Id = loginData?.payload?.studentSemesterId[0]?.StudentSemesterId;
const student_user_Id = loginData?.payload?.studentUserId[0]?.StudentUserId;

  useEffect(() => {
    dispatch(GetstudentenrollmentforcourseAction(token, student_semester_Id));
  }, [dispatch, token, student_semester_Id]);

  const { getcourseenrollementData } = useSelector((state) => state?.GETENROLLEMENTFORCOURSE);
  
  const courserow = getcourseenrollementData?.payload;
  const handleCheckboxChange = (PlannedCourseId) => {
    const isSelected = selectedEnrollments.includes(PlannedCourseId);
    setSelectedEnrollments((prevSelected) =>
      isSelected
        ? prevSelected.filter((selected) => selected !== PlannedCourseId)
        : [...prevSelected, PlannedCourseId]
    );
  };

  const handleSuccess = (courseName) => {
    toast.success("Successfully applied for " + courseName);
  };
  
  const handleFailure = (error,courseName) => {
    console.log(error?.message)
    if(error?.message.includes("Already applied"))
    {
      console.log("ErrorFound",error)
      toast.error( error.message+" "+courseName);
    }
    else{
      console.log("ErrorFound1",error.status!=500 ? error.payload : error?.status+" Server Error")

      const payloadValues = error.status!=500 ? Object.values(error.payload) : " Server Error " + error?.status;
      console.log("payloadValues",payloadValues);
      const extractedError = (payloadValues?.length > 0 && error?.status != 500)  ? payloadValues[0] : payloadValues;
      toast.error( extractedError);
    }
  };
  
  const displaySelectedEnrollments = () => {
    selectedEnrollments.forEach((PlannedCourseId) => {
      const course = filteredCourses.find(course => course.PlannedCourseId === PlannedCourseId);
      if (course) {
        const { CourseName } = course;
        dispatch(
          AddstudentenrollementsAction(
            token,
            student_semester_Id,
            PlannedCourseId,
            "I",
            () => handleSuccess(CourseName),
            (err) => handleFailure(err?.message,CourseName)
          )
        );
      }
    });
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = courserow?.filter((course) =>
    course?.CourseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCourses = filteredCourses?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
        {courserow ? (

      <Box sx={{ boxShadow: "none", borderRadius: "10px", p: "25px", mb: "15px", border: ".0625rem solid #e0e0e0", borderTop:"4px solid #5C5B98",}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #EEF0F7", paddingBottom: "10px", mb: "20px" }} className="for-dark-bottom-border">
          <Typography as="div" sx={{ fontSize: 18, fontWeight: 500 }}>Courses Offered  </Typography>
          <Button onClick={displaySelectedEnrollments} variant="contained" sx={{ textTransform: "capitalize", borderRadius: "8px", fontWeight: "500", fontSize: "13px", padding: "6px 20px", color: "#fff !important" }}>
            <CheckIcon sx={{ position: "relative", top: "-1px" }} className="mr-5px" /> Apply
          </Button>
        </Box>
        <Box
        sx={{
          width: "100%",
          height: "auto",
          alignItems: "center",
        }}
        >
          <TextField fullWidth value={searchQuery} onChange={handleSearchChange}
        sx={{background:"#fff" ,mb:3}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ background: "#fff" }}>
              <IconButton type="submit" aria-label="search" sx={{p:1}}>
                <SearchIcon  />
              </IconButton>
            </InputAdornment>
          ),
        }}
        />

        </Box>
        
        <TableContainer sx={{ boxShadow: "none", width: "100%", border: '.0625rem solid #e0e0e0', borderRadius: "10px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="custom pagination table" className="dark-table">
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell sx={tableHeader} width={'250'}>Courses Name</TableCell>
                <TableCell sx={tableHeader}  width={'250'}>Program Name</TableCell>
                <TableCell align="right" sx={tableHeader}  width={'250'}>Credit Hours</TableCell>
                <TableCell align="right" sx={tableHeader}  width={'250'}>Semester</TableCell>
                <TableCell align="center" sx={tableHeader}  width={'250'}>Type</TableCell>
                <TableCell align="center" sx={tableHeader}  width={'250'}>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {displayedCourses?.length === 0 ? (
  <TableRow>
    <TableCell colSpan={6} align="center" >
      <span style={{fontSize:'20px'}}>
      No records found
      </span>
    </TableCell>
  </TableRow>
) : (
  displayedCourses?.map((row) => (
    <TableRow key={row.PlannedCourseId}>
      <TableCell style={{ width: 650 }} sx={tableCell}>
        <Link href={row.courseLink} underline="none" color="#260944" >{row.CourseName}</Link>
      </TableCell>
      <TableCell sx={tableCell}>{row.ProgramName + " " + row.DepartmentName + " " + row.ProgramYear}</TableCell>
      <TableCell align="right" sx={tableCell}  width={'250'}>{row.CreditHours}</TableCell>
      <TableCell align="right" sx={tableCell}  width={'250'}>{row.SemesterNum}</TableCell>
      <TableCell align="center" sx={tableCell}  width={'250'}>{row.Type}</TableCell>
      <TableCell align="center" sx={tableCell}  width={'250'}>
        <input type="checkbox" checked={selectedEnrollments.includes(row.PlannedCourseId)} onChange={() => handleCheckboxChange(row.PlannedCourseId)} />
      </TableCell>
    </TableRow>
  ))
)}
            </TableBody>
            <TableFooter >
              <TableRow >
               <TableCell colSpan={6}>
               <TablePagination
                  rowsPerPageOptions={[6]} 
                  component="div"
                  count={filteredCourses.length} 
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  labelRowsPerPage="" 
                />
               </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
         
        </TableContainer>
      </Box>
          ) : (
            <Typography variant="body1" align="center" fontSize={'20px'}>
            No data found
          </Typography>
          )}
        
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
}