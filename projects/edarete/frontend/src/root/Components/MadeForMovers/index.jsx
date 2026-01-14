import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MadeForMovers = () => {
  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FFFFFF",
        alignSelf: "stretch",
        paddingTop: { xs: "64px", lg: "160px" },
        paddingBottom: { xs: "64px", lg: "192px" },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: "40px", lg: "80px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: "24px", lg: "40px" },
            paddingX: { xs: "24px", lg: "0px" },
            width: { xs: "380px", lg: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "#272A27",
                textAlign: "center",
                fontSize: { xs: "52px", lg: "114px" },
                fontStyle: "normal",
                lineHeight: { xs: "56px", lg: "114.793px" },
              }}
            >
              Learning That Fits
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: "#2963E8",
                fontSize: { xs: "52px", lg: "114px" },
                fontStyle: "normal",
                lineHeight: { xs: "56px", lg: "114.793px" },
              }}
            >
              Your Studies
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              width: { xs: "380px", lg: "593px" },
              color: "#272A27",
              textAlign: "center",
              fontSize: { xs: "16px", lg: "20px" },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: { xs: "24px", lg: "28px" },
              opacity: 0.8,
            }}
          >
            Whether you’re balancing college, remote classes, or personal
            learning goals — Edarete adapts to your schedule, helping you stay
            consistent anywhere.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: { xs: "512px", lg: "800px" },
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            paddingX: { xs: "24px", lg: "40px" },
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              width: { xs: "348px", lg: "544px" },
              flex: { xs: "0 0 auto", lg: "1 0 0" },
              alignSelf: "stretch",
              borderRadius: "32px",
              padding: { xs: "16px", lg: "40px" },
              backgroundImage: `
                linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0.6) 0%,
                  rgba(0, 0, 0, 0.1) 40%,
                  rgba(0, 0, 0, 0.1) 60%,
                  rgba(0, 0, 0, 0.6) 100%
                ),
                url('/images/remote_learners.jpg')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#FFFFFF",
                fontSize: { xs: "36px", lg: "52px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: { xs: "44px", lg: "64px" },
              }}
            >
              Remote <br /> Learners
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: { xs: "20.48px", lg: "32px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: { xs: "10.24px", lg: "16px" },
                  alignSelf: "stretch",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "24px", lg: "32px" },
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: { xs: "32px", lg: "40px" },
                  }}
                >
                  Study effectively from anywhere.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    alignSelf: "stretch",
                    color: "#FFFFFF",
                    fontSize: { xs: "14px", lg: "18px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: { xs: "20px", lg: "24px" },
                  }}
                >
                  Access courses, notes, and assessments easily — all optimized
                  for on-the-go learning.
                </Typography>
              </Box>
              <Button
                sx={{
                  display: "flex",
                  padding: { xs: "4px", lg: "8px 16px" },
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  background: "#2963E8",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: "40px",
                    padding: { xs: "0px 4px", lg: "8px" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#FFFFFF",
                      fontSize: { xs: "14px", lg: "18px" },
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: { xs: "20px", lg: "24px" },
                    }}
                  >
                    👀 See How It Works
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "348px", lg: "544px" },
              flex: { xs: "0 0 auto", lg: "1 0 0" },
              alignSelf: "stretch",
              borderRadius: "32px",
              padding: { xs: "16px", lg: "40px" },
              backgroundImage: `
                linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0.6) 0%,
                  rgba(0, 0, 0, 0.1) 40%,
                  rgba(0, 0, 0, 0.1) 60%,
                  rgba(0, 0, 0, 0.6) 100%
                ),
                url('/images/busy_students.jpg')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#FFFFFF",
                fontSize: { xs: "36px", lg: "52px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: { xs: "44px", lg: "64px" },
              }}
            >
              Busy <br /> Students
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: { xs: "20.48px", lg: "32px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: { xs: "10.24px", lg: "16px" },
                  alignSelf: "stretch",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "24px", lg: "32px" },
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: { xs: "32px", lg: "40px" },
                  }}
                >
                  Keep up with lessons even on tight schedules.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    alignSelf: "stretch",
                    color: "#FFFFFF",
                    fontSize: { xs: "14px", lg: "18px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: { xs: "20px", lg: "24px" },
                  }}
                >
                  Quick sessions, reminders, and progress tracking that fit
                  between your daily routines.
                </Typography>
              </Box>
              <Button
                sx={{
                  display: "flex",
                  padding: { xs: "4px", lg: "8px 16px" },
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  background: "#2963E8",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: "40px",
                    padding: { xs: "0px 4px", lg: "8px" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#FFFFFF",
                      fontSize: { xs: "14px", lg: "18px" },
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: { xs: "20px", lg: "24px" },
                    }}
                  >
                    👀 See How It Works
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "348px", lg: "544px" },
              flex: { xs: "0 0 auto", lg: "1 0 0" },
              alignSelf: "stretch",
              borderRadius: "32px",
              padding: { xs: "16px", lg: "40px" },
              backgroundImage: `
                linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0.6) 0%,
                  rgba(0, 0, 0, 0.1) 40%,
                  rgba(0, 0, 0, 0.1) 60%,
                  rgba(0, 0, 0, 0.6) 100%
                ),
                url('/images/lifelong_learners.jpg')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#FFFFFF",
                fontSize: { xs: "36px", lg: "52px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: { xs: "44px", lg: "64px" },
              }}
            >
              Lifelong <br /> Learners
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: { xs: "20.48px", lg: "32px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: { xs: "10.24px", lg: "16px" },
                  alignSelf: "stretch",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "24px", lg: "32px" },
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: { xs: "32px", lg: "40px" },
                  }}
                >
                  Keep learning at your own pace.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    alignSelf: "stretch",
                    color: "#FFFFFF",
                    fontSize: { xs: "14px", lg: "18px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: { xs: "20px", lg: "24px" },
                  }}
                >
                  Learn continuously through modular lessons designed to adapt
                  to your interests.
                </Typography>
              </Box>
              <Button
                sx={{
                  display: "flex",
                  padding: { xs: "4px", lg: "8px 16px" },
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  background: "#2963E8",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: "40px",
                    padding: { xs: "0px 4px", lg: "8px" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#FFFFFF",
                      fontSize: { xs: "14px", lg: "18px" },
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: { xs: "20px", lg: "24px" },
                    }}
                  >
                    👀 See How It Works
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MadeForMovers;
