import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      name: Yup.string(),
      message: Yup.string().min(10, "Message should be at least 10 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://api.edarete.com/api/edarete/email",
          {
            name: values.name,
            email: values.email,
            description: values.message,
          }
        );
        formik.resetForm();
        toast.success("Email submitted successfully!");
      } catch (error) {
        console.error("Error submitting email:", error);
        toast.error("Failed to submit. Please try again later.");
      }
    },
  });

  return (
    <Box
      sx={{
        alignSelf: "stretch",
        backgroundColor: "#272A27",
        paddingTop: { xs: "64px", lg: "160px" },
        paddingBottom: { xs: "64px", lg: "226px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: { xs: "380px", lg: "1213px" },
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          marginX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: "40px", lg: "112px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
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
                Have Feedback?
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
                Let’s Talk.
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: { xs: "16px", lg: "20px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "24px", lg: "28px" },
                opacity: 0.8,
                width: { xs: "380px", lg: "535px" },
              }}
            >
              Got ideas to improve Edarete or want to partner with us? We’re
              always open to feedback and collaboration that shapes the future
              of learning.
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
              <Box
                sx={{
                  display: "flex",
                  width: { xs: "380px", lg: "798px" },
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "40px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: { xs: "24px", lg: "32px" },
                    alignSelf: "stretch",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: { lg: "flex-end" },
                      flexDirection: { xs: "column", lg: "row" },
                      gap: "24px",
                      alignSelf: "stretch",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        flex: "1 0 0",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#BBBDBB",
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Email
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignSelf: "stretch",
                          gap: "4px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            background: "#141613",
                            marginBottom: {
                              xs: "0",
                              lg:
                                !formik.errors.email && formik.errors.name
                                  ? "27px"
                                  : "0px",
                            },
                          }}
                        >
                          <TextField
                            name="email"
                            fullWidth
                            variant="outlined"
                            placeholder="Your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Box
                                    component="img"
                                    src="/images/mail.svg"
                                    alt="Mail"
                                    sx={{ width: 24, height: 24 }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "transparent !important",
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                              },
                              "& .MuiOutlinedInput-input": {
                                backgroundColor: "transparent !important",
                                color: "#FFF",
                                WebkitBoxShadow:
                                  "0 0 0 1000px transparent inset !important",
                                transition:
                                  "background-color 999999s ease-in-out 0s !important",
                              },
                              "& input:-webkit-autofill": {
                                WebkitBoxShadow:
                                  "0 0 0px 1000px transparent inset !important",
                                WebkitTextFillColor: "#FFF !important",
                                transition:
                                  "background-color 999999s ease-in-out 0s !important",
                              },
                              "& .MuiInputBase-input::placeholder": {
                                color: "#8E918E",
                                fontFamily: "Inter",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "24px",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>
                        {formik.touched.email && formik.errors.email && (
                          <FormHelperText
                            sx={{
                              color: "#D32F2F",
                              fontSize: "12px",
                              marginLeft: "8px",
                            }}
                          >
                            {formik.errors.email}
                          </FormHelperText>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "16px",
                        flex: "1 0 0",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#BBBDBB",
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Name (Optional)
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignSelf: "stretch",
                          gap: "4px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            borderRadius: "8px",
                            background: "#141613",
                            marginBottom: {
                              xs: "0",
                              lg:
                                formik.errors.email && !formik.errors.name
                                  ? "27px"
                                  : "0px",
                            },
                          }}
                        >
                          <TextField
                            name="name"
                            fullWidth
                            variant="outlined"
                            placeholder="Your Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Box
                                    component="img"
                                    src="/images/user.svg"
                                    alt="User"
                                    sx={{ width: 24, height: 24 }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "transparent !important",
                                "& fieldset": { border: "none" },
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                              },
                              "& .MuiOutlinedInput-input": {
                                backgroundColor: "transparent !important",
                                color: "#FFF",
                                WebkitBoxShadow:
                                  "0 0 0 1000px transparent inset !important",
                                transition:
                                  "background-color 999999s ease-in-out 0s !important",
                              },
                              "& input:-webkit-autofill": {
                                WebkitBoxShadow:
                                  "0 0 0px 1000px transparent inset !important",
                                WebkitTextFillColor: "#FFF !important",
                                transition:
                                  "background-color 999999s ease-in-out 0s !important",
                              },
                              "& .MuiInputBase-input::placeholder": {
                                color: "#8E918E",
                                fontFamily: "Inter",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "24px",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>
                        {formik.touched.name && formik.errors.name && (
                          <FormHelperText
                            sx={{
                              color: "#D32F2F",
                              fontSize: "12px",
                              marginLeft: "8px",
                            }}
                          >
                            {formik.errors.name}
                          </FormHelperText>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#BBBDBB",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Message
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "stretch",
                        gap: "4px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          background: "#141613",
                        }}
                      >
                        <TextField
                          name="message"
                          fullWidth
                          variant="outlined"
                          multiline
                          placeholder="Share your feedback, ask questions, or let us know where you’re learning from."
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "transparent !important",
                              "& fieldset": { border: "none" },
                              "&:hover fieldset": { border: "none" },
                              "&.Mui-focused fieldset": { border: "none" },
                              height: "200px",
                              alignItems: "flex-start",
                              overflowY: "auto",
                            },
                            "& .MuiInputBase-input": {
                              backgroundColor: "transparent !important",
                              color: "#FFF",
                              height: "100%",
                              resize: "none",
                              padding: "12px 0",
                              WebkitBoxShadow:
                                "0 0 0 1000px transparent inset !important",
                              transition:
                                "background-color 999999s ease-in-out 0s !important",
                            },
                            "& input:-webkit-autofill": {
                              WebkitBoxShadow:
                                "0 0 0px 1000px transparent inset !important",
                              WebkitTextFillColor: "#FFF !important",
                              transition:
                                "background-color 999999s ease-in-out 0s !important",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "#8E918E",
                              fontFamily: "Inter",
                              fontSize: "18px",
                              fontStyle: "normal",
                              fontWeight: "400",
                              lineHeight: "24px",
                              opacity: 1,
                            },
                          }}
                        />
                      </Box>
                      {formik.touched.message && formik.errors.message && (
                        <FormHelperText
                          sx={{
                            color: "#D32F2F",
                            fontSize: "12px",
                            marginLeft: "8px",
                          }}
                        >
                          {formik.errors.message}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  sx={{
                    display: "flex",
                    width: "200px",
                    height: "56px",
                    padding: "8px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "999px",
                    background: "#2963E8",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#1e4dc2",
                    },
                    "&:disabled": {
                      opacity: 0.7,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        height: "40px",
                        padding: "0 8px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#FFFFFF",
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "24px",
                        }}
                      >
                        Send Message
                      </Typography>
                    </Box>
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
