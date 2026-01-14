import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Hero = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #D0E4FF 0%, #2963E8 70%)",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: "24px", lg: "52px" },
        justifyContent: { md: "space-between" },
        overflow: "hidden",
        alignItems: { lg: "center" },
      }}
    >
      <Box
        sx={{
          marginTop: { xs: "24px" },
          marginLeft: { xs: "24px", lg: "34px" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "40px", lg: "128px" },
        }}
      >
        <Box
          component="a"
          href="/"
          sx={{
            display: "flex",
            width: { xs: 100, md: 120 },
            alignItems: "center",
            gap: "4px",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src="/images/edareteLogo.png"
            alt="Logo"
            sx={{
              display: "block",
              width: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "380px", lg: "561px" },
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: { lg: "86px" },
            gap: "56px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              width: "100%",
              color: "#FFFFFF",
              fontSize: { xs: "80px", lg: "108px" },
              fontWeight: 500,
              lineHeight: { xs: "90px", lg: "130px" },
              position: "relative",
              // left: { sm: "50%", md: "0%" },
            }}
          >
            Learn, Grow, and Achieve
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: { xs: "none", md: "block" },
              width: { lg: "548px" },
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "28px",
              opacity: 0.8,
            }}
          >
            From live coding quizzes to smart management tools, every feature is
            built to turn potential into achievement.
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "532px",
              alignItems: "center",
              gap: "12px",
              paddingBottom: { md: "60px", lg: "80px" },
            }}
          >
            <Button
              sx={{
                borderRadius: "999px",
                p: 0,
                minWidth: "auto",
              }}
            >
              <Box
                component="img"
                src="/images/hero_app_store_button.svg"
                alt="Apple"
                sx={{
                  width: { md: "200px", lg: "100%" },
                }}
              />
            </Button>
            <Button
              sx={{
                borderRadius: "999px",
                p: 0,
                minWidth: "auto",
              }}
            >
              <Box
                component="img"
                src="/images/hero_google_play_button.svg"
                alt="Playstore"
                sx={{
                  width: { md: "200px", lg: "100%" },
                }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingTop: { sm: "50px", md: "100px" },
          paddingRight: { md: "150px", lg: "220px" },
          paddingBottom: { xs: "50px", md: "0px" },
          paddingLeft: { sm: "50px", md: "0px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/images/hero_illustration.png"
          alt="Illustration"
          sx={{
            height: { xs: "400px", md: "500px", lg: "600px" },
            flexShrink: 0,
            objectFit: "contain",
            display: "block",
            marginRight: { lg: "14px" },
            marginBottom: { lg: "80px" },
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
