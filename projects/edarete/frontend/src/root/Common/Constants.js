export const constants = {
  base_url: import.meta.env.VITE_BASE_URL, //live
  socket_url: import.meta.env.VITE_SOCKET_URL, //live
  // base_url: 'http://192.168.5.27:3000/api', //live
  // socket_url: 'http://192.168.5.27:3000', //live
  // base_url: 'http://192.168.1.119:3000/api', //local
  // socket_url: 'http://192.168.1.119:3000', //local

  step1: '&step=1',
  step2: '&step=2',
  version: '?version=1.0',
  all: '/all',
  list: '/list',
  update: '/update',
  add: '/add',
  delete: '/delete',
  dropDown: '/dropdown',
  groups: '/groups',
  errors: '/errors',
  get: '/get',
  qrCode: '/get/qrcode',

  login_step_2_api: '/loginStep2',
  react_base_url: 'https://scholarspace.online',
  react_domain: 'scholarspace.online',

  login_api: '/login',
  signup: '/signup',
  logout: '/logout',

  // classcomponent
  getclasscomponent: '/crud/classcomponent',
  addclasscomponent: '/crud/classcomponent',
  deleteclasscomponent: '/crud/classcomponent',
  update_classcomponent: '/crud/classcomponent',
  update_question_marks_ans: '/questionevaluations',

  // subcomponent
  getsubcomponent: '/crud/subcomponents',
  addsubcomponent: '/crud/subcomponents',
  updatesubcomponent: '/crud/subcomponents',
  deletesubcomponent: '/crud/subcomponents',
  addtemplatesubcomponent: '/crud/TemplateSubcomponents',
  gettemplatesubcomponent: '/crud/TemplateSubcomponents',

  // chats
  addchats: '/chats',
  getchats: '/chats',

  // student in courses
  getstudentincourse: '/studentsbycourse',
  // lecture attendance
  addlectureattendace: '/lectureattendance',
  // course calender
  getcoursetimetable: '/timetable',

  // course student enrolled
  getstudentcourseenrolled: '/enrollementsById',
  //  stundet submisson
  addsubdentsubmission: '/studentsubmission',
  getstudentsubmission: '/studentSubmission',
  studentSubmissionattachments: '/studentSubmission',
  // attachments
  addattachments: '/attachments',

  // subcomponent marks
  addsubcomponentmarks: '/subcomponentmarks',
  getsubcomponentmarks: '/subcomponentmarks',
  // get sub attach
  getsubattachments: '/allStudentSubmissions',
  deletestudentsubmission: '/DeleteStudentsubmission',

  // get student marks
  getstudentmarks: '/subcomponentmarks',
  updatestudentmarks: '/subcomponentmarks',

  // book
  getbook: '/books',
  deletebook: '/books',
  addbook: '/books',
  updatebook: '/books',

  // student enrollement
  addstudentenrollement: '/enrollements',
  getstudentenrollement: '/plannedcourses',

  // prefferedSlot
  addprefferedSlot: '/prefferedSlot',

  // Time slot
  timeslot: '/timeslots',

  // Attendance
  studentattendance: '/studentAttendance',

  // Quiz List
  announcement: '/announcement',

  // Public page
  public_page: '/publicPage',

  // clos
  clos: '/clos',

  // student perfromance
  individualstudentPerformance: '/getStudentPerformance',

  // pending courses
  pendingcourses: '/appliedcoursesbystudentUserId',

  // whole class perfromance
  wholeclassperformance: '/getClassPerformance',

  // question chatgpt integration
  questionrephrase: '/rephraseQuestion',

  // student by course id
  studentbycourseid: '/studentsbycourse',

  // class aggregate
  getclassaggregate: '/getclassaggregate',

  getpersonalsubdomain: '/personalSubdomain',

  // question
  question: '/questions',

  get_question_by_subcomponent_id: '/questionsbysubcomponent',

  addStudentQuestion: '/questionevaluations',
  getclographdata: '/get/clo/graph/data',

  activity_outcome: '/activityOutcome',
  activities: '/activities',
  calendarEvents: '/calendarEvents',
  maxMinAggregate: '/get/max/min/aggregate',
  supportIssue: '/supportTask',

  subcomponentGradeSheet: '/subComponentGradeSheet/',

  getLeaderBoard: '/Leaderboard',
  addLeaderBoard: '/Leaderboard',
  getLeaderboardResult: '/leaderboardResult',
  getSubcomponentByCourseId: '/subcomponentsByCourse',
  updateCourseLeaderboard: '/updateCourseLeaderboard',
  updateGroupName: '/updateGroupName',
  groupMembers: '/groupmembers',
  email: '/email',
  log: '/log',
  api_documentation: '/documentation',

  // ----- Pulled from ScholarSpace -----
  get_room: '/rooms',
  get_coursetimetableschedules: '/coursetimetable',
  get_courses: '/offeredcourses',
  get_courses_count: '/courseCount',
  get_semesters: '/semesters',
  add_timetable: '/coursetimetableschedules',
  filter: '/filter',

  get_otp: '/login?version=1.0&step=1',
  verify_otp: '/login?version=1.0&step=2',
  users_role_info: '/users_role_info',
  //login
  login: '/login',
  login2: '/login',
  info: '/info',
  crud: '/crud',

  // Users
  users: '/users',

  // Admin Dashboard
  get_admin_dashboard_data: '/admin/dashboard',

  // User Devices
  user_devices: 'devices',

  // Attachments
  attachments: '/attachments',

  // Chatting Group Members
  chatting_group_members: '/chatting_group_members',

  // Chatting Groups
  chatting_groups: '/chatting_groups',

  // Departments
  departments: '/departments',

  // Designations
  designations: '/designations',

  // Messages
  messages: '/messages',

  // Notifications
  notifications: '/notifications',

  // Permission Groups
  permission_groups: '/permission_groups',

  // Permission Groups Permissions
  permission_groups_permissions: '/permission_groups_permissions',

  // Permissions
  permissions: '/permissions',

  // Platform Versions
  platform_versions: '/platform_versions',

  // Platforms
  platforms: '/platforms',

  // Roles
  roles: '/roles',

  // Roles Designations Department
  roles_designations_department: '/roles_designations_department',

  // Task Flow Steps
  task_flow_steps: '/task_flow_steps',

  // Task Flows
  task_flows: '/task_flows',

  // Task History
  task_history: '/task_history',

  // Tasks
  tasks: '/tasks',

  // Templates
  templates: '/templates',

  // User Device Notifications
  user_device_notifications: '/user_device_notifications',

  // User Devices
  luser_devices: '/user_devices',

  // User Role Designation Permissions
  user_role_designation_permissions: '/user_role_designation_permissions',

  // User Roles Designations Department
  user_roles_designations_department: '/user_roles_designations_department',
};

export default constants;

// const login_api =   constants.base_url+constants.login_api;
const login_api = constants.base_url + constants.login_api;
const logout = constants.base_url + constants.logout;
const reactDomain = constants.react_domain;
// 2 way auth
const login_step_2_api = constants.base_url + constants.login_step_2_api;
// class component
const getclasscomponent = constants.base_url + constants.getclasscomponent;
const addclasscomponent = constants.base_url + constants.addclasscomponent;
const deleteclasscomponent =
  constants.base_url + constants.deleteclasscomponent;
const update_classcomponent =
  constants.base_url + constants.update_classcomponent;
const updateGroupName = constants.base_url + constants.updateGroupName;

const update_question_marks_ans =
  constants.base_url + constants.update_question_marks_ans;

// sub component
const getTemplateSubcomponent =
  constants.base_url + constants.gettemplatesubcomponent;
const getsubcomponent = constants.base_url + constants.getsubcomponent;
const addsubcomponent = constants.base_url + constants.addsubcomponent;
const addTemplateSubcomponent =
  constants.base_url + constants.addtemplatesubcomponent;
const updatesubcomponent =
  constants.base_url + constants.updatesubcomponent;
const deletesubcomponent =
  constants.base_url + constants.deletesubcomponent;
const groupMembers = constants.base_url + constants.groupMembers;

// chats
const addchats = constants.base_url + constants.addchats;
const getchats = constants.base_url + constants.getchats;
// student in courses
const getstudentincourse =
  constants.base_url + constants.getstudentincourse;
// lecture attendance
const addlectureattendace =
  constants.base_url + constants.addlectureattendace;
// course calender
const getcoursetimetable =
  constants.base_url + constants.getcoursetimetable;
// course student enrolled
const getstudentcourseenrolled =
  constants.base_url + constants.getstudentcourseenrolled;
// student submission
const addsubdentsubmission =
  constants.base_url + constants.addsubdentsubmission;
const getstudentsubmission =
  constants.base_url + constants.getstudentsubmission;
// attachments
const addattachments = constants.base_url + constants.addattachments;
// sub component marks
const addsubcomponentmarks =
  constants.base_url + constants.addsubcomponentmarks;
const getsubcomponentmarks =
  constants.base_url + constants.getsubcomponentmarks;
// get ssub attach

const getsubattachments = constants.base_url + constants.getsubattachments;

// student submission attachments
const studentSubmissionattachments =
  constants.base_url + constants.studentSubmissionattachments;
// delete student submission
const deletestudentsubmission =
  constants.base_url + constants.deletestudentsubmission;
// get student marks
const getstudentmarks = constants.base_url + constants.getstudentmarks;
const updatestudentmarks =
  constants.base_url + constants.updatestudentmarks;

// book
const getbook = constants.base_url + constants.getbook;
const deletebook = constants.base_url + constants.deletebook;
const addbook = constants.base_url + constants.addbook;
const updatebook = constants.base_url + constants.updatebook;

// student enrollemnts
const addstudentenrollement =
  constants.base_url + constants.addstudentenrollement;
const getstudentenrollement =
  constants.base_url + constants.getstudentenrollement;
const CalendarEvents = constants.base_url + constants.calendarEvents;

// Prefered time slot
const addprefferedSlot = constants.base_url + constants.addprefferedSlot;

// Time SLot

const timeslot = constants.base_url + constants.timeslot;

// Attendance

const studentattendance = constants.base_url + constants.studentattendance;

// base

//  const base_url_for_public_page = constants.react_base_url;
const base_url_for_public_page = constants.react_base_url + '/auth/login';

// public

const public_page = constants.base_url + constants.public_page;

// clos
const clos = constants.base_url + constants.clos;

// individua student perfromance
const individualstudentPerformance =
  constants.base_url + constants.individualstudentPerformance;

// individua student perfromance
const pendingcourses = constants.base_url + constants.pendingcourses;

// whole class api
const wholeclassperformance =
  constants.base_url + constants.wholeclassperformance;

// Question rephrase
const questionrephrase = constants.base_url + constants.questionrephrase;

// student by course
const studentbycourseid = constants.base_url + constants.studentbycourseid;

// class aggregate
const getclassaggregate = constants.base_url + constants.getclassaggregate;
const getPersonalSubDomain =
  constants.base_url + constants.getpersonalsubdomain;

// Question

const question = constants.base_url + constants.question;

// question by sub component id
const get_question_by_subcomponent_id =
  constants.base_url + constants.get_question_by_subcomponent_id;

// add student queston
const addStudentQuestion =
  constants.base_url + constants.addStudentQuestion;

const getclographdata = constants.base_url + constants.getclographdata;
const activityOutcome = constants.base_url + constants.activity_outcome;
const activities = constants.base_url + constants.activities;
const maxMinAggregate = constants.base_url + constants.maxMinAggregate;
const base_url = constants.base_url;
const supportIssue = constants.base_url + constants.supportIssue;
const subcomponentGradeSheet = base_url + constants.subcomponentGradeSheet;
const addLeaderBoard = base_url + constants.addLeaderBoard;
const getLeaderBoard = base_url + constants.getLeaderBoard;
const getSubcomponentByCourseId =
  base_url + constants.getSubcomponentByCourseId;
const getLeaderBoardResult = base_url + constants.getLeaderboardResult;
const updateCourseLeaderboard =
  base_url + constants.updateCourseLeaderboard;

export {
  base_url,
  supportIssue,
  base_url_for_public_page,
  reactDomain,
  public_page,
  login_api,
  logout,
  // Otp Auth
  login_step_2_api,

  getclasscomponent,
  addclasscomponent,
  deleteclasscomponent,
  update_classcomponent,
  update_question_marks_ans,
  // subcomponent
  getsubcomponent,
  addsubcomponent,
  updatesubcomponent,
  deletesubcomponent,
  addTemplateSubcomponent,
  getTemplateSubcomponent,
  // chats
  addchats,
  getchats,

  // student in course
  getstudentincourse,
  // lecture attendance
  addlectureattendace,
  // course calender
  getcoursetimetable,
  // course student enrolled
  getstudentcourseenrolled,
  // student submission
  addsubdentsubmission,
  getstudentsubmission,
  // attachments
  addattachments,
  // sub component marks
  addsubcomponentmarks,
  getsubcomponentmarks,
  // get sub attach
  getsubattachments,

  // student sub attach
  studentSubmissionattachments,

  // delete student submission
  deletestudentsubmission,
  //  student marks
  getstudentmarks,
  updatestudentmarks,
  //book
  getbook,
  deletebook,
  addbook,
  updatebook,

  // student enrollements
  addstudentenrollement,
  getstudentenrollement,

  // Pre ferred time slot
  addprefferedSlot,

  // Time slot
  timeslot,

  // Attendance

  studentattendance,

  // Clos
  clos,

  // individual performance
  individualstudentPerformance,
  // whole class performance
  wholeclassperformance,
  // Question Rephrase
  questionrephrase,

  //pending courses by studentId
  pendingcourses,

  // student by course
  studentbycourseid,

  // class aggregate
  getclassaggregate,

  getPersonalSubDomain,
  groupMembers,

  // questions
  question,

  get_question_by_subcomponent_id,
  addStudentQuestion,
  getclographdata,
  updateGroupName,

  activityOutcome,
  activities,
  CalendarEvents,
  maxMinAggregate,
  subcomponentGradeSheet,
  addLeaderBoard,
  getLeaderBoard,
  getSubcomponentByCourseId,
  getLeaderBoardResult,
  updateCourseLeaderboard,
};