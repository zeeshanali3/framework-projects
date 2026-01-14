
import { REDUX_MAX_MIN_AGGREGATE ,GET_MAX_MIN_AGGREGATE } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants"

// enrollementId/:courseId
export function getMaxMinAggregate(token,enrollementId,courseId,onSuccess ,onFailure,componentFlag=0){
    return {
      type: GET_MAX_MIN_AGGREGATE,
      payload: {
        apiUrl: `${constants.maxMinAggregate}?course_id=${courseId}&enrollement_id=${enrollementId}`,
        header: 'application/json',
        metaData: true,
        isEncrypted: true,
        requestType: 'GET',
        reduxActionType: REDUX_MAX_MIN_AGGREGATE,
        onSuccess: onSuccess,
        onFailure: onFailure,
        token: token,
      },
    };
}
