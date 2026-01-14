import { GETCLASSAGGREGATE ,GET_CLASS_AGGREGATE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetClassAggregateAction(token,CourseId ,onSuccess ,onFailure){
    return{
        type:GET_CLASS_AGGREGATE,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.getclassaggregate}/${CourseId}`,
            requestType:'GET',
            reduxActionType: GETCLASSAGGREGATE  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token
        }
    }
}