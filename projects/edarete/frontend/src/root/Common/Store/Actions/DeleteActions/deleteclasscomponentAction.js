import {
  DELETECLASSCOMPONENT,
  ADMIN_DELETE_CLASS_COMPONENT,
} from '../../../../Common/Store/Actions/ActionTypes/ApiActionTypes';
import Constants from "../../../Constants"
export function DeleteclasscomponentAction(token,componentID,onSuccess ,onFailure){
    return{
        type:ADMIN_DELETE_CLASS_COMPONENT,
        payload:{
            apiUrl: `${Constants.deleteclasscomponent}/${componentID}`,
            metaData:true,
            header:"application/json",
            requestType:'DELETE',
            reduxActionType:DELETECLASSCOMPONENT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                token:token,
            }
        }
    }
}   