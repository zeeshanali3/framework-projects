import { GETCHATS ,ADMIN_GET_CHATS } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetchatAction(token,SubComponentId ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_CHATS,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.getchats}/${SubComponentId}`,
            requestType:'GET',
            reduxActionType: GETCHATS  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}