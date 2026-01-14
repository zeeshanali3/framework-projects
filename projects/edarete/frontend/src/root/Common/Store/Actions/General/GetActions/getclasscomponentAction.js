import { GETCLASSCOMPONENT,ADMIN_GET_CLASSCOMPONENT } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants"

export function GetclasscomponentAction(token ,CourseId,isPublic=false,onSuccess ,onFailure){
    const isPublicUrl=isPublic?`?isPublic=1`:"";
    const apiUrl = `${constants.getclasscomponent}?filter_columns_and=["course_id"]&filter_conditions_and=["="]&filter_values_and=[${CourseId}]`;
    return{
        type:ADMIN_GET_CLASSCOMPONENT,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:apiUrl,
            requestType:'GET',
            reduxActionType: GETCLASSCOMPONENT  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}