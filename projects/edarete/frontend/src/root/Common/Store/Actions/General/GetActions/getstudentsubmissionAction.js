import { GETSTUDENTSUBMISSION ,ADMIN_GET_STUDENT_SUBMISSION} from "../../ActionTypes/ApiActionTypes";
import Constanst from "../../../../Constants";
export function GetstudentsubmissionAction(token ,StudentSubmissionId,onSuccess ,onFailure){
    return{
        type:ADMIN_GET_STUDENT_SUBMISSION,
        payload:{
            metaData: true,
            header:"/application/json",
            apiUrl:`${Constanst.getstudentsubmission}/${StudentSubmissionId}`,
            requestType:'GET',
            reduxActionType: GETSTUDENTSUBMISSION  ,
            onSuccess:onSuccess,
            onFailure:onFailure,
            token:token,
        }
    }
}