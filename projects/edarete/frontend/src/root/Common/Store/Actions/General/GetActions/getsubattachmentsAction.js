import { ADMIN_GET_SUB_ATTACHMENTS , GETSUBATTACHMENTS } from "../../ActionTypes/ApiActionTypes";

import Constants from "../../../../Constants"

export function GetsubcomponentattachmentAction(token,SubcomponentId ,  onSuccess ,onFailure){
    return{
        type:ADMIN_GET_SUB_ATTACHMENTS,
        payload:{
            apiUrl:`${Constants.getsubattachments}?sub_component_id=${SubcomponentId}`,
            header:"application/json",
            metaData:true,
            requestType:'GET',
            reduxActionType:GETSUBATTACHMENTS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,

        }
    }
}