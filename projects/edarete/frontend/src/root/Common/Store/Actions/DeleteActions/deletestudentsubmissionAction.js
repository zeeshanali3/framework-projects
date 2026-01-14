import { DELETESTUENTSUBMISSION ,ADMIN_DELETE_STUDENT_SUBMISSION } from "../ActionTypes/ApiActionTypes";
import Constants from "../../../Constants"
export function DeletestudentsubmissionAction(token,StudentSubmissionId,EnrollementId,SubComponentId,questionids,onSuccess ,onFailure){
 
    return{ 
        type:ADMIN_DELETE_STUDENT_SUBMISSION,
        payload:{
            apiUrl: Constants.deletestudentsubmission,
            metaData:true,
            header:"application/json",
            requestType:'POST',
            reduxActionType:DELETESTUENTSUBMISSION,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                token:token,
                StudentSubmissionId:StudentSubmissionId,
                EnrollmentId:EnrollementId,
                SubComponentId:SubComponentId,
                questionIds:questionids
            } 
        }
    }
}