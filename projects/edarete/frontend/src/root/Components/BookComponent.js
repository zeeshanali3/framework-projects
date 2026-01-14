import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow, Paper, TableContainer, TableHead, Avatar, Box, Tooltip, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import AddbookComponent from "./modals/addbookModal";
import { GetbookAction } from "../Common/Store/Actions/General/GetActions/getbookAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Add, DeleteOutline, Update } from "@mui/icons-material";
import { green, red } from '@mui/material/colors';
import { DeletebookAction } from "../Common/Store/Actions/DeleteActions/deletebookAction";
import { getAccessToken, getStudentData } from "../Utils/loginData/loginData.jsx";
import { UpdatebookAction } from "../Common/Store/Actions/General/UpdateActions/updatebookAction.js"
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction.js";

const BookComponent = () => {
    const { loginData } = useSelector((state) => state.LOGINREDUCER);
    const token = getAccessToken(loginData);
    const { id } = useParams();
    const [openAdd, setopenAdd] = useState(false);
    const [getBookData,setGetBookData]=useState([])
    const handleopenAdd = () => { setopenAdd(true) }
    const handlecloseAdd = () => { setopenAdd(false) }
    useEffect(()=>{
   handlegetbookAction()
    },[openAdd])
    // const { getbookData } = useSelector((state) => state?.GETBOOKREDUCER) || [];
    const dispatch = useDispatch();
    //
    const studenData = getStudentData(loginData);
    const mapArray = studenData;
    const matchingEnrollment = mapArray && mapArray.find((enrollment) => enrollment.CourseId == id);
    const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;

    const handlegetbookAction = () => {
        dispatch(isLoadingAction(true));
        dispatch(
            GetbookAction(
                token,
                (response) => {
                    dispatch(isLoadingAction(false));
                    setGetBookData(response.payload)
                    console.log("successfully retrived books", response)
                  
                },
                (error) => {
                    dispatch(isLoadingAction(false));
                    console.log("error while fetching books", error)
                }
            )
        )
        return "Succuess"
    }
    const handledeletebookAction = (bookID) => {
        dispatch(isLoadingAction(true));
        dispatch(
            DeletebookAction(
                token,
                bookID,
                (response) => {
                    dispatch(isLoadingAction(false));
                    handlegetbookAction();
                    console.log("successfully deleted books", response)
                },
                (error) => {
                    dispatch(isLoadingAction(false));
                    console.log("error while deleting books", error)
                }
            )
        )
    }

    // update books
    const handleupdatebookAction = (row) => {
        dispatch(isLoadingAction(true));
        dispatch(
            // BookId ,CourseId,BookIBN,BookName
            UpdatebookAction(
                token,
                id,
                // CourseId id 
                // BookIB
                //BookName
                (response) => {
                    dispatch(isLoadingAction(false));
                    handlegetbookAction();
                   
                },
                (error) => {
                    dispatch(isLoadingAction(false));
                    console.log("error while updating books", error)
                }
            )
        )
    }
    console.log("getBookData", getBookData)
    return (
        <>
            <div className="m-2">
                {enrollmentId === null ? (
                    <Box className="mt-1 mb-1">


                        <Tooltip title="Add">
                            <IconButton
                                size="small"
                                sx={{ background: "#F2F6F8" }}
                                className='ml-5px'
                                onClick={handleopenAdd}
                            >
                                <Add fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : null}

                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                        width: "100%",
                    }}
                >
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="custom pagination table"
                        className="dark-table"
                    >
                        <TableHead sx={{ background: "#F7FAFF" }}>
                            <TableRow>
                                <TableCell
                                    style={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                    align="left"
                                >
                                    Book Name
                                </TableCell>
                                <TableCell
                                    style={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                    align="left"
                                >
                                    Book IBN
                                </TableCell>
                                {enrollmentId === null ? (
                                    <TableCell
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13.5px",
                                        }}
                                        align="left"
                                    >
                                        Actions
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {getBookData.map((book) => (
                                <TableRow key={book.BookId}>
                                    <TableCell align="left"
                                        sx={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13.5px",
                                        }}
                                    >{book.BookName}</TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13.5px",
                                        }}
                                        align="left">{book.BookIBN}</TableCell>
                                    {enrollmentId === null ? (
                                        <TableCell
                                            style={{
                                                borderBottom: "1px solid #F7FAFF",
                                                fontSize: "13px",
                                                paddingTop: "13px",
                                                paddingBottom: "13px",
                                                display: "flex",
                                                justifyContent: "flex-end"
                                            }}
                                            align="right"
                                        >
                                            <Avatar sx={{ bgcolor: red[500] }} className='m-1'>
                                                <DeleteOutline onClick={() => handledeletebookAction(book.BookId)} />
                                            </Avatar>
                                            <Avatar sx={{ bgcolor: green[500] }} className='m-1'>
                                                <Update onClick={() => { handleupdatebookAction(book) }} />
                                            </Avatar>
                                        </TableCell>
                                    ) : null}

                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>

            </div>
            <AddbookComponent
                open={openAdd}
                close={handlecloseAdd}
                courseid={id}

            />
        </>
    );
};

export default BookComponent;
