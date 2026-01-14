import GETCOURSE from "./ActionTypes/ReducerType";
import ADMIN_GET_COURSES from "./ActionTypes/ApiType";
import constants from "../../../Constants";
export function GetCourseAction(token ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_COURSES,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl: constants.get_courses,
            requestType:'GET',
            reduxActionType: GETCOURSE  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}