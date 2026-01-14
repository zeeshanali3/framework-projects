import GETCOURSECOUNT from "./ActionTypes/ReducerType";
import ADMIN_GET_COURSES_COUNT from "./ActionTypes/ApiType";
import constants from "../../../Constants";
export function GetCourseCountAction(token ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_COURSES_COUNT,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl: constants.get_courses_count,
            requestType:'GET',
            reduxActionType: GETCOURSECOUNT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}