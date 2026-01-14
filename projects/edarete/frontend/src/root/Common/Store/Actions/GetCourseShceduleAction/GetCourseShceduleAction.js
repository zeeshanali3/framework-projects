import GETCOURSESHCEDULE from "./ActionTypes/ReducerType";
import ADMIN_GET_COURSE_SCHEDULE from "./ActionTypes/ApiType";
import constants from "../../../Constants";
export function GetCourseShceduleAction(token ,onSuccess ,onFailure){
   
    return{
        type:ADMIN_GET_COURSE_SCHEDULE,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl: constants.get_coursetimetableschedules,
            requestType:'GET',
            reduxActionType: GETCOURSESHCEDULE  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}