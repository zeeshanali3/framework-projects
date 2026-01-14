import { GET_USERS_CONTACTS } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
import { REDUX_GET_USERS_CONTACTS } from "../../ActionTypes/ReduxActionTypes";
export const getUsersChats = (onSuccess, onFailure) => {
  return {
    type: GET_USERS_CONTACTS,
    payload: {
      requestType: "GET",
      apiUrl: `http://192.168.1.220:3000/api/crud/contacts?id=1`,
      reduxActionType: REDUX_GET_USERS_CONTACTS,
      useBaseURL: false,
      metaData: true,
      body: {},
      isEncrypted: true,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
