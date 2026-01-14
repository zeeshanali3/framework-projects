
import { GET_PERSONAL_SUBDOMAIN } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

// enrollementId/:courseId
export function GetPersonalSubDomainAction(token,employeeId,onSuccess ,onFailure){

    return{
        type:GET_PERSONAL_SUBDOMAIN,
        payload:{
            apiUrl:`${Constants.getPersonalSubDomain}/${employeeId}`,
            header:"application/json",
            metaData:true,
            requestType:'GET',
            reduxActionType:null,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,

        }
    }
}
