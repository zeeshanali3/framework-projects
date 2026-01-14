import constants from "../../../../Constants";
import { VERIFY_OTP } from "../../ActionTypes/ApiActionTypes";
import { REDUX_UPDATE_CURRENT_USER } from "../../ActionTypes/ReduxActionTypes";
export const verifyOtp = (email,otp,platform,version,UID,onSuccess,onFailure) => {
  return {
    type: VERIFY_OTP,
    payload: {
      requestType: 'POST',
      apiUrl: constants.login + constants.version + constants.step2,
      isEncriptionByAccessToken: false,
      reduxActionType: REDUX_UPDATE_CURRENT_USER,
      body: {
        email: email,
        otp: otp,
        device_name: platform,
        os_version: version,
        device_identifier: UID,
      },
      header: 'application/json',
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
