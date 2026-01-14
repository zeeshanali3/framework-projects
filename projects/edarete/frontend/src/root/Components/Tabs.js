import React, { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DefaultPage from "./defaultPage";
import StudentProgress from "./StudentProgress";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookComponent from "./BookComponent";
import Aggregate from "./Aggregate";
import { useDispatch, useSelector } from "react-redux";
import { GetclasscomponentAction } from "../Common/Store/Actions/General/GetActions/getclasscomponentAction.js";
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import { sideBarDataAction } from "../Common/Store/Actions/General/GetActions/getSideBarDataAction.js";
import { getRoleData, getTeacherData, gettaData, getAccessToken, getStudentData } from "../Utils/loginData/loginData.jsx";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Index from "../Pages/CRUDS/index.jsx"
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClassIcon from '@mui/icons-material/Class';
import WorkIcon from '@mui/icons-material/Work';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import SchoolIcon from '@mui/icons-material/School';
import GradedComponent from "../Components/GradedComponents/index"
import Lecture from "./Lecture/LectureComponent"
import LectureWiseAttendance from "./details/LectureWiseAttendance";
import Leaderboard from "./Leaderboard";
import CourseDashboard from "../Views/CourseDashboard";
import Quiz from "./Quiz";

const iconMapping = {
  'Assignment': <AssignmentIcon sx={{ color: '#FF6347' }} />,  // Tomato Red
  'Quiz': <QuizIcon sx={{ color: '#4682B4' }} />,  // Steel Blue
  'Final': <EventIcon sx={{ color: '#32CD32' }} />,  // Lime Green
  'Mid': <EventIcon sx={{ color: '#FFD700' }} />,  // Gold 
  'Announcement': <AnnouncementIcon sx={{ color: '#FF4500' }} />,  // Orange Red
  'Lecture': <ClassIcon sx={{ color: '#6A5ACD' }} />,  // Slate Blue
  'Project': <WorkIcon sx={{ color: '#FF69B4' }} />,  // Hot Pink
  'Lab': <WorkIcon sx={{ color: '#7B68EE' }} />,  // Medium Slate Blue
  'Book': <BookIcon sx={{ color: '#20B2AA' }} />,  // Light Sea Green
  'Progress': <BarChartIcon sx={{ color: '#FF8C00' }} />,  // Dark Orange
  'Aggregate': <PieChartIcon sx={{ color: '#8A2BE2' }} />,  // Blue Violet
  'CourseHome': <SchoolIcon sx={{ color: '#40E0D0' }} />,  // Turquoise
  "CourseDashboard": <DashboardIcon sx={{ color: '#FF6347' }} />,
  'QuizResult': <BarChartIcon sx={{ color: '#00BFFF' }} />,    // ✅ Deep Sky Blue for Quiz Result
  'AssignmentResult': <BarChartIcon sx={{ color: '#FF7F50' }} />,
  'LabResult': <BarChartIcon sx={{ color: '#9370DB' }} />,
  'default': <ClassIcon sx={{ color: '#000' }} />,  // Default icon
};


function ClassroomTabs({ classItem, courseName, isPublic = false, id }) {
  const { tab, tabName } = useParams(); // Get both tab index and tabName from URL
  const location = useLocation();
  const [components, setComponents] = useState([]);
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const navigate = useNavigate();
  const ActiveTab = useSelector((state) => state?.SIDERBARDATA.ActiveTab);
  const [value, setValue] = useState(Number(tab) || 0);
  const token = getAccessToken(loginData);

  const dispatch = useDispatch();
  const componentsCache = useRef({});
  const isInitialMount = useRef(true);
  const lastNavigatedPath = useRef('');
  const previousActiveTabRef = useRef(null); // ADD THIS to track changes
  const [isUrlSynced, setIsUrlSynced] = useState(false); // ADD THIS - track if URL has been synced
  
  const roleData = getRoleData(loginData);
  const { RoleId, RoleName, UserroleId } = roleData || {};
  const studentData = getStudentData(loginData);
  const Teacherdata = getTeacherData(loginData)
  const TaData = gettaData(loginData)
  console.log('token::loginData:', token, loginData, studentData, classItem, courseName, id);
  // Map component names to URL-friendly paths
  const getUrlPath = (componentName) => {
    const pathMap = {
      'Lecture': 'lectures',
      'Assignment': 'assignments',
      'Lab': 'labs',
      'Quiz': 'quizzes',
      'Final': 'finals',
      'Mid': 'mids',
      'Project': 'projects',
      'Book': 'books',
      'Progress': 'progress',
      'Aggregate': 'aggregate',
      'Announcement': 'announcements',
      'CourseDashboard': 'dashboard',
      'CourseHome': '',
      'Attendance': 'lectures',
      'QuizResult': 'quiz-results',
      'AssignmentResult': 'assignment-results',
      'LabResult': 'lab-results',
    };
    return pathMap[componentName];
  };

  // ✅ FIXED: Safely encode/decode course names
  const safeEncodeCourse = (name) => {
    if (!name) return '';
    try {
      return encodeURIComponent(name);
    } catch (e) {
      console.error('Failed to encode course name:', name, e);
      return name.replace(/[^a-zA-Z0-9]/g, '-'); // Fallback to safe characters
    }
  };

  const safeDecodeCourse = (encoded) => {
    if (!encoded) return '';
    try {
      return decodeURIComponent(encoded);
    } catch (e) {
      console.error('Failed to decode course name:', encoded, e);
      return encoded; // Return as-is if decode fails
    }
  };

  // Get component name from URL path
  const getComponentFromUrl = (urlPath) => {
    // Safely decode first
    let decodedPath = urlPath;
    try {
      decodedPath = decodeURIComponent(urlPath);
    } catch (e) {
      console.warn('Could not decode URL path:', urlPath);
    }

    const reverseMap = {
      'lectures': 'Lecture',
      'assignments': 'Assignment',
      'labs': 'Lab',
      'quizzes': 'Quiz',
      'finals': 'Final',
      'mids': 'Mid',
      'projects': 'Project',
      'books': 'Book',
      'progress': 'Progress',
      'aggregate': 'Aggregate',
      'announcements': 'Announcement',
      'dashboard': 'CourseDashboard',
      '': 'CourseHome',
      'quiz-results': 'QuizResult',
      'assignment-results': 'AssignmentResult',
      'lab-results': 'LabResult',
    };
    return reverseMap[decodedPath] || reverseMap[urlPath];
  };

  const getDataSource = () => {
    if (TaData && TaData.length > 0) {
      return TaData;
    } else if (studentData && studentData.length > 0) {
      return studentData;
    } else if (Teacherdata && Teacherdata.length > 0) {
      return Teacherdata;
    }
    return [studentData, TaData, Teacherdata];
  };
  const CourseId = getDataSource()?.find((enrollment) => enrollment?.CourseName === courseName)
  console.log('CourseId::', studentData);
  useEffect(() => {
    if (CourseId) {
      dispatch(isLoadingAction(true));
      dispatch(GetclasscomponentAction(token, CourseId.CourseId, isPublic,
        (response) => {
          console.log("Components response:", response);
          const filteredComponents =
            roleData.RoleName === 'Student'
              ? response?.return.filter(c => c.ComponentName !== 'Aggregate') || []
              : response?.return || [];
          setComponents(filteredComponents);
          componentsCache.current[id] = response || [];
          dispatch(isLoadingAction(false));

          let componentsArray = filteredComponents.map(item => {
            let component = {
              title: item.classcomponent_componentName,
              ComponentId: item.classcomponent_componentId,
              icon: iconMapping[item.classcomponent_componentName] || iconMapping['default'],
            };

            if (item.classcomponent_componentName === 'Lecture') {
              component.subNav = [{ title: 'Attendance' }];
            }

            return component;
          });

          // ✅ Check if components exist
          const quizComponent = filteredComponents.find(c => c.classcomponent_componentName === "Quiz");
          const assignmentComponent = filteredComponents.find(c => c.classcomponent_componentName === "Assignment");
          const labComponent = filteredComponents.find(c => c.classcomponent_componentName === "Lab");

          // ✅ Push results with IDs if available
          if (quizComponent) {
            componentsArray.push({
              title: "QuizResult",
              ComponentId: quizComponent.classcomponent_componentId,
              icon: iconMapping["QuizResult"],
            });
          }

          if (assignmentComponent) {
            componentsArray.push({
              title: "AssignmentResult",
              ComponentId: assignmentComponent.classcomponent_componentId,
              icon: iconMapping["AssignmentResult"],
            });
          }

          if (labComponent) {
            componentsArray.push({
              title: "LabResult",
              ComponentId: labComponent.classcomponent_componentId,
              icon: iconMapping["LabResult"],
            });
          }

          if (RoleName === "Student") {
            componentsArray = [
              {
                title: "CourseDashboard",
                icon: iconMapping["CourseDashboard"],
              },
              {
                title: "Announcement",
                icon: iconMapping["Quiz"],
              },
              ...componentsArray,
            ];
          }

          // ✅ Add CourseHome for non-students
          if (RoleName !== "Student") {
            componentsArray = [
              {
                title: "CourseHome",
                path: `/classroomHome/${courseName}/${CourseId.CourseId}`,
                icon: iconMapping["CourseHome"],
              },
              ...componentsArray,
            ];
          }

          console.log("componentsArray::", componentsArray);
          dispatch(sideBarDataAction(componentsArray));
        },
        (error) => {
          console.log("Error fetching components:", error);
          dispatch(isLoadingAction(false));
        }
      ));
    }
  }, [CourseId]);

  // Sync URL with ActiveTab when sidebar is clicked
  useEffect(() => {
    if (!ActiveTab || !CourseId) return;
    
    const componentName = ActiveTab.title || ActiveTab.ComponentName;
    if (!componentName) return;

    // Skip if URL hasn't been synced yet (initial load)
    if (!isUrlSynced) {
      console.log('Skipping navigation - URL not yet synced');
      return;
    }

    console.log('ActiveTab effect triggered:', { 
      componentName, 
      previousTab: previousActiveTabRef.current?.title,
      currentPath: location.pathname
    });

    const isNewSelection = previousActiveTabRef.current?.title !== componentName;

    console.log('Is new selection?', isNewSelection);

    if (!isNewSelection) {
      console.log('Not a new selection, skipping navigation');
      return;
    }

    const urlPath = getUrlPath(componentName);
    const encodedCourseName = safeEncodeCourse(courseName); // ✅ Use safe encoder
    const newPath = urlPath 
      ? `/classroomHome/${encodedCourseName}/${CourseId.CourseId}/${urlPath}`
      : `/classroomHome/${encodedCourseName}/${CourseId.CourseId}`;

    if (location.pathname !== newPath) {
      console.log('✅ Sidebar clicked, navigating to:', newPath);
      lastNavigatedPath.current = newPath;
      navigate(newPath);
    }

    previousActiveTabRef.current = { ...ActiveTab, title: componentName };
  }, [ActiveTab, CourseId, courseName, navigate, location.pathname, isUrlSynced]);

  // Sync ActiveTab with URL on mount/refresh - CRITICAL FIX
  useEffect(() => {
    if (!components.length || !CourseId) {
      console.log('Waiting for components to load...');
      return;
    }

    console.log('URL sync effect triggered, pathname:', location.pathname);

    const pathSegments = location.pathname.split('/');
    const urlTabName = pathSegments[pathSegments.length - 1];
    const decodedUrlTabName = safeDecodeCourse(urlTabName); // ✅ Use safe decoder
    const componentName = getComponentFromUrl(decodedUrlTabName);
    
    console.log('Component from URL:', { 
      urlTabName, 
      decodedUrlTabName,
      componentName,
    });

    let finalComponentName;
    
    if (componentName) {
      finalComponentName = componentName;
      console.log('✅ Using component from URL mapping:', componentName);
    } else if (decodedUrlTabName === String(CourseId.CourseId)) {
      finalComponentName = RoleName === 'Student' ? 'CourseDashboard' : 'CourseHome';
      console.log('✅ On base URL, using default:', finalComponentName);
    } else {
      console.warn('⚠️ Could not map URL to component:', decodedUrlTabName);
      return;
    }

    const sidebarData = components.find(c => c.classcomponent_componentName === finalComponentName);
    
    const tabToSet = {
      title: finalComponentName,
      ComponentName: finalComponentName,
      ComponentId: sidebarData?.classcomponent_componentId,
    };
    
    console.log('✅ Setting ActiveTab from URL:', tabToSet);
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tabToSet });
    previousActiveTabRef.current = { ...tabToSet };

    setIsUrlSynced(true);

    if (isInitialMount.current) {
      console.log('✅ Marking initial mount as complete');
      isInitialMount.current = false;
    }
  }, [location.pathname, components, CourseId, RoleName, dispatch]);

  const renderTabContent = () => {
    const ComponentName = ActiveTab?.title || ActiveTab?.ComponentName;
    const ComponentId = ActiveTab?.ComponentId;

    console.log('Rendering:', { ComponentName, ComponentId, isUrlSynced });

    // Wait for URL sync to complete before rendering
    if (!isUrlSynced || !ComponentName) {
      return <CircularProgress />;
    }

    if (ComponentName === "Attendance") {
      return <LectureWiseAttendance CourseId={CourseId} />;
    }

    switch (ComponentName) {
      case 'Assignment':
      case 'Lab':
      case 'Quiz':
      case 'Final':
      case 'Mid':
      case 'Project':
        return (
          <GradedComponent
            key={ComponentId}
            CourseId={CourseId}
            courseName={courseName}
            componentID={ComponentId}
            componentName={ComponentName}
            classItem={classItem}
            roleName={RoleName}
            roleID={RoleId}
            userroleID={UserroleId}
            isPublic={isPublic}
            components={components}
          />
        );
      case 'QuizResult':
        return (
          <Index
            selectedComponent="QuizResult"
            params={`&course_id=${CourseId.CourseId}&componentID=${ComponentId}`}
          />
        );
      case 'AssignmentResult':
        return (
          <Index
            selectedComponent="AssignmentResult"
            params={`&course_id=${CourseId.CourseId}&componentID=${ComponentId}`}
          />
        );
      case 'LabResult':
        return (
          <Index
            selectedComponent="LabResult"
            params={`&course_id=${CourseId.CourseId}&componentID=${ComponentId}`}
          />
        );
      case 'Lecture':
        return (
          <Lecture
            componentID={ComponentId}
            CourseId={CourseId}
            courseName={courseName}
            componentName={ComponentName}
            classItem={classItem}
            roleName={RoleName}
            roleID={RoleId}
            userroleID={UserroleId}
            isPublic={isPublic}
            components={components}
          />
        );
      case 'Book':
        return (
          <BookComponent
            componentID={ComponentId}
            componentName={ComponentName}
            isPublic={isPublic}
          />
        );
      case 'Progress':
        return <StudentProgress id={CourseId.CourseId} />;
      case 'Aggregate':
        return <Aggregate id={CourseId.CourseId} />;
      case 'CourseHome':
        return (
          <DefaultPage
            componentID={ComponentId}
            id={CourseId.CourseId}
            componentName={ComponentName}
            classItem={classItem}
            roleName={RoleName}
            roleID={RoleId}
            userroleID={UserroleId}
          />
        );
      case 'Announcement':
        return <Quiz course={CourseId} />;
      case 'CourseDashboard':
        return (
          <CourseDashboard
            components={components}
            componentID={ComponentId}
            id={CourseId?.CourseId}
            componentName={ComponentName}
            classItem={classItem}
            roleName={RoleName}
            roleID={RoleId}
            userroleID={UserroleId}
          />
        );
      case 'Leaderboard':
        return <Leaderboard />;
      default:
        return (
          <CourseDashboard
            components={components}
            componentID={ComponentId}
            id={CourseId?.CourseId}
            componentName={ComponentName}
            classItem={classItem}
            roleName={RoleName}
            roleID={RoleId}
            userroleID={UserroleId}
          />
        );
    }
  };

  return (
    <>
      {renderTabContent()}
    </>
  );
}

export default ClassroomTabs;