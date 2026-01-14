import { GETSUBCOMPONENT, ADMIN_GET_SUBCOMPONENT } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
import { is } from "date-fns/locale";


export function GetsubcomponentAction(componentID,onSuccess ,onFailure){

    const apiUrl = `${Constants.getsubcomponent}?filter_columns_and=["subcomponents.component_id"]&filter_conditions_and=["="]&filter_values_and=[${componentID}]`;
    console.group(
      'GetsubcomponentAction apiUrl',
      componentID,
      onSuccess,
      onFailure,
    );
    return{
        type:ADMIN_GET_SUBCOMPONENT,
        payload:{
            apiUrl: apiUrl,
            metaData:true,
            header:"application/json",
            requestType:'GET',
            onSuccess:onSuccess,
            onFailure:onFailure,
        }
    }
}