import { GET_CLOS ,GETCLOS } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetclosAction(token ,onSuccess ,onFailure){
    return{
        type:GET_CLOS,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:Constants.clos,
            requestType:'GET',
            isEncrypted:false,
            reduxActionType: GETCLOS,       
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}