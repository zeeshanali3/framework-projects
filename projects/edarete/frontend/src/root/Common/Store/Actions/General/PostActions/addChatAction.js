import { ADDCHAT } from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants";


//    const values = [idObject.SubComponentId,idObject.UserRoleId,Message,MessageTime,PrivateChat,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];
export function AddChatAction(token,SubComponentId ,UserRoleId,Message,MessageTime,PrivateChat, onSuccess, onFailure){
    return{
        type:ADDCHAT,
        payload:{
            apiUrl:Constants.addchats,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:ADDCHAT,
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