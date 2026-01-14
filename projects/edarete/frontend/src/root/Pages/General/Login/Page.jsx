import React, { useEffect, useState, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { getOtp } from "../../../Common/Store/Actions/General/AuthActions/getOtp";
import { verifyOtp } from "../../../Common/Store/Actions/General/AuthActions/verifyOtp";
import { facebookLogin } from "../../../Common/Store/Actions/General/AuthActions/facebookLogin";
import { updateLoading } from "../../../Common/Store/Actions/General/UpdateActions/updateLoading";
import { showSuccessToast, showErrorToast } from "../../../Common/ToastUtils";
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../../Config/constant";
import { GoogleLoginButton } from "./components/googleButton";

const SignInForm = ({ onLogin }) => {
  const googleLoginRef = useRef(null);
  const theme = useTheme();
  console.log("theme: ", theme.palette);
  const isDarkMode = theme.palette.mode === 'dark';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deviceInfo = generateDeviceIdentifier();
  const UID = `${deviceInfo.osName}-${deviceInfo.osVersion}-${deviceInfo.browser}-${deviceInfo.screenResolution}-${deviceInfo.timeZone}-${deviceInfo.deviceUUID}`;
  const mainState = useSelector((state) => state.main);
  const { isLoading, accesstoken } = mainState;
  const [showOtpInputField, setShowOtpInputField] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  // Reset loading state on component mount to handle page refresh scenarios
  useEffect(() => {
    // If loading state is true on mount (e.g., after page refresh), reset it
    if (isLoading) {
      dispatch(updateLoading(false));
    }
    
    // Set up a timeout to automatically reset loading state if it gets stuck
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Loading state was stuck, resetting...");
        dispatch(updateLoading(false));
      }
    }, 30000); // 30 seconds timeout
    
    // Cleanup function to reset loading state when component unmounts
    return () => {
      clearTimeout(loadingTimeout);
      if (isLoading) {
        dispatch(updateLoading(false));
      }
    };
  }, []); // Empty dependency array - runs only on mount
  
  useEffect(() => {}, [isLoading]);
  
  // Handle OTP input change
  const handleOtpChange = (event) => {
    const newValue = event.target.value;
    setOtpValue(newValue);
    
    // Reset error state if OTP is at least 4 characters
    if (newValue.length >= 4) {
      setOtpError(false);
    }
  };
  
  const handleGetOtp = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.trim();

    if (!email) {
      showErrorToast("Please enter your email.");
      return;
    }

    // Store email in state for later use
    setUserEmail(email);
    
    dispatch(updateLoading(true));

    dispatch(
      getOtp(
        email,
        deviceInfo.osName,
        deviceInfo.osVersion,
        deviceInfo.deviceUUID,
        deviceInfo.browserVersion,
        accesstoken,
        otpSuccess,
        otpFailure
      )
    );
  };

  const otpSuccess = (response) => {
    if (response?.otpVerif !== "OTP Sent Successfully") {
      loginSuccess("success");
    } else {
      dispatch(updateLoading(false));
      setShowOtpInputField(true);
      showSuccessToast("OTP sent successfully!");
    }
  };
  
  const otpFailure = (response) => {
    console.log("OTP Failure", response);
    dispatch(updateLoading(false));
    showErrorToast("Error",response.message || "Failed to send OTP. Please try again.");
  };
  
  const handleLogin = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const otp = data.get("otp")?.trim();

    // Email is already verified at this point, so we only need to check OTP
    if (!otp) {
      setOtpError(true);
      showErrorToast("Please enter the OTP.");
      return;
    }
    
    if (otp.length < 4) {
      setOtpError(true);
      showErrorToast("OTP should be at least 4 characters long.");
      return;
    }

    dispatch(updateLoading(true));

    dispatch(
      verifyOtp(
        userEmail, // Use email from state instead of form data
        otp,
        deviceInfo.osName,
        deviceInfo.osVersion,
        deviceInfo.deviceUUID,
        loginSuccess,
        loginFailure
      )
    );
  };
  
  // Handle Google login
  const handleGoogleLogin = (credentialResponse) => {
    dispatch(updateLoading(false));
    console.log("credentialResponse: ", credentialResponse);
    // dispatch(
    //   googleLogin(
    //     credentialResponse.credential,
    //     deviceInfo.osName,
    //     deviceInfo.osVersion,
    //     deviceInfo.deviceUUID,
    //     loginSuccess,
    //     loginFailure
    //   )
    // );
  };
  
  // Handle Facebook login
  const handleFacebookLogin = (response) => {
    if (response.accessToken) {
      dispatch(updateLoading(true));
      
      dispatch(
        facebookLogin(
          response.accessToken,
          response.userID,
          deviceInfo.osName,
          deviceInfo.osVersion,
          deviceInfo.deviceUUID,
          loginSuccess,
          loginFailure
        )
      );
    } else {
      showErrorToast("Facebook login failed. Please try again.");
    }
  };

  function generateDeviceIdentifier() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const osName = /android/i.test(userAgent)
      ? "Android"
      : /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
      ? "iOS"
      : /Mac/i.test(userAgent)
      ? "MacOS"
      : /Windows/i.test(userAgent)
      ? "Windows"
      : "Unknown OS";

    const osVersion =
      userAgent
        .match(/(Android|OS X|Windows NT) ([0-9._]+)/i)?.[2]
        ?.replace(/_/g, ".") || "Unknown";

    const browser =
      navigator.userAgentData?.brands?.[0]?.brand ||
      (navigator.userAgent.includes("Chrome")
        ? "Chrome"
        : navigator.userAgent.includes("Firefox")
        ? "Firefox"
        : navigator.userAgent.includes("Safari")
        ? "Safari"
        : "Unknown Browser");

    const browserVersion =
      navigator.userAgentData?.brands?.[0]?.version || navigator.appVersion;

    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const platform = navigator.platform;

    // Generate a local unique ID if not already stored
    let deviceUUID = localStorage.getItem("device_uuid");
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
  const onLoginWithGoogle = () => {
    if (googleLoginRef.current) {
      googleLoginRef.current.click();
    }
  }

  const loginSuccess = (response) => {
    dispatch(updateLoading(false));
    showSuccessToast("Login successful!");
    onLogin();
    navigate("/dashboard"); // Use path passed into the function
  };
  
  const loginFailure = (response) => {
    dispatch(updateLoading(false));
    showErrorToast(
      "Login failed. Please check your credentials and try again."
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isDarkMode 
          ? "linear-gradient(135deg, #1A237E 0%, #311B92 100%)" 
          : "linear-gradient(135deg, #00B8BA 0%, #4C49ED 100%)",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "80%", md: "500px" },
          background: isDarkMode ? theme.palette.background.paper : "#fff",
          borderRadius: "10px",
          boxShadow: isDarkMode 
            ? "0 4px 20px rgba(0,0,0,0.3)" 
            : "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={showOtpInputField ? handleLogin : handleGetOtp}
        >
          <Grid container>
            {/* Left Column with Avatar */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingY: 4,
              }}
            >
              {/* Profile Icon with Animation */}
              <Box
                sx={{
                  position: "relative",
                  width: "150px",
                  height: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 3,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: isDarkMode ? theme.palette.background.default : "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill={isDarkMode ? theme.palette.text.secondary : "#aaa"}>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "3px solid transparent",
                    borderTopColor: isDarkMode ? theme.palette.primary.main : "#6365F1",
                    animation: "spin 2s linear infinite",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "5px",
                      left: "5px",
                      right: "5px",
                      bottom: "5px",
                      borderRadius: "50%",
                      border: "3px solid transparent",
                      borderTopColor: isDarkMode ? theme.palette.primary.main : "#6365F1",
                      animation: "spin 3s linear infinite",
                    },
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(0deg)",
                      },
                      "100%": {
                        transform: "rotate(360deg)",
                      },
                    },
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    background: isDarkMode ? theme.palette.primary.main : "#6365F1",
                    borderRadius: "50%",
                    top: "20px",
                    left: "50%",
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    background: isDarkMode ? theme.palette.primary.main : "#6365F1",
                    borderRadius: "50%",
                    top: "60%",
                    left: "20px",
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    background: isDarkMode ? theme.palette.primary.main : "#6365F1",
                    borderRadius: "50%",
                    top: "80%",
                    right: "30px",
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  color: isDarkMode ? theme.palette.text.primary : "#333",
                  marginBottom: 3,
                }}
              >
                Admin Login
              </Typography>

              {/* Form Fields */}
              <Box sx={{ width: "80%", px: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  disabled={isLoading || showOtpInputField}
                  autoComplete="email"
                  variant="standard"
                  margin="normal"
                  sx={{
                    marginBottom: 2,
                    "& .MuiInput-underline:before": {
                      borderBottomColor: isDarkMode ? theme.palette.divider : "#ddd",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: isDarkMode ? theme.palette.primary.main : "#6365F1",
                    },
                    "& .MuiInputLabel-root": {
                      color: isDarkMode ? theme.palette.text.secondary : 'inherit',
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? theme.palette.text.primary : 'inherit',
                    }
                  }}
                />

                {showOtpInputField && (
                  <TextField
                    required
                    fullWidth
                    name="otp"
                    label="Enter OTP"
                    type="password"
                    id="otp"
                    variant="standard"
                    margin="normal"
                    value={otpValue}
                    onChange={handleOtpChange}
                    error={otpError}
                    helperText={otpError ? "Please enter a valid OTP" : ""}
                    sx={{
                      marginBottom: 2,
                      "& .MuiInput-underline:before": {
                        borderBottomColor: otpError ? "#f44336" : isDarkMode ? theme.palette.divider : "#ddd",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: otpError ? "#f44336" : isDarkMode ? theme.palette.primary.main : "#6365F1",
                      },
                      "& .MuiInputLabel-root": {
                        color: otpError ? "#f44336" : isDarkMode ? theme.palette.text.secondary : 'inherit',
                      },
                      "& .MuiInputBase-input": {
                        color: isDarkMode ? theme.palette.text.primary : 'inherit',
                      },
                      "& .MuiFormHelperText-root": {
                        color: otpError ? "#f44336" : isDarkMode ? theme.palette.text.secondary : 'inherit',
                      },
                    }}
                  />
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    borderRadius: "50px",
                    padding: "10px",
                    background: isDarkMode 
                      ? `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` 
                      : "linear-gradient(to right, #6365F1, #3E97FF)",
                    boxShadow: isDarkMode 
                      ? `0 4px 12px ${theme.palette.primary.dark}40` 
                      : "0 4px 12px rgba(99, 101, 241, 0.3)",
                    fontSize: "16px",
                    fontWeight: 500,
                    height: "40px",
                    position: "relative",
                    "&:hover": {
                      background: isDarkMode 
                        ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
                        : "linear-gradient(to right, #5355D1, #2E87EF)",
                      boxShadow: isDarkMode 
                        ? `0 6px 15px ${theme.palette.primary.dark}60` 
                        : "0 6px 15px rgba(99, 101, 241, 0.4)",
                    },
                    "&.Mui-disabled": {
                      background: isDarkMode 
                        ? `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` 
                        : "linear-gradient(to right, #6365F1, #3E97FF)",
                      opacity: 0.8,
                      color: "rgba(255, 255, 255, 0.7)",
                    }
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <span className="loading-dot dot1"></span>
                      <span className="loading-dot dot2"></span>
                      <span className="loading-dot dot3"></span>
                    </Box>
                  ) : (
                    showOtpInputField ? "Login" : "Login"
                  )}
                </Button>

                {/* Social Login Section */}
            
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* CSS for Animation */}
      <style jsx="true">{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .loading-dot {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          display: inline-block;
          margin: 0 3px;
        }
        
        .dot1 {
          animation: bounce 1.4s ease-in-out infinite;
        }
        
        .dot2 {
          animation: bounce 1.4s ease-in-out 0.2s infinite;
        }
        
        .dot3 {
          animation: bounce 1.4s ease-in-out 0.4s infinite;
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};

export default SignInForm;
