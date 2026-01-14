import { POSTLECTUREATTENDANCE ,ADMIN_POST_LECTURE_ATTENDANCE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants";

export function AddlectureattendanceAction(token, attendanceData, date, onSuccess, onFailure) {
    return {
      type: ADMIN_POST_LECTURE_ATTENDANCE,
      payload: {
        apiUrl: Constants.addlectureattendace,
        header: "application/json",
        metaData: true,
        requestType: 'POST',
        reduxActionType: POSTLECTUREATTENDANCE,
        onFailure: onFailure,
        onSuccess: onSuccess,
        body: {
          idObject: attendanceData,
          Date: date,
        },
      },
    }
}