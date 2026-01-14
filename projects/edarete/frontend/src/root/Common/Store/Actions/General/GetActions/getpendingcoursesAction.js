
import { GETPENDINGCOURSES ,GET_PENDING_COURSES } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

// enrollementId/:courseId
export function GetPendingCoursesAction(token,enrollementId,onSuccess ,onFailure){
  
    return{
        type:GET_PENDING_COURSES,
        payload:{
            apiUrl:`${Constants.pendingcourses}/${enrollementId}`,
            header:"application/json",
            metaData:true,
            requestType:'GET',
            reduxActionType:GETPENDINGCOURSES,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,

        }
    }
}
