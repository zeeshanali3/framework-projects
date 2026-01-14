import { GET_SUBCOMPONENT_BY_COURSE  } from "../../ActionTypes/ApiActionTypes";

import Constants from "../../../../Constants"

export function GetSubComponentByCourse(token,CourseId ,  onSuccess ,onFailure){
    return {
      type: GET_SUBCOMPONENT_BY_COURSE,
      payload: {
        apiUrl: `${Constants.getsubcomponent}?filter_columns_and=["course_id"]&filter_conditions_and=["="]&filter_values_and=[${CourseId}]`,
        header: 'application/json',
        metaData: true,
        requestType: 'GET',
        reduxActionType: '',
        onSuccess: onSuccess,
        onFailure: onFailure,
        token: token,
      },
    };
}