import axios from "axios";
import { BASE_URL } from "../../../../../Config/constant";

export const facebookLogin = (
  accessToken,
  userId,
  osName,
  osVersion,
  deviceUUID,
  successCallback,
  failureCallback
) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/api/auth/facebook-login`, {
        accessToken: accessToken,
        userId: userId,
        osName: osName,
        osVersion: osVersion,
        deviceUUID: deviceUUID
      })
      .then((res) => {
        const { token, user } = res.data;
        
        // Store token and user info in localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_info", JSON.stringify(user));
        
        if (successCallback) {
          successCallback(res.data);
        }
      })
      .catch((err) => {
        console.error("Facebook login error:", err);
        if (failureCallback) {
          failureCallback(err.response?.data || err);
        }
      });
  };
}; 