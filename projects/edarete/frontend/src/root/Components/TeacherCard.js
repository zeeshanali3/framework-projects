import React, { useState } from "react";
import { Box, Typography, Grid, TextField, useMediaQuery, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { routesName } from "../routes/adminConstants";
import { getTeacherData } from "../Utils/loginData/loginData.jsx";
import SearchIcon from "@mui/icons-material/Search";

import {
  aligncenter,
  gridfirstBox,
  girdsecondclasscardBox,
  classcardHeader
} from "../Animation/componentSx";
import { useTheme } from "@emotion/react";

const TeacherCard = () => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const [filter, setFilter] = useState("");
  const theme = useTheme();
  //  console.log("loginData" ,loginData?.payload)
  const TeacherData = getTeacherData(loginData);
  const filteredData = TeacherData.filter(item =>
    item.CourseName.toLowerCase().includes(filter.toLowerCase())
  );
  
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up("md"));
  const UserTooltip = ({ classItem }) => (
    <Tooltip title={`Teacher: ${classItem.TeacherName}`}>
      <Box>
        <Typography variant="body2" color="textSecondary">
          TA - {classItem.AssistantName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          PN - {classItem.ProgramName} {classItem.DepartmentName}{" "}
          {classItem.ProgramYear}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total Students - {classItem.EnrollmentCount}
        </Typography>
      </Box>
    </Tooltip>
  );
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
              Courses you're teaching this Semester
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
            <Grid item xs={12} md={6} lg={6} xl={6} key={classItem.CourseId}>

              <Box
                sx={{
                  ...gridfirstBox,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderTop: "4px solid #5C5B98",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Link
                  to={`${routesName.classroomHome}/${classItem.CourseName}/${classItem.CourseId}`}
                  key={classItem.CourseId}
                  state={classItem}
                  className="text-decoration-none"
                >
                  <Box
                    sx={{
                      ...girdsecondclasscardBox,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        ...aligncenter,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'auto', 
                      }}
                    >
                      <img
                       src="data:image/png;base64,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"
                        alt="Teacher Icon"
                        style={{ height: 'auto', maxHeight: '100%', maxWidth: '100%' }}
                      />
                      <Box
                        sx={{
                          ml: 1,
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'auto', // Allows scrolling if content overflows
                        }}
                      >
                        <Typography
                          as="h3"
                          sx={{
                            ...classcardHeader,
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', // Adds ellipsis if text overflows
                          }}
                        >
                          {classItem.CourseName} - {classItem.TeacherName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: '#000',
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                          }}
                        >
                          TA - {classItem.AssistantName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: '#000',
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                          }}
                        >
                         PN - {classItem.ProgramName} {classItem.DepartmentName} {classItem.ProgramYear}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: '#000'
                          }}
                        >
                          Total Students - {classItem.EnrollmentCount}
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

export default TeacherCard;
