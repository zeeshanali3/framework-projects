import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HowItWorks = () => {
  return (
    <Box
      sx={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "40px", md: "159px" },
        padding: {
          xs: "64px 0 27px 0",
          md: "64px 40px 27px 40px",
          lg: "160px 160px 103px 160px",
        },
        justifyContent: { xs: "flex-end", md: "flex-start" },
        alignItems: { xs: "center", md: "baseline" },
        backgroundColor: "#141613",
      }}
    >
      <Box sx={{ textAlign: "center", marginX: "auto" }}>
        <Typography
          variant="h1"
          sx={{
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: { xs: "52px", lg: "114px" },
            fontStyle: "normal",
            lineHeight: { xs: "56px", md: "114.793px" },
            display: { xs: "inline", md: "inline" },
          }}
        >
          How It&nbsp;
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: { xs: "52px", lg: "114px" },
            fontStyle: "normal",
            lineHeight: { xs: "56px", md: "114.793px" },
            display: { xs: "inline", md: "inline" },
          }}
        >
          Works
        </Typography>
      </Box>
      {/* Desktop View */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { md: 5 },
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // width: { xs: "428px", lg: "593px" },
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "13px", md: "24px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              backgroundColor: "#272A27",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#141613",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 1
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Create your account quickly and securely to start your learning
              journey.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#272A27",
              }}
            >
              <Typography
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 3
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Join Live Quizzes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Participate in interactive quizzes with real-time code compilation
              and instant feedback.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#272A27",
              }}
            >
              <Typography
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 5
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Achieve Goals
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Complete courses and assignments to unlock your full potential and
              demonstrate mastery.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            // width: { xs: "428px", lg: "593px" },
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "13px", md: "24px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#272A27",
              }}
            >
              <Typography
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 2
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Explore Courses
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Browse available courses, assignments, and quizzes tailored to
              your needs.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#141613",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 4
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Track Progress
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Monitor your results, attendance, and learning outcomes with
              detailed insights.
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Mobile View */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { md: 5 },
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // width: { xs: "428px", lg: "593px" },
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "13px", md: "24px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              backgroundColor: "#272A27",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#141613",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 1
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Create your account quickly and securely to start your learning
              journey.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#272A27",
              }}
            >
              <Typography
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 2
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Explore Courses
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Browse available courses, assignments, and quizzes tailored to
              your needs.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#272A27",
              }}
            >
              <Typography
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 3
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Join Live Quizzes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Participate in interactive quizzes with real-time code compilation
              and instant feedback.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            // width: { xs: "428px", lg: "593px" },
            flexDirection: "column",
            alignItems: "flex-start",
            gap: { xs: "13px", md: "24px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#141613",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 4
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Track Progress
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Monitor your results, attendance, and learning outcomes with
              detailed insights.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: { xs: "16px", md: "32px" },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: { xs: "8px", md: "16px" },
              alignSelf: "stretch",
              borderRadius: "24px",
              marginX: { xs: "24px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "4px 8px", md: "8px 16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "999px",
                backgroundColor: "#272A27",
              }}
            >
              <Typography
                sx={{
                  color: "#2963E8",
                  fontSize: { xs: "14px", md: "16px" },
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: { xs: "20px", md: "24px" },
                }}
              >
                Step 5
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "#FFFFFF",
                fontSize: { xs: "20px", md: "28px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "28px", md: "36px" },
              }}
            >
              Achieve Goals
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: { xs: "14px", md: "18px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: { xs: "20px", md: "24px" },
              }}
            >
              Complete courses and assignments to unlock your full potential and
              demonstrate mastery.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;
