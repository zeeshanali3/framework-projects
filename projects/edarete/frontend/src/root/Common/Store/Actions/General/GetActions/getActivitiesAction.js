import { ACTIVITIES } from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"
export function getActivities(token ,courseId,onSuccess ,onFailure){
    return{
        type:ACTIVITIES,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:Constants.activities+"/" + courseId,
            requestType:'GET',
            reduxActionType: null  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}