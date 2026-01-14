import React, { useState ,useEffect } from "react";
import { Box, Typography, Grid, TextField, useMediaQuery,InputAdornment, IconButton, } from "@mui/material";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux"

import { routesName } from "../routes/adminConstants";
import { getStudentData } from "../Utils/loginData/loginData.jsx";
import { aligncenter ,gridfirstBox ,girdsecondclasscardBox ,classcardHeader } from "../Animation/componentSx";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";

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
const ClassroomCard = () => {
    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const theme = useTheme();
    const [filter, setFilter] = useState("");
    const [showClassroomCard, setShowClassroomCard] = useState(true);
    const toggleCardVisibility = () => {
        setShowClassroomCard((prev) => !prev);
    };
    const StudentData = getStudentData(loginData);
 
    // console.log("StudentData", StudentData)
    // to={`${routesName.classroomHome}/${classItem.CourseName}/${classItem.CourseId}`}
    // key={classItem.CourseId} state={classItem} className="text-decoration-none">
    const filteredData = StudentData?.filter(item =>
        item?.CourseName.toLowerCase().includes(filter.toLowerCase())
      );  const isLaptopScreen = useMediaQuery  (theme.breakpoints.up("md"));

    return (
        <>
          
          
          <Box>
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: isLaptopScreen ? 'row' : 'column',
            alignItems: isLaptopScreen ? 'center' : 'flex-start',
          }}
        >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#5C5B98", 
                    fontFamily: "Google Sans, 'Noto Sans', 'Noto Sans JP', 'Noto Sans KR', 'Noto Naskh Arabic', 'Noto Sans Thai', 'Noto Sans Hebrew', 'Noto Sans Bengali', sans-serif",
                    textTransform: "uppercase", 
                    letterSpacing: ".0625rem",
                    borderBottom: ".0625rem solid #5C5B98", 
                  }}
                >
                  Courses you're enrolled this Semester
                </h2>
    
            </div>
            <TextField
              id="search-input"
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ width: isLaptopScreen ? "25%" : "100%", background: "#fff", boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" sx={{ background: "#fff" }}>
                    <IconButton type="submit" aria-label="search" sx={{ p: 1 }}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            </Box>
          
            <Grid
              container
              justifyContent="left"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
              mt={3}
            >
              {filteredData.map((classItem) => (
                <Grid item xs={12} md={6} lg={6} xl={3} key={classItem.CourseId}>
                  <Box
                    sx={{
                      ...gridfirstBox,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      borderTop:"4px solid #5C5B98",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <Link
                      to={`${routesName.classroomHome}/${classItem.CourseName}/${classItem.CourseId}`}
                      key={classItem.CourseId}
                      state={{row:classItem,CourseId:classItem.CourseId}}
                      className="text-decoration-none"
                    >
                      <Box sx={girdsecondclasscardBox}>
                        <Box sx={aligncenter}>
                          {/* <TeacherIcon /> */}
                         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHE0lEQVR4nO2bD0yU9xnH360d6bLEJovJjLODKP/uBA96cIAcfyqtk/8UcyqVSaT8uaMuNjZdyVpHdQgnTPQaqbNWVzMZ7FRU/loof9qSJU22pmu6LEvN0jQ9ky51mRrjGJuf5Xd3r2O395W7870dkvsmn+R93uf5Ps/Dj/fgPKIkRRRRRBFFFFHIpbcQFd3EwZgmrsY0gRLRTdyItvFuTBNbZF90E5tibLwT3cTf1HwxNlzRTdjFDGmxao0N+xob+MtqK92rrbQE4hEzpMWq+EZcCVZIsLFetaaB5XGN1Cc0ct1da4V4K7Pxjfwo4TlW3sNndtc24pIWi/QWovQNHNQ3cFXfADL+eBMbqJvnecmvefNm6Btw6erD/JJIrseeXA+++OPVN7FCrk+tVf/O+8z7n1liBylcMtThSqmDlHrPI+++rvPvAO63fl0DZnEtdpDCJWMtCNTiQP2hnqe5TDtBsFDsi9b1UriUVQOChWJftK6XwqWcHSBQiwP1h3qe5sr/AQjU4kD9oZ6nuQq2g2Ch2Bet66VwaeMzIFgo9kXreilcKqwCgVocqD/U8zRXyVYQqMWB+kM9T3NVbAGBWhyoP9TzNNdmCwjU4kD9oZ6nubZsBoEcWzbjErHFgjkY/720dTM57vpKvgjGHxJVVYJAjrc9Tbt8T5Wn+UtVJUPPVJJ7914F5qpKLm2r5Es//G1q8//vqi7nZnUFbCvz/HPWYiGqupz26gpc4r6WbK/gi+3ltIkZ7sMuY6X3/o2wHUBNOZM15VBTRrO/nmdL+c6Ocn5cU8Y/3V6Pf7amnOerSlju9+wymoV3RzkTUri0s5SS2jKoLWV2ZxnNtd4nwR/VlrHH7fX4fxiAb6V7VimzXn+xFE41FNPaUALhoL6Yn97X8hYLUdYiDtqKuWorhvlYi3DZirHLr7l7yVpIia2YCWsRN337aI13xoStSIPv/K5C7LuK4F48V0i7tFS1exOu3ZuguRdenvlvxD2REzXSUtWe74Pg1feUkfPSUtWLG0HQ9q4ycl6BL198ilaLhYekB1nNT4Kgc1oZOa/GSwUMtyzmv9UtpFcKQHBkShk57+vbW0D6Kxv4s8i9vIFu6UFVywYQdE8qI+cVvQWs/skTXBf5vflhfjMSrPbng+CNd5SR82r+fXlY5Rp/2JfPjf359O9/ggRpMehAHgjeGldGzqv5W/J4+EAuV+S6ALhmz2NVoPvan+TRA7lUHsjjeGsuH7Xm8mlrHj1tZuKDOgB7Dgh6xpSR80E1V5qXx6r2HEZEz/Yczi5U77TwUJuZDHsOe+05zNjNzMk7+fBXey66gBfqNIPA+bYycl7SUOIQRM8OM9dV89k822Hm1x1mrsk7eJntNDPZkU1zx3qyDmVj6DQz7O03EPAyh7NBcOGyMnJe0lBHsvme6NmV7TmAQ5l885CZTYez6epazx/kmfP4Y1c2jq4sijuf4lu+/Q5l8l1vXeCfC7yWBYKhEWXkvEZfu9SdxmOOTC67+2Zy1ZHFmCOT2/IcL9ccWTgdmdSJw1qo58+MLBc+Rxa3Al8oEwRjw8rIeX/7BEUGc92ZvH80g71HM8gQr3t/92+R+PrRTI56e00FfAA/zwDB1JAyct7fPv5yzMSVYyZeP26iwmFiWcCLS5J0zIThWAa/cfc0Mfe6iZyAm5xIB8HMoDJy/riRb0iLRL80sexEOodPpDEndnsjHdebJjYG1exUGgg+GPCgFp9M4+NTRh7X/KsJfN/Sk0Y+d+9lZO5UGg5xIEE3PG0EwYcXPajFXv5x+nHs4Xga3jKy5rSR0Xm7/PZUGun33bgnFQSfXPCgFp9JpftMKne81x/0pgbxpiMI/SKPR86ksu9MKn9375LCVz0p1IkffpoM6DPg6kuBDx3wp34Q1wJx/bvD3tjg+USoN5WCPgOfee/d7kvhBc0WUVBvCoV9Bq6Ieb0p3OlN4WSP0f+Pzf2Scx32swZYgLt/iRGvt7MG3pRzznXMOFOJ1XKn88mscho4d3eGgd+fM5AthUJOPVH9ydjPJ+HqT4b5iHvnk2kXNb6+/mQKZc/5JG71J7ELia/dzy5TeTx8LokX+pO56d3hZn8Se8R9aTHKaeTRi2s5fikJBBeTmLmkD+5pGNBjvrSWj+f1GhzQL/wucFFoUEfRkB7XkB6GdNwa1LHb36fhsp5vD+pxDOn5l/AP6rgyrKNQetA0EM/y0UScozoQjCQyenktj6nVix+ew4nUjyRyzV2v4/aojlenonlEepA1rmPrWAJfjSfCeAK3xhM5MqajYErPipFYlo0nkDyWyPPjCXzqrvHUvT2mI05aKprSs2Iynl9NxHNnMh5UieOzifj//K+RJaf34zBMx3F4OpaPpmO5MR3L7HQcn0/HcuG9WKo/UfjtElFEEUUUUUSS5vo3b2cQAFv12ywAAAAASUVORK5CYII="></img>

                          <Box className="ml-1">
                            <Typography
                              as="h3"
                              sx={classcardHeader }
                            >
                              {classItem.CourseName} -  {classItem.TeacherName}
                            </Typography>
                              <Typography
                            sx={{
                                fontSize: 14,
                                color:'#000'
                            }}
                          >
                             TA - {classItem.AssistantName} 
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color:'#000'
                            }}
                          >
                             PN - {classItem.ProgramName} {classItem.DepartmentName} {classItem.programYear}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color:'#000'
                            }}
                          >
                             Enrollments:  {classItem.StudentCount}
                          </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      );
};

export default ClassroomCard;
