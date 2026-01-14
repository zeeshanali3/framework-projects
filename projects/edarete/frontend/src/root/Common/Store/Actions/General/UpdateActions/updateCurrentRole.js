import { UPDATE_CURRENT_USER_ROLE } from "../../ActionTypes/ApiActionTypes";
import { REDUX_UPDATE_CURRENT_USER_ROLE } from "../../ActionTypes/ReduxActionTypes";

export const updateCurrentRole = (data) => {
  return {
    type: UPDATE_CURRENT_USER_ROLE,
    payload: {
      reduxActionType: REDUX_UPDATE_CURRENT_USER_ROLE,
      data: data,
    },
  };
};
