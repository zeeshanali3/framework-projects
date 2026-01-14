import { GET_INDIVIDUAL_LEADERBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const clearLeaderboard = (selectedCActivityId,onSuccess,onFailure) => {
  return {
    type: GET_INDIVIDUAL_LEADERBOARD_DATA,
    payload: {
      requestType: "DELETE",
      apiUrl: `/crud/Students_class_activity`+constants.version+`&id=${selectedCActivityId}`,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
