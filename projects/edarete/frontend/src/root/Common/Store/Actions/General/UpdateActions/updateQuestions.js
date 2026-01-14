import { UPDATE_QUESTIONS } from '../../ActionTypes/ApiActionTypes';

import Constants from "../../../../Constants"
// const values = [ idObject.EmployeeId,idObject.TimeSlotId,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];

export function UpdateQuestions(token,QuestionId,QuestionMarks,CLOId,Description, onSuccess, onFailure){
    return{
        type:UPDATE_QUESTIONS,
        payload:{
            apiUrl:Constants.question+"/" +QuestionId,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:null,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
               idObject:{
                CLOId:CLOId,
               },
               QuestionMarks :QuestionMarks ,
               Description:Description,
               token:token,
            }
        }
    }
}