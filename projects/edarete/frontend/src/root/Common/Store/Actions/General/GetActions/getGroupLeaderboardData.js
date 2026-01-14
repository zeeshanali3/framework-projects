import { GET_GROUP_LEADERBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
export const getGroupLeaderboardData = (class_activity_id=1,onSuccess, onFailure) => {
  return {
    type: GET_GROUP_LEADERBOARD_DATA,
    payload: {
      requestType: "GET",
      apiUrl: constants.group_leaderboard+constants.version+`&id=${class_activity_id}`,
      reduxActionType: "",
      metaData: true,
      body:{},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
