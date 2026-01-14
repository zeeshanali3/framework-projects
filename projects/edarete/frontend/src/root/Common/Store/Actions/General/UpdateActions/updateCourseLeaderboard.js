import { UPDATE_COURSE_LEADERBOARD } from '../../ActionTypes/ApiActionTypes';

import Constants from "../../../../Constants"

export function UpdateCourseLeaderboard(courseLeaderboardId,LeaderboardName,Percentage,Position,status,onSuccess, onFailure){
    return{
        type:UPDATE_COURSE_LEADERBOARD,
        payload:{
            apiUrl: `${Constants.updateCourseLeaderboard}/${courseLeaderboardId}`,
            header:"application/json",
            metaData:true,
            requestType:'PUT',
            reduxActionType:"",
            onSuccess:onSuccess,
            onFailure:onFailure,
            body:{
              Status:status,
              namesObject:{
                LeaderboardName:LeaderboardName              
              },
                SubComponentsId:Object.keys(Percentage),
                Percentage:Percentage,
                Position:Position
            }
        }
    }
}