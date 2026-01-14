import { ACTIVITY_OUTCOME } from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"
export function getActivityOutcomeAction(token ,courseId,onSuccess ,onFailure){
    return{
        type:ACTIVITY_OUTCOME,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:Constants.activityOutcome+"/" + courseId,
            requestType:'GET',
            reduxActionType: null  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}