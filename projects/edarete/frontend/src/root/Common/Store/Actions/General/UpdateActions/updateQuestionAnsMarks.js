import {
  UPDATEQUESTIONMARKSANS,
  ADMIN_UPDATE_QUESTION_MARKS_ANS,
} from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"

export function UpdateQuestionMarksAnsAction(token,ObtainedMarks,QuestionEvaluationId , QuestionId,Status,totalMarks,onSuccess, onFailure){
   
    return{
        type:ADMIN_UPDATE_QUESTION_MARKS_ANS,
        payload:{
            apiUrl: `${Constants.update_question_marks_ans}`,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:UPDATEQUESTIONMARKSANS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                idObject:{
                    QuestionId:QuestionId,
                },
                QuestionEvaluationId:QuestionEvaluationId,
                ObtainedMarks:ObtainedMarks,
                totalMarks:totalMarks,
                Status:Status
            }
        }
    }
}