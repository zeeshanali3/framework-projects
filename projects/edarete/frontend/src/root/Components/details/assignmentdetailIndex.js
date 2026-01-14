import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import "react-tabs/style/react-tabs.css";
import Header from "../../custom/topnavBar";
import { Box } from "@mui/material";
import { routesName } from "../../routes/adminConstants";
import AssignmentInstruction from "./instructionTab";
import TurnIn from "./turnIn";
import ActivityResult from "./activityResult";
import { useSelector } from "react-redux";
// import { getRoleData } from "../../Utils/loginData/loginData.jsx";
import { getStudentData, getRoleData } from "../../Utils/loginData/loginData.jsx";
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "500",
  minWidth: 0,
  fontSize: "0.875rem",
  fontFamily: "'Google Sans', 'Roboto', 'Arial', sans-serif",
  letterSpacing: ".01785714em",
  height: "3rem",
  lineHeight: "1.25rem",
  [theme.breakpoints.up("md")]: {
    minWidth: 0,
  },
  "&.Mui-selected": {
    borderBottom: "3px solid rgb(25,103,210)",
    color: "rgb(25,103,210)",
  },
}));

const Details = () => {
  const { loginData } = useSelector((state) => state.LOGINREDUCER);
  const ActiveTab = useSelector((state) => state?.SIDERBARDATA.ActiveTab);
  const location = useLocation();
  const { state } = location;
  const params = useParams();
  const roleData = getRoleData(loginData);
  const { RoleId, RoleName, UserroleId } = roleData;
  const { courseName, id, SubComponentId } = params || { courseName: '', id: '', SubComponentId: '' };
  const [activeTab, setActiveTab] = useState(0);
  

  const renderTabContent = (tabIndex) => {
    if (ActiveTab.ComponentName !== state?.row.ComponentName) {
      return <Navigate to={`${routesName.classroomHome}/${courseName}/${id}`} />;
    }
    console.log('Tabindex::',activeTab)
    switch (tabIndex) {

    
      case 0:
        return (
          <AssignmentInstruction
            ComponentName={state?.row.ComponentName}
            Text={state?.row.Text}
            TotalMarks={state?.row.TotalMarks}
            Posted_Date={state?.row.Posted_Date}
            SubmissionDate={state?.row.Date}
            EndTime={state?.row.EndTime}
            courseId={id}
            SubComponentId={SubComponentId}
            userRoleId={UserroleId}
            roleName={RoleName}
            attachments={state?.row.attachments}
            ComponentType={state?.row.ComponentType}
            CourseId={state?.CourseId.CourseId}
            CourseName={courseName}
          />
        );
      case 1:
        return (RoleName != "Student" && state.row.ComponentType == "Graded") ? (
          <TurnIn
            Text={state?.row.Text}
            TotalMarks={state?.row.TotalMarks}
            Posted_Date={state?.row.Posted_Date}
            SubmissionDate={state?.row.Date}
            EndTime={state?.row.EndTime}
            courseId={id}
            SubComponentId={SubComponentId}
            userRoleId={UserroleId}
            roleName={RoleName}
          />
        ) :  <ActivityResult
        Text={state?.row.Text}
        TotalMarks={state?.row.TotalMarks}
        Posted_Date={state?.row.Posted_Date}
        SubmissionDate={state?.row.Date}
        EndTime={state?.row.EndTime}
        courseId={id}
        SubComponentId={SubComponentId}
        userRoleId={UserroleId}
        roleName={RoleName}
      />
      case 2:
        
        return (state.row.ComponentType == "Graded") ?(
          <ActivityResult
            Text={state?.row.Text}
            TotalMarks={state?.row.TotalMarks}
            Posted_Date={state?.row.Posted_Date}
            SubmissionDate={state?.row.Date}
            EndTime={state?.row.EndTime}
            courseId={id}
            SubComponentId={SubComponentId}
            userRoleId={UserroleId}
            roleName={RoleName}
          />
          ): null;
        default:
return null;
      }
    }
return (
  <>
    <div style={{ overflow: "hidden" }}>
      {courseName ? (
        <Header title={courseName} showAddIcon={false} navigations={`${routesName.classroomHome}/${courseName}/${id}`} hideLogout={false} showCloseIcon={true} />
      ) : (
        <Header title={courseName} showAddIcon={false} hideLogout={false} />
      )}
      <Box className="flex justifyCenter">
        <Tabs
          value={activeTab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={(event, newValue) => setActiveTab(newValue)}
          aria-label="icon position tabs example"
          sx={{
            borderBottom: `0.0625rem solid rgb(218, 220, 224)`,
            width: "100%",
          }}
          indicatorColor="transparent"
        >
          <StyledTab key={0} label="Instruction" />
          {(state?.row.ComponentType == "Graded" && RoleName != "Student") && <StyledTab key={1} label="Turn In" />}
          {state?.row.ComponentType == "Graded" && <StyledTab key={1} label="Activity Result" />}
        </Tabs>
      </Box>

      {renderTabContent(activeTab)}
    </div>
  </>
);
  };

export default Details;
