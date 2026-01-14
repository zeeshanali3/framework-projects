
import { ADD_LEADERBOARD } from '../../ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"

export function AddLeaderboardAction(CourseId,LeaderboardName,SubcomponentsId,Status,percentage,Positions, onSuccess, onFailure) {
    return {
        type: ADD_LEADERBOARD,
        payload: {
            apiUrl: Constants.addLeaderBoard,
            header: "application/json",
            metaData: true,
            requestType: "POST",
            reduxActionType: null,
            onSuccess: onSuccess,
            onFailure: onFailure,
            body: {
                idObject: {
                    CourseId: CourseId,
                },
                namesObject: {
                    LeaderboardName: LeaderboardName,
                },
                SubComponentsId: SubcomponentsId,
                Status: Status,
                Percentage: percentage,
                Position:Positions
            },
        },
    };
}
