import { ADD_DEVICE_OTP } from "../../ActionTypes/ApiActionTypes";
export const addDeviceOTP = (user_device_id,data, onSuccess, onFailure) => {
  console.log("addDeviceOTP",user_device_id,data)
  return {
    type: ADD_DEVICE_OTP,
    payload: {
      requestType: "POST",
      apiUrl: `/add/device/otp?version=1.0&id=${user_device_id}`,
      reduxActionType: "",
      metaData: true,
      body: data,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
