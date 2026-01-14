import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { ThemeProvider } from '../context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Keep Login and OTP as immediate imports for fast initial render
import Login from './Pages/General/Login/Page';
import LoginPage from './auth/LoginPage';
import OtpPage from "./auth/OTP";
import LoadingOverlay from './Components/Loading/LoadingOverLay';
import ErrorPage from './Pages/General/404';
import { routesName } from "./routes/adminConstants";
import { data, config, appearance } from "./Utils/Props/sidebarConfig";
import ClassroomLandingPage from './Components/classroomlandingPage';
// Lazy load all other components
const Settings = lazy(() => import('./Pages/General/Settings/settings/account'));
const Sidebar = lazy(() => import('./Components/LeftSidebar/index'));
const TopNavbar = lazy(() => import('./Components/TopNavbar/index'));
const CRUDS = lazy(() => import('./Pages/CRUDS/index'));
const PermissionManager = lazy(() => import('./Components/Permissions/index'));
const AdminDashboard = lazy(() => import('./Views/AdminDashboard/UniAdminDashboard'));
const Super_Admin_Dashboard = lazy(() => import("./Pages/Dashboards/dashboards").then(module => ({ default: module.Super_Admin_Dashboard })));
const IT_Dashboard = lazy(() => import("./Pages/Dashboards/dashboards").then(module => ({ default: module.IT_Dashboard })));
const NoDashboardFallback = lazy(() => import("./Pages/Dashboards/NoDashboard/noDashboard"));
const Graph = lazy(() => import("./Components/Graph/GraphBuilder"));
const Messenger = lazy(() => import("./Components/Messenger/Messenger"));
const Taskboard = lazy(() => import("./Pages/TaskBoard/index"));
const FileEditor = lazy(() => import("./Pages/FileEditor/index"));
const UserDetails = lazy(() => import("./Components/AdminComponent/UserDetails/UserDetails"));
const Calendar = lazy(() => import("./Components/AdminComponent/Calender/TimeTable"));
const ApiDocumentation = lazy(() => import("./Components/ApiDocumentation/components/Workspace/Request/RequestPanel"));
const ApiTester = lazy(() => import("./Pages/ApiTester/index"));
// const DatabaseSchemaFlow = lazy(() => import("./Pages/General/erdDiagram"));
const StudentDashboard = lazy(() => import("./Views/StudentDashboard"));
const StudentSidebar = lazy(() => import("./Components/LeftSidebarStudent/index"));

const AssignmentDetails = lazy(() => import("./Components/details/assignmentdetailIndex"));
const PublicPage = lazy(() => import("./Components/PublicPage"));
const ForgotPasswordForm = lazy(() => import("./Components/forgetPassword/forgetPassword"));
const PendingClasses = lazy(() => import("./Components/PendingClasses"));
const Quiz = lazy(() => import("./Components/Quiz"));

// Main App Component
const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Router>
  );
};

// Wrapper route to pass URL param as selectedComponent to CRUDS
const CRUDSRoute = () => {
  const location = useLocation();
  const pathSegments = (location?.pathname || '').split("/");
  const lastSegmentRaw = pathSegments[pathSegments.length - 1] || '';
  const lastPathSegment = lastSegmentRaw.split("&");
  return (
    <Suspense fallback={<LoadingOverlay isLoading={true} />}>
      <CRUDS selectedComponent={lastPathSegment[0]} />
    </Suspense>
  );
};

const AppRoutes = () => {
  const mainData = useSelector((state) => state.main);
  const { currentUser, userSelectedRole, isLoading, accesstoken } = mainData;
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [isRehydrated, setIsRehydrated] = useState(false);
  const pathSegments = location.pathname.split("/");
  const firstPathSegment = pathSegments[1];
  const lastPathSegment = pathSegments[pathSegments.length - 1].split("&");

  const isStudent = userSelectedRole?.role_name === 'Student';

  // Wait for Redux persist to rehydrate
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRehydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Role-based route protection
  useEffect(() => {
    if (!isRehydrated) return;

    const publicPaths = ['/', '/adminLogin', '/studentLogin', '/auth/otp', '/error'];
    const isPublicPath = publicPaths.some(path => location.pathname.startsWith(path));

    // Define student-specific routes
    const studentRoutes = [
      routesName.StudentDashboard,
      routesName.classroomHome,
      routesName.assignmentDetails,
      routesName.publicpage,
      routesName.forgetpassword,
      routesName.pendingClass,
      '/student'
    ];

    const isStudentRoute = studentRoutes.some(route => location.pathname.startsWith(route));

    // Check if accessing admin routes (routes that are not student routes and not public)
    const isAdminRoute = !isPublicPath && !isStudentRoute;

    console.log('Route check:', {
      pathname: location.pathname,
      isStudent,
      isStudentRoute,
      isAdminRoute,
      hasToken: !!accesstoken
    });

    // If no access token and trying to access protected route
    if (!isPublicPath && !accesstoken) {
      console.log('No access token, redirecting to login');
      navigate('/', { replace: true });
      return;
    }

    // If student tries to access admin routes
    if (accesstoken && isStudent && isAdminRoute) {
      console.log('Student trying to access admin route, redirecting to student login');
      navigate('/studentLogin', { replace: true });
      return;
    }

    // If admin/non-student tries to access student routes
    if (accesstoken && !isStudent && isStudentRoute) {
      console.log('Admin trying to access student route, redirecting to admin login');
      navigate('/adminLogin', { replace: true });
      return;
    }
  }, [location.pathname, accesstoken, isStudent, isRehydrated, navigate]);
  // Admin Routes
  const adminRoutes = [
    { path: "/dashboard", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><AdminDashboard /></Suspense> },
    { path: "/api-documentation", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ApiDocumentation /></Suspense> },
    { path: "/api-tester", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ApiTester /></Suspense> },
    { path: "/graph", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><Graph /></Suspense> },
    { path: "/taskboard", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><Taskboard /></Suspense> },
    { path: "/fileeditor", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><FileEditor /></Suspense> },
    { path: "/messenger", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><Messenger /></Suspense> },
    { path: "/permission", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><PermissionManager /></Suspense> },
    { path: "/user-details", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><UserDetails /></Suspense> },
    { path: "/timetable", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><Calendar /></Suspense> },
    // { path: "/erdDisplay", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><DatabaseSchemaFlow /></Suspense> },
    { path: "/profile/*", element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><Settings /></Suspense> },
    // Support both /cruds?component=Name and /cruds/Name/*
    { path: "/cruds", element: <CRUDSRoute /> },
  ];

  // Student Routes
  const studentRoutes = [
    { path: routesName.StudentDashboard, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><StudentDashboard /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/lectures`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/assignments`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/quizzes`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/labs`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/announcements`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/dashboard`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/quiz-results`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/assignment-results`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/lab-results`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.classroomHome}/:courseName/:id/grades`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense> },
    { path: `${routesName.assignmentDetails}/:courseName/:id/:SubComponentId`, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><AssignmentDetails /></Suspense> },
    { path: routesName.publicpage, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><PublicPage /></Suspense> },
    { path: routesName.forgetpassword, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><ForgotPasswordForm /></Suspense> },
    { path: routesName.pendingClass, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><PendingClasses /></Suspense> },
    { Path: routesName.studentAnnouncement, element: <Suspense fallback={<LoadingOverlay isLoading={true} />}><Quiz /></Suspense> },
  ];

  // Public Routes
  const publicRoutes = [
    { path: "/", element: <Navigate to="/studentLogin" replace /> },
    { path: "/adminLogin", element: <LoginWrapper /> },
    { path: "/studentLogin", element: <LoginPage /> },
    { path: "/auth/otp", element: <OtpPage /> },
    { path: "/error", element: <ErrorPage /> },
  ];

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!isRehydrated) {
      return <LoadingOverlay isLoading={true} />;
    }

    if (isLoading) return <LoadingOverlay isLoading={isLoading} />;

    if (!currentUser || !accesstoken) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    const role = userSelectedRole?.role_name;

    switch (role) {
      case 'Super Admin':
        return <Suspense fallback={<LoadingOverlay isLoading={true} />}><Super_Admin_Dashboard /></Suspense>;
      case 'Admin':
        return <Suspense fallback={<LoadingOverlay isLoading={true} />}><AdminDashboard /></Suspense>;
      case 'IT Admin':
        return <Suspense fallback={<LoadingOverlay isLoading={true} />}><IT_Dashboard /></Suspense>;
      default:
        return <Suspense fallback={<LoadingOverlay isLoading={true} />}><NoDashboardFallback /></Suspense>;
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarActive(prev => !prev);
  };

  // Render the main layout with sidebar
  const renderLayout = (children) => (
    <Box sx={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <Box
          sx={{
            width: isSidebarActive
              ? (isMobile ? "100%" : 300)
              : 0,
            flexShrink: 0,
            transition: 'width 0.3s ease-in-out',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1220,
          }}
        >
          {isStudent ? (
            <StudentSidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />
          ) : (
            <Sidebar
              data={data}
              config={{ ...config, viewMode: { isOpen: isSidebarActive } }}
              appearance={appearance}
              toggleActive={toggleSidebar}
              setIsOpen={setIsSidebarActive}
            />
          )}
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            overflowX:"hidden",
            ml: 0,
            transition: (theme) =>
              theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <TopNavbar toggleSidebar={toggleSidebar} />
          {children}
        </Box>
      </Suspense>
    </Box>
  );

  // Show loading while rehydrating
  if (!isRehydrated) {
    return <LoadingOverlay isLoading={true} />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route, index) => (
        <Route key={`public-${index}`} path={route.path} element={route.element} />
      ))}

      {/* Top-level StudentDashboard route using absolute constant to avoid falling into CRUDS */}
      <Route
        path={routesName.StudentDashboard}
        element={
          accesstoken ? (
            isStudent ? (
              renderLayout(<Suspense fallback={<LoadingOverlay isLoading={true} />}><StudentDashboard /></Suspense>)
            ) : (
              <Navigate to="/adminLogin" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Admin Routes */}
      <Route
        path="/*"
        element={
          accesstoken ? (
            !isStudent ? (
              renderLayout(
                <Routes>
                  <Route path="/dashboard" element={renderDashboard()} />
                  {adminRoutes.map((route, index) => (
                    <Route key={`admin-${index}`} path={route.path} element={route.element} />
                  ))}
                  {/* Support legacy single-segment CRUD paths like /Users */}
                  <Route path=":componentName/*" element={<CRUDSRoute />} />
                  <Route path=":componentName" element={<CRUDSRoute />} />
                  {/* Fallback to error page for unknown admin paths */}
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              )
            ) : (
              <Navigate to="/studentLogin" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/*"
        element={
          accesstoken ? (
            isStudent ? (
              renderLayout(
                <Routes>
                  <Route path="/" element={<Navigate to={routesName.StudentDashboard} replace />} />
                  {studentRoutes.map((route, index) => (
                    <Route key={`student-${index}`} path={route.path} element={route.element} />
                  ))}
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              )
            ) : (
              <Navigate to="/adminLogin" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Direct classroom routes for sidebar navigation - Add all tab routes */}
      <Route
        path={`${routesName.classroomHome}/:courseName/:id`}
        element={
          accesstoken ? (
            isStudent ? (
              renderLayout(<Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense>)
            ) : (
              <Navigate to="/adminLogin" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path={`${routesName.classroomHome}/:courseName/:id/:tabName`}
        element={
          accesstoken ? (
            isStudent ? (
              renderLayout(<Suspense fallback={<LoadingOverlay isLoading={true} />}><ClassroomLandingPage /></Suspense>)
            ) : (
              <Navigate to="/adminLogin" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

// Login Wrapper Component
const LoginWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (email, role) => {
    // After successful login, determine where to redirect
    const from = location.state?.from?.pathname ||
      (role === 'Student' ? routesName.StudentDashboard : '/dashboard');
    navigate(from, { replace: true });
  };

  return <Login onLogin={handleLogin} />;
};

export default App;