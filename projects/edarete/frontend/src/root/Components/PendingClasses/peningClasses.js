import React, {useEffect} from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { GetPendingCoursesAction } from "../../Common/Store/Actions/General/GetActions/getpendingcoursesAction";
import { sideBarDataAction} from "../../Common/Store/Actions/General/GetActions/getSideBarDataAction";
import BookIcon from '@mui/icons-material/Book';
import './pendingClasses.css'

const PendingClass = () => {
  const { payload: loginData } = useSelector((state) => state.LOGINREDUCER.loginData);
  console.log("loginData", loginData)
  const token = loginData?.token || '';
  const StudentSemesterId = loginData?.studentSemesterId[0]?.StudentSemesterId
  const dispatch = useDispatch();
  const { getpendingcourses } = useSelector((state) => state?.GETPENDINGCOURSES)
  const rows = getpendingcourses?.payload ?? [];

  


useEffect(() => {
  const SidebarData=loginData.studentData.map(item => ({
    id: item.CourseId,
    title: item.CourseName,
    icon: <BookIcon />,
    path: `/classroomHome/${item.CourseName}/${item.CourseId}`,
  }))
  dispatch(sideBarDataAction(SidebarData));
}, []);
  useEffect(() => {
    dispatch(GetPendingCoursesAction(token, StudentSemesterId))
  }, [dispatch]);


  function getBadgeColor(status) {
    console.log("status", status)
    if (status === "Approved") {
      return "successBadge";
    } else if (status === "Disapproved") {
      return "dangerBadge";
    } else {
      return "primaryBadge";
    }
  }

  return (

    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Enrollment Requested Courses
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 950 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                    padding: "15px 10px",
                  }}
                >
                  Course Name
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                    padding: "15px 10px",
                  }}
                >
                  Program Name
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                    padding: "15px 10px",
                  }}
                >
                  Semester
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                    padding: "15px 10px",
                  }}
                >
                  Credit Hours
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                    padding: "15px 10px",
                  }}
                >
                  Type
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                    padding: "15px 10px",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.PlannedCourseId}>
                  <TableCell
                    sx={{
                      width: 250,
                      fontWeight: "500",
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px"
                    }}
                  >
                    {row.CourseName}
                  </TableCell>

                  <TableCell
                    sx={{
                      width: 250,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                        }}
                        className="ml-10px"
                      >
                        {row.ProgramInfo}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px"
                    }}
                  >
                    {row.SemesterNum}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px"
                    }}
                  >
                    {row.CreditHours}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px"
                    }}
                  >
                    {row.Type}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "11px",
                      padding: "8px 10px",
                    }}
                  >
                    <span className={getBadgeColor(row.Status)}>
                      {row.Status}
                    </span>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default PendingClass;
