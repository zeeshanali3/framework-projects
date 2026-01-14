
import { ADMIN_LOGIN_STEP_2, LOGIN } from '../../ActionTypes/ApiActionTypes';
// import constants from "../../Constants"
import constants from "../../../../Constants";

import { REDUX_UPDATE_CURRENT_USER } from "../../ActionTypes/ReduxActionTypes";

export function LoginStepTwoAction(       
  email,
  otp,
  platform,
  version,
  UID,
userRole,
  currentUrl,
  onSuccess,
  onFailure,
) {
  console.log('Inside Actionnnn');
  return {
    type: ADMIN_LOGIN_STEP_2,
    payload: {
      apiUrl: constants.login + constants.version + constants.step2,
      header: 'application/json',
      metaData: true,
      isEncriptionByAccessToken: false,
      requestType: 'POST',
      body: {
        email: email,
        userRole: userRole,
        otp: otp,
        device_name: platform,
        os_version: version,
        device_identifier: UID,
        currentUrl: currentUrl,
      },
      reduxActionType: [LOGIN, REDUX_UPDATE_CURRENT_USER],
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
}