import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LockIcon from '@mui/icons-material/Lock';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ListAltIcon from '@mui/icons-material/ListAlt';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import SecurityIcon from '@mui/icons-material/Security';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BookIcon from '@mui/icons-material/Book';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';
import WorkIcon from '@mui/icons-material/Work';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DescriptionIcon from '@mui/icons-material/Description';
import BugReportIcon from '@mui/icons-material/BugReport';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ClassIcon from '@mui/icons-material/Class';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FeedbackIcon from '@mui/icons-material/Feedback';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MicIcon from '@mui/icons-material/Mic';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DevicesIcon from '@mui/icons-material/Devices';
import CloudIcon from '@mui/icons-material/Cloud';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApiIcon from '@mui/icons-material/Api';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const iconMapping = {
  // Main Navigation
  Dashboard: <DashboardIcon sx={{ color: '#4CAF50' }} />,
  Profile: <AccountCircleIcon sx={{ color: '#2196F3' }} />,
  'API Tester': <ApiIcon sx={{ color: '#FF6347' }} />,
  
  // User Management
  Users: <PeopleIcon sx={{ color: '#FF9800' }} />,
  Admins: <SupervisorAccountIcon sx={{ color: '#9C27B0' }} />,
  Alumni: <SchoolOutlinedIcon sx={{ color: '#607D8B' }} />,
  Employees: <WorkIcon sx={{ color: '#795548' }} />,
  Roles: <SecurityIcon sx={{ color: '#E91E63' }} />,
  Permissions: <LockIcon sx={{ color: '#F44336' }} />,
  'Permission Groups': <GroupWorkIcon sx={{ color: '#FF5722' }} />,
  'Permission Groups Permissions': <AppRegistrationIcon sx={{ color: '#FF9800' }} />,
  'User Devices': <DevicesIcon sx={{ color: '#3F51B5' }} />,
  'User Device Notifications': <NotificationsIcon sx={{ color: '#00BCD4' }} />,
  'User Roles Designations Department': <AssignmentIndIcon sx={{ color: '#8BC34A' }} />,
  'User Role Designation Permissions': <SecurityIcon sx={{ color: '#CDDC39' }} />,
  "Timetable": <CalendarMonthIcon sx={{color: "#FF6347"}}/>,
  
  // Student Management
  Students: <SchoolIcon sx={{ color: '#4CAF50' }} />,
  Studentsemesters: <TimelineIcon sx={{ color: '#8BC34A' }} />,
  Studentsubmissions: <AssignmentIcon sx={{ color: '#FFC107' }} />,
  Studentsubmissionattachment: <AttachFileIcon sx={{ color: '#FF9800' }} />,
  Enrollements: <PersonAddIcon sx={{ color: '#2196F3' }} />,
  
  // Course Management
  Courses: <MenuBookIcon sx={{ color: '#4CAF50' }} />,
  'Course Requests': <DescriptionIcon sx={{ color: '#FF9800' }} />,
  Plannedcourses: <ScheduleIcon sx={{ color: '#9C27B0' }} />,
  Coursetimetablesschedule: <AccessTimeIcon sx={{ color: '#607D8B' }} />,
  Courseleaderboards: <EmojiEventsIcon sx={{ color: '#FFD700' }} />,
  Courseleaderboardsubcomponents: <TrendingUpIcon sx={{ color: '#FF6B35' }} />,
  Coursefeedbackform: <FeedbackIcon sx={{ color: '#E91E63' }} />,
  
  // CLO/PLO Management
  Clo: <PsychologyIcon sx={{ color: '#673AB7' }} />,
  Plo: <AssessmentIcon sx={{ color: '#3F51B5' }} />,
  Clomappingplo: <AccountTreeIcon sx={{ color: '#9C27B0' }} />,
  Classcomponent: <ClassIcon sx={{ color: '#795548' }} />,
  
  // Questions & Evaluations
  Questions: <QuizIcon sx={{ color: '#FF5722' }} />,
  Questionssolution: <CheckCircleIcon sx={{ color: '#4CAF50' }} />,
  Questionssolutions: <ListAltIcon sx={{ color: '#8BC34A' }} />,
  Questionevaluations: <GradeIcon sx={{ color: '#FFC107' }} />,
  Topicquestions: <ArticleIcon sx={{ color: '#FF9800' }} />,
  
  // Feedback Management
  Feedbackform: <RateReviewIcon sx={{ color: '#E91E63' }} />,
  Feedbackquestions: <QuizIcon sx={{ color: '#9C27B0' }} />,
  Feedbacks: <FeedbackIcon sx={{ color: '#FF5722' }} />,
  
  // Lecture Management
  Lecturesattendance: <RecordVoiceOverIcon sx={{ color: '#4CAF50' }} />,
  Lecturetopics: <MicIcon sx={{ color: '#2196F3' }} />,
  
  // System & Infrastructure
  Rooms: <RoomIcon sx={{ color: '#607D8B' }} />,
  Timeslots: <AccessTimeIcon sx={{ color: '#795548' }} />,
  Versions: <UpdateIcon sx={{ color: '#3F51B5' }} />,
  'Device Otp': <PhoneAndroidIcon sx={{ color: '#00BCD4' }} />,
  Registereddevices: <DeviceHubIcon sx={{ color: '#009688' }} />,
  Platforms: <CloudIcon sx={{ color: '#4CAF50' }} />,
  'Platform Versions': <StorageIcon sx={{ color: '#8BC34A' }} />,
  
  // Logs & Monitoring
  Errorlog: <BugReportIcon sx={{ color: '#F44336' }} />,
  'Crash Log': <ErrorIcon sx={{ color: '#E91E63' }} />,
  'Email Log': <EmailIcon sx={{ color: '#2196F3' }} />,
  'Error Log': <WarningIcon sx={{ color: '#FF9800' }} />,
  'Security Log': <SecurityIcon sx={{ color: '#4CAF50' }} />,
  
  // Academic Management
  Semesters: <TimelineIcon sx={{ color: '#9C27B0' }} />,
  Programs: <LibraryBooksIcon sx={{ color: '#3F51B5' }} />,
  Departments: <BusinessIcon sx={{ color: '#607D8B' }} />,
  Designations: <WorkIcon sx={{ color: '#795548' }} />,
  Disciplines: <DomainIcon sx={{ color: '#FF5722' }} />,
  Domains: <DomainIcon sx={{ color: '#4CAF50' }} />,
  Institutes: <BusinessIcon sx={{ color: '#2196F3' }} />,
  'Institute Domains': <AccountTreeIcon sx={{ color: '#8BC34A' }} />,
  
  // Submissions & Marks
  Subcomponents: <AssignmentIcon sx={{ color: '#FFC107' }} />,
  Subcomponentmarks: <GradeIcon sx={{ color: '#FF9800' }} />,
  
  // Communication & Notifications
  Notifications: <NotificationsIcon sx={{ color: '#E91E63' }} />,
  Chat: <ChatIcon sx={{ color: '#4CAF50' }} />,
  
  // Resources & Attachments
  Attachments: <AttachFileIcon sx={{ color: '#FF5722' }} />,
  Books: <BookIcon sx={{ color: '#795548' }} />,
  
  // Employee Management
  Employeedomain: <DomainIcon sx={{ color: '#3F51B5' }} />,
  Employeepreferedtimeslots: <ScheduleIcon sx={{ color: '#00BCD4' }} />,
  
  // Prerequisites & Requirements
  Prereqs: <DescriptionIcon sx={{ color: '#607D8B' }} />,
};

const data = {
  features: {
    sidebarItems: [
      {
        title: 'Dashboard',
        icon: iconMapping['Dashboard'],
        permission: ['dashboard', 'operations_list_attachments'],
        path: '/dashboard',
      },
      {
        title: "Calendar",
        icon: iconMapping["Timetable"],
        permission: ["view_permissions"],
        path: "/timetable",
      },
      {
        title: "API Tester",
        icon: iconMapping["API Tester"],
        permission: ["view_permissions"],
        path: "/api-tester",
      },
      // User Management Group
      {
        title: 'User Management',
        icon: iconMapping['Users'],
        path: '/Users-managements/Users',
        permission: [
          'view_users',
          'view_admins',
          'view_alumni',
          'view_employees',
          'view_roles',
          'view_permissions',
        ],
        subNav: [
          {
            title: 'Users',
            path: '/Users-managements/Users',
            permission: ['view_users'],
          },
          {
            title: 'Admins',
            path: '/Admins-managements/Admins',
            permission: ['view_admins'],
          },
          {
            title: 'Alumni',
            path: '/Alumni-managements/Alumni',
            permission: ['view_alumni'],
          },
          {
            title: 'Roles',
            path: '/Roles-managements/Roles',
            permission: ['view_roles'],
          },
          {
            title: 'Roles Designations Department',
            path: '/RolesDesignationsDepartment-managements/Roles_designations_department',
            permission: ['view_roles_designations_department'],
          },
          {
            title: 'Permissions',
            path: '/Permissions-managements/Permissions',
            permission: ['view_permissions'],
          },
          {
            title: 'Permission Groups',
            path: '/PermissionGroups-managements/Permission_groups',
            permission: ['view_permission_groups'],
          },
          {
            title: 'Permission Groups Permissions',
            path: '/PermissionGroupsPermissions-managements/Permission_groups_permissions',
            permission: ['view_permission_groups_permissions'],
          },
          {
            title: 'User Devices',
            path: '/UserDevices-managements/User_devices',
            permission: ['view_user_devices'],
          },
          {
            title: 'User Device Notifications',
            path: '/UserDeviceNotifications-managements/User_device_notifications',
            permission: ['view_user_device_notifications'],
          },
          {
            title: 'User Roles Designations Department',
            path: '/UserRolesDesignationsDepartment-managements/User_roles_designations_department',
            permission: ['view_user_roles_designations_department'],
          },
          {
            title: 'User Role Designation Permissions',
            path: '/UserRoleDesignationPermissions-managements/User_role_designation_permissions',
            permission: ['view_user_role_designation_permissions'],
          },
        ],
      },

      // Employee Management Group
      {
        title: 'Employee Management',
        icon: iconMapping['Employees'],
        path: '/Employees-managements/Employees',
        permission: ['view_employees', 'view_employeepreferedtimeslots'],
        subNav: [
          {
            title: 'Employees',
            path: '/Employees-managements/Employees',
            permission: ['view_employees'],
          },
          {
            title: 'Employee Preferred Time Slots',
            path: '/Employeepreferedtimeslots-managements/Employeepreferedtimeslots',
            permission: ['view_employeepreferedtimeslots'],
          },
        ],
      },
      // Student Management Group
      {
        title: 'Student Management',
        icon: iconMapping['Students'],
        path: '/Students-managements/Students',
        permission: [
          'view_students',
          'view_studentsemesters',
          'view_studentsubmissions',
          'view_studentsubmissionattachment',
        ],
        subNav: [
          {
            title: 'Students',
            path: '/Students-managements/Students',
            permission: ['view_students'],
          },
          {
            title: 'Student Semesters',
            path: '/Studentsemesters-managements/Studentsemesters',
            permission: ['view_studentsemesters'],
          },
          {
            title: 'Student Submissions',
            path: '/Studentsubmissions-managements/Studentsubmissions',
            permission: ['view_studentsubmissions'],
          },
          {
            title: 'Student Submission Attachments',
            path: '/Studentsubmissionattachment-managements/Studentsubmissionattachment',
            permission: ['view_studentsubmissionattachment'],
          },
          {
            title: 'Enrollments',
            path: '/Enrollements-managements/Enrollements',
            permission: ['view_enrollements'],
          },
        ],
      },
      // Academic Management Group
      {
        title: 'Academic Management',
        icon: iconMapping['Semesters'],
        path: '/Semesters-managements/Semesters',
        permission: [
          'view_semesters',
          'view_programs',
          'view_departments',
          'view_designations',
          'view_disciplines',
          'view_domains',
          'view_institutes',
        ],
        subNav: [
          {
            title: 'Semesters',
            path: '/Semesters-managements/Semesters',
            permission: ['view_semesters'],
          },
          {
            title: 'Programs',
            path: '/Programs-managements/Programs',
            permission: ['view_programs'],
          },
          {
            title: 'Departments',
            path: '/Departments-managements/Departments',
            permission: ['view_departments'],
          },
          {
            title: 'Designations',
            path: '/Designations-managements/Designations',
            permission: ['view_designations'],
          },
          {
            title: 'Disciplines',
            path: '/Disciplines-managements/Disciplines',
            permission: ['view_disciplines'],
          },
          {
            title: 'Institutes',
            path: '/Institutes-managements/Institutes',
            permission: ['view_institutes'],
          },
        ],
      },
      // Course Management Group
      {
        title: 'Course Management',
        icon: iconMapping['Courses'],
        path: '/Courses-managements/Courses',
        permission: [
          'view_courses',
          'view_course_requests',
          'view_plannedcourses',
          'view_coursetimetablesschedule',
          'view_courseleaderboards',
        ],
        subNav: [
          {
            title: 'Courses',
            path: '/Courses-managements/Courses',
            permission: ['view_courses'],
          },
          {
            title: 'Course Requests',
            path: '/CourseRequests-managements/Course_requests',
            permission: ['view_course_requests'],
          },
          {
            title: 'Planned Courses',
            path: '/Plannedcourses-managements/Plannedcourses',
            permission: ['view_plannedcourses'],
          },
          {
            title: 'Course Time Tables Schedule',
            path: '/Coursetimetablesschedule-managements/Coursetimetablesschedule',
            permission: ['view_coursetimetablesschedule'],
          },
          {
            title: 'Course Leaderboards',
            path: '/Courseleaderboards-managements/Courseleaderboards',
            permission: ['view_courseleaderboards'],
          },
          {
            title: 'Course Leaderboard Subcomponents',
            path: '/Courseleaderboardsubcomponents-managements/Courseleaderboardsubcomponents',
            permission: ['view_courseleaderboardsubcomponents'],
          },
          {
            title: 'Course Feedback Form',
            path: '/Coursefeedbackform-managements/Coursefeedbackform',
            permission: ['view_coursefeedbackform'],
          },
        ],
      },

      // CLO/PLO Management Group
      {
        title: 'CLO/PLO Management',
        icon: iconMapping['Clo'],
        path: '/Clo-managements/Clo',
        permission: [
          'view_clo',
          'view_plo',
          'view_clomappingplo',
          'view_classcomponent',
        ],
        subNav: [
          {
            title: 'CLO (Course Learning Outcomes)',
            path: '/Clo-managements/Clo',
            permission: ['view_clo'],
          },
          {
            title: 'PLO (Program Learning Outcomes)',
            path: '/Plo-managements/Plo',
            permission: ['view_plo'],
          },
          {
            title: 'CLO Mapping PLO',
            path: '/Clomappingplo-managements/Clomappingplo',
            permission: ['view_clomappingplo'],
          },
          {
            title: 'Class Components',
            path: '/Classcomponent-managements/Classcomponent',
            permission: ['view_classcomponent'],
          },
        ],
      },

      // System & Infrastructure Group
      {
        title: 'System & Infrastructure',
        icon: iconMapping['Rooms'],
        path: '/Rooms-managements/Rooms',
        permission: [
          'view_rooms',
          'view_timeslots',
          'view_versions',
          'view_device_otp',
          'view_registereddevices',
          'view_platforms',
        ],
        subNav: [
          {
            title: 'Rooms',
            path: '/Rooms-managements/Rooms',
            permission: ['view_rooms'],
          },
          {
            title: 'Time Slots',
            path: '/Timeslots-managements/Timeslots',
            permission: ['view_timeslots'],
          },
          {
            title: 'Versions',
            path: '/Versions-managements/Versions',
            permission: ['view_versions'],
          },
          {
            title: 'Device OTP',
            path: '/DeviceOtp-managements/Device_otp',
            permission: ['view_device_otp'],
          },
          {
            title: 'Registered Devices',
            path: '/Registereddevices-managements/Registereddevices',
            permission: ['view_registereddevices'],
          },
          {
            title: 'Platforms',
            path: '/Platforms-managements/Platforms',
            permission: ['view_platforms'],
          },
          {
            title: 'Platform Versions',
            path: '/PlatformVersions-managements/Platform_versions',
            permission: ['view_platform_versions'],
          },
        ],
      },
      {
        title: 'Domains Management',
        icon: iconMapping['Domains'],
        path: '/Domains-managements/Domains',
        permission: [
          'view_domains',
          'view_employeedomain',
          'view_institute_domains',
        ],
        subNav: [
          {
            title: 'Domains',
            path: '/Domains-managements/Domains',
            permission: ['view_domains', 'view_institute_domains'],
          },
          {
            title: 'Institute Domains',
            path: '/InstituteDomains-managements/Institute_domains',
            permission: ['view_institute_domains'],
          },
          {
            title: 'Employee Domains',
            path: '/Employeedomain-managements/Employeedomain',
            permission: ['view_employeedomain'],
          },
        ],
      },

      // Logs & Monitoring Group
      {
        title: 'Logs & Monitoring',
        icon: iconMapping['Errorlog'],
        path: '/Errorlog-managements/Errorlog',
        permission: [
          'view_errorlog',
          'view_crash_log',
          'view_email_log',
          'view_error_log',
          'view_security_log',
        ],
        subNav: [
          {
            title: 'Error Log',
            path: '/Errorlog-managements/Errorlog',
            permission: ['view_errorlog'],
          },
          {
            title: 'Crash Log',
            path: '/CrashLog-managements/Crash_log',
            permission: ['view_crash_log'],
          },
          {
            title: 'Email Log',
            path: '/EmailLog-managements/Email_log',
            permission: ['view_email_log'],
          },
          {
            title: 'System Error Log',
            path: '/ErrorLog-managements/Error_log',
            permission: ['view_error_log'],
          },
          {
            title: 'Security Log',
            path: '/SecurityLog-managements/Security_log',
            permission: ['view_security_log'],
          },
        ],
      },

      // Feedback Management Group
      {
        title: 'Feedback Management',
        icon: iconMapping['Feedbackform'],
        path: '/Feedbackform-managements/Feedbackform',
        permission: [
          'view_feedbackform',
          'view_feedbackquestions',
          'view_feedbacks',
        ],
        subNav: [
          {
            title: 'Feedback Forms',
            path: '/Feedbackform-managements/Feedbackform',
            permission: ['view_feedbackform'],
          },
          {
            title: 'Feedback Questions',
            path: '/Feedbackquestions-managements/Feedbackquestions',
            permission: ['view_feedbackquestions'],
          },
          {
            title: 'Feedbacks',
            path: '/Feedbacks-managements/Feedbacks',
            permission: ['view_feedbacks'],
          },
        ],
      },

      // Lecture Management Group
      {
        title: 'Lecture Management',
        icon: iconMapping['Lecturesattendance'],
        path: '/Lecturesattendance-managements/Lecturesattendance',
        permission: ['view_lecturesattendance', 'view_lecturetopics'],
        subNav: [
          {
            title: 'Lecture Attendance',
            path: '/Lecturesattendance-managements/Lecturesattendance',
            permission: ['view_lecturesattendance'],
          },
          {
            title: 'Lecture Topics',
            path: '/Lecturetopics-managements/Lecturetopics',
            permission: ['view_lecturetopics'],
          },
        ],
      },
      {
        title: 'Programs Management',
        icon: iconMapping['Programs'],
        path: '/Programs-managements/Programs',
        permission: ['view_programs'],
        subNav: [
          {
            title: 'Programs',
            path: '/Programs-managements/Programs',
            permission: ['view_programs'],
          },
        ],
      },

      // Questions & Evaluations Group
      {
        title: 'Questions & Evaluations',
        icon: iconMapping['Questions'],
        path: '/Questions-managements/Questions',
        permission: [
          'view_questions',
          'view_questionssolution',
          'view_questionssolutions',
          'view_questionevaluations',
          'view_topicquestions',
        ],
        subNav: [
          {
            title: 'Questions',
            path: '/Questions-managements/Questions',
            permission: ['view_questions'],
          },
          {
            title: 'Question Solutions',
            path: '/Questionssolution-managements/Questionssolution',
            permission: ['view_questionssolution'],
          },
          {
            title: 'Question Evaluations',
            path: '/Questionevaluations-managements/Questionevaluations',
            permission: ['view_questionevaluations'],
          },
          {
            title: 'Topic Questions',
            path: '/Topicquestions-managements/Topicquestions',
            permission: ['view_topicquestions'],
          },
        ],
      },

      // Submissions & Marks Group
      {
        title: 'Submissions & Marks',
        icon: iconMapping['Subcomponents'],
        path: '/Subcomponents-managements/Subcomponents',
        permission: ['view_subcomponents', 'view_subcomponentmarks'],
        subNav: [
          {
            title: 'Subcomponents',
            path: '/Subcomponents-managements/Subcomponents',
            permission: ['view_subcomponents'],
          },
          {
            title: 'Subcomponent Marks',
            path: '/Subcomponentmarks-managements/Subcomponentmarks',
            permission: ['view_subcomponentmarks'],
          },
        ],
      },

      // Communication & Notifications Group
      {
        title: 'Communication & Notifications',
        icon: iconMapping['Notifications'],
        path: '/Notifications-managements/Notifications',
        permission: ['view_notifications', 'view_chat'],
        subNav: [
          {
            title: 'Notifications',
            path: '/Notifications-managements/Notifications',
            permission: ['view_notifications'],
          },
          {
            title: 'Chat',
            path: '/Chat-managements/Chat',
            permission: ['view_chat'],
          },
        ],
      },

      // Resources & Attachments Group
      {
        title: 'Resources & Attachments',
        icon: iconMapping['Attachments'],
        path: '/Attachments-managements/Attachments',
        permission: ['view_attachments', 'view_books'],
        subNav: [
          {
            title: 'Attachments',
            path: '/Attachments-managements/Attachments',
            permission: ['view_attachments'],
          },
          {
            title: 'Books',
            path: '/Books-managements/Books',
            permission: ['view_books'],
          },
        ],
      },

      // Prerequisites & Requirements Group
      {
        title: 'Prerequisites & Requirements',
        icon: iconMapping['Prereqs'],
        path: '/Prereqs-managements/Prereqs',
        permission: ['view_prereqs'],
        subNav: [
          {
            title: 'Prerequisites',
            path: '/Prereqs-managements/Prereqs',
            permission: ['view_prereqs'],
          },
        ],
      },

      {
        title: 'Profile',
        icon: iconMapping['Profile'],
        path: '/profile/account',
        permission: ['profile', 'operations_account'],
        subNav: [
          {
            title: 'Account',
            path: '/profile/account',
            permission: ['account', 'operations_account'],
          },
          {
            title: 'Security',
            path: '/profile/security',
            permission: ['security', 'operations_security'],
          },
          {
            title: 'Privacy Policy',
            path: '/profile/privacy-policy',
            permission: ['privacy_policy', 'operations_privacy_policy'],
          },
        ],
      },
    ],
  },
  onSelect: selectedTab => {
    console.log(selectedTab);
  },
};

const config = {
  viewMode: {
    presentation: ['sidebar', 'collapsible'],
    mode: ['view', 'edit'],
    isOpen: true,
    mobileBreakpoint: '(max-width:768px)',
  },
  features: {
    tokenAuthentication: true,
    permission: true,
  },
};

const appearance = {
  features: {
    styling: {
      background: '#f5f5f5',
      width: '300px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      logoWidth: '120px',
      logoHeight: '80px',
      fontSize: '14px',
      fontSizeSmall: '13px',
      fontWeight: 500,
      activeFontWeight: 600,
      borderRadius: '8px',
      light: {
        background: '#f5f5f5',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        activeTextColor: '#4C49ED',
        inactiveTextColor: '#5C5B98',
        activeBackgroundColor: 'rgba(76, 73, 237, 0.12)',
        hoverBackgroundColor: 'rgba(76, 73, 237, 0.08)',
        accentColor: '#4C49ED',
        secondaryAccentColor: '#FF6347',
      },
      dark: {
        background: '#1E1E2F',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
        activeTextColor: '#C7C6FF',
        inactiveTextColor: '#A5A4C4',
        activeBackgroundColor: 'rgba(76, 73, 237, 0.25)',
        hoverBackgroundColor: 'rgba(76, 73, 237, 0.15)',
        accentColor: '#6C63FF',
        secondaryAccentColor: '#FF8571',
      },
    },
  },
};
export { data, config, appearance };
