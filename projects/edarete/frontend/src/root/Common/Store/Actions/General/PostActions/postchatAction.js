import { POSTCHAT , ADMIN_POST_CHATS } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function AddchatAction(token,SubComponentId ,UserRoleId,Message,MessageTime,PrivateChat, onSuccess, onFailure){
    return{
        type:ADMIN_POST_CHATS,
        payload:{
            apiUrl:Constants.addchats,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:POSTCHAT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                Message:Message,
                PrivateChat:PrivateChat,
                MessageTime:MessageTime,
               idObject:{
                SubComponentId:SubComponentId,
                UserRoleId:UserRoleId,
               },
               token:token,
            }
        }
    }
}