import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const StandsOut = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url('/images/stands_out_background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            paddingTop: { xs: "64px", lg: "160px" },
            paddingLeft: { lg: "95px" },
            display: "flex",
            flexDirection: "column",
            gap: "67px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "24px", lg: "27px" },
            }}
          >
            <Box
              sx={{
                // width: { sm: "380px", lg: "667px" },
                paddingX: { xs: "24px", lg: "0px" },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  alignSelf: "stretch",
                  // width: { xs: "315px", sm: "250px", lg: "500px", xl: "639px" },
                  color: "#FFFFFF",
                  fontSize: { xs: "52px", lg: "114px" },
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: { xm: "108.703px", md: "114.8px" },
                  textAlign: { xs: "left", sm: "center", lg: "left" },
                }}
              >
                Elevate Your Learning
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                width: { lg: "593px" },
                color: "#FFFFFF",
                fontSize: { xs: "16px", lg: "20px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "24px", lg: "28px" },
                paddingX: { xs: "24px", lg: "0px" },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              Edarete isn’t just a learning platform — it’s designed to fit your
              schedule, learning style, and academic goals.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "752px",
            flexDirection: "column",
            alignItems: "flex-start",
            marginX: { md: "auto", lg: "none" },
            gap: "8px",
            paddingTop: "166px",
            paddingRight: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: "24px",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                gap: "24px",
                flex: "1 0 0",
                borderRadius: "24px",
                backgroundColor: "rgba(236, 237, 236, 0.30)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#272A27",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.40)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  color: "#FFFFFF",
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
                    background: "#FFFFFF",
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
                      Personalized Learning
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "28px",
                  fontStyle: "normal",
                  lineHeight: "36px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Smarter Every Time
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Edarete adapts to your learning pace and progress to help you
                focus on what matters most.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "24px",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                gap: "24px",
                flex: "1 0 0",
                borderRadius: "24px",
                backgroundColor: "rgba(236, 237, 236, 0.30)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#272A27",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.40)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  color: "#FFFFFF",
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
                    background: "#FFFFFF",
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
                      Real-Time Feedback
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "28px",
                  fontStyle: "normal",
                  lineHeight: "36px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Learn as You Go
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Live quizzes and assignments give immediate results to help you
                improve continuously.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: "24px",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                gap: "24px",
                flex: "1 0 0",
                borderRadius: "24px",
                backgroundColor: "rgba(236, 237, 236, 0.30)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#272A27",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.40)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  color: "#FFFFFF",
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
                    background: "#FFFFFF",
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
                      Outcome Tracking
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "28px",
                  fontStyle: "normal",
                  lineHeight: "36px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Track Your Progress
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Keep an eye on your results, attendance, and learning milestones
                effortlessly.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "24px",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                gap: "24px",
                flex: "1 0 0",
                borderRadius: "24px",
                backgroundColor: "rgba(236, 237, 236, 0.30)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#272A27",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.40)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  color: "#FFFFFF",
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
                    background: "#FFFFFF",
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
                      Flexible Access
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "28px",
                  fontStyle: "normal",
                  lineHeight: "36px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Learn Anywhere
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  alignSelf: "stretch",
                  textAlign: "center",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Study from home, school, or on the go with seamless access
                across devices.
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Mobile */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "stretch",
            gap: "8px",
            paddingX: "22px",
            paddingTop: "40px",
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              width: "372px",
              padding: "16px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "24px",
              backgroundColor: "rgba(236, 237, 236, 0.30)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              color: "#272A27",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.40)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#FFFFFF",
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
                  background: "#FFFFFF",
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
                    Personalized Learning
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontStyle: "normal",
                lineHeight: "28px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Smarter Every Time
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Edarete adapts to your learning pace and progress to help you
              focus on what matters most.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              width: "372px",
              padding: "16px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "24px",
              backgroundColor: "rgba(236, 237, 236, 0.30)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              color: "#272A27",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.40)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#FFFFFF",
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
                  background: "#FFFFFF",
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
                    Real-Time Feedback
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontStyle: "normal",
                lineHeight: "28px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Learn as You Go
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Live quizzes and assignments give immediate results to help you
              improve continuously.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              width: "372px",
              padding: "16px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "24px",
              backgroundColor: "rgba(236, 237, 236, 0.30)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              color: "#272A27",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.40)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#FFFFFF",
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
                  background: "#FFFFFF",
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
                    Outcome Tracking
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontStyle: "normal",
                lineHeight: "28px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Track Your Progress
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Keep an eye on your results, attendance, and learning milestones
              effortlessly.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              width: "372px",
              padding: "16px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "24px",
              backgroundColor: "rgba(236, 237, 236, 0.30)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              color: "#272A27",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.40)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                color: "#FFFFFF",
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
                  background: "#FFFFFF",
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
                    Flexible Access
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontStyle: "normal",
                lineHeight: "28px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Learn Anywhere
            </Typography>
            <Typography
              variant="body1"
              sx={{
                alignSelf: "stretch",
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Study from home, school, or on the go with seamless access across
              devices.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: { xs: "100px 16.19px 0px 0px", lg: "200px 40px 40px 40px" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          top: { xs: "-40px", lg: "0px" },
        }}
      >
        <Box sx={{ visibility: "hidden", width: "123.2px" }}></Box>
        <Box
          sx={{
            display: "inline-flex",
            padding: "12px",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
            visibility: { xs: "hidden", lg: "visible" },
          }}
        >
          <Box
            sx={{
              width: "20px",
              height: "4px",
              borderRadius: "4px",
              backgroundColor: "#FFFFFF",
            }}
          />
          <Box
            sx={{
              width: "20px",
              height: "4px",
              borderRadius: "4px",
              backgroundColor: "#BBBDBB",
              opacity: 0.4,
            }}
          />
          <Box
            sx={{
              width: "20px",
              height: "4px",
              borderRadius: "4px",
              backgroundColor: "#BBBDBB",
              opacity: 0.4,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <IconButton
            sx={{
              padding: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "8px", lg: "16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: "3.716px", lg: "8px" },
                borderRadius: "999px",
                border: "1px solid rgba(67, 71, 66, 0.10)",
                background: "#FFF",
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
            </Box>
          </IconButton>
          <IconButton
            sx={{
              padding: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: { xs: "8px", lg: "16px" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: "3.716px", lg: "8px" },
                borderRadius: "999px",
                border: "1px solid rgba(67, 71, 66, 0.10)",
                background: "#FFF",
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
            </Box>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default StandsOut;
