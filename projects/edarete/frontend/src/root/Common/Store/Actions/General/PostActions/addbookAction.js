import { ADDBOOK ,ADMIN_ADD_BOOKS } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
// const values = [ idObject.CourseId,BookIBN,namesObject.BookName,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];
export function AddbookAction(token,CourseId ,BookIBN,BookName, onSuccess, onFailure){
    return{
        type:ADMIN_ADD_BOOKS,
        payload:{
            apiUrl:Constants.addbook,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:ADDBOOK,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                BookIBN:BookIBN,
               idObject:{
                CourseId:CourseId,
               },
               namesObject:{
                BookName:BookName,
               },
               token:token,
            }
        }
    }
}