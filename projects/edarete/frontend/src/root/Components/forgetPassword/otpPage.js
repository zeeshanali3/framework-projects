

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Authentication.module.css";
import favicon from "../../../assets/images/favicon.png";
import { helperText } from "../../text/text";
import { routesName } from "../../routes/adminConstants";
import { formBox, formBtn, mainBox } from "../../Components/forgetPassword/commonSx ";

const OtpPage = () => {
  const [otp, setOtp] = useState(""); 

  const handleChange = (event) => {
    setOtp(event.target.value);
  };


const handleSubmit = (event) => {
    event.preventDefault();
    if (otp.trim() !== "") {
      window.location.href = routesName.chnagePw;
    } else {
      console.log("Email field is empty!");
    }
  };
  return (
    <>
      <div className="authenticationBox">
        <Box component="main" sx={mainBox}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              <Typography
                as="h1"
                fontSize="28px"
                fontWeight="700"
                mb="5px"
              >
                {helperText.otp}{" "}
                <img
                  src={favicon}
                  alt="favicon"
                  className={styles.favicon}
                />
              </Typography>

              <Typography fontSize="15px" mb="30px">
                {helperText.optmessage}
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
                        {helperText.otp}
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="otp"
                        label="OTP Code"
                        name="otp"
                        autoComplete="otp"
                        InputProps={{
                          style: { borderRadius: 8 },
                        }}
                        value={otp}
                        onChange={handleChange}
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
                  {helperText.enter}
                </Button>
              </Box>

              <Box as="div" textAlign="center" mt="20px">
                <Link
                  to={routesName.forgetpassword}
                  className="primaryColor text-decoration-none"
                >
                  <i className="ri-arrow-left-s-line"></i>{" "}
                  {helperText.backtolink}
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default OtpPage;
