import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  TextField,
  Card,
  useMediaQuery,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Input,
  IconButton, ListItemAvatar ,Avatar,InputAdornment,
  
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { AttachFile } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Assignment } from "@mui/icons-material";
import { FormatDate, FormatDateYMD } from "../../validation/validtionFunctions";
import { Btnsx } from "../../Animation/Btnsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import FileIconComponent from "../../custom/FileIcon";
import { DeletestudentsubmissionAction } from "../../Common/Store/Actions/DeleteActions/deletestudentsubmissionAction";
import { GetstudentsubmissionattachmentsAction } from "../../Common/Store/Actions/General/GetActions/getstudentsubmissionattachAction";
import {
  getRoleData,
  getStudentData,
  getAccessToken,
} from "../../Utils/loginData/loginData";
import { helperText } from "../../text/text";
import { GetQuestionBySubComponentIdAction } from "../../Common/Store/Actions/General/GetActions/getquestionbySubIDAction";
import { toast, ToastContainer } from "react-toastify";
import { AddStudentAnsAction } from "../../Common/Store/Actions/General/PostActions/addstudentanswerAction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";
import AlertModal from "../../custom/AlertModal";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction";
import { AddChatAction } from "../../Common/Store/Actions/General/PostActions/addChatAction";
import Contants from "../../Common/Constants"

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #DADEE0',
  borderRadius: '25px',
  padding: '8px 12px',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
});
const AssignmentInstruction = ({
  Text,
  TotalMarks,
  Posted_Date,
  SubmissionDate,
  EndTime,
  courseId,
  SubComponentId,
  userRoleId,
  roleName,
  ComponentName,
  attachments,
  ComponentType,
  CourseId,
  CourseName
}) => {
  const SubmissionFormateDate = FormatDate(SubmissionDate);
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const studenData = getStudentData(loginData);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setStatus] = useState("Not Submitted");
  const [Message, setMessage] = useState("");
  const [studentText, setStudentText] = useState("");
  const dispatch = useDispatch();
  const [getsubmissionID, setgetsubmissionID] = useState("");
  const { id } = useParams();
  const roleData = getRoleData(loginData);
  const { RoleId, RoleName, UserroleId } = roleData;
  const mapArray = studenData;
  console.log("StudentData::::", mapArray)

  const matchingEnrollment =
    mapArray && mapArray.find((enrollment) => enrollment.CourseId == CourseId);
  const enrollmentId = matchingEnrollment
    ? matchingEnrollment.EnrollementId
    : null;
  console.log("StudentData::::", enrollmentId)
  const isMobile = useMediaQuery("(max-width:600px)");
  const [uploadOption, setUploadOption] = useState("file");
  const [linkValue, setLinkValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisabled] = useState(false);
  console.log("End Time", EndTime);
  useEffect(() => {
    dispatch(isLoadingAction(true));
    dispatch(GetQuestionBySubComponentIdAction(token, SubComponentId,
      (response) => {
        dispatch(isLoadingAction(false));
        console.log("success", response);
      },
      (error) => {
        dispatch(isLoadingAction(false));
        console.log("error", error);
      }
    ));
  }, [SubComponentId]);
  useEffect(() => {
    if (enrollmentId) {
      dispatch(
        GetstudentsubmissionattachmentsAction(
          token,
          SubComponentId,
          (response) => {
            dispatch(isLoadingAction(false));
            console.log("getting stu attach", response)
          },
          (error) => {
            dispatch(isLoadingAction(false));
            console.log("error", error)
          }
        )
      );
    }
  }, [enrollmentId, SubComponentId, token]);

  function handledeletestudentsubmissionFunction(StudentSubmissionId, questionIds) {
    dispatch(isLoadingAction(true));
    console.log("CourseId:::", CourseName, "    studentsData:::", studenData)
    console.log("studenData.find((enrollment) => enrollment.CourseId == courseId).EnrollementId,", studenData.find((enrollment) => enrollment.CourseName == CourseName).EnrollementId,)
    dispatch(
      DeletestudentsubmissionAction(
        token,
        StudentSubmissionId,
        studenData.find((enrollment) => enrollment.CourseName == CourseName).EnrollementId,
        SubComponentId,
        questionIds,
        (response) => {
          // console.log("success", response);
          dispatch(
            GetstudentsubmissionattachmentsAction(
              token,
              SubComponentId,
              (response) => {
                dispatch(isLoadingAction(false));
                console.log("getting stu attach", response)
                toast.success(response?.data?.message || "Unsubmitted successfully!");
                setIsDisabled(false);
              },
              (error) => { console.log("error", error) }
            )
          );
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("ERROR", error)
        }
      )
    );
  }

  const { studentsubattachData } = useSelector(
    (state) => state.GETSTUDENTSUBATTACHREDUCER
  );

  const studentsubAttachment = studentsubattachData?.payload?.studentSubmissionData?.find(item => item.EnrollementId == enrollmentId) || "";
  const studentSubmissionAnswers = [studentsubAttachment]
  console.log("studentsubAttachment:::", studentsubAttachment)

  useEffect(() => {
    if (!studentsubAttachment) return;
    const initialAnswers = studentSubmissionAnswers.reduce((acc, submission) => {
      submission.Questions.forEach(question => {
        if (question.StudentAnswer) {
          acc[question.QuestionId] = question.StudentAnswer;
        }
      });
      return acc;
    }, {});

    setIsDisabled(Object.keys(initialAnswers).length > 0);
    setAnswers(initialAnswers);
  }, [studentsubAttachment]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
  };
  function formatTimeTo12Hour(time) {
    const [hour, minute] = time.split(':').map(Number);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${hour12}:${formattedMinute} ${suffix}`;
  }
  const handleaddactionDispatch=(id)=>{
    console.log(studentText)
    dispatch(
      AddChatAction(
        token,
        id, 
        userRoleId,
        Message,
        "10:00:00",
        "0",
        (SUCCESS)=>{
          console.log("success"  ,SUCCESS)
        },
        (ERROR)=>{
          console.log("error"  , ERROR)
        }
  
      )
    )
   }

  function handleSubmission(event) {
    event.preventDefault();
    dispatch(isLoadingAction(true));
    handleSubmitAnswers();
    const formData = new FormData();

    if (uploadOption === "file") {
      selectedFiles.forEach((file, index) => {
        formData.append(`attachments`, file);
        console.log("file for link", file);
      });
    } else if (uploadOption === "link") {
      formData.append("link", linkValue);
    }

    formData.append("EnrollementId", enrollmentId);
    formData.append("SubComponentId", SubComponentId);
    formData.append("UserRoleId", userRoleId);

    axios
      .post(Contants.api_base_url + "/api/studentsubmission", formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=" + formData._boundary,
        },
      })
      .then((response) => {
        toast.success(response?.data?.message || "Submission successful!");
        setSelectedFiles([]);
        setLinkValue("");
        setLoading(false);
        dispatch(
          GetstudentsubmissionattachmentsAction(
            token,
            SubComponentId,
            enrollmentId,
            (response) => {
              dispatch(isLoadingAction(false));
              console.log("getting stu attach", response);
            },
            (error) => {
              console.log("error", error);
            }
          )
        );
      })
      .catch((error) => {
        toast.error("Error in Submission");

        setLoading(false);
      });
  }

  const handleUnsubmit = () => {
    const questionIds = Object.keys(answers);
    handledeletestudentsubmissionFunction(studentsubAttachment.StudentSubmissionId, questionIds);
    setStatus("Not Submitted");
    setSelectedFiles([]);
  };

  const isSubmissionDisabled = () => {
    const currentDateTime = new Date();
    console.log("SubmissionFormateDate::", SubmissionFormateDate, "  EndTime::", EndTime)
    const dueDateTime = new Date(`${FormatDateYMD(SubmissionFormateDate)} ${EndTime}`);
    console.log("dueDateTime::::", dueDateTime)
    return currentDateTime > dueDateTime;
  };

  const { questionbysubid } = useSelector((state) => state?.GETQUESTIONBYSUBID);
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    // Update the answers state with the new answer for the given questionId
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmitAnswers = () => {
    dispatch(isLoadingAction(true));
    questionbysubid?.payload?.forEach((question) => {
      const questionId = question.QuestionId;
      const studentAnswer = answers[questionId] || " ";
      if (studentAnswer) {
        setStatus("Submitted");
        dispatch(
          AddStudentAnsAction(token, studentAnswer, enrollmentId, questionId,
            (response) => {
              dispatch(isLoadingAction(false));
              console.log("success", response);
            }
            ,
            (error) => {
              dispatch(isLoadingAction(false));
              console.log("error", error);
            }
          )
        );
      }
    });
  };
  return (
    <Grid
      container
      justifyContent="center"
      rowSpacing={1}
      columnSpacing={{ xs: 4, sm: 2, md: 2 }}
      m={1}
      p={1}
    >
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            p: "25px 20px",
            mb: "15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
            <Box
              sx={{
                width: "45px",
                height: "45px",
                lineHeight: "45px",
                background: "#757FEF",
                color: "#fff",
                fontSize: "25px",
                borderRadius: "100%",
                textAlign: "center",
                marginRight: "10px",
              }}
            >
              <i className="ri-money-dollar-circle-line">
                <Assignment />
              </i>
            </Box>
            <Typography
              variant="h1"
              sx={{ fontSize: 18, fontWeight: 500 }}
              className="ml-10px"
            >
              {ComponentName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "10px",
              paddingLeft: isMobile ? "0px" : "50px",
            }}
          >
            {ComponentType !== "Not Graded" && [
              { label: "Marks", value: (enrollmentId ? (studentsubAttachment.SubcomponentMarks ? studentsubAttachment.SubcomponentMarks + "/" : "0/") : "") + TotalMarks },
              {
                label: "Due Date",
                value: SubmissionFormateDate + " , " + formatTimeTo12Hour(EndTime),
              },
            ].map((item) => (
              <Box key={item.label}>
                <Typography sx={{ fontSize: "20px", mb: "5px", fontWeight: "700" }}>
                  {item.label}
                </Typography>
                <Typography
                  as="h4"
                  sx={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
          {/* fileUrl={attachment.Download_url}
          FileName={attachment.FileName} */}
          <Box
            sx={{
              borderTop: "0.0625rem solid rgb(218, 220, 224)",
              marginLeft: isMobile ? "0px" : "50px",
            }}
            className="pb-2 pt-2"
          >
            {renderDetails(
              "Details",
              <Box
                pl={2}
                pt={2}
                pb={2}
                dangerouslySetInnerHTML={{ __html: Text }}
              />


            )}
            {attachments?.map((attachment) => (
              <Box pl={2} pt={1} pb={1}>
                {/* <p>Download Url: {attachment.Download_url}</p> */}
                <FileIconComponent
                  fileUrl={attachment.Download_url}
                  FileName={attachment.FileName}
                  iconSize="50px"
                />
                {/* <p>File Name: {attachment.FileName}</p>
                      <p>File Size: {attachment.FileSize}</p>
                      <p>Fie Type: {attachment.FileType}</p> */}
              </Box>
            ))}

            <Box
              className="box mt-6"
              sx={{
                border: "0.0625rem solid rgb(218, 220, 224) ",
                borderRadius: "10px",
              }}
            >
              <ul>
              
                {questionbysubid?.payload?.map((question) => (

                  <li key={question.QuestionId} className="p-2">
                    <div className="flex">
                      <SwipeRightAltIcon className="mr-2" />
                      <Typography fontSize={"18px"} sx={{ color: "black" }}>
                        {" "}
                        {question?.Description}----({(studentsubAttachment?.Questions?.find(
    (item) => item.QuestionId === question.QuestionId)?.ObtainedMarks || 0 )+ "/" + question?.QuestionMarks})
                      </Typography>
                    </div>
                    {/* Render a text field for each question */}
                    {enrollmentId !== null && (
                      <TextField
                        type="text"
                        disabled={studentsubAttachment.Status !== "Submitted" ? false : true}
                        value={answers[question.QuestionId] || ""}

                        onChange={(e) =>
                          handleAnswerChange(question.QuestionId, e.target.value)
                        }
                        placeholder="Enter your answer"
                        fullWidth
                        variant="standard"
                      />
                    )}

                  </li>
                ))}
              </ul>

            </Box>



          </Box>
          {
            
          }
          {/* <Box className="p-2" sx={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <StyledBox>
                <IconButton sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                    </Avatar>
                </IconButton>

                <TextField
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    placeholder="Your message..."
                    InputProps={{
                        disableUnderline: true,
                        sx: { borderRadius: '20px',paddingLeft:"25px", color: '#333' },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={() => handleaddactionDispatch(SubComponentId)}
                                    color="primary"
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    sx={{ bgcolor: '#F1F3F4', borderRadius: '20px', ml: 2 }}
                />
            </StyledBox>
        </Box> */}

        </Box>
      </Grid>
     
      {enrollmentId && (
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Card sx={{ boxShadow: "none", borderRadius: "10px" }}>
            <CardContent>
              {ComponentType !== "Not Graded" && studentsubAttachment.Status !== "Submitted" &&
                renderTypography("File Upload", "h2", "pt-2 pb-2")}

              {ComponentType !== "Not Graded" && studentsubAttachment.Status !== "Submitted" && (
                <Box className="mt-2 mb-2">
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{ fontSize: "13px", mb: "5px" }}
                      htmlFor="upload-option"
                    >
                    </InputLabel>
                    <Select
                      sx={{
                        borderRadius: "10px",
                        border: "0.0625rem solid rgb(218, 220, 224)",
                      }}
                      value={uploadOption}
                      onChange={(e) => setUploadOption(e.target.value)}
                      inputProps={{
                        name: "upload-option",
                        id: "upload-option",
                      }}
                    >
                      <MenuItem value="file">From this PC</MenuItem>
                      <MenuItem value="link">Link</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
              {uploadOption === "file" &&
                studentsubAttachment.Status !== "Submitted" && ComponentType !== "Not Graded" && (
                  <Box
                    className="mt-2 mb-2"
                    sx={{
                      border: "0.0625rem solid rgb(218, 220, 224)",
                      borderRadius: "10px",
                    }}
                  >
                    <Input
                      id="file-input"
                      type="file"
                      onChange={handleFileChange}
                      sx={{ display: "none" }}
                      inputProps={{ multiple: true }}
                    />
                    <label htmlFor="file-input">
                      <IconButton
                        color="primary"
                        component="span"
                        style={{ marginBottom: "10px" }}
                      >
                        <AttachFile />
                      </IconButton>
                      {helperText.select_file_from_here}
                    </label>
                  </Box>
                )}

              {ComponentType !== "Not Graded" && uploadOption === "link" && (
                <TextField
                  border="none"
                  value={studentsubAttachment.Status === "Submitted" ? studentsubAttachment?.Attachments[0]?.Download_url : linkValue}
                  disabled={studentsubAttachment.Status === "Submitted"}
                  variant="standard"
                  onChange={(e) => setLinkValue(e.target.value)}
                  fullWidth
                  placeholder={helperText.place_link}
                  sx={{
                      flex: 1,
                      border: "0.0625rem solid rgb(218, 220, 224)",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                />
              )}

              {loading && <CircularProgress />}

              {ComponentType !== "Not Graded" && uploadOption === "file" &&
                !loading &&
                selectedFiles.length > 0 && (
                  <div>
                    {renderTypography("Selected Files:", "13px mb-5px")}
                    <ul>
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="mt-1 mb-1 p-2"
                          style={{
                            border: "0.0625rem solid rgb(218, 220, 224)",
                            borderRadius: "10px",
                          }}
                        >
                          <a
                            href={`data:${file.type};base64,${file.data}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {ComponentType !== "Not Graded" && studentsubAttachment.Status === "Submitted" && (
                <Card
                  sx={{
                    padding: "15px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    fontSize={"18px"}
                    sx={{ color: "black" }}
                    variant="h1"
                  >
                    Your Work
                  </Typography>
                  {ComponentType !== "Not Graded" && studentsubAttachment?.Attachments?.map((attachment, index) => (
                    attachment.FileName ?
                      (<div key={index} className="mt-4 mb-50">
                        <FileIconComponent
                          key={index}
                          fileUrl={attachment.Download_url}
                          FileName={attachment.FileName}
                          iconSize="50px"
                        />
                      </div>) :
                      (
                        <a
                          href={attachment.Download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography variant="body2" className="text-gray">
                            {attachment.Download_url}
                          </Typography>
                        </a>
                      )

                  ))}
                </Card>
              )}

              <div className="mt-2 mb-2">
                {ComponentType !== "Not Graded" && renderTypography(
                  `Status: ${studentsubAttachment.Status ?? "Not Submitted"}`,
                  "0.875rem"
                )}
                <div className="block mt-2">
                  {ComponentType !== "Not Graded" && status === "Submitted" && (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleUnsubmit}
                      sx={Btnsx}
                    >
                      Unsubmit
                    </Button>
                  )}
                  {ComponentType !== "Not Graded" && status !== "Submitted" && (
                    <form
                      action="/uploadmultiple"
                      encType="multipart/form-data"
                      method="POST"
                    >
                      <Box
                        display='flex'
                        justifyContent='center'
                        width='100%'                      >
                        <Button
                          disabled={isSubmissionDisabled()}
                          variant="contained"
                          type="button"
                          onClick={
                            studentsubAttachment.Status !== "Submitted"
                              ? handleSubmission
                              : () =>
                                setAlertModalOpen(true)
                          }
                          sx={{ width: "50%", ...Btnsx }}
                        >
                          {studentsubAttachment.Status !== "Submitted"
                            ? "Turn In"
                            : "Unsubmit"}
                        </Button>
                      </Box>
                      <Box>
                        {studentsubAttachment.EndTime &&
                          SubmissionFormateDate &&
                          isSubmissionDisabled() && studentsubAttachment.Status !== "Submitted" && (
                            <>
                              <Box
                                mt={1}
                                sx={{
                                  background: "#fff",
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                                  borderRadius: "10px",
                                  paddingBottom: "10px",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: "red",
                                    fontSize: "15px",
                                    letterSpacing: ".01428571em",
                                    fontWeight: "400",
                                    lineHeight: "1.25rem",
                                    fontFamily: "Roboto,Arial,sans-serif",
                                    paddingTop: "14px",
                                    textAlign: "center",
                                    // fontWeight:'bold'
                                  }}
                                >
                                  "You have not met your deadline."
                                </Typography>
                                <Typography sx={{ textAlign: "center" }}>
                                  This will have an effect on your aggregate.
                                </Typography>
                              </Box>
                            </>
                          )}
                      </Box>
                    </form>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <AlertModal
            isOpen={alertModalOpen}
            onClose={() => setAlertModalOpen(false)}
            handleClick={() => {
              handleUnsubmit();
              setAlertModalOpen(false);
            }}
            Text="Are you sure you want to unsubmit?"
            ConfirmButtonText="Yes, Unsubmit"
            RejectButtonText="Cancel"
          />
        </Grid>
      )}
    </Grid>
  );
};

const renderTypography = (text, variant, className) => (
  <Typography
    variant={variant}
    sx={{
      letterSpacing: ".01785714em",
      fontFamily: "Google Sans, Roboto, Arial, sans-serif",
      fontSize: "0.875rem",
      fontWeight: "bold",
      lineHeight: "1.25rem",
      color: "#3c4043",
    }}
    className={className}
  >
    {text}
  </Typography>
);
const convertLinks = (text) => {
  const urlPattern = '/((https?:\/\/[^\s]+)/g)';
  return text.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  });
};


const renderDetails = (label, content) => (
  <div className="pt-2 pb-2">
    {renderTypography(label, "13px mb-5px")}
    <Box>
      <Typography
        sx={{
          fontSize: "0.875rem",
          mb: "5px",
          letterSpacing: ".01428571em",
          fontWeight: "400",
          lineHeight: "1.25rem",
          fontFamily: "Roboto,Arial,sans-serif",
        }}
      >
        {content}
      </Typography>
    </Box>
  </div>
);

export default AssignmentInstruction;

