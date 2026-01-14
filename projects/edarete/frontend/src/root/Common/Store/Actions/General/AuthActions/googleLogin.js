import axios from "axios";
import { BASE_URL } from "../../../../../Config/constant";

export const googleLogin = (
  tokenId,
  osName,
  osVersion,
  deviceUUID,
  successCallback,
  failureCallback
) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/api/auth/google-login`, {
        tokenId: tokenId,
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
        console.error("Google login error:", err);
        if (failureCallback) {
          failureCallback(err.response?.data || err);
        }
      });
  };
}; 