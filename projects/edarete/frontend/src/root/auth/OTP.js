import React, { useState } from "react";
import { routesName } from "../routes/adminConstants";
import { LoginStepTwoAction } from "../Common/Store/Actions/General/PostActions/LoginStepTwoAction";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography, TextField, Button, Card, Alert } from "@mui/material";
import { helperText } from "../text/text";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetclosAction } from '../Common/Store/Actions/General/GetActions/getclosAction';
import loginImg from '../../assets/images/LOGO-6.png';
import BackgroundImage from '../../assets/images/back_img.jpg';
 
import "./auth.css"
const OTPPage = () => {
  const location = useLocation();
  const currentUrl = window.location.href;
  // Safely read login data from Redux (reducer stores payload directly)
  const state = useSelector((state) => state);
  const loginData = useSelector((state) => state?.LOGINREDUCER?.loginData) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [otpError, setOtpError] = useState(null);
    function generateDeviceIdentifier() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const osName = /android/i.test(userAgent)
        ? 'Android'
        : /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
        ? 'iOS'
        : /Mac/i.test(userAgent)
        ? 'MacOS'
        : /Windows/i.test(userAgent)
        ? 'Windows'
        : 'Unknown OS';

      const osVersion =
        userAgent
          .match(/(Android|OS X|Windows NT) ([0-9._]+)/i)?.[2]
          ?.replace(/_/g, '.') || 'Unknown';

      const browser =
        navigator.userAgentData?.brands?.[0]?.brand ||
        (navigator.userAgent.includes('Chrome')
          ? 'Chrome'
          : navigator.userAgent.includes('Firefox')
          ? 'Firefox'
          : navigator.userAgent.includes('Safari')
          ? 'Safari'
          : 'Unknown Browser');

      const browserVersion =
        navigator.userAgentData?.brands?.[0]?.version || navigator.appVersion;

      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const platform = navigator.platform;

      // Generate a local unique ID if not already stored
      let deviceUUID = localStorage.getItem('device_uuid');
     if (!deviceUUID) {
        console.log("CRYPTO HERE: ",crypto)
        if (crypto && crypto.randomUUID){
          deviceUUID = crypto.randomUUID;
        }else{
          deviceUUID = '1234567890';
        }
        // console.log("WINDOW HERE: ",window)
        // deviceUUID = crypto?.randomUUID() || '1234567890'; // Generates a unique identifier
        // deviceUUID = "1234567890";
        localStorage.setItem('device_uuid', deviceUUID);
      }

      return {
        osName,
        osVersion,
        browser,
        browserVersion,
        screenResolution,
        timeZone,
        platform,
        deviceUUID, // Stored locally for consistency
      };
    }
    const deviceInfo = generateDeviceIdentifier();
  // Prefer navigation state, but fall back to Redux when absent
  const { email: stateEmail, userRole: stateUserRole } = location.state || {};
  const email = stateEmail || loginData?.email || "";
  const userRole = stateUserRole || loginData?.role || loginData?.userRole || "";

  const handleChange = (event) => {
    setOtp(event.target.value);
  };
  const token = loginData?.accessToken || '';

  const handleSubmit = (event) => {
    setIsLoggingIn(true);
    setOtpError(null);

    event.preventDefault();
    if (!email || !userRole) {
      // Missing critical info, send user back to login
      navigate(routesName.loginPage);
      return;
    }
    if (otp !== "") {

      dispatch(
        LoginStepTwoAction(
          email,
          otp,
          deviceInfo.osName,
          deviceInfo.osVersion,
          deviceInfo.deviceUUID,
          userRole,
          currentUrl,
          response => {
            // response is already the decrypted payload
            const nav = Array.isArray(response?.otpVerif.Navigation)
              ? response.otpVerif.Navigation
              : [];
            if (nav.length > 0) {
              navigate(
                `${routesName.classroomHome}/${nav[0]?.CourseName}/${nav[0]?.CourseId}`,
              );
              return;
            }
            const studentData = Array.isArray(response?.otpVerif.studentData)
              ? response.otpVerif.studentData
              : [];
            if (studentData.length > 0) {
               console.log(
                 'OTP Response:',
                 response?.otpVerif.studentData,
                 routesName.StudentDashboard
               );
              navigate(routesName.StudentDashboard);
            } else {
              navigate(routesName.dashboardView);
            }
            const newToken = response?.otpVerif?.accessToken || token || '';
            if (newToken) {
              dispatch(GetclosAction(newToken));
            }
          },
          error => {
            console.log('error:::::', error);
            setOtpError(error?.payload ?? error?.message ?? 'Invalid OTP');
            setIsLoggingIn(false);
          },
        ),
      );
  
        }
      else{
        setOtpError('OTP is required');
        setIsLoggingIn(false);
      }
      }
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          p: 2,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            zIndex: 2,
            position: 'relative',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img src={loginImg} alt="Logo" style={{ width: 120 }} />
            <Typography
              variant="h4"
              component="h1"
              sx={{ mt: 2, fontWeight: 'bold' }}
            >
              {helperText.otp}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {helperText.optmessage}
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="OTP Code"
              type="text"
              value={otp}
              onChange={handleChange}
              sx={{ mb: 2 }}
              variant="outlined"
              error={!!otpError}
              helperText={otpError}
            />
            {otpError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {otpError}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoggingIn}
              sx={{ py: 1.5, fontSize: '16px' }}
            >
              {isLoggingIn ? <CircularProgress size={24} /> : helperText.enter}
            </Button>
          </Box>
        
        </Card>
      </Box>
    );
  };
  
export default OTPPage;