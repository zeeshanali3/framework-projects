import React, { useEffect } from 'react';
import ScrollToTop from '../custom/scrolltoTop';
import Box from "@mui/material/Box" 
import { useLocation, useNavigate } from 'react-router-dom';
import { routesName } from '../routes/adminConstants';
import { useSelector } from 'react-redux';
import "../../styles/globals.css"

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);

  useEffect(() => {
    const handlePopState = () => {
      if (!loginData?.payload) {
        navigate(routesName.loginPage);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loginData, navigate]);

  const isLoginPage = location.pathname === routesName.loginPage;
  const isHomePage = location.pathname === routesName.dashboardView;

  return (
    <>
       <Box
      sx={{
        backgroundColor: 'white !important', // White background applied here
        minHeight: '100vh', // Ensure it covers the full screen
        width: '100%',
        padding: '20px', // Optional padding
      }}
    >
      {children}
    </Box>
      {!isLoginPage && (
        <>
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default Layout;