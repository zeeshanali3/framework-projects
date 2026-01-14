import ADMIN_FILTER from "./ActionTypes/ApiType";
import ADMINFILTER from "./ActionTypes/ReducerType";
import constants from "../../../Constants";
// :table/:column/:value
export function FilterAction(token,table , column ,value ,onSuccess ,onFailure){
    return{
        type:ADMIN_FILTER,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl: `${constants.filter}/${table}/${column}/${value}`,
            requestType:'GET',
            reduxActionType: ADMINFILTER  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}