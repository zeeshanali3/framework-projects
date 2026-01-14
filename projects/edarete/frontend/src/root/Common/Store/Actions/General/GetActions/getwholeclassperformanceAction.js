import { GET_WHOLE_CLASS_PERFORMANCE,GETWHOLECLASSPERFORMANCE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetWholeClassPerformanceAction(token ,courseId,onSuccess ,onFailure){
    return{
        type:GET_WHOLE_CLASS_PERFORMANCE,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.wholeclassperformance}/${courseId}`,
            requestType:'GET',
            reduxActionType: GETWHOLECLASSPERFORMANCE  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}