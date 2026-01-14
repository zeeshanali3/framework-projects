import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./UniAdminDashboard.module.css";
import styles from "../../../assets/styles/PageTitle.module.css";
// import { GetRoleAction } from "../../Common/Store/Actions/GetRoleAction/GetRoleAction";
import Dashboard from "../../Components/AdminComponent/AdminProfile/Dashboard"
import Totaluser from "../../Components/Task/Totaluser"
import TasksPerformance from "../../Components/Task/Performance/index"
import Admins from "../../Components/AdminComponent/Admins/Admin";
import CRUDDashboard from "../../Pages/CRUDS/index";

function UniAdminDashboard() {
  const dispatch = useDispatch();
  const mainData = useSelector((state) => state.main);
  const getroleData = mainData?.userSelectedRole;
  const accessToken = mainData?.accesstoken;

  // useEffect(() => {
  //   if (!getroleData || !getroleData?.length) {
  //     dispatch(GetRoleAction(accessToken));
  //   } else {
  //   }
  // }, [getroleData?.payload]);
  return (
    <>
      <div className={styles.pageTitle}></div>
      <div>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Dashboard />
          </Grid>
        </Grid>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={12} lg={6}>
            <Totaluser />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TasksPerformance />
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 2
          }}
        >
          <CRUDDashboard selectedComponent={"Users"} />
        </Box>
      </div>
    </>
  );
}

export default UniAdminDashboard;