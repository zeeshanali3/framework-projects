import { ADD_QUESTIONS,ADDQUESTIONS } from "../../../../../Common/Store/Actions/ActionTypes/ApiActionTypes";

import Constants from "../../../../Constants"
// const values = [ idObject.EmployeeId,idObject.TimeSlotId,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];

export function AddQuestionsAction(token,QuestionMarks  ,SubComponentId,CLOId,Description, onSuccess, onFailure){
    return{
        type:ADD_QUESTIONS,
        payload:{
            apiUrl:Constants.question,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:ADDQUESTIONS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
               idObject:{
                SubComponentId:SubComponentId,
                CLOId:CLOId,
               },
               QuestionMarks :QuestionMarks ,
               Description:Description,
               token:token,
            }
        }
    }
}