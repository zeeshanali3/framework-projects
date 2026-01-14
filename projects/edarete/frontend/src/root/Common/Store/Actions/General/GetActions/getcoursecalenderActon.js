import {GETCOURSECALENDER , ADMIN_GET_COURSE_CALENDER} from "../../ActionTypes/ApiActionTypes"
import Constants from "../../../../Constants"
export function GetcoursecalenderAction(token,CourseId ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_COURSE_CALENDER,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.getcoursetimetable}/${CourseId}`,
            requestType:'GET',
            reduxActionType: GETCOURSECALENDER  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}