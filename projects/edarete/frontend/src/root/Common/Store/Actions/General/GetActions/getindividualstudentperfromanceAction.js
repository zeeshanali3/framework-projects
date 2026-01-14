
import { GETINDIVIDUALSTUDENTPERFORMANCE ,GET_INDIVIDUAL_STUDENT_PERFORMANCE } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

// enrollementId/:courseId
export function GetIndividualStudentPerformanceAction(token,enrollementId,courseId,onSuccess ,onFailure){
    return{
        type:GET_INDIVIDUAL_STUDENT_PERFORMANCE,
        payload:{
            apiUrl:`${Constants.individualstudentPerformance}/${enrollementId}/${courseId}`,
            header:"application/json",
            metaData:true,
            requestType:'GET',
            reduxActionType:GETINDIVIDUALSTUDENTPERFORMANCE,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,

        }
    }
}
