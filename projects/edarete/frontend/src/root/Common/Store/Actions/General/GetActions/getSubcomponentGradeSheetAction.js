import { GET_SUBCOMPONENT_GRADESHEET } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function getSubcomponentGradeSheetAction(token ,subComponentId,onSuccess ,onFailure){
    return{
        type:GET_SUBCOMPONENT_GRADESHEET,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:Constants.subcomponentGradeSheet+ subComponentId,
            requestType:'GET',
            reduxActionType: null  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}