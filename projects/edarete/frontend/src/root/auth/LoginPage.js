import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  Card,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';
import loginImg from '../../assets/images/LOGO-6.png';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../Common/Store/Actions/General/UpdateActions/LoginAction';
import { helperText } from '../text/text';
import { useNavigate } from 'react-router-dom';
import { routesName } from '../routes/adminConstants';   
import { getRoleData } from '../Utils/loginData/loginData';
import { isValidEmail } from '../validation/validtionFunctions';
import BackgroundImage from '../../assets/images/back_img.jpg';
import './auth.css';

export default function LoginPage() {
  // Safely select loginData; the reducer slice may be undefined on first render
  const loginData = useSelector(state => state?.LOGINREDUCER?.loginData) || {};
  const navigate = useNavigate();
  const roleData = getRoleData(loginData);
  const [getuserRoll, setgetuserRoll] = useState('Student');
  useEffect(() => {
    const { RoleId, RoleName, UserroleId } = roleData || {};
  }, [loginData]);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deviceName, setDeviceName] = useState('');
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
   
     const UID = `${deviceInfo.osName}-${deviceInfo.osVersion}-${deviceInfo.browser}-${deviceInfo.screenResolution}-${deviceInfo.timeZone}-${deviceInfo.deviceUUID}`;
     const mainState = useSelector((state) => state.main);
     const { isLoading, accesstoken } = mainState;
  const handlePasswordToggle = () => {
    setShowPassword(prevPassword => !prevPassword);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleLoginAction();
    }
  };
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const handleLoginAction = () => {
    if (!email) {
      setLoginError(helperText.emptyfeilderror);
      setIsLoggingIn(false);
      return;
    }
    if (!isValidEmail(email)) {
      setLoginError(helperText.loginvalidationEmail);
      setIsLoggingIn(false);
      return;
    }
    if (!getuserRoll) {
      setLoginError(helperText.rolldata);
      setIsLoggingIn(false);
      return;
    }
  const onSuccess = (response) => {
    navigate(routesName.otp, {
      state: { email: email, userRole: getuserRoll },
    });
    console.log('Login response::::::', response);
  };

  const onFailure = (error) => {

   console.log('Login error::::::', error);
   setLoginError(
        error?.payload ?? error?.message ?? '',
   );
    setIsLoggingIn(false);
   
  };
    setIsLoggingIn(true);
    const userAgent = window.navigator.userAgent;
    setDeviceName(userAgent);
    dispatch(
      LoginAction(
        email,
        getuserRoll,
        deviceInfo.osName,
        deviceInfo.osVersion,
        deviceInfo.deviceUUID,
        deviceInfo.browserVersion,
        accesstoken,
        onSuccess,
        onFailure
      ),
    );
    // setIsLoggingIn(false);
  };
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
            sx={{ mt: 1, fontWeight: 'bold' }}
          >
            Login
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={e => {
            e.preventDefault();
            handleLoginAction();
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            variant="outlined"
          />
         
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
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
            {isLoggingIn ? <CircularProgress size={24} /> : 'Log In'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}