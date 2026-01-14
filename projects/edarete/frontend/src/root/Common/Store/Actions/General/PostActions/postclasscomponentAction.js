import {
  POSTCLASSCOMPONENT,
  ADMIN_POST_CLASSCOMPONENT,
} from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"

export function PostclasscomponentAction(token,CourseId , ComponentType,ComponentName,Weightage, ComponentPolicy,onSuccess, onFailure){
    return{
        type:ADMIN_POST_CLASSCOMPONENT,
        payload:{
            apiUrl:Constants.addclasscomponent,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:POSTCLASSCOMPONENT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                Weightage:Weightage,
                ComponentType:ComponentType,
                ComponentPolicy:ComponentPolicy,
                idObject:{
                    CourseId:CourseId,
                },
                namesObject:{
                    ComponentName:ComponentName,
                },
                
            }
        }
    }
}