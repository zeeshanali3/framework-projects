import constants from "../../../../Constants";
import { GET_OTP } from "../../ActionTypes/ApiActionTypes";
export const getOtp = (email,deviceName='un_known',os_version,device_identifier,platform_version,accesstoken,onSuccess,onFailure) => {
  return {
    type: GET_OTP,
    payload: {
      requestType: 'POST',
      isEncriptionByAccessToken: false,
      apiUrl: constants.login + constants.version + constants.step1,
      reduxActionType: '',
      body: {
        email: email,
        device_identifier: device_identifier,
        device_name: deviceName,
        platform_version: platform_version,
        os_version: os_version,
        accesstoken: accesstoken,
      },
      metaData: true,
      header: 'application/json',
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
