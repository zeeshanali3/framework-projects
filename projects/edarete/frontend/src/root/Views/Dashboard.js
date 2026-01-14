import React, { useEffect, useState } from "react";
import Header from "../custom/topnavBar";
import { routesName } from "../routes/routesName";
import UserDetails from "../components/userDetails";
import ClassroomCard from "../components/classroomCard";
import { useDispatch, useSelector } from "react-redux";
import { Element, scroller } from 'react-scroll';
import CreatedCourses from "../components/enrollementOffered";
import TaCard from "../components/taCard";
import { gettaData } from "../loginData/loginData";
import TeacherCard from "../components/TeacherCard";
import { getTeacherData } from "../loginData/loginData";
import { getStudentData } from "../loginData/loginData";
import {sideBarDataAction} from "../redux/Actions/GetActions/getSideBarDataAction"
import BookIcon from '@mui/icons-material/Book';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ScienceIcon from '@mui/icons-material/Science';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ComputerIcon from '@mui/icons-material/Computer';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';


const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [userRoleId, setUserRoleId] = useState(null);
  const dispatch = useDispatch();
  const icons=[
    <BookIcon sx={{ color: '#FF6347' }} key="book" />,
    <HistoryEduIcon sx={{ color: '#4682B4' }} key="history" />,
    <LocalLibraryIcon sx={{ color: '#32CD32' }} key="science" />,
    <ComputerIcon sx={{ color: '#FFD700' }} key="computer" />,
  ]

  const { loginData } = useSelector((state) => state?.LOGINREDUCER);

  const studentSemesterId = loginData?.payload?.studentSemesterId[0]?.StudentSemesterId;

  const token = loginData?.payload?.accessToken || "";
  const teacherData = getTeacherData(loginData);
  const roleData = loginData && loginData.payload ? loginData?.payload?.RoleData : [];
  useEffect(() => {
    if (roleData && roleData?.length > 0) {
      const firstRole = roleData[0];
      setUserRole(firstRole.RoleName);
      setRoleId(firstRole.RoleId);
      setUserRoleId(firstRole.UserroleId);
    }
  }, [roleData]);

  const taData = gettaData(loginData);
  const studentData = getStudentData(loginData);
  
  const getDataSource = () => {
    if (taData && taData.length > 0) {
      return taData;
    } else if (studentData && studentData.length > 0) {
      return studentData;
    } else if (teacherData && teacherData.length > 0) {
      return teacherData;
    }
    return [studentData,taData,teacherData];
  };
  useEffect(()=>{
    let currIndex=0
    dispatch(sideBarDataAction(getDataSource().map(item => ({
      title: item.CourseName,
      path: `/classroomHome/${item.CourseName}/${item.CourseId}`,
      icon: icons[currIndex++%icons.length]

    }))));

  },[ getDataSource()])
  useEffect(() => {
    if (teacherData && teacherData?.length === 0) {
      scroller.scrollTo('createdCourses', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, [teacherData]);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Header
          title={"Scholarspace"}
          navigations={routesName.loginPage}
          showAddIcon={false}
          showCloseIcon={false}
          sPath={routesName.setting}
        />

        <div className="m-4">
          <UserDetails
            roleName={userRole}
            roleID={roleId}
            userID={userRoleId}
          />
        </div>
        {studentSemesterId && (
          <div className="m-4" >
              <CreatedCourses />
          </div>
        )}

        {teacherData && teacherData?.length !== 0 && (
          <div
            className="m-4 p-2"
            style={{ borderBottom: ".0625rem solid #e0e0e0" }}
          >
            <TeacherCard />
          </div>
        )}

        {studentData && studentData?.length !== 0 && (
          <div className="m-4 p-2">
            <ClassroomCard
              roleName={userRole}
              roleID={roleId}
              userID={userRoleId}
            />
          </div>
        )}
        {taData && taData?.length !== 0 && (
          <div
            className="m-4 p-2"
            style={{ borderBottom: ".0625rem solid #e0e0e0" }}
          >
            <TaCard />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;