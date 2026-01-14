import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Contants from "../../Common/Constants"
import { getMaxMinAggregate } from "../../Common/Store/Actions/General/GetActions/getMinMaxAverageAggregate.js";


import axios from "axios";
import {
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  Delete,
  Update,
  MoreVert as MoreVertIcon,      
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetsubcomponentAction } from "../../Common/Store/Actions/General/GetActions/getsubcomponentAction.js";

import AddSubcomponentFirstStepModal from "../modals/addSubcomponentFirstStepModal";
import { routesName } from "../../routes/adminConstants";
import { FormatDate, formatDateTimeYMD, } from "../../validation/validtionFunctions";
import { formateTime, formateTime12Hour, extractTimeIn24HourFormat, FormatDateYMD } from "../../validation/validtionFunctions";
import { DeleteSubComponentAction } from '../../Common/Store/Actions/DeleteActions/deleteSubComponentAction';
import { getStudentData, getAccessToken } from "../../Utils/loginData/loginData.jsx";
import UpdateModal from "../modals/UpdateModal";
import { UpdatesubcomponentAction } from "../../Common/Store/Actions/General/UpdateActions/updatesubcomponentAction.js";
import { useTheme } from "@emotion/react";
import { GetQuestionBySubComponentIdAction } from "../../Common/Store/Actions/General/GetActions/getquestionbySubIDAction.js";
import { UpdateQuestions } from "../../Common/Store/Actions/General/UpdateActions/updateQuestions.js";
import { AddQuestionsAction } from "../../Common/Store/Actions/General/PostActions/addquestionsAction.js";
import { toast, ToastContainer } from "react-toastify";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import quizImage from "../../../assets/images/course-brand1.png"
import AssignmentImage from "../../../assets/images/course-brand2.png"
import MidImage from '../../../assets/images/course-brand3.png';
import FinalImage from '../../../assets/images/course-brand4.png';
  
import announcementIcon from '../../../assets/images/apps-icon.png';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FullScreenOverlay from '../FullScreenOverlay';
import AddIcon from '@mui/icons-material/Add';  

import { BarChart } from '@mui/x-charts/BarChart';

function createData(courseName, postedDate, courseLink, image, result, badgeClass, expirationTime, SubComponentId, FullRow) {
  return {
    courseName,
    postedDate,
    courseLink,
    image,
    result,
    badgeClass,
    expirationTime,
    SubComponentId,
    FullRow,
    Attachments: FullRow.Attachments
  };
}

const EnrolledCourse = ({
  componentID,
  componentName,
  classItem,
  userroleID,
  roleName,
  TypeName,
  isPublic,
  selectedComponentData,
  CourseId,
  components
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const selectedUserRoleId = loginData?.payload?.selectedUserRoleId;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  console.log("loginDatadsgfhsjdgfj", loginData)
  const [getSubcCassComponentData, setGetSubClassComponentData] = useState([]);
  const { courseName, id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subComponentQuestions, setSubComponentQuestions] = useState([]);
  const [componentAggregates, setComponentAggregates] = useState(null)
  const [data, setData] = useState([
    { name: 'Max', value: componentAggregates?.max || 0 },
    { name: 'Min', value: componentAggregates?.min || 0 },
    { name: 'Average', value: componentAggregates?.average || 0 },
    { name: 'My Aggregate', value: componentAggregates?.myAggregate || 0 }
  ])
  const [COLORS, setCOLORS] = useState(['#FF0000', '#00FF00', '#0000FF', '#FFFF00']);



  const studenData = getStudentData(loginData);
  const mapArray = studenData;
  const matchingEnrollment =
    mapArray && mapArray?.find((enrollment) => enrollment.CourseId == CourseId.CourseId);
  const enrollmentId = matchingEnrollment
    ? matchingEnrollment.EnrollementId
    : null;
  const ComponentType = components.find(item => item.ComponentName === componentName)?.ComponentType
  console.log("CourseId:::", CourseId)

  const gradedInputs = [
    { name: "Num", label: "Num", type: "number" },
    { name: "Date", label: "Due Date", type: "date" },
    { name: "EndTime", label: "Due Time", type: "time" },
    { name: "TotalMarks", label: "Total Marks", type: "textfield" },
    { name: "Weightage", label: "Weightage in %", type: "textfield" },
    { name: "Questions", label: "Questions", type: "TeaxtAreaAutoSize" },
  ];
  const baseInputs = [
    { name: "Text", label: "Instruction", type: "quill" },
    { name: "Status", label: "Status", type: "autocomplete" },
    { name: "Attachments", label: "Attachments", type: "file" },
    { name: "StartTime", label: "Start Time ", type: "time" },
    { name: "StartDate", label: "Start Date ", type: "date" }
  ];

  useEffect(() => {
    if (CourseId) { handlegetclassComponent(); }
  }, [CourseId]);

  useEffect(() => {
    if (componentID && enrollmentId) {
      dispatch(isLoadingAction(true));
      dispatch(getMaxMinAggregate(
        "",
        enrollmentId,
        CourseId.CourseId,
        (response) => {
          console.log("response", response)
          setComponentAggregates(response)
          dispatch(isLoadingAction(false));
        },
        (err) => {
          console.log("Error:::", err);
        },
        componentID
      ));
    }
  }, [componentID]);
  useEffect(() => {

    let timer;
    if (loading) {
      setProgress(0);

      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) {
            return oldProgress;
          }
          return Math.min(oldProgress + 1, 90);
        });
      }, 600);
    } else {
      setProgress(100);
      if (timer) {
        clearInterval(timer);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [loading]);
  const handleClose = () => {
    setOpen(false);
    handlegetclassComponent();
  };
  useEffect(() => {
    if (Array.isArray(getSubcCassComponentData.return)) {
      const highestSubComponentNum = Math.max(...getSubcCassComponentData.return.map(item => item.SubComponentNum));
      setNum(highestSubComponentNum + 1);
    }
  }, [getSubcCassComponentData])
  function handlegetclassComponent() {
    console.log("Fetching class component data...");
    dispatch(
      GetsubcomponentAction(
        componentID,
        (response) => {
          console.log("success of API ", response);
          setGetSubClassComponentData(response);
        },
        (er) => {
          console.log(" ", er);
        }
      )
    );
  }; 

  const handledeleteclassComponent = (id, event) => {
    setAnchorEl(false);
    dispatch(DeleteSubComponentAction(token, id, selectedUserRoleId, (response) => {
      toast.success(response.message);
      handlegetclassComponent();

    },
      (error) => {

        if (error?.message?.status != 500) {
          if (error?.message?.payload != "") {
            const payloadKeys = Object.keys(error?.message?.payload);
            if (payloadKeys.length > 0) {
              console.log("myError", error?.message);
              toast.error(error?.message?.payload[payloadKeys[0]]);
            }
          }
          else {
            toast.error(error?.message?.message);
          }
        }
        else {
          toast.error("Server Error " + error?.message?.status);
        }
      }
    ));
  };
  function updateQuestion(Questions) {
    console.log("Questions", Questions)
    if (Questions.length > 0) {
      Questions.forEach((question) => {
        if (question.clo !== null) {
          if (question.QuestionId) {
            dispatch(
              UpdateQuestions(
                token,
                question.QuestionId,
                question.number ? question.number : "0",
                question.clo.CLOId,
                question.text,
                (response) => {
                  console.log("response", response)
                },
                (error) => {
                  toast.error(error.message);
                }
              )
            );
          }
          else {
            dispatch(
              AddQuestionsAction(
                "",
                question.number ? question.number : "0",
                selectedRowData.SubComponentId,
                question.CLOId,
                question.text,
                (response) => {
                  console.log("response", response)
                },
                (error) => {
                  toast.error(error.message);
                }
              )
            );
          }
        }
        getSubComponentQuestions();

      });
    }
  }

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  const [selectedRowData, setSelectedRowData] = useState("");
  const [Date, setDate] = useState("");
  const [Num, setNum] = useState("0");
  const [EndTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("")
  const [startDate, setStartDate] = useState("")
  const [TotalMarks, setTotalMarks] = useState("");
  const [Weightage, setWeightage] = useState("");
  const [Text, setText] = useState("");
  const [Status, setStatus] = useState("");
  const [attachments, setAttachments] = useState([]);
  const handleUpdateClick = (rowData) => {
    setSelectedRowData(rowData.FullRow);
    setDate(FormatDate(rowData.FullRow.Date));
    setNum(rowData.FullRow.SubComponentNum);
    setEndTime(rowData.FullRow.EndTime);
    setTotalMarks(rowData.FullRow.TotalMarks);
    setWeightage(rowData.FullRow.Weightage);
    setText(rowData.FullRow.Text);
    setStatus(rowData.FullRow.Status);
    setAttachments(rowData.FullRow.attachments)
    setStartTime(extractTimeIn24HourFormat(rowData.FullRow.StartTime))
    setStartDate(formatDateTimeYMD(rowData.FullRow.StartTime))
    setUpdateModalOpen(true);
    console.log("State.FullRow::", rowData.FullRow)
  };



  const handleattachment = (SubId, Attachments) => {
    console.log("Attachments", Attachments)

    if (Attachments.length > 0) {
      const formData = new FormData();
      Attachments.forEach((file, index) => {
        formData.append(`attachments`, file);
      });

      formData.append("SubComponentId", SubId);
      formData.append("UserRoleId", userroleID);
      axios
        .post(Contants.api_base_url + "/api/attachments", formData, {
          headers: {
            "Content-Type": "multipart/form-data; boundary=" + formData._boundary,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("MyResposne", response)
          toast.success(response?.data?.message);
          setLoading(false)
          handleCloseUpdateModal()

        })
        .catch((error) => {
          console.log("myError", error)
          handledeleteclassComponent(SubId)
          if (error?.message?.status != 500) {
            if (error?.message?.payload != "") {
              toast.error(error?.message?.message);
            }
          } else {
            toast.error("Server Error " + error?.message?.status);
          }
        });
    }
  };
  const handleUpdate = (formData) => {
    setLoading(true)
    console.log("formData", formData);
    const {
      Num,
      Date,
      EndTime,
      TotalMarks,
      Weightage,
      Text,
      Status,
      Attachments,
      Questions,
      StartTime,
      StartDate,
      NotifyUsers
    } = formData;

    dispatch(
      UpdatesubcomponentAction(
        token,
        selectedRowData.SubComponentId,
        userroleID,
        componentID,
        // selectedRowData.SubComponentNum,
        Num,
        formatDateTimeYMD(Date),
        formateTime(EndTime),
        TotalMarks,
        Weightage,
        Text,
        Status,
        StartTime,
        StartDate,
        NotifyUsers ? "1" : "0",
        (response) => {
          handlegetclassComponent();
          if (Attachments.length > 0) { handleattachment(selectedRowData.SubComponentId, Attachments) }
          else {
            setLoading(false)
            toast.success(response.message);
            handleCloseUpdateModal()
          }
          updateQuestion(Questions)

        },
        (error) => {
          setLoading(false)
          toast.error(error?.message?.message);

        }

      )
    );
  };
  function getSubComponentQuestions() {
    dispatch(
      GetQuestionBySubComponentIdAction(
        token,
        selectedRowData.SubComponentId,
        (success) => {
          console.log("success", success);
          setSubComponentQuestions(success.payload);
        },
        (er) => {
          console.log("error", er);
        }
      )
    );
  }

  useEffect(() => {
    if (selectedRowData.SubComponentId) {
      getSubComponentQuestions();
    }
  }, [selectedRowData.SubComponentId])

  function getComponentImage(Name) {
    switch (Name) {
      case "Quiz":
        return quizImage

      case "Assignment":
        return AssignmentImage
      case "Mid":
        return MidImage
      case "Final":
        return FinalImage
      case "Project":
        return quizImage
      case "Announcement":
        return announcementIcon
      case "Lab":
        return AssignmentImage
      default:
        return AssignmentImage
    }
  }
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setAnchorEl(null);
    console.log("close");
    handlegetclassComponent();
  };
  console.log('getSubcCassComponentData::', getSubcCassComponentData.return);
  const groupedData = Array.isArray(getSubcCassComponentData.return) ? getSubcCassComponentData.return.reduce((acc, item) => {
    if (!acc[item.subcomponents_subComponentId]) {
      acc[item.subcomponents_subComponentId] = {
        SubComponentId: item.subcomponents_componentId,
        SubComponentNum: item.classcomponent_componentName,
        Text: item.subcomponents_text,
        UserRoleId: item.subcomponents_createdBy,
        TotalMarks: item.subcomponents_totalMarks,
        Weightage: item.subcomponents_weightage,
        User_Name: item.subcomponents_createdBy,
        ComponentName: item.subcomponents_subComponentNum,
        ComponentType: item.classcomponent_componentName,
        StartTime: item.subcomponents_startTime,
        Posted_Date: item.subcomponents_createdAt,
        EndTime: item.subcomponents_endTime,
        Date: item.subcomponents_date,
        Status: item.subcomponents_status,
        attachments: [],
      };
    }
    acc[item.SubComponentId]?.attachments?.push({
      FileName: item.FileName,
      FileType: item.FileType,
      FileSize: item.FileSize,
      Download_url: item.Download_url
    });
    return acc;
  }, {}) : {};
   console.log('groupedData::', groupedData);
  const rows = Object?.values(groupedData).map(item => {
    const courseName = item.ComponentName + " " + item.SubComponentNum;
    const courseLink = `${routesName.assignmentDetails}/${courseName}/${componentID}/${item.SubComponentId}`;
    const postedDate = FormatDate(item.StartTime) + " " + extractTimeIn24HourFormat(item.StartTime);
    const image = getComponentImage(item.ComponentName);
    const result = parseInt(item.TotalMarks);
    const badgeClass = "primaryBadge";
    const expirationTime = FormatDate(item.Date) + " " + formateTime12Hour(item.EndTime);
    const SubComponentId = item.SubComponentId;
    const FullRow = item;
    const attachments = item.Attachments

    return createData(courseName, postedDate, courseLink, image, result, badgeClass, expirationTime, SubComponentId, FullRow, courseLink);
  });
  const categories = ['Max', 'Min', 'Average', 'My Aggregate'];




  return (
    <>
      <Grid container justifyContent="flex-end" >
        {enrollmentId && componentAggregates && (
          <Grid item>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Max', 'Min', 'Average', 'My Aggregate'] }]}
              series={[{ data: [componentAggregates.max, componentAggregates.min, componentAggregates.average, componentAggregates.myAggregate] }]}
              width={400}
              height={200}
            />

          </Grid>
        )}
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
        }}
      >
        <Grid container justifyContent="flex-end">
          {roleName === "Teacher" && (
            <Grid item>
              <IconButton sx={{ width: 50, height: 50 }} onClick={() => setOpen(true)}>
                <AddIcon style={{ color: 'blue', fontSize: '30px' }} />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="custom pagination table"
          className="dark-table"
        >

          <TableHead sx={{ background: "#F7FAFF" }}>
            <TableRow>
              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Subcomponents
              </TableCell>

              {componentName !== "Announcement" && (<TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Total Marks
              </TableCell>)
              }
              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Posted Date
              </TableCell>
              {ComponentType == "Graded" && (<TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Due Date
              </TableCell>)}
              <TableCell
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

           <TableBody>
            {(
              rows
            ).map((row) => (
              <TableRow key={row.courseName}>
                <TableCell
                  style={{
                    width: 250,
                    borderBottom: "1px solid #F7FAFF",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={row.image}
                      alt="Product Img"
                      width={65}
                      className="borderRadius10"
                    />
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "13.5px",
                      }}
                      className="ml-30px"
                    >
                      <Link
                        to={{
                          pathname: `${routesName.assignmentDetails}/${courseName}/${componentID}/${row.SubComponentId}`,
                        }}
                        state={{ row: row.FullRow, CourseId: CourseId }}
                        replace
                      >
                        {row.courseName}
                      </Link>
                    </Typography>
                  </Box>
                </TableCell>

                {componentName !== "Announcement" && (<TableCell
                  align="center"
                  style={{
                    fontWeight: 500,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "12px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  <span className={row.badgeClass}>{row.result}</span>
                </TableCell>)}

                <TableCell
                  style={{
                    width: 220,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  {row.postedDate}
                </TableCell>
                {ComponentType == "Graded" && (<TableCell
                  style={{
                    width: 220,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  {row.expirationTime}
                </TableCell>)}
                <TableCell
                  style={{
                    width: 220,
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                  }}
                >
                  <Link
                    to={{
                      pathname: `${routesName.assignmentDetails}/${courseName}/${componentID}/${row.SubComponentId}`,
                    }}
                    state={{ row: row.FullRow, CourseId: CourseId }}
                    replace
                  >

                    {row.FullRow.Status == "Active" && (
                      <IconButton>
                        <VisibilityOutlinedIcon style={{ color: 'green' }} />
                      </IconButton>)}



                  </Link>
                  {roleName !== "Student" && (
                    <>
                    <IconButton>
                    <Update onClick={() => handleUpdateClick(row)} style={{ color: 'orange' }} />
                  </IconButton>
                  <IconButton onClick={() => handledeleteclassComponent(row.SubComponentId)}>
                    <Delete style={{ color: 'red' }} />
                  </IconButton>
                  </>
                  )}

                </TableCell>
              </TableRow>
            ))}
          </TableBody> 
        </Table>

        <AddSubcomponentFirstStepModal
          classItem={classItem}
          componentID={componentID}
          handleClose={handleClose}
          open={open}

          componentName={componentName}
          selectedComponentData={selectedComponentData}
          userroleID={userroleID}
          Num={Num}
          handleSetLoading={(val) => setLoading(val)}
          ComponentType={ComponentType}
          handlegetclassComponent={handlegetclassComponent}

        />

        <UpdateModal
          open={updateModalOpen}
          handleClose={handleCloseUpdateModal}
          handleUpdate={handleUpdate}
          title="Update Sub Class Component"
          inputs={ComponentType == 'Graded' ? [...baseInputs, ...gradedInputs] : baseInputs}
          initialData={{
            Num: Num,
            Date: FormatDateYMD(Date),
            EndTime: EndTime,
            TotalMarks: TotalMarks,
            Weightage: Weightage,
            Text: Text,
            Status: Status,
            Attachments: attachments,
            Questions: subComponentQuestions,
            StartDate: startDate,
            StartTime: startTime,

          }}
          autocompleteOptions={{ Status: ["Active", "Inactive", "Draft"] }}
          isLoading={loading}

        />

        <FullScreenOverlay isLoading={loading} progress={progress} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      </TableContainer>
    </>
  );
}

export default EnrolledCourse