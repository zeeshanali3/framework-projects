import {
  ADDSTUDENTENROLLEMENTS,
  ADMIN_ADD_STUDENT_ENROLLEMENTS,
} from '../../ActionTypes/ApiActionTypes.js';
import constants from "../../../../Constants.js";
// StudentUserId
export function AddstudentenrollementsAction(token,student_semester_Id, PlannedCourseId,Grade, onSuccess, onFailure) {
    return {
      type: ADMIN_ADD_STUDENT_ENROLLEMENTS,
      payload: {
        apiUrl: constants.addstudentenrollement,
        header: "application/json",
        metaData: true,
        requestType: 'POST',
        reduxActionType: ADDSTUDENTENROLLEMENTS,
        onFailure: onFailure,
        onSuccess: onSuccess,
        body: {
          idObject: {
            StudentSemesterId:student_semester_Id,
            PlannedCourseId:PlannedCourseId,
          },
          Grade: Grade,
        },
      },
    }
}