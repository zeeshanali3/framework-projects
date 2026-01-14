import { ADMINGETTIMESLOT, ADMIN_GET_TIME_SLOT } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"


export function GettimeslotAction(token,componentID,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_TIME_SLOT,
        payload:{
            apiUrl: Constants.timeslot,
            metaData:true,
            header:"application/json",
            requestType:'GET',
            reduxActionType:ADMINGETTIMESLOT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                token:token,
            }
        }
    }
}