
import Constant from "../../../../Constants";
import { LOGOUT, ADMIN_LOGOUT } from '../../ActionTypes/ApiActionTypes';
export function LogoutAction(token,email,onSuccess,onFailure  ){
  
    return{
        type:ADMIN_LOGOUT,
        payload:{
            // apiUrl:Constant.logout_api,
            apiUrl:`${Constant.logout}`,
            header:"application/json",
            metaData:true,
            requestType:'POST',       
            reduxActionType:LOGOUT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
             email:email 
            },
            token:token,
        }
    }
}