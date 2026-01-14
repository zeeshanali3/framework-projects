import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Card, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CourseAggregate from "./AggregateChart";


const LowestAggregateAmongCourses = ({CourseId,roleName}) => {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state?.LOGINREDUCER?.loginData) || {};
  // const MaxMinAggregate = useSelector((state) => state.MAXMINAGGREGATE.MaxMinAggregate);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(CourseId?CourseId:null);
  const [EnrollementId, setEnrollementId] = useState(null);
  const [CourseName, setCourseName] = useState("");
  useEffect(() => {
    const courses = Array.isArray(loginData?.otpVerif?.studentData)
      ? loginData.otpVerif.studentData
      : [];
    if (CourseId) {
      const course = courses.find((c) => c?.CourseId === CourseId);
      if (course) {
        setCourseName(course?.CourseName || "");
        setSelectedCourseId(course?.CourseId || null);
        setEnrollementId(course?.EnrollementId || null);
      }
    } else if (courses.length > 0) {
      const firstCourse = courses[0];
      setCourseName(firstCourse?.CourseName || "");
      setSelectedCourseId(firstCourse?.CourseId || null);
      setEnrollementId(firstCourse?.EnrollementId || null);
    }
  }, [loginData,CourseId]);

  const open = Boolean(anchorEl);

  const handleMenuItemClick = (courseId) => {
    const list = Array.isArray(loginData?.otpVerif?.studentData)
      ? loginData?.otpVerif?.studentData
      : [];
    const selectedCourse = list.find((course) => course?.CourseId === courseId);
    if (selectedCourse) {
      setEnrollementId(selectedCourse?.EnrollementId || null);
      setCourseName(selectedCourse?.CourseName || "");
      setSelectedCourseId(courseId);
    }
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 console.log("SelectedCourseid in aggrigate:::",loginData,selectedCourseId," ", EnrollementId)
  return (
    <Card
      sx={{
        borderRadius: '10px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        p: '25px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #EEF0F7',
          paddingBottom: '10px',
          mb: '20px',
        }}
        className="for-dark-bottom-border"
      >
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 500 }}>
          Aggregate in {CourseName}
        </Typography>

        {!CourseId && (
          <>
            <Box>
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <MoreHorizIcon />
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {(Array.isArray(loginData?.otpVerif?.studentData)
                ? loginData.otpVerif.studentData
                : []
              ).map(course => {
                const courseId = course.CourseId;
                const courseName = course.CourseName;
                if (!courseId || !courseName) {
                  console.error(`Invalid course data`, course);
                  return null;
                }

                return (
                  <MenuItem
                    key={courseId}
                    sx={{ fontSize: '14px' }}
                    onClick={() => handleMenuItemClick(courseId)}
                    selected={courseId === selectedCourseId}
                  >
                    {courseName}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
      </Box>

      <CourseAggregate
        selectedCourseId={selectedCourseId}
        EnrollementId={EnrollementId}
      />
    </Card>
  );
};

export default LowestAggregateAmongCourses;
