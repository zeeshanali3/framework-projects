import React from 'react'
import Header from '../../custom/topnavBar'
import Classess from './peningClasses'
import { Box } from '@mui/material'
import { routesName } from '../../routes/adminConstants'
import {  useSelector } from "react-redux";
import { getRoleData, getAccessToken, getStudentData } from "../../Utils/loginData/loginData.jsx";
export default function PendingClasses(){
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const roleData = getRoleData(loginData);
  const { RoleId, RoleName, UserroleId } = roleData || {};
  const navigationRoute=RoleName=="Student"?routesName.StudentDashboard:routesName.dashboardView
    return(
        <>
        <Header title={"Pending Classes"} showAddIcon={false} hideLogout={false} navigations={navigationRoute} />
        <Box m={2}> 
          <Classess />
        </Box>
        </>
    )
}