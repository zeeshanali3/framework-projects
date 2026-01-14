import {GETSTUDENTSUBATTACHMENTS ,ADMIN_GET_STUDENT_SUBS_ATTACHMENTS} from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
// :subCompinentId/:EnrollementId
export function GetstudentsubmissionattachmentsAction(token,subComponentId ,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_STUDENT_SUBS_ATTACHMENTS,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constants.studentSubmissionattachments}/${subComponentId}`,
            requestType:'GET',
            reduxActionType: GETSTUDENTSUBATTACHMENTS  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}