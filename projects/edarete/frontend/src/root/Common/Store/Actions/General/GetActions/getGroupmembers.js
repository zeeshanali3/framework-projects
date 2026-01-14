import { GET_GROUP_MEMBERS  } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function GetGroupMembersAction(GroupName,CourseId,onSuccess ,onFailure){
    return{
        type:GET_GROUP_MEMBERS,
        payload:{
            apiUrl:Constants.groupMembers,
            header:"application/json",
            metaData:true,
            isEncrypted:false,
            requestType:'POST',
            reduxActionType:GET_GROUP_MEMBERS,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                GroupName:GroupName,
                CourseId:CourseId
            }

        }
    }
}