import constants from "../../../../Constants";
import { API_DOCUMENTATION } from "../../ActionTypes/ApiActionTypes";
import { REDUX_API_DOCUMENTATION } from "../../ActionTypes/ReduxActionTypes";

export const getApiDocumentation = (onSuccess, onFailure) => {
  return {
    type: API_DOCUMENTATION,
    payload: {
      requestType: "GET",
      apiUrl: constants.api_documentation + constants.version,
      reduxActionType: REDUX_API_DOCUMENTATION,
      body: {},
      metaData: true,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
