import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Modal,

  Avatar,

} from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddclassComponent from "./modals/addclasscomponentModal";
import { DeleteclasscomponentAction } from "../Common/Store/Actions/DeleteActions/deleteclasscomponentAction";
import { UpdateclasscomponentAction } from "../Common/Store/Actions/General/UpdateActions/updateclasscomponentAction.js";
import { getStudentData, getAccessToken } from "../Utils/loginData/loginData.jsx";
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import DeleteModal from "./modals/deleteModal";
import UpdateModal from "./modals/UpdateModal";
import { useParams } from "react-router-dom";
import { AddLeaderboardAction } from "../Common/Store/Actions/General/PostActions/addLeaderboardAction.js";
import { GetSubComponentByCourse } from "../Common/Store/Actions/General/GetActions/getSubcomponentByCourse.js";
import { GetLeaderBoardAction } from "../Common/Store/Actions/General/GetActions/getLeaderBoardAction.js";
import { GetclasscomponentAction } from "../Common/Store/Actions/General/GetActions/getclasscomponentAction.js";
import { GetStudentByCourseAction } from "../Common/Store/Actions/General/GetActions/getstudentbycourseAction.js";
import { UpdateCourseLeaderboard } from "../Common/Store/Actions/General/UpdateActions/updateCourseLeaderboard.js";
import { toast, ToastContainer } from "react-toastify";
import { UpdateEnrollementsAction } from "../Common/Store/Actions/General/UpdateActions/updateEnrollment.js";
import CloGraph from "./CloGraph/CloGraph";
import ClassComponentCreationGuidelines from "./GuidelinesClassComponentCreation";
import AddModal from "./modals/addModal";
import Leaderboard from "./Leaderboard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


const datagrid = {
  margin: "30px",
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
    fontSize: "14px",
    color: 'black'
  },
  "& .name-column--cell": {},
  "& .MuiDataGrid-columnHeaders": {
    background: "#e5e7eb",
    borderBottom: "none",
    lineHeight: "20px",
    fontWeight: 400,
    fontSize: "15px",
    color: "#000",
  },
  "& .MuiDataGrid-virtualScroller": {},
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },
  "& .MuiCheckbox-root": {
    //  border: "none",
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: "black",
  },
}
function DefaultPage({ classItem, roleName, isPublic, loading, id }) {
  const publicStatus = isPublic ?? false;
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const [isLoading, setIsLoading] = useState(true);
  const [openAdd, setopenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const studenData = getStudentData(loginData);
  const [leaderboardName, setLeaderboardName] = useState("");
  const [leaderBoardSuComponents, setLeaderBoardSubComponents] = useState([]);
  const { courseName } = useParams();
  const [openLeaderBoardModal, setopenLeaderBoardModal] = useState(false);
  const mapArray = studenData;
  const [subComponents, setSubComponents] = useState([]);
  const [getstudentcoursedata, setgetstudentcoursedata] = useState([]);
  const [getLeaderboard, setLeaderboard] = useState([]);
  const [updateCourseLeaderboard, setUpdateCourseLeaderboard] = useState(false);
  const [openLeaderboard, setOpenLeaderboard] = useState(false);
  const [openUpdateLeaderBoard, setOpenUpdateLeaderBoard] = useState(false);
  const [selectedLeaderboardForUpdate, setSelectedLeaderboardForUpdate] = useState([]);
  const [selctedLeaderboard, setSelctedLeaderboard] = useState([]);
  const [studentGroupName, setStudentGroupName] = useState('');
  const [updateStudentGroupName, setUpdateStudentGroupName] = useState('');
 console.log("studentGroupName::",studentGroupName)
  const fetchLeaderboardData = async () => {
    // dispatch(isLoadingAction(true));
    dispatch(GetLeaderBoardAction(
      id,
      "1",
      (response) => {
        setLeaderboard(response?.payload || []);
        dispatch(isLoadingAction(false));
      },
      (error) => {
        dispatch(isLoadingAction(false));
        console.log("error attc", error);
      }
    )
    )
  };
  useEffect(() => {

    const fetchData = async () => {
      // dispatch(isLoadingAction(true));
      dispatch(GetStudentByCourseAction(
        token,
        id,
        (response) => {
          setgetstudentcoursedata(response);
          dispatch(isLoadingAction(false));
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error attc", error);
        }
      ));
    };
    const fetchSubComponentData = async () => {
      // dispatch(isLoadingAction(true));
      dispatch(GetSubComponentByCourse(
        token,
        id,
        (response) => {
          setSubComponents(response?.payload || []);
          dispatch(isLoadingAction(false));
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error attc", error);
        }
      ));
    };
    fetchLeaderboardData();
    fetchSubComponentData();
    fetchData();
  }, []);
  const matchingEnrollment =
    mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
  const enrollmentId = matchingEnrollment
    ? matchingEnrollment.EnrollementId
    : null;


  const handleOpenAdd = () => setopenAdd(true);
  const handleCloseAdd = () => setopenAdd(false);
  const handleOpenDelete = (rowData) => {
    setSelectedRowData(rowData);
    setOpenDelete(true);
  };
  function handleOpenLeaderboardDelete(rowData) {
    setUpdateCourseLeaderboard(true);
  }
  const handleCloseDelete = () => {
    setSelectedRowData(null);
    setOpenDelete(false);
  };
  const [getclasscomponentData, setClassComponentData] = useState();
  useEffect(() => {
    // dispatch(isLoadingAction(true));
    dispatch(
      GetclasscomponentAction(
        token,
        id,
        publicStatus,
        (response) => {
          setClassComponentData(response?.payload || []);
          dispatch(isLoadingAction(false));
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error attc", error);
        }
      )
    );
  }, [updateModalOpen, openAdd, openDelete]);
  const componentData = getclasscomponentData || [];

  const handleDeleteClassComp = (id) => {
    // dispatch(isLoadingAction(true));
    dispatch(DeleteclasscomponentAction(token, id,
      (res) => {
        dispatch(isLoadingAction(false));
        toast.success(res?.message);
      },
      (error) => {
        dispatch(isLoadingAction(false));
        console.log(error?.message)
        if (error?.message.includes("Already exist")) {
          toast.error(error.message);
        }
        else {

          const payloadValues = error.status != 500 ? Object.values(error.payload) : " Server Error " + error?.status;
          const extractedError = (payloadValues?.length > 0 && error?.status != 500) ? payloadValues[0] : payloadValues;
          // console.log("MyError",extractedError);
          toast.error(extractedError);
        }
      }
    ));
  };

  const [ComponentType, setComponentType] = useState("");
  const [ComponentName, setComponentName] = useState("");
  const [Weightage, setWeightage] = useState("");
  const [ComponentPolicy, setComponentPolicy] = useState("");
  const [Status, setStatus] = useState("");

  const handleUpdateClick = (rowData) => {
    setSelectedRowData(rowData);
    setComponentType(rowData.ComponentType);
    setComponentName(rowData.ComponentName);
    setWeightage(rowData.Weightage);
    setComponentPolicy(rowData.ComponentPolicy);
    setStatus(rowData.Status);
    setUpdateModalOpen(true);
  };

  const handleUpdate = (formData) => {
    // dispatch(isLoadingAction(true));
    const { ComponentType, ComponentPolicy, ComponentName, Weightage, Status } =
      formData;
    dispatch(
      UpdateclasscomponentAction(
        token,
        selectedRowData.ComponentID,
        id,
        ComponentType,
        ComponentName,
        Weightage,
        ComponentPolicy,
        Status,
        (response) => {

          toast.success(response.message);
          setUpdateModalOpen(false);
          dispatch(isLoadingAction(false));

        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("Not Assignment Created", error)

          if (error?.message?.status != 500) {
            if (error?.message?.payload != "") {
              const payloadKeys = Object.keys(error?.message?.payload);
              if (payloadKeys.length > 0) {
                console.log("myError", error?.message);
                toast.error(error?.message?.payload[payloadKeys[0]]);
              }
            } else {
              toast.error(error?.message?.message);
            }
          } else {
            toast.error("Server Error " + error?.message?.status);
          }
        }
      )
    );
  };
  const handleUpdateLeaderboard = (formData) => {
    const { Leaderboard, LeaderboardComponents, Status, Positions } = formData;
    const percentages = Object.keys(formData)
      .filter((key) => key.startsWith('Percentage_'))
      .reduce((acc, key) => {
        const componentId = key.replace('Percentage_', '');
        if (LeaderboardComponents.includes(parseInt(componentId))) {
          acc[componentId] = formData[key];
        }
        return acc;
      }, {});
    console.log("courseLeaderboard", formData);

    dispatch(UpdateCourseLeaderboard(selectedLeaderboardForUpdate.CourseLeaderboardId, Leaderboard, percentages, Positions, Status, (response) => { toast.success(response.message); fetchLeaderboardData() }, (error) => { toast.error(error.message) }));
  }
  const handleCloseUpdateModal = () => setUpdateModalOpen(false);
  function handleAddLeaderboard(formData) {
    const { Leaderboard, LeaderboardComponents, Status, Positions } = formData;
    const percentages = Object.keys(formData)
      .filter((key) => key.startsWith('Percentage_'))
      .reduce((acc, key) => {
        const componentId = key.replace('Percentage_', '');
        if (LeaderboardComponents.includes(parseInt(componentId))) {
          acc[componentId] = formData[key];
        }
        return acc;
      }, {});
    dispatch(AddLeaderboardAction(id, Leaderboard, LeaderboardComponents, Status, percentages, Positions,
      (response) => {
        toast.success(response.message);
        setopenLeaderBoardModal(false);
        dispatch(isLoadingAction(false));
      },
      (error) => {
        dispatch(isLoadingAction(false));
        console.log("Not Assignment Created", error)

        if (error?.message?.status != 500) {
          if (error?.message?.payload != "") {
            const payloadKeys = Object.keys(error?.message?.payload);
            if (payloadKeys.length > 0) {
              console.log("myError", error?.message);
              toast.error(error?.message?.payload[payloadKeys[0]]);
            }
          } else {
            toast.error(error?.message?.message);
          }
        } else {
          toast.error("Server Error " + error?.message?.status);
        }
      }
    ));

  }
  function UpdateStudentGroupName(formData) {

    dispatch(isLoadingAction(true));
    dispatch(UpdateEnrollementsAction(studentGroupName.EnrollementId, formData.GroupName,
      (response) => {
        dispatch(GetStudentByCourseAction(
          token,
          id,
          (response) => {
            setgetstudentcoursedata(response);
            dispatch(isLoadingAction(false));
          },
          (error) => {
            dispatch(isLoadingAction(false));
            console.log("error attc", error);
          }
        ));
        dispatch(isLoadingAction(false));
        toast.success(response.message);
        setUpdateStudentGroupName(false);
      }, (error) => {
        dispatch(isLoadingAction(false));
        toast.error(error.message);
      }))
  }
  const GradingColumns = [
    {
      field: "ComponentName",
      headerName: "Component Name",
      flex: 1,
      minWidth: 180,

    },
    // {
    //   field: "ComponentPolicy",
    //   headerName: "Component Policy",
    //   flex: 1,
    //   minWidth: 180,
    // },
    {
      field: "ComponentType",
      headerName: "Component Type",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "Weightage",
      headerName: "Weightage",
      flex: 1,
      minWidth: 180,
    },
    ...(enrollmentId === null
      ? [
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          minWidth: 150,
          renderCell: (params) => (
            <>
              <IconButton onClick={() => handleUpdateClick(params.row)}>
                <Update sx={{ color: "orange", fontSize: "18px" }} />
              </IconButton>
              <IconButton onClick={() => handleOpenDelete(params.row)}>
                <Delete sx={{ color: "red", fontSize: "18px" }} />
              </IconButton>

            </>
          ),
        },
      ]
      : []),
  ];

  const leaderboardColoumns = [
    {
      field: "LeaderboardName",
      headerName: "Leaderboard",
      flex: 1,
      minWidth: 180,
    },
    ...(enrollmentId === null
      ? [
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          minWidth: 150,
          renderCell: (params) => (
            <>
              <IconButton onClick={() => { setOpenLeaderboard(true); setSelctedLeaderboard(params.row) }}>
                <VisibilityOutlinedIcon style={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={() => {
                setSelectedLeaderboardForUpdate(params.row);
                setOpenUpdateLeaderBoard(true);
              }}>
                <Update sx={{ color: "orange", fontSize: "18px" }} />
              </IconButton>

            </>
          ),
        },
      ]
      : []),
  ];
  function handleOpenLeaderBoardModal() {
    setopenLeaderBoardModal(true);
  } function handleCloseLeaderBoardModal() {
    fetchLeaderboardData()
    setopenLeaderBoardModal(false);
  }

  const [openguidelineModal, setopenguidelineModal] = useState(false);

  const handleOpenGuidelinesModal = () => {
    setopenguidelineModal(true);
  };
  function handleCloseStudentGroupNameModal() {
    setStudentGroupName(null);
    setUpdateStudentGroupName(false)
  }

  const handleCloseGuidelineseModal = () => {
    setopenguidelineModal(false);
  };
  const firstLetter = courseName ? courseName.charAt(0).toUpperCase() : "";

  const studentcolumns = [

    {
      field: "StudentName",
      headerName: "Student Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Avatar sx={{ marginRight: 1, height: "26px", width: "26px", background: '#388e3c' }} >
            {params.row.StudentName ? params.row.StudentName.charAt(0).toUpperCase() : ''}
          </Avatar>
          <Typography variant="body1">
            {params.row.StudentName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "RegNum",
      headerName: "Registration Number",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "studentEmail",
      headerName: "Email ",
      flex: 1,
      minWidth: 180,

    },
    {
      field: "GroupName",
      headerName: "Group Name ",
      flex: 1,
      minWidth: 180,

    },
    ...(enrollmentId === null
      ? [
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          minWidth: 150,
          renderCell: (params) => (
            <>

              <IconButton onClick={() => {
                console.log("params", params.row);
                setStudentGroupName({ GroupName: params?.row?.GroupName, EnrollementId: params?.row?.EnrollementId });
                setUpdateStudentGroupName(true);
              }}>
                <Update sx={{ color: "orange", fontSize: "18px" }} />
              </IconButton>

            </>
          ),
        },
      ]
      : []),

  ];
  const LeaderboardInputFields = [
    { name: 'Leaderboard', label: 'Leaderboard Name', type: 'textfield', defaultValue: 'Leaderboard' },
    {
      name: 'LeaderboardComponents', label: 'Leaderboard Components', type: 'multiSelect', options: subComponents.map(subComponent => ({
        value: subComponent.SubComponentId,
        label: subComponent.ComponentName + " " + subComponent.SubComponentNum
      }))

    },
    { name: "Status", label: "Status", type: "Select", options: [{ label: "Active", value: "Active" }, { label: "Draft", value: "Draft" }, { label: "Inactive", value: "Inactive" }] },
    { name: "Positions", label: "Number of Positions", type: "number", min: 0 }
  ];
  const StudentGroupNameFields = [
    { name: 'GroupName', label: 'Group Name', type: 'textfield', defaultValue: studentGroupName?.GroupName || '' },
  ];
  const studentrows = getstudentcoursedata?.payload || [];
  return (
    <>
      <div
        className="flex flex-wrap"
      >
        <Leaderboard open={openLeaderboard} handleClose={() => setOpenLeaderboard(false)} leaderboard={selctedLeaderboard} />
        {console.log("LeadeselectedLeaderboardForUpdaterboard", selectedLeaderboardForUpdate)}
        <AddModal open={openUpdateLeaderBoard} handleClose={() => setOpenUpdateLeaderBoard(false)} fields={LeaderboardInputFields} handleOnAddButton={handleUpdateLeaderboard} title={"Leaderboard"} selectedLeaderboardForUpdate={selectedLeaderboardForUpdate} ButtonTitle={"UPDATE"} />
        <div className="flex flex-wrap -m-4" style={{ width: "100%" }}>
          <div className="p-4  md:w-full">
            <div className="flex rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
              <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="4" />
                  <text
                    x="13"
                    y="19"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="22"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                  >
                    {firstLetter}
                  </text>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  {courseName}
                </h2>
                <p className="leading-relaxed text-base text-black">
                  Welcome to {courseName}. Here, you can create a class
                  component and its subcomponents. Click the "Guidelines"
                  button to understand how to proceed.
                </p>
                {enrollmentId === null ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <Button
                        onClick={handleOpenAdd}
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        ADD CLASS COMPONENT
                      </Button>
                      <Button
                        onClick={handleOpenGuidelinesModal}
                        sx={{
                          background: "#ffb74d",
                          fontWeight: "bold",
                          color: "white",
                          "&:hover": {
                            background: "#ffb744",
                          },
                        }}
                      >
                        GUIDELINES
                      </Button>
                    </div>
                    <Button
                      onClick={handleOpenLeaderBoardModal}
                      variant="contained"
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        background: '#FF6347'
                      }}
                    >
                      CREATE LEADERBOARD
                    </Button>
                  </div>

                ) : null}

              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "30px",
        }}
      >
        <h1 style={{ color: '#1976d2' }} className="text-black text-lg title-font font-medium mb-3 underline">
          {" "}
          Grading Criteria Info{" "}
        </h1>
      </div>
      <Box
        sx={datagrid}
      >
        <>
          <DataGrid
            rows={componentData}
            columns={GradingColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.ComponentID}
            // components={{ Toolbar: GridToolbar }}
            // density="compact"
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1976d2', // Change to your desired color
                color: '#fff', // Optional: change text color
              },
            }}
          />
        </>
      </Box>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "30px",
        }}
      >
        <h1 style={{ color: '#FF6347' }} className="text-black text-lg title-font font-medium mb-3 underline">
          {" "}
          Leaderboards{" "}
        </h1>
      </div>
      <Box
        sx={datagrid}
      >
        <>
          <DataGrid
            rows={getLeaderboard}
            columns={leaderboardColoumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.CourseLeaderboardId}
            // components={{ Toolbar: GridToolbar }}
            // density="compact"
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#FF6347',
                color: '#fff',
              },
            }}
          />
        </>
      </Box>



      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "30px",
        }}
      >
        <h1 style={{ color: '#6A5ACD' }} className="text-black text-lg title-font font-medium mb-3 underline">
          Student Enrolled
        </h1>
      </div>

      <Box sx={datagrid}>
        <DataGrid
          rows={studentrows}
          columns={studentcolumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.EnrollementId}
          // components={{ Toolbar: GridToolbar }}
          density="compact"
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#6A5ACD',
              color: '#fff',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          marginLeft: "30px",
        }}
      >
        <CloGraph CourseId={id} />
      </Box>

      <AddclassComponent
        open={openAdd}
        close={handleCloseAdd}
        classItem={classItem}
      />
      <DeleteModal
        open={openDelete}
        close={handleCloseDelete}
        selectedRowData={selectedRowData}
        handleDelete={handleDeleteClassComp}
      />

      <UpdateModal
        open={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        title="Update Class Component"
        inputs={[
          { name: "ComponentName", label: "ComponentName", type: "textfield" },
          { name: "ComponentType", label: "ComponentType", type: "autocomplete" },
          { name: "Weightage", label: "Weightage", type: "number" },
          { name: "ComponentPolicy", label: "ComponentPolicy", type: "number" },
        ]}
        initialData={{
          ComponentName,
          ComponentType,
          Weightage,
          ComponentPolicy,
          Status,
        }}
        autocompleteOptions={{ ComponentType: ["Graded", "Not Graded"] }}
      />
      <AddModal open={openLeaderBoardModal} handleClose={handleCloseLeaderBoardModal} fields={LeaderboardInputFields} handleOnAddButton={handleAddLeaderboard} title={"Leaderboard"} ButtonTitle={"ADD"} />
      <AddModal open={updateStudentGroupName} handleClose={handleCloseStudentGroupNameModal} fields={StudentGroupNameFields} handleOnAddButton={UpdateStudentGroupName} title={"Student Group Name"} ButtonTitle={"UPDATE"} />
      <Modal open={openguidelineModal} onClose={handleCloseGuidelineseModal}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            left: "50%",
            transform: "translateX(50%)",
            height: "100vh",
            width: "50%",
            maxWidth: "50vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            "@media (max-width: 960px)": {
              width: "100%",
              maxWidth: "100%",

              left: 0,
              transform: "none",
              borderRadius: 0,
            },
          }}
        >
          <  ClassComponentCreationGuidelines
            handleCloseGuidelineseModal={handleCloseGuidelineseModal}
          />

          {/* <Dialog
            open={updateCourseLeaderboard}
            onClose={() => setUpdateCourseLeaderboard(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"Do you want to delete this Leaderboard?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} sx={{
                backgroundColor: "orange",
                color: "white"
              }}>No</Button>
              <Button  autoFocu sx={{
                backgroundColor: "green",
                color: "white"
              }}>
                Yes
              </Button>
            </DialogActions>
          </Dialog> */}
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
        </Box>

      </Modal >

    </>
  );
}

export default DefaultPage;