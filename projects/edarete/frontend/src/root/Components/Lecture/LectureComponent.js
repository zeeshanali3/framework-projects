import React,{  useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import LectureSidebar from './LecturesSidebar';
import LectureContent from './LectureContent';
import AddSubComponent from "../modals/addsubcomponentModal";
import AddLectureAttendance from "../modals/addlectureAttendance";
import { GetsubcomponentAction } from "../../Common/Store/Actions/General/GetActions/getsubcomponentAction.js";
import { GetstudentenrolledincourseAction } from "../../Common/Store/Actions/General/GetActions/getstudentenrolledincourseAction.js";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import { getStudentData,getAccessToken } from '../../Utils/loginData/loginData.jsx';
import { formatDateTimeYMD } from "../../validation/validtionFunctions";

import UpdateModal from "../../Components/modals/UpdateModal";
import { UpdatesubcomponentAction } from "../../Common/Store/Actions/General/UpdateActions/updatesubcomponentAction.js";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import Contants from "../../Common/Constants"
import FullScreenOverlay from '../FullScreenOverlay';

export default function LectureComponent({ classItem, componentID, ComponentName, userroleID, isPublic, CourseId, components }) {
  const dispatch = useDispatch()

  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const { getsubclasscomponentData } = useSelector((state) => state?.GETSUBCOMPONENTREDUCER);
  const { getstudentincourseData } = useSelector((state) => state?.GETSTUDENTENROLLEDINCOURSEREDUCER);
  const studentData = getstudentincourseData?.payload || [];
  const [selectedLecture, setSelectedLecture] = useState()
  const [openAdd, setOpenAdd] = useState()
  const [openA, setOpenA] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const studenData = getStudentData(loginData);
  const [Num, setNum] = useState(0)
  const ActiveTab = useSelector((state) => state?.SIDERBARDATA.ActiveTab);
  const mapArray = studenData;
  const matchingEnrollment =
    mapArray && mapArray?.find((enrollment) => enrollment.CourseId == CourseId.CourseId);
  const enrollmentId = matchingEnrollment
    ? matchingEnrollment.EnrollementId
    : null;
  const [Text, setText] = useState("");
  const [Status, setStatus] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getAccessToken(loginData);
  const [progress, setProgress] = useState(0);



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
  const ResetState = () => {
    setText("");
    setStatus("");
    setAttachments([]);
    setLoading(false);
  };


  const baseInputs = [
    { name: "Text", label: "Instruction", type: "quill" },
    { name: "Status", label: "Status", type: "autocomplete" },
    { name: "Attachments", label: "Attachments", type: "file" }
  ];
  useEffect(() => {
    dispatch(GetstudentenrolledincourseAction("", CourseId.CourseId));
    handlegetclassComponent();
  }, [dispatch, componentID]);
  const handlegetclassComponent = () => {
    dispatch(isLoadingAction(true));

    dispatch(
      GetsubcomponentAction(
        componentID,
        (success) => {
          dispatch(isLoadingAction(false))
          console.log("Success::", success)
        },
        (er) => {
          console.log("Error::", er)
          dispatch(isLoadingAction(false))
        }
      )
    );
  };
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Smooth scrolling
    });
  }
  const handleOpenUpdateModal=(lecture)=>
  {
    setSelectedLecture(lecture)
    console.log("lectures::",lecture)
    setText(lecture.Text)
    setStatus(lecture.Status)
    
    setUpdateModalOpen(true);
  }
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    console.log("close");
    handlegetclassComponent();
  };
  const handleattachment = (SubId, Attachments) => {
    console.log("Attachments", Attachments)
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
        handlegetclassComponent();
        ResetState()
        handleCloseUpdateModal()

      })
      .catch((error) => {
        console.log("myError", error)
        if (error?.message?.status != 500) {
          if (error?.message?.payload != "") {
            toast.error(error?.message?.message);
          }
        } else {
          toast.error("Server Error " + error?.message?.status);
        }
      });
  };
  const handleUpdate = (formData) => {
    setLoading(true)
    console.log("formData", formData);
    const {
      Text, 
      Status,
      Attachments
    } = formData;
    dispatch(
      UpdatesubcomponentAction(
        "",
        selectedLecture.SubComponentId,
        userroleID,
        componentID,
        selectedLecture.SubComponentNum,
        formatDateTimeYMD( selectedLecture.Date),
        selectedLecture.EndTime,
        selectedLecture.TotalMarks,
        selectedLecture.Weightage,
        Text,
        Status,
        (response) => {
          toast.success(response.message);
          
          handleattachment(selectedLecture.SubComponentId, Attachments)

        },
        (error) => {
          toast.error(error?.message?.message);

        }

      )
    );
  };


  function handleUpdateSelectedLecture(lecture) {
    scrollToTop()
    setSelectedLecture(lecture)
  }
  function handleClickOpen(value) {
    setOpenAdd(value)
  }
  function handleClickClose() {
    setOpenAdd(false)
  }
  const handleCloseAttendanceMarker = () => {
    setSelectedRow(null);
    setOpenA(false);
  };
  const handleOpenAttendanceMarker = (row) => {
    setSelectedRow(row);
    setOpenA(true);
  };
  useEffect(() => {
    const highestSubComponentNum = Math.max(...getsubclasscomponentData.map(item => item.SubComponentNum));
    setNum(highestSubComponentNum + 1)
  }, [getsubclasscomponentData])

  return (
    <>

      <Grid
        container
        rowSpacing={1}
        marginTop="20px"
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} md={4} lg={4} xl={3}>
          {/* LeftSidebar */}
          <LectureSidebar LecturesList={getsubclasscomponentData || []} handleUpdateSelectedLecture={handleUpdateSelectedLecture} handleOpenAttendanceMarker={handleOpenAttendanceMarker} handleClickOpen={handleClickOpen} handleOpenUpdateModal={handleOpenUpdateModal} />
        </Grid>

        {selectedLecture && (<Grid item xs={12} md={8} lg={8} xl={9}>
          {/* ReadEmailContent */}
          <LectureContent LectureContent={selectedLecture || []} />
        </Grid>)}
      </Grid>
      <AddSubComponent
        componentID={componentID}
        classItem={classItem}
        handleClose={handleClickClose}
        open={openAdd}
        componentName={"Lecture"}
        showCloseIcon={false}
        userroleID={userroleID}
        Num={Num}
        handleSetLoading={(val)=>setLoading(val)}
        handlegetclassComponent={handlegetclassComponent}

      />
      <UpdateModal
        open={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        title="Update Sub Class Component"
        inputs={baseInputs}
        initialData={{
          Text: Text,
          Status: Status,
          Attachments: attachments
        }}
        autocompleteOptions={{ Status: ["Active", "Inactive"] }}
        isLoading={loading}

      />
      <AddLectureAttendance
        open={openA}
        close={handleCloseAttendanceMarker}
        data={studentData}
        subComponentId={selectedRow ? selectedRow?.SubComponentId : null}
        selectedrowData={selectedRow}
        ComponentName={ComponentName}
        CourseId={CourseId}

      />
        <FullScreenOverlay isLoading={loading} progress={progress} />
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
}
