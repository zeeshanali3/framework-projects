import { GETQUESTIONBYSUBCOMPONENTID,GET_QUESTION_BY_SUBCOMPONENT_ID } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetQuestionBySubComponentIdAction(token,SubComponentId ,onSuccess ,onFailure){
    return{
        type:GET_QUESTION_BY_SUBCOMPONENT_ID,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.get_question_by_subcomponent_id}/${SubComponentId}`,
            requestType:'GET',
            reduxActionType: GETQUESTIONBYSUBCOMPONENTID  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}