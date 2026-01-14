import { ADD_DEVICE } from "../../ActionTypes/ApiActionTypes";
export const addDevice = (data, onSuccess, onFailure) => {
  console.log("addDevice",data)

  return {
    type: ADD_DEVICE,
    payload: {
      requestType: "POST",
      apiUrl: `/crud/user/devices?version=1.0`,
      reduxActionType: "",
      metaData: true,
      body: data,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
