import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const RealProblems = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#141613",
        alignSelf: "stretch",
        paddingTop: { xs: "64px", lg: "160px" },
        paddingBottom: { xs: "50px", lg: "149px" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: "24px", lg: "40px" },
          width: "100%",
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
              color: "#FFFFFF",
              textAlign: "center",
              fontSize: { xs: "52px", lg: "114px" },
              fontStyle: "normal",
              lineHeight: { xs: "56px", lg: "114.793px" },
            }}
          >
            Built for Real Learning
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "#2963E8",
              textAlign: "center",
              fontSize: { xs: "52px", lg: "114px" },
              fontStyle: "normal",
              lineHeight: { xs: "56px", lg: "114.793px" },
            }}
          >
            Challenges
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            width: { lg: "593px" },
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: { xs: "16px", lg: "20px" },
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: { xs: "24px", lg: "28px" },
            opacity: 0.8,
          }}
        >
          Traditional learning tools often fall short when life gets busy or
          complex. Edarete adapts — to your pace, goals, and environment.
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "97px",
          marginLeft: "80px",
          display: { xs: "none", lg: "flex" },
          width: { md: "865px", lg: "1280px", xl: "1350px" },
          marginX: { lg: "auto" },
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              flex: "1 0 0",
              borderRadius: "24px",
              backgroundColor: "rgba(41, 99, 232, 0.10)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              "&:hover": {
                backgroundColor: "rgba(41, 99, 232, 0.25)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: "88px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: "2px 4px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#272A27",
                      textAlign: "center",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    ❌ Problem
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <Box
                component="img"
                src="/images/user_1_real_problem.png"
                alt="User"
                sx={{ width: "88px", height: "88px" }}
              />
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#2963E8",
                  fontSize: "28px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "36px",
                }}
              >
                “My schedule is always changing.”
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                sx={{
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.20)",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Edarete lets you access courses, quizzes, and progress tracking
                anytime — study at your own pace, whenever it fits.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              flex: "1 0 0",
              borderRadius: "24px",
              backgroundColor: "rgba(41, 99, 232, 0.10)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              "&:hover": {
                backgroundColor: "rgba(41, 99, 232, 0.25)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: "88px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: "2px 4px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#272A27",
                      textAlign: "center",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    ❌ Problem
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <Box
                component="img"
                src="/images/user_2_real_problem.png"
                alt="User"
                sx={{ width: "88px", height: "88px" }}
              />
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#2963E8",
                  fontSize: "28px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "36px",
                }}
              >
                “I struggle to stay consistent.”
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                sx={{
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.20)",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Smart reminders, interactive quizzes, and progress insights keep
                you motivated and on track every step of the way.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              flex: "1 0 0",
              borderRadius: "24px",
              backgroundColor: "rgba(41, 99, 232, 0.10)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              "&:hover": {
                backgroundColor: "rgba(41, 99, 232, 0.25)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: "88px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: "2px 4px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#272A27",
                      textAlign: "center",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    ❌ Problem
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <Box
                component="img"
                src="/images/user_3_real_problem.png"
                alt="User"
                sx={{ width: "88px", height: "88px" }}
              />
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#2963E8",
                  fontSize: "28px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "36px",
                }}
              >
                “It’s hard to see how I’m improving.”
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                sx={{
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.20)",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Edarete’s detailed performance tracking and CLO/PLO mapping make
                your progress visible and measurable.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              flex: "1 0 0",
              borderRadius: "24px",
              backgroundColor: "rgba(41, 99, 232, 0.10)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              "&:hover": {
                backgroundColor: "rgba(41, 99, 232, 0.25)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: "88px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "999px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: "2px 4px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#272A27",
                      textAlign: "center",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    ❌ Problem
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <Box
                component="img"
                src="/images/user_4_real_problem.png"
                alt="User"
                sx={{ width: "88px", height: "88px" }}
              />
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#2963E8",
                  fontSize: "28px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "36px",
                }}
              >
                “Managing results is a mess.”
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                sx={{
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.20)",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                alignSelf: "stretch",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  flex: "1 0 0",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                From submission tracking to instant grading, Edarete keeps all
                your academic tasks organized and effortless.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Mobile */}
      <Box
        sx={{
          marginTop: "56px",
          paddingX: "24px",
          display: { xs: "flex", lg: "none" },
          flexDirection: "row",
          alignItems: "stretch",
          gap: "8px",
          position: "relative",
          zIndex: 1,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            flex: "0 0 auto",
            width: "380.5px",
            display: "flex",
            padding: "16px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            borderRadius: "24px",
            backgroundColor: "rgba(41, 99, 232, 0.10)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(41, 99, 232, 0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                minWidth: "88px",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "999px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "2px 4px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#272A27",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  ❌ Problem
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <Box
              component="img"
              src="/images/user_1_real_problem.png"
              alt="User"
              sx={{ width: "72px", height: "72px" }}
            />
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#2963E8",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              “My schedule is always changing.”
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Divider
              orientation="horizontal"
              variant="fullWidth"
              sx={{
                height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.20)",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#FFFFFF",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Edarete lets you access courses, quizzes, and progress tracking
              anytime — study at your own pace, whenever it fits.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "0 0 auto",
            width: "380.5px",
            display: "flex",
            padding: "16px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            borderRadius: "24px",
            backgroundColor: "rgba(41, 99, 232, 0.10)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(41, 99, 232, 0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                minWidth: "88px",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "999px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "2px 4px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#272A27",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  ❌ Problem
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <Box
              component="img"
              src="/images/user_2_real_problem.png"
              alt="User"
              sx={{ width: "72px", height: "72px" }}
            />
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#2963E8",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              “I struggle to stay consistent.”
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Divider
              orientation="horizontal"
              variant="fullWidth"
              sx={{
                height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.20)",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#FFFFFF",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Smart reminders, interactive quizzes, and progress insights keep
              you motivated and on track every step of the way.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "0 0 auto",
            width: "380.5px",
            display: "flex",
            padding: "16px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            borderRadius: "24px",
            backgroundColor: "rgba(41, 99, 232, 0.10)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(41, 99, 232, 0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                minWidth: "88px",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "999px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "2px 4px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#272A27",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  ❌ Problem
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <Box
              component="img"
              src="/images/user_3_real_problem.png"
              alt="User"
              sx={{ width: "72px", height: "72px" }}
            />
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#2963E8",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              “It’s hard to see how I’m improving.”
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Divider
              orientation="horizontal"
              variant="fullWidth"
              sx={{
                height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.20)",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#FFFFFF",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Edarete’s detailed performance tracking and CLO/PLO mapping make
              your progress visible and measurable.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: "0 0 auto",
            width: "380.5px",
            display: "flex",
            padding: "16px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            borderRadius: "24px",
            backgroundColor: "rgba(41, 99, 232, 0.10)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(41, 99, 232, 0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                minWidth: "88px",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "999px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "2px 4px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#272A27",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  ❌ Problem
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <Box
              component="img"
              src="/images/user_4_real_problem.png"
              alt="User"
              sx={{ width: "72px", height: "72px" }}
            />
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#2963E8",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              “Managing results is a mess.”
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Divider
              orientation="horizontal"
              variant="fullWidth"
              sx={{
                height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.20)",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              alignSelf: "stretch",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                flex: "1 0 0",
                color: "#FFFFFF",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              From submission tracking to instant grading, Edarete keeps all
              your academic tasks organized and effortless.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RealProblems;
