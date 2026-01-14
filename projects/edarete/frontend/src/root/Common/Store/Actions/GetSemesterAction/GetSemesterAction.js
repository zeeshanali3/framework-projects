import Constants from "../../../Constants";
import GETSEMESTER from "./ActionType/ReducerType";
import ADMIN_GET_SEMESTER from "./ActionType/ApiType";
export function GetSemesterAction(token,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_SEMESTER,
        payload:{
            apiUrl:Constants.get_semesters,
            metaData:true,
            header:"application/json",
            requestType:'GET',
            reduxActionType:GETSEMESTER,
            onSuccess:onSuccess,
            onFailure:onFailure,
        }
    }
}