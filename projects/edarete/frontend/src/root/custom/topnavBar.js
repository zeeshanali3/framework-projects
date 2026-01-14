import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Badge,
  useMediaQuery,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import { ArrowRight, Close, Download, Logout, Settings } from "@mui/icons-material";
import { HelperNavigator } from "./helperFunctions";
import ChangepasswordModal from "../Components/modals/changepasswordModal";
import WarningModal from "../Components/modals/warningModal";
import { LogoutAction } from "../Common/Store/Actions/General/UpdateActions/LogoutAction";
import { useDispatch, useSelector } from "react-redux";
import { routesName } from "../routes/adminConstants";  
import { getStudentData } from "../Utils/loginData/loginData.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getRoleData } from '../Utils/loginData/loginData.jsx';
import LogoutModal from "./logoutModal";
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getActivityOutcomeAction } from '../Common/Store/Actions/General/GetActions/getActivityOutcomeAction.js';
import { getActivities } from '../Common/Store/Actions/General/GetActions/getActivitiesAction.js';
import { toggleSidebarAction } from "../Common/Store/Actions/General/PostActions/toggleSideBarAction.js";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
function Header({
  title,
  onAddClick,
  navigations,
  showAddIcon = true,
  showCloseIcon = true,
  showMenu = true,
  icon,
  classroomIcon = true,
  hideLogout = true,
  hidearchieveclass = true,
  showpendingIcon = true,
  courseId
}) {
  const loginData = useSelector((state) => state?.LOGINREDUCER?.loginData) || {};
  const isSidebarOpen = useSelector((state) => state?.TOGGLESIDEBAR?.isSideBarOpen) ?? true;
  const token = loginData?.accessToken;
  const email = loginData?.userData?.[0]?.Email;
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const [openchangePw, setopenchangePw] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(5);
  const roleData = getRoleData(loginData);

  const { RoleName } = roleData || {};

  const studenData = getStudentData(loginData)
  const { id } = useParams();
  const mapArray = studenData;
  const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);

  const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;
  const handleopenPw = () => {
    setopenchangePw(true);
  };
  const fetchData = async (type) => {
    if (type == "Outcome") {
      return new Promise((resolve, reject) => {
        dispatch(getActivityOutcomeAction(
          token,
          courseId,
          (response) => resolve(response.payload),
          (error) => reject(error)
        ));
      });
    }
    else if (type == "Activities") {
      console.log("Type1", type)
      return new Promise((resolve, reject) => {
        dispatch(getActivities(
          token,
          courseId,
          (response) => resolve(response.payload),
          (error) => reject(error)
        ));
      });
    }
  };

  const generateActivitiesOutcomeExcelReport = async () => {
    handleClose();
    const data = await fetchData("Outcome");
    const activityQuestionMap = {};
    const questionIndexMap = {};
    let questionCounter = 0;
    data.forEach(item => {
      const { Activity, Question, QuestionId, SubComponentId, ActivityNum } = item;
      if (!activityQuestionMap[SubComponentId]) {
        activityQuestionMap[SubComponentId] = { Activity, ActivityNum, Questions: [] };
      }
      const questionExists = activityQuestionMap[SubComponentId].Questions.find(q => q.QuestionId === QuestionId);
      if (!questionExists) {
        activityQuestionMap[SubComponentId].Questions.push({ Question, QuestionId });
        questionIndexMap[QuestionId] = questionCounter++;
      }
    });
    const headerFirstLine = ["Roll Number", "Name", " ", " "];
    const headerSecondLine = [" ", " ", " ", " "];
    Object.values(activityQuestionMap).forEach(({ Activity, Questions, ActivityNum }) => {
      Questions.forEach(({ Question, QuestionId }) => {
        headerFirstLine.push(Activity + " " + ActivityNum);
        headerSecondLine.push(Question);
      });
    });
    const groupedData = {};
    data.forEach(item => {
      const { StudentName, QuestionId, ObtainedMarks, EnrollementId, RegNum } = item;
      if (!groupedData[StudentName]) {
        groupedData[StudentName] = { RegNum, Enrollements: {} };
      }
      if (!groupedData[StudentName].Enrollements[EnrollementId]) {
        groupedData[StudentName].Enrollements[EnrollementId] = {};
      }
      groupedData[StudentName].Enrollements[EnrollementId][QuestionId] = ObtainedMarks;
    });
    const rows = [];
    Object.entries(groupedData).forEach(([studentName, studentData]) => {
      const { RegNum, Enrollements } = studentData;
      Object.entries(Enrollements).forEach(([enrollmentId, marks]) => {
        const row = [
          RegNum,
          studentName,
          "",
          "",
          ...Object.keys(questionIndexMap).map(id => {
            const index = questionIndexMap[id];
            return marks[id] !== undefined ? marks[id] : '';
          })
        ];
        rows.push(row);
      });
    });
    const worksheetData = [
      headerFirstLine,
      headerSecondLine,
      ...rows
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(excelBlob, 'Activities_Outcome.xlsx');
    handleClose();
  };

  const generateActivitiesExcelReport = async () => {
    handleClose();
    const data = await fetchData("Activities");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Define header
    worksheet.columns = [
      { header: 'Section Name', key: 'SectionName', width: 20 },
      { header: 'Activity', key: 'Activity', width: 15 },
      { header: 'Name', key: 'Name', width: 25 },
      { header: 'Date', key: 'Date', width: 15 },
      { header: 'Total Marks', key: 'TotalMarks', width: 10 },
      { header: 'GPA Weight', key: 'GPAWeight', width: 10 },
      { header: 'Sub Activity Name', key: 'SubActivityName', width: 30 },
      { header: 'Sub Activity Max Marks', key: 'SubActivityMaxMarks', width: 20 },
      { header: 'Sub Activity Weight', key: 'SubActivityWeight', width: 15 },
      { header: 'CLO', key: 'CLO', width: 10 },
    ];

    // Add data
    data.forEach(item => {
      worksheet.addRow({
        SectionName: item.SemesterName,
        Activity: item.Activity,
        Name: item.Activity + item.ActivityNum,
        Date: item.Date.split('T')[0],
        TotalMarks: item.TotalMarks,
        GPAWeight: 4,
        SubActivityName: item.Sub_Activity_Name,
        SubActivityMaxMarks: item.SubActivityMaxMarks,
        SubActivityWeight: item.SubActivityMaxMarks,
        CLO: "CLO" + item.CLONum,
      });
    });

    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: 'center' };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };

    // Generate and save the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Activities.xlsx');
  };
  const handleclosePw = () => {
    setopenchangePw(false);
  };
  hidearchieveclass = enrollmentId ? true : false;
  const [warningModal, setwarningModal] = useState(false);
  const handleopenWarning = () => { setwarningModal(true) }
  const handlecloseWarning = () => { setwarningModal(false) }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(LogoutAction(token, email))
    navigate(routesName.loginPage);
    handleCloseLogoutModal();
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    const htmlElement = document.querySelector("html");
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  function handleToggleSidebar() {
    dispatch(toggleSidebarAction(!isSidebarOpen))
  }
  return (
    <>
      <Box
        className="flex justify-between p-2 card top-navbar-for-dark"
        sx={{
          right: "0",
          width:  "100%" ,
          borderBottom: ".0625rem solid #e0e0e0",
          boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.75)",
          background: "white",
        }}
      >
        <Grid container alignItems="center">
          {icon && (
            <Grid item>
              <IconButton>{icon}</IconButton>
            </Grid>
          )}

          {isMobile ? (
            <Grid item container alignItems="center" sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid item>
                <IconButton sx={{ color: "#5C5B98" }} onClick={handleToggleSidebar}>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography
                  color={'#5C5B98'}
                  fontWeight={"400"}
                  fontFamily={"sans-serif"}
                  fontSize={isMobile ? "0.9rem" : "1.375rem"}
                  sx={{
                    marginLeft: "0.625rem",
                    lineHeight: "1.5rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "calc(100% - 2.5rem)" // Adjust based on the size of the IconButton and spacing
                  }}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <>
              <IconButton sx={{ color: "#5C5B98" }} onClick={handleToggleSidebar} >
                <MenuIcon />
              </IconButton>
              <Grid item>
                <Typography
                  as="h3"
                  fontFamily={"sans-serif"}
                  fontSize={"1.375rem"}
                  sx={{
                    marginLeft: "0.625rem",
                    lineHeight: "1.75rem",
                    width: "auto",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: '#5C5B98'
                    // color: "inherit",
                  }}
                >


                  {title}

                </Typography>
              </Grid>
            </>
          )}
        </Grid>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* {hidearchieveclass && (
            <IconButton color={"primary"} onClick={()=>{navigate(routesName.pendingClass)}} >
              <HelperNavigator path={routesName.pendingClass} icon={PendingActionsOutlinedIcon} color={"#5C5B98"} />
            </IconButton>
          )} */}
          {showpendingIcon && RoleName !== "Teacher" && (
            <IconButton>
              <HelperNavigator path={routesName.pendingClass} icon={PendingActionsOutlinedIcon} color={"#5C5B98"} />
            </IconButton>
          )}

          {/* <IconButton onClick={handleToggle}>
            {isDarkMode ? <DarkModeIcon sx={{ color: "whitesmoke" }} /> : <LightModeIcon color="warning" />}
          </IconButton> */}

          {RoleName == "Teacher" && courseId && (
            <> <IconButton onClick={handleClick}>
              <Download style={{ color: '#5C5B98' }} />
            </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={generateActivitiesOutcomeExcelReport} >Download Activity Outcomes</MenuItem>
                <MenuItem onClick={generateActivitiesExcelReport}>Download Activities</MenuItem>
              </Menu>
            </>
          )}




          {hideLogout && (
            <IconButton onClick={handleOpenLogoutModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                <path fill="#5C5B98" d="M10.2392344,0 C13.3845587,0 16.2966635,1.39466883 18.2279685,3.74426305 C18.4595621,4.02601608 18.4134356,4.43777922 18.124942,4.66396176 C17.8364485,4.89014431 17.4148346,4.84509553 17.183241,4.5633425 C15.5035716,2.51988396 12.9739849,1.30841121 10.2392344,1.30841121 C5.32416443,1.30841121 1.33971292,5.19976806 1.33971292,10 C1.33971292,14.8002319 5.32416443,18.6915888 10.2392344,18.6915888 C13.0144533,18.6915888 15.5774656,17.443711 17.2546848,15.3485857 C17.4825482,15.0639465 17.9035339,15.0136047 18.1949827,15.2361442 C18.4864315,15.4586837 18.5379776,15.8698333 18.3101142,16.1544725 C16.3816305,18.5634688 13.4311435,20 10.2392344,20 C4.58426141,20 8.8817842e-14,15.5228475 8.8817842e-14,10 C8.8817842e-14,4.4771525 4.58426141,0 10.2392344,0 Z M17.0978642,7.15999289 L19.804493,9.86662172 C20.0660882,10.1282169 20.071043,10.5473918 19.8155599,10.802875 L17.17217,13.4462648 C16.9166868,13.701748 16.497512,13.6967932 16.2359168,13.435198 C15.9743215,13.1736028 15.9693667,12.7544279 16.2248499,12.4989447 L17.7715361,10.9515085 L7.46239261,10.9518011 C7.0924411,10.9518011 6.79253615,10.6589032 6.79253615,10.2975954 C6.79253615,9.93628766 7.0924411,9.64338984 7.46239261,9.64338984 L17.7305361,9.64250854 L16.1726778,8.08517933 C15.9110825,7.82358411 15.9061278,7.40440925 16.1616109,7.14892607 C16.4170941,6.89344289 16.836269,6.89839767 17.0978642,7.15999289 Z" />
              </svg>
            </IconButton>
          )}
          {console.log("window.location.href:::", window.location.href)}
          {console.log("window.location.pathname:::", window.location.pathname)}
          <LogoutModal
            isOpen={isLogoutModalOpen}
            onClose={handleCloseLogoutModal}
            logoutAction={handleLogout}
          />

          {(showCloseIcon && window.location.pathname !== "/classroom/Student-Dashboard") && (
            <IconButton onClick={() =>
              navigate(navigations)
            }>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" fill="#5C5B98" class="icon" version="1.1"><path d="M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z" fill="" /><path d="M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z" fill="#5C5B98" /></svg>
              {/* <HelperNavigator path={navigations} icon={Close} color={"black"} /> */}
            </IconButton>
          )}

        </Box>

      </Box>
      <ChangepasswordModal open={openchangePw} close={handleclosePw} />
      <WarningModal open={warningModal} close={handlecloseWarning} />

    </>
  );
}

export default Header;



