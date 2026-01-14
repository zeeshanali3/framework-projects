import { ADMINGETPUBLICPAGE ,ADMIN_GET_PUBLIC_PAGE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetpublicpageAction(onSuccess ,onFailure){
   
    return{
        type:ADMIN_GET_PUBLIC_PAGE,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:Constants.public_page,
            requestType:'GET',
            reduxActionType: ADMINGETPUBLICPAGE ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
            }
        }
    }
}