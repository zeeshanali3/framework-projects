import { GET_LEADERBOARD} from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetLeaderBoardAction(courseId,onSuccess ,onFailure){
    return {
      type: GET_LEADERBOARD,
      payload: {
        metaData: true,
        header: '/application/json',
        apiUrl: Constants.getLeaderBoard + '?course_id=' + courseId,
        requestType: 'GET',
        reduxActionType: GET_LEADERBOARD,
        onSuccess: onSuccess,
        onFailure: onFailure,
      },
    };
}