import { GETCOURSESTUDENTENROLLED ,ADMIN_GET_COURSE_STUDENT_ENROLLED } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function GetcoursestudentenrolledAction(token,userRoleId ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_COURSE_STUDENT_ENROLLED,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.getstudentcourseenrolled}/${userRoleId}`,
            requestType:'GET',
            reduxActionType: GETCOURSESTUDENTENROLLED  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}