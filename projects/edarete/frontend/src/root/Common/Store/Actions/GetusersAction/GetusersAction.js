import Constants from "../../../Constants";
import GETUSERS from "./ActionTypes/ReducerType";
import ADMIN_GET_USERS from "./ActionTypes/ApiType";


export function GetusersAction(token ,onSuccess,onFailure){
    return{
        type:ADMIN_GET_USERS,
        payload: {
            apiUrl: "/crud"+Constants.users,
            header: "/application/json",
            metaData: true,
            requestType: 'GET',
            reduxActionType: GETUSERS,
            onSuccess: onSuccess,
            onFailure: onFailure,
        }
    }
}