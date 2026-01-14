import { GETSTUDENTBYCOURSE,GET_STUDENT_BY_COURSE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function GetStudentByCourseAction(token,Id ,onSuccess ,onFailure){
    return{
        type:GET_STUDENT_BY_COURSE,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.studentbycourseid}?courseId=${Id}`,
            requestType:'GET',
            reduxActionType: GETSTUDENTBYCOURSE  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}