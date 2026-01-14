import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import HomeIcon from "@mui/icons-material/Home";
import CommuteIcon from "@mui/icons-material/Commute";

const Modes = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/modes_background.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "cover",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        paddingTop: { xs: "60px", md: "160px" },
        height: { xs: "520px", md: "720px", lg: "920px" },
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", md: "inline-flex" },
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: "24px", md: "40px" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            alignSelf: "stretch",
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: { xs: "52px", lg: "114px" },
            fontStyle: "normal",
            lineHeight: { xs: "56px", lg: "114.793px" },
            display: "inline-block",
          }}
        >
          Learn Your Way
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: { lg: "593px" },
            color: "#FFFFFF",
            fontSize: { xs: "16px", lg: "20px" },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: { xs: "24px", lg: "28px" },
            textAlign: "center",
            paddingX: { xs: "20px", md: "0px" },
          }}
        >
          Whether at university, at home, or on the go, Edarete fits seamlessly
          into your day — learn anytime, anywhere.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "start" },
            alignItems: "center",
            gap: { xs: "8px", md: "24px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: { xs: "4px 4px 4px 12px", lg: "0px 8px 0px 24px" },
              alignItems: "center",
              gap: { xs: "8px", md: "16px" },
              borderRadius: "999px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#2A2727",
                fontSize: { xs: "18px", lg: "48px" },
                fontStyle: "normal",
                lineHeight: { xs: "normal", lg: "101.927px" },
              }}
            >
              Classroom
            </Typography>
            <Box
              sx={{
                backgroundColor: "#080906",
                display: "flex",
                padding: { xs: "8px", lg: "17px" },
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CastForEducationIcon
                sx={{ color: "#2963E8", fontSize: { xs: "18px", lg: "40px" } }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "4px 4px 4px 16px", lg: "8px 16px 8px 40px" },
              alignItems: "center",
              gap: { xs: "8px", md: "24px" },
              borderRadius: "999px",
              backgroundColor: "#141613",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#2963E8",
                fontSize: { xs: "24px", lg: "64px" },
                fontStyle: "normal",
                lineHeight: { xs: "normal", lg: "101.927px" },
              }}
            >
              Home
            </Typography>
            <Box
              sx={{
                backgroundColor: "#080906",
                display: "flex",
                padding: { xs: "16px", lg: "26px" },
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HomeIcon
                sx={{ color: "#2963E8", fontSize: { xs: "18px", lg: "40px" } }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "4px 4px 4px 12px", lg: "0px 8px 0px 24px" },
              alignItems: "center",
              gap: { xs: "8px", md: "16px" },
              borderRadius: "999px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#2A2727",
                fontSize: { xs: "18px", lg: "48px" },
                fontStyle: "normal",
                lineHeight: { xs: "normal", lg: "101.927px" },
              }}
            >
              On the Go
            </Typography>
            <Box
              sx={{
                backgroundColor: "#080906",
                display: "flex",
                padding: { xs: "8px", lg: "17px" },
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CommuteIcon
                sx={{ color: "#2963E8", fontSize: { xs: "18px", lg: "40px" } }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Modes;
