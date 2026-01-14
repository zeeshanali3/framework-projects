import { ADMIN_ADD_PREFERRED_TIME_SLOT ,ADMINADDPREFERREDTIMESLOT } from "../../ActionTypes/ApiActionTypes";

import Constants from "../../../../Constants"
// const values = [ idObject.EmployeeId,idObject.TimeSlotId,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];

export function AddpreferredtimeslotAction(token,EmployeeId ,TimeSlotId, onSuccess, onFailure){
    return{
        type:ADMIN_ADD_PREFERRED_TIME_SLOT,
        payload:{
            apiUrl:Constants.addprefferedSlot,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:ADMINADDPREFERREDTIMESLOT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                
               idObject:{
                EmployeeId:EmployeeId,
                TimeSlotId:TimeSlotId,
               },
               
               token:token,
            }
        }
    }
}