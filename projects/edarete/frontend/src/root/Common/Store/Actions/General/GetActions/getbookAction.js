import { GETBOOKS, ADMIN_GET_BOOKS } from '../../ActionTypes/ApiActionTypes';
import constants from '../../../../Constants';
import { API_DOCUMENTATION } from '../../ActionTypes/ApiActionTypes';
import { REDUX_API_DOCUMENTATION } from '../../ActionTypes/ReduxActionTypes';
export function GetbookAction(token ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_BOOKS,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:constants.getbook,
            requestType:'GET',
            reduxActionType: GETBOOKS  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}