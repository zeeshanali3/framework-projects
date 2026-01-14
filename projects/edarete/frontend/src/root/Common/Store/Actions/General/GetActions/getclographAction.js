import { GET_CLO_GRAPH,GETCLOGRAPH } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function GetCloGraphAction(token ,CourseId,onSuccess ,onFailure){
    return{
        type:GET_CLO_GRAPH,
        payload:{
            metaData: true,
            header:"/application/json",
            // apiUrl: constants.getclasscomponent,
            apiUrl:`${Constants.getclographdata}?course_id=${CourseId}`,
            requestType:'GET',
            reduxActionType: GETCLOGRAPH  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}