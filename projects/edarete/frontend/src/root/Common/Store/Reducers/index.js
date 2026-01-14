import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import GetUserRedcuer from "./GetUsersReducer/GetUsersReducer";
import GetRoomReducer from "./GetRoomReducer/GetRoomReducer";
import GetTimeTableRedcer from "./GetTimeTableRedcer/GetTimeTableRedcer";
import GetCourseReducer from "./GetCourseReducer/GetCourseReducer";
import GetSemesterReducer from "./GetSemesterReducer/GetSemesterReducer";
import AddTimeTableReducer from "./AddTimeTableReducer/AddTimeTableReducer";
import GetFilterReducer from "./FilterReducer/FilterReducer";
import LoginReducer from "./LoginReducer";
import GetclasscomponentReducer from "./GetReducers/getclasscomponentReducer";
import PostclasscomponentReducer from "./PostReducers/postclasscomponentReducer";
import GetsubcomponentReducer from "./GetReducers/getsubcomponentReducer";
import PostsubcomponentReducer from "./PostReducers/postsubcomponentReducer";
import PostchatReducer from "./PostReducers/postchatReducer";
import GetchatReducer from "./GetReducers/getchatcomponentReducer";
import GetstudentenrolledincourseReducer from "./GetReducers/getstudentenrolledincourseReducer";
import PostlectureattendanceReducer from "./PostReducers/postlectureattendanceReducer";
import GetcoursecalenderReducer from "./GetReducers/getcoursecalenderReducer";
import GetcoursestudentenrolledReducer from "./GetReducers/getcoursestudenrolledReducer";
import PoststudensubmissionReducer from "./PostReducers/poststudentsubmissionReducer";
import PostattachmentsReducer from "./PostReducers/postattachmentReducer";
import PostsubcomponentmarksReducer from "./PostReducers/postsubcomponentmarksReducer";
import GetstudentsubmissionReducer from "./GetReducers/getstudentsubmissionReducer";
import DeleteclasscomponentReducer from "./DeleteReducer/deleteclasscomponentReducer";
import GetsubattachmentReducer from "./GetReducers/getsubcomponentattachmentReducer";
import GetstudentsubattachmentReducer from "./GetReducers/getstudentsubattachmentsReducer";
import DeletestudentsubmissionReducer from "./DeleteReducer/deletestudentsubmissionReducer";
import GetstudentMarksReducer from "./GetReducers/getstudentmarksReducer";
import UpdatestudentmarksReducer from "./UpdatesReducer/UpddatestudentmarksReducer";
import GetbookReducer from "./GetReducers/getbookReducer";
import GetstudentenrollmentforcourseReducer from "./GetReducers/getstudentenrollementforcourseReducer";
import GettimeslotReducer from "./GetReducers/gettimeslotReducer";
import GetstudentattendanceReducer from "./GetReducers/getstudentattendanceReducer";
import GetpublicpageReducer from "./GetReducers/getpublicpageReducer";
import GetclosReducer from "./GetReducers/getclosReducer.";
import GetIndividualStudentPerformanceReducer from "./GetReducers/getindividualstudentperformanceReducer";
import GetWholeClassPerformanceReducer from "./GetReducers/getwholeclassperformanceReducer";
import GetStudentByCourseReducer from "./GetReducers/getstudentbycourseReducer";
import GetClassAggregateReducer from "./GetReducers/getclassaggregateReducer";
import GetPendingCoursesReducer from "./GetReducers/getPendingCoursesReducer";
import GetQuestionBySubComponenidAction from "./GetReducers/getquestionbysubcomponentIDReducer";
import GetQuestionBySubComponenidReducer from "./GetReducers/getquestionbysubcomponentIDReducer";
import GetCloGraphReducer from "./GetReducers/getclographReducer";
import isLoadingReducer from "./GetReducers/isLoadingReducer";
import toggleSidebarReducer from "./GetReducers/toggleSidebarReducer"
import sideBarDataReducer from "./GetReducers/sidebarDataReducer"
import GetCalendarEventsReducer from "./GetReducers/getCalendarEventsReducer";
import MaxMinAggregate from "./GetReducers/getMaxMinAggregateReducer";
import GetTemplateSubcomponentReducer from "./GetReducers/getTemplateSubcomponents";
import GetclassleaderboardReducer from "./GetReducers/getLeaderboardReducer";


const rootReducer = combineReducers({
  main: mainReducer,
  GETUSERREDUCER: GetUserRedcuer,
  GETROOMREDUCER: GetRoomReducer,
  GETTIMETABLEREDUCER: GetTimeTableRedcer,
  GETCOURSEREDUCER: GetCourseReducer,
  GETRSEMSTERREDUCER: GetSemesterReducer,
  addtimetablereducer:AddTimeTableReducer,
  GETFILTERREDUCER:GetFilterReducer,
  // Auth
  LOGINREDUCER: LoginReducer,
     
  // Class components
     GETCLASSCOMPONENTREDUCER:GetclasscomponentReducer,
     POSTCLASSCOMPONENT:PostclasscomponentReducer,
  
     // Class subcomponents
     GETSUBCOMPONENTREDUCER:GetsubcomponentReducer,
     POSTSUBCOMPONENTREDUCER:PostsubcomponentReducer,
  
     // Chats
     POSTCHATREDUCER:PostchatReducer,
     GETCHATREDUCER:GetchatReducer,
     DELETECLASSCOMPONENTREDUCER:DeleteclasscomponentReducer,
     // Student enrolled in course
     GETSTUDENTENROLLEDINCOURSEREDUCER:GetstudentenrolledincourseReducer,
     // Lecture attendace 
     POSTLECTUREATTENDANCE:PostlectureattendanceReducer,
     // Course Calender
     GETCOURSECALENDERREDUCER:GetcoursecalenderReducer,
     // Course Student Enrolled
     GETCOURSESTUDENTENROLLED:GetcoursestudentenrolledReducer,
     // Student submission Reducer
     POSTSTUDENTREDUCER:PoststudensubmissionReducer,
     GETSTUDENTSUBMIISIONREDUCER:GetstudentsubmissionReducer,
     // Attachment Reducer
     POSTATTACHMENTREDUCER:PostattachmentsReducer,
     // Sub component Marks Reducer
     POSTSUBCOMPONENTMARKSREDUCER:PostsubcomponentmarksReducer,
  
     // SUB COMP ATTAC
     GETSUBCOMPOATTACH:GetsubattachmentReducer,
  
     /// STUDENT SUBMISSION ATTACHMENTS
     GETSTUDENTSUBATTACHREDUCER:GetstudentsubattachmentReducer,
  
     // DELETESTUDENT SUBMISSION
     DELETESTUDENTSUBATTACH:DeletestudentsubmissionReducer,
  
     // GET STUDENT MARKS
     GETSTUDENTMARKSREDUCER:GetstudentMarksReducer,
     UPDATESTUDENTMARKS:UpdatestudentmarksReducer,
  
     // BOOK
     GETBOOKREDUCER:GetbookReducer,
  
     // STUDENT COURSE ENROLLEMENT 
  
     GETENROLLEMENTFORCOURSE:GetstudentenrollmentforcourseReducer,
  
     // Time slot
     GETTIMESLOT:GettimeslotReducer,
  
     // Student Attendance
     STUDENTATTENDANCE:GetstudentattendanceReducer,
  
     // Public Page
     PUBPAGE:GetpublicpageReducer,
  
     // Clos
     GETCLOS:GetclosReducer,
  
     // Individual Student Performance
     GETSTUDENTINDIVIDUALPERFORMANCE:GetIndividualStudentPerformanceReducer,
  
     // Whole class performance
     GETWHOLECLASSPERFORMANCEREDUCER:GetWholeClassPerformanceReducer,
  
     // Student by course
     STUDENTCOURSE:GetStudentByCourseReducer,
     // Class aggregate
     CLASSAGGREGATE:GetClassAggregateReducer,
     GETPENDINGCOURSES:GetPendingCoursesReducer,
  
     GETQUESTIONBYSUBID:GetQuestionBySubComponenidReducer,
     GETCLOGRAPH:GetCloGraphReducer,
  
     ISLOADING:isLoadingReducer,
     TOGGLESIDEBAR:toggleSidebarReducer,
     SIDERBARDATA:sideBarDataReducer,
     CALENDAREVENTS:GetCalendarEventsReducer,
     MAXMINAGGREGATE:MaxMinAggregate,
  
     TEMPLATESUBCOMPONENTS:GetTemplateSubcomponentReducer,
     CLASSLEADERBOARD:GetclassleaderboardReducer
});
export default rootReducer;