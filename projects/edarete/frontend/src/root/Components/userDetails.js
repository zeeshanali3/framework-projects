import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector,useDispatch } from "react-redux";
import Features from "./studentDashboard/Features";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {
  getTeacherData,
  getRoleData,
  getUserData,
} from "../Utils/loginData/loginData.jsx";
import { GetPersonalSubDomainAction } from "../Common/Store/Actions/General/GetActions/getpersonalSubDomainAction.js";
import { Card,Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const EmailIcon = () => (
  <svg
    width="28"
    height="28"
    fill="rgb(92, 133, 222)"
    className="bi bi-envelope"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.803 2.882L15 11.618V5.383zM1 11.618l4.803-2.882L1 5.383v6.235zm.34-.428L8 12.317l6.66-3.127L8 5.763 1.34 11.19z" />
  </svg>
);

const ResultIcon = () => (
  <svg
    width="28"
    height="28"
    fill="rgb(92, 133, 222)"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.285 6.085a1 1 0 0 0-1.41 0l-9.19 9.19-3.68-3.68a1 1 0 0 0-1.41 1.415l4.39 4.39a1 1 0 0 0 1.41 0l9.895-9.895a1 1 0 0 0 0-1.415z" />
  </svg>
);

const EducationIcon = () => (
  <svg
    width="28"
    height="28"
    fill="rgb(92, 133, 222)"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 5 19 V 6.2 C 5 5.0799 5 4.51984 5.21799 4.09202 C 5.40973 3.71569 5.71569 3.40973 6.09202 3.21799 C 6.51984 3 7.0799 3 8.2 3 H 15.8 C 16.9201 3 17.4802 3 17.908 3.21799 C 18.2843 3.40973 18.5903 3.71569 18.782 4.09202 C 19 4.51984 19 5.0799 19 6.2 V 17 H 7 C 5.89543 17 5 17.8954 5 19 Z M 5 19 C 5 20.1046 5.89543 21 7 21 H 19 M 18 17 V 21 M 15 13.5 C 14.7164 12.3589 13.481 11.5 12 11.5 C 10.519 11.5 9.28364 12.3589 9 13.5 M 12 7.5 H 12.01 M 13 7.5 C 13 8.05228 12.5523 8.5 12 8.5 C 11.4477 8.5 11 8.05228 11 7.5 C 11 6.94772 11.4477 6.5 12 6.5 C 12.5523 6.5 13 6.94772 13 7.5 Z"
      stroke="rgb(0, 0, 0)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserDetails = () => {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const teacherData = getTeacherData(loginData);
  const roleData = getRoleData(loginData);
  const userData = getUserData(loginData);
  const roleNameSelected=loginData?.payload?.roleData[0]?.RoleName
  const { RoleName } = roleData || {};
  const isTeacher = RoleName === "Teacher";
  
  const getPersonalSubDomainData = () => {
    dispatch(GetPersonalSubDomainAction("", teacherData[0]?.TeacherId, 
      (res) => {
        console.log("SUCCESS", res?.payload[0]?.PersonalDomainUrl);
        const url = res?.payload[0]?.PersonalDomainUrl;
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          window.open(`http://${url}`, '_blank');
        } else {
          window.open(url, '_blank');
        }
      }, 
      (error) => {
        console.log("ERROR", error);
      }
    ));
  }
  const convertTo12HourFormat = (timeString) => {
    const time = timeString?.split("T")[1]?.split(".")[0];
    const date = new Date(`1970-01-01T${time}Z`); 
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  const convertDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };
  console.log("loginData.payload", loginData?.payload);
  let UserDetailsData=[]
  if(roleNameSelected!="Teacher" && roleNameSelected!="TA")
    {
      UserDetailsData = [
        {
          id: "1",
          bgColor: "#EEF0FA",
          number: loginData?.payload?.userData[0]?.USER_NAME,
          subTitle:
          loginData?.payload?.userData[0]?.Email||loginData?.payload?.rollNumber[0]?.RegNum,
            
          icon: <EmailIcon />,
        },
        {
          id: "2",
          bgColor: "#F8EEE2",
          number: loginData?.payload?.studentData?.CGPA || "Yet to be calculated",
          subTitle: "CGPA",
          icon: <ResultIcon />,
        },
        {
          id: "3",
          bgColor: "#DDF0F1",
          number: convertDateToDDMMYYYY(loginData?.payload?.earliestDeadline[0]?.EarliestUpcomingDeadline?.split("T")[0]) || "N/A",
          subTitle: "Next Deadline is of "+ loginData?.payload?.earliestDeadline[0]?.SubcomponentName +" In " + loginData?.payload?.earliestDeadline[0]?.CourseName + " At" + " " + convertTo12HourFormat(loginData?.payload?.earliestDeadline[0]?.EarliestUpcomingDeadline),
          icon: <TimerOutlinedIcon />,
        },
        {
          id: "4",
          bgColor: "#FBEAEA",
          number:
            loginData?.payload?.studentData?.length ||
            loginData?.payload?.teacherData?.length ||
            loginData?.payload?.taData?.length,
          subTitle:
            loginData?.payload?.studentData &&
            loginData?.payload?.studentData?.length > 0
              ? loginData?.payload?.teacherData &&
                loginData?.payload?.teacherData?.length > 0
                ? "Assisting and Enrolled Courses"
                : "Enrolled Courses"
              : loginData?.payload?.teacherData &&
                loginData?.payload?.teacherData?.length > 0
              ? "Currently Teaching Courses "
              : "N/A",
          icon: <EducationIcon />,
        },
      ];
    }else
    {
      UserDetailsData = [
        {
          id: "1",
          bgColor: "#EEF0FA",
          number: loginData?.payload?.userData[0]?.USER_NAME,
          subTitle:
            loginData?.payload?.rollNumber[0]?.RegNum ||
            loginData?.payload?.userData[0]?.Email,
          icon: <EmailIcon />,
        },
        {
          id: "2",
          bgColor: "#FBEAEA",
          number:
            loginData?.payload?.studentData?.length ||
            loginData?.payload?.teacherData?.length ||
            loginData?.payload?.taData?.length,
          subTitle:
               loginData?.payload?.taData &&
                loginData?.payload?.taData?.length > 0
                ? "Assisting Courses"
                : loginData?.payload?.teacherData &&
                loginData?.payload?.teacherData?.length > 0
              ? "Currently Teaching Courses "
              : "N/A",
          icon: <EducationIcon />,
        },
      ];
    }

  // console.log("UserDetailsData", UserDetailsData);
  const [areCardsVisible, setAreCardsVisible] = useState(() => {
    const storedVisibility = localStorage.getItem("areCardsVisible");
    return storedVisibility ? JSON.parse(storedVisibility) : true;
  });

  useEffect(() => {
    localStorage.setItem("areCardsVisible", JSON.stringify(areCardsVisible));
  }, [areCardsVisible]);

  const toggleCardVisibility = () => {
    setAreCardsVisible((prevVisibility) => !prevVisibility);
  };

  const isMobile = () => window.innerWidth <= 768;

  const [mobile, setMobile] = useState(isMobile());

  const handleResize = () => {
    setMobile(isMobile());
  };
  const copyEmailToClipboard = (text) => {
    const copyIt =
      loginData?.payload?.rollNumber[0]?.RegNum ||
      loginData?.payload?.userData[0]?.Email;

    const email = extractEmail(copyIt);
    if (email) {
      navigator.clipboard
        .writeText(email)
        .then(() => alert("Email copied to clipboard"))
        .catch((error) => console.error("Unable to copy email: ", error));
    } else {
      alert("No email found");
    }
  };

  const extractEmail = (text) => {
    if (typeof text !== "string") return null;

    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  window.addEventListener("resize", handleResize);
  return (
    <Card
      sx={{
        background: "#fff",
        padding: "15px",
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // borderTop:"5px solid #337DFF",
        borderTop:"4px solid #5C5B98",
        boxShadow:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      {(
        <div className="large-screen-layout">
        <div className="mb-6" style={{ display: "flex", justifyContent: "space-between" }}>
  <div >
    <h2
      style={{
        lineHeight: "20px",
        fontSize: "19px",
        fontWeight: "bold",
        color: "#5C5B98",
        fontFamily: "sans-serif",
      }}
    >
      Personal Details
    </h2>
  </div>
  {roleNameSelected=="Teacher" &&<Button
  variant="contained"
  color="primary"
  sx={{
    borderRadius: "4px",
    textTransform: "capitalize",
    color: "#fff !important",
  }}
  onClick={() => getPersonalSubDomainData()}
>
  Personal Website
</Button>}

</div>

          <div
            style={{
              display: "flex",
              //  justifyContent: "space-between",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <Features FeaturesData={UserDetailsData}/>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserDetails;
