import { GET_LEADERBOARD_RESULT} from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"
export function GetLeaderBoardResultAction(SubcomponentIds,CourseLeaderboardId,onSuccess ,onFailure){
    return{
        type:GET_LEADERBOARD_RESULT,
        payload:{
            apiUrl:Constants.getLeaderBoardResult+"/"+CourseLeaderboardId,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:GET_LEADERBOARD_RESULT,
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
                SubcomponentIds
            }
        }
    }
}