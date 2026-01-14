import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Card,
  TextField,
  InputAdornment,
  CircularProgress,
  Autocomplete,

} from "@mui/material";
import {
  Delete,
  Update,
  MoreVert as MoreVertIcon,
  Add,
  Publish,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Tooltip from "@mui/material/Tooltip";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetsubcomponentAction } from "../Common/Store/Actions/General/GetActions/getsubcomponentAction";
import AddSubComponent from "./modals/addsubcomponentModal";
import { routesName } from "../routes/adminConstants";
import { FormatDate } from "../validation/validtionFunctions";
import { formateTime } from "../validation/validtionFunctions";
import { Btnsx } from "../Animation/Btnsx";
import { DeleteSubComponentAction } from "../Common/Store/Actions/DeleteActions/deleteSubComponentAction"
import { getStudentData, getAccessToken } from "../Utils/loginData/loginData";
import UpdateModal from "../Components/modals/UpdateModal";
import { UpdatesubcomponentAction } from "../Common/Store/Actions/General/UpdateActions/updatesubcomponentAction";
import { useTheme } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction";
function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  return `${formattedDate}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}
const Assignments = ({
  componentID,
  componentName,
  classItem,
  userroleID,
  roleName,
  TypeName,
  isPublic,
  selectedComponentData,
}) => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const selectedUserRoleId = loginData?.payload?.selectedUserRoleId;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [getSubcCassComponentData, setGetSubClassComponentData] = useState([]);
  const { courseName, id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const studenData = getStudentData(loginData);
  const mapArray = studenData;
  const matchingEnrollment =
    mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
  const enrollmentId = matchingEnrollment
    ? matchingEnrollment.EnrollementId
    : null;

  useEffect(() => {
    handlegetclassComponent();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handlegetclassComponent();
  };

  function handlegetclassComponent() {
    dispatch(isLoadingAction(true));
    dispatch(
      GetsubcomponentAction(
        token,
        componentID,
        isPublic,
        (success) => {
          console.log("success", success);
          setGetSubClassComponentData(success.payload);
          dispatch(isLoadingAction(false))
        },
        (er) => {
          dispatch(isLoadingAction(false))
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

  const handleMenuOpen = (event, row) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  const [selectedRowData, setSelectedRowData] = useState("");
  const [Date, setDate] = useState("");
  const [Num, setNum] = useState("0");
  const [EndTime, setEndTime] = useState("");
  const [TotalMarks, setTotalMarks] = useState("");
  const [Weightage, setWeightage] = useState("");
  const [Text, setText] = useState("");
  const [Status, setStatus] = useState("");
  const handleUpdateClick = (rowData) => {
    setAnchorEl(false)
    setSelectedRowData(rowData);
    setDate(FormatDate(rowData.Date));
    setNum(rowData.SubComponentNum);
    setEndTime(rowData.EndTime);
    setTotalMarks(rowData.TotalMarks);
    setWeightage(rowData.Weightage);
    setText(rowData.Text);
    setStatus(rowData.Status);
    setUpdateModalOpen(true);
  };

  const handleUpdate = (formData) => {
    const {
      Num,
      Date,
      EndTime,
      TotalMarks,
      Weightage,
      Text,
      Status,
    } = formData;
   
    dispatch(
      UpdatesubcomponentAction(
        token,
        selectedRowData.SubComponentId,
        userroleID,
        componentID,
        // selectedRowData.SubComponentNum,
        Num,
        Date,
        formateTime(EndTime),
        TotalMarks,
        Weightage,
        Text,
        Status,
        (response) => {
          toast.success(response.message);
          handlegetclassComponent();
          handleCloseUpdateModal();
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
      )
    );
    // setUpdateModalOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setAnchorEl(null);
   
    handlegetclassComponent();
  };

  const isSubmissionDisabled = (SubmissionFormateDate, EndTime) => {
    try {
     
      // Validate date and time format
      if (!SubmissionFormateDate || !EndTime) {
        console.error('Date or time is missing');
        return false;
      }

      const dateTimeString = `${SubmissionFormateDate} ${EndTime}`;
      const dueDateTime = new Date(dateTimeString);

      // Check for valid date
      if (isNaN(dueDateTime.getTime())) {
        console.error('Invalid date format:', dateTimeString);
        return false;
      }

      const currentDateTime = new Date();
      return currentDateTime > dueDateTime;
    } catch (error) {
      console.error('Error parsing date:', error);
      return false;
    }
  };



  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f1f5f9",
          width: "100%",
          height: "auto",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          className="font-medium title-font mb-4 text-gray-900 pb-2"
        >
          {componentName} Page
        </Typography>
        <Typography
          variant="body1"
          className="leading-relaxed text-base mb-4 pb-2"
        >
          The {componentName} Page allows you to search, view, and create {componentName}.
        </Typography>
      </Box>
      <Grid
        container
        sx={{ minHeight: "73vh", height: "auto", overflow: "auto" }}
      >
        <Grid
          item
          xs={10}
          sm={2}
          md={1}

        >

        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={11}

        >


          <>
            <Box mt={1} p={2} sx={{ display: "flex", justifyContent: "center" }}>
              {enrollmentId === null ? (
                <Button
                  startIcon={<Add />}
                  onClick={handleClickOpen}
                  variant="contained"
                  sx={Btnsx}
                >
                  Create {componentName}
                </Button>
              ) : null}
            </Box>
            <Grid
              container
              justifyContent="start"
              mt={1}
              p={2}
              spacing={1}
              overflow={"hidden"}
            >

              {getSubcCassComponentData.map((row) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={row.SubComponentId}
                >

                  <Card
                    sx={{
                      boxShadow: "10px",
                      borderRadius: "10px",
                      mb: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "20px",
                        background: '#073763'
                      }}
                      className="team-card-dark"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box className="ml-1">
                          <Typography
                            as="h3"
                            sx={{
                              fontSize: 15,
                              fontWeight: 500,
                              color: "#fff",
                            }}
                          >
                            {row.ComponentName} - {row.SubComponentNum}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "inline-block",
                        }}
                      >
                        {enrollmentId == null && <>  <Tooltip title="Remove" placement="top">
                          <IconButton
                            aria-label="remove"
                            size="small"
                            color="danger"
                            className="danger"
                            sx={{
                              background: '#fff',
                              ml: '5px'
                            }}
                            onClick={handledeleteclassComponent}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>

                          <Tooltip title="Rename" placement="top">
                            <IconButton
                              aria-label="rename"
                              size="small"
                              color="primary"
                              className="primary"
                              sx={{
                                background: '#fff',
                                ml: '5px'
                              }}
                              onClick={handleUpdateClick}
                            >
                              <DriveFileRenameOutlineIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                        </>}
                      </Box>
                    </Box>
                    <Box sx={{ p: '20px' }}>
                      <Box mb={2}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                          }}
                        >
                          <Box>
                            <Box>
                              <Typography
                                as="h3"
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  mb: "5px"
                                }}
                              >
                                Total Marks: {row.TotalMarks}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  mb: "5px"
                                }}
                              >
                                Due Date: {FormatDate(row.Date)}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  mb: "5px"
                                }}
                              >
                                Due Time: {formateTime(row.EndTime, true)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>


                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >


                        <Box
                          sx={{
                            ml: 'auto',
                            mt: '10px'
                          }
                          }
                        >
                          <Link
                            to={{
                              pathname: `${routesName.assignmentDetails}/${courseName}/${id}/${row.SubComponentId}`,
                            }}
                            state={row}
                            replace
                          >
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: '#073763', // Match the button color with the card background
                                borderRadius: '4px',
                                textTransform: "capitalize",
                                color: "#fff !important",
                                justifyContent: "right",
                              }}
                            >
                              view details
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Card>

                </Grid>
              ))}
            </Grid>
          </>

        </Grid>

      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => handledeleteclassComponent(selectedRow.SubComponentId)}
        >
          <IconButton>
            <Delete />
          </IconButton>
          Delete
        </MenuItem>
        <MenuItem onClick={() => handleUpdateClick(selectedRow)}>
          <IconButton>
            <Update />
          </IconButton>
          Update
        </MenuItem>
      </Menu>
      <AddSubComponent
        classItem={classItem}
        componentID={componentID}
        handleClose={handleClose}
        open={open}
        componentName={componentName}
        selectedComponentData={selectedComponentData}
        userroleID={userroleID}
      />
      <UpdateModal
        open={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        title="Update Sub Class Component"
        inputs={[
          { name: "Num", label: "Num", type: "number" },
          { name: "Date", label: "Due Date", type: "date" },
          { name: "EndTime", label: "Due Time", type: "time" },
          { name: "TotalMarks", label: "Total Marks ", type: "textfield" },
          { name: "Weightage", label: "Weightage in %", type: "textfield" },
          { name: "Instruction", label: "Instruction ", type: "textarea" },
          { name: "Status", label: "Status", type: "autocomplete" },
        ]}
        initialData={{
          Num: Num,
          Date: Date,
          EndTime: EndTime,
          TotalMarks: TotalMarks,
          Weightage: Weightage,
          Instruction: Text,
          Status: Status,
        }}
        autocompleteOptions={{ Status: ["Active", "Inactive"] }}

      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
};

export default Assignments;
{/* <Card
className="relative mt-6 flex flex-col  "
sx={{
  borderTop:"3px solid rgb(95, 99, 104)",   
  "&:hover": {
    transform: "translateY(-3px)",
  },
}}
>
<div className="p-6">
  <div className="flex justify-between">
    <Box className="flex">
      <span
        style={{ fontSize: "16px", paddingLeft: "3px",color:'black' }}
      >
        {row.ComponentName} - {row.SubComponentNum}
      </span>
    </Box>

    {enrollmentId === null ? (

    <IconButton
      onClick={(event) => handleMenuOpen(event, row)}
      sx={{
        backgroundColor:"rgb(95, 99, 104)",
        "&:hover": {
          backgroundColor: "rgb(95, 99, 100)", // Same background color when hovering
        },
      
      }}
    >
      <MoreVertIcon fontWeight="bold" sx={{color:"white"}}/>
    </IconButton>
     ) : null}

  </div>

  <h5 className=" mb-2 block font-sans font-semibold leading-snug tracking-normal  antialiased mt-3" style={{color:'black'}}>
  {row.User_Name} Posted on {FormatDate(row.Posted_Date)}
  </h5>

  <h6 className="block font-sans font-semibold leading-snug tracking-normal antialiased mt-3" style={{ color: isSubmissionDisabled(row.Date ,row.EndTime) ? 'red' : 'blue' }}>
        Due Date: {FormatDate(row.Date)} {row.EndTime}
    </h6>

  {/* <p className="pr-5 block font-sans leading-relaxed text-inherit antialiased">
    Instruction : {row.Text}
  </p> */}
// </div>
// </Card> 