import { DELETESUBCOMPONENT,ADMIN_DELETE_SUBCOMPONENT } from "../ActionTypes/ApiActionTypes";
import Constants from "../../../Constants"
export function DeleteSubComponentAction(token,subComponentId,userRoleId,onSuccess ,onFailure){
    return{
        type:ADMIN_DELETE_SUBCOMPONENT,
        payload:{
            apiUrl: `${Constants.deletesubcomponent}/${subComponentId}/${userRoleId}`,
            metaData:true,
            header:"application/json",
            requestType:'DELETE',
            reduxActionType:DELETESUBCOMPONENT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                token:token,
            }
        }
    }
}