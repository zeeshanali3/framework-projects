import { ADMINUPDATESUBCOMPONENT ,ADMIN_UPDATE_SUB_COMPONENT } from "../../ActionTypes/ApiActionTypes";

import Constants from "../../../../Constants"

export function UpdatesubcomponentAction(token,SubComponentId,UserRoleId, ComponentID, SubComponentNum, Date, EndTime,TotalMarks,Weightage,Text,Status,StartTime,StartDate,NotifyUsers,onSuccess, onFailure){
    return{
        type:ADMIN_UPDATE_SUB_COMPONENT,
        payload:{
            apiUrl: `${Constants.updatesubcomponent}/${SubComponentId}`,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:ADMINUPDATESUBCOMPONENT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                SubComponentNum:SubComponentNum,
               token:token,
               idObject:{
                UserRoleId:UserRoleId,
                ComponentID:ComponentID,
               },
               
               Date:Date,
               EndTime:EndTime,
               TotalMarks:TotalMarks,
               Weightage:Weightage,
               Text:Text,
               Status:Status,
               StartTime,
               StartDate,
                NotifyUsers:NotifyUsers
            }
        }
    }
}