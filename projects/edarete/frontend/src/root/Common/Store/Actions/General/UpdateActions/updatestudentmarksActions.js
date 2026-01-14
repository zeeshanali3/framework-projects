// const values = [ObtainedMarks,UpdatedAtDate, UpdatedAtTime,idObject.SubComponentMarkId];    
import {
  UPDATESTUDENTMARKS,
  ADMIN_UPDATE_STUDENT_MARKS,
} from '../../ActionTypes/ApiActionTypes'; 
import Constants from "../../../../Constants"

export function UpdatestudentmarksAction(token,SubComponentMarkId ,ObtainedMarks ,TotalMarks,onSuccess, onFailure){
    return{
        type:ADMIN_UPDATE_STUDENT_MARKS,
        payload:{
            // apiUrl:Constants.updatestudentmarks,
            apiUrl: `${Constants.updatestudentmarks}/${SubComponentMarkId}`,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:UPDATESTUDENTMARKS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                ObtainedMarks:ObtainedMarks,
                OutOfMarks:TotalMarks,
               token:token,
            }
        }
    }
}