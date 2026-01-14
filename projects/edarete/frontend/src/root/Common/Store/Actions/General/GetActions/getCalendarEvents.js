import { GET_CALENDAR_EVENTS,REDUX_CALENDAR_EVENTS } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants"
export function getCalendarEvents(token ,StudentSemesterId,onSuccess ,onFailure){
    return{
        type:GET_CALENDAR_EVENTS,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:"/calendarEvents"+"/" + StudentSemesterId,
            requestType:'GET',
            isEncrypted:false,
            reduxActionType: REDUX_CALENDAR_EVENTS  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}