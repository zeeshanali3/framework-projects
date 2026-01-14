import { GETSTUDENTMARKS ,ADMIN_GET_STUDENT_MARKS } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetstudentMarksAction(token,SubComponentId ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_STUDENT_MARKS,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.getstudentmarks}/${SubComponentId}`,
            requestType:'GET',
            reduxActionType: GETSTUDENTMARKS  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}