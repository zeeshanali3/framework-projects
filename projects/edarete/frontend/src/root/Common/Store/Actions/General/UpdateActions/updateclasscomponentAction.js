import {
  ADMINUPDATECLASSCOMPONENT,
  ADMIN_UPDATE_CLASS_COMPONENT,
} from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"

export function UpdateclasscomponentAction(token,ComponentID ,CourseId , ComponentType,ComponentName,Weightage, ComponentPolicy,Status,onSuccess, onFailure){
    return{
        type:ADMIN_UPDATE_CLASS_COMPONENT,
        payload:{
            apiUrl: `${Constants.update_classcomponent}/${ComponentID}`,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:ADMINUPDATECLASSCOMPONENT,
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
                Status:Status,
            }
        }
    }
}