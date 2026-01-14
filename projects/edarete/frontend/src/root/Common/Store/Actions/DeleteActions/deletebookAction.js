import { DELETEBOOKS } from "../../../../Common/Store/Actions/ActionTypes/ApiActionTypes";
import { ADMIN_DELETE_BOOKS } from '../../../../Common/Store/Actions/ActionTypes/ApiActionTypes'; 
import Constants from "../../../Constants"
export function DeletebookAction(token,BookId,onSuccess ,onFailure){
    return{
        type:ADMIN_DELETE_BOOKS,
        payload:{
            apiUrl: `${Constants.deletebook}/${BookId}`,
            metaData:true,
            header:"application/json",
            requestType:'DELETE',
            reduxActionType:DELETEBOOKS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                token:token,
            }
        }
    }
}