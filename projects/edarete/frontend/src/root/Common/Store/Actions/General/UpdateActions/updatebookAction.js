import {
  UPDATEBOOKS,
  ADMIN_UPDATE_BOOKS,
} from '../../ActionTypes/ApiActionTypes' ;

import Constants from "../../../../Constants"

export function UpdatebookAction(token,BookId ,CourseId,BookIBN,BookName ,onSuccess, onFailure){
    return{
        type:ADMIN_UPDATE_BOOKS,
        payload:{
            apiUrl: `${Constants.updatebook}/${BookId}`,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:UPDATEBOOKS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                BookIBN:BookIBN,
               token:token,
               idObject:{
                CourseId:CourseId,
               },
               namesObject:{
                BookName:BookName,
               },
            }
        }
    }
}