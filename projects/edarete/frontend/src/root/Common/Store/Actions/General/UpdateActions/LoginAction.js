import { LOGIN ,ADMIN_LOGIN } from "../../ActionTypes/ApiActionTypes";
// import constants from "../../Constants"
import constants from "../../../../Constants"        
// password
export function LoginAction(email ,getuserRoll,deviceName='un_known',os_version,device_identifier,platform_version,accesstoken ,onSuccess , onFailure){
    return {
      type: ADMIN_LOGIN,
      payload: {
        apiUrl: constants.login2 + constants.version + constants.step1,
        header: 'application/json',
        isEncriptionByAccessToken: false,
        // Disable encryption for login so server receives raw JSON body
        metaData: true,
        requestType: 'POST',
        body: {
          email: email,
          role: getuserRoll,
          device_identifier: device_identifier,
          device_name: deviceName,
          platform_version: platform_version,
          os_version: os_version,
          accesstoken: accesstoken,
        },
        reduxActionType: LOGIN,
        onSuccess: onSuccess,
        onFailure: onFailure,
      },
    };
}