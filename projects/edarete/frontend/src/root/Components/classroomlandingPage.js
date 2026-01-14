import React, { useEffect } from "react";
import Header from "../custom/topnavBar";
import { useLocation, useParams } from "react-router-dom";
import {  useDispatch,useSelector } from "react-redux";
import { routesName } from "../routes/adminConstants";
import { getRoleData, getAccessToken, getStudentData } from "../Utils/loginData/loginData.jsx";
import { getTeacherData,gettaData} from "../Utils/loginData/loginData.jsx";
import { sideBarActiveTabAction } from "../Common/Store/Actions/General/GetActions/getSideBarDataAction.js";
import ClassroomTabs from "./Tabs";

const ClassroomLandingPage = () => {
  
    const location = useLocation();
    const dispatch = useDispatch();
    const { courseName, id, '*': section } = useParams();
    const decodedCourseName = decodeURIComponent(courseName || '');
    const loginData = useSelector((state) => state?.LOGINREDUCER?.loginData);

    const roleData = getRoleData(loginData);
    const { RoleId, RoleName, UserroleId } = roleData || {};
    const navigationRoute=RoleName=="Student"?routesName.StudentDashboard:routesName.dashboardView
    const rows = location.state;

    const classItem = rows || {}; // Fallback to empty object if null
    const studentData = getStudentData(loginData);
    const Teacherdata=getTeacherData(loginData)
    const TaData=gettaData(loginData)
    useEffect(() => {
        // DON'T dispatch SET_ACTIVE_TAB here - let Tabs.js handle it from URL
        // dispatch({ type: 'SET_ACTIVE_TAB', payload: {...} });  // ❌ REMOVE THIS
    }, []);

    useEffect(() => {
        if (!rows) {
            // If state is null, fetch classItem based on params (e.g., dispatch an action)
            console.log("State is null, fetching classItem for id:", id);
            // Example: dispatch(fetchClassByIdAction(id, (data) => setClassItem(data), (err) => console.error(err)));
            // Replace with your actual action, e.g., from '../Common/Store/Actions/General/GetActions/someAction.js'
            // For now, set a placeholder or redirect
            // If no action, consider redirecting: window.location.href = '/some-fallback';
        }
    }, [rows, id]);
    const getDataSource = () => {
        if (TaData && TaData.length > 0) {
          return TaData;
        } else if (studentData && studentData.length > 0) {
          return studentData;
        } else if (Teacherdata && Teacherdata.length > 0) {
          return Teacherdata;
        }
        return [studentData,TaData,Teacherdata];
      };
      console.log("getDataSource::",getDataSource())
    return (
        <>
            <div style={{ overflow: "hidden" }}>
                
                <ClassroomTabs classItem={classItem} courseName={decodedCourseName} section={section} id={id} />
            </div>
        </>
    );
};

export default ClassroomLandingPage;
