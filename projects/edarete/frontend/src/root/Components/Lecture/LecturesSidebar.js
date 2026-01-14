import React,  { useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import styles from "./LeftSidebar.module.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useSelector } from "react-redux";
import { getRoleData } from "../../Utils/loginData/loginData.jsx";
import {
  Delete,
  Update,
  MoreVert as MoreVertIcon,
  Add,
  Publish,
} from "@mui/icons-material";



const LeftSidebar = ({ LecturesList, handleUpdateSelectedLecture, handleClickOpen, handleOpenAttendanceMarker,handleOpenUpdateModal }) => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const roleData = getRoleData(loginData)
  const [lectureId, setLectureId] = useState()
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          p: "25px 20px",
          mb: "15px",
        }}
      >
        {(roleData.RoleName == "Teacher" || roleData.RoleName == "TA") && (<Button
          onClick={() => handleClickOpen(true)}
          variant="contained"
          fullWidth

          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "14px",
            padding: "12px 20px",
            mb: "30px",
            color: "#fff !important"
          }}
        >
          Create New lecture
        </Button>)}


        <ul className={styles.leftNav}>
          {LecturesList.map(lecture => (
            <li
              key={lecture.SubComponentId}
              style={{
                color: lecture.SubComponentId === lectureId ? 'var(--primaryColor)' : '#260944',
                fontWeight: lecture.SubComponentId === lectureId ? 'bold' : 'normal',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={() => {
                    handleUpdateSelectedLecture(lecture);
                    setLectureId(lecture.SubComponentId);
                  }}
                  sx={{
                    color: lecture.SubComponentId === lectureId ? 'var(--primaryColor)' : '#818093',
                    marginRight: '10px',
                  }}
                >
                  <KeyboardDoubleArrowRightIcon />

                  <span style={{ flex: 1 }}>
                    {lecture.ComponentName + ' ' + lecture.SubComponentNum}
                  </span>
                </IconButton>
                {(roleData.RoleName === 'Teacher' || roleData.RoleName === 'TA') && (
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      sx={{ color: '#6C63FF' }}
                      onClick={() => handleOpenAttendanceMarker(lecture)}
                    >
                      <FingerprintIcon />
                    </IconButton>
                    <IconButton
                      sx={{  color: 'orange' }} 
                      onClick={() => handleOpenUpdateModal(lecture)}
                    >
                      <Update />
                    </IconButton>
                  </div>
                )}
              </span>
            </li>
          ))}
        </ul>

      </Card>
    </>
  );
};

export default LeftSidebar;
