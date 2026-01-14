import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SchoolIcon from "@mui/icons-material/School";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { useTheme } from "@emotion/react";

const Features = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        padding: { xs: "40px 24px 24px 24px", md: "32px" },
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "flex-start" },
        gap: { xs: "15px" },
        alignSelf: "stretch",
        backgroundColor: "#FFFFFF",
        overflowX: "hidden",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: { xs: "380px", md: "100%", xl: "639px" },
          flexDirection: { xs: "column", sm: "row", lg: "column" },
          justifyContent: { xs: "start", md: "space-between", lg: "start" },
          alignSelf: "flex-start",
          gap: { xs: "24px", sm: "10px", lg: "146px" },
          marginTop: { md: "29px" },
          [theme.breakpoints.up("2xl")]: {
            marginLeft: "86px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "24px", md: "34px" },
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                alignSelf: "stretch",
                width: { xs: "315px", sm: "250px", lg: "500px", xl: "639px" },
                color: "#000000",
                fontSize: { xs: "52px", lg: "114px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xm: "58.703px", lg: "114.8px" },
              }}
            >
              Everything
            </Typography>
            <Typography
              variant="h1"
              sx={{
                alignSelf: "stretch",
                width: { xs: "315px", sm: "250px", lg: "500px", xl: "639px" },
                color: "#2963E8",
                fontSize: { xs: "52px", lg: "114px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { sm: "58.703px", lg: "114.8px" },
              }}
            >
              You Need
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              width: { xs: "374.917px", sm: "332px", md: "450px", lg: "593px" },
              color: "#616460",
              fontSize: { xs: "14px", md: "20px" },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: { xs: "17.703px", md: "28px" },
              opacity: 0.8,
            }}
          >
            Explore a suite of tools that make learning interactive, measurable,
            and effective. From live quizzes to academic management, Edarete
            streamlines every step of the journey.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "stretch", sm: "center", lg: "stretch" },
            gap: { xs: "4px", md: "8px" },
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "24px" },
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: { xs: "16px", md: "24px" },
              width: { xs: "124px", md: "170px", xl: "200px" },
              borderRadius: { xs: "15.174px", md: "24px" },
              backgroundColor: "#ECEDEC",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#040903",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                padding: 2.2,
                width: { xs: "58px", lg: "88px" },
                height: { xs: "58px", lg: "88px" },
              }}
            >
              <SmartphoneIcon
                sx={{ fontSize: { xs: 35, lg: 50 }, color: "#0751e4" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                textAlign: "center",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Mobile <br /> App
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "24px" },
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: { xs: "16px", md: "24px" },
              width: { xs: "124px", md: "170px", xl: "200px" },
              borderRadius: { xs: "15.174px", md: "24px" },
              backgroundColor: "#ECEDEC",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#040903",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                padding: 2.2,
                width: { xs: "58px", lg: "88px" },
                height: { xs: "58px", lg: "88px" },
              }}
            >
              <SchoolIcon
                sx={{ fontSize: { xs: 35, lg: 50 }, color: "#0751e4" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                textAlign: "center",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Student <br /> Portal
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "24px" },
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: { xs: "16px", md: "24px" },
              width: { xs: "124px", md: "170px", xl: "200px" },
              borderRadius: { xs: "15.174px", md: "24px" },
              backgroundColor: "#ECEDEC",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#040903",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                padding: 2.2,
                width: { xs: "58px", lg: "88px" },
                height: { xs: "58px", lg: "88px" },
              }}
            >
              <DashboardCustomizeIcon
                sx={{ fontSize: { xs: 35, lg: 50 }, color: "#0751e4" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                textAlign: "center",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Admin <br /> Portal
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: 'url("/images/woman-doing-yoga-cruise-ship.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: { xs: "14.866px", md: "32px" },
          width: { xs: "100%", lg: "50%", xl: "718px" },
          height: { xs: "460px", lg: "881px" },
          flexShrink: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "8px", md: "16px" },
            width: "100%",
            height: { xs: "100%", md: "auto" },
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            paddingLeft: { xs: "8px", md: "16px" },
            paddingRight: { xs: "8px", md: "24px" },
            paddingTop: { xs: "16px", md: "0px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", md: "467px" },
              padding: { xs: "16px", md: "24px" },
              alignItems: "flex-start",
              gap: { xs: "12px", md: "16px" },
              borderRadius: { xs: "11.149px", md: "24px" },
              backgroundColor: "#ECEDEC",
            }}
          >
            <Box
              component="img"
              src="/images/computer_science_student.png"
              alt="Computer Science Student"
              sx={{
                width: "56px",
                height: "56px",
                flexShrink: 0,
                aspectRatio: 1 / 1,
                borderRadius: "56px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: { xs: "8px", md: "15px" },
                flex: "1 0 0",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  color: "#000000",
                  fontSize: "20px",
                  fontStyle: "italic",
                  fontWeight: 600,
                  lineHeight: "28px",
                  display: { xs: "none", md: "block" },
                }}
              >
                “Edarete makes learning interactive, I love tracking my
                progress!”
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  color: "#000000",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "24px",
                  display: { xs: "block", md: "none" },
                }}
              >
                Edarete makes learning interactive, I love tracking my progress!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  color: "#000000",
                  fontSize: { xs: "14px", md: "20px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "12px", md: "28px" },
                  opacity: 0.6,
                }}
              >
                Sarah, Computer Science Student
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: { xs: "3.716px", md: "8px" },
            }}
          >
            <IconButton
              disableRipple
              sx={{
                display: "flex",
                padding: { xs: "8px", md: "16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: "3.716px", md: "8px" },
                borderRadius: { xs: "464.083px", md: "999px" },
                border: {
                  xs: "0.465px solid rgba(67, 71, 66, 0.10)",
                  md: "1px solid rgba(67, 71, 66, 0.10)",
                },
                backgroundColor: "#FFFFFF",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&:active": {
                  backgroundColor: "#FFFFFF",
                },
                "&:focus": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <Box
                component="img"
                src="/images/arrow_left.svg"
                alt="Left Arrow"
                sx={{
                  width: "24px",
                  height: "24px",
                }}
              />
            </IconButton>
            <IconButton
              disableRipple
              sx={{
                display: "flex",
                padding: { xs: "8px", md: "16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: "3.716px", md: "8px" },
                borderRadius: { xs: "464.083px", md: "999px" },
                border: {
                  xs: "0.465px solid rgba(67, 71, 66, 0.10)",
                  md: "1px solid rgba(67, 71, 66, 0.10)",
                },
                backgroundColor: "#FFFFFF",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                "&:active": {
                  backgroundColor: "#FFFFFF",
                },
                "&:focus": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <Box
                component="img"
                src="/images/arrow_right.svg"
                alt="Right Arrow"
                sx={{
                  width: "24px",
                  height: "24px",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
