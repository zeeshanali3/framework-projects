import { GET_TEMPLATE_SUBCOMPONENT,REDUX_GET_TEMPLATE_SUBCOMPONENT } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"


export function GetTemplateSubComponentAction(componentID,status,onSuccess ,onFailure){
    const apiUrl=`${Constants.getTemplateSubcomponent}/${componentID}`;
    return{
        type:GET_TEMPLATE_SUBCOMPONENT,
        payload:{
            apiUrl: apiUrl,
            metaData:true,
            header:"application/json",
            requestType:'POST',
            reduxActionType:REDUX_GET_TEMPLATE_SUBCOMPONENT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                Status:status
            }
        }
    }
}