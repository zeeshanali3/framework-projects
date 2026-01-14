
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
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetsubcomponentAction } from "../Common/Store/Actions/General/GetActions/getsubcomponentAction";
import AddSubComponent from "./modals/addsubcomponentModal.js";
import { routesName } from "../routes/adminConstants";
import { FormatDate } from "../validation/validtionFunctions";        
import { formateTime } from "../validation/validtionFunctions";
import { Btnsx } from "../Animation/Btnsx";
import {DeleteSubComponentAction} from "../Common/Store/Actions/DeleteActions/deleteSubComponentAction"
import { getStudentData, getAccessToken } from "../Utils/loginData/loginData";
import UpdateModal from "../Components/modals/UpdateModal";
import { UpdatesubcomponentAction } from '../Common/Store/Actions/General/UpdateActions/updatesubcomponentAction';
import { useTheme } from "@emotion/react";
import { toast ,ToastContainer } from "react-toastify";
import { isLoadingAction } from '../Common/Store/Actions/General/PostActions/isLoadingAction';
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
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
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const selectedUserRoleId = loginData?.payload?.selectedUserRoleId;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { getsubclasscomponentData } = useSelector(
    (state) => state?.GETSUBCOMPONENTREDUCER
  );
  const { courseName, id } = useParams();
  const rows = getsubclasscomponentData?.payload || [];
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const studenData = getStudentData(loginData);
  const mapArray = studenData;
  const matchingEnrollment =
    mapArray && mapArray?.find((enrollment) => enrollment.CourseId == id);
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
  };

  const handlegetclassComponent = () => {
    dispatch(isLoadingAction(true));
    dispatch(
      GetsubcomponentAction(
        token,
        componentID,
        isPublic,
        (success) => {
         dispatch(isLoadingAction(false));
          // console.log("success", success);
        },
        (er) => {
          // console.log("failed", er);
         dispatch(isLoadingAction(false));;
        }
      )
    );
  };

  const handledeleteclassComponent = (id, event) => {
    dispatch(DeleteSubComponentAction(token, id,selectedUserRoleId,  (response)=>{  
      toast.success( response.message);
      handlegetclassComponent();

    },
    (error) => {
    
      if(error?.message?.status!=500)
        {
          if (error?.message?.payload != "") {
            const payloadKeys = Object.keys(error?.message?.payload);
            if (payloadKeys.length > 0) {
              console.log("myError", error?.message);
              toast.error(error?.message?.payload[payloadKeys[0]]);
            }
          }
          else
          {
            toast.error(error?.message?.message);
          }
        }
      else{
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

  // update modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState("");
  const [Date, setDate] = useState("");
  const [Num, setNum] = useState("0");
  const [EndTime, setEndTime] = useState("");
  const [TotalMarks, setTotalMarks] = useState("");
  const [Weightage, setWeightage] = useState("");
  const [Text, setText] = useState("");
  const [Status, setStatus] = useState("");
  const handleUpdateClick = (rowData) => {
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
        (response)=>{  
          toast.success( response.message);
          handlegetclassComponent();
          handleCloseUpdateModal();
        },
        (error) => {
        
          if(error?.message?.status!=500)
            {
              if (error?.message?.payload != "") {
                const payloadKeys = Object.keys(error?.message?.payload);
                if (payloadKeys.length > 0) {
                  console.log("myError", error?.message);
                  toast.error(error?.message?.payload[payloadKeys[0]]);
                }
              }
              else
              {
                toast.error(error?.message?.message);
              }
            }
          else{
            toast.error("Server Error " + error?.message?.status);
          }
        }
      )
    );
    // setUpdateModalOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const isSubmissionDisabled = (SubmissionFormateDate, EndTime) => {
    try {
      const currentDateTime = new Date();
      const dueDateTime = new Date(`${SubmissionFormateDate} ${EndTime}`);
      
      if (isNaN(dueDateTime.getTime())) {
        console.error('Invalid date format:', SubmissionFormateDate, EndTime);
        return false;
      }
  
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
       </Typography>
        
      </Box>
      <Grid
        container
        sx={{ minHeight: "73vh", height: "auto", overflow: "auto" }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
        >
         
        
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={10}
            
        >
          { (

            <>
            <Box mt={1} p={2} sx={{display:"flex"  ,justifyContent:"center"}}>
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
           
              {getsubclasscomponentData.map((row) => (
                
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
                                sx={{
                                  fontSize: 13,
                                  mb: "5px"
                                }}
                              >
                                {(row.Text.replace(/<[^>]+>/g, '').substring(0, 150) + '...').slice(0, 153)}
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
          )}
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
          { name: "Num",label: "Num", type: "number",type: "textfield"  },
          { name: "Date",label: "Due Date", type: "date",type: "textfield"  },
          { name: "EndTime", label: "Due Time", type: "time",type: "textfield"  },
          { name: "TotalMarks", label: "Total Marks ", type: "textfield" },
          { name: "Weightage", label: "Weightage in %", type : "textfield"},
          { name: "Text", label: "Text ", type: "textarea" },
          { name: "Status", label: "Status" , type : "autocomplete"},
        ]}
        initialData={{
          Num:Num,
          Date: Date,
          EndTime: EndTime,
          TotalMarks: TotalMarks,
          Weightage: Weightage,
          Text: Text,
          Status: Status,
        }}
        autocompleteOptions ={{Status: ["Active" , "Inactive"]}}
        
      />

          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
};

export default Assignments;

