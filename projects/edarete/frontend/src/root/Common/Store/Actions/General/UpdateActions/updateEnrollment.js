import { UPDATE_GROUP_NAME } from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants";

export function UpdateEnrollementsAction( EnrollementId,GroupName, onSuccess,onFailure){

    return{
        type:UPDATE_GROUP_NAME,
        payload:{
            apiUrl:`${Constants.updateGroupName}/${EnrollementId}`,
            metaData:true,
            header:"application/json",
            requestType:'PUT',
            reduxActionType:UPDATE_GROUP_NAME,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                GroupName:GroupName
            }
        }
    }
}