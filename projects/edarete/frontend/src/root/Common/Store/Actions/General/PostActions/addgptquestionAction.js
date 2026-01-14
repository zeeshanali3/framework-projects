import { QUESTIONREPHRASE,QUESTION_REPHRASE } from "../../../../../Common/Store/Actions/ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
// const values = [ idObject.EmployeeId,idObject.TimeSlotId,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];

export function AddGptQuestionAction(token,questions, onSuccess, onFailure){
    return{
        type:QUESTION_REPHRASE,
        payload:{
            apiUrl:Constants.questionrephrase,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:QUESTIONREPHRASE,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                questions
            }
        }
    }
}