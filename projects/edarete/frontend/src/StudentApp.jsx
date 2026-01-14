import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route ,useNavigate} from 'react-router-dom';
import { Box, useMediaQuery } from "@mui/material";
import {  useSelector } from 'react-redux';
import LoginPage from './root/auth/LoginPage';
import ErrorPage from './root/Pages/General/404';
import Dashboard from './root/Views/AdminDashboard/Dashboard';
import classroomlandingPage from './root/Components/classroomlandingPage';
import OtpPage from './root/auth/OTP';
import Details from './root/Components/details/assignmentdetailIndex';
import Layout from './root/layout/layout';
import PublicPage from './root/Components/PublicPage';
import ForgotPasswordForm from './root/Components/forgetPassword/forgetPassword';
import PendingClasses from './root/Components/PendingClasses';
import { routesName } from './root/routes/adminConstants';
import Sidebar from './root/Components/LeftSidebarStudent/index';
import StudentDashboard from "./StudentApp"
import "react-toastify/dist/ReactToastify.css";


// import "./styles/globals.css"


const  App = () => {
  const currentUrl = window.location.href;
  const isStorePage = false;
const isSidebarOpen = useSelector((state) => state?.TOGGLESIDEBAR?.isSideBarOpen ?? false);
  const isMobile = useMediaQuery("(max-width:1100px)");
  const routesPath = [
    { path: routesName.dashboardView, component: Dashboard },
    { path: `${routesName.classroomHome}/:courseName/:id`, component: classroomlandingPage },
    { path: `${routesName.assignmentDetails}/:courseName/:id/:SubComponentId`, component: Details },
    { path: routesName.publicpage, component: PublicPage },
    { path: routesName.forgetpassword, component: ForgotPasswordForm },
    { path: routesName.pendingClass, component: PendingClasses },
    { path: routesName.StudentDashboard, component: StudentDashboard }
  ];

  

  const AuthPath = [
    { path: routesName.loginPage, component: LoginPage },
    { path: routesName.otp, component: OtpPage },
 
  ];

  return (
    <>
          <Routes>
            {isStorePage ? (
              <>
                <Route index element={<PublicPage />} />
                {routesPath.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Layout>{React.createElement(route.component)}</Layout>}
                  />
                ))}
              </>
            ) : (
              <>
                <Route index element={<LoginPage />} />
                {AuthPath.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
                <Route
                  path="*"
                  element={
                    <Box sx={{ display: 'flex', width: '99vw', overflowX: 'hidden' }}>
                      <Sidebar isOpen={isSidebarOpen} />
                      <Box
                        sx={{
                          flexGrow: 1,
                          marginLeft: isSidebarOpen && !isMobile ? '300px' : '0px',
                          transition: 'margin-left 0.4s ease',
                          overflowX: 'hidden', // Prevent horizontal overflow
                          width: '100%', // Ensure it doesn't exceed the viewport width
                        }}
                      >
                        <Routes>
                          {routesPath.map((route, index) => (
                            <Route
                              key={index}
                              path={route.path}
                              element={<Layout><route.component /></Layout>}
                            />
                          ))}

                        </Routes>
                        
                      </Box>
                    </Box>
                  }
                />
              </>
            )}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      
       

          </>
  );
}

export default App;
