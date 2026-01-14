import { GET_USER_DEVICES_OTP } from "../../ActionTypes/ApiActionTypes";
export const getUserDevicesOTP = (user_id,onSuccess, onFailure) => {
  return {
    type: GET_USER_DEVICES_OTP,
    payload: {
      requestType: "GET",
      apiUrl: `/crud/user/devices?version=1.0&id=${user_id}`,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
