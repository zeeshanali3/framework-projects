import { GET_INDIVIDUAL_LEADERBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getIndividualLeaderboardData = (
  class_activity_id = 1,
  onSuccess,
  onFailure
) => {

  return {
    type: GET_INDIVIDUAL_LEADERBOARD_DATA,
    payload: {
      requestType: "GET",
      apiUrl:
        constants.individual_leaderboard +
        constants.version +
        `&id=${class_activity_id}`,
      reduxActionType: "",
      metaData: true,
      isEncrypted: true,
      body: {},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
