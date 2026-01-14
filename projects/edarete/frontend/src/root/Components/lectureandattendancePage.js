

import React, { useState, useEffect } from "react";
import { Grid, Box, IconButton, ListItem, Typography, Avatar, Menu, MenuItem, List, ListItemAvatar } from "@mui/material";
import { subcomponentheading } from "../Animation/componentSx";
import { useDispatch, useSelector } from "react-redux";
import { GetstudentenrolledincourseAction } from "../Common/Store/Actions/General/GetActions/getstudentenrolledincourseAction.js";
import AddLectureAttendance from "./modals/addlectureAttendance";
import { FormatDate } from "../validation/validtionFunctions";
import { useParams } from "react-router-dom";
import { getAccessToken, getStudentData } from "../Utils/loginData/loginData.jsx";
import { Add } from "@mui/icons-material";
import { GetsubcomponentAction } from "../Common/Store/Actions/General/GetActions/getsubcomponentAction.js";
import CircularProgress from '@mui/material/CircularProgress';
import { DeleteSubComponentAction } from "../Common/Store/Actions/DeleteActions/deleteSubComponentAction.js"

import { 
  Delete,
  Update,
  MoreVert as MoreVertIcon,
  Publish,
} from "@mui/icons-material";
import { UpdatesubcomponentAction } from "../Common/Store/Actions/General/UpdateActions/updatesubcomponentAction.js";
import { toast, ToastContainer } from "react-toastify";
import { formateTime } from "../validation/validtionFunctions";
import UpdateModal from "../Components/modals/UpdateModal";
import { getRoleData } from "../Utils/loginData/loginData.jsx";
import FileIconComponent from "../custom/FileIcon";
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const LectureComponent = ({ classItem, componentID, isPublic, userroleID, ComponentName }) => {

  const [loading, setLoading] = useState(false);

  const [openA, setOpenA] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const roleData = getRoleData(loginData);
  const { RoleId, RoleName, UserroleId } = roleData;
  // check enrollement is  null 
  const studenData = getStudentData(loginData)
  const mapArray = studenData;
  const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
  const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;


  useEffect(() => {
    dispatch(GetstudentenrolledincourseAction(token, id));
    handlegetclassComponent();
  }, [dispatch]);
  const handlegetclassComponent = () => {
    dispatch(isLoadingAction(true));

    dispatch(
      GetsubcomponentAction(
        token,
        componentID,
        isPublic,
        (success) => {
          dispatch(isLoadingAction(false))
        },
        (er) => {
          dispatch(isLoadingAction(false))
        }
      )
    );
  };
  const { getstudentincourseData } = useSelector((state) => state?.GETSTUDENTENROLLEDINCOURSEREDUCER);
  const studentData = getstudentincourseData?.payload || [];
  const { getsubclasscomponentData } = useSelector((state) => state?.GETSUBCOMPONENTREDUCER);
  const rows = getsubclasscomponentData?.payload || [];
  // console.log("rows" ,rows)
  const handleOpenAttendanceMarker = (row) => {
    setSelectedRow(row);
    setOpenA(true);
  };

  const handleCloseAttendanceMarker = () => {
    setSelectedRow(null);
    setOpenA(false);
  };


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event, row) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // delete
  const handledeleteclassComponent = (id, event) => {
    dispatch(DeleteSubComponentAction(token, id, UserroleId, (response) => {
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


  // update 

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState("");
  const [Date, setDate] = useState("");
  const [Num, setNum] = useState(0);
  const [EndTime, setEndTime] = useState("");
  const [TotalMarks, setTotalMarks] = useState("");
  const [Weightage, setWeightage] = useState("");
  const [Text, setText] = useState("");
  const [Status, setStatus] = useState("");
  const handleUpdateClick = (rowData) => {
    console.log(rowData)
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
        UserroleId,
        componentID,
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
  };

  return (
    <>
      {(
        <Grid justifyContent={'center'} mt={1} p={2} spacing={1} container>
          <Grid item xs={12} md={8} lg={6.6} xl={5} >
            <Box className="" >
              {getsubclasscomponentData.map((row) => (
                <div key={row.SubComponentId} >
                  <Box
                    className="mt-1 mb-4 ml-2 mr-2"
                    sx={{
                      borderRadius: "10px",
                      border: "0.0625rem solid rgb(218, 220, 224)",
                    }}
                  >
                    <Box
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        display: 'flex',
                        borderTopRightRadius: "10px",
                        borderTopLeftRadius: "10px",
                        width: "100%",
                        boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)"
                      }}
                    >
                      <List className="flex-grow">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                background: 'rgb(95, 99, 104)',
                              }}
                            >
                              <svg
                                version="1.1"
                                id="Shape_5_2_"
                                x="0px"
                                y="0px"
                                width="24px"
                                height="24px"
                                viewBox="0 0 40 40"
                                enableBackground="new 0 0 40 40"
                                xmlSpace="preserve"
                                fill="white"
                              >
                                <g id="551052147_Shape_5_xA0_Clipping_Path_1_">
                                  <g>
                                    <path d="M39,13.5l-1.5-0.667c0,0-1.581,0.676-3.5,2.139V7.945c1.277-1.421,2.912-2.954,5-4.445l-1.5-0.667    c0,0-1.581,0.676-3.5,2.139V2H6v36h28V27.945c1.277-1.421,2.912-2.954,5-4.445l-1.5-0.667c0,0-1.581,0.676-3.5,2.139v-7.026    C35.277,16.524,36.912,14.991,39,13.5z M32,6.718C31.082,7.636,30.182,8.725,29.416,10c-1-3-2-4-2-4L24,8.25c0,0,2,1.75,4,5.75    c1,0,2,0,2,0s0.536-1.458,2-3.549v6.267c-0.918,0.918-1.818,2.007-2.584,3.282c-1-3-2-4-2-4L24,18.25c0,0,2,1.75,4,5.75    c1,0,2,0,2,0s0.536-1.458,2-3.55v6.268c-0.918,0.918-1.818,2.007-2.584,3.282c-1-3-2-4-2-4L24,28.25c0,0,2,1.75,4,5.75    c1,0,2,0,2,0s0.536-1.458,2-3.55V36H8V4h24V6.718z M24,20H12v2h12V20z M24,10H12v2h12V10z M24,30H12v2h12V30z"></path>
                                  </g>
                                </g>
                              </svg>
                            </Avatar>
                          </ListItemAvatar>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography sx={subcomponentheading}>
                                <span style={{ fontWeight: 'bold' }}>Lecture Number {row.SubComponentNum}</span>
                              </Typography>
                            </div>
                          </div>
                        </ListItem>
                      </List>
                      {enrollmentId === null ? (
                        <Box
                          sx={{ alignItems: "center" ,boxShadow: "none",}}
                        >
                          <IconButton sx={{ color: 'rgb(95, 99, 104)' }} onClick={() => handleOpenAttendanceMarker(row)}>
                            <FingerprintIcon />
                          </IconButton>
                          <IconButton sx={{ color: 'rgb(95, 99, 104)' }} onClick={(event) => handleMenuOpen(event, row)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{boxShadow:"0px"}}
                          >
                            <MenuItem onClick={() => handledeleteclassComponent(selectedRow.SubComponentId)}
                            >
                              <IconButton>
                                <Delete />
                              </IconButton>
                              Delete
                            </MenuItem>

                            <MenuItem onClick={() => handleUpdateClick(selectedRow)} >
                              <IconButton>
                                <Update />
                              </IconButton>
                              Update
                            </MenuItem>
                          </Menu>
                        </Box>
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        paddingTop: "30px",
                        paddingRight: "16px",
                        paddingLeft: "16px",
                      }}
                    >
                      <span
                      >
                        <Box pl={2} pt={2} pb={2} dangerouslySetInnerHTML={{ __html: row.Text }} /> 
                      </span>



                      <List className="flex" sx={{ flexDirection: { xs: "column", md: "row" }, cursor: 'pointer' }}>
                        {rows.attachments?.length > 0 ? (
                          rows.attachments.map((attachment, index) => (
                            <Box
                              key={index}
                              pl={2}
                              pt={1}
                              pb={1}
                              sx={{ overflow: "hidden" }}
                            >

                              <FileIconComponent
                                key={index}
                                fileUrl={attachment.Download_url}
                                FileName={attachment.FileName}
                                iconSize="50px"
                              />
                            </Box>
                          ))
                        ) : (
                          <Typography></Typography>
                        )}
                      </List>


                    </Box>
                  </Box>
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>


      )}

      <AddLectureAttendance
        open={openA}
        close={handleCloseAttendanceMarker}
        data={studentData}
        subComponentId={selectedRow ? selectedRow?.SubComponentId : null}
        selectedrowData={selectedRow}
        ComponentName={ComponentName}
      />
      <UpdateModal
        open={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        title="Update Class Component"
        inputs={[
          { name: "Num", label: "Num", type: "textfield" },
          { name: "Date", label: "Due Date", type: "textfield" },
          { name: "Text", label: "Text " },
        ]}
        initialData={{
          Num: Num,
          Date: Date,
          EndTime: EndTime,
          TotalMarks: TotalMarks,
          Weightage: Weightage,
          Text: Text,
          Status: Status,
        }}

      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
};

export default LectureComponent;
