import { ADMINGETSTUDENTATTENDANCE ,ADMIN_GET_STUDENT_ATTENDANCE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetStudentattendanceAction(token,EnrollementId,CourseId ,onSuccess ,onFailure){
    return {
      type: ADMIN_GET_STUDENT_ATTENDANCE,
      payload: {
        metaData: true,
        header: '/application/json',
        apiUrl: `${Constants.studentattendance}?enrollementId=${EnrollementId}&courseId=${CourseId}`,
        requestType: 'GET',
        // isEncrypted: true,
        reduxActionType: ADMINGETSTUDENTATTENDANCE,
        onSuccess: onSuccess,
        onFailure: onFailure,
        token: token,
        body:{
          
        }
      },
    };
}