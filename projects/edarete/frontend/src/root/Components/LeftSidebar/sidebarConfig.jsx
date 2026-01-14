import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";

const iconMapping = {
  CourseHome: <SchoolIcon sx={{ color: "#40E0D0" }} />, // Turquoise
  CourseDashboard: <DashboardIcon sx={{ color: "#FF6347" }} />,
};
const data = {
    features: {
      sidebarItems: [
        {
          title: "CourseHome",
          path: "/",
          icon: iconMapping["CourseHome"],
          permission: "CourseHome",
        },
        {
          title: "CourseDashboard",
          icon: iconMapping["CourseDashboard"],
          permission: "CourseDashboard",
          subNav: [
            {
              title: "Attendance",
              permission: "Attendance",
              path: "/Attendance",
            },
            {
              title: "Assignments",
              permission: "Assignments",
              path: "/Assignments",
            },
            {
              title: "Exams",
              permission: "Exams",
              path: "/Exams",
            },
            {
              title: "Grades",
              permission: "Grades",
              path: "/Grades",
            },
          ],
        },
        {
          title: "Attendance",
          permission: "Attendance",
          path: "/Attendance",
        },
        {
          title: "Assignments",
          permission: "Assignments",
          path: "/Assignments",
        },
        {
          title: "Settings",
          permission: "Settings",
          path: "/Settings",
        },
      ],
    },
  };
  
const config = {
    viewMode: {
      presentation: ["sidebar", "collapsible"],
      mode: ["view", "edit"],
      isOpen: true,
      mobileBreakpoint: "(max-width:768px)",
    },
    features: {
      tokenAuthentication: true,
      permission: true,
    },
  };
  
const appearance = {
    features: {
      styling: {
        background: "#f5f5f5",
        width: "280px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        logoWidth: "120px",
        logoHeight: "80px",
      },
    },
  };
  
export {data, config, appearance};