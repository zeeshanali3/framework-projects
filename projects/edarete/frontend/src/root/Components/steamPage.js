


// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Box, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Button, Menu, MenuItem, TextField } from '@mui/material';
// import { Assignment, Add, MoreVert } from '@mui/icons-material';
// import { FormatDate } from "../validation/validtionFunctions";
// import { routesName } from '../routes/adminConstants';
// import { useMediaQuery } from '@mui/material';
// import Pic from "../assets/images/user1.png";
// import { getStudentData, getAccessToken } from "../Utils/loginData/loginData.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import p  from "../assets/images/gcl.jpg";
// export default function SteamPage() {
//     const { loginData } = useSelector((state) => state?.LOGINREDUCER);
//     const { courseName, id } = useParams();
//     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [showComments, setShowComments] = useState(false);
//     const [studentText, setStudentText] = useState('');
//     const studenData = getStudentData(loginData)

//     const mapArray = studenData;
//     const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
//     const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;

//     const handleMenuOpen = (event, row) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleopenAdd = () => {
//         // Implement your handleopenAdd logic here
//     };

//     const handleUpdateClick = (row) => {
//         // Implement your handleUpdateClick logic here
//     };

//     const handleaddactionDispatch = (subComponentId) => {
//         // Implement your handleaddactionDispatch logic here
//     };

//     const generateIsGraded = () => {
//         return Math.random() < 0.5;
//     };

//     const isGraded = generateIsGraded();

//     const getsubclasscomponentData = [
//         {
//             SubComponentId: 1,
//             componentID: 1,
//             User_Name: "John Doe",
//             Text: "Assignment 1",
//             Posted_Date: new Date().toISOString()
//         },
//         {
//             SubComponentId: 2,
//             componentID: 2,
//             User_Name: "Jane Smith",
//             Text: "Assignment 2",
//             Posted_Date: new Date().toISOString()
//         }
//         // Add more dummy data as needed
//     ];

//     return (
//         <>
//             <Box>
//             <Grid container justifyContent="center" mt={1} p={2} spacing={1}>
//                     <Grid item xs={12} md={8} lg={8.6} sx={{ overflow: "hidden" }}>
//                     <img alt='img' src={p} style={{ width: '100%' ,borderRadius:'10px' }} />
//                         </Grid>
//                         </Grid>


//                 <Grid container justifyContent="center" mt={1} p={2} spacing={1}>
//                     <Grid item xs={12} md={8} lg={4.6} sx={{ overflow: "hidden" }}>
//                         <Box className=''>
//                             {getsubclasscomponentData.map((row) => (
//                                 <Link
//                                     key={row.SubComponentId}
//                                     to={{
//                                         pathname: `${routesName.assignmentDetails}/${courseName}/${id}/${row.SubComponentId}`,
//                                     }}
//                                     state={row}
//                                     states={courseName}
//                                     replace
//                                 >
//                                     <Box
//                                         key={row.componentID}
//                                         className="flex mt-1 mb-4"
//                                         sx={{
//                                             border: "0.0625rem solid rgb(218, 220, 224)",
//                                             borderRadius: "10px",
//                                             justifyContent: "space-between",
//                                             alignItems: "center",
//                                             width: "100%", // Set width to 100%
//                                             padding: "16px", // Set padding
//                                         }}
//                                     >
//                                         <List className="flex-grow">
//                                             <ListItem sx={{ alignItems: "flex-start" }}>
//                                                 <ListItemAvatar>
//                                                     <Avatar>
//                                                         <Assignment />
//                                                     </Avatar>
//                                                 </ListItemAvatar>
//                                                 <ListItemText
//                                                     primary={
//                                                         <Typography
//                                                             fontFamily={"Google Sans,Roboto,Arial,sans-serif"}
//                                                             letterSpacing=".01785714em"
//                                                             fontSize="0.8775rem"
//                                                             lineHeight="1.25rem"
//                                                             fontWeight={'bold'}
//                                                         >
//                                                             {isSmallScreen
//                                                                 ? row.User_Name +
//                                                                 " Posted " +
//                                                                 row.Text.substring(0, 6)
//                                                                 : row.User_Name +
//                                                                 " Posted  assignment " +
//                                                                 row.Text}
//                                                         </Typography>
//                                                     }
//                                                     secondary={FormatDate(row.Posted_Date)}
//                                                 />
//                                             </ListItem>
//                                         </List>
//                                         <Box
//                                             sx={{
//                                                 alignItems: "flex-end",
//                                                 position: "relative"
//                                             }}
//                                         >
//                                             <IconButton onClick={(event) => handleMenuOpen(event, row)}>
//                                                 <MoreVert />
//                                             </IconButton>
//                                         </Box>
//                                     </Box>
//                                 </Link>
//                             ))}
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Box>

//             <Box className="flex justify-center" p={2}>
//                 <Grid container p={1} spacing={2} xs={12} md={12} lg={12}>

//                     {getsubclasscomponentData.map((row) => (
//                         <Grid container item justifyContent="center" xs={18} md={12} lg={12} key={row.SubComponentId} >
//                             <Grid xs={18} md={12} lg={4.6}>

//                                 <Box
//                                     sx={{
//                                         borderRadius: "10px",
//                                         border: "0.0625rem solid rgb(218, 220, 224)",
//                                         width: "100%", // Set width to 100%
//                                         padding: "16px", // Set padding
//                                     }}

//                                 >
//                                     <div
//                                         className="flex justify-between "
//                                     >
//                                         <div>
//                                             <Box sx={{ p: 2, }}>
//                                                 <Box sx={{ display: "flex", alignItems: "center", }}>
//                                                     <img src={Pic} alt="user" style={{ border: "none" }} />
//                                                     <Box ml={1} >
//                                                         <span
//                                                             style={{
//                                                                 fontFamily: "Google Sans,Roboto,Arial,sans-serif",
//                                                                 letterSpacing: ".01785714em",
//                                                                 fontSize: "0.875rem",
//                                                                 // fontWeight: "500",
//                                                                 fontWeight: 'bold',
//                                                                 lineHeight: "1.25rem",
//                                                                 // color: "#3c4043",
//                                                             }}>
//                                                             {row.User_Name}
//                                                         </span>
//                                                         <i style={{ display: "block" }}>{FormatDate(row.Posted_Date)}</i>
//                                                     </Box>
//                                                 </Box>
//                                             </Box>
//                                             <Box pl={2} pt={2} pb={2} >
//                                                 <p>{row.Text}</p>
//                                             </Box >
//                                             {row.attachments?.map((attachment) =>
//                                                 <Box pl={2} pt={2} pb={2} sx={{ overflow: 'hidden' }}>
//                                                     {/* <p>Download Url: {attachment.Download_url}</p> */}
//                                                     <p>File Name: {attachment.FileName}</p>
//                                                     <p>File Size: {attachment.FileSize}</p>
//                                                     <p>Fie Type: {attachment.FileType}</p>
//                                                 </Box>
//                                             )}


//                                         </div>

//                                         {enrollmentId === null ? (
//                                             <Box className="pt-1 pr-1">
//                                                 <IconButton fontWeight='bold' onClick={(event) => handleMenuOpen(event, row)}>
//                                                     <Typography fontWeight={'bold'}>
//                                                         <MoreVert />

//                                                     </Typography>
//                                                 </IconButton>
//                                             </Box>
//                                         ) : null}
//                                     </div>
//                                     {enrollmentId === null ? (
//                                         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                                             <MenuItem onClick={() => handleUpdateClick(row)}>Update</MenuItem>
//                                         </Menu>

//                                     ) : null}


//                                     <div
//                                         style={{
//                                             borderTop: "0.0625rem solid rgb(218, 220, 224)",


//                                         }}
//                                         p={2}>
//                                     </div>
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     ))}

//                 </Grid>
//             </Box>
//         </>
//     );
// }




// import React, { useState } from "react";
// import { Button, TextField, Avatar, Grid } from '@mui/material';
// import { useLocation, useParams } from "react-router-dom";

// const Main = ({ classData }) => {

//     const [showInput, setShowInput] = useState(false);
//     const [inputValue, setInput] = useState("");
//      const  {courseName} =useParams();

//          const getsubclasscomponentData = [
//         {
//             SubComponentId: 1,
//             componentID: 1,
//             User_Name: "John Doe",
//             Text: "Assignment 1",
//             Posted_Date: new Date().toISOString(),
//             graded:true,
//         },
//         {
//             SubComponentId: 2,
//             componentID: 2,
//             User_Name: "Jane Smith",
//             Text: "Assignment 2",
//             Posted_Date: new Date().toISOString(),
//             graded:false,
//         }
//         // Add more dummy data as needed
//     ];
//     return (
//         <Grid container justifyContent="center" mt={1} p={2} spacing={1}>
//             <Grid item xs={12} md={8} lg={6.6} sx={{ overflow: "hidden" }}>
//                 <div className="main">
//                     <div className="mx-auto flex flex-col w-full max-w-[62.5rem]">
//                         <div className="bg-blue-500 rounded-md mt-6 overflow-hidden">
//                             <div className="h-60 relative w-full">
//                                 <div className="bg-cover bg-center h-full absolute top-0 left-0 w-full" style={{ backgroundImage: 'url("https://gstatic.com/classroom/themes/img_backtoschool.jpg")' }}>
//                                     <div className="block opacity-80 h-full w-full absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-transparent"></div>
//                                 </div>
//                                 <div className="relative p-6">
//                                     <h1 className="text-white text-3xl font-semibold mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap">{courseName}</h1>
//                                     <div className="text-white">section</div>
//                                     <div className="flex mt-2 text-white">
//                                         <em className="font-semibold">Class Code :</em>
//                                         <div className="ml-2">id</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <Grid container spacing={2} mt={4}>
//                             <Grid item xs={12} md={3}>
//                                 <div className="border border-gray-300 rounded-md p-4">
//                                     <p>Upcoming</p>
//                                     <p className="text-gray-600">No work due</p>
//                                     <p className="text-gray-600">No work due</p>

//                                 </div>
//                             </Grid>
//                             <Grid item xs={12} md={9}>
//                                 <div className="border border-gray-300 rounded-md p-4">

//                                         <div className="cursor-pointer flex space-x-2 items-center" onClick={() => setShowInput(true)}>
//                                             <Avatar />
//                                             <div className="flex-grow">Announce Something to class</div>
//                                         </div>

//                                 </div>
//                             </Grid>
//                         </Grid>
//                     </div>
//                 </div>
//             </Grid>
//         </Grid>

//     );
// };

// export default Main;

// import React, { useState } from "react";
// import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery } from '@mui/material';
// import { useParams } from "react-router-dom";
// import { Assignment, MoreVert as MoreVertIcon } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { FormatDate } from "../validation/validtionFunctions";
// import { routesName } from "../routes/adminConstants";

// const Main = ({ classData }) => {
//     const [showInput, setShowInput] = useState(false);
//     const { courseName, id } = useParams();
//     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

//     const getsubclasscomponentData = [
//         {
//             SubComponentId: 1,
//             componentID: 1,
//             User_Name: "John Doe",
//             Text: "Assignment 1",
//             Posted_Date: new Date().toISOString(),
//             graded: true,
//         },
//         {
//             SubComponentId: 2,
//             componentID: 2,
//             User_Name: "Jane Smith",
//             Text: "Assignment 2",
//             Posted_Date: new Date().toISOString(),
//             graded: false,
//         },
//         {
//             SubComponentId: 3,
//             componentID: 3,
//             User_Name: "Jane Smith",
//             Text: "Assignment 3",
//             Posted_Date: new Date().toISOString(),
//             graded: false,
//         }
//         // Add more dummy data as needed
//     ];

//     return (
//         <Grid container justifyContent="center" mt={1} p={2} spacing={1}>
//             <Grid item xs={12} md={8} lg={6.6} sx={{ overflow: "hidden" }}>
//                 <div className="main">
//                     <div className="mx-auto flex flex-col w-full max-w-[62.5rem]">
//                         <div className="bg-blue-500 rounded-md mt-6 overflow-hidden">
//                             <div className="h-60 relative w-full">
//                                 <div className="bg-cover bg-center h-full absolute top-0 left-0 w-full" style={{ backgroundImage: 'url("https://gstatic.com/classroom/themes/img_backtoschool.jpg")' }}>
//                                     <div className="block opacity-80 h-full w-full absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-transparent"></div>
//                                 </div>
//                                 <div className="relative p-6">
//                                     <h1 className="text-white text-3xl font-semibold mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap">{courseName}</h1>
//                                     <div className="text-white">section</div>
//                                     <div className="flex mt-2 text-white">
//                                         <em className="font-semibold">Class Code :</em>
//                                         <div className="ml-2">id</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <Grid container spacing={2} mt={4}>
//                             <Grid item xs={12} md={3}>
//                                 <div className="border border-gray-300 rounded-md p-4">
//                                     <p>Upcoming</p>
//                                     <p className="text-gray-600">No work due</p>
//                                     <p className="text-gray-600">No work due</p>
//                                 </div>
//                             </Grid>
//                             <Grid item xs={12} md={9}>
//                                 <div className="border border-gray-300 rounded-md p-4">
//                                     <div className="cursor-pointer flex space-x-2 items-center" onClick={() => setShowInput(true)}>
//                                         <Avatar />
//                                         <div className="flex-grow">Announce Something to class</div>
//                                     </div>
//                                 </div>
//                                 <Grid container spacing={2} mt={4}>
//                                     {getsubclasscomponentData
//                                         .filter(item => !item.graded)
//                                         .map(row => (
//                                             <Grid item xs={12} key={row.SubComponentId}>
//                                                 <Box>
//                                                     <Link
//                                                         to={{
//                                                             pathname: `${routesName.assignmentDetails}/${courseName}/${id}/${row.SubComponentId}`,
//                                                         }}
//                                                         state={row}
//                                                         states={courseName}
//                                                         replace
//                                                     >
//                                                         <Box
//                                                             className="flex mt-1 mb-4"
//                                                             sx={{
//                                                                 border: "0.0625rem solid rgb(218, 220, 224)",
//                                                                 borderRadius: "10px",
//                                                                 justifyContent: "space-between",
//                                                                 alignItems: "center",
//                                                             }}
//                                                         >
//                                                             <List className="flex-grow">
//                                                                 <ListItem sx={{ alignItems: "flex-start" }} >
//                                                                     <ListItemAvatar>
//                                                                         <Avatar>
//                                                                             <Assignment />
//                                                                         </Avatar>
//                                                                     </ListItemAvatar>
//                                                                     <ListItemText
//                                                                         primary={
//                                                                             <Typography
//                                                                                 fontFamily={"Google Sans,Roboto,Arial,sans-serif"}
//                                                                                 letterSpacing=".01785714em"
//                                                                                 fontSize="0.8775rem"
//                                                                                 lineHeight="1.25rem"
//                                                                                 fontWeight={'bold'}
//                                                                             >
//                                                                                 {isSmallScreen
//                                                                                     ? `${row.User_Name} Posted ${row.Text.substring(0, 6)}`
//                                                                                     : `${row.User_Name} Posted assignment ${row.Text}`
//                                                                                 }
//                                                                             </Typography>
//                                                                         }
//                                                                         secondary={FormatDate(row.Posted_Date)}
//                                                                     />
//                                                                 </ListItem>
//                                                             </List>
//                                                         </Box>
//                                                     </Link>
//                                                 </Box>
//                                             </Grid>
//                                         ))}
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </div>
//                 </div>
//             </Grid>
//         </Grid>
//     );
// };

// export default Main;


import React, { useState } from "react";
import { Button,Avatar, Box, Grid, TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useParams } from "react-router-dom";
import { Add, Assignment, DeleteForever, MoreVert as MoreVertIcon, Update } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FormatDate } from "../validation/validtionFunctions";
import { routesName } from "../routes/adminConstants";
import Pic from "../assets/images/user1.png";
import { useDispatch, useSelector } from 'react-redux';
import { getStudentData,getAccessToken } from "../Utils/loginData/loginData.jsx"
import DeleteModal from "./modals/deleteModal";
import UpdateModal from './modals/UpdateModal';
import { GetclasscomponentAction } from '../Common/Store/Actions/GetActions/getclasscomponentAction';
import { DeleteclasscomponentAction } from '../Common/Store/Actions/DeleteActions/deleteclasscomponentAction';
import { UpdateclasscomponentAction } from '../Common/Store/Actions/UpdateActions/updateclasscomponentAction';
import AddclassComponent from './modals/addclasscomponentModal';
import { helperText } from "../HelperText/Text";
import { Btnsx } from "../Animation/Btnsx";
const tablecellSX = {

    fontWeight: 500,
    borderBottom: "1px solid #F7FAFF",
    fontSize: "12px",
    padding: "9px 10px",
}
const Main = ({ classItem }) => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);

    const [showInput, setShowInput] = useState(false);
    const { courseName, id } = useParams();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const { getclasscomponentData } = useSelector((state) => state?.GETCLASSCOMPONENTREDUCER);
    const componentData = getclasscomponentData?.payload;

    const studenData = getStudentData(loginData)
    const mapArray = studenData;
    const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
    const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;
  
    // actions
    const [openAdd, setopenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const handleOpenAdd = () => {
        setopenAdd(true);
      }
    
      const handleCloseAdd = () => {
        setopenAdd(false);
      }
    
      const handleOpenDelete = (rowData) => {
        setSelectedRowData(rowData);
        setOpenDelete(true);
      };
    
      const handleCloseDelete = () => {
        setSelectedRowData(null);
        setOpenDelete(false);
      };
      const dispatch = useDispatch();

      const handleDeleteClassComp = (id) => {
        dispatch(
          DeleteclasscomponentAction(
            token,
            id,
            (response) => {
              console.log("success", response);
            },
            (error) => {
              console.log("error", error);
            }
          )
        );
      }
      const handleSuccess = (response) => {
        console.log("success", response);
        dispatch(GetclasscomponentAction(token, id));
      };
    
      const handleError = (error) => {
        console.log("error", error);
      };
    
      // update 
      const [updateModalOpen, setUpdateModalOpen] = useState(false);
      const [ComponentType, setComponentType] = useState("");
      const [ComponentName, setComponentName] = useState("");
      const [Weightage, setWeightage] = useState("");
      const [ComponentPolicy, setComponentPolicy] = useState("");
      const [Status, setStatus] = useState("");
      const handleUpdateClick = (rowData) => {
        setSelectedRowData(rowData);
        setComponentType(rowData.ComponentType);
        setComponentName(rowData.Description);
        setComponentName(rowData.ComponentName);
        setWeightage(rowData.Weightage);
        setComponentPolicy(rowData.ComponentPolicy)
        setStatus(rowData.Status);
        setUpdateModalOpen(true);
      };
      const handleUpdate = (formData) => {
        const { ComponentType, ComponentPolicy, ComponentName, Weightage, Status } = formData;
        dispatch(
          UpdateclasscomponentAction(
            token,
            selectedRowData.ComponentID, id, ComponentType, ComponentName, Weightage, ComponentPolicy, Status
          )
        );
        setUpdateModalOpen(false);
      };
    
      const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
      };
        
    const getsubclasscomponentData = [
        {
            SubComponentId: 1,
            componentID: 1,
            User_Name: "John Doe",
            Text: "abbreviation for science fiction and fantasy: stories set in an imagined future or in an imaginary world: Not being an SFF fan, she didn't enjoy the movie Dune. My favorite SF&F novel melds dinosaurs and time travel. Fewer examples. He writes mainly SFF.",
            Posted_Date: new Date().toISOString(),
            graded: false,
        },
        {
            SubComponentId: 2,
            componentID: 2,
            User_Name: "Jane Smith",
            Text: "Assignment 2",
            Posted_Date: new Date().toISOString(),
            graded: false,
        },
        {
            SubComponentId: 3,
            componentID: 3,
            User_Name: "Jane Smith",
            Text: "Assignment 3",
            Posted_Date: new Date().toISOString(),
            graded: false,
        }
    ];

    const calculateDeadline = (postedDate) => {
        const posted = new Date(postedDate);
        const deadline = new Date(posted.getTime() + (5 * 24 * 60 * 60 * 1000)); 
        return deadline.toISOString();
    };

    const upcomingAssignments = getsubclasscomponentData.filter(item => {
        const deadline = new Date(calculateDeadline(item.Posted_Date));
        const today = new Date();
        return deadline >= today && deadline <= new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000));
    });

    return (
        <>
        <div className="text-decoration-none mt-2 flex justify-center">
        <Button
          type="submit"
          variant="contained"
          onClick={handleOpenAdd}
            sx={Btnsx}
          startIcon={<Add />}
        >
          {helperText.createclasscomponent}
        </Button>
      </div>
        <Grid container justifyContent="center" mt={1} p={2} spacing={1}>
            <Grid item xs={12} md={8} lg={6.6} sx={{ overflow: "hidden" }}>
                <div className="main">
                    <div className="mx-auto flex flex-col w-full max-w-[62.5rem]">
                        <div className="rounded-md mt-6 overflow-hidden">
                            <div className="h-60 relative w-full">
                                {/* style={{ backgroundImage: 'url("https://gstatic.com/classroom/themes/img_backtoschool.jpg")' }}      bg-gradient-to-br from-blue-500*/}
                                <div className="bg-cover bg-center h-full absolute top-0 left-0 w-full" >
                                    <div className="block opacity-80 h-full w-full absolute top-0 left-0  to-transparent"></div>
                                </div>
                                <div className="relative" style={{ overflowX: 'auto', overflowY: 'auto',height: 'calc(100% - 24px)' }}>
                                    {/* <h1 className="text-white text-3xl font-semibold mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap">{courseName}</h1>
                                    <div className="text-white">section</div>
                                    <div className="flex mt-2 text-white">
                                        <em className="font-semibold">Class Code :</em>
                                        <div className="ml-2">id</div>
                                    </div> */}
                                    <TableContainer component={Paper} sx={{ boxShadow: "none", }}>
                                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className="dark-table">
                                            <TableHead sx={{ background: "#F7FAFF" }}>
                                                <TableCell sx={tablecellSX}>Component Name</TableCell>
                                                <TableCell sx={tablecellSX}>Component Policy</TableCell>
                                                <TableCell sx={tablecellSX}>Component Type</TableCell>
                                                <TableCell sx={tablecellSX}>Weightage</TableCell>
                                                <TableCell sx={tablecellSX} align="center">Action</TableCell>
                                            </TableHead>
                                            <TableBody>
                                                {componentData.map((row) => (
                                                    <TableRow key={row.ComponentID}>
                                                        <TableCell
                                                            style={{
                                                                width: 220,
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "13px",
                                                                paddingTop: "13px",
                                                                paddingBottom: "13px",
                                                            }}
                                                            align="left"
                                                        >{row.ComponentName}</TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: 220,
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "13px",
                                                                paddingTop: "13px",
                                                                paddingBottom: "13px",
                                                            }}
                                                            align="left"
                                                        >{row.ComponentPolicy}</TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: 220,
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "13px",
                                                                paddingTop: "13px",
                                                                paddingBottom: "13px",
                                                            }}
                                                            align="left"
                                                        >{row.ComponentType}</TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: 220,
                                                                borderBottom: "1px solid #F7FAFF",
                                                                fontSize: "13px",
                                                                paddingTop: "13px",
                                                                paddingBottom: "13px",
                                                            }}
                                                            align="left"
                                                        >{row.Weightage}</TableCell>
                                                        {enrollmentId === null ? (
                                                           <TableCell
                                                           sx={tablecellSX}
                                                           style={{
                                                               width: 220,
                                                               borderBottom: "1px solid #F7FAFF",
                                                               fontSize: "13px",
                                                               paddingTop: "13px",
                                                               paddingBottom: "13px",
                                                               display: "flex",
                                                               justifyContent: "center",
                                                           }}
                                                       >
                                                           <span className="p-1">
                                                               <DeleteForever sx={{ color: "red", fontSize: "16px" }} onClick={() => handleOpenDelete(row)} />
                                                           </span>
                                                           <span className="p-1">
                                                               <Update sx={{ color: "green", fontSize: "16px" }}   onClick={() => handleUpdateClick(row)} />
                                                           </span>
                                                       </TableCell>
                                                       
                                                        ) : null}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <Grid container spacing={2} mt={4}>
                            <Grid item xs={12} md={3}>
                                <div className="border border-gray-300 rounded-md p-4">
                                    <p className="text-lg font-semibold mb-2">Upcoming Deadlines</p>
                                    {upcomingAssignments.length > 0 ? (
                                        upcomingAssignments.map((assignment, index) => (
                                            <Link
                                                key={index}
                                                to={`${routesName.assignmentDetails}/${courseName}/${id}/${assignment.SubComponentId}`}
                                                state={assignment}
                                                states={courseName}
                                                replace
                                                className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                {assignment.Text} - {FormatDate(calculateDeadline(assignment.Posted_Date))}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">No assignments due within 5 days</p>
                                    )}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <div className="border border-gray-300 rounded-md p-4">
                                    <div className="cursor-pointer flex space-x-2 items-center" onClick={() => setShowInput(true)}>
                                        <Avatar />
                                        <div className="flex-grow">Announce Something to class</div>
                                    </div>
                                </div>
                                <Grid container spacing={2} mt={4}>
                                    {getsubclasscomponentData
                                        .filter(item => !item.graded)
                                        .map(row => (
                                            <Grid item xs={12} key={row.SubComponentId}>
                                                <Box>
                                                    <Link
                                                        to={{
                                                            pathname: `${routesName.assignmentDetails}/${courseName}/${id}/${row.SubComponentId}`,
                                                        }}
                                                        state={row}
                                                        states={courseName}
                                                        replace
                                                    >
                                                        <Box
                                                            className="flex mt-1 mb-4"
                                                            sx={{
                                                                border: "0.0625rem solid rgb(218, 220, 224)",
                                                                borderRadius: "10px",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <List className="flex-grow">
                                                                <ListItem sx={{ alignItems: "flex-start" }} >
                                                                    <ListItemAvatar>
                                                                        <Avatar>
                                                                            <Assignment />
                                                                        </Avatar>
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={
                                                                            <Typography
                                                                                fontFamily={"Google Sans,Roboto,Arial,sans-serif"}
                                                                                letterSpacing=".01785714em"
                                                                                fontSize="0.8775rem"
                                                                                lineHeight="1.25rem"
                                                                                fontWeight={'bold'}
                                                                            >
                                                                                {isSmallScreen
                                                                                    ? `${row.User_Name} Posted ${row.Text.substring(0, 6)}`
                                                                                    : `${row.User_Name} Posted assignment ${row.Text}`
                                                                                }
                                                                            </Typography>
                                                                        }
                                                                        secondary={FormatDate(row.Posted_Date)}
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                        </Box>
                                                    </Link>
                                                </Box>
                                            </Grid>
                                        ))}
                                </Grid>
                                {/* New grid for graded assignments */}
                                <Grid container spacing={2} mt={4}>
                                    {getsubclasscomponentData
                                        .filter(item => item.graded) // Filter graded assignments
                                        .map(row => (
                                            <Grid item xs={12} key={row.SubComponentId}>
                                                <Box
                                                    sx={{
                                                        borderRadius: "10px",
                                                        border: "0.0625rem solid rgb(218, 220, 224)",
                                                    }}

                                                >
                                                    <div>
                                                        <Box sx={{ p: 2, }}>
                                                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                                                <img src={Pic} alt="user" style={{ border: "none" }} />
                                                                <Box ml={1} >
                                                                    <span
                                                                        style={{
                                                                            fontFamily: "Google Sans,Roboto,Arial,sans-serif",
                                                                            letterSpacing: ".01785714em",
                                                                            fontSize: "0.875rem",
                                                                            // fontWeight: "500",
                                                                            fontWeight: 'bold',
                                                                            lineHeight: "1.25rem",
                                                                            // color: "#3c4043",
                                                                        }}>
                                                                        {row.User_Name}
                                                                    </span>
                                                                    <i style={{ display: "block" }}>{FormatDate(row.Posted_Date)}</i>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box pl={2} pt={2} pb={2} >
                                                            <p>{row.Text}</p>
                                                        </Box >
                                                        {row.attachments?.map((attachment) =>
                                                            <Box pl={2} pt={2} pb={2} sx={{ overflow: 'hidden' }}>
                                                                {/* <p>Download Url: {attachment.Download_url}</p> */}
                                                                <p>File Name: {attachment.FileName}</p>
                                                                <p>File Size: {attachment.FileSize}</p>
                                                                <p>Fie Type: {attachment.FileType}</p>
                                                            </Box>
                                                        )}


                                                    </div>
                                                </Box>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
        </Grid>
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
            { name: "ComponentName", label: "ComponentName ", type: "text" },
            { name: "ComponentType", label: "ComponentType ", type: "text" },
            { name: "Weightage", label: "Weightage ", type: "text" },
            { name: "ComponentPolicy", label: "ComponentPolicy ", type: "text" },
            { name: "Status", label: "Status" },
          ]}
          initialData={{
            ComponentName: ComponentName,
            ComponentType: ComponentType,
            Weightage: Weightage,
            ComponentPolicy: ComponentPolicy,
            Status: Status,
          }}
        />
        </>
    );
};

export default Main;
