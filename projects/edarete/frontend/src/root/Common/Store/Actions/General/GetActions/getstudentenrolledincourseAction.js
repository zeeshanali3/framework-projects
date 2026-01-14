import { GETSTUDENTENRTOLLEDINCOURSE , ADMIN_GET_STUDENT_ENROLLED_IN_COURSE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function GetstudentenrolledincourseAction(token,CourseId ,  onSuccess ,onFailure){
    return{
        type: ADMIN_GET_STUDENT_ENROLLED_IN_COURSE,
        payload: {
            apiUrl: `${Constants.getstudentincourse}?courseId=${CourseId}`,
            header: 'application/json',
            metaData: true,
            requestType: 'GET',
            reduxActionType: GETSTUDENTENRTOLLEDINCOURSE,
            onSuccess: onSuccess,
            onFailure:onFailure,
            token:token,

        }
    }
}