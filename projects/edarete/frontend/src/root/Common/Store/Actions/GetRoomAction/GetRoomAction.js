import ADMIN_GET_ROOM from "./ActionType/ApiType";
import GETROOM from "./ActionType/ReducerType";
import Constants from "../../../Constants";

export function GetRoomAction(token,onSuccess,onFailure){
    return{
        type:ADMIN_GET_ROOM,
        payload:{
            header:"/application/json",
            apiUrl:Constants.get_room,
            requestType:'GET',
            metaData:true,
            onSuccess:onSuccess,
            onFailure:onFailure,
            reduxActionType:GETROOM,
            // token:token,
        }
    }
}