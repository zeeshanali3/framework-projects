import { GETSTUDENTENROLLEMENTFORCOURSE ,ADMIN_GET_STUDEN_ENROLLEMENT_FOR_COURSE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function GetstudentenrollmentforcourseAction(token,StudentUserId,onSuccess ,onFailure){
  
    return{
        type:ADMIN_GET_STUDEN_ENROLLEMENT_FOR_COURSE,
        payload:{
            apiUrl:`${Constants.getstudentenrollement}/${StudentUserId}`,
            header:"application/json",
            metaData:true,
            requestType:'GET',
            reduxActionType:GETSTUDENTENROLLEMENTFORCOURSE,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,

        }
    }
}