import {
  ADDSTUDENTANS,
  ADD_STUDENT_ANS,
} from '../../ActionTypes/ApiActionTypes';

import Constants from "../../../../Constants"
// const values = [ idObject.EmployeeId,idObject.TimeSlotId,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];


// const {idObject,StudentAnswer } = req.body;
// const tableName={QuestionId:"questions",EnrollementId:"enrollements"}
export function AddStudentAnsAction(token,StudentAnswer,EnrollementId,QuestionId, onSuccess, onFailure,ObtainedMarks=null){
    console.log("studentAnswer::::",StudentAnswer)
    return{
        type:ADD_STUDENT_ANS,
        payload:{
            apiUrl:Constants.addStudentQuestion,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:ADDSTUDENTANS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
               idObject:{
                EnrollementId:EnrollementId,
                QuestionId:QuestionId,
               },
               StudentAnswer :StudentAnswer ,
               token:token,
               ObtainedMarks:ObtainedMarks
            }
        }
    }
}