import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  AvatarGroup,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import user1 from "../../assets/images/user2.png";
import pic from "../../assets/images/images-removebg-preview.png";
import { useSelector } from "react-redux";
import user2 from "../../assets/images/user5.png";
import user3 from "../../assets/images/user7.png";
import { routesName } from "../../routes/adminConstants";
import { getStudentData } from "../../Utils/loginData/loginData";
import {
  outerbox,
  secondouterbox,
  centerProperty,
  aligncenter,
  gridfirstBox,
  girdsecondclasscardBox,
  spacebetweenalignEnd,
  viewdetailsSx,
} from "../../Animation/componentSx";

const TeacherIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 241.637 89.046 a 8.012 8.012 0 0 1 6.409 -1.875 a 7.562 7.562 0 0 1 5.437 3.615 a 10.677 10.677 0 0 1 1.12 4.3 a 32.043 32.043 0 0 1 -3.267 16.985 a 20.377 20.377 0 0 1 -5.266 6.912 a 13.507 13.507 0 0 1 -6.279 2.83 l -1.075 0.166 c -0.515 1.928 -1.094 3.553 -1.378 4.415 c -1.83 4.966 -12.073 22.158 -24.961 28.412 c -0.032 4.338 -0.117 9.305 1.395 13.059 c 2.587 6.384 16.522 14.429 17.482 14.846 c 0 0 -7.57 29.116 -43.57 29.116 c -45.778 0 -43.911 -30.238 -43.911 -30.238 c 0.96 -0.417 12.717 -7.34 15.3 -13.724 c 1.721 -4.26 1.371 -10.093 1.4 -14.792 A 49.862 49.862 0 0 1 148.428 142.4 a 54.5 54.5 0 0 1 -10.385 -20.27 L 136 121.814 a 13.507 13.507 0 0 1 -6.279 -2.83 a 20.377 20.377 0 0 1 -5.266 -6.912 a 32.043 32.043 0 0 1 -3.267 -16.985 a 10.692 10.692 0 0 1 1.119 -4.3 a 7.564 7.564 0 0 1 5.438 -3.615 a 8.012 8.012 0 0 1 6.409 1.875 s 5.089 -47.737 53.978 -47.737 S 241.637 89.046 241.637 89.046 Z"
      stroke="rgb(0, 0, 0)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgb(92, 133, 222)"
    />
  </svg>
);
export default function ArchClass() {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const [filterText, setFilterText] = useState("");

  const StudentData = loginData ? getStudentData(loginData) : [];

  const dummyData = [
    {
      CourseId: 1,
      CourseName: "Electronic Device and Circuit's ",
      TeacherName: "Mr.Aftab Alam ",
      AssistantName: "Muhammad Usama Riaz",
      ProgramName: "Bachelor of Technology in Computer Science",
      TotalStudents: 50,
      StudentsEnrolled: [
        { id: 1, name: "Student 1", avatar: user1 },
        { id: 2, name: "Student 2", avatar: user2 },
        { id: 3, name: "Student 3", avatar: user3 },
      ],
    },
    {
      CourseId: 2,
      CourseName: "Data Structure and Alogrithm",
      TeacherName: "Mr.Usman Younius",
      AssistantName: "Muhammad Hamza Hayee",
      ProgramName: "Bachelor of Technology in Computer Engierring",
      TotalStudents: 60,
      StudentsEnrolled: [
        { id: 4, name: "Student 4", avatar: user1 },
        { id: 5, name: "Student 5", avatar: user2 },
        { id: 6, name: "Student 6", avatar: user3 },
      ],
    },
  ];

  // Filter function
  const filteredData = dummyData
    ? dummyData.filter((item) =>
        item.CourseName.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  // to={`${routesName.classroomHome}/${classItem.CourseName}/${classItem.CourseId}`}
  //                                             key={classItem.CourseId}
  //                                             state={classItem}

  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2 
          style={{
            lineHeight: "20px",
            fontSize: "20px",
            fontWeight: "500",
            color: "#000",
            fontFamily: "Roboto, sans-serif",
            marginTop:'10px',
          }}
          // className="text-xl font-semibold mt-8 mb-4"
          >
            {" "}
            Courses you have cleared
          </h2>
          {/* <Box
                       sx={centerProperty}
                    >
                        <Typography
                            as="h3"
                            sx={{
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Cleared Courses
                        </Typography>

                        <TextField
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            variant="standard"
                            placeholder="Search cleared courses"
                        />
                        '
                    </Box> */}
        </div>

        <Grid
          container
          justifyContent="left"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
          mt={3}
        >
          {Array.isArray(dummyData) &&
            dummyData.map((classItem) => (
              <Grid item xs={12} md={6} lg={6} xl={3} key={classItem.CourseId}>
                <Link
                  to={`${routesName.classroomHome}/${classItem.CourseName}/${classItem.CourseId}`}
                  key={classItem.CourseId}
                  state={classItem}
                >
                <Box
                  sx={{
                    ...gridfirstBox,
                    // borderTop:"5px solid #337DFF",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box sx={girdsecondclasscardBox}>
                    <Box sx={aligncenter}>
                      <TeacherIcon />

                      <Box className="ml-1">
                        <Typography
                          as="h5"
                          sx={{
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {classItem.CourseName} - {classItem.TeacherName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#000",
                          }}
                        >
                          TA - {classItem.AssistantName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#000",
                          }}
                        >
                          PN - {classItem.ProgramName}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
