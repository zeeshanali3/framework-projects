// import React from "react";
// import { Link } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import styles from "./Authentication.module.css";
// import favicon from "../../assets/images/favicon.png"
// import { helperText } from "../../HelperText/Text";
// import { routesName } from "../../routes/adminConstants";
// import { formBox, formBtn, mainBox } from "./commonSx";
// const ForgotPasswordForm = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

//   return (
//     <>
//       <div className="authenticationBox">
//         <Box
//           component="main"
//          sx={mainBox}
//         >
//           <Grid item xs={12} md={12} lg={12} xl={12}>
//             <Box>
//               <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
//                 Forgot Password?{" "}
//                 <img
//                   src={favicon}
//                   alt="favicon"
//                   className={styles.favicon}
//                 />
//               </Typography>

//               <Typography fontSize="15px" mb="30px">
//                {helperText.forgetpasswordText}
//               </Typography>

//               <Box component="form" noValidate onSubmit={handleSubmit}>
//                 <Box
//                   sx={formBox}
//                   className="bg-black"
//                 >
//                   <Grid container alignItems="center" spacing={2}>
//                     <Grid item xs={12}>
//                       <Typography
//                         component="label"
//                         sx={{
//                           fontWeight: "500",
//                           fontSize: "14px",
//                           mb: "10px",
//                           display: "block",
//                         }}
//                       >
//                         Email
//                       </Typography>

//                       <TextField
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         InputProps={{
//                           style: { borderRadius: 8 },
//                         }}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Box>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={formBtn}
//                 >
//                  {helperText.sendLink}
//                 </Button>
//               </Box>

//               <Box as="div" textAlign="center" mt="20px">
//                 <Link
//                  to={routesName.loginPage}
//                   className="primaryColor text-decoration-none"
//                 >
//                   <i className="ri-arrow-left-s-line"></i> {helperText.backtoLogin}
//                 </Link>
//               </Box>
//             </Box>
//           </Grid>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default ForgotPasswordForm;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Authentication.module.css";
import favicon from "../../../assets/images/favicon.png"
import { helperText } from "../../text/text";
import { routesName } from "../../routes/adminConstants";
import { formBox, formBtn, mainBox } from "./commonSx";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() !== "") {
      // Navigate to OTP route
      window.location.href = routesName.otp;
    } else {
      // Handle empty email case, you may show an error message here
      console.log("Email field is empty!");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
 

  return (
    <>
      <div className="authenticationBox">
        <Box component="main" sx={mainBox}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
                Forgot Password?{" "}
                <img src={favicon} alt="favicon" className={styles.favicon} />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                {helperText.forgetpasswordText}
              </Typography>

              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Box sx={formBox} className="bg-black">
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Email
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={formBtn}
                >
                  {helperText.sendLink}
                </Button>
              </Box>

              <Box as="div" textAlign="center" mt="20px">
                <Link
                  to={routesName.loginPage}
                  className="primaryColor text-decoration-none"
                >
                  <i className="ri-arrow-left-s-line"></i>{" "}
                  {helperText.backtoLogin}
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ForgotPasswordForm;










// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import styles from "./Authentication.module.css";
// import favicon from "../../assets/images/favicon.png";
// import { helperText } from "../../HelperText/Text";
// import { routesName } from "../../routes/adminConstants";

// const ForgotPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [showOTPField, setShowOTPField] = useState(false);
//   const [showPasswordField, setShowPasswordField] = useState(false);

//   const handleEmailSubmit = (event) => {
//     event.preventDefault();
//     // Assuming email validation is successful, move to next step
//     setShowOTPField(true);
//   };

//   const handleOTPSubmit = (event) => {
//     event.preventDefault();
//     // Assuming OTP validation is successful, move to next step
//     setShowPasswordField(true);
//   };

//   const handlePasswordSubmit = (event) => {
//     event.preventDefault();
//     // Assuming password update is successful
//     console.log("Password updated successfully");
//   };

//   return (
//     <>
//       <div className="authenticationBox">
//         <Box
//           component="main"
//           sx={{
//             maxWidth: "510px",
//             ml: "auto",
//             mr: "auto",
//             padding: "50px 0 100px",
//           }}
//         >
//           <Grid item xs={12} md={12} lg={12} xl={12}>
//             <Box>
//               <Typography as="h1" fontSize="28px" fontWeight="700" mb="5px">
//                 Forgot Password?{" "}
//                 <img src={favicon} alt="favicon" className={styles.favicon} />
//               </Typography>

//               <Typography fontSize="15px" mb="30px">
//                 {helperText.forgetpasswordText}
//               </Typography>

//               {!showOTPField && (
//                 <Box component="form" noValidate onSubmit={handleEmailSubmit}>
//                   <Box
//                     sx={{
//                       background: "#fff",
//                       padding: "30px 20px",
//                       borderRadius: "10px",
//                       mb: "20px",
//                     }}
//                     className="bg-black"
//                   >
//                     <Grid container alignItems="center" spacing={2}>
//                       <Grid item xs={12}>
//                         <Typography
//                           component="label"
//                           sx={{
//                             fontWeight: "500",
//                             fontSize: "14px",
//                             mb: "10px",
//                             display: "block",
//                           }}
//                         >
//                           Email
//                         </Typography>

//                         <TextField
//                           required
//                           fullWidth
//                           id="email"
//                           label="Email Address"
//                           name="email"
//                           autoComplete="email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           InputProps={{
//                             style: { borderRadius: 8 },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>

//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       mt: 1,
//                       textTransform: "capitalize",
//                       borderRadius: "8px",
//                       fontWeight: "500",
//                       fontSize: "16px",
//                       padding: "12px 10px",
//                       color: "#fff !important",
//                     }}
//                   >
//                     {helperText.sendLink}
//                   </Button>
//                 </Box>
//               )}

//               {showOTPField && !showPasswordField && (
//                 <Box component="form" noValidate onSubmit={handleOTPSubmit}>
//                   <Box
//                     sx={{
//                       background: "#fff",
//                       padding: "30px 20px",
//                       borderRadius: "10px",
//                       mb: "20px",
//                     }}
//                     className="bg-black"
//                   >
//                     <Grid container alignItems="center" spacing={2}>
//                       <Grid item xs={12}>
//                         <Typography
//                           component="label"
//                           sx={{
//                             fontWeight: "500",
//                             fontSize: "14px",
//                             mb: "10px",
//                             display: "block",
//                           }}
//                         >
//                           OTP
//                         </Typography>

//                         <TextField
//                           required
//                           fullWidth
//                           id="otp"
//                           label="Enter OTP"
//                           name="otp"
//                           autoComplete="otp"
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                           InputProps={{
//                             style: { borderRadius: 8 },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>

//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       mt: 1,
//                       textTransform: "capitalize",
//                       borderRadius: "8px",
//                       fontWeight: "500",
//                       fontSize: "16px",
//                       padding: "12px 10px",
//                       color: "#fff !important",
//                     }}
//                   >
//                     Submit OTP
//                   </Button>
//                 </Box>
//               )}

//               {showPasswordField && (
//                 <Box component="form" noValidate onSubmit={handlePasswordSubmit}>
//                   <TextField
//                     fullWidth
//                     required
//                     type="password"
//                     label="New Password"
//                     variant="outlined"
//                     sx={{ mt: 2 }}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <TextField
//                     fullWidth
//                     required
//                     type="password"
//                     label="Confirm Password"
//                     variant="outlined"
//                     sx={{ mt: 2 }}
//                   />
//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       mt: 2,
//                       textTransform: "capitalize",
//                       borderRadius: "8px",
//                       fontWeight: "500",
//                       fontSize: "16px",
//                       padding: "12px 10px",
//                       color: "#fff !important",
//                     }}
//                   >
//                     {helperText.changePassword}
//                   </Button>
//                 </Box>
//               )}

//               <Box as="div" textAlign="center" mt="20px">
//                 <Link
//                   to={routesName.loginPage}
//                   className="primaryColor text-decoration-none"
//                 >
//                   <i className="ri-arrow-left-s-line"></i>{" "}
//                   {helperText.backtoLogin}
//                 </Link>
//               </Box>
//             </Box>
//           </Grid>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default ForgotPasswordForm;
