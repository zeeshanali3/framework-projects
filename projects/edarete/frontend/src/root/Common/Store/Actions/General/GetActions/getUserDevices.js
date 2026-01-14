import { GET_USER_DEVICES } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getUserDevices = (onSuccess, onFailure) => {
  return {
    type: GET_USER_DEVICES,
    payload: {
      requestType: "GET",
      apiUrl: constants.list_all_user_devices,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
