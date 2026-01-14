
import { all } from 'redux-saga/effects';
// import { LoginSaga } from './loginSaga';

import dataSaga from './general/generalSagas'
import { GetclasscomponentSaga } from './GetSaga/getclasscomponentSaga';
import { PostclasscomponentSaga } from './PostSaga/postclasscomponentSaga';
import { GetsubcomponentSaga } from './GetSaga/getsubcomponentSaga';
import { PostsubcomponentSaga } from './PostSaga/postsubcomponentSaga';
import { PostchatSaga } from './PostSaga/postchatSaga';
import { GetchatSaga } from './PostSaga/getchatcomponentSaga';
import { GetstudentenrolledincourseSaga } from './GetSaga/getstudentenrolledincourseSaga';
import { PostlectureattendanceSaga } from './PostSaga/postlectureattendanceSaga';
import { GetcoursecalenderSaga } from './GetSaga/getcoursecalenderSaga';
import { GetcoursestudentenrolledSaga } from './GetSaga/getcoursestudentenrolledSaga';  
import { PoststudentsubmissionSaga } from './PostSaga/poststudentsubmissionSaga';
import { PostattachmentSaga } from './PostSaga/postattachmentSaga';
import { PostsubcomponentmarksSaga } from './PostSaga/postsubcomponentmarksSaga';
import { GetstudentsubmissionSaga } from './GetSaga/getstudentsubmissionSaga';
import { DeleteclasscomponentSaga } from './DeleteSaga/deleteclasscomponentSaga';
import { GetsubcomponentattachmentSaga } from './GetSaga/getsubcomponentattachSaga';
import { GetstudentsubattachmentSaga } from './GetSaga/getstudentsubattachmentSaga';
import { DeletestudentsubSaga } from './DeleteSaga/deletestudentsubSaga';
import { GetstudentmarksSaga } from './GetSaga/getstudentmarksSaga';
import { UpdatestudentmarksSaga } from './UpdateSaga/UpdatestudentmarksSaga';
import { AddbookSaga } from './PostSaga/addbookSaga';
import { GetbookSaga } from './GetSaga/getbookSaga';
import { Deletebooksaga } from './DeleteSaga/deletebookSaga';
import { UpdatebookSaga } from './UpdateSaga/updatebookAction';
import { AddstudentenrollementSaga } from './PostSaga/addstudentenrollementSaga';
import { GetstudentenrollementforcourseSaga } from './GetSaga/getstudentenrollmentforcourseSaga';
import { UpdateclasscomponentSaga } from './UpdateSaga/updateclasscomponentAction';
import { AddpreferredtimeslotSaga } from './PostSaga/addpreferredtimeslotSaga';
import { GettimeslotSaga } from './GetSaga/gettimeslotSaga';
import { UpdatesubcomponentsSaga } from './UpdateSaga/updatesubcomponentSaga';
import { GetstudentattendanceSaga } from './GetSaga/getstudentattendanceSaga';
import { GetpublicpageSaga } from './GetSaga/getpublicpageSaga';
import { LoginStepTwoSaga } from './PostSaga/LoginStepTwoSaga';
import { GetclosSaga } from './GetSaga/getclosSaga';
import { logoutSaga } from './logoutSaga';
import { GetIndividualStudentPerformanceSaga } from './GetSaga/getindividualstudentperfromanceSaga';
import { GetWholeClassPerformanceSaga } from './GetSaga/getwholeclassperformanceSaga';
import { AddGptQuestionSaga } from './PostSaga/addgptquestionSaga';
import { GetStudentByCourseSaga } from './GetSaga/getstudentbycourseSaga';
import { GetClassAggregateSaga } from './GetSaga/getclassaggregateSaga';
import { Deletesubcomponent } from './DeleteSaga/deletesubcomponetSaga';
import { GetPendingCoursesSaga } from './GetSaga/getpendingSaga';
import { GetPersonalSubDomainSaga } from './GetSaga/getpersonalsubdomainsaga';
import { AddQuestionSaga } from './PostSaga/addquestionSaga';
import { GetQuestionBySubComponentIDSaga } from './GetSaga/getquestionbysubidSaga';
import { AddStudentAnsSaga } from './PostSaga/addstudentansSaga';
import { UpdateQuestionMarksAnsSaga } from './UpdateSaga/updateQuestionMarksAnsSaga';
import { GetCloGraphSaga } from './GetSaga/getclographSaga';
import { isLoadingSaga } from './PostSaga/isLoadingSaga';
import { GetActivityOutcomeSaga } from './GetSaga/getActivityOutcomeSaga';
import { GetActivitiesSaga } from './GetSaga/getActivitiesSaga';
import { toggleSidebarSaga } from './PostSaga/toggleSidebarSaga'
import {sideBarDataSaga,sideBarActiveTabSaga} from './GetSaga/sideBarDataSaga'
import { GetCalendarEventsSaga } from './GetSaga/getCalendarEventsSaga';
import { getMaxMinAggregateSaga } from './GetSaga/getMaxMinAggregateSaga';
import { UpdateQuestionSaga } from './UpdateSaga/updateQuestion';
import { AddTemplateSubcomponentSaga } from './PostSaga/addTemplateSubcomponentSaga';
import { GetTemplateSubcomponentsSaga } from './GetSaga/GetTemplateSubComponents';
import { getSubComponentGradeSheetSaga } from './GetSaga/getSubComponentGradeSheetSaga';
import { GetclassleaderboardSaga } from './GetSaga/getLeaderboardSaga';
import { AddLeaderboardSaga } from './PostSaga/addLeaderboardSaga';
import { GetsubcomponentbycourseSaga } from './GetSaga/getSubcomponentByCourseSaga';
import { GetleaderboardresultSaga } from './GetSaga/getLeaderResultSaga';
import { UpdateCourseLeaderboard } from './UpdateSaga/updateCourseLeaderboard';
import { AddchatSaga } from './PostSaga/addChatSaga';
import {UpdateEnrollmentSaga} from './UpdateSaga/updateEnrollment';
import { GetgroupmembersSaga } from './GetSaga/getGroupMembersSaga';

export default function* rootSaga() {
    yield all([
        // LoginSaga(),
          dataSaga(),
        LoginStepTwoSaga(),
        logoutSaga(),
        // Class component
        GetclasscomponentSaga(),
        PostclasscomponentSaga(),
        UpdateclasscomponentSaga(),
        // Sub component
        GetsubcomponentSaga(),
        PostsubcomponentSaga(),
        DeleteclasscomponentSaga(),
        UpdatesubcomponentsSaga(),
        Deletesubcomponent(),
        // Chat
        PostchatSaga(),
        GetchatSaga(),
        // Student enrolled in course
        GetstudentenrolledincourseSaga(),
        // Lecture attendance
        PostlectureattendanceSaga(),
        // Course calender
        GetcoursecalenderSaga(),
        // Course Student Enrolled
        GetcoursestudentenrolledSaga(),
        // Student Submission
        PoststudentsubmissionSaga(),
        GetstudentsubmissionSaga(),
        // Attachment
        PostattachmentSaga(),
        // Sub Component Marks 
        PostsubcomponentmarksSaga(),
        // SUB COMP ATTAC
        GetsubcomponentattachmentSaga(),
        // STUDENT SUB ATTACH DATA
        GetstudentsubattachmentSaga(),
        // Delete student sub data
        DeletestudentsubSaga(),

        // GET STUDENT MARKS
        GetstudentmarksSaga(),
        UpdatestudentmarksSaga(),

        //Get Pending Courses
        GetPendingCoursesSaga(),
        // Book
        AddbookSaga(),
        GetbookSaga(),
        Deletebooksaga(),
        UpdatebookSaga(),

        // STUDENT ENROLLEMENT ss
        AddstudentenrollementSaga(),
        GetstudentenrollementforcourseSaga(),

        // Preferred timme slot
        AddpreferredtimeslotSaga(),

        // Time slot
        GettimeslotSaga(),


        // Student Attendance
        GetstudentattendanceSaga(),

        // Public page
        GetpublicpageSaga(),

        // Clos
        GetclosSaga(),

        // Get Individual Performance
        GetIndividualStudentPerformanceSaga(),

        // whole class performance
        GetWholeClassPerformanceSaga(),


        // Gpt repharse
        AddGptQuestionSaga(),


        // Student by course
        GetStudentByCourseSaga(),

        // class Aggreagte 
        GetClassAggregateSaga(),
        GetPersonalSubDomainSaga(),


        // Add Questions
        AddQuestionSaga(),
        GetQuestionBySubComponentIDSaga(),
        AddStudentAnsSaga(),
        UpdateQuestionMarksAnsSaga(),
        GetCloGraphSaga(),

        // Is Loading
        isLoadingSaga(),
        GetActivityOutcomeSaga(),
        GetActivitiesSaga(),
        toggleSidebarSaga(),
        sideBarDataSaga(),
        sideBarActiveTabSaga(),
        GetCalendarEventsSaga(),
        getMaxMinAggregateSaga(),
        UpdateQuestionSaga(),
        AddTemplateSubcomponentSaga(),
        GetTemplateSubcomponentsSaga(),
        getSubComponentGradeSheetSaga(),


        GetclassleaderboardSaga(),
        AddLeaderboardSaga(),
        GetsubcomponentbycourseSaga(),
        GetleaderboardresultSaga(),
        UpdateCourseLeaderboard(),
        AddchatSaga(),
        UpdateEnrollmentSaga(),
        GetgroupmembersSaga()
    ])
}