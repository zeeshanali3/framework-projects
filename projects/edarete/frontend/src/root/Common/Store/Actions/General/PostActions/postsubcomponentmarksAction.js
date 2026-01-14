import {
  POSTSUBCOMPONENTMARKS,
  ADMIN_POST_SUBCOMPONENT_MARKS,
} from '../../ActionTypes/ApiActionTypes';
import constants from "../../../../Constants";
// const values = [ idObject.SubComponentId,idObject.EnrollementId,ObtainedMarks,OutOfMarks,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];
export function PostsubcomponentMarks(token , SubComponentId,EnrollementId,ObtainedMarks,OutOfMarks,onSuccess, onFailure){
    return{
        type:ADMIN_POST_SUBCOMPONENT_MARKS,
        payload:{
            apiUrl:constants.addsubcomponentmarks,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:POSTSUBCOMPONENTMARKS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                token:token,
                idObject:{
                    EnrollementId:EnrollementId,
                    SubComponentId:SubComponentId,
                },
                ObtainedMarks:ObtainedMarks,
                OutOfMarks:OutOfMarks,
            }
        }
    }
}